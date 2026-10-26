function Hero() {
  return (
    <section id="home" className="pt-24 pb-0 scroll-mt-20">
      <div className="max-w-6xl mx-auto px-6">
        <span className="text-accent text-xs font-bold tracking-widest uppercase">
          YOUR FITNESS JOURNEY STARTS HERE
        </span>
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[1.05] tracking-tight text-text-primary mt-8 mb-5">
          Build <span className="text-accent">Strength.</span>
          <br />
          Become <span className="text-accent">Stronger.</span>
        </h1>
        <p className="text-text-secondary text-base sm:text-lg leading-relaxed max-w-[535px]">
          From your first workout to your next personal best, FitZone gives you the classes,
          expert guidance, and supportive community you need to reach your fitness goals.
        </p>
        <hr className="border-divider mt-20 w-full" />
      </div>
    </section>
  );
}
export default Hero;

