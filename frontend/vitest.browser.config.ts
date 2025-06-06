import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

// ブラウザ環境でのテスト実行用のVitest設定
// Playwrightを使用して実際のブラウザでテストを実行する設定
export default defineConfig({
  // プラグインの設定
  plugins: [
    // React用のプラグイン
    // JSXの変換やReactコンポーネントのテストを可能にする
    react()
  ],
  test: {
    // ブラウザテストの設定
    browser: {
      // ブラウザテストを有効化
      enabled: true,
      // Playwrightをテスト実行環境として使用
      provider: 'playwright',
      // Playwrightの設定
      // https://vitest.dev/guide/browser/playwright
      instances: [
        // ここにテスト用のブラウザインスタンスを追加可能
        // 例: { name: 'chromium', channel: 'chrome' }
      ],
    },
  },
})
