import { InvoiceData } from "./types";

export const DEFAULT_INVOICE_DATA: InvoiceData = {
  companyName: "KB Karki",
  companyAddress: "Kathmandu\n44600\nNepal",
  companyContact: "kbkarki@example.com\n+977-9876543210\nwww.kbkarki.com",
  
  clientName: "Josh Wings",
  clientAddress: "789 Pine Ave\n90210, Los Angeles\nUSA",
  clientContact: "joshwings@client.com\n+1-310-555-0199",
  
  invoiceNumber: "INV0001",
  invoiceDate: "",
  dueDate: "",
  
  items: [
    {
      id: "item-1",
      description: "Product A\nDescription of Product A",
      quantity: 2,
      rate: 50
    },
    {
      id: "item-2",
      description: "Consultation Services\nUX/UI strategy workshop",
      quantity: 5,
      rate: 120
    }
  ],
  
  discountPercent: 5,
  taxPercent: 15,
  shippingCharge: 5,
  currency: "USD",
  
  additionalNotes: "Thank you for your business!",
  paymentTerms: "Net 7",
  bankDetails: {
    bankName: "Bank Inc.",
    accountName: "KB Karki",
    accountNo: "445566998877",
    routingCode: "123456789",
    swiftCode: "BINKNPKAXXX"
  },
  logoUrl: "",
  accentColor: "#000000",
  visibility: {
    logo: true,
    companyAddress: true,
    companyContact: true,
    clientAddress: true,
    clientContact: true,
    discount: true,
    tax: true,
    shipping: true,
    paymentTerms: true,
    bankDetails: true,
    bankName: true,
    accountName: true,
    accountNo: true,
    routingCode: true,
    swiftCode: true,
    additionalNotes: true
  }
};
