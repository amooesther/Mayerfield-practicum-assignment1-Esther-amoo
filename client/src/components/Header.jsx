function Header() {
  return (
    <header className="sticky top-0 z-50 bg-page/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-black tracking-tight">
          <span className="text-text-primary">Fit</span>
          <span className="text-accent">Zone</span>
        </a>

        {/* Hamburger toggle (CSS-only, no JS) */}
        <input type="checkbox" id="nav-toggle" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-50"
          aria-label="Toggle navigation"
        >
          <span className="block h-0.5 bg-white rounded transition-transform duration-200" />
          <span className="block h-0.5 bg-white rounded transition-opacity duration-200" />
          <span className="block h-0.5 bg-white rounded transition-transform duration-200" />
        </label>

        {/* Nav: hidden on mobile, visible md+, OR when checkbox checked */}
        <nav
          className="
            absolute top-[72px] left-0 w-full bg-page border-b border-border
            max-h-0 overflow-hidden transition-all duration-300
            md:static md:w-auto md:bg-transparent md:border-none
            md:max-h-none md:overflow-visible
          "
          aria-label="Main Navigation"
        >
          <ul className="flex flex-col md:flex-row gap-4 md:gap-6 p-6 md:p-0">
            {['home', 'about', 'schedule', 'trainers', 'membership', 'contact'].map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  className="text-text-secondary hover:text-accent text-sm font-medium capitalize transition-colors"
                >
                  {id === 'schedule'
                    ? 'Class Schedule'
                    : id === 'trainers'
                    ? 'Trainer Bio'
                    : id === 'membership'
                    ? 'Membership Tiers'
                    : id.charAt(0).toUpperCase() + id.slice(1)}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
export default Header;

