import {
  getInvoiceStatus,
  getInvoiceTotal,
} from "./invoiceCalculations";

export const getTotals = (invoices) => {
  return invoices.map((invoice) => ({
    invoice,
    total: getInvoiceTotal(invoice),
  }));
};

export const calculateDashboardMetrics = (invoices) => {
  const totals = invoices.map(getInvoiceTotal);

  const totalBilled = totals.reduce(
    (sum, total) => sum + total,
    0,
  );

  const invoiceCount = invoices.length;

  const averageTicket =
    invoiceCount > 0
      ? totalBilled / invoiceCount
      : 0;

  return {
    totalBilled,
    invoiceCount,
    averageTicket,
  };
};

export const calculateTopClients = (invoices) => {
  const clients = {};

  invoices.forEach((invoice) => {
    const clientName =
      invoice.client?.name || "Cliente desconocido";

    if (!clients[clientName]) {
      clients[clientName] = 0;
    }

    clients[clientName] += getInvoiceTotal(invoice);
  });

  return Object.entries(clients)
    .map(([name, total]) => ({
      name,
      total,
    }))
    .sort((a, b) => b.total - a.total)
    .slice(0, 3);
};

export const calculateStandardDeviation = (values) => {
  if (values.length === 0) {
    return {
      average: 0,
      standardDeviation: 0,
    };
  }

  const average =
    values.reduce((sum, value) => sum + value, 0) /
    values.length;

  const variance =
    values.reduce((sum, value) => {
      return sum + Math.pow(value - average, 2);
    }, 0) / values.length;

  return {
    average,
    standardDeviation: Math.sqrt(variance),
  };
};

export const detectOutliers = (invoices) => {
  const invoicesWithTotals = invoices.map((invoice) => ({
    ...invoice,
    calculatedTotal: getInvoiceTotal(invoice),
  }));

  const values = invoicesWithTotals.map(
    (invoice) => invoice.calculatedTotal,
  );

  const {
    average,
    standardDeviation,
  } = calculateStandardDeviation(values);

  if (standardDeviation === 0) {
    return {
      average,
      standardDeviation,
      outliers: [],
    };
  }

  const threshold = standardDeviation * 1.5;

  const outliers = invoicesWithTotals.filter((invoice) => {
    const distance = Math.abs(
      invoice.calculatedTotal - average,
    );

    return distance > threshold;
  });

  return {
    average,
    standardDeviation,
    outliers,
  };
};

export const calculateStatusCounts = (invoices) => {
  const counts = {
    Pagada: 0,
    Pendiente: 0,
    Vencida: 0,
  };

  invoices.forEach((invoice) => {
    const status = getInvoiceStatus(invoice);
    counts[status] += 1;
  });

  return counts;
};

export const getRevenueByPeriod = (invoices) => {
  const periods = {};

  invoices.forEach((invoice) => {
    if (!invoice.issueDate) {
      return;
    }

    const period = invoice.issueDate.slice(0, 7);

    if (!periods[period]) {
      periods[period] = 0;
    }

    periods[period] += getInvoiceTotal(invoice);
  });

  return Object.entries(periods)
    .sort(([periodA], [periodB]) =>
      periodA.localeCompare(periodB),
    )
    .map(([period, total]) => ({
      period,
      total: Number(total.toFixed(2)),
    }));
};

export const getClientDistribution = (invoices) => {
  const clients = {};

  invoices.forEach((invoice) => {
    const clientName =
      invoice.client?.name || "Cliente desconocido";

    if (!clients[clientName]) {
      clients[clientName] = 0;
    }

    clients[clientName] += getInvoiceTotal(invoice);
  });

  return Object.entries(clients)
    .map(([name, total]) => ({
      name,
      total: Number(total.toFixed(2)),
    }))
    .sort((a, b) => b.total - a.total);
};

export const calculateRevenueForecast = (invoices) => {
  const periods = getRevenueByPeriod(invoices);

  if (periods.length === 0) {
    return 0;
  }

  const lastPeriods = periods.slice(-3);

  const total = lastPeriods.reduce(
    (sum, period) => sum + period.total,
    0,
  );

  return total / lastPeriods.length;
};