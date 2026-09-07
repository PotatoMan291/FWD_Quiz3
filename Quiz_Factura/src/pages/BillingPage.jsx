import InvoiceForm from "../components/InvoiceForm";
import InvoiceList from "../components/InvoiceList";

function BillingPage({
  invoices,
  loading,
  onCreateInvoice,
}) {
  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">
          Sistema administrativo
        </span>

        <h1>
          Gestión de facturas
        </h1>

        <p>
          Registra nuevas facturas y
          consulta el historial existente.
        </p>
      </section>

      <div className="billing-layout">
        <InvoiceForm
          onCreateInvoice={
            onCreateInvoice
          }
        />

        {loading ? (
          <section className="panel loading-panel">
            Cargando facturas...
          </section>
        ) : (
          <InvoiceList
            invoices={invoices}
          />
        )}
      </div>
    </>
  );
}

export default BillingPage;