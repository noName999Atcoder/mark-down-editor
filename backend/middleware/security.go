package middleware

import (
	"net/http"
)

// SecurityHeaders はセキュリティヘッダーを追加するミドルウェア
// 各種セキュリティヘッダーを設定し、一般的なWebセキュリティの脅威から保護する
func SecurityHeaders(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// セキュリティヘッダーの設定
		// MIMEタイプのスニッフィングを防止
		w.Header().Set("X-Content-Type-Options", "nosniff")
		// クリックジャッキング攻撃を防止
		w.Header().Set("X-Frame-Options", "DENY")
		// XSS攻撃の検出とブロック
		w.Header().Set("X-XSS-Protection", "1; mode=block")
		// HTTPSの強制（1年間有効）
		w.Header().Set("Strict-Transport-Security", "max-age=31536000; includeSubDomains")
		// コンテンツセキュリティポリシー（同一オリジンのみ許可）
		w.Header().Set("Content-Security-Policy", "default-src 'self'")
		// リファラーポリシー（クロスオリジン時は厳格に制限）
		w.Header().Set("Referrer-Policy", "strict-origin-when-cross-origin")
		// 機能ポリシー（位置情報、マイク、カメラを無効化）
		w.Header().Set("Permissions-Policy", "geolocation=(), microphone=(), camera=()")

		next.ServeHTTP(w, r)
	})
}

// CORSMiddleware はCORSヘッダーを設定するミドルウェア
// クロスオリジンリクエストを制御し、フロントエンドからのアクセスを許可する
func CORSMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// CORSヘッダーの設定
		// 開発環境のフロントエンドからのアクセスを許可
		w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
		// 許可するHTTPメソッド
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
		// 許可するヘッダー
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		// 認証情報の送信を許可
		w.Header().Set("Access-Control-Allow-Credentials", "true")

		// OPTIONSリクエストの場合は早期リターン
		// プリフライトリクエストに対する応答
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusOK)
			return
		}

		next.ServeHTTP(w, r)
	})
}
