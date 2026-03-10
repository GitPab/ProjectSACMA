import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Currency = 'USD' | 'VND' | 'KRW' | 'JPY' | 'CNY';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  formatCurrency: (amount: number) => string;
  convertAmount: (amount: number, toCurrency: Currency, fromCurrency?: Currency) => number;
  formatMultipleCurrency: (amount: number, baseCurrency: Currency) => { usd: string; vnd: string; krw: string; jpy: string; cny: string };
  updateRates: () => void;
  lastUpdated: Date;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Updated exchange rates (as of March 4, 2026)
// Base: VND
// 1 USD = 26,191 VND
// 1 KRW = 17.77 VND  → 1 USD = 26191 / 17.77 = 1473 KRW
// 1 USD = 157.64 JPY
// 1 USD = 6.905 CNY
export const EXCHANGE_RATES = {
  USD_TO_VND: 26191,
  KRW_TO_VND: 17.77,
  JPY_TO_VND: 26191 / 157.64,  // ≈ 166.17
  CNY_TO_VND: 26191 / 6.905,   // ≈ 3792.25
  // Derived
  USD_TO_KRW: 1473,
  USD_TO_JPY: 157.64,
  USD_TO_CNY: 6.905,
  VND_TO_USD: 1 / 26191,
  KRW_TO_USD: 17.77 / 26191,
  JPY_TO_USD: (26191 / 157.64) / 26191,
  CNY_TO_USD: (26191 / 6.905) / 26191,
};

const detectDefaultCurrency = (): Currency => 'VND';

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>(detectDefaultCurrency());
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Convert any currency → any currency (via VND as base)
  const convertAmount = (amount: number, toCurrency: Currency, fromCurrency: Currency = 'USD'): number => {
    // First convert to VND
    let amountInVND: number;
    switch (fromCurrency) {
      case 'VND': amountInVND = amount; break;
      case 'KRW': amountInVND = amount * EXCHANGE_RATES.KRW_TO_VND; break;
      case 'JPY': amountInVND = amount * EXCHANGE_RATES.JPY_TO_VND; break;
      case 'CNY': amountInVND = amount * EXCHANGE_RATES.CNY_TO_VND; break;
      case 'USD': default: amountInVND = amount * EXCHANGE_RATES.USD_TO_VND; break;
    }
    // Then convert from VND to target
    switch (toCurrency) {
      case 'VND': return amountInVND;
      case 'KRW': return amountInVND / EXCHANGE_RATES.KRW_TO_VND;
      case 'JPY': return amountInVND / EXCHANGE_RATES.JPY_TO_VND;
      case 'CNY': return amountInVND / EXCHANGE_RATES.CNY_TO_VND;
      case 'USD': return amountInVND * EXCHANGE_RATES.VND_TO_USD;
      default: return amountInVND * EXCHANGE_RATES.VND_TO_USD;
    }
  };

  const formatCurrency = (amount: number, targetCurrency?: Currency): string => {
    const curr = targetCurrency || currency;
    // amount is already in the display currency (pre-converted by caller or raw USD)
    // We re-convert from USD to curr here when no targetCurrency override
    const convertedAmount = targetCurrency
      ? amount  // already converted by caller
      : convertAmount(amount, curr, 'USD');

    switch (curr) {
      case 'USD':
        return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertedAmount);
      case 'VND':
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertedAmount);
      case 'KRW':
        return new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertedAmount);
      case 'JPY':
        return new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertedAmount);
      case 'CNY':
        return new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertedAmount);
      default:
        return String(convertedAmount);
    }
  };

  // Format amount in all 5 currencies for side-by-side display
  // amount is in baseCurrency units
  const formatMultipleCurrency = (amount: number, baseCurrency: Currency = 'VND') => {
    const toVND = convertAmount(amount, 'VND', baseCurrency);
    return {
      usd: new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertAmount(amount, 'USD', baseCurrency)),
      vnd: new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(toVND),
      krw: new Intl.NumberFormat('ko-KR', { style: 'currency', currency: 'KRW', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertAmount(amount, 'KRW', baseCurrency)),
      jpy: new Intl.NumberFormat('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertAmount(amount, 'JPY', baseCurrency)),
      cny: new Intl.NumberFormat('zh-CN', { style: 'currency', currency: 'CNY', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(convertAmount(amount, 'CNY', baseCurrency)),
    };
  };

  const updateRates = () => setLastUpdated(new Date());

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, formatCurrency, convertAmount, formatMultipleCurrency, updateRates, lastUpdated }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
}