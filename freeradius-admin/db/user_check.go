package db

import (
	"log"
)

type UserCheck struct {
	Username string
	Attribute string
	Operator string
	Value string
}

func (uc UserCheck) SaveToDB() *UserInfo {
	result, err := connection.Exec(
		"INSERT INTO radcheck(username, attribute, op, value) VALUES (?, ?, ?, ?)", 
		&uc.Username,
		&uc.Attribute,
		&uc.Operator,
		&uc.Value,
	)
	if err != nil{
        log.Panic("UserCheck save failed!", err)
    }
	id, _ := result.LastInsertId()
	return &UserInfo{ ID: id, Username: uc.Username }
}