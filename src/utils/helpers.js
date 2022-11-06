import {Alert, Platform, PermissionsAndroid, Linking} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

// Check App Platform
const checkPlatform = () => {
  if (Platform.OS === 'android') {
    return 'android';
  } else {
    return 'ios';
  }
};


// Permission type
const permissionType = {
  location: 'location',
};

// Location Permission
const platformLocationPermissionType = {
  ios: PERMISSIONS.IOS.LOCATION_ALWAYS,
  android: PERMISSIONS.ANDROID.ACCESS_COARSE_LOCATION,
};

// Request permission type
const requestPermissionType = {
  location: platformLocationPermissionType,
};

// App permission function
const appPermission = async type => {
  const permissions = requestPermissionType[type][checkPlatform()];
  if (!permissions) {
    return true;
  }
  try {
    const result = await check(permissions);
    if (result === RESULTS.GRANTED) {
      return true;
    }

    return requestPermission(permissions);
  } catch (error) {
    return false;
  }
};

// Request permission function
const requestPermission = async permissions => {
  try {
    const result = await request(permissions);

    return result === RESULTS.GRANTED;
  } catch (error) {
    return false;
  }
};
export {
  checkPlatform,
  appPermission,permissionType
};
