import { script } from "./script.js";

(async function () {
  // Initialize Sentry before other operations
  const sharingId = SHARING_ID;
  const sentrySrc =
    "https://browser.sentry-cdn.com/7.69.0/bundle.tracing.min.js";
  const markdownSrc = "https://cdn.jsdelivr.net/npm/marked/marked.min.js";
  const avatarSrc =
    "https://upload.wikimedia.org/wikipedia/commons/7/7c/Profile_avatar_placeholder_large.png?20150327203541";
  await script(sharingId, sentrySrc, markdownSrc, avatarSrc);
})();
