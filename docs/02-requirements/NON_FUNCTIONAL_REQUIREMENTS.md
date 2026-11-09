# Non-Functional Requirements

## Performance
- Optimize images using responsive formats and dimensions.
- Avoid loading large media unnecessarily.
- Minimize client-side JavaScript.
- Measure Core Web Vitals on representative mobile devices.
- Set performance budgets after the first baseline measurement.

## Accessibility
- Semantic HTML and logical heading hierarchy.
- Keyboard-accessible navigation and forms.
- Visible focus states.
- Sufficient text/background contrast.
- Descriptive alt text for meaningful product images.
- Respect reduced-motion preferences.

## Security
- Secrets stored only in environment variables.
- Server-side validation for all form submissions.
- Row Level Security for Supabase tables.
- Admin-only authorization for management operations.
- Rate limiting and anti-spam controls.
- Safe file type/size validation for image uploads.
- Avoid exposing service-role keys in browser code.

## Reliability and maintainability
- Reusable components and typed data models.
- Consistent error and loading states.
- Automated lint, typecheck and tests.
- Documented setup, deployment and backup procedures.

## SEO
- Crawlable HTML content and internal links.
- Unique metadata and canonical URLs.
- Valid sitemap and robots.txt.
- Structured data only when it accurately represents page content.
- No keyword stuffing or doorway pages.
