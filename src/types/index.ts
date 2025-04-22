export interface CompanyInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  website: string;
}

export interface ClientInfo {
  name: string;
  company: string;
  address: string;
  phone: string;
  email: string;
}

export interface SubService {
  id: string;
  name: string;
  selected?: boolean;
}

export interface Service {
  id: string;
  name: string;
  subServices: SubService[];
}

export interface LineItem {
  id: string;
  service: string;
  description: string;
  quantity: number;
  rate: number;
  amount: number;
  selectedSubServices: string[];
}

export interface EstimateData {
  companyInfo: CompanyInfo;
  clientInfo: ClientInfo;
  quoteNumber: string;
  date: string;
  validUntil: string;
  lineItems: LineItem[];
  subtotal: number;
  discount: number;
  tax: number;
  total: number;
  notes: string;
}