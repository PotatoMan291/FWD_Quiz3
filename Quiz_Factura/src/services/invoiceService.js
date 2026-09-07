const API_URL = "http://localhost:3000/invoices";

export const getInvoices = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron obtener las facturas.");
  }

  return response.json();
};

export const createInvoice = async (invoice) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(invoice),
  });

  if (!response.ok) {
    throw new Error("No se pudo guardar la factura.");
  }

  return response.json();
};