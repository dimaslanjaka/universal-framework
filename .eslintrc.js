module.exports = {
    parser: "@typescript-eslint/parser", // Specifies the ESLint parser
    env: {
        browser: true,
        commonjs: true,
        es6: true,
        jquery: true,
    },
    parserOptions: {
        parser: "babel-eslint",
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: "module", // Allows for the use of imports
    },
    extends: [
        "plugin:vue/vue3-recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    rules: {
        "prettier/prettier": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/indent": ["error", 4],
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        // disable any type error warning
        "@typescript-eslint/no-explicit-any": "off",
        // Disable `export function functionName()....`
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/triple-slash-reference": "off",
    },
};
