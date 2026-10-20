import trainers from '../data/trainers';
import StarRating from './StarRating';

const FILTER_OPTIONS = ['All', 'Strength', 'Group', 'Personal'];

function TrainerBio({ filter, onFilterChange, ratings, onRate }) {
  const filtered = filter === 'All' ? trainers : trainers.filter((t) => t.category === filter);

  return (
    <section id="trainers" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <span className="text-text-muted text-xs font-bold tracking-widest uppercase">MEET THE TEAM</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-3">
            Train With the <span className="text-accent">Best.</span>
          </h2>
          <p className="text-text-muted max-w-xl mx-auto text-sm">
            Meet our dedicated trainers who are here to guide, motivate, and support you on your fitness journey.
          </p>

          {/* Filter buttons */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                onClick={() => onFilterChange(opt)}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  filter === opt
                    ? 'bg-accent text-page border-accent'
                    : 'bg-transparent text-text-secondary border-border hover:border-accent/40'
                }`}
              >
                {opt === 'All' ? 'All Trainers' : opt}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((trainer) => (
            <article
              key={trainer.id}
              className="bg-card border border-border rounded-xl overflow-hidden flex flex-col hover:border-accent/40 transition-colors"
            >
              <div className="aspect-[289/216] bg-[#161616] overflow-hidden">
                <img
                  src={trainer.image}
                  alt={`${trainer.name} – ${trainer.role}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold mb-1">{trainer.name}</h3>
                <p className="text-text-muted text-sm mb-3">{trainer.role}</p>
                <p className="text-text-secondary text-sm leading-relaxed flex-1">{trainer.bio}</p>

                {/* Controlled StarRating per trainer */}
                <StarRating
                  value={ratings[trainer.id] || 0}
                  onChange={(val) => onRate(trainer.id, val)}
                />

                <a
                  href={`mailto:${trainer.email}`}
                  className="mt-4 text-accent text-sm font-semibold hover:underline break-all"
                >
                  {trainer.email}
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default TrainerBio;
