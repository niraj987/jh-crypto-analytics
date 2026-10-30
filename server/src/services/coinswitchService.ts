import crypto from 'crypto';

export interface CoinSwitchPortfolioItem {
  currency: string;
  name?: string;
  main_balance: string;
  invested_value?: string;
  current_value?: string;
  buy_rate?: string;
  sell_rate?: string;
}

export interface CoinSwitchOrderRequest {
  side: 'buy' | 'sell';
  symbol: string;
  type: 'limit' | 'market';
  price?: number;
  quantity: number;
  exchange?: string;
}

export interface CoinSwitchOrderResult {
  success: boolean;
  order_id?: string;
  message?: string;
  data?: any;
  rawResponse?: any;
}

export class CoinSwitchService {
  private static get baseUrl(): string {
    return process.env.COINSWITCH_BASE_URL || 'https://coinswitch.co';
  }

  private static get apiKey(): string {
    return process.env.COINSWITCH_API_KEY || 'df55d419bca54fd6a204a1cf5617116f466b64b746b69271725fabdb4b901779';
  }

  private static get secretKey(): string {
    return process.env.COINSWITCH_SECRET_KEY || '2c6e747ae402a27fc5cefc5ac452dfc5a46a5901c8885afb734d77f1fd09f2f3';
  }

  /**
   * Generates an Ed25519 signature according to CoinSwitch PRO API v2 specifications
   * Signed string: METHOD + decoded_path + epoch
   */
  public static generateSignature(method: string, path: string, epoch: string): string {
    const uppercaseMethod = method.toUpperCase();
    const decodedPath = decodeURIComponent(path);
    const message = uppercaseMethod + decodedPath + epoch;

    // Convert 32-byte secret key hex into PKCS#8 DER format recognized by Node.js crypto
    const pkcs8Header = Buffer.from('302e020100300506032b657004220420', 'hex');
    const secretKeyBytes = Buffer.from(this.secretKey, 'hex');
    const pkcs8Der = Buffer.concat([pkcs8Header, secretKeyBytes]);

    const privateKey = crypto.createPrivateKey({
      key: pkcs8Der,
      format: 'der',
      type: 'pkcs8',
    });

    return crypto.sign(null, Buffer.from(message, 'utf-8'), privateKey).toString('hex');
  }

  /**
   * Prepares authenticated headers for CoinSwitch requests
   */
  public static getAuthHeaders(method: string, path: string): Record<string, string> {
    const epoch = Date.now().toString();
    const signature = this.generateSignature(method, path, epoch);

    return {
      'X-AUTH-APIKEY': this.apiKey,
      'X-AUTH-SIGNATURE': signature,
      'X-AUTH-EPOCH': epoch,
      'Content-Type': 'application/json',
    };
  }

  /**
   * Check connection status and API key validity
   */
  public static getStatus(): { isConfigured: boolean; apiKeyMasked: string } {
    const key = this.apiKey;
    const masked = key.length > 8 ? `${key.slice(0, 4)}...${key.slice(-4)}` : 'Not Set';
    return {
      isConfigured: Boolean(this.apiKey && this.secretKey),
      apiKeyMasked: masked,
    };
  }

  /**
   * Fetches CoinSwitch server time and calculates local clock drift
   */
  public static async getServerTime(): Promise<{ serverTime: number; driftMs: number }> {
    const start = Date.now();
    const res = await fetch(`${this.baseUrl}/trade/api/v2/time`, {
      signal: AbortSignal.timeout(6000),
    });
    if (!res.ok) throw new Error(`CoinSwitch server time error: ${res.status}`);
    const data = await res.json();
    const serverTime = data.serverTime || Date.now();
    const driftMs = Math.abs(serverTime - (start + (Date.now() - start) / 2));
    return { serverTime, driftMs };
  }

  /**
   * Fetches live 24-hour ticker for a specific currency pair (defaults to CoinSwitchX for INR)
   */
  public static async getLiveTicker(pairSymbol: string, exchange: string = 'coinswitchx'): Promise<any> {
    const cleanPair = pairSymbol.toLowerCase().includes('/') ? pairSymbol.toLowerCase() : `${pairSymbol.toLowerCase()}/inr`;
    const path = `/trade/api/v2/24hr/ticker?symbol=${encodeURIComponent(cleanPair)}&exchange=${exchange}`;
    const headers = this.getAuthHeaders('GET', path);

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      throw new Error(`CoinSwitch ticker error HTTP ${res.status}: ${await res.text()}`);
    }

