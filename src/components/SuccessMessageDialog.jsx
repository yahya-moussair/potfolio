import { HiCheck } from "react-icons/hi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";

export default function SuccessMessageDialog({
  open,
  onOpenChange,
  onConfirm,
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        style={{
          background: "var(--color-surface)",
          border: "0.5px solid var(--color-border)",
          borderRadius: "16px",
          textAlign: "center",
          padding: "40px 32px",
          maxWidth: "420px",
          color: "var(--color-text-primary)",
        }}
      >
        <DialogHeader className="items-center text-center sm:text-center">
          <div
            style={{
              width: "64px",
              height: "64px",
              borderRadius: "50%",
              background: "var(--color-bg)",
              border: "2px solid var(--color-success)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 20px",
            }}
          >
            <HiCheck size={28} style={{ color: "var(--color-success)" }} />
          </div>

          <DialogTitle
            style={{
              color: "var(--color-text-primary)",
              fontFamily: "var(--font-display)",
              fontSize: "22px",
              fontWeight: "700",
              marginBottom: "8px",
            }}
          >
            Message Sent!
          </DialogTitle>

          <DialogDescription
            style={{
              color: "var(--color-text-muted)",
              fontSize: "14px",
              lineHeight: "1.6",
              textAlign: "center",
              maxWidth: "320px",
              margin: "0 auto",
            }}
          >
            Thank you for reaching out. I&apos;ll get back to you as soon as
            possible.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter style={{ justifyContent: "center", marginTop: "24px" }}>
          <button
            onClick={onConfirm}
            style={{
              background: "var(--color-accent)",
              color: "var(--color-bg)",
              border: "none",
              borderRadius: "8px",
              padding: "10px 32px",
              fontSize: "14px",
              fontWeight: "700",
              cursor: "pointer",
              transition: "opacity 0.2s ease",
              fontFamily: "var(--font-body)",
            }}
            onMouseEnter={(e) => (e.target.style.opacity = "0.85")}
            onMouseLeave={(e) => (e.target.style.opacity = "1")}
          >
            Got it!
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
