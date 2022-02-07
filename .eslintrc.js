// Here we're using .js instead of .json to support comments :)
module.exports = {
  parser: "@typescript-eslint/parser",
  // Specifies the ESLint parser
  parserOptions: {
    ecmaVersion: 2020,
    // Allows for the parsing of modern ECMAScript features
    sourceType: "module",
    // Allows for the use of imports
    ecmaFeatures: {
      jsx: true // Allows for the parsing of JSX

    }
  },
  settings: {
    react: {
      version: "detect" // Tells eslint-plugin-react to automatically detect the version of React to use

    }
  },
  extends: ["plugin:react/recommended", "plugin:@typescript-eslint/recommended", "plugin:prettier/recommended", "plugin:cypress/recommended", "plugin:storybook/recommended"],
  rules: {
    // overwrite rules specified from the extended configs
    // "off" or [0] turn the rule off -  "warn" or [1] turn the rule on as a warning (doesn't affect exit code) - "error" or [2] turn the rule on as an error (exit code will be 1)
    "@typescript-eslint/explicit-function-return-type": "warn",
    "react/prop-types": "off",
    "react/no-unescape-entities": "off",
    "react/no-unescaped-entities": "off",
    "react/display-name": "off",
    "@typescript-eslint/no-empty-function": ["error", {
      allow: ["arrowFunctions"]
    }],
    "@typescript-eslint/explicit-function-return-type": ["warn", {
      allowExpressions: true
    }],
    eqeqeq: ["error", "always", {
      null: "ignore"
    }]
  },
  "globals": {
    "cy": true
  }
};