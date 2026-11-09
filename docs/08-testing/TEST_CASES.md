# Test Case Register

| ID | Scenario | Expected result |
|---|---|---|
| TC-01 | Open homepage on mobile | Layout fits viewport and navigation works |
| TC-02 | Open each product URL | Correct product content and metadata render |
| TC-03 | Product has no optional origin | Origin is omitted or clearly marked unknown |
| TC-04 | Submit valid enquiry | Enquiry saved and confirmation shown |
| TC-05 | Submit invalid email | Server rejects and shows useful error |
| TC-06 | Submit spam/rate-limited requests | Request is blocked safely |
| TC-07 | Click WhatsApp CTA | Correct confirmed number and message open |
| TC-08 | Anonymous user opens admin route | Access denied or redirected |
| TC-09 | Admin publishes product | Product becomes publicly visible |
| TC-10 | Admin archives product | Product no longer appears publicly |
| TC-11 | Inspect sitemap | Only canonical public URLs included |
| TC-12 | Inspect page metadata | Unique title, description and canonical |
| TC-13 | Keyboard navigate page | Focus order is logical and visible |
| TC-14 | Upload unsupported file | Upload rejected |
| TC-15 | Check browser console | No critical runtime errors |
