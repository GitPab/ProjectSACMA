import React from 'react';
import { Currency } from '../context/CurrencyContext';

interface CurrencyInputProps {
  value: number;
  currency: Currency;
  onChange: (value: number, currency: Currency) => void;
  label?: string;
  placeholder?: string;
  required?: boolean;
  className?: string;
}

export function CurrencyInput({
  value,
  currency,
  onChange,
  label,
  placeholder = '0',
  required = false,
  className = ''
}: CurrencyInputProps) {
  const currencies: Array<{ code: Currency; symbol: string; flag: string }> = [
    { code: 'VND', symbol: '₫', flag: '🇻🇳' },
    { code: 'KRW', symbol: '₩', flag: '🇰🇷' },
    { code: 'USD', symbol: '$', flag: '🇺🇸' },
    { code: 'JPY', symbol: '¥', flag: '🇯🇵' },
    { code: 'CNY', symbol: '¥', flag: '🇨🇳' },
  ];

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(e.target.value) || 0;
    onChange(newValue, currency);
  };

  const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCurrency = e.target.value as Currency;
    onChange(value, newCurrency);
  };

  // Format the input value based on currency (show commas for readability)
  const formatInputValue = (val: number) => {
    return val.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Remove commas before parsing
    const rawValue = e.target.value.replace(/,/g, '');
    const newValue = parseFloat(rawValue) || 0;
    onChange(newValue, currency);
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium text-slate-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="flex gap-2">
        <div className="relative flex-1">
          <input
            type="text"
            value={value > 0 ? formatInputValue(value) : ''}
            onChange={handleInputChange}
            placeholder={placeholder}
            required={required}
            className="w-full px-3 py-2 pr-12 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary"
          />
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">
            {currencies.find(c => c.code === currency)?.symbol}
          </span>
        </div>
        <select
          value={currency}
          onChange={handleCurrencyChange}
          className="px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-white min-w-[100px]"
        >
          {currencies.map(curr => (
            <option key={curr.code} value={curr.code}>
              {curr.flag} {curr.code}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

// Helper function to display currency with proper formatting
export function formatCurrencyWithSymbol(amount: number, currency: Currency): string {
  const currencies: Record<Currency, { symbol: string; locale: string }> = {
    VND: { symbol: '₫', locale: 'vi-VN' },
    KRW: { symbol: '₩', locale: 'ko-KR' },
    USD: { symbol: '$', locale: 'en-US' },
    JPY: { symbol: '¥', locale: 'ja-JP' },
    CNY: { symbol: '¥', locale: 'zh-CN' },
  };

  const currencyInfo = currencies[currency];
  return new Intl.NumberFormat(currencyInfo.locale, {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}
