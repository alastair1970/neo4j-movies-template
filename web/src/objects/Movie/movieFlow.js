import {all, call, put, takeEvery} from 'redux-saga/effects';
import MovieApi from './MovieApi';
import * as Actions from './MovieActions';
import * as Types from './MovieTypes';

export default function* movieFlow() {
  yield all([
    takeEvery(Types.MOVIE_GENRES_GET_REQUEST    , getGenres        ),
    takeEvery(Types.MOVIES_BY_GENRES_GET_REQUEST, getMoviesByGenre ),
    takeEvery(Types.MOVIES_FEATURED_GET_REQUEST , getFeaturedMovies),
    takeEvery(Types.MOVIE_DETAIL_GET_REQUEST    , getMovie         ),
    takeEvery(Types.MOVIE_RATE                  , rateMovie        ),
    takeEvery(Types.MOVIE_DELETE_RATING         , deleteRating     ),
    takeEvery(Types.SET_MOVIE_STATE             , setMovieState    ),
  ]);
}

function* getGenres() {
  try {
    const response = yield call(MovieApi.getGenres);
    yield put(Actions.getGenresSuccess(response));
  }
  catch (error) {
    yield put(Actions.getGenresFailure(error));
  }
}

function* getMoviesByGenre(action) {
  var {names} = action;
  try {
    const response = yield call(MovieApi.getMoviesByGenres, names);
    yield put(Actions.getMoviesByGenresSuccess(response));
  }
  catch (error) {
    yield put(Actions.getMoviesByGenresFailure(error));
  }
}

function* getFeaturedMovies() {
  try {
    const response = yield call(MovieApi.getFeaturedMovies);
    yield put(Actions.getFeaturedMoviesSuccess(response));
  }
  catch (error) {
    yield put(Actions.getFeaturedMoviesFailure(error));
  }
}

function* getMovie(action) {
  var {id} = action;
  try {
    const response = yield call(MovieApi.getMovie, id);
    yield put(Actions.getMovieSuccess(response));
  }
  catch (error) {
    yield put(Actions.getMovieFailure(error));
  }
}

function* rateMovie(action) {
  var {id, rating} = action;
  try {
    const response = yield call(MovieApi.rateMovie, id, rating);
    yield put(Actions.rateMovieSuccess(response));
    yield put(Actions.getMovie(id));
  }
  catch (error) {
    yield put(Actions.rateMovieFailure(error));
  }
}

function* deleteRating(action) {
  var {id} = action;
  try {
    const response = yield call(MovieApi.deleteRating, id);
    yield put(Actions.deleteMovieRatingSuccess(response));
    yield put(Actions.getMovie(id));
  }
  catch (error) {
    yield put(Actions.deleteMovieRatingFailure(error));
  }
}

function* setMovieState(action) {
  var {id,state} = action;
  try {
    const response = yield call(MovieApi.setMovieState,id,state);
    yield put(Actions.setMovieStateSuccess(response));
  }
  catch (error) {
    yield put(Actions.setMovieStateFailure(error));
  }
}
