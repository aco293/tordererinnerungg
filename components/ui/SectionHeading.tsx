import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
  as?: "h1" | "h2" | "h3";
  id?: string;
};

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "center",
  as: Heading = "h2",
  id,
}: SectionHeadingProps) {
  const alignment = align === "center" ? "text-center mx-auto" : "text-left";

  return (
    <div className={`max-w-2xl ${alignment}`}>
      {eyebrow && (
        <p className="mb-4 text-xs font-medium uppercase tracking-[0.35em] text-gold/70">
          {eyebrow}
        </p>
      )}
      <Heading
        id={id}
        className="font-serif text-3xl font-light leading-tight text-white sm:text-4xl md:text-5xl"
      >
        {title}
      </Heading>
      {children && (
        <div className="mt-6 text-base leading-relaxed text-slate-300/80 sm:text-lg">
          {children}
        </div>
      )}
    </div>
  );
}
