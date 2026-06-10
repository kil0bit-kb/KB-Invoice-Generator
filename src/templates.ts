import { InvoiceData } from "./types";

export function renderTemplate(templateId: string, data: InvoiceData): string {
  // Common calculation helpers
  const subtotal = data.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const discountVal = data.visibility.discount ? (subtotal * data.discountPercent) / 100 : 0;
  const taxableAmount = subtotal - discountVal;
  const taxVal = data.visibility.tax ? (taxableAmount * data.taxPercent) / 100 : 0;
  const shippingVal = data.visibility.shipping ? data.shippingCharge : 0;
  const total = taxableAmount + taxVal + shippingVal;

  // Render dynamic items table rows
  const itemRowsHtml = data.items.map((item, index) => `
    <tr data-item-id="${item.id}" draggable="true" data-item-index="${index}">
      <td class="col-drag" title="Drag to reorder">⋮⋮</td>
      <td class="col-desc">
        <textarea class="edit-field item-field" data-item-index="${index}" data-item-prop="description" rows="2" placeholder="Item description & details">${item.description}</textarea>
      </td>
      <td class="col-qty">
        <input type="number" class="edit-field item-field text-right" data-item-index="${index}" data-item-prop="quantity" min="0" step="any" value="${item.quantity}" />
      </td>
      <td class="col-rate">
        <input type="number" class="edit-field item-field text-right" data-item-index="${index}" data-item-prop="rate" min="0" step="any" value="${item.rate}" />
      </td>
      <td class="col-amount col-val">
        ${(item.quantity * item.rate).toFixed(2)} ${data.currency}
      </td>
      <td class="col-action">
        <button class="btn-remove-item" data-remove-index="${index}" title="Remove Item">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
        </button>
      </td>
    </tr>
  `).join("");

  if (templateId === "template1") {
    // Template 1 Layout (Modern Offset)
    return `
      <div class="t1-container" style="--inv-accent: ${data.accentColor || '#000000'};">
        <!-- Header -->
        <div class="t1-header" style="margin-bottom: 2rem;">
          <div class="t1-company-details">
            ${data.visibility.logo && data.logoUrl ? `
              <div class="removable-wrapper" style="margin-bottom: 1.25rem;">
                <button class="btn-hide-section" data-hide-section="logo" title="Hide Logo">×</button>
                <div class="invoice-logo-container" style="text-align: left;">
                  <img src="${data.logoUrl}" style="max-height: 50px; max-width: 140px; object-fit: contain; display: block;" alt="Logo" />
                </div>
              </div>
            ` : ""}
          </div>
          
          <div class="t1-invoice-meta-top" style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; width: 50%;">
            <div style="font-size: 2.2rem; font-weight: 800; text-transform: uppercase; color: var(--inv-accent); letter-spacing: 0.05em; line-height: 1;">Invoice #</div>
            <input type="text" class="edit-field text-right" style="font-weight: 700; font-size: 1.1rem; width: 120px; text-align: right; margin-top: 0.4rem; padding: 0; color: var(--inv-accent);" data-field="invoiceNumber" value="${data.invoiceNumber}" placeholder="INV-0001" />
          </div>
        </div>

        <!-- Billing Info & Metadata Stacked -->
        <div class="t1-billing-row" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 1.5rem; align-items: flex-start;">
          <div>
            <div class="t1-section-label">Bill to:</div>
            <input type="text" class="edit-field" style="font-weight: 600; font-size: 1.05rem;" data-field="clientName" value="${data.clientName}" placeholder="Client Name" />
            
            ${data.visibility.clientAddress ? `
              <div class="removable-wrapper" style="margin-top: 4px;">
                <button class="btn-hide-section" data-hide-section="clientAddress" title="Hide Address">×</button>
                <textarea class="edit-field" style="font-size: 0.85rem;" data-field="clientAddress" placeholder="Client Address">${data.clientAddress}</textarea>
              </div>
            ` : ""}
            
            ${data.visibility.clientContact ? `
              <div class="removable-wrapper" style="margin-top: 4px;">
                <button class="btn-hide-section" data-hide-section="clientContact" title="Hide Contact">×</button>
                <textarea class="edit-field" style="font-size: 0.85rem;" data-field="clientContact" placeholder="Client Contact Details">${data.clientContact}</textarea>
              </div>
            ` : ""}
          </div>
          
          <div style="text-align: right; display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-end; margin-top: 0.25rem;">
            ${data.visibility.paymentTerms ? `
              <div class="removable-wrapper" style="width: 180px; text-align: right;">
                <button class="btn-hide-section font-side" data-hide-section="paymentTerms" title="Hide Payment Terms">×</button>
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--inv-text-muted); font-weight: 700; letter-spacing: 0.05em; line-height: 1;">Payment Terms</div>
                <input type="text" class="edit-field text-right" style="font-weight: 600; margin-top: 2px; text-align: right;" data-field="paymentTerms" value="${data.paymentTerms}" placeholder="Net 30" />
              </div>
            ` : ""}
            
            <div style="display: flex; gap: 1.5rem; justify-content: flex-end; width: 100%; margin-top: 2px;">
              <div style="width: 120px; text-align: right;">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--inv-text-muted); font-weight: 700; letter-spacing: 0.05em; line-height: 1;">Date</div>
                <input type="date" class="edit-field text-right" style="font-size: 0.85rem; margin-top: 2px; text-align: right;" data-field="invoiceDate" value="${data.invoiceDate}" />
              </div>
              <div style="width: 120px; text-align: right;">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--inv-text-muted); font-weight: 700; letter-spacing: 0.05em; line-height: 1;">Due Date</div>
                <input type="date" class="edit-field text-right" style="font-size: 0.85rem; margin-top: 2px; text-align: right;" data-field="dueDate" value="${data.dueDate}" />
              </div>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
          <thead>
            <tr>
              <th class="col-drag"></th>
              <th class="col-desc">Item</th>
              <th class="col-qty" style="text-align: right;">Qty</th>
              <th class="col-rate" style="text-align: right;">Rate</th>
              <th class="col-amount" style="text-align: right;">Amount</th>
              <th class="col-action"></th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
          </tbody>
        </table>

        <button class="btn-add-item" id="add-item-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Item
        </button>

        <!-- Calculation Block -->
        <div class="t1-summary-block">
          <div class="t1-summary-label">Subtotal:</div>
          <div class="t1-summary-val" id="calc-subtotal">${subtotal.toFixed(2)} ${data.currency}</div>
          
          ${data.visibility.discount ? `
            <div class="removable-wrapper" style="grid-column: 1 / span 2; display: grid; grid-template-columns: 1.2fr 1fr;">
              <button class="btn-hide-section font-side" data-hide-section="discount" title="Hide Discount">×</button>
              <div class="t1-summary-label" id="lbl-discount" style="display: inline-flex; align-items: center; gap: 2px;">
                Discount (<input type="number" class="edit-field inline-calc-trigger text-center" data-calc-field="discountPercent" min="0" max="100" style="width: 32px; padding: 0; text-align: center; border-bottom: 1px dashed var(--inv-border); font-size: 0.85rem;" value="${data.discountPercent}" />%):
              </div>
              <div class="t1-summary-val" id="calc-discount">- ${discountVal.toFixed(2)} ${data.currency}</div>
            </div>
          ` : ""}
          
          ${data.visibility.tax ? `
            <div class="removable-wrapper" style="grid-column: 1 / span 2; display: grid; grid-template-columns: 1.2fr 1fr;">
              <button class="btn-hide-section font-side" data-hide-section="tax" title="Hide Tax">×</button>
              <div class="t1-summary-label" id="lbl-tax" style="display: inline-flex; align-items: center; gap: 2px;">
                Tax (<input type="number" class="edit-field inline-calc-trigger text-center" data-calc-field="taxPercent" min="0" max="100" style="width: 32px; padding: 0; text-align: center; border-bottom: 1px dashed var(--inv-border); font-size: 0.85rem;" value="${data.taxPercent}" />%):
              </div>
              <div class="t1-summary-val" id="calc-tax">+ ${taxVal.toFixed(2)} ${data.currency}</div>
            </div>
          ` : ""}
          
          ${data.visibility.shipping ? `
            <div class="removable-wrapper" style="grid-column: 1 / span 2; display: grid; grid-template-columns: 1.2fr 1fr;">
              <button class="btn-hide-section font-side" data-hide-section="shipping" title="Hide Shipping">×</button>
              <div class="t1-summary-label" id="lbl-shipping">Shipping:</div>
              <div class="t1-summary-val" id="calc-shipping" style="display: inline-flex; align-items: center; justify-content: flex-end; gap: 4px;">
                + <input type="number" class="edit-field inline-calc-trigger text-right" data-calc-field="shippingCharge" min="0" style="width: 50px; padding: 0; text-align: right; border-bottom: 1px dashed var(--inv-border); font-size: 0.85rem;" value="${data.shippingCharge}" /> ${data.currency}
              </div>
            </div>
          ` : ""}
          
          <div class="t1-summary-label t1-summary-total">Total:</div>
          <div class="t1-summary-val t1-summary-total" id="calc-total">${total.toFixed(2)} ${data.currency}</div>
        </div>

        <!-- Footer / Details Section -->
        ${(data.visibility.companyAddress || data.visibility.companyContact || data.visibility.bankDetails) ? `
          <div class="t1-footer-section">
            <div class="t1-footer-col col-info" style="flex: 1 1 100%; display: flex; gap: 3rem;">
              ${(data.visibility.companyAddress || data.visibility.companyContact) ? `
                <div style="flex: 1 1 0px; display: flex; flex-direction: column; gap: 0.4rem;">
                  ${data.visibility.companyAddress ? `
                    <div class="removable-wrapper" style="display: flex; flex-direction: column;">
                      <button class="btn-hide-section" data-hide-section="companyAddress" title="Hide Address">×</button>
                      <input type="text" class="edit-field" style="font-size: 0.95rem; font-weight: 700; padding: 0 4px;" data-field="companyName" value="${data.companyName}" placeholder="Your Company Name" />
                      <textarea class="edit-field" style="font-size: 0.85rem; margin-top: 2px;" data-field="companyAddress" placeholder="Company Address">${data.companyAddress}</textarea>
                    </div>
                  ` : ""}
                  ${data.visibility.companyContact ? `
                    <div class="removable-wrapper">
                      <button class="btn-hide-section" data-hide-section="companyContact" title="Hide Contact">×</button>
                      <textarea class="edit-field" style="font-size: 0.85rem;" data-field="companyContact" placeholder="Contact Information">${data.companyContact}</textarea>
                    </div>
                  ` : ""}
                </div>
              ` : ""}
              
              ${data.visibility.bankDetails ? `
                <div style="flex: 1 1 0px; display: flex; flex-direction: column; gap: 4px;">
                  ${data.visibility.bankName ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="bankName" title="Hide Bank Name">×</button>
                      <span style="color: var(--inv-text-muted); font-weight: 500;">Bank:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.bankName" value="${data.bankDetails.bankName}" placeholder="Bank Name" />
                    </div>
                  ` : ""}
                  ${data.visibility.accountName ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="accountName" title="Hide Account Name">×</button>
                      <span style="color: var(--inv-text-muted); font-weight: 500;">Account:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.accountName" value="${data.bankDetails.accountName}" placeholder="Account Name" />
                    </div>
                  ` : ""}
                  ${data.visibility.accountNo ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="accountNo" title="Hide Account Number">×</button>
                      <span style="color: var(--inv-text-muted); font-weight: 500;">A/C No:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.accountNo" value="${data.bankDetails.accountNo}" placeholder="Account Number" />
                    </div>
                  ` : ""}
                  ${data.visibility.swiftCode ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="swiftCode" title="Hide SWIFT Code">×</button>
                      <span style="color: var(--inv-text-muted); font-weight: 500;">SWIFT:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.swiftCode" value="${data.bankDetails.swiftCode || ''}" placeholder="SWIFT Code" />
                    </div>
                  ` : ""}
                  ${data.visibility.routingCode ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="routingCode" title="Hide Routing">×</button>
                      <span style="color: var(--inv-text-muted); font-weight: 500;">Routing:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.routingCode" value="${data.bankDetails.routingCode || ''}" placeholder="Routing/Sort Code" />
                    </div>
                  ` : ""}
                </div>
              ` : ""}
            </div>
          </div>
        ` : ""}

        <!-- Thank You Message Centered at Absolute Bottom -->
        ${data.visibility.additionalNotes ? `
          <div class="removable-wrapper" style="margin-top: 2.5rem; text-align: center; width: 100%;">
            <button class="btn-hide-section" data-hide-section="additionalNotes" title="Hide Notes" style="left: 50%; transform: translateX(-50%); top: -14px;">×</button>
            <textarea class="edit-field text-center" style="text-align: center; font-style: italic; font-size: 0.95rem; width: 100%; border: none;" data-field="additionalNotes" placeholder="Thank you for your business!">${data.additionalNotes}</textarea>
          </div>
        ` : ""}
      </div>
    `;
  } else {
    // Template 2 Layout (Classic Invoice Header)
    return `
      <div class="t2-container" style="--inv-accent: ${data.accentColor || '#000000'};">
        <!-- Header -->
        <div class="t2-header" style="margin-bottom: 1.5rem;">
          <div class="t2-title-block">
            ${data.visibility.logo && data.logoUrl ? `
              <div class="removable-wrapper" style="margin-bottom: 1.25rem;">
                <button class="btn-hide-section" data-hide-section="logo" title="Hide Logo">×</button>
                <div class="invoice-logo-container" style="text-align: left;">
                  <img src="${data.logoUrl}" style="max-height: 50px; max-width: 140px; object-fit: contain; display: block;" alt="Logo" />
                </div>
              </div>
            ` : ""}
          </div>
          
          <div style="text-align: right; display: flex; flex-direction: column; align-items: flex-end; width: 50%;">
            <div style="font-size: 2.2rem; font-weight: 800; text-transform: uppercase; color: var(--inv-accent); letter-spacing: 0.05em; line-height: 1;">Invoice #</div>
            <input type="text" class="edit-field text-right" style="font-weight: 700; font-size: 1.1rem; width: 120px; text-align: right; margin-top: 0.4rem; padding: 0; color: var(--inv-accent);" data-field="invoiceNumber" value="${data.invoiceNumber}" placeholder="INV-0001" />
          </div>
        </div>

        <!-- Billing Info & Metadata Stacked -->
        <div class="t2-billing-row" style="display: grid; grid-template-columns: 1.5fr 1fr; gap: 2rem; margin-bottom: 1.25rem; align-items: flex-start;">
          <div>
            <div class="t2-section-label">Bill to:</div>
            <input type="text" class="edit-field" style="font-weight: 700; font-size: 1.1rem; margin-bottom: 4px;" data-field="clientName" value="${data.clientName}" placeholder="Client Name" />
            
            ${data.visibility.clientAddress ? `
              <div class="removable-wrapper">
                <button class="btn-hide-section" data-hide-section="clientAddress" title="Hide Address">×</button>
                <textarea class="edit-field" data-field="clientAddress" placeholder="Client Address">${data.clientAddress}</textarea>
              </div>
            ` : ""}
            
            ${data.visibility.clientContact ? `
              <div class="removable-wrapper" style="margin-top: 4px;">
                <button class="btn-hide-section" data-hide-section="clientContact" title="Hide Contact">×</button>
                <textarea class="edit-field" style="margin-top: 4px;" data-field="clientContact" placeholder="Client Contact Details">${data.clientContact}</textarea>
              </div>
            ` : ""}
          </div>
          
          <div style="text-align: right; display: flex; flex-direction: column; gap: 0.6rem; align-items: flex-end; margin-top: 0.25rem;">
            ${data.visibility.paymentTerms ? `
              <div class="removable-wrapper" style="width: 180px; text-align: right;">
                <button class="btn-hide-section font-side" data-hide-section="paymentTerms" title="Hide Payment Terms">×</button>
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--inv-text-muted); font-weight: 700; letter-spacing: 0.05em; line-height: 1;">Payment Terms</div>
                <input type="text" class="edit-field text-right" style="font-weight: 600; margin-top: 2px; text-align: right;" data-field="paymentTerms" value="${data.paymentTerms}" placeholder="Net 30" />
              </div>
            ` : ""}
            
            <div style="display: flex; gap: 1.5rem; justify-content: flex-end; width: 100%; margin-top: 2px;">
              <div style="width: 120px; text-align: right;">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--inv-text-muted); font-weight: 700; letter-spacing: 0.05em; line-height: 1;">Date</div>
                <input type="date" class="edit-field text-right" style="font-size: 0.85rem; margin-top: 2px; text-align: right;" data-field="invoiceDate" value="${data.invoiceDate}" />
              </div>
              <div style="width: 120px; text-align: right;">
                <div style="font-size: 0.7rem; text-transform: uppercase; color: var(--inv-text-muted); font-weight: 700; letter-spacing: 0.05em; line-height: 1;">Due Date</div>
                <input type="date" class="edit-field text-right" style="font-size: 0.85rem; margin-top: 2px; text-align: right;" data-field="dueDate" value="${data.dueDate}" />
              </div>
            </div>
          </div>
        </div>

        <!-- Items Table -->
        <table class="items-table">
          <thead>
            <tr>
              <th class="col-drag"></th>
              <th class="col-desc">Item</th>
              <th class="col-qty" style="text-align: right;">Qty</th>
              <th class="col-rate" style="text-align: right;">Rate</th>
              <th class="col-amount" style="text-align: right;">Amount</th>
              <th class="col-action"></th>
            </tr>
          </thead>
          <tbody>
            ${itemRowsHtml}
          </tbody>
        </table>

        <button class="btn-add-item" id="add-item-btn">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
          Add Item
        </button>

        <!-- Calculation Block -->
        <div class="t1-summary-block" style="margin-top: 2rem;">
          <div class="t1-summary-label">Subtotal:</div>
          <div class="t1-summary-val" id="calc-subtotal">${subtotal.toFixed(2)} ${data.currency}</div>
          
          ${data.visibility.discount ? `
            <div class="removable-wrapper" style="grid-column: 1 / span 2; display: grid; grid-template-columns: 1.2fr 1fr;">
              <button class="btn-hide-section font-side" data-hide-section="discount" title="Hide Discount">×</button>
              <div class="t1-summary-label" id="lbl-discount" style="display: inline-flex; align-items: center; gap: 2px;">
                Discount (<input type="number" class="edit-field inline-calc-trigger text-center" data-calc-field="discountPercent" min="0" max="100" style="width: 32px; padding: 0; text-align: center; border-bottom: 1px dashed var(--inv-border); font-size: 0.85rem;" value="${data.discountPercent}" />%):
              </div>
              <div class="t1-summary-val" id="calc-discount">- ${discountVal.toFixed(2)} ${data.currency}</div>
            </div>
          ` : ""}
          
          ${data.visibility.tax ? `
            <div class="removable-wrapper" style="grid-column: 1 / span 2; display: grid; grid-template-columns: 1.2fr 1fr;">
              <button class="btn-hide-section font-side" data-hide-section="tax" title="Hide Tax">×</button>
              <div class="t1-summary-label" id="lbl-tax" style="display: inline-flex; align-items: center; gap: 2px;">
                Tax (<input type="number" class="edit-field inline-calc-trigger text-center" data-calc-field="taxPercent" min="0" max="100" style="width: 32px; padding: 0; text-align: center; border-bottom: 1px dashed var(--inv-border); font-size: 0.85rem;" value="${data.taxPercent}" />%):
              </div>
              <div class="t1-summary-val" id="calc-tax">+ ${taxVal.toFixed(2)} ${data.currency}</div>
            </div>
          ` : ""}
          
          ${data.visibility.shipping ? `
            <div class="removable-wrapper" style="grid-column: 1 / span 2; display: grid; grid-template-columns: 1.2fr 1fr;">
              <button class="btn-hide-section font-side" data-hide-section="shipping" title="Hide Shipping">×</button>
              <div class="t1-summary-label" id="lbl-shipping">Shipping:</div>
              <div class="t1-summary-val" id="calc-shipping" style="display: inline-flex; align-items: center; justify-content: flex-end; gap: 4px;">
                + <input type="number" class="edit-field inline-calc-trigger text-right" data-calc-field="shippingCharge" min="0" style="width: 50px; padding: 0; text-align: right; border-bottom: 1px dashed var(--inv-border); font-size: 0.85rem;" value="${data.shippingCharge}" /> ${data.currency}
              </div>
            </div>
          ` : ""}
          
          <div class="t1-summary-label t1-summary-total" style="color: var(--inv-accent);">Total:</div>
          <div class="t1-summary-val t1-summary-total" id="calc-total" style="color: var(--inv-accent);">${total.toFixed(2)} ${data.currency}</div>
        </div>

        <!-- Footer / Details Section -->
        ${(data.visibility.companyAddress || data.visibility.companyContact || data.visibility.bankDetails) ? `
          <div class="t1-footer-section" style="border-top: 2px solid var(--inv-border); padding-top: 2rem; margin-top: 3.5rem;">
            <div class="t1-footer-col col-info" style="flex: 1 1 100%; display: flex; gap: 3rem;">
              ${(data.visibility.companyAddress || data.visibility.companyContact) ? `
                <div style="flex: 1 1 0px; display: flex; flex-direction: column; gap: 0.4rem;">
                  ${data.visibility.companyAddress ? `
                    <div class="removable-wrapper" style="display: flex; flex-direction: column;">
                      <button class="btn-hide-section" data-hide-section="companyAddress" title="Hide Address">×</button>
                      <input type="text" class="edit-field" style="font-size: 0.95rem; font-weight: 700; padding: 0 4px;" data-field="companyName" value="${data.companyName}" placeholder="Your Company Name" />
                      <textarea class="edit-field" style="font-size: 0.85rem; margin-top: 2px;" data-field="companyAddress" placeholder="Company Address">${data.companyAddress}</textarea>
                    </div>
                  ` : ""}
                  ${data.visibility.companyContact ? `
                    <div class="removable-wrapper">
                      <button class="btn-hide-section" data-hide-section="companyContact" title="Hide Contact">×</button>
                      <textarea class="edit-field" style="font-size: 0.85rem;" data-field="companyContact" placeholder="Contact Information">${data.companyContact}</textarea>
                    </div>
                  ` : ""}
                </div>
              ` : ""}
              
              ${data.visibility.bankDetails ? `
                <div style="flex: 1 1 0px; display: flex; flex-direction: column; gap: 4px;">
                  ${data.visibility.bankName ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="bankName" title="Hide Bank Name">×</button>
                      <span style="color: var(--inv-text-muted);">Bank:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.bankName" value="${data.bankDetails.bankName}" placeholder="Bank Name" />
                    </div>
                  ` : ""}
                  ${data.visibility.accountName ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="accountName" title="Hide Account Name">×</button>
                      <span style="color: var(--inv-text-muted);">Account:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.accountName" value="${data.bankDetails.accountName}" placeholder="Account Name" />
                    </div>
                  ` : ""}
                  ${data.visibility.accountNo ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="accountNo" title="Hide Account Number">×</button>
                      <span style="color: var(--inv-text-muted);">A/C No:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.accountNo" value="${data.bankDetails.accountNo}" placeholder="Account Number" />
                    </div>
                  ` : ""}
                  ${data.visibility.swiftCode ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="swiftCode" title="Hide SWIFT Code">×</button>
                      <span style="color: var(--inv-text-muted);">SWIFT:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.swiftCode" value="${data.bankDetails.swiftCode || ''}" placeholder="SWIFT Code" />
                    </div>
                  ` : ""}
                  ${data.visibility.routingCode ? `
                    <div class="removable-wrapper" style="display: grid; grid-template-columns: 70px 1fr; align-items: center; width: 100%;">
                      <button class="btn-hide-section" data-hide-section="routingCode" title="Hide Routing">×</button>
                      <span style="color: var(--inv-text-muted);">Routing:</span>
                      <input type="text" class="edit-field" data-field="bankDetails.routingCode" value="${data.bankDetails.routingCode || ''}" placeholder="Routing/Sort Code" />
                    </div>
                  ` : ""}
                </div>
              ` : ""}
            </div>
          </div>
        ` : ""}

        <!-- Thank You Message Centered at Absolute Bottom -->
        ${data.visibility.additionalNotes ? `
          <div class="removable-wrapper" style="margin-top: 2.5rem; text-align: center; width: 100%;">
            <button class="btn-hide-section" data-hide-section="additionalNotes" title="Hide Notes" style="left: 50%; transform: translateX(-50%); top: -14px;">×</button>
            <textarea class="edit-field text-center" style="text-align: center; font-style: italic; font-size: 0.95rem; width: 100%; border: none;" data-field="additionalNotes" placeholder="Thank you for your business!">${data.additionalNotes}</textarea>
          </div>
        ` : ""}
      </div>
    `;
  }
}
