let i18n;
try {
  // Attempt to load the real dependency (should exist after CI install)
  // eslint-disable-next-line import/no-extraneous-dependencies, global-require
  i18n = require("i18next");
} catch (e) {
  // Lightweight shim to satisfy bundler resolution if i18next is not yet installed in CI cache
  i18n = {
    use() { return this; },
    init() { return this; }
  };
}
module.exports = i18n;
