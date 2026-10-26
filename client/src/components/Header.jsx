import { useAuth } from '../context/AuthContext';

function Header({ onOpenAuth }) {
  const { user, logout } = useAuth();

  return (
    <header className="sticky top-0 z-40 bg-page/95 backdrop-blur border-b border-white/5">
      <div className="max-w-6xl mx-auto px-6 h-[72px] flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="text-2xl font-black tracking-tight flex items-center">
          <span className="text-text-primary">Fit</span>
          <span className="text-accent">Zone</span>
        </a>

        {/* Hamburger toggle (CSS-only, no JS) */}
        <input type="checkbox" id="nav-toggle" className="hidden" />
        <label
          htmlFor="nav-toggle"
          className="md:hidden flex flex-col justify-between w-7 h-5 cursor-pointer z-50 order-2"
          aria-label="Toggle navigation"
        >
          <span className="block h-0.5 bg-white rounded transition-transform duration-200" />
          <span className="block h-0.5 bg-white rounded transition-opacity duration-200" />
          <span className="block h-0.5 bg-white rounded transition-transform duration-200" />
        </label>

        {/* Navigation & Auth */}
        <nav
          className="
            absolute top-[72px] left-0 w-full bg-page border-b border-border
            max-h-0 overflow-hidden transition-all duration-300
            md:static md:w-auto md:bg-transparent md:border-none
            md:max-h-none md:overflow-visible
          "
          aria-label="Main Navigation"
        >
          <div className="flex flex-col md:flex-row md:items-center gap-5 p-6 md:p-0">
            {/* Section Anchor Links */}
            <ul className="flex flex-col md:flex-row gap-4 md:gap-6">
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

            {/* Authentication Controls */}
            <div className="flex items-center gap-3 pt-4 md:pt-0 border-t md:border-t-0 md:border-l md:pl-5 border-border">
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-xs font-semibold px-3 py-1 bg-accent/10 border border-accent/20 rounded-full text-accent truncate max-w-[130px]">
                    👤 {user.name}
                  </span>
                  <button
                    type="button"
                    onClick={logout}
                    className="text-xs font-semibold text-text-muted hover:text-red-400 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex items-center gap-2.5">
                  <button
                    type="button"
                    onClick={() => onOpenAuth('login')}
                    className="text-text-secondary hover:text-accent text-xs font-bold transition-colors px-2 py-1"
                  >
                    Sign In
                  </button>
                  <button
                    type="button"
                    onClick={() => onOpenAuth('signup')}
                    className="bg-accent text-page font-extrabold text-xs px-3.5 py-1.5 rounded-full hover:bg-yellow-300 transition-colors shadow-sm"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}

export default Header;
