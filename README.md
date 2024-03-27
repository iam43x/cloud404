### cloud404


# create certificates

```bash
mkdir certs
source config/.env
certbot certonly --manual -d ${HOST}
cp /etc/letsencrypt/live/${HOST}/fullchain.pem certs/tls.crt
cp /etc/letsencrypt/live/${HOST}/privkey.pem certs/tls.key
```