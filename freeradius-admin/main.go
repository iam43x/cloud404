package main

import (
	"log"
	"os"
	"time"
	"net/http"
	api "freeradius-admin/http"
	"freeradius-admin/db"
	cfg "freeradius-admin/config"
	"freeradius-admin/secure"
)

func init() {
	//config init
	cfg.Domain = os.Getenv("HOST")
	//init db connection
	db.NewConnection()
	// start goroutine sheduled task
	go secure.TokenBucketRefreshScheduledTask()
}

func main() {
	server := &http.Server{
		Addr:           ":8080",
		Handler:        api.NewRouter(),
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}
	log.Printf("Server start on [%s%s]!", cfg.Domain, server.Addr)
	
	log.Fatal(server.ListenAndServe())
}