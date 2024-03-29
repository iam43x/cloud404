/*
 * freeRADIUS Admin - OpenAPI 3.0
 *
 * get http api for admin freeradius
 *
 * API version: 1.0.0
 * Generated by: Swagger Codegen (https://github.com/swagger-api/swagger-codegen.git)
 */
package http

import (
	"net/http"
	"encoding/json"
	"log"
	"freeradius-admin/db"
)

func AddUser(w http.ResponseWriter, r *http.Request) {
	var urd UserRequestDto
	err := json.NewDecoder(r.Body).Decode(&urd)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		log.Print("UserRequestDto failed deserialize!", err)
	} else {
		model := urd.DtoToModel()
		model.SaveToDB()
		resp := ModelToDto(model)
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(resp)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			log.Print("UserResponseDto failed serialize!", err)
		}
	}
}

func GetAllUser(w http.ResponseWriter, r *http.Request) {
	userModelList, err := db.GetAllUser()
	if err != nil {
		http.Error(w, err.Error(), http.StatusNotFound)
	} else {
		var allUsersResponse []UserResponseDto
		for _, m := range userModelList {
			resp := UserResponseDto{
				ID: m.ID,
				Username: m.Username,
			}
			allUsersResponse = append(allUsersResponse, resp)
		}
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		err := json.NewEncoder(w).Encode(allUsersResponse)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			log.Print("UserResponseDto failed serialize!", err)
		}
	}
}
