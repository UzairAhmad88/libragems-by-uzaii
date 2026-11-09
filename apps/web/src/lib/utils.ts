import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names and resolves Tailwind CSS class conflicts.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/**
 * Sanitizes phone numbers into E.164 international format (digits only).
 * Defaulting to Thailand (+66) country code if local leading zero is present.
 */
export function formatWhatsAppNumber(phone: string, defaultCountryCode = "66"): string {
  // Strip all non-digit characters
  const digits = phone.replace(/\D/g, "");

  // If starts with leading zero (e.g. 0846674833 in Thailand), strip zero and prefix country code
  if (digits.startsWith("0")) {
    return `${defaultCountryCode}${digits.slice(1)}`;
  }

  // If already starts with country code without plus (e.g. 66846674833)
  if (digits.startsWith(defaultCountryCode)) {
    return digits;
  }

  return digits;
}

/**
 * Generates an accessible, URI-encoded WhatsApp deep link with contextual enquiry message.
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const cleanNumber = formatWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}
