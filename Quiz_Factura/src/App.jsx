import { useEffect, useState } from "react";

import InvoiceForm from "./components/InvoiceForm";

import {
  createInvoice,
  getInvoices,
} from "./services/invoiceService";

import "./App.css";

function App() {
  const [invoices, setInvoices] = useState([]);
  const [selectedInvoice, setSelectedInvoice] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const data = await getInvoices();

      setInvoices(data);
    } catch (error) {
      console.error(error);

      setError(
        "No se pudieron cargar las facturas. Verifica que JSON Server esté ejecutándose.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = async (invoice) => {
    try {
      setError("");

      const savedInvoice = await createInvoice(invoice);

      setInvoices((previousInvoices) => [
        ...previousInvoices,
        savedInvoice,
      ]);

      setSelectedInvoice(savedInvoice);
    } catch (error) {
      console.error(error);

      setError(
        "No se pudo guardar la factura. Verifica que JSON Server esté ejecutándose.",
      );
    }
  };

  return (
    <div className="app">
      <header className="app-header">
        <div>
          <h1>Sistema de Facturación</h1>

          <p>
            Creación y administración de facturas
          </p>
        </div>
      </header>

      <main className="app-content">
        {error && (
          <div className="global-error">
            {error}
          </div>
        )}

        <InvoiceForm onCreateInvoice={handleCreateInvoice} />

        <section className="temporary-invoice-info">
          <h2>Facturas registradas</h2>

          {loading ? (
            <p>Cargando facturas...</p>
          ) : invoices.length === 0 ? (
            <p>No hay facturas registradas.</p>
          ) : (
            <p>
              Actualmente hay {invoices.length} factura(s)
              registrada(s).
            </p>
          )}

          {selectedInvoice && (
            <p>
              Última factura seleccionada:{" "}
              <strong>{selectedInvoice.invoiceNumber}</strong>
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;