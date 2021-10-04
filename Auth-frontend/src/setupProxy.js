const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/auth/login',
    createProxyMiddleware({
      target: 'http://localhost:10203/auth/login',
      changeOrigin: true,
    })
  );
};