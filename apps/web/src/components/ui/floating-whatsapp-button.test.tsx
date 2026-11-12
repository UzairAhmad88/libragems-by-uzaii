import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { FloatingWhatsAppButton } from "./floating-whatsapp-button";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("<FloatingWhatsAppButton />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders floating button on public pages with correct WhatsApp URL and attributes", () => {
    mockUsePathname.mockReturnValue("/");

    render(<FloatingWhatsAppButton />);

    const link = screen.getByRole("link", { name: /contact libra gems on whatsapp/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");

    const href = link.getAttribute("href");
    expect(href).toContain("https://wa.me/66846674833");
    expect(href).toContain("Hello%20Libra%20Gems%20%26%20Trading%20Co.");

    // Desktop hover tooltip
    expect(screen.getByText("Chat with us on WhatsApp")).toBeInTheDocument();
  });

  it("does not render on admin dashboard pages", () => {
    mockUsePathname.mockReturnValue("/admin/dashboard");

    const { container } = render(<FloatingWhatsAppButton />);
    expect(container).toBeEmptyDOMElement();
  });

  it("does not render on admin login page", () => {
    mockUsePathname.mockReturnValue("/admin/login");

    const { container } = render(<FloatingWhatsAppButton />);
    expect(container).toBeEmptyDOMElement();
  });
});

