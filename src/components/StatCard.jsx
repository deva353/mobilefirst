export default function StatCard({ title, value, subtitle, icon: Icon, variant }) {
  return (
    <article className={`stat-card stat-card--${variant}`}>
      <div className="stat-card__top">
        <span className="stat-card__title">{title}</span>
        <div className="stat-card__icon" aria-hidden="true">
          <Icon size={18} />
        </div>
      </div>

      <div className="stat-card__value">{value}</div>
      {subtitle && <p className="stat-card__subtitle">{subtitle}</p>}
    </article>
  );
}