const path = require("path");
const express = require("express");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "dist",
  indexPath: "index.html",
  transpileDependencies: true,
  productionSourceMap: true,
  runtimeCompiler: true,
  lintOnSave: true,
  parallel: true,
  integrity: true,
  publicPath: process.env.NODE_ENV === "production" ? "/vue-app/" : "/",
  configureWebpack: {
    devServer: {
      onBeforeSetupMiddleware: ({ app }) => {
        app.use(
          "/node_modules/",
          express.static(path.resolve(__dirname, "node_modules"))
        );
        app.use((_, res, next) => {
          res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
          res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
          next();
        });
      },
    },
  },
});