    const json = await res.json();
    return json.data?.[exchange] || json.data;
  }

  /**
   * Fetches all 400+ active CoinSwitch INR tickers
   */
  public static async getAllPairs(exchange: string = 'coinswitchx'): Promise<Record<string, any>> {
    const path = `/trade/api/v2/24hr/all-pairs/ticker?exchange=${exchange}`;
    const headers = this.getAuthHeaders('GET', path);

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      throw new Error(`CoinSwitch all-pairs error HTTP ${res.status}`);
    }

    const json = await res.json();
    return json.data || {};
  }

  /**
   * Fetches live user account holdings and balances from CoinSwitch
   */
  public static async getUserPortfolio(): Promise<{ balances: CoinSwitchPortfolioItem[]; totalINRValue: number }> {
    const path = '/trade/api/v2/user/portfolio';
    const headers = this.getAuthHeaders('GET', path);

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`CoinSwitch portfolio error HTTP ${res.status}: ${errText}`);
    }

    const json = await res.json();
    const balances: CoinSwitchPortfolioItem[] = json.data || [];

    // Calculate total portfolio worth in INR
    let totalINRValue = 0;
    balances.forEach((item) => {
      const val = parseFloat(item.current_value || '0');
      if (!isNaN(val)) totalINRValue += val;
    });

    return { balances, totalINRValue: Number(totalINRValue.toFixed(2)) };
  }

  /**
   * Places a live BUY or SELL order directly on CoinSwitch PRO
   */
  public static async placeLiveOrder(order: CoinSwitchOrderRequest): Promise<CoinSwitchOrderResult> {
    const path = '/trade/api/v2/order';
    const exchange = order.exchange || 'coinswitchx';

    // Format symbol properly (e.g. BTC/INR)
    const formattedSymbol = order.symbol.includes('/') 
      ? order.symbol.toUpperCase() 
      : `${order.symbol.toUpperCase()}/INR`;

    const bodyPayload: any = {
      side: order.side.toLowerCase(),
      symbol: formattedSymbol,
      type: order.type.toLowerCase(),
      quantity: Number(order.quantity),
      exchange,
    };

    if (order.type.toLowerCase() === 'limit') {
      if (!order.price || order.price <= 0) {
        throw new Error('Limit orders require a valid price parameter');
      }
      bodyPayload.price = Number(order.price);
    }

    const headers = this.getAuthHeaders('POST', path);

    try {
      const res = await fetch(`${this.baseUrl}${path}`, {
        method: 'POST',
        headers,
        body: JSON.stringify(bodyPayload),
        signal: AbortSignal.timeout(10000),
      });

      const responseJson = await res.json();

      if (!res.ok || responseJson.status === 'failure') {
        const message = responseJson.message || responseJson.error || `HTTP ${res.status}`;
        return {
          success: false,
          message: `CoinSwitch Execution Notice: ${message}`,
          rawResponse: responseJson,
        };
      }

      return {
        success: true,
        order_id: responseJson.data?.order_id || `CS-${Date.now()}`,
        message: `Order successfully placed on CoinSwitch PRO: ${order.side.toUpperCase()} ${order.quantity} ${formattedSymbol}`,
        data: responseJson.data,
        rawResponse: responseJson,
      };
    } catch (err: any) {
      return {
        success: false,
        message: `Order communication error: ${err.message}`,
      };
    }
  }

  /**
   * Retrieves user's open orders from CoinSwitch
   */
  public static async getOpenOrders(exchange: string = 'coinswitchx'): Promise<any[]> {
    const path = `/trade/api/v2/orders?open=true&exchanges=${exchange}`;
    const headers = this.getAuthHeaders('GET', path);

    const res = await fetch(`${this.baseUrl}${path}`, {
      method: 'GET',
      headers,
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      return [];
    }

    const json = await res.json();
    return json.data || [];
  }
}

