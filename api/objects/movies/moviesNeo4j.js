// extracts just the data from the query results

const { isNumber } = require('lodash');
const _ = require('lodash');

const Movie = module.exports = function (_node, myRating) {
  _.extend(this, _node.properties);

  // this.id = this.id;

  if (this.id) { 
    this.id = this.id.toNumber();
  } else {
    this.id = _node.identity.low;
  };

  this.poster_image = this.poster_image;
  this.tagline = this.tagline;

  if (this.duration) { 
    if(!isNumber(this.duration)){
      this.duration = this.duration.toNumber();
    }
  } else if (this.runtime) {
    this.duration = this.runtime.low;
  }

  if(myRating || myRating === 0) {
    this['my_rating'] = myRating;
  }
};
