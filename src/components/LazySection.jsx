import { Suspense } from "react";
import { useLazySection } from "@/hooks/hooks";

function SectionSkeleton() {
  return (
    <div className="w-full py-32 flex items-center justify-center">
      <div className="flex flex-col gap-4 w-full max-w-2xl px-8 animate-pulse">
        <div
          className="h-4 rounded-full w-1/4"
          style={{ background: "var(--color-border)" }}
        />
        <div
          className="h-8 rounded-full w-2/3"
          style={{ background: "var(--color-border)" }}
        />
        <div
          className="h-4 rounded-full w-full"
          style={{ background: "var(--color-border)" }}
        />
        <div
          className="h-4 rounded-full w-5/6"
          style={{ background: "var(--color-border)" }}
        />
      </div>
    </div>
  );
}

export default function LazySection({ children, minHeight = "100vh" }) {
  const { ref, isVisible } = useLazySection();

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : minHeight }}>
      {isVisible ? (
        <Suspense fallback={<SectionSkeleton />}>
          {children}
        </Suspense>
      ) : (
        <SectionSkeleton />
      )}
    </div>
  );
}
