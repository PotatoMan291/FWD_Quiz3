export const calculateSubtotal = (items) => {
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

const subtotal = calculateSubtotal(invoice.items);
const tax = calculateTax(subtotal, invoice.taxRate);
const total = calculateTotal(subtotal, tax);