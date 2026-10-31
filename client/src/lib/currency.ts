/**
 * JH Crypto Analytics - Indian Rupee (INR ₹) Currency Conversion Utility
 * Real-time conversion multiplier: 1 USD = 85.50 INR
 */

export const USD_TO_INR = 85.50;

/**
 * Converts a USD value to INR
 */
export function toINR(usdAmount: number): number {
  return Number((usdAmount * USD_TO_INR).toFixed(4));
}

/**
 * Formats a USD or INR amount in standard Indian Rupee notation (₹)
 * Example: 5801175 -> ₹58,01,175.00
 * Handles micro-cap tokens (e.g., Pepe, Shiba Inu) with up to 6 decimal places.
 */
export function formatINR(usdOrInr: number, isAlreadyINR: boolean = false): string {
  if (usdOrInr === undefined || usdOrInr === null || isNaN(usdOrInr)) {
    return '₹0.00';
  }

  const inrValue = isAlreadyINR ? usdOrInr : usdOrInr * USD_TO_INR;

  if (Math.abs(inrValue) < 0.01 && inrValue > 0) {
    return `₹${inrValue.toFixed(6)}`;
  } else if (Math.abs(inrValue) < 1 && inrValue > 0) {
    return `₹${inrValue.toFixed(4)}`;
  } else if (Math.abs(inrValue) < 100) {
    return `₹${inrValue.toFixed(2)}`;
  }

  // Format using Indian Numbering System (Lakhs / Crores comma placement)
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(inrValue);
}

/**
 * Formats large amounts in Lakhs (L) or Crores (Cr) for Indian financial standards
 * Example: 1,335,000,000,000 USD -> ₹1,14,142.50 Cr
 */
export function formatINRLarge(usdAmount: number): string {
  if (!usdAmount || isNaN(usdAmount)) return '₹0';
  const inr = usdAmount * USD_TO_INR;

  if (inr >= 10000000) {
    // 1 Crore = 10,000,000 (10 Million)
    const crores = inr / 10000000;
    return `₹${crores.toLocaleString('en-IN', { maximumFractionDigits: 2 })} Cr`;
  } else if (inr >= 100000) {
    // 1 Lakh = 100,000
    const lakhs = inr / 100000;
    return `₹${lakhs.toLocaleString('en-IN', { maximumFractionDigits: 2 })} L`;
  } else {
    return formatINR(inr, true);
  }
}

/**
 * Converts an INR value to USD
 */
export function toUSD(inrAmount: number): number {
  return Number((inrAmount / USD_TO_INR).toFixed(2));
}

/**
 * Formats a USD amount in standard US Dollar notation ($)
 * Example: 67850 -> $67,850.00
 */
export function formatUSD(usdAmount: number): string {
  if (usdAmount === undefined || usdAmount === null || isNaN(usdAmount)) {
    return '$0.00';
  }
  if (Math.abs(usdAmount) < 0.01 && usdAmount > 0) {
    return `$${usdAmount.toFixed(6)}`;
  } else if (Math.abs(usdAmount) < 1 && usdAmount > 0) {
    return `$${usdAmount.toFixed(4)}`;
  }
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(usdAmount);
}

/**
 * Compact INR formatter for chart axes and small labels
 */
export function formatINRCompact(usdAmount: number): string {
  if (!usdAmount || isNaN(usdAmount)) return '₹0';
  const inr = usdAmount * USD_TO_INR;

  if (inr >= 10000000) {
    return `₹${(inr / 10000000).toFixed(1)}Cr`;
  } else if (inr >= 100000) {
    return `₹${(inr / 100000).toFixed(1)}L`;
  } else if (inr >= 1000) {
    return `₹${(inr / 1000).toFixed(1)}k`;
  } else if (inr < 1 && inr > 0) {
    return `₹${inr.toFixed(4)}`;
  }
  return `₹${inr.toFixed(2)}`;
}

