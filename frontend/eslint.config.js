// ESLintのFlat Config用設定ファイル例
// TypeScript + React + JSXアクセシビリティ + Storybook + Prettier連携

// ESLint本体の推奨ルールセット（JS用）
import js from "@eslint/js";

// React用プラグイン（React特有のルール群）
import reactPlugin from "eslint-plugin-react";

// React Hooks用プラグイン（Hooksのルールを提供）
import reactHooksPlugin from "eslint-plugin-react-hooks";

// JSXのアクセシビリティチェック用プラグイン
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";

// StorybookのESLintプラグイン（Storybook関連のルール）
import storybookPlugin from "eslint-plugin-storybook";

// TypeScript用ESLintプラグイン（型チェックなしの静的解析ルールなど）
import tsPlugin from "@typescript-eslint/eslint-plugin";

// Prettierと競合しないようにルールを無効化する設定
import prettierConfig from "eslint-config-prettier";

export default [{
  // グローバルに無視するファイル・フォルダの指定
  // これらはESLintのチェック対象から外れるため処理が軽くなります
  ignores: [
    "dist/",         // ビルド成果物
    "node_modules/", // 依存パッケージ
    "build/",        // 他のビルド関連ディレクトリ
    ".DS_Store",     // macOS固有の不要ファイル
  ],
}, // JavaScriptの推奨ルールセットを適用
js.configs.recommended, // TypeScriptの推奨ルールセットを適用（型チェックなし）
tsPlugin.configs.recommended, {
  // ts, tsxファイルのみ対象の設定（TypeScript + React JSXがメイン）
  files: ["**/*.{ts,tsx}"],

  languageOptions: {
    // パーサーはTypeScript用のパーサーを指定
    parser: "@typescript-eslint/parser",
    parserOptions: {
      ecmaVersion: 2020,       // ECMAScriptのバージョンを指定（最新機能対応）
      ecmaFeatures: { jsx: true },  // JSX構文を有効化
      sourceType: "module",    // ES Modules形式のソースコードとして解析
      project: "./tsconfig.json",  // 型チェックを有効にする場合に指定（ここはtsPluginの推奨設定と整合性を取る）
    },
    globals: {
      // ブラウザ環境のグローバル変数を許可
      ...require("globals").browser,
    },
  },

  plugins: {
    // React用プラグインを有効化
    react: reactPlugin,
    // React Hooks用プラグインを有効化
    "react-hooks": reactHooksPlugin,
    // JSXのアクセシビリティチェック用プラグインを有効化
    "jsx-a11y": jsxA11yPlugin,
  },

  rules: {
    // Reactプラグインの推奨ルール群を展開
    ...reactPlugin.configs.recommended.rules,

    // React Hooksの推奨ルール群を展開
    ...reactHooksPlugin.configs.recommended.rules,

    // JSXアクセシビリティプラグインの推奨ルール群を展開
    ...jsxA11yPlugin.configs.recommended.rules,

    // React 17以降でJSXを使用する場合、import Reactは不要なので警告をOFFに
    "react/react-in-jsx-scope": "off",

    // TypeScript使用時はPropTypes不要なのでOFFに
    "react/prop-types": "off",
  },

  settings: {
    react: {
      // Reactのバージョンを自動検出して適切なルール適用を補助
      version: "detect",
    },
  },
}, // Storybook用の推奨ルールセット（Flat Config形式）
storybookPlugin.configs["flat/recommended"], // Prettierと競合しないようにESLintルールを無効化する設定
// これを一番最後に入れることで、Prettierの整形ルールを優先させる
prettierConfig, ...storybook.configs["flat/recommended"]];
