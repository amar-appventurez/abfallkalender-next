import { getRequestConfig } from "next-intl/server";
import { headers } from "next/headers";

export default getRequestConfig(async () => {
  const reqHeaders = headers();
  let locale = reqHeaders.get("x-locale") || "en";
  const acceptLanguage = reqHeaders.get("accept-language");

  if (acceptLanguage) {
    locale = acceptLanguage.split(",")[0] || "en";
  }

  //   console.log('locale ---', locale);
  let messages;
  try {
    // Try to load messages for the requested locale
    messages = (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    // Fallback to English if the requested locale messages are not available
    messages = (await import(`../messages/en.json`)).default;
  }

  return {
    locale,
    messages
  };
});
