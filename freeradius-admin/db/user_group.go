package db

import (
	"log"
	cfg "freeradius-admin/config"
)

type UserGroupEntity struct {
	ID int64
	Username string
	Groupname string
}

func GetAllUser() (users []UserGroupEntity, err error) {
	rows, err := connection.Query("SELECT uc.id, uc.username FROM radcheck AS uc JOIN radusergroup as g ON g.username = uc.username WHERE g.groupname = ?", cfg.Domain)
	if err != nil {
		log.Println("GetAllUser select failed!", err)
		return nil, err
	} else {
		for rows.Next() {
			var uge UserGroupEntity
			err := rows.Scan(&uge.ID, &uge.Username)
			if err != nil {
				log.Println("GetAllUser mapping failed!", err)
			} else {
				log.Printf("User{ID=%d, Username=%s}\n", uge.ID, uge.Username)
				users = append(users, uge)
			}
		}
		return users, nil
	}
}

/***
*	not idempotent
*/
func (uge *UserGroupEntity) SaveGroup() error {
	_, err := connection.Exec(
		"INSERT INTO radusergroup(username, groupname) VALUES(?, ?)",
		uge.Username,
		uge.Groupname,
	)
	if err != nil {
		log.Println("UserGroupEntity save failed!", err)
	}
	return err
}