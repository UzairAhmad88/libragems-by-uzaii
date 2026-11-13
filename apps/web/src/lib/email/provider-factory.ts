import { EmailProvider } from "./provider";
import { defaultSmtpProvider } from "./smtp-provider";
import { ResendEmailProvider } from "./resend-provider";
import { getEmailProviderType } from "./email-config";

/**
 * Resolves the primary email delivery provider based on application configuration.
 * Defaults to Hostinger SMTP. Can be toggled to Resend via EMAIL_PROVIDER=resend.
 */
export function getActiveEmailProvider(): EmailProvider {
  const providerType = getEmailProviderType();
  if (providerType === "resend") {
    return new ResendEmailProvider();
  }
  return defaultSmtpProvider;
}

export const defaultEmailProvider: EmailProvider = getActiveEmailProvider();

