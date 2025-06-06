import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

// Viteの設定ファイル
// https://vite.dev/config/
export default defineConfig({
  // プラグインの設定
  plugins: [react(), tsconfigPaths()],
  server: {
    host: true,
  },
});
