export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export interface BankDetails {
  bankName: string;
  accountName: string;
  accountNo: string;
  routingCode?: string;
  swiftCode?: string;
}

export interface InvoiceData {
  companyName: string;
  companyAddress: string;
  companyContact: string;
  
  clientName: string;
  clientAddress: string;
  clientContact: string;
  
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  
  items: InvoiceItem[];
  
  discountPercent: number;
  taxPercent: number;
  shippingCharge: number;
  currency: string;
  
  additionalNotes: string;
  paymentTerms: string;
  rentAmount: number;
  rentAmountWords: string;
  rentReceiptNumber: string;
  rentLandlordName: string;
  rentTenantName: string;
  rentPeriod: string;
  propertyAddress: string;
  paymentMode: string;
  landlordPan: string;
  bankDetails: BankDetails;
  logoUrl?: string;
  accentColor: string;
  
  visibility: {
    logo: boolean;
    companyAddress: boolean;
    companyContact: boolean;
    clientAddress: boolean;
    clientContact: boolean;
    discount: boolean;
    tax: boolean;
    shipping: boolean;
    paymentTerms: boolean;
    bankDetails: boolean;
    bankName: boolean;
    accountName: boolean;
    accountNo: boolean;
    routingCode: boolean;
    swiftCode: boolean;
    additionalNotes: boolean;
  };
}

export const FIELD_HINTS: Record<string, string> = {
  companyName: "Enter your company or business name",
  companyAddress: "Your business physical address, e.g. 123 Main St, City, Country",
  companyContact: "Email, phone number, website, or other contact info",
  clientName: "Enter the recipient's name or client business name",
  clientAddress: "Client's physical billing address",
  clientContact: "Client's email, phone number, or billing contact info",
  invoiceNumber: "Invoice unique code, e.g., INV-0001",
  invoiceDate: "Date of issue (e.g., February 27, 2025)",
  dueDate: "Due date for payment (e.g., March 27, 2025)",
  additionalNotes: "Add thank you messages or specific details here",
  paymentTerms: "Payment schedule, e.g., Net 30, Due on Receipt",
  rentAmount: "Monthly rent amount for the HRA receipt",
  rentAmountWords: "Rent amount written in words",
  rentReceiptNumber: "Unique receipt number for the rent receipt",
  rentLandlordName: "Landlord or property owner's name",
  rentTenantName: "Tenant's full name",
  rentPeriod: "Month and year covered by the rent payment",
  propertyAddress: "Full address of the rented property",
  paymentMode: "How rent was paid, e.g. bank transfer or cash",
  landlordPan: "Landlord's PAN, if applicable",
  bankName: "Name of your bank, e.g., Chase Bank",
  accountName: "Account holder name",
  accountNo: "Bank account or IBAN number",
  routingCode: "Routing/Sort transit number (optional)",
  swiftCode: "SWIFT/BIC bank routing identifier code (optional)",
  currency: "Currency symbol or code (e.g., USD, EUR, GBP)",
  discountPercent: "Discount percentage to subtract from subtotal (0-100)",
  taxPercent: "Tax rate percentage to add to subtotal (0-100)",
  shippingCharge: "Flat rate shipping cost to add",
  itemDescription: "Item or service description (e.g. Website development)",
  itemQuantity: "Number of units or hours worked",
  itemRate: "Price per unit or hourly rate",
};
