package main

import (
	"encoding/csv"
	"github.com/gorilla/websocket"
	"log"
	"net/http"
	"os"
	"path/filepath"
)

var upgrader = websocket.Upgrader{}

type msg struct {
	Time	string
	Id		string
	Typ 	string
	X 		string
	Y 		string
	Z 		string
	Roll 	string
	Pitch 	string
	Yaw 	string
	Rsrc	string
	Size 	string
	Color 	string
}

func handleWebsocket(w http.ResponseWriter, r *http.Request) {
	c, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Print("upgrade:", err)
		return
	}
	defer c.Close()
	for {
		mt, message, err := c.ReadMessage()
		if err != nil {
			log.Println("read:", err)
			break
		}
		log.Printf("recv: %s", message)
		test(c, mt)
		//err = c.WriteMessage(mt, []byte("234324234234234"))
		//if err != nil {
		//	log.Println("write:", err)
		//	break
		//}
	}
}


func readCsv(filename string, conn *websocket.Conn, mt int)  {
	file, err := os.Open(filename)
	if err != nil {
		panic(err)
	}
	defer file.Close()
	r := csv.NewReader(file)

	records, err := r.ReadAll()
	if err != nil {
		log.Fatal(err)
	}
	for _, record := range records {
		//fmt.Println(record)
		//message := record[0]
		//for _, item := range record[1:] {
		//	message += " " + item
		//}
		if (record[0] == "0" || record[0] == "time") {
			continue
		}
		message := &msg{Time: record[0],
			Id: record[1],
			Typ: record[2],
			X : record[3],
			Y : record[4],
			Z : record[5],
			Roll : record[6],
			Pitch : record[7],
			Yaw: record[8],
			Rsrc: record[9],
			Size : record[10],
			Color: record[11]}
		//time.Sleep(1 * time.Second)
		err = conn.WriteJSON(message)
		if err != nil {
			log.Println("write:", err)
			break
		}
	}
}
func test(conn *websocket.Conn, mt int) {
	files, _ := filepath.Glob("./log/*.log")
	for _, file := range files {
		//fmt.Printf("%q\n", file)
		readCsv(file, conn, mt)
	}
}
