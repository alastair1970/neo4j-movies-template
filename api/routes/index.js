// convenience wrapper around all other files:
exports.site     = require('./site');
exports.genres   = require('../objects/genres/genresRoutes');
exports.actions  = require('../objects/actions/actionsRoutes');
exports.movies   = require('../objects/movies/moviesRoutes');
exports.persons  = require('../objects/persons/personsRoutes');
exports.users    = require('../objects/users/usersRoutes');
