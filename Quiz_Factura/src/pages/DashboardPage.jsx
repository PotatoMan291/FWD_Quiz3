import { useMemo } from "react";

import ClientDistributionChart from "../components/ClientDistributionChart";
import MetricCard from "../components/MetricCard";
import RevenueChart from "../components/RevenueChart";

import {
  calculateDashboardMetrics,
  calculateRevenueForecast,
  calculateStatusCounts,
  calculateTopClients,
  detectOutliers,
  getClientDistribution,
  getRevenueByPeriod,
} from "../utils/dashboardCalculations";

import {
  formatCurrency,
  formatDate,
} from "../utils/invoiceCalculations";

function DashboardPage({ invoices }) {
  const dashboard = useMemo(() => {
    const metrics =
      calculateDashboardMetrics(
        invoices,
      );

    const topClients =
      calculateTopClients(invoices);

    const outlierAnalysis =
      detectOutliers(invoices);

    const statusCounts =
      calculateStatusCounts(
        invoices,
      );

    const revenueByPeriod =
      getRevenueByPeriod(invoices);

    const clientDistribution =
      getClientDistribution(
        invoices,
      );

    const forecast =
      calculateRevenueForecast(
        invoices,
      );

    return {
      metrics,
      topClients,
      outlierAnalysis,
      statusCounts,
      revenueByPeriod,
      clientDistribution,
      forecast,
    };
  }, [invoices]);

  return (
    <>
      <section className="page-heading">
        <span className="eyebrow">
          Administración
        </span>

        <h1>
          Dashboard de facturación
        </h1>

        <p>
          Métricas, estados, anomalías y
          proyección de ingresos.
        </p>
      </section>

      <section className="metrics-grid">
        <MetricCard
          title="Total facturado"
          value={formatCurrency(
            dashboard.metrics
              .totalBilled,
          )}
          description="Monto acumulado"
        />

        <MetricCard
          title="Facturas"
          value={
            dashboard.metrics
              .invoiceCount
          }
          description="Documentos registrados"
        />

        <MetricCard
          title="Ticket promedio"
          value={formatCurrency(
            dashboard.metrics
              .averageTicket,
          )}
          description="Promedio por factura"
        />

        <MetricCard
          title="Próximo período"
          value={formatCurrency(
            dashboard.forecast,
          )}
          description="Estimación por promedio móvil"
        />
      </section>

      <section className="status-grid">
        <article className="status-card">
          <span>Pagadas</span>
          <strong>
            {
              dashboard.statusCounts
                .Pagada
            }
          </strong>
        </article>

        <article className="status-card">
          <span>Pendientes</span>
          <strong>
            {
              dashboard.statusCounts
                .Pendiente
            }
          </strong>
        </article>

        <article className="status-card">
          <span>Vencidas</span>
          <strong>
            {
              dashboard.statusCounts
                .Vencida
            }
          </strong>
        </article>

        <article className="status-card">
          <span>Atípicas</span>
          <strong>
            {
              dashboard
                .outlierAnalysis
                .outliers.length
            }
          </strong>
        </article>
      </section>

      <div className="charts-grid">
        <RevenueChart
          data={
            dashboard.revenueByPeriod
          }
        />

        <ClientDistributionChart
          data={
            dashboard
              .clientDistribution
          }
        />
      </div>

      <div className="dashboard-columns">
        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Ranking
              </span>

              <h2>
                Top 3 clientes
              </h2>
            </div>
          </div>

          {dashboard.topClients.length ===
          0 ? (
            <p>
              No hay datos disponibles.
            </p>
          ) : (
            <ol className="ranking-list">
              {dashboard.topClients.map(
                (client) => (
                  <li key={client.name}>
                    <span>
                      {client.name}
                    </span>

                    <strong>
                      {formatCurrency(
                        client.total,
                      )}
                    </strong>
                  </li>
                ),
              )}
            </ol>
          )}
        </section>

        <section className="panel">
          <div className="section-heading">
            <div>
              <span className="eyebrow">
                Análisis estadístico
              </span>

              <h2>
                Facturas atípicas
              </h2>
            </div>
          </div>

          <div className="analysis-summary">
            <p>
              Promedio:{" "}
              <strong>
                {formatCurrency(
                  dashboard
                    .outlierAnalysis
                    .average,
                )}
              </strong>
            </p>

            <p>
              Desviación estándar:{" "}
              <strong>
                {formatCurrency(
                  dashboard
                    .outlierAnalysis
                    .standardDeviation,
                )}
              </strong>
            </p>
          </div>

          {dashboard.outlierAnalysis
            .outliers.length === 0 ? (
            <p>
              No se detectaron facturas
              significativamente alejadas
              del promedio.
            </p>
          ) : (
            <div className="outlier-list">
              {dashboard.outlierAnalysis.outliers.map(
                (invoice) => (
                  <article
                    className="outlier-item"
                    key={invoice.id}
                  >
                    <div>
                      <strong>
                        {
                          invoice.invoiceNumber
                        }
                      </strong>

                      <span>
                        {
                          invoice.client
                            ?.name
                        }
                      </span>

                      <small>
                        {formatDate(
                          invoice.issueDate,
                        )}
                      </small>
                    </div>

                    <strong>
                      {formatCurrency(
                        invoice
                          .calculatedTotal,
                      )}
                    </strong>
                  </article>
                ),
              )}
            </div>
          )}
        </section>
      </div>

      <section className="forecast-note">
        <strong>
          Sobre la proyección:
        </strong>{" "}
        el valor mostrado es una
        estimación calculada con el
        promedio de los últimos tres
        períodos disponibles. No
        representa un ingreso real ni
        garantizado.
      </section>
    </>
  );
}

export default DashboardPage;