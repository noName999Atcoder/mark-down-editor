package ws

import (
	"log"
	"sync"

	"github.com/gorilla/websocket"
)

type Hub struct {
	mu        sync.Mutex
	clients   map[*websocket.Conn]bool
	broadcast chan string
}

func NewHub() *Hub {
	return &Hub{
		clients:   make(map[*websocket.Conn]bool),
		broadcast: make(chan string, 10),
	}
}

func (h *Hub) Start() {
	for msg := range h.broadcast {
		h.broadcastToClients(msg)
	}
}

func (h *Hub) ReceiveMessage(msg string) {
	h.broadcast <- msg
}

func (h *Hub) AddClient(conn *websocket.Conn) {
	h.mu.Lock()
	h.clients[conn] = true
	h.mu.Unlock()
}

func (h *Hub) RemoveClient(conn *websocket.Conn) {
	h.mu.Lock()
	delete(h.clients, conn)
	h.mu.Unlock()
}

func (h *Hub) broadcastToClients(msg string) {
	h.mu.Lock()
	defer h.mu.Unlock()

	for conn := range h.clients {
		if err := conn.WriteMessage(websocket.TextMessage, []byte(msg)); err != nil {
			log.Println("Write error:", err)
			conn.Close()
			delete(h.clients, conn)
		}
	}
}
