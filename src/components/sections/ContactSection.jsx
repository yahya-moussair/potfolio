import { useState, useRef, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { HiMail, HiExternalLink } from "react-icons/hi";
import { HiPaperAirplane, HiCheck } from "react-icons/hi";
import { HiExclamationCircle } from "react-icons/hi2";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { clipReveal, staggerContainer } from "@/data/animations";
import SectionTitle from "@/components/SectionTitle";

void motion;

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

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || import.meta.env.REACT_APP_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || import.meta.env.REACT_APP_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || import.meta.env.REACT_APP_EMAILJS_PUBLIC_KEY;

const Spinner = () => (
  <span
    style={{
      width: 14,
      height: 14,
      border: "2px solid rgba(255,255,255,0.3)",
      borderTop: "2px solid white",
      borderRadius: "50%",
      display: "inline-block",
      animation: "spin 0.7s linear infinite",
    }}
  />
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState("idle");
  // 'idle' | 'loading' | 'success' | 'error'

  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn("EmailJS: missing environment variable");
    }
    if (PUBLIC_KEY) {
      emailjs.init(PUBLIC_KEY);
    }
  }, []);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const resetStatusToIdle = () => {
    setTimeout(() => setStatus("idle"), 5000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setStatus("error");
      resetStatusToIdle();
      return;
    }
    if (!isValidEmail(formData.email)) {
      setStatus("error");
      resetStatusToIdle();
      return;
    }
    if (!formData.message.trim()) {
      setStatus("error");
      resetStatusToIdle();
      return;
    }

    if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
      console.warn("EmailJS: missing environment variable");
      setStatus("error");
      resetStatusToIdle();
      return;
    }

    setStatus("loading");

    const templateParams = {
      from_name: formData.name,
      from_email: formData.email,
      subject: formData.subject,
      message: formData.message,
      reply_to: formData.email,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        PUBLIC_KEY
      );

      setStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
      resetStatusToIdle();
    } catch (error) {
      console.error("EmailJS error:", error);
      setStatus("error");
      resetStatusToIdle();
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-32 px-6 relative"
      style={{ background: "var(--color-bg)" }}
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
                  <FloatingInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  <FloatingInput
                    label="Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <FloatingInput
                  label="Subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                <FloatingTextarea
                  label="Message"
                  rows={5}
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full btn-shimmer"
                  style={{
                    background:
                      status === "success"
                        ? "var(--color-success)"
                        : status === "error"
                          ? "#ef4444"
                          : "var(--color-accent)",
                    color: status === "idle" ? "#0a0a0a" : "#ffffff",
                    transition: "all 0.3s ease",
                    opacity: status === "loading" ? 0.75 : 1,
                    cursor: status === "loading" ? "not-allowed" : "pointer",
                    width: "100%",
                    border: "none",
                    borderRadius: "0.75rem",
                    padding: "0.75rem 1rem",
                    fontSize: "0.95rem",
                    fontWeight: 600,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                  }}
                >
                  {status === "idle" && (
                    <>
                      <HiPaperAirplane size={18} />
                      Send Message
                    </>
                  )}
                  {status === "loading" && (
                    <>
                      <Spinner />
                      Sending...
                    </>
                  )}
                  {status === "success" && (
                    <>
                      <HiCheck size={18} />
                      Message Sent!
                    </>
                  )}
                  {status === "error" && (
                    <>
                      <HiExclamationCircle size={18} />
                      Failed. Try again
                    </>
                  )}
                </button>

                {status === "success" && (
                  <p
                    style={{
                      color: "var(--color-success)",
                      fontSize: "13px",
                      marginTop: "8px",
                      animation: "fadeUp 0.4s ease forwards",
                    }}
                  >
                    ✓ Your message was sent! I&apos;ll get back to you soon.
                  </p>
                )}

                {status === "error" && (
                  <p
                    style={{
                      color: "#ef4444",
                      fontSize: "13px",
                      marginTop: "8px",
                      animation: "fadeUp 0.4s ease forwards",
                    }}
                  >
                    ✗ Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </Card>
          </motion.div>
        </motion.div>
      </div>
      <style>
        {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(8px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}
      </style>
    </section>
  );
}
