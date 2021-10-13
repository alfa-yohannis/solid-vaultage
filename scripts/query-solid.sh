comunica-sparql-solid --idp https://solidcommunity.net/ \
  https://alfa.solidcommunity.net/profile/card#me \
  "SELECT * WHERE {
       ?s ?p ?o
   } LIMIT 100"

comunica-sparql-solid --idp https://localhost:8443/ \
  https://localhost:8443/profile/card#me \
  "SELECT * WHERE {
       ?s ?p ?o
   } LIMIT 100"

comunica-sparql-solid --idp https://solidcommunity.net/ \
  https://alfa.solidcommunity.net/private/test.ttl \
  "INSERT DATA { <ex:s> <ex:p> <ex:o> }"

comunica-sparql-solid --idp https://localhost:8443/ \
  https://localhost:8443/private/test.ttl \
  "INSERT DATA { <ex:s> <ex:p> <ex:o> }"

