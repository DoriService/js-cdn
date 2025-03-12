// Add Sentry initialization at the start of the IIFE
export async function initSentry(src) {
  const script = document.createElement("script");
  script.src = src;
  script.crossOrigin = "anonymous";

  script.onload = () => {
    Sentry.init({
      dsn: "https://0a4a8f2e7d5218cbc7c850d400ad3cba@sentry.hamravesh.com/7582",
      integrations: [new Sentry.BrowserTracing()],
      tracesSampleRate: 1.0,
    });

    // Add global error handler
    window.onerror = function (message, source, lineno, colno, error) {
      Sentry.captureException(error, {
        extra: {
          message,
          source,
          lineno,
          colno,
        },
      });
    };

    // Add unhandled promise rejection handler
    window.onunhandledrejection = function (event) {
      Sentry.captureException(event.reason, {
        extra: {
          type: "unhandled_promise_rejection",
          promise: event.promise,
        },
      });
    };
  };

  script.onerror = (error) => {
    console.error("Failed to load Sentry:", error);
  };

  document.head.appendChild(script);
}
