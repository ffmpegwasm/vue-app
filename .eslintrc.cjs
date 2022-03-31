module.exports = {
  root: true,
  env: {
    node: true,
    es6: true
  },
  extends: ["plugin:vue/vue3-strongly-recommended", "eslint:recommended"],
  parserOptions: {
    ecmaVersion: 8,
    requireConfigFile: false,
    parser: "@babel/eslint-parser",
  },
  rules: {},
};
