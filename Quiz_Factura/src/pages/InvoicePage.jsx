import {
  Link,
  useParams,
} from "react-router-dom";

import Invoice from "../components/Invoice";

function InvoicePage({
  invoices,
  loading,
  onMarkAsPaid,
}) {
  const { id } = useParams();

  if (loading) {
    return (
      <section className="panel">
        Cargando factura...
      </section>
    );
  }

  const invoice = invoices.find(
    (item) => String(item.id) === id,
  );

  if (!invoice) {
    return (
      <section className="panel empty-state">
        <h1>
          Factura no encontrada
        </h1>

        <Link
          className="button button-primary"
          to="/"
        >
          Volver
        </Link>
      </section>
    );
  }

  return (
    <div className="invoice-page">
      <div className="invoice-page-toolbar">
        <Link
          className="button button-secondary"
          to="/"
        >
          ← Volver
        </Link>

        <button
          type="button"
          className="button button-secondary"
          onClick={() => window.print()}
        >
          Imprimir
        </button>
      </div>

      <Invoice
        invoice={invoice}
        onMarkAsPaid={onMarkAsPaid}
      />
    </div>
  );
}

export default InvoicePage;