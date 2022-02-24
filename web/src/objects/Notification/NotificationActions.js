import _ from 'lodash';
import {NotificationTypes, NotificationType} from './NotificationTypes';

export function create(type, message) {
  return {
    type: NotificationTypes.CREATE_NOTIFICATION,
    notification: {
      id: _.uniqueId(),
      message,
      type
    }
  };
}

export function createError(message) {
  return {
    type: NotificationTypes.CREATE_NOTIFICATION,
    notification: {
      id: _.uniqueId(),
      message,
      type: NotificationType.error
    }
  };
}

export function createSuccess(message) {
  return {
    type: NotificationTypes.CREATE_NOTIFICATION,
    notification: {
      id: _.uniqueId(),
      message,
      type: NotificationType.success
    }
  };
}

export function dismiss(notification) {
  return {
    type: NotificationTypes.DISMISS_NOTIFICATION,
    notification
  };
}
