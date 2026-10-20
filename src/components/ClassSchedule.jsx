import schedule from '../data/schedule';

function ClassSchedule() {
  return (
    <section id="schedule" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <span className="text-text-muted text-xs font-bold tracking-widest uppercase">FIND YOUR SESSION</span>
        <h2 className="text-3xl sm:text-4xl font-extrabold mt-6 mb-10 text-center">
          Our Class <span className="text-accent">Schedule.</span>
        </h2>
        <p className="text-text-muted text-base mb-4">
          Find a class that fits your routine and take the next step towards your fitness goals.
        </p>
        <div className="overflow-x-auto rounded-lg bg-card">
          <table className="w-full text-sm min-w-[640px]">
            <thead>
              <tr className="bg-accent text-page">
                {['CLASS', 'DAY', 'TIME', 'TRAINER', 'LEVEL'].map((h) => (
                  <th key={h} className="text-left text-xs font-extrabold tracking-wider px-5 py-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {schedule.map((row, i) => (
                <tr
                  key={row.id}
                  className={`border-b border-border last:border-0 hover:bg-card-alt transition-colors ${
                    i % 2 === 0 ? 'bg-card' : 'bg-card-alt'
                  }`}
                >
                  <td className="px-5 py-4 text-text-primary font-medium">{row.className}</td>
                  <td className="px-5 py-4 text-text-secondary">{row.day}</td>
                  <td className="px-5 py-4 text-text-secondary">{row.time}</td>
                  <td className="px-5 py-4 text-text-secondary">{row.trainer}</td>
                  <td className="px-5 py-4 text-text-secondary">{row.level}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
export default ClassSchedule;
