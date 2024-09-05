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

  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    locale,
    messages
  };
});
