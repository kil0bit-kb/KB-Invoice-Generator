import { DEFAULT_INVOICE_DATA } from "./data";
import { renderTemplate } from "./templates";
import { InvoiceData, FIELD_HINTS } from "./types";
import appLogoUrl from "./assets/app-logo.png";

// App State
let selectedTemplate: string | null = null;
let invoiceData: InvoiceData = JSON.parse(JSON.stringify(DEFAULT_INVOICE_DATA));

// Cache DOM Root
let appRoot: HTMLDivElement;

/**
 * Main application rendering controller.
 */
function renderApp() {
  if (!selectedTemplate) {
    renderTemplateSelector();
  } else {
    renderEditor();
  }
}

/**
 * Renders the template selection viewport.
 */
function renderTemplateSelector() {
  appRoot.className = "";
  appRoot.innerHTML = `
    <header class="app-header">
      <div class="logo-container">
        <img src="${appLogoUrl}" style="width: 2.2rem; height: 2.2rem; border-radius: 8px; object-fit: contain;" alt="Logo" />
        <div class="app-title">KB Invoice Generator</div>
      </div>
      <div>
        <span style="font-size: 0.85rem; color: var(--text-muted);">v0.1.0 (Tauri + TS)</span>
      </div>
    </header>
    
    <div class="template-selector-container">
      <h1 class="view-title">Select an Invoice Template</h1>
      <p class="view-subtitle">Choose a pre-designed premium template. You will enter details directly on the page.</p>
      
      <div class="templates-grid">
        <!-- Template 1 -->
        <div class="template-wrapper" data-template-id="template1">
          <h2 class="template-title-label">Template 1</h2>
          <div class="template-card-preview">
            <div class="mini-invoice">
              <!-- Template 1 Header: Left Company, Right Invoice -->
              <div class="mini-row-between" style="border-bottom: 1px solid #e5e7eb; padding-bottom: 3px; align-items: flex-start;">
                <div>
                  <span class="mini-blue-text" style="font-size: 5px; font-weight: 800; display: block; line-height: 1;">John Doe</span>
                  <span class="mini-gray-box" style="width: 15px; height: 2px; display: block; margin-top: 1px;"></span>
                  <span class="mini-gray-box" style="width: 25px; height: 2px; display: block; margin-top: 1px;"></span>
                </div>
                <div style="text-align: right;">
                  <span class="mini-bold-text" style="font-size: 6px; display: block; line-height: 1; color: #111827;">Invoice</span>
                  <span class="mini-gray-box" style="width: 15px; height: 2px; display: block; margin-top: 1px; margin-left: auto;"></span>
                </div>
              </div>
              
              <!-- Template 1 Billing Info Offset -->
              <div class="mini-row-between" style="margin-top: 8px; align-items: flex-start;">
                <div>
                  <span class="mini-bold-text" style="font-size: 3px; display: block; margin-bottom: 1px; color: #4b5563;">Bill to:</span>
                  <span class="mini-gray-box" style="width: 20px; height: 2px; display: block; margin-bottom: 1px;"></span>
                  <span class="mini-gray-box" style="width: 30px; height: 2px; display: block;"></span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 1px; margin-top: 2px;">
                  <span class="mini-gray-box" style="width: 20px; height: 2px;"></span>
                  <span class="mini-gray-box" style="width: 20px; height: 2px;"></span>
                </div>
              </div>
              
              <!-- table -->
              <div class="mini-table" style="margin-top: 8px; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 2px 0;">
                <div class="mini-row-between" style="font-weight: 600; font-size: 3px; border-bottom: 1px solid #f3f4f6; padding-bottom: 1px; color: #9ca3af;">
                  <span>ITEM</span>
                  <span>AMOUNT</span>
                </div>
                <div class="mini-row-between" style="padding-top: 1px;">
                  <span>Product A</span>
                  <span>100.00 USD</span>
                </div>
              </div>
              
              <!-- totals -->
              <div class="mini-totals" style="margin-top: 5px; display: flex; flex-direction: column; align-items: flex-end; gap: 1px; font-size: 3px;">
                <div class="mini-row-between" style="width: 50%;"><span>Subtotal:</span><span>100.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%; color: #ef4444;"><span>Discount:</span><span>-5.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%;"><span>Tax:</span><span>+15.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%;"><span>Shipping:</span><span>+5.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%; font-weight: bold; border-top: 1px solid #e5e7eb; padding-top: 1px; color: #111827;"><span>Total:</span><span>115.00 USD</span></div>
              </div>
            </div>
          </div>
          <button class="btn-select-premium">Select</button>
        </div>
        <!-- Template 2 -->
        <div class="template-wrapper" data-template-id="template2">
          <h2 class="template-title-label">Template 2</h2>
          <div class="template-card-preview">
            <div class="mini-invoice">
              <!-- Template 2 Header: Classic with accent rule -->
              <div class="mini-row-between" style="border-bottom: 3px solid #111827; padding-bottom: 3px; align-items: flex-start;">
                <div>
                  <span class="mini-blue-text" style="font-size: 5px; font-weight: 800; display: block; line-height: 1;">Invoice</span>
                </div>
                <div style="text-align: right;">
                  <span class="mini-blue-text" style="font-size: 5px; font-weight: 800; display: block; line-height: 1;">John Doe</span>
                  <span class="mini-gray-box" style="width: 25px; height: 2px; display: block; margin-top: 1px; margin-left: auto;"></span>
                </div>
              </div>
              
              <!-- Template 2 Billing Info -->
              <div class="mini-row-between" style="margin-top: 8px; align-items: flex-start;">
                <div>
                  <span class="mini-bold-text" style="font-size: 3px; display: block; margin-bottom: 1px; color: #4b5563;">Bill to:</span>
                  <span class="mini-gray-box" style="width: 20px; height: 2px; display: block; margin-bottom: 1px;"></span>
                  <span class="mini-gray-box" style="width: 30px; height: 2px; display: block;"></span>
                </div>
                <div style="display: flex; flex-direction: column; align-items: flex-end; gap: 1px; margin-top: 2px;">
                  <span class="mini-gray-box" style="width: 20px; height: 2px;"></span>
                  <span class="mini-gray-box" style="width: 20px; height: 2px;"></span>
                </div>
              </div>
              
              <!-- table -->
              <div class="mini-table" style="margin-top: 8px; border-top: 1px solid #e5e7eb; border-bottom: 1px solid #e5e7eb; padding: 2px 0;">
                <div class="mini-row-between" style="font-weight: 600; font-size: 3px; border-bottom: 1px solid #f3f4f6; padding-bottom: 1px; color: #9ca3af;">
                  <span>ITEM</span>
                  <span>AMOUNT</span>
                </div>
                <div class="mini-row-between" style="padding-top: 1px;">
                  <span>Product A</span>
                  <span>100.00 USD</span>
                </div>
              </div>
              
              <!-- totals -->
              <div class="mini-totals" style="margin-top: 5px; display: flex; flex-direction: column; align-items: flex-end; gap: 1px; font-size: 3px;">
                <div class="mini-row-between" style="width: 50%;"><span>Subtotal:</span><span>100.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%; color: #ef4444;"><span>Discount:</span><span>-5.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%;"><span>Tax:</span><span>+15.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%;"><span>Shipping:</span><span>+5.00 USD</span></div>
                <div class="mini-row-between" style="width: 50%; font-weight: bold; border-top: 1px solid #e5e7eb; padding-top: 1px; color: #111827;"><span>Total:</span><span>115.00 USD</span></div>
              </div>
            </div>
          </div>
          <button class="btn-select-premium">Select</button>
        </div>
      </div>
    </div>
  `;

  // Bind Card Click Events
  document.querySelectorAll(".template-wrapper").forEach((wrapper) => {
    wrapper.addEventListener("click", () => {
      const templateId = wrapper.getAttribute("data-template-id");
      if (templateId) {
        selectedTemplate = templateId;
        renderApp();
      }
    });
  });
}

