# Functional Requirements

Priority: P0 = launch critical, P1 = important, P2 = future enhancement.

| ID | Priority | Requirement | Acceptance condition |
|---|---|---|---|
| FR-01 | P0 | Public visitors can navigate all public pages | Navigation works on mobile and desktop |
| FR-02 | P0 | Homepage presents company and featured gemstones | Clear product and contact calls to action |
| FR-03 | P0 | Catalogue lists active products | Archived products are not shown publicly |
| FR-04 | P0 | Each gemstone has a dedicated URL | Unique page, title, description and content |
| FR-05 | P0 | Product detail shows approved facts and images | No fabricated specifications |
| FR-06 | P0 | Product-specific WhatsApp CTA | Opens correct WhatsApp destination and prefilled text |
| FR-07 | P0 | Contact form accepts enquiries | Server-side validation and clear success/error state |
| FR-08 | P0 | Enquiries are stored securely | Record can be viewed by authorized admin |
| FR-09 | P0 | Business receives email notification | End-to-end delivery test passes |
| FR-10 | P0 | Admin authentication | Unauthenticated users cannot access admin |
| FR-11 | P1 | Admin manages products | Create, edit, publish/unpublish and archive |
| FR-12 | P1 | Admin manages product images | Upload, reorder, replace and delete with safeguards |
| FR-13 | P1 | Admin manages enquiries | View details and update status |
| FR-14 | P0 | SEO metadata is configurable | Correct metadata appears in rendered HTML |
| FR-15 | P0 | XML sitemap and robots.txt exist | Correct production URLs and crawl rules |
| FR-16 | P1 | Blog content can be published | Article pages have metadata and internal links |
| FR-17 | P1 | Analytics can be enabled | Consent/privacy requirements are reviewed |
| FR-18 | P1 | Site has privacy and terms pages | Approved legal copy is published |

## Enquiry form fields
- Name (required)
- Email (required)
- Company (optional)
- Country (optional)
- Gemstone of interest (optional or preselected from product page)
- Quantity / required specifications (optional)
- Message (required)
- Privacy acknowledgement (required if legally appropriate)

Do not request unnecessary personal information. Add server-side validation, rate limiting, spam protection and safe error handling.
