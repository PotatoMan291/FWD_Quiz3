import {
  calculateSubtotal,
  calculateTax,
  calculateTotal,
  formatCurrency,
  formatDate,
  getInvoiceStatus,
} from "../utils/invoiceCalculations";

function Invoice({
  invoice,
  onMarkAsPaid,
}) {
  if (!invoice) {
    return null;
  }

  const subtotal = calculateSubtotal(
    invoice.items,
  );

  const tax = calculateTax(
    subtotal,
    invoice.taxRate,
  );

  const total = calculateTotal(
    subtotal,
    tax,
  );

  const status =
    getInvoiceStatus(invoice);

  return (
    <article className="invoice-document">
      <header className="invoice-document-header">
        <div>
          <span className="document-label">
            FACTURA
          </span>

          <h1>
            {invoice.issuer?.name}
          </h1>

          <p>
            ID fiscal:{" "}
            {invoice.issuer?.taxId}
          </p>
        </div>

        <div className="invoice-document-number">
          <strong>
            {invoice.invoiceNumber}
          </strong>

          <span
            className={`status status-${status.toLowerCase()}`}
          >
            {status}
          </span>
        </div>
      </header>

      <section className="invoice-parties">
        <div>
          <span className="document-label">
            Facturar a
          </span>

          <h2>{invoice.client?.name}</h2>

          <p>
            {invoice.client?.address ||
              "Sin dirección"}
          </p>

          <p>
            {invoice.client?.email ||
              "Sin correo"}
          </p>
        </div>

        <div className="invoice-dates">
          <p>
            <strong>Emisión:</strong>{" "}
            {formatDate(
              invoice.issueDate,
            )}
          </p>

          <p>
            <strong>Vencimiento:</strong>{" "}
            {formatDate(
              invoice.dueDate,
            )}
          </p>
        </div>
      </section>

      <div className="invoice-table-wrapper">
        <table className="invoice-table">
          <thead>
            <tr>
              <th>Descripción</th>
              <th>Cantidad</th>
              <th>Precio unitario</th>
              <th>Total</th>
            </tr>
          </thead>

          <tbody>
            {invoice.items.map((item) => {
              const lineTotal =
                Number(item.quantity) *
                Number(item.unitPrice);

              return (
                <tr key={item.id}>
                  <td>
                    {item.description}
                  </td>

                  <td>
                    {item.quantity}
                  </td>

                  <td>
                    {formatCurrency(
                      item.unitPrice,
                    )}
                  </td>

                  <td>
                    {formatCurrency(
                      lineTotal,
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <section className="invoice-summary">
        <div>
          <span>Subtotal</span>
          <strong>
            {formatCurrency(subtotal)}
          </strong>
        </div>

        <div>
          <span>
            Impuesto ({invoice.taxRate}%)
          </span>

          <strong>
            {formatCurrency(tax)}
          </strong>
        </div>

        <div className="invoice-grand-total">
          <span>Total</span>

          <strong>
            {formatCurrency(total)}
          </strong>
        </div>
      </section>

      {status !== "Pagada" &&
        onMarkAsPaid && (
          <div className="invoice-payment-action">
            <button
              type="button"
              className="button button-primary"
              onClick={() =>
                onMarkAsPaid(invoice.id)
              }
            >
              Marcar como pagada
            </button>
          </div>
        )}
    </article>
  );
}

export default Invoice;