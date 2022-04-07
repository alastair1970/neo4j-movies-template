import * as Types from './ProfileTypes';

export function getProfile                              (){return{type: Types.PROFILE_GET};}
export function getProfileSuccess                (payload){return{type: Types.PROFILE_GET_SUCCESS, payload};}
export function getProfileFailure                  (error){return{type: Types.PROFILE_GET_FAILURE, error};}

export function createProfileInit_0                     (){return{type: Types.PROFILE_CREATE_INIT_0};}
export function createProfile_0                  (payload){return{type: Types.PROFILE_CREATE_0, payload};}
export function createProfileSuccess_0           (payload){return{type: Types.PROFILE_CREATE_SUCCESS_0, payload};}
export function createProfileFailure_0             (error){return{type: Types.PROFILE_CREATE_FAILURE_0, error};}

export function createProfileInit_1                     (){return{type: Types.PROFILE_CREATE_INIT_1};}
export function createProfile_1                  (payload){return{type: Types.PROFILE_CREATE_1, payload};}
export function createProfileSuccess_1           (payload){return{type: Types.PROFILE_CREATE_SUCCESS_1, payload};}
export function createProfileFailure_1             (error){return{type: Types.PROFILE_CREATE_FAILURE_1, error};}

export function getProfileRatings                       (){return{type: Types.PROFILE_GET_RATINGS};}
export function getProfileRatingsSuccess         (payload){return{type: Types.PROFILE_GET_RATINGS_SUCCESS, payload};}
export function getProfileRatingsFailure                (){return{type: Types.PROFILE_GET_RATINGS_FAILURE};}

export function profileRateMovie              (id, rating){return{type: Types.PROFILE_MOVIE_RATE, id, rating};}
export function profileRateMovieSuccess                 (){return{type: Types.PROFILE_MOVIE_RATE_SUCCESS};}
export function profileRateMovieFailure                 (){return{type: Types.PROFILE_MOVIE_RATE_FAILURE};}

export function profileDeleteMovieRating              (id){return{type: Types.PROFILE_MOVIE_DELETE_RATING, id};}
export function profileDeleteMovieRatingSuccess         (){return{type: Types.PROFILE_MOVIE_DELETE_RATING_SUCCESS};}
export function profileDeleteMovieRatingFailure         (){return{type: Types.PROFILE_MOVIE_DELETE_RATING_FAILURE};}

export function getProfileRecommendations             (id){return{type: Types.PROFILE_GET_RECOMMENDATIONS, id};}
export function getProfileRecommendationsSuccess (payload){return{type: Types.PROFILE_GET_RECOMMENDATIONS_SUCCESS, payload};}
export function getProfileRecommendationsFailure        (){return{type: Types.PROFILE_GET_RECOMMENDATIONS_FAILURE };}

