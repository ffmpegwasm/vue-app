const path = require('path');
const express = require('express');

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/vue-app/'
    : '/',
  configureWebpack: {
    devServer: {
      before: app => {
        app.use('/node_modules/', express.static(path.resolve(__dirname, 'node_modules')));
        app.use((_, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      }
    }
  }
};
