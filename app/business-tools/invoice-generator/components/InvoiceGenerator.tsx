"use client";

import { useState, useCallback, useMemo, useRef, useEffect } from "react";

// ── Types ──────────────────────────────────────────────────────────────────────
type DocType = "Invoice" | "Estimate" | "Quote" | "Receipt" | "Credit Note" | "Proforma Invoice";
type Template = "classic" | "modern" | "elegant" | "bold";
type DiscountType = "percent" | "flat";
type TaxMode = "exclusive" | "inclusive";

interface LineItem {
  id: string;
  description: string;
  qty: number;
  rate: number;
}

interface TaxLine {
  name: string;
  rate: number;
  mode: TaxMode;
}

interface PaymentInfo {
  bankName: string;
  accountName: string;
  accountNumber: string;
  routingNumber: string;
  swift: string;
  paypal: string;
  other: string;
}

interface InvoiceData {
  docType: DocType;
  template: Template;
  accentColor: string;
  // business
  logo: string;
  businessName: string;
  yourName: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  country: string;
  taxId: string;
  // client
  clientBusiness: string;
  clientName: string;
  clientEmail: string;
  clientAddress1: string;
  clientAddress2: string;
  clientCountry: string;
  // invoice
  invoiceNumber: string;
  invoiceDate: string;
  dueDate: string;
  paymentTerms: string;
  currency: string;
  poNumber: string;
  reference: string;
  // items
  items: LineItem[];
  // totals
  discountEnabled: boolean;
  discountType: DiscountType;
  discountValue: number;
  taxEnabled: boolean;
  taxes: TaxLine[];
  shippingEnabled: boolean;
  shippingLabel: string;
  shippingAmount: number;
  // notes
  notes: string;
  terms: string;
  // payment
  paymentInfo: PaymentInfo;
}

// ── Constants ──────────────────────────────────────────────────────────────────
const ACCENT_PRESETS = ["#059669", "#2563eb", "#7c3aed", "#dc2626", "#ea580c", "#ca8a04", "#0f172a", "#64748b"];

const DOC_TYPES: DocType[] = ["Invoice", "Estimate", "Quote", "Receipt", "Credit Note", "Proforma Invoice"];

const CURRENCIES: { code: string; symbol: string; name: string }[] = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CHF", symbol: "CHF", name: "Swiss Franc" },
  { code: "INR", symbol: "₹", name: "Indian Rupee" },
  { code: "BRL", symbol: "R$", name: "Brazilian Real" },
  { code: "MXN", symbol: "MX$", name: "Mexican Peso" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "KRW", symbol: "₩", name: "South Korean Won" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "HKD", symbol: "HK$", name: "Hong Kong Dollar" },
  { code: "NZD", symbol: "NZ$", name: "New Zealand Dollar" },
  { code: "SEK", symbol: "kr", name: "Swedish Krona" },
  { code: "NOK", symbol: "kr", name: "Norwegian Krone" },
  { code: "DKK", symbol: "kr", name: "Danish Krone" },
  { code: "ZAR", symbol: "R", name: "South African Rand" },
  { code: "AED", symbol: "AED", name: "UAE Dirham" },
  { code: "PHP", symbol: "₱", name: "Philippine Peso" },
  { code: "THB", symbol: "฿", name: "Thai Baht" },
  { code: "PLN", symbol: "zł", name: "Polish Zloty" },
  { code: "CZK", symbol: "Kč", name: "Czech Koruna" },
  { code: "ILS", symbol: "₪", name: "Israeli Shekel" },
];

const PAYMENT_TERMS = ["Due on Receipt", "Net 15", "Net 30", "Net 45", "Net 60", "Custom"];

const QUICK_TEMPLATES = [
  { label: "Blank Invoice", key: "blank" },
  { label: "Freelance Project", key: "freelance" },
  { label: "Consulting Hourly", key: "consulting" },
  { label: "Contractor", key: "contractor" },
  { label: "Creative Agency", key: "agency" },
];

// ── Helpers ────────────────────────────────────────────────────────────────────
function uid(): string {
  return Math.random().toString(36).slice(2, 10);
}

function today(): string {
  return new Date().toISOString().split("T")[0];
}

function addDays(dateStr: string, days: number): string {
  const d = new Date(dateStr);
  d.setDate(d.getDate() + days);
  return d.toISOString().split("T")[0];
}

function formatCurrency(amount: number, currencyCode: string): string {
  const cur = CURRENCIES.find((c) => c.code === currencyCode) ?? CURRENCIES[0];
  const decimals = currencyCode === "JPY" || currencyCode === "KRW" ? 0 : 2;
  const formatted = Math.abs(amount).toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
  return `${amount < 0 ? "-" : ""}${cur.symbol}${formatted}`;
}

function formatDateForInvoice(dateStr: string): string {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

function getTermDays(term: string): number | null {
  if (term === "Due on Receipt") return 0;
  if (term === "Net 15") return 15;
  if (term === "Net 30") return 30;
  if (term === "Net 45") return 45;
  if (term === "Net 60") return 60;
  return null;
}

function defaultData(): InvoiceData {
  const t = today();
  return {
    docType: "Invoice",
    template: "classic",
    accentColor: "#059669",
    logo: "",
    businessName: "",
    yourName: "",
    email: "",
    phone: "",
    address1: "",
    address2: "",
    country: "",
    taxId: "",
    clientBusiness: "",
    clientName: "",
    clientEmail: "",
    clientAddress1: "",
    clientAddress2: "",
    clientCountry: "",
    invoiceNumber: "INV-001",
    invoiceDate: t,
    dueDate: addDays(t, 30),
    paymentTerms: "Net 30",
    currency: "USD",
    poNumber: "",
    reference: "",
    items: [{ id: uid(), description: "", qty: 1, rate: 0 }],
    discountEnabled: false,
    discountType: "percent",
    discountValue: 0,
    taxEnabled: false,
    taxes: [{ name: "Tax", rate: 0, mode: "exclusive" }],
    shippingEnabled: false,
    shippingLabel: "Shipping",
    shippingAmount: 0,
    notes: "",
    terms: "",
    paymentInfo: { bankName: "", accountName: "", accountNumber: "", routingNumber: "", swift: "", paypal: "", other: "" },
  };
}

// ── Session persistence ────────────────────────────────────────────────────────
const STORAGE_KEY = "eft_invoice_data";

function loadFromSession(): InvoiceData | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function saveToSession(data: InvoiceData) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch { /* noop */ }
}

function getNextInvoiceNumber(): string {
  if (typeof window === "undefined") return "INV-001";
  try {
    const last = sessionStorage.getItem("eft_last_inv_num");
    if (!last) return "INV-001";
    const match = last.match(/(\d+)$/);
    if (match) {
      const next = String(parseInt(match[1]) + 1).padStart(match[1].length, "0");
      return last.replace(/\d+$/, next);
    }
    return "INV-001";
  } catch {
    return "INV-001";
  }
}

