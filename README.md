# React + TypeScript + Vite

## package
    "@heroicons/react": "^2.1.1",
    "i18next": "^23.7.18",
    "path": "^0.12.7",
    "react": "^18.2.0",
    "@types/react": "^18.2.43",
    "@types/react-dom": "^18.2.17",
    "react-i18next": "^14.0.1",
    "zod": "^3.22.4"
This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.
## Installation
To use  module in your project, you need to install. Open your terminal and run the following command:
```bash
npm install
or
yarn install
```

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
