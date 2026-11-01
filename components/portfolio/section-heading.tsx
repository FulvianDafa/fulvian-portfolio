import type { ReactNode } from "react";

export function SectionHeading({
  number,
  label,
  id,
  children,
  description,
}: {
  number: string;
  label: string;
  id: string;
  children: ReactNode;
  description?: string;
}) {
  return (
    <div className="section-heading" data-reveal>
      <div>
        <p className="eyebrow">
          {number} / {label}
        </p>
        <h2 id={id}>{children}</h2>
      </div>
      {description && <p>{description}</p>}
    </div>
  );
}
