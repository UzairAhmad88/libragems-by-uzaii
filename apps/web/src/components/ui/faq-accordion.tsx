"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface FaqItem {
  question: string;
  answer: string;
}

export interface FaqAccordionProps {
  items: FaqItem[];
  className?: string;
}

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const [openIndexes, setOpenIndexes] = React.useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  return (
    <div className={cn("divide-y divide-border border-y border-border", className)}>
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const buttonId = `faq-btn-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={index} className="py-4">
            <h3>
              <button
                id={buttonId}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleItem(index)}
                className="flex w-full items-center justify-between gap-4 text-left font-serif text-lg font-medium text-forest-deep transition-colors hover:text-forest focus-visible:outline-champagne"
              >
                <span>{item.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-stone transition-transform duration-200",
                    isOpen && "rotate-180 text-forest"
                  )}
                  aria-hidden="true"
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn("mt-3 pr-8 text-sm leading-relaxed text-stone", !isOpen && "hidden")}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
