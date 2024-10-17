module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module",
  },
  rules: {
    semi: "error",
    "prefer-const": "error",
    indent: ["error", 2],
    "no-irregular-whitespace": "error",
    "func-call-spacing": ["error", "never"],
    "arrow-spacing": "error",
    "block-spacing": "error",
    "array-bracket-spacing": ["error", "never", { "objectsInArrays": true, "arraysInArrays": true } ],
    "computed-property-spacing": ["error", "never"],
    "comma-spacing": ["error", { "before": false, "after": true } ],
    "keyword-spacing": ["error", { "before": true, "after": true } ],
    "object-curly-spacing": ["error", "always", { "objectsInObjects": true } ],
    "key-spacing": ["error", { "beforeColon": false, "afterColon": true } ]
  }
};