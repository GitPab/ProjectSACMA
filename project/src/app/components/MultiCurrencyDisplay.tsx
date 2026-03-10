import React from 'react';
import { useCurrency, Currency } from '../context/CurrencyContext';

interface MultiCurrencyDisplayProps {
  amount: number;
  baseCurrency?: Currency;
  compact?: boolean;
  className?: string;
}

export function MultiCurrencyDisplay({ amount, baseCurrency = 'VND', compact = false, className = '' }: MultiCurrencyDisplayProps) {
  const { currency, formatMultipleCurrency } = useCurrency();
  
  const formatted = formatMultipleCurrency(amount, baseCurrency);

  if (compact) {
    // Show current selected currency, then two alternate currencies
    const primary = currency === 'VND' ? formatted.vnd : 
                    currency === 'KRW' ? formatted.krw : 
                    currency === 'USD' ? formatted.usd :
                    currency === 'JPY' ? formatted.jpy : formatted.cny;
    
    const alt1 = currency === 'VND' ? formatted.usd : formatted.vnd;
    const alt2 = currency === 'VND' ? formatted.krw : formatted.krw;
    
    return (
      <span className={`text-sm text-slate-600 ${className}`}>
        ({primary} | ~{alt1} | ~{alt2})
      </span>
    );
  }

  // Full display: show selected currency first, then conversions
  const primary = currency === 'VND' ? formatted.vnd : 
                  currency === 'KRW' ? formatted.krw : 
                  currency === 'USD' ? formatted.usd :
                  currency === 'JPY' ? formatted.jpy : formatted.cny;

  return (
    <div className={`inline-flex flex-wrap items-center gap-2 ${className}`}>
      <span className="font-semibold text-slate-900">{primary}</span>
      <span className="text-slate-400">|</span>
      <span className="text-slate-600">{currency !== 'USD' ? formatted.usd : formatted.vnd}</span>
      <span className="text-slate-400">|</span>
      <span className="text-slate-600">{currency !== 'KRW' ? formatted.krw : formatted.vnd}</span>
    </div>
  );
}

interface TotalWithConversionsProps {
  amount: number;
  baseCurrency?: Currency;
  label?: string;
  className?: string;
}

export function TotalWithConversions({ amount, baseCurrency = 'VND', label = 'Total', className = '' }: TotalWithConversionsProps) {
  const { currency, formatMultipleCurrency } = useCurrency();
  
  const formatted = formatMultipleCurrency(amount, baseCurrency);
  
  // Primary amount is the currently selected currency
  const primaryAmount = currency === 'VND' ? formatted.vnd : 
                        currency === 'KRW' ? formatted.krw : 
                        currency === 'USD' ? formatted.usd :
                        currency === 'JPY' ? formatted.jpy : formatted.cny;

  // Show other major currencies as conversions
  const conversion1 = currency === 'VND' ? formatted.usd : formatted.vnd;
  const conversion2 = currency === 'VND' ? formatted.krw : 
                      currency === 'KRW' ? formatted.usd : formatted.krw;

  return (
    <div className={`bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 ${className}`}>
      <div className="flex items-baseline justify-between">
        <span className="text-lg font-semibold text-slate-700">{label}:</span>
        <div className="text-right">
          <div className="text-3xl font-bold text-primary">{primaryAmount}</div>
          <div className="text-sm text-slate-600 mt-1 space-x-2">
            <span className="opacity-75">~{conversion1}</span>
            <span className="opacity-50">|</span>
            <span className="opacity-75">~{conversion2}</span>
          </div>
        </div>
      </div>
    </div>
  );
}