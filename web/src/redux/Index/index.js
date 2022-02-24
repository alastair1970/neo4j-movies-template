import {all, fork} from 'redux-saga/effects';

import errorFlow   from '../Notification/notificationFlow';
import authFlow    from '../Auth/authFlow';
import profileFlow from '../Profile/profileFlow';
import signupFlow  from '../Profile/signupFlow';
import movieFlow   from '../Movie/movieFlow';
import actionFlow  from '../Action/actionFlow';
import personFlow  from '../Person/personFlow';

export default function* root() {
  yield all([
    fork(errorFlow),
    fork(authFlow),
    fork(profileFlow),
    fork(signupFlow),
    fork(movieFlow),
    fork(actionFlow),
    fork(personFlow)
  ]);
}
