package db

import (
	"log"
)

type UserInfo struct {
	ID int64 `json:"id"`
	Username string `json:"username"`
}

func GetAllUserByGroup(group string) []UserInfo {
	rows, err := connection.Query("SELECT id, username FROM radusergroup WHERE groupname = ?", group)
	if err != nil {
		log.Panic("GetAllUserByGroup select failed!", err)
	}
	var users []UserInfo
	for rows.Next() {
		var user UserInfo
		err := rows.Scan(&user.ID, &user.Username);
		if err != nil {
			log.Panic("GetAllUser mapping failed!", err)
		}
		log.Printf("User{ID=%d, Username=%s}\n", user.ID, user.Username)
		users = append(users, user)
	}
	return users
}

func (uc UserCheck) SaveGroup(group string) {
	_, err := connection.Exec(
		"INSERT INTO radusergroup(username, groupname) VALUES(?, ?)",
		uc.Username,
		group,
	)
	if err != nil {
		log.Panic("UserGroup save failed!", err)
	}
}