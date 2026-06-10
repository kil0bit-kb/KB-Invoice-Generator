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

/**
 * Converts a numeric total to English words.
 */
export function numberToWords(num: number, currency: string = "USD"): string {
  if (num === 0) return "Zero";
  
  const ones = [
    "", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine",
    "Ten", "Eleven", "Twelve", "Thirteen", "Fourteen", "Fifteen", "Sixteen",
    "Seventeen", "Eighteen", "Nineteen"
  ];
  
  const tens = [
    "", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"
  ];
  
  const scales = ["", "Thousand", "Million", "Billion", "Trillion"];
  
  // Separate dollars and cents
  const parts = num.toFixed(2).split(".");
  const integerPart = parseInt(parts[0], 10);
  const centsPart = parseInt(parts[1], 10);
  
  function convertSection(n: number): string {
    let output = "";
    if (n >= 100) {
      output += ones[Math.floor(n / 100)] + " Hundred ";
      n %= 100;
    }
    if (n >= 20) {
      output += tens[Math.floor(n / 10)] + " ";
      n %= 10;
    }
    if (n > 0) {
      output += ones[n] + " ";
    }
    return output.trim();
  }
  
  let integerWords = "";
  if (integerPart === 0) {
    integerWords = "Zero";
  } else {
    let scaleIndex = 0;
    let tempNum = integerPart;
    
    while (tempNum > 0) {
      const section = tempNum % 1000;
      if (section > 0) {
        const sectionWords = convertSection(section);
        const scale = scales[scaleIndex];
        integerWords = sectionWords + (scale ? " " + scale : "") + " " + integerWords;
      }
      tempNum = Math.floor(tempNum / 1000);
      scaleIndex++;
    }
    integerWords = integerWords.trim();
  }
  
  let centsWords = "";
  if (centsPart > 0) {
    centsWords = ` and ${centsPart}/100`;
  } else {
    centsWords = " and 00/100";
  }
  
  const currencyName = currency.toUpperCase() === "USD" ? "Dollar" : currency;
  
  return `${integerWords}${centsWords} ${currencyName}`.replace(/\s+/g, ' ').trim();
}