// ── Quick-fill templates ───────────────────────────────────────────────────────
function applyQuickTemplate(key: string, base: InvoiceData): InvoiceData {
  const d = { ...defaultData(), logo: base.logo, businessName: base.businessName, yourName: base.yourName, email: base.email, phone: base.phone, address1: base.address1, address2: base.address2, country: base.country, taxId: base.taxId, accentColor: base.accentColor, template: base.template };
  d.invoiceNumber = getNextInvoiceNumber();
  if (key === "freelance") {
    d.items = [{ id: uid(), description: "Design & Development Services", qty: 1, rate: 5000 }];
    d.paymentTerms = "Net 30";
    d.dueDate = addDays(d.invoiceDate, 30);
    d.notes = "Thank you for your business! Payment is due within 30 days via bank transfer or PayPal.";
  } else if (key === "consulting") {
    d.items = [
      { id: uid(), description: "Strategy consulting — discovery & planning", qty: 8, rate: 150 },
      { id: uid(), description: "Implementation advisory", qty: 12, rate: 150 },
      { id: uid(), description: "Final report & recommendations", qty: 4, rate: 150 },
    ];
    d.paymentTerms = "Net 30";
    d.dueDate = addDays(d.invoiceDate, 30);
    d.notes = "Payment via bank transfer. Details below.";
  } else if (key === "contractor") {
    d.items = [
      { id: uid(), description: "Materials (lumber, fasteners, finish)", qty: 1, rate: 2400 },
      { id: uid(), description: "Labor — framing & installation", qty: 40, rate: 75 },
      { id: uid(), description: "Permit fees", qty: 1, rate: 350 },
    ];
    d.paymentTerms = "Net 15";
    d.dueDate = addDays(d.invoiceDate, 15);
    d.notes = "All work guaranteed for 12 months. Please inspect and approve completed work within 5 business days.";
  } else if (key === "agency") {
    d.items = [
      { id: uid(), description: "Brand strategy & positioning", qty: 1, rate: 3000 },
      { id: uid(), description: "Visual identity design", qty: 1, rate: 4500 },
      { id: uid(), description: "Website development", qty: 1, rate: 8000 },
      { id: uid(), description: "Quality assurance & testing", qty: 1, rate: 1500 },
    ];
    d.paymentTerms = "Net 30";
    d.dueDate = addDays(d.invoiceDate, 30);
    d.notes = "Thank you for choosing our agency. 50% deposit required to begin work.";
  }
  return d;
}

