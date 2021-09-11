import React, { Fragment } from "react";
import { IntlProvider, createIntl, createIntlCache, } from "react-intl";

import { LOCALES } from "./locales";
import messages from "./messages";

const cache = createIntlCache();
const locale = localStorage.langCity;
export const intl = createIntl({
  locale: locale,
  messages: messages[locale]
}, cache);

const Provider = ({ children, locale = LOCALES.ENGLISH }) => (
  <IntlProvider
    locale={locale}
    textComponent={Fragment}
    messages={messages[locale]}
  >
    {children}
  </IntlProvider>
);
export default Provider;
