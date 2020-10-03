module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  parser: "babel-eslint",
  extends: [
    "airbnb",
    "prettier",
    "prettier/react",
    "plugin:flowtype/recommended",
  ],
  globals: {
    Atomics: "readonly",
    SharedArrayBuffer: "readonly",
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      modules: true,
    },
    ecmaVersion: 2018,
    sourceType: "module",
  },
  plugins: ["react", "prettier", "flowtype"],
  rules: {
    "prettier/prettier": "error",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".jsx"] }],
    "react/forbid-prop-types": [0, { forbid: ["any"] }],
    "react/prop-types": 0,
    "react/no-unescaped-entities": 0,
  },
  env: {
    jest: true,
    browser: true,
    node: true,
  },
};