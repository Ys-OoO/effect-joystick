import globals from "globals";
import pluginJs from "@eslint/js";

export default [
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  {
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
  }
];