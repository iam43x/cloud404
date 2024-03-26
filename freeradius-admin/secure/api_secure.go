package secure

import (
	"log"
	"time"
	"fmt"
	"strings"
	"errors"
	"net/http"
	"crypto/md5"
    "encoding/hex"
	"encoding/json"
	"freeradius-admin/db"
)

type Authenticate struct {
	ID int64 `json:"id"`
	Username string `json:"username"`
	Groupname string `json:"group"`
	Token string `json:"token"`
}

var tokenCache = map[string]Authenticate{}
var tokenCacheCleanSheduled bool

func GetToken(w http.ResponseWriter, r *http.Request) {
	username, password, ok := r.BasicAuth()
    if !ok {
        w.WriteHeader(http.StatusUnauthorized)
        w.Write([]byte(`{"message": "No basic auth present"}`))
        return
    }
	uce, err := db.GetUserCheckByUsername(username)
	if uce.Value != password || err != nil {
		log.Println("Auth failed >> Password/Username not matched!")
		w.WriteHeader(http.StatusUnauthorized)
        w.Write([]byte(`{"message": "Auth failed!"}`))
	} else {
		auth := Authenticate{
			ID: uce.ID,
			Username: username,
		}
		log.Printf("Login [%s] Success!\n", username)
		//create token
		auth.Token = GetMd5Hash(fmt.Sprintf("%s:%s", username, password))
		tokenCache[auth.Token] = auth
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(auth)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			log.Print("Autheticate failed serialize!", err)
		}
	}
}

func GetContext(w http.ResponseWriter, r *http.Request) {
	tokenValue, err := GetTokenFromRequest(r)
	auth, exists := tokenCache[tokenValue]
	if !exists || err != nil {
		log.Println("getContext failed!", err)
		w.WriteHeader(http.StatusUnauthorized)
	} else {
		w.Header().Set("Content-Type", "application/json; charset=UTF-8")
		w.WriteHeader(http.StatusOK)
		err = json.NewEncoder(w).Encode(auth)
		if err != nil {
			http.Error(w, err.Error(), http.StatusBadRequest)
			log.Print("Autheticate failed serialize!", err)
		}
	}
}

func AuthHandler(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		tokenValue, err := GetTokenFromRequest(r)
		if _, exists := tokenCache[tokenValue]; !exists || err != nil {
			log.Println("token not found or token expired!", err)
			w.WriteHeader(http.StatusUnauthorized)
		} else {
			next.ServeHTTP(w, r)
		}
	})
}

func GetTokenFromRequest(r *http.Request) (string, error) {
	tokenHeader := r.Header.Get("Authorization")
	tokenParts := strings.Split(tokenHeader, " ")
	if len(tokenParts) != 2 || strings.ToLower(tokenParts[0]) != "token" {
		return "", errors.New("Token not found!")
	}
	return tokenParts[1], nil
}

func GetMd5Hash(val string) string {
	hash := md5.Sum([]byte(val))
	return hex.EncodeToString(hash[:])
}

func TokenBucketRefreshScheduledTask() {
	//clean bucket per 1 hour
	tokenCacheCleanSheduled = true
	for {
		log.Println("start tokenCache clean...")
		tokenCache = map[string]Authenticate{}
		time.Sleep(1 * time.Hour)
	}
}