import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { defineWorkspace } from 'vitest/config';

import { storybookTest } from '@storybook/addon-vitest/vitest-plugin';

// 現在のディレクトリパスを取得
// ESMとCommonJSの両方の環境で動作するように条件分岐
const dirname =
  typeof __dirname !== 'undefined' ? __dirname : path.dirname(fileURLToPath(import.meta.url));

// Vitestワークスペースの設定
// 複数のテスト設定を管理するための設定ファイル
// More info at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon
export default defineWorkspace([
  // メインのVite設定ファイルを参照
  'vite.config.ts',
  {
    // メインのVite設定を継承
    extends: 'vite.config.ts',
    plugins: [
      // Storybookのテスト用プラグイン
      // Storybookで定義されたストーリーのテストを実行
      // See options at: https://storybook.js.org/docs/next/writing-tests/integrations/vitest-addon#storybooktest
      storybookTest({ configDir: path.join(dirname, '.storybook') }),
    ],
    test: {
      // テストスイートの名前
      name: 'storybook',
      // ブラウザテストの設定
      browser: {
        // ブラウザテストを有効化
        enabled: true,
        // ヘッドレスモードで実行（GUIなし）
        headless: true,
        // Playwrightをテスト実行環境として使用
        provider: 'playwright',
        // テスト用のブラウザインスタンス設定
        instances: [{ browser: 'chromium' }]
      },
      // テスト実行前に読み込むセットアップファイル
      setupFiles: ['.storybook/vitest.setup.ts'],
    },
  },
]);
