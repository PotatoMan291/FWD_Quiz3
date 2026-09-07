import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const COLORS = [
  "#625bf6",
  "#22a06b",
  "#f59e0b",
  "#ef4444",
  "#0ea5e9",
  "#8b5cf6",
  "#14b8a6",
];

function ClientDistributionChart({
  data,
}) {
  return (
    <section className="chart-card">
      <div className="section-heading">
        <div>
          <span className="eyebrow">
            Clientes
          </span>

          <h2>
            Distribución de facturación
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
            <PieChart>
              <Pie
                data={data}
                dataKey="total"
                nameKey="name"
                innerRadius={55}
                outerRadius={95}
                paddingAngle={2}
              >
                {data.map(
                  (_, index) => (
                    <Cell
                      key={index}
                      fill={
                        COLORS[
                          index %
                            COLORS.length
                        ]
                      }
                    />
                  ),
                )}
              </Pie>

              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

export default ClientDistributionChart;