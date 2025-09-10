export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  price: number;
  total: number;
}

export interface InvoiceData {
  invoiceNumber: string;
  date: string;
  dueDate: string;
  type: 'standard' | 'service' | 'product' | 'freelance' | 'gas-bill' | 'petrol-bill' | 'restaurant-bill';
  
  // Company details
  companyName: string;
  companyAddress: string;
  companyEmail: string;
  companyPhone: string;
  
  // Client details
  clientName: string;
  clientAddress: string;
  clientEmail: string;
  clientPhone: string;
  
  // Invoice items
  items: InvoiceItem[];
  
  // Financial details
  subtotal: number;
  taxRate: number;
  taxAmount: number;
  discountRate: number;
  discountAmount: number;
  total: number;
  
  // Additional info
  notes: string;
  paymentTerms: string;
}

export interface InvoiceTemplate {
  id: string;
  name: string;
  description: string;
  fields: string[];
}