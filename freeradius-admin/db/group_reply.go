package db

import "log"

type GroupReply struct {
	Groupname string
	Attribute string
	Operator string
	Value string
}

func (gr GroupReply) SaveToDB() {
	_, err := connection.Exec(
		"INSERT INTO radgroupreply(groupname, attribute, op, value) VALUES(?, ?, ?, ?)",
		&gr.Groupname,
		&gr.Attribute,
		&gr.Operator,
		&gr.Value,
	)
	if err != nil{
        log.Panic("GroupReply save failed!", err)
    }
}