const zlib = require('zlib');
const path = require("path");
const express = require("express");
const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "dist",
  indexPath: "index.html",
  transpileDependencies: false,
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
  pluginOptions: {
    compression: {
      brotli: {
        filename: '[file].br[query]',
        algorithm: 'brotliCompress',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: {
          params: {
            [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
          },
        },
        minRatio: 0.8,
      },
      gzip: {
        filename: '[file].gz[query]',
        algorithm: 'gzip',
        include: /\.(js|css|html|svg|json)(\?.*)?$/i,
        compressionOptions: { level: zlib.constants.Z_BEST_COMPRESSION },
        minRatio: 0.8,
      },
    },
    prettify: false,
  },
});
