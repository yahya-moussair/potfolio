import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { NAV_LINKS } from "@/data/data";
import { useActiveSection } from "@/hooks/hooks";
import logo from "@/assets/me/logo.png";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = useCallback((link) => {
    setMobileOpen(false);
    document.getElementById(link.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: scrolled ? "rgba(10, 10, 10, 0.85)" : "transparent",
        backdropFilter: scrolled ? "blur(24px) saturate(1.5)" : "none",
        borderBottom: scrolled
          ? "1px solid rgba(170, 255, 0, 0.08)"
          : "1px solid transparent",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 h-18 flex items-center justify-between">
        <motion.a
          href="#"
          className="block"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        >
          <img src={logo} alt="YM Logo" className="h-10 w-auto" />
        </motion.a>

        <div className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive = active === link.toLowerCase();
            return (
              <button
                key={link}
                type="button"
                onClick={() => handleNavClick(link)}
                className={`nav-link-underline px-4 py-2 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? "accent-glow" : ""}`}
                style={{
                  color: isActive
                    ? "var(--color-accent)"
                    : "var(--color-text-muted)",
                  background: isActive
                    ? "rgba(170, 255, 0, 0.06)"
                    : "transparent",
                }}
              >
                {link}
              </button>
            );
          })}

          <div
            className="ml-4 flex items-center gap-2 px-3 py-1.5 rounded-full"
            style={{ border: "1px solid var(--color-border)" }}
          >
            <span
              className="w-2 h-2 rounded-full animate-pulse"
              style={{
                background: "var(--color-success)",
                boxShadow: "0 0 8px var(--color-success)",
              }}
            />
            <span
              className="text-xs font-medium tracking-wider uppercase"
              style={{ color: "var(--color-success)" }}
            >
              Available
            </span>
          </div>
        </div>

        <button
          type="button"
          className="md:hidden p-2 cursor-pointer"
          style={{ color: "var(--color-text-primary)" }}
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle navigation menu"
        >
          <AnimatePresence mode="wait">
            {mobileOpen ? (
              <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div key="m" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden"
            style={{
              background: "rgba(10, 10, 10, 0.97)",
              backdropFilter: "blur(24px)",
              borderBottom: "1px solid var(--color-border)",
            }}
          >
            <div className="px-6 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link, i) => {
                const isActive = active === link.toLowerCase();
                return (
                  <motion.button
                    key={link}
                    type="button"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => handleNavClick(link)}
                    className={`text-left px-4 py-3 rounded-lg text-sm font-medium transition-all cursor-pointer ${isActive ? "accent-glow" : ""}`}
                    style={{
                      color: isActive
                        ? "var(--color-accent)"
                        : "var(--color-text-muted)",
                      background: isActive
                        ? "rgba(170, 255, 0, 0.06)"
                        : "transparent",
                    }}
                  >
                    {link}
                  </motion.button>
                );
              })}
              <div className="flex items-center gap-2 px-4 py-3">
                <span
                  className="w-2 h-2 rounded-full animate-pulse"
                  style={{
                    background: "var(--color-success)",
                    boxShadow: "0 0 8px var(--color-success)",
                  }}
                />
                <span
                  className="text-xs font-medium tracking-wider uppercase"
                  style={{ color: "var(--color-success)" }}
                >
                  Available for hire
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
