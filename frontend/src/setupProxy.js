const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  console.log("Setting up proxy middleware...");

  app.use(
    "/api",
    createProxyMiddleware({
      target: "https://firebasestorage.googleapis.com",
      changeOrigin: true,
    })
  );
};
