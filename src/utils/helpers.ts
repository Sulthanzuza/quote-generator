import { LineItem } from '../types';

export const generateQuoteNumber = (): string => {
  const today = new Date();
  const year = today.getFullYear().toString().slice(-2);
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
  
  return `Q${year}${month}${day}-${random}`;
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-AE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export const calculateFutureDate = (days: number): Date => {
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date;
};

export const formatAED = (amount: number): string => {
  return `AED ${amount.toLocaleString('en-AE', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};

export const calculateLineItemAmount = (quantity: number, rate: number): number => {
  return quantity * rate;
};

export const calculateSubtotal = (lineItems: LineItem[]): number => {
  return lineItems.reduce((sum, item) => sum + item.amount, 0);
};

export const calculateTotal = (subtotal: number, discount: number = 0, tax: number = 0): number => {
  const afterDiscount = subtotal * (1 - discount / 100);
  return afterDiscount * (1 + tax / 100);
};

export const generateUniqueId = (): string => {
  return Math.random().toString(36).substring(2, 11);
};