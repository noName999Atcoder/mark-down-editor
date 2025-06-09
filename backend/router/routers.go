package router

import (
	"mark-down-editor/backend/ws"
	"net/http"
)

func NewRouter(router *http.ServeMux) *http.ServeMux {
	hub := ws.NewHub()
	go hub.Start()

	// APIエンドポイント設定。
	router.HandleFunc("/ws", hub.WSHandler)

	// 作成したrouterを返却する。
	return router
}
