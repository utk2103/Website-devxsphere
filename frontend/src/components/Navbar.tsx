import { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';
import { Menu, X } from 'lucide-react';

const navItems = [
  { name: 'Home', id: 'hero' },
  { name: 'About', id: 'about' },
  { name: 'Events', id: 'events' },
  { name: 'Stats', id: 'stats' },
  { name: 'Team', id: 'team' },
  { name: 'Contribute', id: 'contribute' },
];

const Navbar = () => {
  const [active, setActive] = useState('hero');
  const { theme, toggleTheme } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    // Highlight the section based on scroll position
    const handleScroll = () => {
      const offsets = navItems.map(item => {
        const el = document.getElementById(item.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          return { id: item.id, top: rect.top };
        }
        return { id: item.id, top: Infinity };
      });
      const cur = offsets.reduce((best, curr) =>
        Math.abs(curr.top) < Math.abs(best.top) ? curr : best
      , offsets[0]);
      setActive(cur.id);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNav = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setActive(id);
    setMobileOpen(false);
  };

  return (
    <nav className="fixed top-4 left-0 right-0 flex justify-center z-50 pointer-events-none">
      {/* Desktop Nav */}
      <div className="backdrop-blur-lg bg-white/50 dark:bg-gray-950/60 border border-accent-200 dark:border-accent-700 rounded-[2rem] flex pointer-events-auto transition-all px-2 py-1 shadow-lg hidden md:flex">
        {navItems.map(({ name, id }) => (
          <button
            key={id}
            onClick={() => handleNav(id)}
            className={`font-bold px-4 py-2 rounded-full outline-none transition-all
              ${active === id
                ? "text-accent-900 dark:text-accent-100 bg-accent-100/70 dark:bg-accent-800/30"
                : "text-gray-700 dark:text-gray-200 hover:bg-accent-200/40 dark:hover:bg-accent-700/40"
              }
            `}
            style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}
          >
            {name}
          </button>
        ))}
        <button
          onClick={() => window.location.pathname = "/blog"}
          className="font-bold px-4 py-2 rounded-full outline-none transition-all text-gray-700 dark:text-gray-200 hover:bg-accent-200/40 dark:hover:bg-accent-700/40 ml-2"
          style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}
        >
          Blog
        </button>
        <button
          onClick={toggleTheme}
          aria-label="Toggle theme"
          className="ml-3 flex items-center justify-center w-9 h-9 rounded-full transition-all border border-transparent hover:bg-accent-200/40 dark:hover:bg-accent-700/40"
        >
          <span
            className="inline-block align-middle text-xl"
            style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </span>
        </button>
      </div>
      {/* Mobile Nav */}
      <div className="flex md:hidden w-full justify-between items-center px-4 py-2 bg-white/80 dark:bg-gray-950/80 rounded-[2rem] border border-accent-200 dark:border-accent-700 shadow-lg pointer-events-auto">
        <span className="font-bold text-lg" style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}>devXsphere</span>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="ml-2 p-2 rounded-full hover:bg-accent-200/40 dark:hover:bg-accent-700/40 focus:outline-none">
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>
      {/* Mobile Dropdown */}
      {mobileOpen && (
        <div className="fixed top-20 left-0 right-0 mx-auto w-[90vw] max-w-xs bg-white dark:bg-gray-950 border border-accent-200 dark:border-accent-700 rounded-2xl shadow-xl z-50 flex flex-col items-center py-4 space-y-2 md:hidden pointer-events-auto animate-fade-in">
          {navItems.map(({ name, id }) => (
            <button
              key={id}
              onClick={() => handleNav(id)}
              className={`font-bold w-full px-4 py-3 rounded-full outline-none transition-all text-lg
                ${active === id
                  ? "text-accent-900 dark:text-accent-100 bg-accent-100/70 dark:bg-accent-800/30"
                  : "text-gray-700 dark:text-gray-200 hover:bg-accent-200/40 dark:hover:bg-accent-700/40"
                }
              `}
              style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}
            >
              {name}
            </button>
          ))}
          <button
            onClick={() => { window.location.pathname = "/blog"; setMobileOpen(false); }}
            className="font-bold w-full px-4 py-3 rounded-full outline-none transition-all text-gray-700 dark:text-gray-200 hover:bg-accent-200/40 dark:hover:bg-accent-700/40"
            style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}
          >
            Blog
          </button>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="flex items-center justify-center w-10 h-10 rounded-full transition-all border border-transparent hover:bg-accent-200/40 dark:hover:bg-accent-700/40"
          >
            <span
              className="inline-block align-middle text-xl"
              style={{ fontFamily: "var(--font-display, Inter, sans-serif)" }}
            >
              {theme === 'dark' ? '🌙' : '☀️'}
            </span>
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;