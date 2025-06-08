package router

import (
	"mark-down-editor/backend/ws"

	"github.com/gorilla/mux"
)

func NewRouter() *mux.Router {
	router := mux.NewRouter()
	hub := ws.NewHub()
	go hub.Start()

	// APIエンドポイント設定。
	router.HandleFunc("/ws", hub.WSHandler).Methods("POST")

	// 作成したrouterを返却する。
	return router
}
