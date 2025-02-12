import settings from '../../config/settings';
import axios from '../Index/axios';
import _ from 'lodash';

const {apiBaseURL} = settings;

export default class MoviesApi {
  static getGenres() {
    return axios.get(`${apiBaseURL}/genres`);
  }

  static getMoviesByGenres(genreNames) {
    return MoviesApi.getGenres()
      .then(genres => {
        var movieGenres = _.filter(genres, g => {
          return genreNames.indexOf(g.name) > -1;
        });
        return Promise.all(
          movieGenres.map(genre => {
              return axios.get(`${apiBaseURL}/movies/genre/${genre.id}/`);
            }
          ))
          .then(genreResults => {
            var result = {};
            genreResults.forEach((movies, i) => {
              result[movieGenres[i].name] = movies;
            });
            return result;
          });
      });
  }

  // convert this to top 3 most rated movies
  static getFeaturedMovies() {
    return Promise.all([
      axios.get(`${apiBaseURL}/movies/28`),
      axios.get(`${apiBaseURL}/movies/737`),
      axios.get(`${apiBaseURL}/movies/471`)
    ]);
  }

  static getMovie            (id){ return axios.get   (`${apiBaseURL}/movies/${id}`); }
  static rateMovie   (id, rating){ return axios.post  (`${apiBaseURL}/movies/${id}/rate`, {rating}); }
  static deleteRating        (id){ return axios.delete(`${apiBaseURL}/movies/${id}/rate`); }
  static setMovieState(id, state){ return axios.post  (`${apiBaseURL}/movies/${id}/state`, {state}); }

}