// ── Invoice Preview Component ──────────────────────────────────────────────────
function InvoicePreview({ data, previewRef }: { data: InvoiceData; previewRef?: React.RefObject<HTMLDivElement | null> }) {
  const cur = data.currency;
  const accent = data.accentColor;

  // Calculate totals
  const subtotal = data.items.reduce((s, i) => s + i.qty * i.rate, 0);

  let discountAmount = 0;
  if (data.discountEnabled) {
    discountAmount = data.discountType === "percent" ? subtotal * (data.discountValue / 100) : data.discountValue;
  }
  const afterDiscount = subtotal - discountAmount;

  // Tax calculation
  let totalTax = 0;
  let taxableAmount = afterDiscount;
  if (data.taxEnabled) {
    for (const t of data.taxes) {
      if (t.mode === "exclusive") {
        totalTax += taxableAmount * (t.rate / 100);
      } else {
        // inclusive: tax is already in the price
        const taxIncl = taxableAmount - taxableAmount / (1 + t.rate / 100);
        totalTax += taxIncl;
      }
    }
  }

  const shippingAmt = data.shippingEnabled ? data.shippingAmount : 0;
  const grandTotal = data.taxEnabled
    ? data.taxes.some((t) => t.mode === "inclusive")
      ? afterDiscount + shippingAmt // inclusive tax: total = afterDiscount + shipping (tax already in price)
      : afterDiscount + totalTax + shippingAmt
    : afterDiscount + shippingAmt;

  const hasPayment = Object.values(data.paymentInfo).some((v) => v.trim() !== "");
  const isReceipt = data.docType === "Receipt";

  const fc = (n: number) => formatCurrency(n, cur);
  const fd = (d: string) => formatDateForInvoice(d);

  // Template-specific rendering
  const tmpl = data.template;
  const isElegant = tmpl === "elegant";
  const headingFont = isElegant ? "'Playfair Display', Georgia, serif" : "inherit";

  return (
    <div
      ref={previewRef || undefined}
      style={{
        width: "595px",
        minHeight: "842px",
        background: "#fff",
        color: "#1a1a1e",
        fontFamily: "'Inter', system-ui, sans-serif",
        fontSize: "13px",
        lineHeight: "1.5",
        position: "relative",
        overflow: "hidden",
        padding: tmpl === "bold" ? "0" : "40px",
      }}
    >
      {/* PAID stamp */}
      {isReceipt && (
        <div
          style={{
            position: "absolute",
            top: "35%",
            left: "50%",
            transform: "translate(-50%, -50%) rotate(-15deg)",
            fontSize: "80px",
            fontWeight: 900,
            color: "rgba(5, 150, 105, 0.15)",
            letterSpacing: "0.15em",
            pointerEvents: "none",
            zIndex: 10,
          }}
        >
          PAID
        </div>
      )}

      {/* ── Bold template header ── */}
      {tmpl === "bold" && (
        <div style={{ background: accent, color: "#fff", padding: "24px 40px 20px", marginBottom: "24px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              {data.logo && <img src={data.logo} alt="Logo" style={{ maxWidth: "120px", maxHeight: "50px", marginBottom: "8px", objectFit: "contain" }} />}
              <div style={{ fontSize: "28px", fontWeight: 800, letterSpacing: "0.1em", marginBottom: "4px" }}>{data.docType.toUpperCase()}</div>
              {data.businessName && <div style={{ fontSize: "16px", fontWeight: 600 }}>{data.businessName}</div>}
              {data.yourName && <div style={{ fontSize: "12px", opacity: 0.9 }}>{data.yourName}</div>}
            </div>
            <div style={{ textAlign: "right", fontSize: "12px", opacity: 0.9, lineHeight: "1.6" }}>
              {data.email && <div>{data.email}</div>}
              {data.phone && <div>{data.phone}</div>}
              {data.address1 && <div>{data.address1}</div>}
              {data.address2 && <div>{data.address2}</div>}
              {data.country && <div>{data.country}</div>}
              {data.taxId && <div>Tax ID: {data.taxId}</div>}
            </div>
          </div>
        </div>
      )}

      {/* ── Non-bold header area ── */}
      {tmpl !== "bold" && (
        <>
          {/* Modern accent bar */}
          {tmpl === "modern" && <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "6px", background: accent }} />}

          {/* Elegant centered logo */}
          {tmpl === "elegant" && data.logo && (
            <div style={{ textAlign: "center", marginBottom: "12px" }}>
              <img src={data.logo} alt="Logo" style={{ maxWidth: "150px", maxHeight: "60px", objectFit: "contain" }} />
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "24px", paddingTop: tmpl === "modern" ? "8px" : 0 }}>
            <div>
              {tmpl !== "elegant" && data.logo && (
                <img src={data.logo} alt="Logo" style={{ maxWidth: "150px", maxHeight: "60px", objectFit: "contain", marginBottom: "8px", display: "block" }} />
              )}
              {data.businessName && <div style={{ fontSize: "18px", fontWeight: 600 }}>{data.businessName}</div>}
              {data.yourName && <div style={{ fontSize: "13px", color: "#6b7280" }}>{data.yourName}</div>}
              {data.email && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.email}</div>}
              {data.phone && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.phone}</div>}
              {data.address1 && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.address1}</div>}
              {data.address2 && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.address2}</div>}
              {data.country && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.country}</div>}
              {data.taxId && <div style={{ fontSize: "12px", color: "#6b7280" }}>Tax ID: {data.taxId}</div>}
            </div>
            <div style={{ textAlign: "right" }}>
              {tmpl === "modern" && data.logo && (
                <img src={data.logo} alt="Logo" style={{ maxWidth: "120px", maxHeight: "50px", objectFit: "contain", marginBottom: "8px", display: "inline-block" }} />
              )}
              <div style={{ fontSize: "28px", fontWeight: 700, letterSpacing: "0.1em", color: tmpl === "classic" ? "#1a1a1e" : accent, fontFamily: headingFont, marginBottom: "8px" }}>
                {data.docType.toUpperCase()}
              </div>
              <div style={{ fontSize: "12px", color: "#6b7280", lineHeight: "1.8" }}>
                <div><span style={{ fontWeight: 600 }}>Invoice #:</span> {data.invoiceNumber || "—"}</div>
                <div><span style={{ fontWeight: 600 }}>Date:</span> {fd(data.invoiceDate)}</div>
                <div><span style={{ fontWeight: 600 }}>Due Date:</span> {fd(data.dueDate)}</div>
                {data.poNumber && <div><span style={{ fontWeight: 600 }}>PO #:</span> {data.poNumber}</div>}
                {data.reference && <div><span style={{ fontWeight: 600 }}>Ref:</span> {data.reference}</div>}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Bold template: invoice details row */}
      {tmpl === "bold" && (
        <div style={{ padding: "0 40px", marginBottom: "20px", display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280" }}>
          <div>
            <div><span style={{ fontWeight: 600 }}>Invoice #:</span> {data.invoiceNumber || "—"}</div>
            <div><span style={{ fontWeight: 600 }}>Date:</span> {fd(data.invoiceDate)}</div>
            <div><span style={{ fontWeight: 600 }}>Due Date:</span> {fd(data.dueDate)}</div>
            {data.poNumber && <div><span style={{ fontWeight: 600 }}>PO #:</span> {data.poNumber}</div>}
            {data.reference && <div><span style={{ fontWeight: 600 }}>Ref:</span> {data.reference}</div>}
          </div>
        </div>
      )}

      {/* Bill To */}
      <div style={{ padding: tmpl === "bold" ? "0 40px" : undefined }}>
        <div style={{ marginBottom: "20px" }}>
          <div style={{ borderTop: tmpl === "elegant" ? `1px solid #e5e7eb` : `2px solid ${accent}`, paddingTop: "12px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.08em", color: accent, marginBottom: "6px", fontFamily: headingFont }}>BILL TO</div>
            {data.clientBusiness && <div style={{ fontSize: "14px", fontWeight: 600 }}>{data.clientBusiness}</div>}
            {data.clientName && <div style={{ fontSize: "13px", color: "#6b7280" }}>{data.clientName}</div>}
            {data.clientEmail && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.clientEmail}</div>}
            {data.clientAddress1 && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.clientAddress1}</div>}
            {data.clientAddress2 && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.clientAddress2}</div>}
            {data.clientCountry && <div style={{ fontSize: "12px", color: "#6b7280" }}>{data.clientCountry}</div>}
          </div>
        </div>

        {/* Line items table */}
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "16px" }}>
          <thead>
            <tr style={{ borderBottom: tmpl === "elegant" ? "1px solid #d1d5db" : `2px solid ${accent}` }}>
              <th style={{ textAlign: "left", padding: "8px 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: tmpl === "modern" ? "#fff" : accent, background: tmpl === "modern" ? accent : "transparent", fontFamily: headingFont }}>DESCRIPTION</th>
              <th style={{ textAlign: "center", padding: "8px 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: tmpl === "modern" ? "#fff" : accent, background: tmpl === "modern" ? accent : "transparent", width: "60px" }}>QTY</th>
              <th style={{ textAlign: "right", padding: "8px 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: tmpl === "modern" ? "#fff" : accent, background: tmpl === "modern" ? accent : "transparent", width: "80px" }}>RATE</th>
              <th style={{ textAlign: "right", padding: "8px 4px", fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: tmpl === "modern" ? "#fff" : accent, background: tmpl === "modern" ? accent : "transparent", width: "90px" }}>AMOUNT</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, idx) => (
              <tr key={item.id} style={{ borderBottom: "1px solid #e5e7eb", background: tmpl === "modern" && idx % 2 === 1 ? "#f9fafb" : "transparent" }}>
                <td style={{ padding: "8px 4px", fontSize: "13px" }}>{item.description || <span style={{ color: "#d1d5db" }}>—</span>}</td>
                <td style={{ padding: "8px 4px", fontSize: "13px", textAlign: "center" }}>{item.qty}</td>
                <td style={{ padding: "8px 4px", fontSize: "13px", textAlign: "right" }}>{fc(item.rate)}</td>
                <td style={{ padding: "8px 4px", fontSize: "13px", textAlign: "right", fontWeight: 600 }}>{fc(item.qty * item.rate)}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Totals */}
        <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "24px" }}>
          <div style={{ width: "240px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "13px" }}>
              <span>Subtotal</span>
              <span>{fc(subtotal)}</span>
            </div>
            {data.discountEnabled && discountAmount > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "13px", color: "#dc2626" }}>
                <span>Discount{data.discountType === "percent" ? ` (${data.discountValue}%)` : ""}</span>
                <span>-{fc(discountAmount)}</span>
              </div>
            )}
            {data.taxEnabled && data.taxes.map((t, i) => t.rate > 0 && (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "13px" }}>
                <span>{t.name} ({t.rate}%){t.mode === "inclusive" ? " incl." : ""}</span>
                <span>{fc(t.mode === "exclusive" ? afterDiscount * (t.rate / 100) : afterDiscount - afterDiscount / (1 + t.rate / 100))}</span>
              </div>
            ))}
            {data.shippingEnabled && shippingAmt > 0 && (
              <div style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", fontSize: "13px" }}>
                <span>{data.shippingLabel || "Shipping"}</span>
                <span>{fc(shippingAmt)}</span>
              </div>
            )}
            <div style={{
              display: "flex", justifyContent: "space-between", padding: "10px 8px", marginTop: "8px",
              fontSize: "16px", fontWeight: 700, fontFamily: headingFont,
              borderTop: `2px solid ${accent}`,
              background: tmpl === "bold" || tmpl === "modern" ? accent : "transparent",
              color: tmpl === "bold" || tmpl === "modern" ? "#fff" : "#1a1a1e",
              borderRadius: tmpl === "bold" || tmpl === "modern" ? "4px" : 0,
            }}>
              <span>TOTAL DUE</span>
              <span>{fc(grandTotal)}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: accent, marginBottom: "4px", fontFamily: headingFont }}>NOTES</div>
            <div style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{data.notes}</div>
          </div>
        )}

        {/* Payment Details */}
        {hasPayment && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: accent, marginBottom: "4px", fontFamily: headingFont }}>PAYMENT DETAILS</div>
            <div style={{ fontSize: "12px", color: "#4b5563", lineHeight: "1.8" }}>
              {data.paymentInfo.bankName && <div>Bank: {data.paymentInfo.bankName}</div>}
              {data.paymentInfo.accountName && <div>Account Name: {data.paymentInfo.accountName}</div>}
              {data.paymentInfo.accountNumber && <div>Account #: {data.paymentInfo.accountNumber}</div>}
              {data.paymentInfo.routingNumber && <div>Routing #: {data.paymentInfo.routingNumber}</div>}
              {data.paymentInfo.swift && <div>SWIFT/BIC: {data.paymentInfo.swift}</div>}
              {data.paymentInfo.paypal && <div>PayPal: {data.paymentInfo.paypal}</div>}
              {data.paymentInfo.other && <div>{data.paymentInfo.other}</div>}
            </div>
          </div>
        )}

        {/* Terms */}
        {data.terms && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.05em", color: accent, marginBottom: "4px", fontFamily: headingFont }}>TERMS & CONDITIONS</div>
            <div style={{ fontSize: "11px", color: "#6b7280", lineHeight: "1.6", whiteSpace: "pre-wrap" }}>{data.terms}</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────────
interface Props {
  title?: string;
  subtitle?: string;
  defaultDocType?: DocType;
}

export default function InvoiceGenerator({ title = "Free Invoice Generator", subtitle = "Create professional invoices and download as PDF. No signup required.", defaultDocType }: Props) {
  const [data, setData] = useState<InvoiceData>(() => {
    const saved = loadFromSession();
    const d = saved ?? defaultData();
    if (defaultDocType) d.docType = defaultDocType;
    if (!saved) d.invoiceNumber = getNextInvoiceNumber();
    return d;
  });

  const [mobilePreview, setMobilePreview] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [toast, setToast] = useState("");
  const [showPayment, setShowPayment] = useState(false);
  const [dragIdx, setDragIdx] = useState<number | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);

  // Save to session on every change
  useEffect(() => {
    saveToSession(data);
  }, [data]);

  // Load Playfair Display for elegant template
  useEffect(() => {
    if (data.template === "elegant") {
      const id = "playfair-font";
      if (!document.getElementById(id)) {
        const link = document.createElement("link");
        link.id = id;
        link.rel = "stylesheet";
        link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&display=swap";
        document.head.appendChild(link);
      }
    }
  }, [data.template]);

  // Keyboard shortcuts
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === "s") { e.preventDefault(); handleDownload(); }
      if ((e.metaKey || e.ctrlKey) && e.key === "p") { e.preventDefault(); handlePrint(); }
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  });

  const update = useCallback((patch: Partial<InvoiceData>) => {
    setData((prev) => ({ ...prev, ...patch }));
  }, []);

  const updateItem = useCallback((id: string, patch: Partial<LineItem>) => {
    setData((prev) => ({
      ...prev,
      items: prev.items.map((item) => (item.id === id ? { ...item, ...patch } : item)),
    }));
  }, []);

  const addItem = useCallback(() => {
    setData((prev) => ({
      ...prev,
      items: [...prev.items, { id: uid(), description: "", qty: 1, rate: 0 }],
    }));
    // Focus new description after render
    setTimeout(() => {
      const descs = document.querySelectorAll<HTMLTextAreaElement>("[data-field='item-desc']");
      descs[descs.length - 1]?.focus();
    }, 50);
  }, []);

  const removeItem = useCallback((id: string) => {
    setData((prev) => {
      if (prev.items.length <= 1) return prev;
      return { ...prev, items: prev.items.filter((i) => i.id !== id) };
    });
  }, []);

  const handleLogo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) { setToast("Logo must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onload = () => update({ logo: reader.result as string });
    reader.readAsDataURL(file);
  }, [update]);

  const handleLogoDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (!file || !file.type.startsWith("image/")) return;
    if (file.size > 5 * 1024 * 1024) { setToast("Logo must be under 5MB"); return; }
    const reader = new FileReader();
    reader.onload = () => update({ logo: reader.result as string });
    reader.readAsDataURL(file);
  }, [update]);

  const handleTermsChange = useCallback((terms: string) => {
    const days = getTermDays(terms);
    const patch: Partial<InvoiceData> = { paymentTerms: terms };
    if (days !== null) patch.dueDate = addDays(data.invoiceDate, days);
    update(patch);
  }, [data.invoiceDate, update]);

  const handleDateChange = useCallback((invoiceDate: string) => {
    const days = getTermDays(data.paymentTerms);
    const patch: Partial<InvoiceData> = { invoiceDate };
    if (days !== null) patch.dueDate = addDays(invoiceDate, days);
    update(patch);
  }, [data.paymentTerms, update]);

  // Drag reorder
  const handleDragStart = useCallback((idx: number) => { setDragIdx(idx); }, []);
  const handleDragOver = useCallback((e: React.DragEvent, idx: number) => {
    e.preventDefault();
    if (dragIdx === null || dragIdx === idx) return;
    setData((prev) => {
      const items = [...prev.items];
      const [moved] = items.splice(dragIdx, 1);
      items.splice(idx, 0, moved);
      return { ...prev, items };
    });
    setDragIdx(idx);
  }, [dragIdx]);
  const handleDragEnd = useCallback(() => { setDragIdx(null); }, []);

  // PDF download
  const handleDownload = useCallback(async () => {
    if (!previewRef.current) return;
    setGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");
      const canvas = await html2canvas(previewRef.current, { scale: 2, useCORS: true, backgroundColor: "#ffffff" });
      const imgData = canvas.toDataURL("image/jpeg", 0.92);
      const isUS = ["USD", "CAD"].includes(data.currency);
      const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: isUS ? "letter" : "a4" });
      const pageW = pdf.internal.pageSize.getWidth();
      const pageH = pdf.internal.pageSize.getHeight();
      const ratio = canvas.width / canvas.height;
      const imgW = pageW;
      const imgH = imgW / ratio;
      if (imgH <= pageH) {
        pdf.addImage(imgData, "JPEG", 0, 0, imgW, imgH);
      } else {
        // Scale to fit page height
        const fitH = pageH;
        const fitW = fitH * ratio;
        pdf.addImage(imgData, "JPEG", 0, 0, fitW, fitH);
      }
      const num = data.invoiceNumber || "001";
      pdf.save(`invoice-${num}.pdf`);
      // save last invoice number
      sessionStorage.setItem("eft_last_inv_num", data.invoiceNumber);
      setToast("Invoice downloaded!");
      setTimeout(() => setToast(""), 3000);
    } catch (err) {
      console.error(err);
      setToast("Error generating PDF");
    } finally {
      setGenerating(false);
    }
  }, [data.currency, data.invoiceNumber]);

  const handlePrint = useCallback(() => {
    const w = window.open("", "_blank");
    if (!w || !previewRef.current) return;
    w.document.write(`<html><head><title>Invoice</title><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:wght@400;600;700&display=swap"><style>body{margin:0;display:flex;justify-content:center;padding:20px}@media print{body{padding:0}}</style></head><body>${previewRef.current.outerHTML}</body></html>`);
    w.document.close();
    setTimeout(() => { w.print(); }, 500);
  }, []);

  const handleClear = useCallback(() => {
    if (!confirm("Clear all form data? This cannot be undone.")) return;
    sessionStorage.removeItem(STORAGE_KEY);
    const d = defaultData();
    if (defaultDocType) d.docType = defaultDocType;
    setData(d);
  }, [defaultDocType]);

  const handleQuickTemplate = useCallback((key: string) => {
    const d = applyQuickTemplate(key, data);
    if (defaultDocType) d.docType = defaultDocType;
    setData(d);
  }, [data, defaultDocType]);

  // Calculate totals for display
  const subtotal = useMemo(() => data.items.reduce((s, i) => s + i.qty * i.rate, 0), [data.items]);

  // ── Styles ──
  const inputStyle: React.CSSProperties = {
    width: "100%", padding: "10px 14px", borderRadius: "10px", fontSize: "17px",
    border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)", outline: "none",
  };
  const labelStyle: React.CSSProperties = { display: "block", fontSize: "15px", fontWeight: 500, marginBottom: "6px", color: "var(--text-muted)" };
  const sectionStyle: React.CSSProperties = {
    background: "var(--surface)", borderRadius: "16px", padding: "24px", marginBottom: "16px",
    border: "1px solid var(--border)",
  };
  const sectionTitle: React.CSSProperties = { fontSize: "18px", fontWeight: 600, marginBottom: "16px", color: "var(--text)" };

  return (
    <div style={{ background: "var(--bg)", color: "var(--text)", minHeight: "100vh" }}>
      {/* Top bar */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "16px 16px 0" }}>
        <nav style={{ fontSize: "15px", color: "var(--text-muted)", marginBottom: "12px" }}>
          <a href="/" style={{ color: "#059669" }} className="hover:underline">Home</a>
          <span className="mx-2">&gt;</span>
          <span>Business Tools</span>
        </nav>
        <h1 style={{ fontSize: "clamp(28px, 5vw, 40px)", fontWeight: 700, letterSpacing: "-0.01em", marginBottom: "4px" }}>{title}</h1>
        <p style={{ fontSize: "17px", color: "var(--text-muted)", marginBottom: "16px" }}>{subtitle}</p>
      </div>

      {/* Quick templates */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px 12px" }}>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <span style={{ fontSize: "15px", fontWeight: 500, color: "var(--text-muted)" }}>Start with:</span>
          {QUICK_TEMPLATES.map((t) => (
            <button
              key={t.key}
              onClick={() => handleQuickTemplate(t.key)}
              style={{ padding: "6px 14px", borderRadius: "8px", fontSize: "14px", fontWeight: 500, border: "1px solid var(--border)", background: "var(--surface)", color: "var(--text)", cursor: "pointer" }}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main layout: form + preview */}
      <div style={{ maxWidth: "1400px", margin: "0 auto", padding: "0 16px 80px", display: "flex", gap: "24px", alignItems: "flex-start" }}>
        {/* ── LEFT: Form ── */}
        <div style={{ flex: "1 1 55%", minWidth: 0 }}>
          {/* Section 1: Document Settings */}
          <div style={sectionStyle}>
            <div style={sectionTitle}>Document Settings</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "12px", marginBottom: "16px" }}>
              <div style={{ flex: "1 1 180px" }}>
                <label style={labelStyle}>Document Type</label>
                <select value={data.docType} onChange={(e) => update({ docType: e.target.value as DocType })} style={{ ...inputStyle, cursor: "pointer" }}>
                  {DOC_TYPES.map((d) => <option key={d} value={d}>{d}</option>)}
                </select>
              </div>
            </div>

            {/* Template picker */}
            <label style={labelStyle}>Template</label>
            <div style={{ display: "flex", gap: "10px", marginBottom: "16px", flexWrap: "wrap" }}>
              {(["classic", "modern", "elegant", "bold"] as Template[]).map((t) => (
                <button
                  key={t}
                  onClick={() => update({ template: t })}
                  style={{
                    width: "80px", height: "56px", borderRadius: "10px", cursor: "pointer",
                    border: data.template === t ? `2px solid ${data.accentColor}` : "2px solid var(--border)",
                    background: "var(--surface-alt)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
                    fontSize: "12px", fontWeight: 600, color: "var(--text)", opacity: data.template === t ? 1 : 0.6,
                  }}
                >
                  {t === "classic" && <div style={{ width: "40px", height: "3px", background: "#333", marginBottom: "4px", borderRadius: "2px" }} />}
                  {t === "modern" && <div style={{ width: "40px", height: "3px", background: data.accentColor, marginBottom: "4px", borderRadius: "2px" }} />}
                  {t === "elegant" && <div style={{ width: "40px", height: "1px", background: "#999", marginBottom: "4px" }} />}
                  {t === "bold" && <div style={{ width: "40px", height: "10px", background: data.accentColor, marginBottom: "2px", borderRadius: "2px" }} />}
                  {t.charAt(0).toUpperCase() + t.slice(1)}
                </button>
              ))}
            </div>

            {/* Accent color */}
            <label style={labelStyle}>Accent Color</label>
            <div style={{ display: "flex", gap: "8px", alignItems: "center", flexWrap: "wrap" }}>
              {ACCENT_PRESETS.map((c) => (
                <button
                  key={c}
                  onClick={() => update({ accentColor: c })}
                  style={{
                    width: "32px", height: "32px", borderRadius: "50%", background: c, cursor: "pointer",
                    border: data.accentColor === c ? "3px solid var(--text)" : "2px solid transparent",
                    outline: data.accentColor === c ? "2px solid var(--bg)" : "none",
                  }}
                  aria-label={`Color ${c}`}
                />
              ))}
              <input
                type="color"
                value={data.accentColor}
                onChange={(e) => update({ accentColor: e.target.value })}
                style={{ width: "32px", height: "32px", borderRadius: "50%", cursor: "pointer", border: "2px solid var(--border)", padding: 0 }}
              />
            </div>
          </div>

          {/* Section 2: Business Details */}
          <div style={sectionStyle}>
            <div style={sectionTitle}>From (Your Details)</div>

            {/* Logo upload */}
            <div style={{ marginBottom: "16px" }}>
              {data.logo ? (
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <img src={data.logo} alt="Logo" style={{ maxWidth: "120px", maxHeight: "60px", objectFit: "contain", borderRadius: "8px", border: "1px solid var(--border)" }} />
                  <button onClick={() => update({ logo: "" })} style={{ color: "#dc2626", fontSize: "15px", cursor: "pointer", background: "none", border: "none" }}>Remove</button>
                </div>
              ) : (
                <div
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={handleLogoDrop}
                  onClick={() => document.getElementById("logo-input")?.click()}
                  style={{
                    border: "2px dashed var(--border)", borderRadius: "12px", padding: "20px",
                    textAlign: "center", color: "var(--text-muted)", cursor: "pointer", fontSize: "15px",
                  }}
                >
                  Drop your logo here or click to upload
                  <div style={{ fontSize: "13px", marginTop: "4px" }}>PNG, JPG, SVG, WebP (max 5MB)</div>
                </div>
              )}
              <input id="logo-input" type="file" accept="image/*" onChange={handleLogo} style={{ display: "none" }} />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Business Name</label>
                <input style={inputStyle} placeholder="Your Business Name" value={data.businessName} onChange={(e) => update({ businessName: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Your Name</label>
                <input style={inputStyle} placeholder="Your Name" value={data.yourName} onChange={(e) => update({ yourName: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Email</label>
                <input style={inputStyle} type="email" placeholder="email@example.com" value={data.email} onChange={(e) => update({ email: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Phone</label>
                <input style={inputStyle} type="tel" placeholder="+1 (555) 000-0000" value={data.phone} onChange={(e) => update({ phone: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Tax ID / VAT #</label>
                <input style={inputStyle} placeholder="Tax ID / VAT #" value={data.taxId} onChange={(e) => update({ taxId: e.target.value })} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Address</label>
                <input style={{ ...inputStyle, marginBottom: "8px" }} placeholder="Street Address" value={data.address1} onChange={(e) => update({ address1: e.target.value })} />
                <input style={{ ...inputStyle, marginBottom: "8px" }} placeholder="City, State, ZIP" value={data.address2} onChange={(e) => update({ address2: e.target.value })} />
                <input style={inputStyle} placeholder="Country" value={data.country} onChange={(e) => update({ country: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section 3: Client Details */}
          <div style={sectionStyle}>
            <div style={sectionTitle}>Bill To (Client Details)</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Client Business Name</label>
                <input style={inputStyle} placeholder="Client's Business Name" value={data.clientBusiness} onChange={(e) => update({ clientBusiness: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Client Name</label>
                <input style={inputStyle} placeholder="Client's Name" value={data.clientName} onChange={(e) => update({ clientName: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Client Email</label>
                <input style={inputStyle} placeholder="Client's Email" value={data.clientEmail} onChange={(e) => update({ clientEmail: e.target.value })} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Address</label>
                <input style={{ ...inputStyle, marginBottom: "8px" }} placeholder="Street Address" value={data.clientAddress1} onChange={(e) => update({ clientAddress1: e.target.value })} />
                <input style={{ ...inputStyle, marginBottom: "8px" }} placeholder="City, State, ZIP" value={data.clientAddress2} onChange={(e) => update({ clientAddress2: e.target.value })} />
                <input style={inputStyle} placeholder="Country" value={data.clientCountry} onChange={(e) => update({ clientCountry: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section 4: Invoice Details */}
          <div style={sectionStyle}>
            <div style={sectionTitle}>Invoice Details</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Invoice Number</label>
                <input style={inputStyle} placeholder="INV-001" value={data.invoiceNumber} onChange={(e) => update({ invoiceNumber: e.target.value })} />
              </div>
              <div>
                <label style={labelStyle}>Currency</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={data.currency} onChange={(e) => update({ currency: e.target.value })}>
                  {CURRENCIES.map((c) => <option key={c.code} value={c.code}>{c.code} ({c.symbol}) — {c.name}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Invoice Date</label>
                <input style={inputStyle} type="date" value={data.invoiceDate} onChange={(e) => handleDateChange(e.target.value)} />
              </div>
              <div>
                <label style={labelStyle}>Payment Terms</label>
                <select style={{ ...inputStyle, cursor: "pointer" }} value={data.paymentTerms} onChange={(e) => handleTermsChange(e.target.value)}>
                  {PAYMENT_TERMS.map((t) => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label style={labelStyle}>Due Date</label>
                <input style={inputStyle} type="date" value={data.dueDate} onChange={(e) => update({ dueDate: e.target.value })} disabled={data.paymentTerms !== "Custom"} />
              </div>
              <div>
                <label style={labelStyle}>PO Number</label>
                <input style={inputStyle} placeholder="Purchase Order #" value={data.poNumber} onChange={(e) => update({ poNumber: e.target.value })} />
              </div>
              <div style={{ gridColumn: "span 2" }}>
                <label style={labelStyle}>Reference / Project Name</label>
                <input style={inputStyle} placeholder="Reference / Project Name" value={data.reference} onChange={(e) => update({ reference: e.target.value })} />
              </div>
            </div>
          </div>

          {/* Section 5: Line Items */}
          <div style={sectionStyle}>
            <div style={sectionTitle}>Items</div>

            {/* Desktop table header */}
            <div className="hidden sm:grid" style={{ gridTemplateColumns: "28px 1fr 80px 120px 100px 36px", gap: "8px", padding: "0 0 8px", fontSize: "14px", fontWeight: 600, color: "var(--text-muted)", borderBottom: "1px solid var(--border)" }}>
              <div></div>
              <div>Description</div>
              <div style={{ textAlign: "center" }}>Qty</div>
              <div style={{ textAlign: "right" }}>Rate</div>
              <div style={{ textAlign: "right" }}>Amount</div>
              <div></div>
            </div>

            {data.items.map((item, idx) => (
              <div
                key={item.id}
                draggable
                onDragStart={() => handleDragStart(idx)}
                onDragOver={(e) => handleDragOver(e, idx)}
                onDragEnd={handleDragEnd}
                className="grid"
                style={{
                  gridTemplateColumns: "28px 1fr 80px 120px 100px 36px",
                  gap: "8px", padding: "10px 0", borderBottom: "1px solid var(--border)",
                  opacity: dragIdx === idx ? 0.5 : 1,
                  alignItems: "center",
                }}
              >
                {/* Drag handle */}
                <div style={{ cursor: "grab", color: "var(--text-muted)", fontSize: "16px", textAlign: "center", userSelect: "none" }}>⠿</div>
                {/* Description */}
                <textarea
                  data-field="item-desc"
                  rows={1}
                  style={{ ...inputStyle, resize: "vertical", minHeight: "42px", fontSize: "16px" }}
                  placeholder="Item description"
                  value={item.description}
                  onChange={(e) => updateItem(item.id, { description: e.target.value })}
                />
                {/* Qty */}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  style={{ ...inputStyle, textAlign: "center", fontSize: "16px" }}
                  value={item.qty || ""}
                  onChange={(e) => updateItem(item.id, { qty: parseFloat(e.target.value) || 0 })}
                />
                {/* Rate */}
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  style={{ ...inputStyle, textAlign: "right", fontSize: "16px" }}
                  placeholder="0.00"
                  value={item.rate || ""}
                  onChange={(e) => updateItem(item.id, { rate: parseFloat(e.target.value) || 0 })}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addItem(); } }}
                />
                {/* Amount */}
                <div style={{ textAlign: "right", fontWeight: 600, fontSize: "16px", paddingRight: "4px" }}>
                  {formatCurrency(item.qty * item.rate, data.currency)}
                </div>
                {/* Delete */}
                <button
                  onClick={() => removeItem(item.id)}
                  disabled={data.items.length <= 1}
                  style={{ background: "none", border: "none", color: data.items.length <= 1 ? "var(--border)" : "#dc2626", cursor: data.items.length <= 1 ? "default" : "pointer", fontSize: "18px", padding: "4px", minWidth: "36px", minHeight: "36px" }}
                  aria-label="Delete item"
                >
                  &#x1F5D1;
                </button>
              </div>
            ))}

            <button onClick={addItem} style={{ marginTop: "12px", background: "none", border: "none", color: "#059669", fontSize: "16px", fontWeight: 500, cursor: "pointer", padding: "8px 0" }}>
              + Add Line Item
            </button>
          </div>

          {/* Section 6: Totals */}
          <div style={sectionStyle}>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <div style={{ width: "100%", maxWidth: "360px" }}>
                {/* Subtotal */}
                <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", fontSize: "16px" }}>
                  <span style={{ color: "var(--text-muted)" }}>Subtotal</span>
                  <span style={{ fontWeight: 600 }}>{formatCurrency(subtotal, data.currency)}</span>
                </div>

                {/* Discount */}
                {!data.discountEnabled ? (
                  <button onClick={() => update({ discountEnabled: true })} style={{ background: "none", border: "none", color: "#059669", fontSize: "15px", cursor: "pointer", padding: "4px 0" }}>+ Add Discount</button>
                ) : (
                  <div style={{ padding: "8px 0", borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "4px" }}>
                      <span style={{ fontSize: "15px", color: "var(--text-muted)" }}>Discount</span>
                      <select value={data.discountType} onChange={(e) => update({ discountType: e.target.value as DiscountType })} style={{ padding: "4px 8px", borderRadius: "6px", fontSize: "14px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)" }}>
                        <option value="percent">%</option>
                        <option value="flat">$</option>
                      </select>
                      <input
                        type="number" step="0.01" min="0"
                        style={{ width: "80px", padding: "4px 8px", borderRadius: "6px", fontSize: "15px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)", textAlign: "right" }}
                        value={data.discountValue || ""}
                        onChange={(e) => update({ discountValue: parseFloat(e.target.value) || 0 })}
                      />
                      <button onClick={() => update({ discountEnabled: false, discountValue: 0 })} style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>&#x2715;</button>
                    </div>
                  </div>
                )}

                {/* Tax */}
                {!data.taxEnabled ? (
                  <button onClick={() => update({ taxEnabled: true })} style={{ background: "none", border: "none", color: "#059669", fontSize: "15px", cursor: "pointer", padding: "4px 0" }}>+ Add Tax</button>
                ) : (
                  <div style={{ padding: "8px 0", borderTop: "1px solid var(--border)" }}>
                    {data.taxes.map((tax, ti) => (
                      <div key={ti} style={{ display: "flex", gap: "8px", alignItems: "center", marginBottom: "6px", flexWrap: "wrap" }}>
                        <input
                          style={{ width: "80px", padding: "4px 8px", borderRadius: "6px", fontSize: "14px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)" }}
                          placeholder="Tax"
                          value={tax.name}
                          onChange={(e) => {
                            const taxes = [...data.taxes];
                            taxes[ti] = { ...taxes[ti], name: e.target.value };
                            update({ taxes });
                          }}
                        />
                        <input
                          type="number" step="0.01" min="0"
                          style={{ width: "70px", padding: "4px 8px", borderRadius: "6px", fontSize: "14px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)", textAlign: "right" }}
                          placeholder="0"
                          value={tax.rate || ""}
                          onChange={(e) => {
                            const taxes = [...data.taxes];
                            taxes[ti] = { ...taxes[ti], rate: parseFloat(e.target.value) || 0 };
                            update({ taxes });
                          }}
                        />
                        <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>%</span>
                        <select
                          value={tax.mode}
                          onChange={(e) => {
                            const taxes = [...data.taxes];
                            taxes[ti] = { ...taxes[ti], mode: e.target.value as TaxMode };
                            update({ taxes });
                          }}
                          style={{ padding: "4px 6px", borderRadius: "6px", fontSize: "13px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)" }}
                        >
                          <option value="exclusive">Exclusive</option>
                          <option value="inclusive">Inclusive</option>
                        </select>
                        {data.taxes.length > 1 && (
                          <button onClick={() => { const taxes = data.taxes.filter((_, i) => i !== ti); update({ taxes }); }} style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>&#x2715;</button>
                        )}
                      </div>
                    ))}
                    <div style={{ display: "flex", gap: "8px" }}>
                      {data.taxes.length < 2 && (
                        <button onClick={() => update({ taxes: [...data.taxes, { name: "Tax 2", rate: 0, mode: "exclusive" }] })} style={{ background: "none", border: "none", color: "#059669", fontSize: "14px", cursor: "pointer" }}>+ Add Another Tax</button>
                      )}
                      <button onClick={() => update({ taxEnabled: false, taxes: [{ name: "Tax", rate: 0, mode: "exclusive" }] })} style={{ background: "none", border: "none", color: "#dc2626", fontSize: "14px", cursor: "pointer" }}>Remove Tax</button>
                    </div>
                  </div>
                )}

                {/* Shipping */}
                {!data.shippingEnabled ? (
                  <button onClick={() => update({ shippingEnabled: true })} style={{ background: "none", border: "none", color: "#059669", fontSize: "15px", cursor: "pointer", padding: "4px 0" }}>+ Add Shipping / Fee</button>
                ) : (
                  <div style={{ padding: "8px 0", borderTop: "1px solid var(--border)" }}>
                    <div style={{ display: "flex", gap: "8px", alignItems: "center" }}>
                      <input
                        style={{ width: "100px", padding: "4px 8px", borderRadius: "6px", fontSize: "14px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)" }}
                        placeholder="Shipping"
                        value={data.shippingLabel}
                        onChange={(e) => update({ shippingLabel: e.target.value })}
                      />
                      <input
                        type="number" step="0.01" min="0"
                        style={{ width: "90px", padding: "4px 8px", borderRadius: "6px", fontSize: "15px", border: "1px solid var(--border)", background: "var(--surface-alt)", color: "var(--text)", textAlign: "right" }}
                        value={data.shippingAmount || ""}
                        onChange={(e) => update({ shippingAmount: parseFloat(e.target.value) || 0 })}
                      />
                      <button onClick={() => update({ shippingEnabled: false, shippingAmount: 0 })} style={{ color: "#dc2626", background: "none", border: "none", cursor: "pointer", fontSize: "16px" }}>&#x2715;</button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Section 7: Notes & Terms */}
          <div style={sectionStyle}>
            <div style={sectionTitle}>Notes & Terms</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
              <div>
                <label style={labelStyle}>Notes</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", fontSize: "16px" }}
                  placeholder="Thank you for your business! Payment is due within 30 days."
                  value={data.notes}
                  onChange={(e) => update({ notes: e.target.value })}
                />
              </div>
              <div>
                <label style={labelStyle}>Terms & Conditions</label>
                <textarea
                  rows={4}
                  style={{ ...inputStyle, resize: "vertical", fontSize: "16px" }}
                  placeholder="Late payments are subject to a 1.5% monthly interest charge."
                  value={data.terms}
                  onChange={(e) => update({ terms: e.target.value })}
                />
              </div>
            </div>
          </div>

          {/* Section 8: Payment Info */}
          <div style={sectionStyle}>
            <button
              onClick={() => setShowPayment(!showPayment)}
              style={{ ...sectionTitle, background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: "8px", width: "100%", textAlign: "left", padding: 0, margin: 0 }}
            >
              Payment Information
              <span style={{ fontSize: "14px", color: "var(--text-muted)" }}>{showPayment ? "▲" : "▼"}</span>
            </button>
            {showPayment && (
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "12px" }}>
                {[
                  ["bankName", "Bank Name"],
                  ["accountName", "Account Name"],
                  ["accountNumber", "Account Number"],
                  ["routingNumber", "Routing / Sort Code"],
                  ["swift", "SWIFT / BIC"],
                  ["paypal", "PayPal Email"],
                ].map(([key, label]) => (
                  <div key={key}>
                    <label style={labelStyle}>{label}</label>
                    <input
                      style={inputStyle}
                      placeholder={label}
                      value={(data.paymentInfo as unknown as Record<string, string>)[key]}
                      onChange={(e) => update({ paymentInfo: { ...data.paymentInfo, [key]: e.target.value } })}
                    />
                  </div>
                ))}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Other Payment Instructions</label>
                  <textarea
                    rows={2}
                    style={{ ...inputStyle, resize: "vertical", fontSize: "16px" }}
                    placeholder="Additional payment instructions"
                    value={data.paymentInfo.other}
                    onChange={(e) => update({ paymentInfo: { ...data.paymentInfo, other: e.target.value } })}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Clear button */}
          <div style={{ textAlign: "center", padding: "12px 0" }}>
            <button onClick={handleClear} style={{ background: "none", border: "none", color: "#dc2626", fontSize: "15px", cursor: "pointer" }}>Clear Form</button>
          </div>
        </div>

        {/* ── RIGHT: Live Preview (desktop) ── */}
        <div className="hidden lg:block" style={{ flex: "0 0 45%", maxWidth: "620px", position: "sticky", top: "24px" }}>
          {/* Actions */}
          <div style={{ display: "flex", gap: "10px", marginBottom: "12px", alignItems: "center" }}>
            <button
              onClick={handleDownload}
              disabled={generating}
              style={{ padding: "10px 24px", borderRadius: "10px", fontSize: "16px", fontWeight: 600, background: "#059669", color: "#fff", border: "none", cursor: "pointer", opacity: generating ? 0.7 : 1 }}
            >
              {generating ? "Generating..." : "Download PDF"}
            </button>
            <button onClick={handlePrint} style={{ padding: "10px 20px", borderRadius: "10px", fontSize: "16px", fontWeight: 500, background: "transparent", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer" }}>
              Print
            </button>
            <div style={{ marginLeft: "auto", fontSize: "13px", color: "var(--text-muted)", display: "flex", alignItems: "center", gap: "4px" }}>
              🔒 Data stays in your browser
            </div>
          </div>

          {/* Preview container */}
          <div style={{ borderRadius: "12px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", border: "1px solid var(--border)" }}>
            <div style={{ transform: "scale(0.72)", transformOrigin: "top left", width: "138.9%", /* 1/0.72 */ }}>
              <InvoicePreview data={data} />
            </div>
          </div>
        </div>
      </div>

      {/* Off-screen full-size preview for PDF capture — always rendered, never display:none */}
      <div aria-hidden style={{ position: "absolute", left: "-9999px", top: 0, pointerEvents: "none" }}>
        <InvoicePreview data={data} previewRef={previewRef} />
      </div>

      {/* Mobile: floating button */}
      <div className="lg:hidden" style={{ position: "fixed", bottom: 0, left: 0, right: 0, padding: "12px 16px", background: "var(--bg)", borderTop: "1px solid var(--border)", zIndex: 50 }}>
        <button
          onClick={() => setMobilePreview(true)}
          style={{ width: "100%", height: "56px", borderRadius: "14px", fontSize: "18px", fontWeight: 700, background: "#059669", color: "#fff", border: "none", cursor: "pointer" }}
        >
          Preview & Download PDF
        </button>
      </div>

      {/* Mobile preview modal */}
      {mobilePreview && (
        <div style={{ position: "fixed", inset: 0, background: "var(--bg)", zIndex: 100, overflowY: "auto" }}>
          <div style={{ position: "sticky", top: 0, background: "var(--bg)", borderBottom: "1px solid var(--border)", padding: "12px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", zIndex: 10 }}>
            <button onClick={() => setMobilePreview(false)} style={{ background: "none", border: "none", color: "var(--text)", fontSize: "16px", cursor: "pointer", fontWeight: 500 }}>← Back</button>
            <div style={{ display: "flex", gap: "8px" }}>
              <button onClick={handleDownload} disabled={generating} style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "15px", fontWeight: 600, background: "#059669", color: "#fff", border: "none", cursor: "pointer" }}>
                {generating ? "..." : "Download PDF"}
              </button>
              <button onClick={handlePrint} style={{ padding: "8px 16px", borderRadius: "8px", fontSize: "15px", fontWeight: 500, background: "transparent", color: "var(--text)", border: "1px solid var(--border)", cursor: "pointer" }}>Print</button>
            </div>
          </div>
          <div style={{ padding: "16px", overflow: "auto" }}>
            <div style={{ maxWidth: "595px", margin: "0 auto", boxShadow: "0 4px 24px rgba(0,0,0,0.12)", borderRadius: "8px", overflow: "hidden" }}>
              <InvoicePreview data={data} />
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div style={{
          position: "fixed", bottom: "100px", left: "50%", transform: "translateX(-50%)",
          padding: "12px 24px", borderRadius: "10px", fontSize: "16px", fontWeight: 500,
          background: toast.includes("Error") ? "#dc2626" : "#059669", color: "#fff",
          boxShadow: "0 4px 12px rgba(0,0,0,0.2)", zIndex: 200,
        }}>
          {toast.includes("Error") ? "❌" : "✅"} {toast}
        </div>
      )}
    </div>
  );
}
