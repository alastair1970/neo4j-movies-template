const _ = require('lodash');
const Genre = require('./genresNeo4j');

const getAll = function(session) {
  return session.readTransaction(txc =>
      txc.run('MATCH (genre:Genre) RETURN genre')
    ).then(_manyGenres);
};

const _manyGenres = function (result) {
  return result.records.map(r => new Genre(r.get('genre')));
};

module.exports = {
  getAll: getAll
};
