package ws

import (
	"log"
	"net/http"

	"github.com/gorilla/websocket"
)

var upgrader = websocket.Upgrader{
	CheckOrigin: func(r *http.Request) bool { return true },
}

func (hub *Hub) WSHandler(w http.ResponseWriter, r *http.Request) {
	log.Println("WebSocket connection attempt:", r.Method, r.URL.Path)

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Println("Upgrade error:", err)
	}
	defer conn.Close()

	hub.AddClient(conn)
	defer hub.RemoveClient(conn)

	for {
		_, msg, err := conn.ReadMessage()
		if err != nil {
			break
		}
		hub.ReceiveMessage(string(msg))
	}
}
