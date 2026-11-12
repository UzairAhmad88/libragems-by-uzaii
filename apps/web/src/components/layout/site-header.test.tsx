import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { SiteHeader } from "./site-header";

const mockUsePathname = vi.fn();

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
}));

describe("<SiteHeader />", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUsePathname.mockReturnValue("/");
  });

  it("renders the header with off-white background and brand logo", () => {
    const { container } = render(<SiteHeader />);

    const header = container.querySelector("header");
    expect(header).toBeInTheDocument();
    expect(header).toHaveClass("bg-[#F5F3EB]");
    expect(header).toHaveClass("border-[#E5E3D9]");

    const logo = screen.getByLabelText(/libragems homepage/i);
    expect(logo).toBeInTheDocument();
    expect(screen.getByText("LibraGems")).toHaveClass("text-[#173D30]");
    expect(screen.getByText(/bangkok • est\. thailand/i)).toBeInTheDocument();
  });

  it("renders all navigation links with high contrast styling", () => {
    render(<SiteHeader />);

    const nav = screen.getByRole("navigation", { name: /main navigation/i });
    expect(nav).toBeInTheDocument();

    const expectedLinks = [
      { text: "About", href: "/about" },
      { text: "Gemstones", href: "/gemstones" },
      { text: "Quality & Sourcing", href: "/quality-sourcing" },
      { text: "Insights", href: "/insights" },
      { text: "Contact", href: "/contact" },
    ];

    for (const item of expectedLinks) {
      const link = screen.getAllByRole("link", { name: item.text })[0];
      expect(link).toHaveAttribute("href", item.href);
      expect(link).toHaveClass("text-[#173D30]");
    }
  });

  it("highlights the active page", () => {
    mockUsePathname.mockReturnValue("/gemstones");

    render(<SiteHeader />);

    const gemstonesLinks = screen.getAllByRole("link", { name: "Gemstones" });
    const desktopLink = gemstonesLinks[0];
    expect(desktopLink).toHaveAttribute("aria-current", "page");
  });

  it("renders the Enquire on Lots CTA button", () => {
    render(<SiteHeader />);

    const cta = screen.getAllByRole("link", { name: /enquire on lots/i })[0];
    expect(cta).toBeInTheDocument();
    expect(cta).toHaveAttribute("href", "/contact");
    expect(cta).toHaveClass("bg-[#C5A66A]");
    expect(cta).toHaveClass("text-[#173D30]");
  });

  it("supports mobile menu toggling", () => {
    render(<SiteHeader />);

    const menuButton = screen.getByRole("button", { name: /open menu/i });
    expect(menuButton).toBeInTheDocument();

    fireEvent.click(menuButton);

    const drawer = screen.getByRole("dialog", { name: /mobile navigation/i });
    expect(drawer).toBeInTheDocument();

    const closeButton = screen.getByRole("button", { name: /close navigation/i });
    expect(closeButton).toBeInTheDocument();
  });
});

