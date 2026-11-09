import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { EnquiryForm } from "./enquiry-form";

describe("<EnquiryForm />", () => {
  it("renders all required form fields", () => {
    render(<EnquiryForm />);

    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Business Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Gemstone of Interest/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Trade Requirements/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/agree to the processing of my business contact data/i)).toBeInTheDocument();
  });

  it("validates empty submission and prevents submission when invalid", () => {
    render(<EnquiryForm />);

    const submitButton = screen.getByRole("button", { name: /Submit Trade Inquiry/i });
    fireEvent.click(submitButton);

    expect(screen.getByText(/Please enter your full name/i)).toBeInTheDocument();
    expect(screen.getByText(/Please enter a valid commercial email address/i)).toBeInTheDocument();
    expect(screen.getByText(/Please select a material of interest/i)).toBeInTheDocument();
  });

  it("completes validation when valid inputs are supplied", async () => {
    render(<EnquiryForm />);

    fireEvent.change(screen.getByLabelText(/Full Name/i), {
      target: { value: "Heinrich Schmidt" },
    });
    fireEvent.change(screen.getByLabelText(/Business Email/i), {
      target: { value: "h.schmidt@gemstones-munich.de" },
    });
    fireEvent.change(screen.getByLabelText(/Gemstone of Interest/i), {
      target: { value: "Rough Hessonite Garnet (LG-HG-001)" },
    });
    fireEvent.change(screen.getByLabelText(/Trade Requirements/i), {
      target: { value: "Interested in a 1,000g parcel split with 12mm+ average sieve." },
    });
    fireEvent.click(screen.getByLabelText(/agree to the processing of my business contact data/i));

    const submitButton = screen.getByRole("button", { name: /Submit Trade Inquiry/i });
    fireEvent.click(submitButton);

    // After timeout, confirmation banner appears
    const confirmation = await screen.findByText(/Client Validation Complete/i);
    expect(confirmation).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Dispatch via Direct Email Now/i })).toBeInTheDocument();
  });
});
