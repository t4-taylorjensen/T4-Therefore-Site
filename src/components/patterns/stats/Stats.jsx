import './Stats.css';

const stats = [
  {
    number: '42+',
    title: 'Implementations',
    subtitle: 'Enterprise headless builds delivered',
  },
  {
    number: '38%',
    title: 'Performance Lift',
    subtitle: 'Average post-launch improvement',
  },
  {
    number: '14wk',
    title: 'Time to Launch',
    subtitle: 'Typical composable deployment',
  },
  {
    number: '$2B+',
    title: 'Commerce Revenue',
    subtitle: 'Enabled across client portfolios',
  },
];

const delays = ['anim-delay-1', 'anim-delay-2', 'anim-delay-3', 'anim-delay-4'];

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="stats-row">
        {stats.map((stat, i) => (
          <div key={i} className={`stat anim-fade-up ${delays[i]}`}>
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
