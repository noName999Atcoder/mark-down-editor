import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

// Vitestの設定ファイル
// テスト実行環境の設定を行う
export default defineConfig({
  // プラグインの設定
  plugins: [
    // React用のプラグイン
    // JSXの変換やReactコンポーネントのテストを可能にする
    react(),
  ],
  test: {
    // テスト環境の設定
    // jsdomを使用してブラウザ環境をエミュレート
    environment: 'jsdom',
    // グローバルなテスト関数（describe, it, expect等）を自動的にインポート
    globals: true,
    // テスト実行前に読み込むセットアップファイル
    // テスト環境の初期化や共通の設定を行う
    setupFiles: ['<rootDir>/src/test/setup.ts'],
  },
});
