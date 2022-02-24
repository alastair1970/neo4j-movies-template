import {combineReducers} from 'redux';
import { connectRouter } from 'connected-react-router'
import signup            from '../Profile/signupReducers';
import genres            from '../Movie/genresReducers';
import notifications     from '../Notification/notificationsReducers';
import auth              from '../Auth/authReducers';
import profile           from '../Profile/profileReducers';
import movies            from '../Movie/moviesReducers';
import actions           from '../Action/actionsReducers';
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
