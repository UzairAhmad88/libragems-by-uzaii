import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FaqAccordion } from "./faq-accordion";

describe("<FaqAccordion />", () => {
  const faqs = [
    {
      question: "Can this parcel be split into smaller minimum orders?",
      answer: "Yes, we accommodate wholesale splits starting from 500 grams.",
    },
    {
      question: "Can LibraGems arrange independent lab verification?",
      answer: "Certainly, we regularly submit sample selections to GIT or AIGS.",
    },
  ];

  it("renders questions and toggles answers on click", () => {
    render(<FaqAccordion items={faqs} />);

    const firstButton = screen.getByRole("button", {
      name: /Can this parcel be split into smaller minimum orders\?/i,
    });
    expect(firstButton).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText(/Yes, we accommodate wholesale splits/i)).toBeVisible();

    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute("aria-expanded", "false");
  });
});
