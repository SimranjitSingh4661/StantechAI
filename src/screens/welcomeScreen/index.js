import React, {useEffect, useState, useRef, useCallback} from 'react';
import {View, Alert, Linking, AppState} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker, Polyline} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Config from 'react-native-config';

import {fetchData} from '../../api';
import {getUserCurrentLocation, getPermission} from '../../utils';
import {COLORS, STRINGS} from '../../constants';
import {Button} from '../../components/atoms';
import {TriIcon} from '../../asstes/SVGs';
import styles from './styles';

//Origin Cord. can be dyanamic via api data
const origin = {
  latitude: 30.740009716302577,
  longitude: 76.77443675114384,
  latitudeDelta: 0.015,
  longitudeDelta: 0.0121,
};
const MODE = 'driving';

const WelcomeScreen = () => {
  const lastState = useRef('background');
  const [isGranted, setIsGranted] = useState(null);
  const [loading, setLoading] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [pickedLocation, setPickedLocation] = useState(origin);
  const mapRef = useRef(null);

  useEffect(() => {
    //Event listener to get user location
    const subscription = AppState.addEventListener('change', current => {
      if (lastState.current === 'background' && current === 'active') {
        if (isGranted === false) {
          setLoading(false);
        }
      }
      lastState.current = current;
    });

    // Initial get location call
    fetchLocationDetails();
    // Get user's location every 10 minutes
    const intervalId = setInterval(() => {
      fetchLocationDetails();
    }, 10 * 60 * 1000);
    // }, 5000);

    return () => {
      subscription.remove();
      clearInterval(intervalId);
    };
  }, [isGranted]);

  //Asking user again if he block or deny the loc permission
  useEffect(() => {
    if (!loading && !isGranted) {
      setLoading(true);
      setIsGranted(null);
      getPermission().then(response => {
        if (!response.status) {
          if (response.isBlocked) {
            Alert.alert({
              title: STRINGS.ERROR.TITLE,
              message: STRINGS.ERROR.MESSAGE,
              onSuccess: () => {
                Linking.openSettings().then(_ => {
                  setIsGranted(response.status);
                });
              },
            });
          } else {
            Alert.alert({
              title: STRINGS.ERROR.TITLE,
              message: STRINGS.ERROR.MESSAGE,
              onSuccess: () => {
                setIsGranted(response.status);
                setLoading(false);
              },
            });
          }
        } else {
          setIsGranted(true);
          setLoading(true);
        }
      });
    }
  }, [isGranted, loading]);

  const fetchLocationDetails = useCallback(async () => {
    try {
      if (!isGranted) return;
      const locationRes = await getUserCurrentLocation();
      const latitude = locationRes.latitude || 30.73765339886571;
      const longitude = locationRes.longitude || 76.77815717912343;
      setPickedLocation({
        latitude,
        longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      });
      const markerData = await fetchData(
        `${origin.latitude},${origin.longitude}`,
        `${latitude},${longitude}`,
        MODE,
      );
      setMarkers(markerData);
    } catch (err) {}
  }, [isGranted]);

  const onDestinationPress = () => {
    mapRef.current?.animateToRegion(pickedLocation);
  };

  const onOriginPress = async () => {
    mapRef.current?.animateToRegion(origin);
  };

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef}
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        region={origin}>
        {/* origin location Marker */}
        <Marker coordinate={origin} />
        {markers?.map((mark, index) => {
          return (
            <Marker key={`marker_${index}`} coordinate={mark}>
              <TriIcon />
            </Marker>
          );
        })}
        <MapViewDirections
          lineCap="round"
          strokeWidth={3}
          destination={origin}
          strokeColor={COLORS.RED}
          origin={pickedLocation}
          mode={MODE.toUpperCase()}
          apikey={Config.GOOGLE_API_KEY}
        />
      </MapView>
      <View style={styles.buttonContainer}>
        <Button onPress={onOriginPress} text={'origin'} />
        <Button onPress={onDestinationPress} text={'destination'} />
      </View>
    </View>
  );
};

export default WelcomeScreen;
