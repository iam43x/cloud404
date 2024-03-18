package db

import (
	"os"
	"fmt"
	"log"
	"database/sql"
	"github.com/go-sql-driver/mysql"
)

var connection *sql.DB

func NewConnection() {
	cfg := mysql.Config{
        User:   "root", //fixit
        Passwd: os.Getenv("MYSQL_ROOT_PASSWORD"),
        Net:    "tcp",
        Addr:   fmt.Sprintf("%s:3306", os.Getenv("MYSQL_HOST")),
        DBName: os.Getenv("MYSQL_DATABASE"),
    }
	db, err := sql.Open("mysql", cfg.FormatDSN())
	if err != nil {
		log.Fatal("Database create connection failed!", err)
	}
	err = db.Ping()
    if err != nil {
        log.Fatal("Database ping connection failed!", err)
    }
	db.SetConnMaxLifetime(0)
	db.SetMaxIdleConns(5)
	db.SetMaxOpenConns(5)
    log.Println("DB Connected!")
	connection = db
}