// extracts just the data from the query results

const _ = require('lodash');

const Person = module.exports = function (_node) {
  _.extend(this, _node.properties);

  if (this.id) { 
    this.id = this.id.toNumber();
  } else {
    this.id = _node.identity.low;
  };

  // this.id = this.id;
  this.poster_image = this.poster_image;
};
