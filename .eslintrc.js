require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
  root: true,
  extends: [
    "next/core-web-vitals",
    "@toruslabs/eslint-config-typescript"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    sourceType: "module",
    ecmaVersion: 11,
    project: "./tsconfig.json",
  },
  ignorePatterns: ["*.d.ts", ".eslintrc.js"],
  env: {
    es2020: true,
    browser: true,
    node: true, // Optional: remove if not needed
  },
  rules: {
    "@typescript-eslint/no-explicit-any": 0,
    "import/no-extraneous-dependencies": 0,
    "no-console": 0,
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
    ]
  }
};