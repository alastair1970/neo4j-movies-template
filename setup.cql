// setup for movie template 

CREATE CONSTRAINT FOR (n:Movie) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT FOR (n:Person) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT FOR (n:Keyword) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT FOR (n:User) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT FOR (n:User) REQUIRE n.username IS UNIQUE;

CREATE CONSTRAINT FOR (n:Genre) REQUIRE n.id IS UNIQUE;

CREATE CONSTRAINT FOR ()-[r:RATED]-() REQUIRE  (r.rating) is not null;

LOAD CSV WITH HEADERS FROM 'https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/ratings.csv' AS line
MATCH (m:Movie {id:toInteger(line.movie_id)})  
MERGE (u:User {id:line.user_id, username:line.user_username}) // user ids are strings
MERGE (u)-[r:RATED]->(m)
SET r.rating = toInteger(line.rating)
RETURN m.title, r.rating, u.username;