/**
 * Renders the full editor layout.
 */
function renderEditor() {
  appRoot.className = "";
  
  appRoot.innerHTML = `
    <header class="app-header">
      <div class="logo-container">
        <img src="${appLogoUrl}" style="width: 2.2rem; height: 2.2rem; border-radius: 8px; object-fit: contain;" alt="Logo" />
        <div class="app-title">KB Invoice Generator</div>
      </div>
      
      <div class="header-actions">
        <button class="btn btn-secondary" id="back-to-templates">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="19" y1="12" x2="5" y2="12"></line>
            <polyline points="12 19 5 12 12 5"></polyline>
          </svg>
          Templates
        </button>
        <input type="file" id="backup-file-input" accept=".json" style="display: none;" />
        <button class="btn btn-secondary" id="btn-import-backup">
          Import Backup
        </button>
        <button class="btn btn-secondary" id="btn-export-backup">
          Export Backup
        </button>
        <button class="btn btn-primary" id="btn-export-pdf">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
            <polyline points="14 2 14 8 20 8"></polyline>
            <line x1="16" y1="13" x2="8" y2="13"></line>
            <line x1="16" y1="17" x2="8" y2="17"></line>
            <polyline points="10 9 9 9 8 9"></polyline>
          </svg>
          Export PDF
        </button>
      </div>
    </header>

    <div class="editor-layout">
      <!-- Invoice Visual Area -->
      <div class="editor-viewport">
        <div class="invoice-paper" id="invoice-paper-content">
          ${renderTemplate(selectedTemplate!, invoiceData)}
        </div>
      </div>

      <!-- Settings & Hints Sidebar -->
      <aside class="sidebar-panel">
        <div class="sidebar-section">
          <div class="sidebar-section-title">Invoice Adjustments</div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 0.5rem;">
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Currency</label>
              <input type="text" class="edit-field" style="background: rgba(255,255,255,0.05); padding: 0.4rem; border: 1px solid var(--border-color); color: white;" id="sidebar-currency" value="${invoiceData.currency}" data-sidebar-field="currency" />
            </div>
            
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Discount (%)</label>
              <input type="number" class="edit-field" style="background: rgba(255,255,255,0.05); padding: 0.4rem; border: 1px solid var(--border-color); color: white;" id="sidebar-discount" min="0" max="100" value="${invoiceData.discountPercent}" data-sidebar-field="discountPercent" />
            </div>
          </div>
          
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem; margin-top: 0.5rem;">
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Tax (%)</label>
              <input type="number" class="edit-field" style="background: rgba(255,255,255,0.05); padding: 0.4rem; border: 1px solid var(--border-color); color: white;" id="sidebar-tax" min="0" max="100" value="${invoiceData.taxPercent}" data-sidebar-field="taxPercent" />
            </div>
            
            <div>
              <label style="font-size: 0.75rem; color: var(--text-muted); display: block; margin-bottom: 0.25rem;">Shipping (${invoiceData.currency})</label>
              <input type="number" class="edit-field" style="background: rgba(255,255,255,0.05); padding: 0.4rem; border: 1px solid var(--border-color); color: white;" id="sidebar-shipping" min="0" value="${invoiceData.shippingCharge}" data-sidebar-field="shippingCharge" />
            </div>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Brand Theme Color</div>
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem; flex-wrap: wrap;">
            <button class="color-preset-btn" data-color="#000000" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-color); background: #000000; cursor: pointer; padding: 0;" title="Default Black"></button>
            <button class="color-preset-btn" data-color="#2563eb" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-color); background: #2563eb; cursor: pointer; padding: 0;" title="Blue"></button>
            <button class="color-preset-btn" data-color="#16a34a" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-color); background: #16a34a; cursor: pointer; padding: 0;" title="Green"></button>
            <button class="color-preset-btn" data-color="#7c3aed" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-color); background: #7c3aed; cursor: pointer; padding: 0;" title="Violet"></button>
            <button class="color-preset-btn" data-color="#dc2626" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-color); background: #dc2626; cursor: pointer; padding: 0;" title="Red"></button>
            <button class="color-preset-btn" data-color="#d97706" style="width: 24px; height: 24px; border-radius: 50%; border: 1px solid var(--border-color); background: #d97706; cursor: pointer; padding: 0;" title="Gold"></button>
            <input type="color" id="sidebar-accent-color" style="width: 32px; height: 32px; border: none; padding: 0; background: transparent; cursor: pointer; border-radius: 4px;" value="${invoiceData.accentColor}" title="Custom Color" />
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Invoice Logo</div>
          <input type="file" id="sidebar-logo-upload" accept="image/*" style="display: none;" />
          <div style="display: flex; gap: 0.5rem; align-items: center; margin-top: 0.5rem;">
            <button class="btn btn-secondary" style="padding: 0.45rem 0.9rem; font-size: 0.8rem; flex: 1;" id="btn-trigger-logo-upload">
              ${invoiceData.logoUrl ? "Change Logo" : "Upload Logo"}
            </button>
            ${invoiceData.logoUrl ? `
              <button class="btn btn-secondary" style="padding: 0.45rem 0.9rem; font-size: 0.8rem; border-color: rgba(239, 68, 68, 0.3); color: #ef4444;" id="btn-remove-logo">
                Remove
              </button>
            ` : ""}
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Visible Sections</div>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.6rem; font-size: 0.8rem; margin-top: 0.5rem;">
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="logo" ${invoiceData.visibility.logo ? 'checked' : ''} /> Show Logo
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="companyAddress" ${invoiceData.visibility.companyAddress ? 'checked' : ''} /> Co. Address
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="companyContact" ${invoiceData.visibility.companyContact ? 'checked' : ''} /> Co. Contact
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="clientAddress" ${invoiceData.visibility.clientAddress ? 'checked' : ''} /> Client Address
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="clientContact" ${invoiceData.visibility.clientContact ? 'checked' : ''} /> Client Contact
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="discount" ${invoiceData.visibility.discount ? 'checked' : ''} /> Discount
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="tax" ${invoiceData.visibility.tax ? 'checked' : ''} /> Tax Row
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="shipping" ${invoiceData.visibility.shipping ? 'checked' : ''} /> Shipping Row
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="paymentTerms" ${invoiceData.visibility.paymentTerms ? 'checked' : ''} /> Payment Terms
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="bankDetails" ${invoiceData.visibility.bankDetails ? 'checked' : ''} /> Bank Block
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="bankName" ${invoiceData.visibility.bankName ? 'checked' : ''} /> Bank Name
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="accountName" ${invoiceData.visibility.accountName ? 'checked' : ''} /> Account Name
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="accountNo" ${invoiceData.visibility.accountNo ? 'checked' : ''} /> A/C Number
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="swiftCode" ${invoiceData.visibility.swiftCode ? 'checked' : ''} /> Bank SWIFT
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="routingCode" ${invoiceData.visibility.routingCode ? 'checked' : ''} /> Bank Routing
            </label>
            <label style="display: flex; align-items: center; gap: 0.4rem; cursor: pointer; color: var(--text-primary);">
              <input type="checkbox" data-visibility-toggle="additionalNotes" ${invoiceData.visibility.additionalNotes ? 'checked' : ''} /> Add. Notes
            </label>
          </div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Presets & Drafts</div>
          <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
            <input type="text" id="preset-name-input" placeholder="Draft Name..." class="edit-field" style="background: rgba(255,255,255,0.05); padding: 0.45rem; border: 1px solid var(--border-color); color: white; font-size: 0.8rem;" />
            <button class="btn btn-primary" id="btn-save-preset" style="padding: 0.45rem 0.9rem; font-size: 0.8rem; background: linear-gradient(135deg, #3b82f6, #2563eb);">Save</button>
          </div>
          <div id="presets-list-container" style="display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.5rem; max-height: 150px; overflow-y: auto;"></div>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-section-title">Contextual Help Hint</div>
          <div class="hint-box" id="hint-display-box">
            <div class="hint-title">
              <span>💡</span> <span id="hint-title-text">Company Name</span>
            </div>
            <p id="hint-desc-text">Enter your company or business name</p>
          </div>
        </div>
        
        <div class="sidebar-section" style="margin-top: auto;">
          <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; border-top: 1px solid var(--border-color); padding-top: 1rem;">
            Tip: Press <strong>Ctrl + P</strong> or click <strong>Export PDF</strong> to print.
          </div>
        </div>
      </aside>
    </div>
  `;

  // Bind Actions
  document.getElementById("back-to-templates")?.addEventListener("click", () => {
    selectedTemplate = null;
    renderApp();
  });

  document.getElementById("btn-export-pdf")?.addEventListener("click", () => {
    window.print();
  });

  // Export backup listener
  document.getElementById("btn-export-backup")?.addEventListener("click", () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(invoiceData, null, 2));
    const downloadAnchor = document.createElement("a");
    const dateStr = new Date().toISOString().split("T")[0];
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `invoice-backup-${invoiceData.invoiceNumber || "draft"}-${dateStr}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  // Import backup listener
  const backupFileInput = document.getElementById("backup-file-input") as HTMLInputElement | null;
  document.getElementById("btn-import-backup")?.addEventListener("click", () => {
    backupFileInput?.click();
  });
  backupFileInput?.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && typeof parsed === "object" && Array.isArray(parsed.items)) {
            invoiceData = {
              ...JSON.parse(JSON.stringify(DEFAULT_INVOICE_DATA)),
              ...parsed,
              bankDetails: { ...DEFAULT_INVOICE_DATA.bankDetails, ...(parsed.bankDetails || {}) },
              visibility: { ...DEFAULT_INVOICE_DATA.visibility, ...(parsed.visibility || {}) },
            };
            refreshPaper();
          } else {
            alert("Invalid invoice backup file format.");
          }
        } catch (err) {
          alert("Failed to parse backup file: " + err);
        }
        target.value = "";
      };
      reader.readAsText(file);
    }
  });

  // Logo uploader triggers
  const logoInput = document.getElementById("sidebar-logo-upload") as HTMLInputElement | null;
  const triggerBtn = document.getElementById("btn-trigger-logo-upload");
  const removeBtn = document.getElementById("btn-remove-logo");

  triggerBtn?.addEventListener("click", () => {
    logoInput?.click();
  });

  logoInput?.addEventListener("change", (e) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0]) {
      const file = target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          invoiceData.logoUrl = event.target.result as string;
          renderEditor(); // Redraw the UI to reflect new image and layout button states
        }
      };
      reader.readAsDataURL(file);
    }
  });

  removeBtn?.addEventListener("click", () => {
    invoiceData.logoUrl = "";
    renderEditor();
  });

  // Brand Accent Color Picker
  const colorPickerInput = document.getElementById("sidebar-accent-color") as HTMLInputElement | null;
  colorPickerInput?.addEventListener("input", (e) => {
    const target = e.target as HTMLInputElement;
    invoiceData.accentColor = target.value;
    const paperWrapper = document.querySelector(".t1-container, .t2-container") as HTMLDivElement | null;
    if (paperWrapper) {
      paperWrapper.style.setProperty("--inv-accent", invoiceData.accentColor);
    }
  });

  document.querySelectorAll(".color-preset-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const color = btn.getAttribute("data-color");
      if (color) {
        invoiceData.accentColor = color;
        if (colorPickerInput) colorPickerInput.value = color;
        const paperWrapper = document.querySelector(".t1-container, .t2-container") as HTMLDivElement | null;
        if (paperWrapper) {
          paperWrapper.style.setProperty("--inv-accent", invoiceData.accentColor);
        }
      }
    });
  });

  // Sidebar adjustments controls (bind once)
  document.querySelectorAll("[data-sidebar-field]").forEach((el) => {
    const input = el as HTMLInputElement;
    input.addEventListener("focus", () => {
      const field = input.getAttribute("data-sidebar-field") || "";
      updateHint(field);
    });
    input.addEventListener("input", () => {
      const field = input.getAttribute("data-sidebar-field") || "";
      if (field === "currency") {
        invoiceData.currency = input.value;
        refreshPaper(); // currency affects labels, need full paper refresh
      } else if (field === "discountPercent") {
        invoiceData.discountPercent = Math.max(0, Math.min(100, parseFloat(input.value) || 0));
        updateCalculations();
      } else if (field === "taxPercent") {
        invoiceData.taxPercent = Math.max(0, Math.min(100, parseFloat(input.value) || 0));
        updateCalculations();
      } else if (field === "shippingCharge") {
        invoiceData.shippingCharge = Math.max(0, parseFloat(input.value) || 0);
        updateCalculations();
      }
    });
  });

  // Handle visibility checkboxes (bind once)
  document.querySelectorAll("[data-visibility-toggle]").forEach((el) => {
    const checkbox = el as HTMLInputElement;
    checkbox.addEventListener("change", () => {
      const field = checkbox.getAttribute("data-visibility-toggle") as keyof typeof invoiceData.visibility;
      invoiceData.visibility[field] = checkbox.checked;
      refreshPaper();
    });
  });

  // Presets Save listener
  const savePresetBtn = document.getElementById("btn-save-preset");
  const presetNameInput = document.getElementById("preset-name-input") as HTMLInputElement | null;

  savePresetBtn?.addEventListener("click", () => {
    if (!presetNameInput) return;
    const name = presetNameInput.value.trim();
    if (!name) {
      alert("Please enter a name for the draft.");
      return;
    }

    const presetsRaw = localStorage.getItem("invoice_presets");
    const presets: Record<string, InvoiceData> = presetsRaw ? JSON.parse(presetsRaw) : {};

    presets[name] = JSON.parse(JSON.stringify(invoiceData));
    localStorage.setItem("invoice_presets", JSON.stringify(presets));
    
    presetNameInput.value = "";
    renderPresetsList();
  });

  // Render presets list initially
  renderPresetsList();

  bindEditorEvents();
  updateCalculations();
}

/**
 * Attaches field monitoring, focus listeners, and modification handlers to inputs in the editor view.
 */
function bindEditorEvents() {
  const paper = document.getElementById("invoice-paper-content");
  if (!paper) return;

  // Handle simple properties
  paper.querySelectorAll("[data-field]").forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    
    // Focus -> show hint
    input.addEventListener("focus", () => {
      const fieldKey = input.getAttribute("data-field") || "";
      updateHint(fieldKey);
    });

    // Input -> save in state & update calculations (no complete re-render to avoid losing selection/focus)
    input.addEventListener("input", () => {
      const fieldPath = input.getAttribute("data-field") || "";
      if (fieldPath.startsWith("bankDetails.")) {
        const key = fieldPath.split(".")[1] as keyof typeof invoiceData.bankDetails;
        invoiceData.bankDetails[key] = input.value;
      } else {
        const key = fieldPath as keyof InvoiceData;
        (invoiceData as unknown as Record<string, string>)[key] = input.value;
        
        if (key === "invoiceDate" || key === "paymentTerms") {
          autoCalculateDueDate();
        }
      }
      if (input.tagName === "TEXTAREA") {
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
      }
      updateCalculations();
    });
  });

  // Handle line item field changes
  paper.querySelectorAll(".item-field").forEach((el) => {
    const input = el as HTMLInputElement | HTMLTextAreaElement;
    
    input.addEventListener("focus", () => {
      const prop = input.getAttribute("data-item-prop") || "";
      if (prop === "description") updateHint("itemDescription");
      else if (prop === "quantity") updateHint("itemQuantity");
      else if (prop === "rate") updateHint("itemRate");
    });

    input.addEventListener("input", () => {
      const index = parseInt(input.getAttribute("data-item-index") || "0", 10);
      const prop = input.getAttribute("data-item-prop") || "";
      
      if (prop === "description") {
        invoiceData.items[index].description = input.value;
      } else if (prop === "quantity") {
        invoiceData.items[index].quantity = parseFloat(input.value) || 0;
      } else if (prop === "rate") {
        invoiceData.items[index].rate = parseFloat(input.value) || 0;
      }

      // Update the Amount cell for this row directly
      const row = input.closest("tr");
      if (row) {
        const amountCell = row.querySelector(".col-amount");
        if (amountCell) {
          const qty = invoiceData.items[index].quantity;
          const rate = invoiceData.items[index].rate;
          amountCell.textContent = `${(qty * rate).toFixed(2)} ${invoiceData.currency}`;
        }
      }
      if (input.tagName === "TEXTAREA") {
        input.style.height = "auto";
        input.style.height = input.scrollHeight + "px";
      }
      updateCalculations();
    });
  });

  // Handle inline calculations triggers (tax, discount, shipping)
  paper.querySelectorAll(".inline-calc-trigger").forEach((el) => {
    const input = el as HTMLInputElement;
    input.addEventListener("input", () => {
      const field = input.getAttribute("data-calc-field");
      const val = Math.max(0, parseFloat(input.value) || 0);
      if (field === "discountPercent") {
        invoiceData.discountPercent = Math.min(100, val);
        const sidebarEl = document.getElementById("sidebar-discount") as HTMLInputElement | null;
        if (sidebarEl) sidebarEl.value = String(invoiceData.discountPercent);
      } else if (field === "taxPercent") {
        invoiceData.taxPercent = Math.min(100, val);
        const sidebarEl = document.getElementById("sidebar-tax") as HTMLInputElement | null;
        if (sidebarEl) sidebarEl.value = String(invoiceData.taxPercent);
      } else if (field === "shippingCharge") {
        invoiceData.shippingCharge = val;
        const sidebarEl = document.getElementById("sidebar-shipping") as HTMLInputElement | null;
        if (sidebarEl) sidebarEl.value = String(invoiceData.shippingCharge);
      }
      updateCalculations();
    });
  });

  // Handle Remove Item Button click
  paper.querySelectorAll("[data-remove-index]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const index = parseInt(btn.getAttribute("data-remove-index") || "0", 10);
      invoiceData.items.splice(index, 1);
      // Re-render paper document
      refreshPaper();
    });
  });

  // Handle Add Item Button click
  document.getElementById("add-item-btn")?.addEventListener("click", () => {
    const newItemId = `item-${Date.now()}`;
    invoiceData.items.push({
      id: newItemId,
      description: "New Item\nProvide item details here",
      quantity: 1,
      rate: 0
    });
    refreshPaper();
  });

  // Handle inline "removable section" hide buttons directly on page
  paper.querySelectorAll("[data-hide-section]").forEach((btn) => {
    btn.addEventListener("click", () => {
      const field = btn.getAttribute("data-hide-section") as keyof typeof invoiceData.visibility;
      invoiceData.visibility[field] = false;
      refreshPaper();
    });
  });

  // Drag and Drop Item Rows HTML5 event bindings
  let dragSrcEl: HTMLTableRowElement | null = null;
  const rows = paper.querySelectorAll(".items-table tbody tr");
  rows.forEach((row) => {
    const tr = row as HTMLTableRowElement;
    
    tr.addEventListener("dragstart", (e) => {
      dragSrcEl = tr;
      tr.classList.add("dragging");
      if (e.dataTransfer) {
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", tr.getAttribute("data-item-index") || "");
      }
    });
    
    tr.addEventListener("dragover", (e) => {
      if (e.preventDefault) {
        e.preventDefault();
      }
      return false;
    });
    
    tr.addEventListener("dragenter", () => {
      if (tr !== dragSrcEl) {
        tr.classList.add("drag-over");
      }
    });
    
    tr.addEventListener("dragleave", () => {
      tr.classList.remove("drag-over");
    });
    
    tr.addEventListener("dragend", () => {
      tr.classList.remove("dragging");
      rows.forEach((r) => r.classList.remove("drag-over"));
    });
    
    tr.addEventListener("drop", (e) => {
      e.stopPropagation();
      e.preventDefault();
      
      if (dragSrcEl && dragSrcEl !== tr) {
        const fromIndex = parseInt(dragSrcEl.getAttribute("data-item-index") || "-1", 10);
        const toIndex = parseInt(tr.getAttribute("data-item-index") || "-1", 10);
        
        if (fromIndex > -1 && toIndex > -1 && fromIndex !== toIndex) {
          const movedItem = invoiceData.items.splice(fromIndex, 1)[0];
          invoiceData.items.splice(toIndex, 0, movedItem);
          refreshPaper();
        }
      }
      return false;
    });
  });

  // Initialize textarea heights to fit content automatically (auto-grow)
  paper.querySelectorAll("textarea").forEach((textarea) => {
    textarea.style.height = "auto";
    textarea.style.height = textarea.scrollHeight + "px";
  });
}

/**
 * Re-renders ONLY the paper content container (useful when changing items or currency symbols).
 */
function refreshPaper() {
  const paper = document.getElementById("invoice-paper-content");
  if (paper && selectedTemplate) {
    paper.innerHTML = renderTemplate(selectedTemplate, invoiceData);
    bindEditorEvents();
    updateCalculations();

    // Sync checkboxes in sidebar
    document.querySelectorAll("[data-visibility-toggle]").forEach((el) => {
      const checkbox = el as HTMLInputElement;
      const field = checkbox.getAttribute("data-visibility-toggle") as keyof typeof invoiceData.visibility;
      checkbox.checked = invoiceData.visibility[field];
    });

    // Sync sidebar inputs
    const curEl = document.getElementById("sidebar-currency") as HTMLInputElement | null;
    const disEl = document.getElementById("sidebar-discount") as HTMLInputElement | null;
    const taxEl = document.getElementById("sidebar-tax") as HTMLInputElement | null;
    const shpEl = document.getElementById("sidebar-shipping") as HTMLInputElement | null;
    const clrEl = document.getElementById("sidebar-accent-color") as HTMLInputElement | null;
    if (curEl) curEl.value = invoiceData.currency;
    if (disEl) disEl.value = String(invoiceData.discountPercent);
    if (taxEl) taxEl.value = String(invoiceData.taxPercent);
    if (shpEl) shpEl.value = String(invoiceData.shippingCharge);
    if (clrEl) clrEl.value = invoiceData.accentColor;
  }
}

/**
 * Updates calculation values on the layout (subtotal, tax, discounts, etc.) without re-rendering inputs.
 */
function updateCalculations() {
  const subtotal = invoiceData.items.reduce((sum, item) => sum + (item.quantity * item.rate), 0);
  const discountVal = invoiceData.visibility.discount ? (subtotal * invoiceData.discountPercent) / 100 : 0;
  const taxableAmount = subtotal - discountVal;
  const taxVal = invoiceData.visibility.tax ? (taxableAmount * invoiceData.taxPercent) / 100 : 0;
  const shippingVal = invoiceData.visibility.shipping ? invoiceData.shippingCharge : 0;
  const total = taxableAmount + taxVal + shippingVal;

  const subtotalEl = document.getElementById("calc-subtotal");
  if (subtotalEl) subtotalEl.textContent = `${subtotal.toFixed(2)} ${invoiceData.currency}`;

  const discountEl = document.getElementById("calc-discount");
  if (discountEl) discountEl.textContent = `- ${discountVal.toFixed(2)} ${invoiceData.currency}`;

  const taxEl = document.getElementById("calc-tax");
  if (taxEl) taxEl.textContent = `+ ${taxVal.toFixed(2)} ${invoiceData.currency}`;

  const totalEl = document.getElementById("calc-total");
  if (totalEl) totalEl.textContent = `${total.toFixed(2)} ${invoiceData.currency}`;

  // Sync inline calc-trigger inputs on the paper to match sidebar values
  document.querySelectorAll(".inline-calc-trigger").forEach((el) => {
    const input = el as HTMLInputElement;
    const field = input.getAttribute("data-calc-field");
    if (field === "discountPercent") input.value = String(invoiceData.discountPercent);
    else if (field === "taxPercent") input.value = String(invoiceData.taxPercent);
    else if (field === "shippingCharge") input.value = String(invoiceData.shippingCharge);
  });

  // Dynamically set document title to the active invoice number for print/save filename defaults
  document.title = invoiceData.invoiceNumber ? `Invoice - ${invoiceData.invoiceNumber}` : "KB Invoice Generator";
}

/**
 * Automatically calculates and sets the dueDate based on invoiceDate and paymentTerms days.
 */
function autoCalculateDueDate() {
  if (!invoiceData.invoiceDate) return;
  
  const match = invoiceData.paymentTerms.match(/\d+/);
  if (match) {
    const days = parseInt(match[0], 10);
    const dateObj = new Date(invoiceData.invoiceDate);
    if (!isNaN(dateObj.getTime())) {
      const dueObj = new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate() + days);
      invoiceData.dueDate = dueObj.toISOString().split("T")[0];
      
      const dueDateInput = document.querySelector('[data-field="dueDate"]') as HTMLInputElement | null;
      if (dueDateInput) {
        dueDateInput.value = invoiceData.dueDate;
      }
    }
  }
}

/**
 * Dynamic context hint visualizer.
 */
function updateHint(fieldKey: string) {
  const hintTitleEl = document.getElementById("hint-title-text");
  const hintDescEl = document.getElementById("hint-desc-text");
  
  if (hintTitleEl && hintDescEl) {
    const parts = fieldKey.split(".");
    const leafKey = parts[parts.length - 1];
    let cleanTitle = leafKey.replace(/([A-Z])/g, ' $1');
    cleanTitle = cleanTitle.charAt(0).toUpperCase() + cleanTitle.slice(1);
    
    hintTitleEl.textContent = cleanTitle;
    hintDescEl.textContent = FIELD_HINTS[fieldKey] || FIELD_HINTS[leafKey] || "Enter values directly on the invoice preview.";
  }
}

/**
 * Renders the presets/drafts list from localStorage.
 */
function renderPresetsList() {
  const container = document.getElementById("presets-list-container");
  if (!container) return;

  const presetsRaw = localStorage.getItem("invoice_presets");
  const presets: Record<string, InvoiceData> = presetsRaw ? JSON.parse(presetsRaw) : {};

  const keys = Object.keys(presets);
  if (keys.length === 0) {
    container.innerHTML = `<span style="font-size: 0.75rem; color: var(--text-muted); text-align: center; display: block; margin-top: 0.5rem; font-style: italic;">No saved drafts</span>`;
    return;
  }

  container.innerHTML = keys.map((name) => `
    <div style="display: flex; justify-content: space-between; align-items: center; background: rgba(255,255,255,0.03); padding: 0.35rem 0.5rem; border: 1px solid rgba(255,255,255,0.06); border-radius: 6px; gap: 0.5rem;">
      <span class="load-preset-trigger" data-preset-name="${name}" style="font-size: 0.75rem; color: var(--text-primary); cursor: pointer; flex: 1; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; font-weight: 500;" title="Load ${name}">${name}</span>
      <button class="delete-preset-trigger" data-preset-name="${name}" style="background: transparent; border: none; color: #ef4444; cursor: pointer; font-size: 0.95rem; font-weight: 700; display: flex; align-items: center; justify-content: center; padding: 2px;" title="Delete ${name}">×</button>
    </div>
  `).join("");

  // Bind Load actions
  container.querySelectorAll(".load-preset-trigger").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-preset-name") || "";
      if (presets[name]) {
        invoiceData = JSON.parse(JSON.stringify(presets[name]));
        refreshPaper();
      }
    });
  });

  // Bind Delete actions
  container.querySelectorAll(".delete-preset-trigger").forEach((el) => {
    el.addEventListener("click", () => {
      const name = el.getAttribute("data-preset-name") || "";
      if (confirm(`Are you sure you want to delete the draft "${name}"?`)) {
        delete presets[name];
        localStorage.setItem("invoice_presets", JSON.stringify(presets));
        renderPresetsList();
      }
    });
  });
}

// Initial Bootstrapping
window.addEventListener("DOMContentLoaded", () => {
  appRoot = document.getElementById("app") as HTMLDivElement;
  
  // Initialize dynamic dates using payment terms
  const today = new Date();
  const todayStr = today.toISOString().split("T")[0];
  
  if (!invoiceData.invoiceDate) {
    invoiceData.invoiceDate = todayStr;
    if (!invoiceData.dueDate) autoCalculateDueDate();
  }
  
  renderApp();
});
