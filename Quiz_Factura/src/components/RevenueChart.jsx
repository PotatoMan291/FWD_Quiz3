import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function RevenueChart({ data }) {
  return (
    <section className="chart-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            Tendencia
          </span>

          <h2>
            Ingresos por período
          </h2>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="empty-chart">
          No hay suficientes datos.
        </div>
      ) : (
        <div className="chart-container">
          <ResponsiveContainer
            width="100%"
            height="100%"
          >
            <BarChart data={data}>
              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis dataKey="period" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="total"
                name="Ingresos"
                fill="#625bf6"
                radius={[7, 7, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default RevenueChart;