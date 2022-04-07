import * as Types from './ProfileTypes';
import {LOGOUT} from '../Auth/AuthTypes';
import ErrorUtils from '../../utils/ErrorUtils';

function getInitialState() {
  return {
    isFetching: false,
    profile: null,
    ratedMovies: [],
    recommendedMovies: [],

    isSaving_1: false,
    savedProfile_1: null,
    errors_1: {}

  };
}

export default function profile(state = getInitialState(null), action) {
  switch (action.type) {
    case LOGOUT:
      return getInitialState();
    default:
      return state;
    case Types.PROFILE_GET:
    case Types.PROFILE_GET_RATINGS:
    case Types.PROFILE_GET_RECOMMENDATIONS:
      return {
        ...state,
        isFetching: true
      };
    case Types.PROFILE_GET_FAILURE:
    case Types.PROFILE_GET_RATINGS_FAILURE:
    case Types.PROFILE_GET_RECOMMENDATIONS_FAILURE:
      return {
        ...state,
        isFetching: false
      };
    case Types.PROFILE_GET_SUCCESS:
      return {
        ...state,
        isFetching: false,
        profile: action.payload
      };
    case Types.PROFILE_GET_RATINGS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        ratedMovies: action.payload
      };
    case Types.PROFILE_GET_RECOMMENDATIONS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        recommendedMovies: action.payload
      };

      case Types.PROFILE_CREATE_INIT_1:
        return getInitialState();
      case Types.PROFILE_CREATE_1:
        return {
          ...state,
          isSaving_1: true
        };
      case Types.PROFILE_CREATE_SUCCESS_1:
        return {
          ...state,
          isSaving_1: false,
          savedProfile_1: action.payload
        };
      case Types.PROFILE_CREATE_FAILURE_1:
        return {
          isSaving_1: false,
          savedProfile_1: null,
          errors_1: ErrorUtils.getApiErrors(action.error)
        };
  
  }
}


