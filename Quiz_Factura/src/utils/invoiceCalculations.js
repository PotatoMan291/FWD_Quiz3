export const calculateSubtotal = (items = []) => {
  return items.reduce((total, item) => {
    const quantity = Number(item.quantity) || 0;
    const unitPrice = Number(item.unitPrice) || 0;

    return total + quantity * unitPrice;
  }, 0);
};

export const calculateTax = (subtotal, taxRate) => {
  const rate = Number(taxRate) || 0;
  return subtotal * (rate / 100);
};

export const calculateTotal = (subtotal, tax) => {
  return subtotal + tax;
};

export const getInvoiceTotal = (invoice) => {
  const subtotal = calculateSubtotal(invoice?.items ?? []);
  const tax = calculateTax(subtotal, invoice?.taxRate ?? 0);

  return calculateTotal(subtotal, tax);
};

export const getInvoiceStatus = (invoice) => {
  if (invoice?.paid) {
    return "Pagada";
  }

  if (!invoice?.dueDate) {
    return "Pendiente";
  }

  const now = new Date();

  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
  );

  const dueDate = new Date(`${invoice.dueDate}T00:00:00`);

  if (dueDate < today) {
    return "Vencida";
  }

  return "Pendiente";
};

export const formatCurrency = (value) => {
  return new Intl.NumberFormat("es-CR", {
    style: "currency",
    currency: "CRC",
    minimumFractionDigits: 2,
  }).format(Number(value) || 0);
};

export const formatDate = (date) => {
  if (!date) {
    return "—";
  }

  return new Intl.DateTimeFormat("es-CR").format(
    new Date(`${date}T00:00:00`),
  );
};