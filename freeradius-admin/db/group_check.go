package db

import "log"

type GroupCheck struct {
	Groupname string
	Attribute string
	Operator string
	Value string
}

func (gc GroupCheck) SaveToDB() {
	_, err := connection.Exec(
		"INSERT INTO radgroupcheck(groupname, attribute, op, value) VALUES(?, ?, ?, ?)",
		&gc.Groupname,
		&gc.Attribute,
		&gc.Operator,
		&gc.Value,
	)
	if err != nil {
        log.Println("GroupCheck save failed!", err)
    }
}