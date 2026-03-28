"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    // No dividers, no rounded corners. Tonal rows + 0.5px gold left-border on active.
    <div className="space-y-1">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className={`px-8 py-5 transition-colors duration-150 ${
              isOpen
                ? "bg-surface-container-lowest border-l-[0.5px] border-tertiary"
                : "bg-surface-container-low"
            }`}
          >
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 text-left"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
            >
              <span className="font-display text-title-sm font-medium text-on-surface">
                {item.question}
              </span>
              {/* Gold accent on active toggle */}
              <span className={`font-sans text-label-md ${isOpen ? "text-tertiary" : "text-outline-variant"}`}>
                {isOpen ? "−" : "+"}
              </span>
            </button>
            {isOpen ? (
              <p className="mt-3 font-sans text-title-sm text-on-surface-variant">
                {item.answer}
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
