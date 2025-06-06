package handlers

import (
	"encoding/json"
	"net/http"
	"os"
	"path/filepath"
)

// Response はAPIレスポンスの構造体
// すべてのAPIエンドポイントで共通して使用されるレスポンス形式
type Response struct {
	Status  string `json:"status"`            // 処理の状態（success/error）
	Message string `json:"message,omitempty"` // エラーメッセージや成功メッセージ
	Data    any    `json:"data,omitempty"`    // レスポンスデータ（オプション）
}

// SaveMarkdown はMarkdownファイルを保存するハンドラー
// POSTリクエストでMarkdownファイルの内容を受け取り、ファイルシステムに保存する
func SaveMarkdown(w http.ResponseWriter, r *http.Request) {
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
	response := Response{
		Status:  "success",
		Message: "File saved successfully",
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(response)
}
