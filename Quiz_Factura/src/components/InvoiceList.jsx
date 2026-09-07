import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
} from "../utils/invoiceCalculations";

function InvoiceList({ invoices, selectedInvoice, onSelectInvoice }) {
  if (invoices.length === 0) {
    return (
      <section className="invoice-list-section">
        <div className="section-heading">
          <div>
            <p className="section-eyebrow">Historial</p>
            <h2>Facturas registradas</h2>
          </div>
        </div>

        <div className="empty-state">
          <h3>No hay facturas registradas</h3>

          <p>
            Las facturas que crees desde el formulario aparecerán aquí.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="invoice-list-section">
      <div className="section-heading">
        <div>
          <p className="section-eyebrow">Historial</p>
          <h2>Facturas registradas</h2>
        </div>

        <span className="invoice-count">
          {invoices.length} factura{invoices.length !== 1 ? "s" : ""}
        </span>
      </div>

      <div className="invoice-list">
        {invoices.map((invoice) => {
          const subtotal = calculateSubtotal(invoice.items);

          const tax = calculateTax(
            subtotal,
            invoice.taxRate,
          );

          const total = calculateTotal(
            subtotal,
            tax,
          );

          const isSelected =
            selectedInvoice?.id === invoice.id;

          return (
            <button
              key={invoice.id}
              type="button"
              className={`invoice-list-item ${
                isSelected ? "selected" : ""
              }`}
              onClick={() => onSelectInvoice(invoice)}
            >
              <div className="invoice-list-main">
                <div>
                  <span className="invoice-number">
                    {invoice.invoiceNumber}
                  </span>

                  <h3>{invoice.client.name}</h3>
                </div>

                <span className="invoice-total">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="invoice-list-meta">
                <span>
                  Fecha: {invoice.issueDate}
                </span>

                <span>
                  {invoice.items.length} producto
                  {invoice.items.length !== 1 ? "s" : ""}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
}

export default InvoiceList;