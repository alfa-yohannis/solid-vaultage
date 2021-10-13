export NODE_TLS_REJECT_UNAUTHORIZED=0 SOLID_USERNAME=alfa SOLID_PASSWORD=Lololol3x! SOLID_IDP=https://localhost:8443 && solid-test start --port 8443 --server-uri https://localhost:8443 --no-reject-unauthorized --ssl-key /home/alfa/solid-vaultage/server.key --ssl-cert /home/alfa/solid-vaultage/server.crt --root /home/alfa/solid-vaultage/solid-alfa/data 

# solid-test start --port 8444 --server-uri https://localhost:8444 --no-reject-unauthorized --ssl-key /home/alfa/solid-vaultage/server.key --ssl-cert /home/alfa/solid-vaultage/server.crt --root /home/alfa/solid-vaultage/solid-alice/data &

# solid-test start --port 8445 --server-uri https://localhost:8445 --no-reject-unauthorized --ssl-key /home/alfa/solid-vaultage/server.key --ssl-cert /home/alfa/solid-vaultage/server.crt --root /home/alfa/solid-vaultage/solid-bob/data &


# run code on self-signed localhost solid node server, all the three variables should be defined2
export NODE_TLS_REJECT_UNAUTHORIZED=0 SOLID_USERNAME=alfa SOLID_PASSWORD=Lololol3x! SOLID_IDP=https://localhost:8443 && node index-localhost-alfa.js
