import { Link } from "react-router-dom";

import {
  formatCurrency,
  formatDate,
  getInvoiceStatus,
  getInvoiceTotal,
} from "../utils/invoiceCalculations";

function InvoiceList({ invoices }) {
  if (invoices.length === 0) {
    return (
      <section className="panel">
        <div className="empty-state">
          <h2>No hay facturas registradas</h2>

          <p>
            Crea una factura desde el formulario
            para comenzar.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="panel">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            Historial
          </span>

          <h2>Facturas registradas</h2>
        </div>

        <span className="count-badge">
          {invoices.length}
        </span>
      </div>

      <div className="invoice-list">
        {invoices.map((invoice) => {
          const total =
            getInvoiceTotal(invoice);

          const status =
            getInvoiceStatus(invoice);

          return (
            <article
              className="invoice-list-item"
              key={invoice.id}
            >
              <div>
                <span className="invoice-number">
                  {invoice.invoiceNumber}
                </span>

                <h3>
                  {invoice.client?.name}
                </h3>

                <div className="invoice-meta">
                  <span>
                    Emisión:{" "}
                    {formatDate(
                      invoice.issueDate,
                    )}
                  </span>

                  <span>
                    Vence:{" "}
                    {formatDate(
                      invoice.dueDate,
                    )}
                  </span>
                </div>
              </div>

              <div className="invoice-list-actions">
                <strong>
                  {formatCurrency(total)}
                </strong>

                <span
                  className={`status status-${status.toLowerCase()}`}
                >
                  {status}
                </span>

                <Link
                  className="button button-secondary"
                  to={`/invoice/${invoice.id}`}
                >
                  Ver factura
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export default InvoiceList;