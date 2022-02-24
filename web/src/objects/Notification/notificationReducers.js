import _ from 'lodash';
import { NotificationTypes } from './NotificationTypes';

export default function notifications(state = [], action) {
  switch (action.type) {
    case NotificationTypes.CREATE_NOTIFICATION:
      return [
        ...state,
        {...action.notification}
      ];
    case NotificationTypes.DISMISS_NOTIFICATION:
      return _.without(state, action.notification);
    default:
      return state;
  }
}
