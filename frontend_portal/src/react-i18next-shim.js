let mod;
try {
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  mod = require("react-i18next");
} catch (e) {
  const noop = () => {};
  const Hook = () => ({ t: (k, vars) => (vars ? String(k) : String(k)), i18n: { changeLanguage: noop } });
  mod = {
    initReactI18next: {},
    useTranslation: Hook,
    Trans: ({ children }) => children,
    I18nextProvider: ({ children }) => children,
    withTranslation: () => (C) => C
  };
}
module.exports = mod;
