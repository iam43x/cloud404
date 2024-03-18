package main

import (
	"log"
	"net/http"
	api "freeradius-admin/http"
	"freeradius-admin/db"
	"time"
)

func main() {
	server := &http.Server{
		Addr:           ":8080",
		Handler:        api.NewRouter(),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Printf("Server start on [%s]!", server.Addr)
	db.NewConnection()
	log.Fatal(server.ListenAndServe())
}