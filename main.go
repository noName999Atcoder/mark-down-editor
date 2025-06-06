package main

import (
	"embed"
	"encoding/json"
	"io/fs"
	"log"
	"net/http"
	"os"
	"path/filepath"

	"github.com/yourusername/mark-down-editor/backend/middleware"
)

// フロントエンドのビルドファイルをバイナリに埋め込むための変数
//
//go:embed frontend/dist
var embeddedFiles embed.FS

func main() {
	// embeddedFiles の "frontend/dist" サブディレクトリを新しいルートとするファイルシステムを作成
	// これにより、フロントエンドの静的ファイルを効率的に配信できる
	subFS, err := fs.Sub(embeddedFiles, "frontend/dist")
	if err != nil {
		log.Fatalf("サブファイルシステムの作成に失敗: %v", err)
	}

	// ミドルウェアの設定
	// 1. 静的ファイルサーバーの設定
	handler := http.FileServer(http.FS(subFS))
	// 2. セキュリティヘッダーの追加（XSS対策など）
	handler = middleware.SecurityHeaders(handler)
	// 3. CORSミドルウェアの追加（クロスオリジンリクエストの制御）
	handler = middleware.CORSMiddleware(handler)

	// フロントエンドの配信
	// ルートパスへのアクセスを静的ファイルサーバーに転送
	http.Handle("/", handler)

	// APIでMarkdown保存
	// POSTリクエストでMarkdownファイルを保存するエンドポイント
	http.HandleFunc("/api/save", func(w http.ResponseWriter, r *http.Request) {
		// POSTメソッド以外は許可しない
		if r.Method != http.MethodPost {
			http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
			return
		}

		// リクエストボディの解析
		// ファイル名とコンテンツを含むJSONを期待
		var data struct {
			Filename string `json:"filename"` // 保存するファイル名
			Content  string `json:"content"`  // Markdownコンテンツ
		}

		if err := json.NewDecoder(r.Body).Decode(&data); err != nil {
			http.Error(w, "Invalid request body", http.StatusBadRequest)
			return
		}

		// 保存先ディレクトリの作成
		// 存在しない場合は新規作成（パーミッション: 0755）
		dir := "markdowns"
		if err := os.MkdirAll(dir, 0755); err != nil {
			http.Error(w, "Failed to create directory", http.StatusInternalServerError)
			return
		}

		// ファイルの保存
		// 指定されたファイル名でMarkdownコンテンツを保存（パーミッション: 0644）
		filepath := filepath.Join(dir, data.Filename)
		if err := os.WriteFile(filepath, []byte(data.Content), 0644); err != nil {
			http.Error(w, "Failed to save file", http.StatusInternalServerError)
			return
		}

		// 成功レスポンス
		// JSON形式で成功メッセージを返す
		w.Header().Set("Content-Type", "application/json")
		json.NewEncoder(w).Encode(map[string]string{
			"status":  "success",
			"message": "File saved successfully",
		})
	})

	// サーバー起動メッセージ
	log.Println("http://localhost:8080 を開いてください")
	// サーバーを起動し、エラーが発生した場合はログを出力して終了
	log.Fatal(http.ListenAndServe(":8080", nil))
}
