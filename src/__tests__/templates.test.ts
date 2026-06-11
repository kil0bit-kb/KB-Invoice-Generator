import { describe, it, expect } from "vitest";
import { renderTemplate } from "../templates";
import { DEFAULT_INVOICE_DATA } from "../data";
import type { InvoiceData } from "../types";

function cloneDefaults(): InvoiceData {
  return JSON.parse(JSON.stringify(DEFAULT_INVOICE_DATA));
}

describe("renderTemplate", () => {
  describe("template1 (Modern Offset)", () => {
    it("renders the correct container class", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('class="t1-container"');
    });

    it("renders the invoice number", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('value="INV0001"');
    });

    it("renders the company name in footer", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('value="KB Karki"');
    });

    it("renders the client name", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('value="Josh Wings"');
    });

    it("renders all item rows", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('data-item-id="item-1"');
      expect(html).toContain('data-item-id="item-2"');
    });

    it("renders item descriptions", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("Product A");
      expect(html).toContain("Consultation Services");
    });

    it("renders the table headers", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("<th class=\"col-desc\">Item</th>");
      expect(html).toContain("<th class=\"col-qty\"");
      expect(html).toContain("<th class=\"col-rate\"");
      expect(html).toContain("<th class=\"col-amount\"");
    });

    it("renders an Add Item button", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("id=\"add-item-btn\"");
      expect(html).toContain("Add Item");
    });

    it("renders bank details section when visible", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("Bank Inc.");
      expect(html).toContain("KB Karki");
      expect(html).toContain("445566998877");
    });

    it("renders company address and contact in footer", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("Kathmandu");
      expect(html).toContain("kbkarki@example.com");
    });

    it("renders additional notes section when visible", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("Thank you for your business!");
    });

    it("renders payment terms when visible", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('value="Net 7"');
    });

    it("renders invoice date and due date inputs", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('data-field="invoiceDate"');
      expect(html).toContain('data-field="dueDate"');
    });

    it("renders the accent color variable", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('--inv-accent: #000000');
    });

    it("renders the currency in the subtotal line", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("USD");
    });

    it("renders remove-item buttons for each item", () => {
      const html = renderTemplate("template1", cloneDefaults());
      const matches = html.match(/btn-remove-item/g);
      expect(matches).toHaveLength(2);
    });

    it("marks items as draggable", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('draggable="true"');
    });
  });

  describe("template2 (Classic)", () => {
    it("renders the correct container class", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('class="t2-container"');
    });

    it("renders invoice number", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('value="INV0001"');
    });

    it("renders client name", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('value="Josh Wings"');
    });

    it("renders all item rows", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('data-item-id="item-1"');
      expect(html).toContain('data-item-id="item-2"');
    });

    it("renders the accent color", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('--inv-accent: #000000');
    });

    it("renders the currency", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain("USD");
    });

    it("renders the summary block with correct class", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('class="t1-summary-block"');
    });

    it("renders total with accent color in template2", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain('style="color: var(--inv-accent);">Total:');
    });

    it("renders the classic header border-top style", () => {
      const html = renderTemplate("template2", cloneDefaults());
      expect(html).toContain("border-top: 2px solid var(--inv-border)");
    });
  });

  describe("calculations", () => {
    it("computes correct subtotal for two items", () => {
      const data = cloneDefaults();
      const subtotal = 2 * 50 + 5 * 120;
      const html = renderTemplate("template1", data);
      expect(html).toContain(`>${subtotal.toFixed(2)} USD<`);
    });

    it("applies discount percentage correctly", () => {
      const data = cloneDefaults();
      const subtotal = 2 * 50 + 5 * 120;
      const discountVal = subtotal * 0.05;
      const html = renderTemplate("template1", data);
      expect(html).toContain(`- ${discountVal.toFixed(2)} USD`);
    });

    it("applies tax on taxable amount (subtotal - discount)", () => {
      const data = cloneDefaults();
      const subtotal = 2 * 50 + 5 * 120;
      const discountVal = subtotal * 0.05;
      const taxableAmount = subtotal - discountVal;
      const taxVal = taxableAmount * 0.15;
      const html = renderTemplate("template1", data);
      expect(html).toContain(`+ ${taxVal.toFixed(2)} USD`);
    });

    it("includes shipping charge in total", () => {
      const data = cloneDefaults();
      const subtotal = 2 * 50 + 5 * 120;
      const discountVal = subtotal * 0.05;
      const taxableAmount = subtotal - discountVal;
      const taxVal = taxableAmount * 0.15;
      const total = taxableAmount + taxVal + 5;
      const html = renderTemplate("template1", data);
      expect(html).toContain(`>${total.toFixed(2)} USD<`);
    });

    it("renders correct total for template2", () => {
      const data = cloneDefaults();
      const subtotal = 2 * 50 + 5 * 120;
      const discountVal = subtotal * 0.05;
      const taxableAmount = subtotal - discountVal;
      const taxVal = taxableAmount * 0.15;
      const total = taxableAmount + taxVal + 5;
      const html = renderTemplate("template2", data);
      expect(html).toContain(`>${total.toFixed(2)} USD<`);
    });

    it("renders individual item amounts correctly", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("100.00 USD");
      expect(html).toContain("600.00 USD");
    });

    it("renders zero discount when discountPercent is 0", () => {
      const data = cloneDefaults();
      data.discountPercent = 0;
      const html = renderTemplate("template1", data);
      expect(html).toContain("- 0.00 USD");
    });

    it("renders zero tax when taxPercent is 0", () => {
      const data = cloneDefaults();
      data.taxPercent = 0;
      const html = renderTemplate("template1", data);
      expect(html).toContain("+ 0.00 USD");
    });

    it("renders zero shipping when shippingCharge is 0", () => {
      const data = cloneDefaults();
      data.shippingCharge = 0;
      const html = renderTemplate("template1", data);
      expect(html).toContain("value=\"0\"");
    });

    it("computes correct values with a single item", () => {
      const data = cloneDefaults();
      data.items = [
        { id: "item-1", description: "Single Item", quantity: 10, rate: 100 },
      ];
      const subtotal = 1000;
      const discountVal = subtotal * 0.05;
      const taxableAmount = subtotal - discountVal;
      const taxVal = taxableAmount * 0.15;
      const total = taxableAmount + taxVal + 5;
      const html = renderTemplate("template1", data);
      expect(html).toContain(`>${subtotal.toFixed(2)} USD<`);
      expect(html).toContain(`>${total.toFixed(2)} USD<`);
    });
  });

  describe("visibility toggles", () => {
    it("hides discount section when visibility.discount is false", () => {
      const data = cloneDefaults();
      data.visibility.discount = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("calc-discount");
      expect(html).not.toContain("Discount (");
    });

    it("hides tax section when visibility.tax is false", () => {
      const data = cloneDefaults();
      data.visibility.tax = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("calc-tax");
      expect(html).not.toContain("Tax (");
    });

    it("hides shipping section when visibility.shipping is false", () => {
      const data = cloneDefaults();
      data.visibility.shipping = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("calc-shipping");
      expect(html).not.toContain("Shipping:");
    });

    it("hides client address when visibility.clientAddress is false", () => {
      const data = cloneDefaults();
      data.visibility.clientAddress = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"clientAddress\"");
    });

    it("hides client contact when visibility.clientContact is false", () => {
      const data = cloneDefaults();
      data.visibility.clientContact = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"clientContact\"");
    });

    it("hides payment terms when visibility.paymentTerms is false", () => {
      const data = cloneDefaults();
      data.visibility.paymentTerms = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"paymentTerms\"");
    });

    it("hides the logo section when visibility.logo is false and logoUrl empty", () => {
      const data = cloneDefaults();
      data.visibility.logo = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("invoice-logo-container");
    });

    it("shows logo section when visibility.logo is true and logoUrl is set", () => {
      const data = cloneDefaults();
      data.logoUrl = "https://example.com/logo.png";
      data.visibility.logo = true;
      const html = renderTemplate("template1", data);
      expect(html).toContain("invoice-logo-container");
      expect(html).toContain("example.com/logo.png");
    });

    it("hides company address when visibility.companyAddress is false", () => {
      const data = cloneDefaults();
      data.visibility.companyAddress = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"companyAddress\"");
    });

    it("hides company contact when visibility.companyContact is false", () => {
      const data = cloneDefaults();
      data.visibility.companyContact = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"companyContact\"");
    });

    it("hides bank details section when visibility.bankDetails is false", () => {
      const data = cloneDefaults();
      data.visibility.bankDetails = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("Bank Inc.");
      expect(html).not.toContain("445566998877");
    });

    it("hides bank name when visibility.bankName is false", () => {
      const data = cloneDefaults();
      data.visibility.bankName = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"bankName\"");
    });

    it("hides account name when visibility.accountName is false", () => {
      const data = cloneDefaults();
      data.visibility.accountName = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"accountName\"");
    });

    it("hides account number when visibility.accountNo is false", () => {
      const data = cloneDefaults();
      data.visibility.accountNo = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"accountNo\"");
    });

    it("hides SWIFT code when visibility.swiftCode is false", () => {
      const data = cloneDefaults();
      data.visibility.swiftCode = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"swiftCode\"");
    });

    it("hides routing code when visibility.routingCode is false", () => {
      const data = cloneDefaults();
      data.visibility.routingCode = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("data-hide-section=\"routingCode\"");
    });

    it("hides additional notes when visibility.additionalNotes is false", () => {
      const data = cloneDefaults();
      data.visibility.additionalNotes = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("Thank you for your business!");
    });

    it("all discount/tax/shipping can be hidden in template2", () => {
      const data = cloneDefaults();
      data.visibility.discount = false;
      data.visibility.tax = false;
      data.visibility.shipping = false;
      const html = renderTemplate("template2", data);
      expect(html).not.toContain("calc-discount");
      expect(html).not.toContain("calc-tax");
      expect(html).not.toContain("calc-shipping");
    });

    it("subtotal and total still render when all calc sections hidden", () => {
      const data = cloneDefaults();
      data.visibility.discount = false;
      data.visibility.tax = false;
      data.visibility.shipping = false;
      const html = renderTemplate("template1", data);
      expect(html).toContain("calc-subtotal");
      expect(html).toContain("calc-total");
    });
  });

  describe("empty and edge cases", () => {
    it("renders empty tbody when items array is empty", () => {
      const data = cloneDefaults();
      data.items = [];
      const html = renderTemplate("template1", data);
      expect(html).toContain("<tbody>");
      expect(html).toContain("</tbody>");
      expect(html).not.toContain("data-item-id=");
    });

    it("renders with missing optional routingCode and hides section when visibility off", () => {
      const data = cloneDefaults();
      delete data.bankDetails.routingCode;
      data.visibility.routingCode = false;
      const html = renderTemplate("template1", data);
      expect(html).toContain("Bank Inc.");
      expect(html).not.toContain("data-hide-section=\"routingCode\"");
    });

    it("renders with missing optional swiftCode and hides section when visibility off", () => {
      const data = cloneDefaults();
      delete data.bankDetails.swiftCode;
      data.visibility.swiftCode = false;
      const html = renderTemplate("template1", data);
      expect(html).toContain("Bank Inc.");
      expect(html).not.toContain("data-hide-section=\"swiftCode\"");
    });

    it("handles empty company name gracefully", () => {
      const data = cloneDefaults();
      data.companyName = "";
      const html = renderTemplate("template1", data);
      expect(html).toContain('value=""');
    });

    it("handles zero quantity and rate items", () => {
      const data = cloneDefaults();
      data.items = [
        { id: "item-zero", description: "Zero item", quantity: 0, rate: 0 },
      ];
      const html = renderTemplate("template1", data);
      expect(html).toContain('value="0"');
      expect(html).toContain("0.00 USD");
    });

    it("handles very large quantities and rates", () => {
      const data = cloneDefaults();
      data.items = [
        { id: "item-large", description: "Large item", quantity: 999999, rate: 999999.99 },
      ];
      const html = renderTemplate("template1", data);
      expect(html).toContain((999999 * 999999.99).toFixed(2));
    });

    it("renders template2 with empty items array", () => {
      const data = cloneDefaults();
      data.items = [];
      const html = renderTemplate("template2", data);
      expect(html).toContain('class="t2-container"');
    });

    it("renders hide-section button for visible sections", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('data-hide-section="discount"');
      expect(html).toContain('data-hide-section="tax"');
      expect(html).toContain('data-hide-section="shipping"');
    });
  });

  describe("edit-field elements", () => {
    it("marks all editable inputs with edit-field class", () => {
      const html = renderTemplate("template1", cloneDefaults());
      const matches = html.match(/class="[^"]*\bedit-field\b[^"]*"/g);
      expect(matches).toBeTruthy();
      expect(matches!.length).toBeGreaterThan(5);
    });

    it("marks item fields with item-field class", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('class="edit-field item-field"');
    });

    it("uses data-field attribute for non-item inputs", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('data-field="invoiceNumber"');
      expect(html).toContain('data-field="clientName"');
      expect(html).toContain('data-field="companyName"');
    });

    it("uses data-item-index and data-item-prop for item fields", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('data-item-index="0"');
      expect(html).toContain('data-item-index="1"');
      expect(html).toContain('data-item-prop="description"');
      expect(html).toContain('data-item-prop="quantity"');
      expect(html).toContain('data-item-prop="rate"');
    });

    it("renders inline calc triggers for discount, tax, shipping", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain('data-calc-field="discountPercent"');
      expect(html).toContain('data-calc-field="taxPercent"');
      expect(html).toContain('data-calc-field="shippingCharge"');
    });
  });

  describe("template1 footer section", () => {
    it("renders footer when any footer visibility is true", () => {
      const html = renderTemplate("template1", cloneDefaults());
      expect(html).toContain("t1-footer-section");
    });

    it("omits footer when all footer visibilities are false", () => {
      const data = cloneDefaults();
      data.visibility.companyAddress = false;
      data.visibility.companyContact = false;
      data.visibility.bankDetails = false;
      const html = renderTemplate("template1", data);
      expect(html).not.toContain("t1-footer-section");
    });
  });
});
