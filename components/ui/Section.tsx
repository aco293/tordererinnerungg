import type { ReactNode } from "react";

type SectionProps = {
  children: ReactNode;
  id?: string;
  className?: string;
  /** Inneren Breiten-Container deaktivieren, z. B. für volle Hero-Breite. */
  bare?: boolean;
  "aria-label"?: string;
  "aria-labelledby"?: string;
};

export function Section({
  children,
  id,
  className = "",
  bare = false,
  ...aria
}: SectionProps) {
  return (
    <section
      id={id}
      className={`relative py-24 sm:py-28 ${className}`}
      {...aria}
    >
      {bare ? (
        children
      ) : (
        <div className="mx-auto w-full max-w-6xl px-6 sm:px-8">{children}</div>
      )}
    </section>
  );
}
