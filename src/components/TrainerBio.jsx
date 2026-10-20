import { useState } from 'react';
import { trainers } from '../data';
import StarRating from './StarRating';

const FILTER_OPTIONS = ['All', 'Strength', 'Group', 'Personal'];

function TrainerBio({ filter: externalFilter, onFilterChange: externalOnFilterChange, ratings = {}, onRate }) {
  // Real filter on the main grid, built with useState
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localRatings, setLocalRatings] = useState({});

  // Support both lifted state (via props from App) and local component state
  const activeFilter = externalFilter !== undefined ? externalFilter : selectedCategory;
  const currentRatings = ratings && Object.keys(ratings).length > 0 ? ratings : localRatings;
  const handleRate = onRate || ((id, val) => setLocalRatings((prev) => ({ ...prev, [id]: val })));

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (externalOnFilterChange) {
      externalOnFilterChange(category);
    }
  };

  const filtered = activeFilter === 'All'
    ? trainers
    : trainers.filter((t) => t.category.toLowerCase() === activeFilter.toLowerCase());

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

          {/* Real Filter on Main Grid using useState */}
          <div className="flex flex-wrap justify-center gap-3 mt-8" role="group" aria-label="Trainer category filter">
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt}
                type="button"
                onClick={() => handleFilterClick(opt)}
                aria-pressed={activeFilter === opt}
                className={`px-5 py-2 rounded-full text-sm font-semibold border transition-colors ${
                  activeFilter === opt
                    ? 'bg-accent text-page border-accent shadow-sm'
                    : 'bg-transparent text-text-secondary border-border hover:border-accent/40'
                }`}
              >
                {opt === 'All' ? 'All Trainers' : opt}
              </button>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        {filtered.length === 0 ? (
          <p className="text-center text-text-muted py-12">No trainers found in this category.</p>
        ) : (
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
                    value={currentRatings[trainer.id] || 0}
                    onChange={(val) => handleRate(trainer.id, val)}
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
        )}
      </div>
    </section>
  );
}
export default TrainerBio;
