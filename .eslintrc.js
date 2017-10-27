module.exports = {
    "env": {
        "node": true,
        "mocha": true,
        "es6": true
    },
    "extends": ["eslint:recommended"],
    "parser": "babel-eslint",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "no-console": ["warn"],
        "indent": ["error", 2],
        "linebreak-style": ["error", "windows"],
        "quotes": ["error", "single"],
        "semi": ["error", "always"],
        "no-alert": "error",
        "no-caller": "error",
        "no-empty-function": "error",
        "no-else-return": "error",
        "no-eval": "error",
        "no-extend-native": "error",
        "complexity": ["error", 6],
        "no-new-wrappers": "error",
        "no-script-url": "error",
        "no-throw-literal": "error",
        "no-void": "error",
        "no-with": "error",
        "prefer-promise-reject-errors": "error",
        "require-await": "error",
        "camelcase": ["error", { "properties": "always" }],
        "max-len": ["warn", { "code": 80 }],
        "no-trailing-spaces": "error",
        "arrow-body-style": ["error", "as-needed"],
        "arrow-parens": "error",
        "arrow-spacing": "error",
        "no-duplicate-imports": "error",
        "no-useless-constructor": "error",
        "no-var": "error",
        "prefer-rest-params": "error",
    }
  };