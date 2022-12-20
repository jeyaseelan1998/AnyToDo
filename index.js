/**
 * @format
 */
import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {notificationObject} from './src/utils/RNPushNotification.helper';

PushNotification.configure({
  onAction: notification => {
    if (notification.action === 'Done') {
      console.log('done clicked, try out in physical device');
      PushNotification.invokeApp(notification);
    } else {
      PushNotification.removeAllDeliveredNotifications();
      notificationObject(
        notification.id,
        notification.channelId,
        notification.title,
        notification.bigText,
        notification.message,
        notification.color,
        notification.largeIconUrl,
      );
      console.log('Snoozed for 1min');
    }
  },
  onRegister: function (token) {
    console.log('TOKEN:', token);
  },
  onNotification: function (notification) {
    console.log('NOTIFICATION:', notification);
  },

  onRegistrationError: function (err) {
    console.error(err.message, err, 'unexpected error occured');
  },

  popInitialNotification: true,

  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, FCM_TOKEN => App);
