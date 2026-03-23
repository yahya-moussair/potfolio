import { Github, Linkedin, Twitter, Mail } from "lucide-react";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Mail, href: "mailto:yahya@example.com", label: "Email" },
];

export default function Footer() {
  return (
    <footer
      className="py-12 px-6 relative overflow-hidden"
      style={{
        background: "var(--color-bg)",
        borderTop: "1px solid var(--color-border)",
      }}
    >
      <span
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-bold uppercase pointer-events-none select-none whitespace-nowrap"
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(4rem, 15vw, 12rem)",
          color: "var(--color-accent)",
          opacity: 0.02,
          letterSpacing: "0.15em",
        }}
      >
        YAHYA
      </span>

      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        <div className="flex flex-col items-center md:items-start gap-1">
          <p
            className="text-sm font-medium"
            style={{ color: "var(--color-text-muted)" }}
          >
            &copy; {new Date().getFullYear()} Yahya Dev
          </p>
          <p
            className="text-xs"
            style={{ color: "var(--color-text-muted)", opacity: 0.6 }}
          >
            Built with React & ☕
          </p>
        </div>

        <div className="flex items-center gap-3">
          {SOCIAL_LINKS.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2.5 rounded-xl transition-all duration-300"
              style={{
                color: "var(--color-text-muted)",
                border: "1px solid transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--color-accent)";
                e.currentTarget.style.background = "rgba(170, 255, 0, 0.06)";
                e.currentTarget.style.borderColor = "rgba(170, 255, 0, 0.15)";
                e.currentTarget.style.transform = "translateY(-2px)";
                e.currentTarget.style.boxShadow = "0 4px 12px var(--color-accent-glow)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--color-text-muted)";
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "transparent";
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "none";
              }}
              aria-label={social.label}
            >
              <social.icon size={18} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
