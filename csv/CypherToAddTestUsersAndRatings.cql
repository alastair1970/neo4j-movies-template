// setup for movie template 

MATCH (n:User)
WITH n LIMIT 10000
OPTIONAL MATCH (n)-[r]->()
DELETE n,r;

DROP CONSTRAINT unique_User_id       IF EXISTS;
DROP CONSTRAINT unique_User_username IF EXISTS;
DROP CONSTRAINT exists_RATED_rating  IF EXISTS;

CREATE CONSTRAINT unique_User_id       FOR (n:User) REQUIRE n.id IS UNIQUE;
CREATE CONSTRAINT exists_RATED_rating  FOR ()-[r:RATED]-() REQUIRE (r.rating) is not null;

LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/ratings.csv' AS line
MATCH (m:Movie {id:toInteger(line.movie_id)})  
MERGE (u:User {id:line.user_id, username:line.user_username}) // user ids are strings
MERGE (u)-[r:RATED]->(m)
SET r.rating = toInteger(line.rating)
RETURN m.title, r.rating, u.username;

CREATE CONSTRAINT unique_User_username FOR (n:User) REQUIRE n.username IS UNIQUE;