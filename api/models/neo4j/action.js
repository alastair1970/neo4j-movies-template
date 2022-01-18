// extracts just the data from the query results
const _ = require('lodash');

const Action = module.exports = function (_node) {
  _.extend(this, _node.properties);
  
};
