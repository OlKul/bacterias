package main

import (
	"log"
	"net/http"
)

func main() {
	//port := os.Getenv("PORT")
	http.Handle("/", http.FileServer(http.Dir("./public")))
	http.HandleFunc("/ws", handleWebsocket)
	log.Println(http.ListenAndServe("localhost:8080", nil))
	//log.Println(http.ListenAndServe(":"+port, nil))
}