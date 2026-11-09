import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Breadcrumbs } from "./breadcrumbs";

describe("<Breadcrumbs />", () => {
  it("renders navigational breadcrumb links and current page", () => {
    const items = [
      { label: "Home", href: "/" },
      { label: "Gemstones", href: "/gemstones" },
      { label: "Rough Hessonite Garnet" },
    ];

    render(<Breadcrumbs items={items} />);

    expect(screen.getByRole("navigation", { name: /breadcrumb/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Gemstones" })).toHaveAttribute("href", "/gemstones");
    
    const currentPage = screen.getByText("Rough Hessonite Garnet");
    expect(currentPage).toHaveAttribute("aria-current", "page");
  });
});
