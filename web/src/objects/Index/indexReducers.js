import {combineReducers} from 'redux';
import {connectRouter}   from 'connected-react-router'
import signup            from '../Profile/signupReducers';
import genres            from '../Movie/genreReducers';
import notifications     from '../Notification/notificationReducers';
import auth              from '../Auth/authReducers';
import profile           from '../Profile/profileReducers';
import movies            from '../Movie/movieReducers';
import actions           from '../Action/actionReducers';
import person            from '../Person/personReducers';

const createRootReducer = (history) => combineReducers({
  router: connectRouter(history),
  notifications,
  auth,
  signup,
  profile,
  genres,
  movies,
  actions,
  person
});

export default createRootReducer;
