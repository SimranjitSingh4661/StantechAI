import {Platform} from 'react-native';
import {requestMultiple, PERMISSIONS, RESULTS} from 'react-native-permissions';

export async function getPermission() {
  let isBlockCase = false,
    isDenyCase = false;

  try {
    const permissionArray = Platform.select({
      android: [
        PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
      ],
      ios: [],
    });
    const statuses = await requestMultiple(permissionArray);
    console.log({statuses});
    for (let i = 0; i < permissionArray.length; i++) {
      if (
        statuses[permissionArray[i]] === RESULTS.BLOCKED ||
        statuses[permissionArray[i]] === RESULTS.LIMITED
      ) {
        isBlockCase = true;
        break;
      } else if (statuses[permissionArray[i]] !== RESULTS.GRANTED) {
        isDenyCase = true;
        break;
      }
    }
  } catch (err) {
    console.log('getPermission-error', err);
  }
  return isBlockCase || isDenyCase
    ? {status: false, isBlocked: isBlockCase ? true : false}
    : {status: true};
}
