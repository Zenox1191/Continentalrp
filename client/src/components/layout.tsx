import { ReactNode, useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Rocket, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

function Starfield() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden bg-background pointer-events-none">
      {/* Deep space background image from Unsplash with color dodge blend */}
      {/* space galaxy deep universe stars */}
      <img
        src="https://images.unsplash.com/photo-1534447677768-be436bb09401?w=1920&q=80"
        alt="Galaxy Background"
        className="absolute inset-0 w-full h-full object-cover opacity-20 mix-blend-screen animate-pan"
      />
      {/* Dynamic gradient overlays to give it the brand colors */}
      <div className="absolute inset-0 bg-gradient-to-tr from-background via-transparent to-primary/10 mix-blend-overlay"></div>
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary/20 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[100px] translate-y-1/3 -translate-x-1/4"></div>
    </div>
  );
}

function Navbar() {
  const [location] = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/", label: "Fő oldal", icon: Rocket },
    { href: "/szabalyzat", label: "Szabályzat", icon: Shield },
    { href: "/vezetoseg", label: "Vezetőség", icon: Users },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-3" : "py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav
          className={`flex items-center justify-between transition-all duration-300 rounded-2xl px-6 py-3 ${
            isScrolled ? "glass-panel" : "bg-transparent"
          }`}
        >
          <Link
            href="/"
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-accent p-0.5 shadow-[0_0_15px_rgba(126,34,206,0.5)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.6)] transition-shadow duration-300">
              <div className="w-full h-full bg-background rounded-full flex items-center justify-center">
                <Rocket className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
              </div>
            </div>
            <span className="font-display font-bold text-xl tracking-wide text-white hidden sm:block">
              CONTINENTAL <span className="galaxy-text">RP</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = location === link.href;
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`flex items-center gap-2 text-sm font-semibold uppercase tracking-wider transition-all duration-200 hover:text-white ${
                    isActive ? "text-white" : "text-white/60"
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? "text-primary" : ""}`} />
                  <span className="relative">
                    {link.label}
                    {isActive && (
                      <motion.div
                        layoutId="nav-indicator"
                        className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gradient-to-r from-primary to-accent"
                      />
                    )}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <Button
              className="glow-effect bg-white text-background hover:bg-white/90 font-bold"
              onClick={() => window.open("#", "_blank")}
            >
              Csatlakozás
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>

        {/* Mobile Nav */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-4 right-4 mt-2 glass-panel rounded-2xl p-4 flex flex-col gap-4"
            >
              {navLinks.map((link) => {
                const isActive = location === link.href;
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 p-3 rounded-xl transition-colors ${
                      isActive
                        ? "bg-white/10 text-white"
                        : "text-white/70 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                    <span className="font-semibold">{link.label}</span>
                  </Link>
                );
              })}
              <Button
                className="w-full bg-gradient-to-r from-primary to-accent text-white font-bold"
                onClick={() => window.open("#", "_blank")}
              >
                Csatlakozás Szerverhez
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Starfield />
      <Navbar />
      <main className="flex-1 pt-28 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatePresence mode="wait">
          {children}
        </AnimatePresence>
      </main>
      
      <footer className="py-8 border-t border-white/10 glass-panel mt-auto">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-white/50 text-sm font-sans">
            &copy; {new Date().getFullYear()} Continental Roleplay. Minden jog fenntartva.
          </p>
          <p className="text-white/30 text-xs mt-2 flex items-center justify-center gap-1">
            Készült a csillagok között <Rocket className="w-3 h-3" />
          </p>
        </div>
      </footer>
    </div>
  );
}
