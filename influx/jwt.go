package influx

import (
	"time"

	jwt "github.com/dgrijalva/jwt-go"
)

// JWT returns a token string accepted by InfluxDB using the sharedSecret as an Authorization: Bearer header
func JWT(username string, sharedSecret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS512, jwt.MapClaims{
		"username": username,
		"exp":      time.Now().Add(time.Minute).Unix(),
	})
	return token.SignedString([]byte(sharedSecret))
}
