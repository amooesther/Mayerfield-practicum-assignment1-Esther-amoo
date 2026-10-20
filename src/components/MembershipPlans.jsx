import plans from '../data/plans';

function MembershipPlans() {
  return (
    <section id="membership" className="py-20 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-text-muted text-xs font-bold tracking-widest uppercase">CHOOSE YOUR PLAN</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold mt-4 mb-3">
            Membership <span className="text-accent">Plans.</span>
          </h2>
          <p className="text-text-muted text-sm max-w-md mx-auto">
            Choose a membership that suits your goals, routine, and budget.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <article
              key={plan.id}
              className="bg-card border border-border rounded-xl p-8 flex flex-col hover:border-accent/40 transition-colors"
            >
              <h3 className="text-xl font-extrabold mb-4">{plan.tier}</h3>
              <div className="flex items-baseline gap-1.5 mb-5">
                <span className="text-4xl font-black text-accent tracking-tight">{plan.price}</span>
                <span className="text-text-muted text-sm">/ month</span>
              </div>
              <p className="text-text-secondary text-sm mb-6 min-h-[2.5rem]">{plan.summary}</p>
              <ul className="flex flex-col gap-3 mb-8 flex-1">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-text-secondary">
                    <span className="text-accent font-black text-base leading-tight">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="#contact"
                className="block text-center bg-accent text-page font-bold text-sm py-3.5 rounded hover:bg-yellow-300 transition-colors"
              >
                Choose {plan.tier}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export default MembershipPlans;

