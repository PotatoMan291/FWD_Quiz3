# FacturaCR - Sistema de Facturación

FacturaCR es una aplicación web administrativa desarrollada con **React + Vite** para la creación, consulta y análisis de facturas.

El sistema permite registrar facturas con múltiples productos o servicios, consultar su información detallada, controlar su estado de pago y visualizar métricas administrativas mediante un dashboard.

El proyecto utiliza **JSON Server** y un archivo `db.json` como fuente de datos.

---

## Tecnologías utilizadas

- React
- Vite
- JavaScript
- React Router DOM
- Recharts
- SweetAlert2
- JSON Server
- HTML5
- CSS3
- LocalStorage

---

## Funcionalidades

### Autenticación

La aplicación cuenta con un sistema de inicio de sesión para restringir el acceso al área administrativa.

Incluye:

- Inicio de sesión.
- Persistencia de sesión mediante `localStorage`.
- Protección de rutas mediante React Router.
- Cierre de sesión.
- Confirmación de cierre de sesión mediante SweetAlert2.

> El sistema de autenticación fue implementado con fines académicos utilizando JSON Server. No debe considerarse un sistema de autenticación seguro para un entorno de producción.

---

### Gestión de facturas

El sistema permite:

- Crear nuevas facturas.
- Registrar información del emisor.
- Registrar información del cliente.
- Indicar número de factura.
- Definir fecha de emisión.
- Definir fecha de vencimiento.
- Configurar porcentaje de impuesto.
- Agregar múltiples productos o servicios.
- Eliminar productos antes de guardar una factura.
- Validar los campos principales del formulario.
- Consultar todas las facturas registradas.
- Visualizar una factura individual.
- Imprimir una factura.
- Marcar una factura como pagada.

Los productos de cada factura incluyen:

- Descripción.
- Cantidad.
- Precio unitario.
- Total por línea.

Los valores de subtotal, impuesto y total se calculan dinámicamente a partir de los productos registrados.

---

## Estados de las facturas

Las facturas pueden encontrarse en tres estados:

### Pagada

Una factura se considera pagada cuando el administrador la marca explícitamente como pagada.

### Pendiente

Una factura se considera pendiente cuando todavía no ha sido pagada y su fecha de vencimiento no ha pasado.

### Vencida

Una factura se considera vencida automáticamente cuando no está pagada y su fecha de vencimiento es anterior a la fecha actual.

Por lo tanto, los estados `Pendiente` y `Vencida` son valores derivados y no se almacenan manualmente en la base de datos.

---

## Dashboard administrativo

La aplicación incluye un dashboard para analizar la información almacenada en las facturas.

El dashboard muestra:

- Total facturado.
- Cantidad total de facturas.
- Ticket promedio.
- Top 3 de clientes por monto facturado.
- Cantidad de facturas pagadas.
- Cantidad de facturas pendientes.
- Cantidad de facturas vencidas.
- Cantidad de facturas atípicas.
- Proyección de ingresos para el próximo período.

Todos estos valores son calculados dinámicamente a partir de las facturas existentes.

---

## Gráficos

El dashboard incluye gráficos desarrollados con **Recharts**.

### Ingresos por período

Muestra la evolución de los ingresos agrupando las facturas según su período de emisión.

### Distribución por cliente

Muestra cómo se distribuye el monto facturado entre los diferentes clientes registrados.

Los gráficos utilizan directamente la información obtenida de las facturas y no contienen valores hardcodeados.

---

## Detección de facturas atípicas

El dashboard incorpora un análisis estadístico para detectar facturas cuyo monto se aleja significativamente del comportamiento normal de las demás facturas.

Primero se obtiene el total de cada factura.

Posteriormente se calcula el promedio:

```text
promedio = suma de los totales / cantidad de facturas
```

Después se calcula la varianza poblacional:

```text
varianza =
Σ (total - promedio)² / cantidad de facturas
```

La desviación estándar se obtiene mediante:

```text
desviación estándar = √varianza
```

Finalmente, una factura se considera atípica cuando:

```text
|total de factura - promedio| > 1.5 × desviación estándar
```

El dashboard muestra:

- Promedio de las facturas.
- Desviación estándar.
- Cantidad de facturas atípicas.
- Información de las facturas detectadas como atípicas.

---

## Proyección de ingresos

El dashboard incluye una estimación de ingresos para el próximo período.

Para realizar esta estimación se utiliza un **promedio móvil simple de los últimos tres períodos disponibles**.

La fórmula utilizada es:

```text
proyección =
suma de los ingresos de los últimos 3 períodos
/
cantidad de períodos utilizados
```

