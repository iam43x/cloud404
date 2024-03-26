package db

import (
	"log"
)

type UserCheckEntity struct {
	ID int64
	Username string
	Attribute string
	Operator string
	Value string
}

/***
*	not idempotent
*/
func (uce *UserCheckEntity) SaveToDB() error {
	result, err := connection.Exec(
		"INSERT INTO radcheck(username, attribute, op, value) VALUES (?, ?, ?, ?)", 
		&uce.Username,
		&uce.Attribute,
		&uce.Operator,
		&uce.Value,
	)
	id, err := result.LastInsertId()
	if err != nil {
        log.Println("UserCheckEntity save failed!", err)
    }
	uce.ID = id
	return err
}

func GetUserCheckByUsername(username string) (*UserCheckEntity, error) {
	var uce UserCheckEntity
	err := connection.QueryRow("SELECT id, username, attribute, op, value FROM radcheck WHERE username = ?", username).Scan(
		&uce.ID, 
		&uce.Username, 
		&uce.Attribute, 
		&uce.Operator, 
		&uce.Value,
	)
	if err != nil {
		log.Println("GetUserCheckByUsername mapping failed!", err)
		return nil, err
	}
	log.Printf("User{ID=%d, Username=%s}\n", uce.ID, uce.Username)
	return &uce, nil
}