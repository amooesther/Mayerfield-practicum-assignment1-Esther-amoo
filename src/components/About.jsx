import { aboutFeatures } from '../data';

function About() {
  return (
    <section id="about" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <span className="text-text-muted text-xs font-bold tracking-widest uppercase">ABOUT FITZONE</span>
        <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">
          <div>
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">
              More Than Just a <span className="text-accent">Gym.</span>
            </h2>
            <p className="text-text-secondary leading-relaxed mb-4">
              At FitZone, we believe fitness is about more than lifting weights. It is about building
              confidence, developing healthy habits, and becoming stronger every day.
            </p>
            <p className="text-text-secondary leading-relaxed mb-8">
              Whether you are just starting your fitness journey or working towards your next personal
              best, our supportive community and dedicated trainers are here to help you reach your goals.
            </p>
            <a
              href="#membership"
              className="inline-block bg-accent text-page font-bold text-sm px-7 py-3.5 rounded hover:bg-yellow-300 transition-colors"
            >
              Explore Membership
            </a>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {aboutFeatures.map((card) => (
              <article
                key={card.id || card.title}
                className="bg-card border border-border rounded-xl p-7 hover:border-accent/40 transition-colors"
              >
                <h3 className="text-base font-bold mb-2">{card.title}</h3>
                <p className="text-text-muted text-sm leading-relaxed">{card.text}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default About;
