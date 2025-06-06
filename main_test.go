package main

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

// TestMainHandler はメインハンドラーのテスト
// フロントエンドの静的ファイルが正しく配信されることを確認
func TestMainHandler(t *testing.T) {
	// テスト用のリクエストを作成
	// ルートパスへのGETリクエストをシミュレート
	req, err := http.NewRequest("GET", "/", nil)
	if err != nil {
		t.Fatal(err)
	}

	// レスポンスレコーダーを作成
	// ハンドラーのレスポンスを記録するためのモックレスポンスライター
	rr := httptest.NewRecorder()
	// 埋め込まれたフロントエンドファイルを使用する静的ファイルサーバーを作成
	handler := http.FileServer(http.FS(embeddedFiles))

	// ハンドラーを実行
	// 作成したリクエストを処理
	handler.ServeHTTP(rr, req)

	// ステータスコードの確認
	// 200 OKが返されることを確認
	if status := rr.Code; status != http.StatusOK {
		t.Errorf("ハンドラーが間違ったステータスコードを返しました: got %v want %v",
			status, http.StatusOK)
	}
}

// TestAPISaveEndpoint はMarkdown保存APIのテスト
// TODO: 以下のテストケースを実装予定
// 1. 正常なPOSTリクエストの処理
// 2. 不正なメソッド（GET等）のリジェクト
// 3. 不正なJSONボディの処理
// 4. ファイル保存の成功/失敗ケース
func TestAPISaveEndpoint(t *testing.T) {
	// TODO: APIエンドポイントのテストを実装
	// 現在はコメントアウトされているため、実装後に追加
}
