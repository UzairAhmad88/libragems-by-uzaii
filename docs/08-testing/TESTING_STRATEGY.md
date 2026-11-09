# Testing Strategy

## Unit tests
- Utility functions and validation.
- Product formatting and metadata generation.
- WhatsApp message construction.
- Enquiry validation.

## Integration tests
- Enquiry persistence.
- Email provider integration (use test mode).
- Supabase policies.
- Admin product mutations.
- Image upload validation.

## End-to-end tests
- Visitor navigates to each product.
- Visitor submits valid and invalid enquiries.
- WhatsApp link contains the correct product context.
- Admin signs in and manages products.
- Unauthenticated visitor cannot access admin data.

## Manual QA
- Mobile navigation and layouts.
- Keyboard-only operation.
- Screen reader labels.
- Image loading and gallery.
- Browser compatibility.
- Contact details and external links.

## SEO QA
- Titles and descriptions.
- Canonical URLs.
- Sitemap and robots.
- Structured data validation.
- Indexability and HTTP status.
- Broken links and image alt text.

## Release blockers
Any broken enquiry flow, unauthorized admin access, exposed secret, false product claim, critical mobile issue or indexing blocker prevents launch.
