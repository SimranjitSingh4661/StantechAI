import GetLocation from 'react-native-get-location';

export const getUserCurrentLocation = () => {
  return new Promise((resolve, reject) => {
    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 15000,
    })
      .then(location => {
        resolve(location);
      })
      .catch(error => {
        const {code, message} = error;
        reject(message);
      });
  });
};
