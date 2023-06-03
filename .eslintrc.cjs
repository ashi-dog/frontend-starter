module.exports = {
    env: { browser: true, commonjs: true, es2020: true },
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended",
        "plugin:prettier/recommended",
        "prettier",
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        ecmaFeatures: {
            jsx: true,
        },
        ecmaVersion: "latest",
        sourceType: "module",
    },
    plugins: ["react-refresh", "react", "react-hooks", "@typescript-eslint", "prettier"],
    rules: {
        "react-refresh/only-export-components": "warn",
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off",
    },
    settings: {
        "import/resolver": {
            typescript: {},
        },
    },
};
