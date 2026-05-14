import './Stats.css';

const delays = ['anim-delay-1', 'anim-delay-2', 'anim-delay-3', 'anim-delay-4'];

export default function Stats({ stats = [] }) {
  return (
    <section className="stats-section">
      <div className="stats-row">
        {stats.map((stat, i) => (
          <div key={i} className={`stat anim-fade-up ${delays[i] || delays[delays.length - 1]}`}>
            <p className="stat-number">{stat.number}</p>
            <div className="stat-titles">
              <p className="stat-title">{stat.title}</p>
              <p className="stat-subtitle">{stat.subtitle}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
