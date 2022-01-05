// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Craig Miller
// 01/10/2017
// File   : UploadAllCsvFiles.cql
// Project: neo4j-movies-template
// Model  : 3 nodes: Person, Movie, Genre
//          6 relations
// Note   : 1. use CONSTRAINT to handle missing (also creates index)
//          2. small files so no need to chunk (USING PERIODIC COMMIT 1000)
// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Neo4j 3.1.0 Enterprise server is restricted, by default, to import
// from the %NEO4J_HOME%/import directory, so copy all your csv file
// to that directory before running this script

// ==================================================================
// clear the existing database (a better approach would be to delete the %NEO4J_HOME%/data/database/graph.db file)
MATCH (n)
WITH n LIMIT 10000
OPTIONAL MATCH (n)-[r]->()
DELETE n,r;

// test
//LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/person_node.csv" AS r FIELDTERMINATOR ';'
//WITH r LIMIT 10 WHERE r.`id:ID(Person)` IS NOT NULL
//RETURN r.`id:ID(Person)`, r.name, r.`born:int`, r.poster_image

// test property array
//LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/acted_in_rels.csv" AS r FIELDTERMINATOR ';'
//WITH r LIMIT 10
//RETURN r.`:START_ID(Person)`, r.`:END_ID(Movie)`, SPLIT(r.role, '/')

// Upload nodes ------------------------------------------------------
CREATE CONSTRAINT FOR (g:Genre) REQUIRE g.id IS UNIQUE;
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/genre_node.csv" AS r FIELDTERMINATOR ';'
CREATE (g:Genre {
  id: toInteger(r.`id:ID(Genre)`),
  name: r.name
});

// Upload nodes ------------------------------------------------------
CREATE CONSTRAINT FOR (k:Keyword) REQUIRE k.id IS UNIQUE;
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/keyword_node.csv" AS r FIELDTERMINATOR ';'
CREATE (k:Keyword {
  id: toInteger(r.`id:ID(Keyword)`),
  name: r.name
});

// Upload nodes ------------------------------------------------------
CREATE CONSTRAINT FOR (m:Movie) REQUIRE m.id IS UNIQUE;
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/movie_node.csv" AS r FIELDTERMINATOR ';'
CREATE (m:Movie {
  id: toInteger(r.`id:ID(Movie)`),
  title: r.title,
  tagline: r.tagline,
  summary: r.summary,
  poster_image: r.poster_image,
  duration: toInteger(r.`duration:int`),
  rated: r.rated
});

// ------------------------------------------------------
CREATE CONSTRAINT FOR (p:Person) REQUIRE p.id IS UNIQUE;
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/person_node.csv" AS r FIELDTERMINATOR ';'
CREATE (p:Person {
  id: toInteger(r.`id:ID(Person)`),
  name: r.name,
  born: toInteger(r.`born:int`),
  poster_image: r.poster_image
});

// Movie-[:HAS_GENRE]->Genre
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/has_genre_rels.csv" AS r FIELDTERMINATOR ';'
MATCH (m:Movie {id: toInteger(r.`:START_ID(Movie)`)}), (g:Genre {id: toInteger(r.`:END_ID(Genre)`)})
CREATE (m)-[:HAS_GENRE]->(g);

// Movie-[HAS_KEYWORD]->Keyword
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/has_keyword_rels.csv" AS r FIELDTERMINATOR ';'
MATCH (m:Movie {id: toInteger(r.`:START_ID(Movie)`)}), (k:Keyword {id: toInteger(r.`:END_ID(Keyword)`)})
CREATE (m)-[:HAS_KEYWORD]->(k);

// Person-[WRITER_OF]->Movie
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/writer_of_rels.csv" AS r FIELDTERMINATOR ';'
MATCH (p:Person {id: toInteger(r.`:START_ID(Person)`)}), (m:Movie {id: toInteger(r.`:END_ID(Movie)`)})
CREATE (p)-[:WRITER_OF]->(m);

// Person-[PRODUCED]->Movie
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/produced_rels.csv" AS r FIELDTERMINATOR ';'
MATCH (p:Person {id: toInteger(r.`:START_ID(Person)`)}), (m:Movie {id: toInteger(r.`:END_ID(Movie)`)})
CREATE (p)-[:PRODUCED]->(m);

// Person-[DIRECTED]->Movie
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/directed_rels.csv" AS r FIELDTERMINATOR ';'
MATCH (p:Person {id: toInteger(r.`:START_ID(Person)`)}), (m:Movie {id: toInteger(r.`:END_ID(Movie)`)})
CREATE (p)-[:DIRECTED]->(m);

// Person-[ACTED_IN]->Movie.   Note: relationship property 'role' is an array
LOAD CSV WITH HEADERS FROM "https://raw.githubusercontent.com/alastair1970/neo4j-movies-template/master/csv/acted_in_rels.csv" AS r FIELDTERMINATOR ';'
MATCH (p:Person {id: toInteger(r.`:START_ID(Person)`)}), (m:Movie {id: toInteger(r.`:END_ID(Movie)`)})
CREATE (p)-[:ACTED_IN{role:SPLIT(r.role, '/')}]->(m);


