/**
 * Centralized Contact & Commercial Communications Configuration
 * Libra Gems & Trading Co., Ltd.
 */

export const CONTACT_CONFIG = {
  tradingOffice: {
    name: "Libra Gems & Trading Co., Ltd.",
    addressLine1: "1394 Charoen Krung Road, Bang Rak",
    city: "Bangkok",
    postalCode: "10500",
    country: "Thailand",
    district: "Bang Rak Gem Trading District",
  },
  email: {
    corporate: "info@libragems.net",
    enquiries: "info@libragems.net",
  },
  telephone: {
    bangkokLandline: "+66 2 238 1934",
    bangkokLandlineRaw: "6622381934",
  },
  whatsapp: {
    /**
     * Primary verified Bangkok Trading Desk mobile number.
     * Centralized phone number: +66 84 667 4833 (digits: 66846674833)
     * Environment override supported via NEXT_PUBLIC_WHATSAPP_NUMBER or WHATSAPP_PRIMARY_NUMBER.
     */
    primaryNumber:
      process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ||
      process.env.WHATSAPP_PRIMARY_NUMBER ||
      "+66 84 667 4833",
    displayNumber: "+66 84 667 4833",
    cleanNumber: "66846674833",
    defaultPrefilledMessage:
      "Hello Libra Gems & Trading Co., I am interested in your gemstones and would like to know more about your available collection.",
  },
} as const;

