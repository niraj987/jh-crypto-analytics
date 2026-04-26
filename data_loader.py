import yfinance as yf
import polars as pl
from datetime import datetime, timedelta
import pandas as pd

def fetch_crypto_data(ticker: str, years: int = 2) -> pl.DataFrame:
    """
    Fetches historical OHLCV data for a given cryptocurrency in INR.
    Returns a Polars DataFrame.
    """
    end_date = datetime.now()
    start_date = end_date - timedelta(days=years * 365)
    
    # Strip any existing suffixes to get the base coin
    base_ticker = ticker.upper().replace('-INR', '').replace('-USD', '')
    
    # First, try fetching the direct INR pair
    symbol_inr = f"{base_ticker}-INR"
    df_pd = yf.download(symbol_inr, start=start_date.strftime('%Y-%m-%d'), end=end_date.strftime('%Y-%m-%d'))
    
    used_conversion = False
    conversion_rate = 1.0
    
    if df_pd.empty:
        # Fallback to USD pair if INR pair doesn't exist natively
        symbol_usd = f"{base_ticker}-USD"
        df_pd = yf.download(symbol_usd, start=start_date.strftime('%Y-%m-%d'), end=end_date.strftime('%Y-%m-%d'))
        
        if df_pd.empty:
            raise ValueError(f"No data found for symbol {base_ticker} in either INR or USD. Please check the ticker name.")
            
        # Get current USD to INR conversion rate
        usd_inr_data = yf.download("USDINR=X", period="1d")
        if not usd_inr_data.empty:
            if isinstance(usd_inr_data.columns, pd.MultiIndex):
                usd_inr_data.columns = usd_inr_data.columns.get_level_values(0)
            conversion_rate = float(usd_inr_data['Close'].iloc[-1])
        else:
            conversion_rate = 83.5 # Safe fallback
            
        used_conversion = True
    
    # Flatten columns if multi-index
    if isinstance(df_pd.columns, pd.MultiIndex):
        df_pd.columns = df_pd.columns.get_level_values(0)
        
    df_pd = df_pd.reset_index()
    
    # Rename columns
    df_pd = df_pd.rename(columns={
        "Date": "Date", "Open": "Open", "High": "High", 
        "Low": "Low", "Close": "Close", "Volume": "Volume"
    })
    
    # Keep necessary columns
    cols_to_keep = ["Date", "Open", "High", "Low", "Close", "Volume"]
    df_pd = df_pd[[col for col in cols_to_keep if col in df_pd.columns]]
    
    # Convert types and apply INR conversion if needed
    for col in ["Open", "High", "Low", "Close", "Volume"]:
        if col in df_pd.columns:
            df_pd[col] = pd.to_numeric(df_pd[col], errors='coerce')
            
            # Apply conversion rate to price columns
            if used_conversion and col != "Volume":
                df_pd[col] = df_pd[col] * conversion_rate
    
    # Convert to Polars DataFrame
    df_pl = pl.from_pandas(df_pd)
    
    # Ensure Date is datetime
    if df_pl.dtypes[0] != pl.Datetime:
        try:
            df_pl = df_pl.with_columns(pl.col("Date").cast(pl.Datetime))
        except:
            df_pl = df_pl.with_columns(pl.col("Date").cast(pl.Utf8).str.to_datetime("%Y-%m-%d %H:%M:%S", strict=False))

    df_pl = df_pl.sort("Date")

    return df_pl
