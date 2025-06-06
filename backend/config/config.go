package config

import (
	"os"

	"github.com/joho/godotenv"
)

// Config はアプリケーションの設定を保持する構造体
// 環境変数から読み込まれた設定値を保持する
type Config struct {
	Port         string // サーバーのポート番号
	FrontendPath string // フロントエンドのビルドファイルのパス
	Environment  string // 実行環境（development/production）
}

// LoadConfig は環境変数から設定を読み込む
// .envファイルが存在する場合はそこからも設定を読み込む
func LoadConfig() (*Config, error) {
	// .envファイルの読み込み
	// ファイルが存在しない場合はエラーを無視（オプショナル）
	if err := godotenv.Load(); err != nil {
		// .envファイルが存在しない場合は無視
	}

	// 設定値の初期化
	// 環境変数が設定されていない場合はデフォルト値を使用
	config := &Config{
		Port:         getEnv("PORT", "8080"),                   // デフォルトポート: 8080
		FrontendPath: getEnv("FRONTEND_PATH", "frontend/dist"), // デフォルトパス: frontend/dist
		Environment:  getEnv("ENV", "development"),             // デフォルト環境: development
	}

	return config, nil
}

// getEnv は環境変数を取得し、デフォルト値を設定
// 環境変数が設定されていない場合は指定されたデフォルト値を返す
func getEnv(key, defaultValue string) string {
	value := os.Getenv(key)
	if value == "" {
		return defaultValue
	}
	return value
}
