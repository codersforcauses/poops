module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  engines: {node: "16"},
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
  },
};
