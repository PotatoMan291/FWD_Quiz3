function MetricCard({
  title,
  value,
  description,
}) {
  return (
    <article className="metric-card">
      <span className="metric-title">
        {title}
      </span>

      <strong className="metric-value">
        {value}
      </strong>

      {description && (
        <p>{description}</p>
      )}
    </article>
  );
}

export default MetricCard;