Si existen menos de tres períodos registrados, se utilizan todos los períodos disponibles.

Por ejemplo, si los últimos tres períodos tienen ingresos de:

```text
₡500
₡700
₡600
```

la proyección sería:

```text
(500 + 700 + 600) / 3 = ₡600
```

Esta proyección es únicamente una **estimación basada en datos históricos** y no representa un ingreso real o garantizado.

---

## React Router

La navegación de la aplicación se realiza mediante **React Router DOM**.

Las principales rutas son:

| Ruta | Descripción |
|---|---|
| `/login` | Inicio de sesión |
| `/` | Creación y listado de facturas |
| `/invoice/:id` | Vista detallada de una factura |
| `/dashboard` | Dashboard administrativo |

Las rutas administrativas están protegidas y requieren que exista una sesión iniciada.

---

## Modo oscuro

FacturaCR incluye soporte para:

- Modo claro.
- Modo oscuro.

La preferencia seleccionada se almacena mediante `localStorage`, por lo que se mantiene después de actualizar o volver a abrir la aplicación.

Si todavía no existe una preferencia guardada, la aplicación puede utilizar la preferencia de color configurada en el sistema operativo del usuario.

La vista imprimible de la factura se mantiene con fondo blanco para conservar el formato visual de un documento.

---

## Estructura principal del proyecto

```text
src/
│
├── components/
│   ├── ClientDistributionChart.jsx
│   ├── Invoice.jsx
│   ├── InvoiceForm.jsx
│   ├── InvoiceList.jsx
│   ├── Layout.jsx
│   ├── MetricCard.jsx
│   ├── ProtectedRoute.jsx
│   └── RevenueChart.jsx
│
├── context/
│   ├── AuthContext.jsx
│   └── ThemeContext.jsx
│
├── pages/
│   ├── BillingPage.jsx
│   ├── DashboardPage.jsx
│   ├── InvoicePage.jsx
│   └── LoginPage.jsx
│
├── services/
│   ├── authService.js
│   ├── gometaService.js
│   └── invoiceService.js
│
├── utils/
│   ├── dashboardCalculations.js
│   └── invoiceCalculations.js
│
├── App.jsx
├── App.css
├── index.css
└── main.jsx

db.json
package.json
README.md
```

---

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/PotatoMan291/FWD_Quiz3.git
```

Ingresar a la carpeta del proyecto:

```bash
cd NOMBRE_DEL_PROYECTO
```

### 2. Instalar dependencias

```bash
npm install
```

---

## Ejecutar el proyecto

La aplicación necesita ejecutar **Vite** y **JSON Server** simultáneamente.

### Terminal 1 - JSON Server

```bash
npm run server
```

JSON Server se ejecutará normalmente en:

```text
http://localhost:3000
```

### Terminal 2 - React

```bash
npm run dev
```

Vite mostrará en la terminal la dirección de la aplicación, normalmente:

```text
http://localhost:5173
```

---

## Credenciales de prueba

Para ingresar al sistema puede utilizarse el usuario incluido en `db.json`:

```text
Usuario: admin
Contraseña: admin123
```

Estas credenciales existen únicamente para fines académicos y de demostración.

---

## Datos de prueba

El archivo `db.json` incluye diferentes facturas de prueba para comprobar las funcionalidades del dashboard.

Entre ellas se incluyen facturas:

- Pagadas.
- Pendientes.
- Vencidas.
- De diferentes clientes.
- De diferentes períodos.
- Con diferentes montos.
- Con un monto significativamente superior al promedio para comprobar la detección de valores atípicos.

Los datos de prueba permiten verificar que las métricas, gráficos, estados y análisis estadísticos se actualizan dinámicamente.

---

## Scripts disponibles

Ejecutar la aplicación:

```bash
npm run dev
```

Ejecutar JSON Server:

```bash
npm run server
```

Generar una versión de producción:

```bash
npm run build
```

Ejecutar ESLint:

```bash
npm run lint
```

Previsualizar la versión de producción:

```bash
npm run preview
```

---

## Persistencia de datos

Las facturas y usuarios utilizados para las pruebas se almacenan mediante **JSON Server** en:

```text
db.json
```

Las preferencias locales de la aplicación, como la sesión y el tema seleccionado, utilizan:

```text
localStorage
```

---

## Consideraciones

Este proyecto fue desarrollado con fines académicos.

JSON Server se utiliza para simular una API REST, por lo que aspectos como autenticación, autorización, cifrado de contraseñas y seguridad de sesiones requerirían un backend real para utilizar la aplicación en producción.
