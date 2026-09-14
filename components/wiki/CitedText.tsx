import type { ReactNode } from "react";

type CitedTextProps = {
  text: string;
};

export default function CitedText({ text }: CitedTextProps) {
  const parts = text.split(/(\[\d+\])/g);
  const nodes: ReactNode[] = parts.map((part, index) => {
    const match = part.match(/^\[(\d+)\]$/);
    if (!match) return part;
    const n = match[1];
    return (
      <a
        key={`${n}-${index}`}
        href={`#cite-${n}`}
        className="font-sans text-[0.8em] font-semibold text-sensing no-underline hover:underline"
      >
        [{n}]
      </a>
    );
  });
  return <>{nodes}</>;
}
