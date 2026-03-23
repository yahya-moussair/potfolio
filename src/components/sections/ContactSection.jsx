import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail, HiExternalLink } from "react-icons/hi";
import { HiPaperAirplane } from "react-icons/hi";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { HiCheckCircle } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clipReveal, staggerContainer } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

function FloatingInput({ label, type = "text", ...props }) {
  return (
    <div className="floating-label-group">
      <Input type={type} placeholder=" " {...props} />
      <label>{label}</label>
    </div>
  );
}

function FloatingTextarea({ label, ...props }) {
  return (
    <div className="floating-label-group is-textarea">
      <Textarea placeholder=" " {...props} />
      <label>{label}</label>
    </div>
  );
}

const CONTACT_LINKS = [
  { icon: HiMail, label: "yahya@example.com", href: "mailto:yahya@example.com" },
  { icon: FaGithub, label: "github.com/yahya-dev", href: "https://github.com" },
  { icon: FaLinkedin, label: "linkedin.com/in/yahya", href: "https://linkedin.com" },
  { icon: FaTwitter, label: "@yahya_dev", href: "https://twitter.com" },
];

export default function ContactSection() {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSent(true);
      setTimeout(() => setSent(false), 3000);
    }, 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-surface)" }}
    >
      <div className="max-w-6xl mx-auto">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or just want to chat? I'd love to hear from you."
          ghostWord="CONTACT"
        />
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid md:grid-cols-2 gap-14"
        >
          <motion.div variants={clipReveal}>
            <h3
              className="text-xl font-bold mb-6 tracking-tight"
              style={{
                fontFamily: "var(--font-display)",
                color: "var(--color-text-primary)",
              }}
            >
              Let&apos;s connect
            </h3>
            <p
              className="text-sm leading-relaxed mb-10 tracking-normal"
              style={{ color: "var(--color-text-muted)" }}
            >
              I&apos;m always open to new opportunities, collaborations, and
              interesting conversations. Whether you have a project idea or just
              want to say hello — my inbox is always open.
            </p>

            <div className="space-y-4">
              {CONTACT_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-border)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-accent)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 20px var(--color-accent-glow)";
                    e.currentTarget.style.transform = "translateX(4px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-border)";
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <div
                    className="p-2.5 rounded-lg"
                    style={{
                      background: "rgba(170, 255, 0, 0.06)",
                      border: "1px solid rgba(170, 255, 0, 0.1)",
                    }}
                  >
                    <link.icon size={18} style={{ color: "var(--color-accent)" }} />
                  </div>
                  <span
                    className="text-sm font-medium"
                    style={{ color: "var(--color-text-primary)" }}
                  >
                    {link.label}
                  </span>
                  <HiExternalLink
                    size={14}
                    className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                    style={{ color: "var(--color-accent)" }}
                  />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div variants={clipReveal}>
            <Card
              className="p-7 border-glow"
              style={{ background: "var(--color-bg)" }}
            >
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <FloatingInput label="Name" required />
                  <FloatingInput label="Email" type="email" required />
                </div>
                <FloatingInput label="Subject" required />
                <FloatingTextarea label="Message" rows={5} required />
                <Button
                  type="submit"
                  size="lg"
                  className="w-full btn-shimmer"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <AiOutlineLoading3Quarters size={18} className="mr-2 animate-spin" />
                      Sending...
                    </>
                  ) : sent ? (
                    <>
                      <HiCheckCircle size={18} className="mr-2" />
                      Message Sent!
                    </>
                  ) : (
                    <>
                      <HiPaperAirplane size={18} className="mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
