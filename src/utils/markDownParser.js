export const markDownParser = (src) => {
  return new Promise((resolve, reject) => {
    const markdownScript = document.createElement("script");
    markdownScript.src = src;

    markdownScript.onload = () => {
      console.log("Marked.js has been loaded.");
      resolve(); // Resolve the promise when script is loaded
    };

    markdownScript.onerror = (error) => {
      Sentry.captureException(error, {
        extra: {
          context: "Loading marked.js",
        },
      });
      reject(error); // Reject the promise if script fails to load
    };

    document.head.appendChild(markdownScript);
  });
};
