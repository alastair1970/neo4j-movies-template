import * as Types from './ProfileTypes';
import ErrorUtils from '../../utils/ErrorUtils';

function getInitialState() {
  return {
    isSaving_0: false,
    savedProfile_0: null,
    errors_0: {}
  };
}

export default function createProfile(state = getInitialState(), action) {
  switch (action.type) {
    case Types.PROFILE_CREATE_INIT:
      return getInitialState();
    case Types.PROFILE_CREATE:
      return {
        ...state,
        isSaving_0: true
      };
    case Types.PROFILE_CREATE_SUCCESS:
      return {
        ...state,
        isSaving_0: false,
        savedProfile_0: action.payload
      };
    case Types.PROFILE_CREATE_FAILURE:
      return {
        isSaving_0: false,
        savedProfile_0: null,
        errors_0: ErrorUtils.getApiErrors(action.error)
      };
    default:
      return state;
  }
}
