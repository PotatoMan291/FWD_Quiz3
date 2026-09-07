import { useState } from "react";

const createInitialItem = () => ({
  id: crypto.randomUUID(),
  description: "",
  quantity: 1,
  unitPrice: "",
});

const createInitialForm = () => ({
  issuerName: "",
  issuerTaxId: "",

  clientName: "",
  clientEmail: "",
  clientAddress: "",

  invoiceNumber: "",
  issueDate: "",
  dueDate: "",

  taxRate: 13,

  items: [createInitialItem()],
});

function InvoiceForm({ onCreateInvoice }) {
  const [formData, setFormData] = useState(
    createInitialForm,
  );

  const [errors, setErrors] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousForm) => ({
      ...previousForm,
      [name]: value,
    }));
  };

  const handleItemChange = (
    id,
    field,
    value,
  ) => {
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
    setFormData((previousForm) => ({
      ...previousForm,
      items: [
        ...previousForm.items,
        createInitialItem(),
      ],
    }));
  };

  const removeItem = (id) => {
    if (formData.items.length === 1) {
      return;
    }

    setFormData((previousForm) => ({
      ...previousForm,

      items: previousForm.items.filter(
        (item) => item.id !== id,
      ),
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.issuerName.trim()) {
      newErrors.issuerName =
        "El nombre del emisor es requerido.";
    }

    if (!formData.issuerTaxId.trim()) {
      newErrors.issuerTaxId =
        "La identificación fiscal es requerida.";
    }

    if (!formData.clientName.trim()) {
      newErrors.clientName =
        "El nombre del cliente es requerido.";
    }

    if (!formData.invoiceNumber.trim()) {
      newErrors.invoiceNumber =
        "El número de factura es requerido.";
    }

    if (!formData.issueDate) {
      newErrors.issueDate =
        "La fecha de emisión es requerida.";
    }

    if (!formData.dueDate) {
      newErrors.dueDate =
        "La fecha de vencimiento es requerida.";
    }

    if (
      formData.issueDate &&
      formData.dueDate &&
      formData.dueDate < formData.issueDate
    ) {
      newErrors.dueDate =
        "La fecha de vencimiento no puede ser anterior a la fecha de emisión.";
    }

    if (Number(formData.taxRate) < 0) {
      newErrors.taxRate =
        "El impuesto no puede ser negativo.";
    }

    const invalidItems = formData.items.some(
      (item) =>
        !item.description.trim() ||
        Number(item.quantity) <= 0 ||
        item.unitPrice === "" ||
        Number(item.unitPrice) < 0,
    );

    if (invalidItems) {
      newErrors.items =
        "Todos los productos deben tener descripción, cantidad válida y precio válido.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    const invoice = {
      issuer: {
        name: formData.issuerName.trim(),
        taxId: formData.issuerTaxId.trim(),
      },

      client: {
        name: formData.clientName.trim(),
        email: formData.clientEmail.trim(),
        address: formData.clientAddress.trim(),
      },

      invoiceNumber:
        formData.invoiceNumber.trim(),

      issueDate: formData.issueDate,
      dueDate: formData.dueDate,

      taxRate: Number(formData.taxRate),

      paid: false,

      items: formData.items.map((item) => ({
        ...item,

        description:
          item.description.trim(),

        quantity: Number(item.quantity),
        unitPrice: Number(item.unitPrice),
      })),
    };

    const created =
      await onCreateInvoice(invoice);

    if (created) {
      setFormData(createInitialForm());
      setErrors({});
    }
  };

  return (
    <section className="panel invoice-form-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            Facturación
          </span>

          <h2>Crear nueva factura</h2>
        </div>
      </div>

      <form
        className="invoice-form"
        onSubmit={handleSubmit}
      >
        <fieldset>
          <legend>Datos del emisor</legend>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="issuerName">
                Empresa
              </label>

              <input
                id="issuerName"
                name="issuerName"
                value={formData.issuerName}
                onChange={handleInputChange}
                placeholder="TechStore S.A."
              />

              {errors.issuerName && (
                <span className="error-message">
                  {errors.issuerName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="issuerTaxId">
                Identificación fiscal
              </label>

              <input
                id="issuerTaxId"
                name="issuerTaxId"
                value={formData.issuerTaxId}
                onChange={handleInputChange}
                placeholder="Cédula jurídica / ID"
              />

              {errors.issuerTaxId && (
                <span className="error-message">
                  {errors.issuerTaxId}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Datos del cliente</legend>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="clientName">
                Nombre
              </label>

              <input
                id="clientName"
                name="clientName"
                value={formData.clientName}
                onChange={handleInputChange}
                placeholder="Juan Pérez"
              />

              {errors.clientName && (
                <span className="error-message">
                  {errors.clientName}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="clientEmail">
                Correo
              </label>

              <input
                id="clientEmail"
                name="clientEmail"
                type="email"
                value={formData.clientEmail}
                onChange={handleInputChange}
                placeholder="cliente@correo.com"
              />
            </div>

            <div className="form-group form-group-full">
              <label htmlFor="clientAddress">
                Dirección
              </label>

              <input
                id="clientAddress"
                name="clientAddress"
                value={formData.clientAddress}
                onChange={handleInputChange}
                placeholder="San José, Costa Rica"
              />
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Información de factura</legend>

          <div className="form-grid">
            <div className="form-group">
              <label htmlFor="invoiceNumber">
                Número
              </label>

              <input
                id="invoiceNumber"
                name="invoiceNumber"
                value={formData.invoiceNumber}
                onChange={handleInputChange}
                placeholder="FAC-001"
              />

              {errors.invoiceNumber && (
                <span className="error-message">
                  {errors.invoiceNumber}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="taxRate">
                Impuesto %
              </label>

              <input
                id="taxRate"
                name="taxRate"
                type="number"
                min="0"
                step="0.01"
                value={formData.taxRate}
                onChange={handleInputChange}
              />

              {errors.taxRate && (
                <span className="error-message">
                  {errors.taxRate}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="issueDate">
                Fecha de emisión
              </label>

              <input
                id="issueDate"
                name="issueDate"
                type="date"
                value={formData.issueDate}
                onChange={handleInputChange}
              />

              {errors.issueDate && (
                <span className="error-message">
                  {errors.issueDate}
                </span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="dueDate">
                Fecha de vencimiento
              </label>

              <input
                id="dueDate"
                name="dueDate"
                type="date"
                value={formData.dueDate}
                onChange={handleInputChange}
              />

              {errors.dueDate && (
                <span className="error-message">
                  {errors.dueDate}
                </span>
              )}
            </div>
          </div>
        </fieldset>

        <fieldset>
          <legend>Productos / servicios</legend>

          <div className="items-container">
            {formData.items.map(
              (item, index) => (
                <div
                  className="invoice-item-row"
                  key={item.id}
                >
                  <div className="item-index">
                    {index + 1}
                  </div>

                  <div className="form-group item-description">
                    <label>
                      Descripción
                    </label>

                    <input
                      value={item.description}
                      onChange={(event) =>
                        handleItemChange(
                          item.id,
                          "description",
                          event.target.value,
                        )
                      }
                      placeholder="Producto o servicio"
                    />
                  </div>

                  <div className="form-group item-number">
                    <label>
                      Cantidad
                    </label>

                    <input
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

                  <div className="form-group item-number">
                    <label>
                      Precio
                    </label>

                    <input
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
                    />
                  </div>

                  <button
                    type="button"
                    className="button button-danger item-remove"
                    disabled={
                      formData.items.length === 1
                    }
                    onClick={() =>
                      removeItem(item.id)
                    }
                  >
                    Eliminar
                  </button>
                </div>
              ),
            )}
          </div>

          {errors.items && (
            <span className="error-message">
              {errors.items}
            </span>
          )}

          <button
            type="button"
            className="button button-secondary"
            onClick={addItem}
          >
            + Agregar producto
          </button>
        </fieldset>

        <div className="form-actions">
          <button
            type="submit"
            className="button button-primary"
          >
            Guardar factura
          </button>
        </div>
      </form>
    </section>
  );
}

export default InvoiceForm;