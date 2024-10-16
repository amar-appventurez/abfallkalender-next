import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const reqHeaders = headers();
  let locale = reqHeaders.get("x-locale") || "en";
  const acceptLanguage = reqHeaders.get("accept-language");

  if (acceptLanguage) {
    locale = acceptLanguage.split(",")[0] || "en";
  }

  // Normalize the locale to handle language variants
  const baseLocale = locale.split("-")[0];

  // Map any variant of a language to its corresponding file
  const localeMap = {
    tr: 'tr',  // Turkish variants
    en: 'en',  // English variants
    fr: 'fr',  // French variants
    de: 'de',  //German variants
    ar: 'ar'
    // Add more languages as needed
  };

  // Use the mapped locale or fall back to 'en'
  const normalizedLocale = localeMap[baseLocale] || 'en';

  let messages;
  try {
    messages = (await import(`../messages/${normalizedLocale}.json`)).default;
  } catch (error) {
    // Fallback to 'en' if locale-specific messages are not found
    messages = (await import(`../messages/en.json`)).default;
  }

  return {
    locale: normalizedLocale,
    messages,
  };
});
