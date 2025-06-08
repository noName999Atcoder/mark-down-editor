package main

import (
	"embed"
	"log"
	"mark-down-editor/backend/config"
	"mark-down-editor/backend/router"
	"net/http"
)

// フロントエンドのビルドファイルをバイナリに埋め込むための変数
//
//go:embed frontend/dist
var embeddedFiles embed.FS

func main() {
	mux := http.NewServeMux()
	// 設定ファイル読み込み
	config, err := config.LoadConfig()
	if err != nil {
		log.Fatalf("設定ファイルの読み込みに失敗しました: %v", err)
	}

	// // ミドルウェアの設定
	// // 1. 静的ファイルサーバーの設定
	// handler := http.FileServer(http.FS(subFS))
	// // 2. セキュリティヘッダーの追加（XSS対策など）
	// handler = middleware.SecurityHeaders(handler)
	// // 3. CORSミドルウェアの追加（クロスオリジンリクエストの制御）
	// handler = middleware.CORSMiddleware(handler)

	// // フロントエンドの配信
	// // ルートパスへのアクセスを静的ファイルサーバーに転送
	fs := http.FileServer(http.Dir(config.FrontendPath))

	// 静的ファイル（"/"以下）
	mux.Handle("/", fs)

	// APIルーター（"/api"などにマウント）
	mux.Handle("/api/", router.NewRouter())

	// サーバー起動メッセージ
	log.Println("http://localhost:8080 を開いてください")
	// サーバーを起動し、エラーが発生した場合はログを出力して終了
	log.Fatal(http.ListenAndServe(":8080", mux))
}
