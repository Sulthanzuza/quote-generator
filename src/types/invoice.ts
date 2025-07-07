export interface SubService {
  id: string;
  name: string;
}

export interface Service {
  id: string;
  name: string;
  subServices: SubService[];
}

export interface ServiceItem {
  id: string;
  service: string;
  description: string;
  selectedSubServices: string[];
  quantity: number;
  unitPrice: number;
  discount: number;
}

export interface ClientDetails {
  name: string;
  company: string;
  email: string;
  phone: string;
  address: string;
}

export interface PaymentDetails {
  method: string;
  transactionId: string;
  status: 'paid' | 'unpaid' | 'partial';
}

export interface Invoice {
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  client: ClientDetails;
  services: ServiceItem[];
  paymentDetails: PaymentDetails;
  overallDiscount: number;
  notes: string;
  subtotal: number;
  totalDiscount: number;
  taxAmount: number;
  totalAmount: number;
  currency: 'INR' | 'AED';
}

export interface CompanyDetails {
  name: string;
  address: string;
  email: string;
  phone: string;
  gstin: string;
}