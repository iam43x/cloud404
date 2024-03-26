package domain

import (
	"freeradius-admin/db"
	"log"
)

type UserModel struct {
	ID int64
	Username string
	Password string
	Groupname string
}

func (um *UserModel) SaveToDB() {
	uce := &db.UserCheckEntity{
		Username: um.Username, 
		Attribute: "Cleartext-Password", 
		Operator: ":=", 
		Value: um.Password,
	}
	err := uce.SaveToDB()
	um.ID = uce.ID //save id from radcheck auto increment
	uge := &db.UserGroupEntity{
		Username: um.Username,
		Groupname: um.Groupname,
	}
	err = uge.SaveGroup()
	if err != nil {
		log.Println("db save was failed!")
	}
}