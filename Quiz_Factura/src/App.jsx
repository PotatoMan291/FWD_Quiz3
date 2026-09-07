import {
  useEffect,
  useState,
} from "react";

import {
  Route,
  Routes,
} from "react-router-dom";

import Layout from "./components/Layout";
import BillingPage from "./pages/BillingPage";
import DashboardPage from "./pages/DashboardPage";
import InvoicePage from "./pages/InvoicePage";

import {
  createInvoice,
  getInvoices,
  updateInvoice,
} from "./services/invoiceService";

import "./App.css";

function App() {
  const [invoices, setInvoices] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  useEffect(() => {
    loadInvoices();
  }, []);

  const loadInvoices = async () => {
    try {
      setLoading(true);
      setError("");

      const data =
        await getInvoices();

      setInvoices(data);
    } catch (requestError) {
      console.error(requestError);

      setError(
        "No se pudieron cargar las facturas. Verifica que JSON Server esté ejecutándose.",
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice =
    async (invoice) => {
      try {
        setError("");

        const savedInvoice =
          await createInvoice(invoice);

        setInvoices(
          (previousInvoices) => [
            ...previousInvoices,
            savedInvoice,
          ],
        );

        return true;
      } catch (requestError) {
        console.error(requestError);

        setError(
          "No se pudo guardar la factura.",
        );

        return false;
      }
    };

  const handleMarkAsPaid =
    async (id) => {
      try {
        const updatedInvoice =
          await updateInvoice(id, {
            paid: true,
          });

        setInvoices(
          (previousInvoices) =>
            previousInvoices.map(
              (invoice) =>
                invoice.id === id
                  ? updatedInvoice
                  : invoice,
            ),
        );
      } catch (requestError) {
        console.error(requestError);

        setError(
          "No se pudo actualizar el estado de la factura.",
        );
      }
    };

  return (
    <>
      {error && (
        <div className="global-error">
          {error}
        </div>
      )}

      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <BillingPage
                invoices={invoices}
                loading={loading}
                onCreateInvoice={
                  handleCreateInvoice
                }
              />
            }
          />

          <Route
            path="/invoice/:id"
            element={
              <InvoicePage
                invoices={invoices}
                loading={loading}
                onMarkAsPaid={
                  handleMarkAsPaid
                }
              />
            }
          />

          <Route
            path="/dashboard"
            element={
              <DashboardPage
                invoices={invoices}
              />
            }
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;