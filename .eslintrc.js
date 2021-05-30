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
    plugins: ["prettier"],
    extends: ["plugin:vue/vue3-recommended", "plugin:@typescript-eslint/recommended", "prettier"],
    rules: {
        "prefer-rest-params": "off",
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/indent": ["warn", 4],
        "@typescript-eslint/no-this-alias": "off",
        "@typescript-eslint/no-unused-vars": "warn",
        // disable any type error warning
        "@typescript-eslint/no-explicit-any": "off",
        // Disable `export function functionName()....`
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "@typescript-eslint/ban-types": "off",
        "@typescript-eslint/triple-slash-reference": "off",

        "no-const-assign": 1,
        "no-extra-semi": 0,
        semi: 0,
        "no-fallthrough": 0,
        "no-empty": 0, // no empty statement
        "no-mixed-spaces-and-tabs": 1,
        "no-redeclare": 0, // no redeclare function/const
        "no-this-before-super": 1,
        "no-undef": 0, // fix call function on single browser js without import
        "no-unreachable": 1,
        "no-unused-vars": 1,
        "no-use-before-define": 0,
        "constructor-super": 1,
        curly: 0,
        eqeqeq: 0, // fix disable == and ===
        "func-names": 0, // fix anonymous function warning
        "valid-typeof": 1,
        "prettier/prettier": 1,
        "no-console": 0, // fix no console warning
    },
};
