// convenience wrapper around all other files:
exports.site    = require('./site');
exports.users   = require('./users/usersRoute');
exports.people  = require('./persons/personsRoute');
exports.movies  = require('./movies/moviesRoute');
exports.genres  = require('./genres/genresRoute');
exports.actions = require('./actions/actionsRoute');