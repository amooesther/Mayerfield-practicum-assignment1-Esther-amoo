import { useState, useEffect, useCallback } from 'react';
import { trainers as fallbackTrainers } from '../data';
import api from '../services/api';
import StarRating from './StarRating';
import QuantityStepper from './QuantityStepper';

const FILTER_OPTIONS = ['All', 'Strength', 'Group', 'Personal'];

function TrainerBio({
  filter: externalFilter,
  onFilterChange: externalOnFilterChange,
  ratings = {},
  onRate,
  sessions = {},
  onSessionChange,
}) {
  // 1. Data state (from backend API with local fallback)
  const [trainersList, setTrainersList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [apiError, setApiError] = useState(null);

  // 2. Real filter on the main grid, built with useState
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [localRatings, setLocalRatings] = useState({});
  const [localSessions, setLocalSessions] = useState({});

  // 3. Fetch products/trainers from backend API
  const fetchTrainers = useCallback(async () => {
    setIsLoading(true);
    setApiError(null);
    try {
      const data = await api.getProducts();
      if (Array.isArray(data) && data.length > 0) {
        setTrainersList(data);
      } else {
        // Fallback if database is empty before seed
        setTrainersList(fallbackTrainers);
      }
    } catch (err) {
      console.warn('API fetch failed, using fallback data:', err.message);
      setApiError('Could not connect to live database. Displaying local data.');
      setTrainersList(fallbackTrainers);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTrainers();
  }, [fetchTrainers]);

  // Support both lifted state (via props from App) and local component state
  const activeFilter = externalFilter !== undefined ? externalFilter : selectedCategory;
  const currentRatings = ratings && Object.keys(ratings).length > 0 ? ratings : localRatings;
  const currentSessions = sessions && Object.keys(sessions).length > 0 ? sessions : localSessions;

  const handleRate = onRate || ((id, val) => setLocalRatings((prev) => ({ ...prev, [id]: val })));
  const handleSessionChange =
    onSessionChange ||
    ((id, count) => setLocalSessions((prev) => ({ ...prev, [id]: count })));

  const handleFilterClick = (category) => {
    setSelectedCategory(category);
    if (externalOnFilterChange) {
      externalOnFilterChange(category);
    }
  };

  const filtered = activeFilter === 'All'
    ? trainersList
    : trainersList.filter(
        (t) => t.category && t.category.toLowerCase() === activeFilter.toLowerCase()
      );

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

        {/* API Error / Offline notice with Retry Button */}
        {apiError && (
          <div className="mb-8 p-4 rounded-xl bg-[#1c1c1c] border border-yellow-500/30 flex items-center justify-between gap-4">
            <span className="text-xs text-yellow-400 font-medium">
              ℹ️ {apiError}
            </span>
            <button
              type="button"
              onClick={fetchTrainers}
              className="text-xs font-bold text-accent hover:underline flex-shrink-0"
            >
              Retry Connection
            </button>
          </div>
        )}

        {/* Loading State Skeleton */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-card border border-border rounded-xl overflow-hidden h-[440px]">
                <div className="aspect-[289/216] bg-[#222]" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-[#252525] rounded w-1/2" />
                  <div className="h-4 bg-[#252525] rounded w-1/3" />
                  <div className="h-14 bg-[#252525] rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          /* Empty State */
          <div className="text-center py-16 bg-card border border-border rounded-2xl p-8">
            <p className="text-base text-text-secondary font-semibold">No trainers found in this category.</p>
            <p className="text-xs text-text-muted mt-1">Try selecting "All Trainers" above.</p>
          </div>
        ) : (
          /* Main Database-Driven Grid */
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
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <h3 className="text-lg font-bold">{trainer.name}</h3>
                    {trainer.price && (
                      <span className="text-xs font-bold text-accent bg-accent/10 px-2 py-0.5 rounded border border-accent/20">
                        {trainer.price}
                      </span>
                    )}
                  </div>
                  <p className="text-text-muted text-sm mb-3">{trainer.role}</p>
                  <p className="text-text-secondary text-sm leading-relaxed flex-1">{trainer.bio}</p>

                  {/* Controlled component #1: StarRating reused per item */}
                  <div className="mt-4">
                    <span className="text-xs text-text-muted">Member Rating:</span>
                    <StarRating
                      value={currentRatings[trainer.id] || 0}
                      onChange={(val) => handleRate(trainer.id, val)}
                    />
                  </div>

                  {/* Controlled component #2: QuantityStepper reused per item */}
                  <QuantityStepper
                    value={currentSessions[trainer.id] || 0}
                    onChange={(count) => handleSessionChange(trainer.id, count)}
                    label="Book Sessions"
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
