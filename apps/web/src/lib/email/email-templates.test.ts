import { describe, it, expect } from "vitest";
import { renderCustomerAcknowledgementEmail } from "./templates/customer-acknowledgement";
import { renderAdminNewEnquiryEmail } from "./templates/admin-new-enquiry";
import { renderEnquiryResponseEmail } from "./templates/enquiry-response";
import { renderEnquiryStatusUpdateEmail } from "./templates/enquiry-status-update";

describe("Transactional Email Templates (Quiet Luxury Editorial)", () => {
  it("renders customer acknowledgement template with tracking reference and brand palette", () => {
    const rendered = renderCustomerAcknowledgementEmail({
      customerName: "Julian Vance",
      referenceNumber: "ENQ-2026-10001",
      gemstoneInterest: "Commercial-Quality Rough Hessonite Garnet",
      companyName: "Vance Lapidary Atelier",
      quantitySpecs: "1,000 g parcel split",
      message: "Please send sieve analysis for cabochon cutting.",
    });

    expect(rendered.subject).toContain("We Have Received Your Enquiry – Libra Gems");
    expect(rendered.html).toContain("ENQ-2026-10001");
    expect(rendered.html).toContain("Julian Vance");
    expect(rendered.html).toContain("Vance Lapidary Atelier");
    expect(rendered.html).toContain("#174C38"); // Forest Green
    expect(rendered.html).toContain("#103729"); // Deep Forest
    expect(rendered.html).toContain("#B99B68"); // Champagne
    expect(rendered.text).toContain("ENQ-2026-10001");
    expect(rendered.text).toContain("Bangkok gemological trading desk");
  });

  it("renders internal admin alert with customer requirements and dashboard link", () => {
    const rendered = renderAdminNewEnquiryEmail({
      enquiryId: "uuid-1234",
      referenceNumber: "ENQ-2026-10001",
      customerName: "Julian Vance",
      companyName: "Vance Lapidary",
      email: "j.vance@vancegems.co.uk",
      phone: "+44 20 7946 0912",
      country: "United Kingdom",
      gemstoneInterest: "Rough Hessonite Garnet",
      quantitySpecs: "1,000 g",
      message: "Inquiry on parcel split",
      priority: "high",
      sourcePage: "/catalogue/hessonite-garnet",
      createdAt: new Date().toISOString(),
    });

    expect(rendered.subject).toContain("[New Trade Enquiry] ENQ-2026-10001 – Rough Hessonite Garnet");
    expect(rendered.html).toContain("Julian Vance");
    expect(rendered.html).toContain("j.vance@vancegems.co.uk");
    expect(rendered.html).toContain("/admin/enquiries/uuid-1234");
    expect(rendered.text).toContain("NEW B2B TRADE ENQUIRY: ENQ-2026-10001");
  });

  it("renders official admin response with trading desk sign-off", () => {
    const rendered = renderEnquiryResponseEmail({
      customerName: "Elena Rostova",
      referenceNumber: "ENQ-2026-10002",
      gemstoneInterest: "Commercial Turquoise",
      responseMessage: "We have inspected the turquoise slabs and prepared high-res video captures.",
      adminName: "Somchai Prasert",
      adminTitle: "Senior Gemologist",
    });

    expect(rendered.subject).toContain("Re: Your Libra Gems Enquiry – ENQ-2026-10002");
    expect(rendered.html).toContain("Somchai Prasert");
    expect(rendered.html).toContain("Senior Gemologist");
    expect(rendered.html).toContain("We have inspected the turquoise slabs");
    expect(rendered.text).toContain("Somchai Prasert");
  });

  it("renders status update email with new status badge and details", () => {
    const rendered = renderEnquiryStatusUpdateEmail({
      customerName: "Marcus Thorne",
      referenceNumber: "ENQ-2026-10003",
      gemstoneInterest: "Afghanistan Rubellite",
      newStatus: "qualified",
      updateDetails: "Lotus Gemology origin memo has been completed and verified.",
    });

    expect(rendered.subject).toContain("Status Update on your Enquiry – ENQ-2026-10003");
    expect(rendered.html).toContain("QUALIFIED");
    expect(rendered.html).toContain("Lotus Gemology origin memo");
    expect(rendered.text).toContain("New Status: QUALIFIED");
  });
});
