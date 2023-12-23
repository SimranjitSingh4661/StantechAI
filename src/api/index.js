import Config from 'react-native-config';

export const fetchData = async (origin, destination, mode) => {
  try {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${Config.GOOGLE_API_KEY}&mode=${mode}`,
    );

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const convertedData = data?.routes?.[0]?.legs?.[0]?.steps?.map(step => ({
      latitude: step.end_location.lat,
      longitude: step.end_location.lng,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    }));

    return convertedData;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};
