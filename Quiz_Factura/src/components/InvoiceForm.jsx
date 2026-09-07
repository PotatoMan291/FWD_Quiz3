import { useState } from "react";

function InvoiceForm({ onCreateInvoice }) {
  const initialForm = {
    issuerName: "",
    issuerTaxId: "",

    clientName: "",
    clientEmail: "",
    clientAddress: "",

    invoiceNumber: "",
    issueDate: "",

    taxRate: 13,

    items: [
      {
        id: crypto.randomUUID(),
        description: "",
        quantity: 1,
        unitPrice: "",
      },
    ],
  };

  const [formData, setFormData] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleItemChange = (id, field, value) => {
    setFormData((previousForm) => ({
      ...previousForm,

      items: previousForm.items.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    }));
  };

  const addItem = () => {
    const newItem = {
      id: crypto.randomUUID(),
      description: "",
      quantity: 1,
      unitPrice: "",
    };

    setFormData((previousForm) => ({
      ...previousForm,
      items: [...previousForm.items, newItem],
    }));
  };

  const removeItem = (id) => {
    if (formData.items.length === 1) {
      return;
    }

    setFormData((previousForm) => ({
      ...previousForm,
      items: previousForm.items.filter((item) => item.id !== id),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.issuerName.trim()) {
      newErrors.issuerName = "El nombre del emisor es requerido.";
    }

    if (!formData.issuerTaxId.trim()) {
      newErrors.issuerTaxId = "La identificación fiscal es requerida.";
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName = "El nombre del cliente es requerido.";
    }

    if (!formData.invoiceNumber.trim()) {
      newErrors.invoiceNumber = "El número de factura es requerido.";
    }

    if (!formData.issueDate) {
      newErrors.issueDate = "La fecha de emisión es requerida.";
    }

    const invalidItems = formData.items.some((item) => {
      return (
        !item.description.trim() ||
        Number(item.quantity) <= 0 ||
        Number(item.unitPrice) < 0 ||
        item.unitPrice === ""
      );
    });

    if (invalidItems) {
      newErrors.items =
        "Todos los productos deben tener descripción, cantidad válida y precio válido.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const isValid = validateForm();

    if (!isValid) {
      return;
    }

    const invoice = {
      issuer: {
        name: formData.issuerName,
        taxId: formData.issuerTaxId,
      },

      client: {
        name: formData.clientName,
        email: formData.clientEmail,
        address: formData.clientAddress,
      },

      invoiceNumber: formData.invoiceNumber,
      issueDate: formData.issueDate,

      taxRate: Number(formData.taxRate),

      items: formData.items.map((item) => ({
        ...item,
        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    };

    onCreateInvoice(invoice);

    setFormData({
      ...initialForm,
      items: [
        {
          id: crypto.randomUUID(),
          description: "",
          quantity: 1,
          unitPrice: "",
        },
      ],
    });

    setErrors({});
  };

  return (
    <section className="invoice-form-section">
      <h2>Nueva factura</h2>

      <form className="invoice-form" onSubmit={handleSubmit}>
        <fieldset>
          <legend>Datos del emisor</legend>

          <div className="form-group">
            <label htmlFor="issuerName">Nombre de la empresa</label>

            <input
              id="issuerName"
              name="issuerName"
              type="text"
              value={formData.issuerName}
              onChange={handleInputChange}
              placeholder="Ej. TechStore S.A."
            />

            {errors.issuerName && (
              <span className="error-message">{errors.issuerName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="issuerTaxId">Identificación fiscal</label>

            <input
              id="issuerTaxId"
              name="issuerTaxId"
              type="text"
              value={formData.issuerTaxId}
              onChange={handleInputChange}
              placeholder="Cédula jurídica / ID fiscal"
            />

            {errors.issuerTaxId && (
              <span className="error-message">{errors.issuerTaxId}</span>
            )}
          </div>
        </fieldset>

        <fieldset>
          <legend>Datos del cliente</legend>

          <div className="form-group">
            <label htmlFor="clientName">Nombre del cliente</label>

            <input
              id="clientName"
              name="clientName"
              type="text"
              value={formData.clientName}
              onChange={handleInputChange}
              placeholder="Nombre completo"
            />

            {errors.clientName && (
              <span className="error-message">{errors.clientName}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="clientEmail">Correo</label>

            <input
              id="clientEmail"
              name="clientEmail"
              type="email"
              value={formData.clientEmail}
              onChange={handleInputChange}
              placeholder="cliente@correo.com"
            />
          </div>

          <div className="form-group">
            <label htmlFor="clientAddress">Dirección</label>

            <input
              id="clientAddress"
              name="clientAddress"
              type="text"
              value={formData.clientAddress}
              onChange={handleInputChange}
              placeholder="Dirección del cliente"
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Datos de la factura</legend>

          <div className="form-group">
            <label htmlFor="invoiceNumber">Número de factura</label>

            <input
              id="invoiceNumber"
              name="invoiceNumber"
              type="text"
              value={formData.invoiceNumber}
              onChange={handleInputChange}
              placeholder="FAC-001"
            />

            {errors.invoiceNumber && (
              <span className="error-message">{errors.invoiceNumber}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="issueDate">Fecha de emisión</label>

            <input
              id="issueDate"
              name="issueDate"
              type="date"
              value={formData.issueDate}
              onChange={handleInputChange}
            />

            {errors.issueDate && (
              <span className="error-message">{errors.issueDate}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="taxRate">Impuesto (%)</label>

            <input
              id="taxRate"
              name="taxRate"
              type="number"
              min="0"
              step="0.01"
              value={formData.taxRate}
              onChange={handleInputChange}
            />
          </div>
        </fieldset>

        <fieldset>
          <legend>Productos / Servicios</legend>

          <div className="items-container">
            {formData.items.map((item, index) => (
              <div className="invoice-item-row" key={item.id}>
                <div className="form-group">
                  <label htmlFor={`description-${item.id}`}>
                    Descripción
                  </label>

                  <input
                    id={`description-${item.id}`}
                    type="text"
                    value={item.description}
                    onChange={(event) =>
                      handleItemChange(
                        item.id,
                        "description",
                        event.target.value,
                      )
                    }
                    placeholder={`Producto ${index + 1}`}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`quantity-${item.id}`}>Cantidad</label>

                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(event) =>
                      handleItemChange(
                        item.id,
                        "quantity",
                        event.target.value,
                      )
                    }
                  />
                </div>

                <div className="form-group">
                  <label htmlFor={`price-${item.id}`}>
                    Precio unitario
                  </label>

                  <input
                    id={`price-${item.id}`}
                    type="number"
                    min="0"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(event) =>
                      handleItemChange(
                        item.id,
                        "unitPrice",
                        event.target.value,
                      )
                    }
                    placeholder="0.00"
                  />
                </div>

                <button
                  className="remove-item-button"
                  type="button"
                  onClick={() => removeItem(item.id)}
                  disabled={formData.items.length === 1}
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>

          {errors.items && (
            <span className="error-message">{errors.items}</span>
          )}

          <button
            className="add-item-button"
            type="button"
            onClick={addItem}
          >
            + Agregar producto
          </button>
        </fieldset>

        <button className="submit-invoice-button" type="submit">
          Guardar factura
        </button>
      </form>
    </section>
  );
}

export default InvoiceForm;