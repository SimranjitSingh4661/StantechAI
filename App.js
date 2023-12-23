import React, {useEffect, useState} from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import AppNavigator from './src/navigation';
import {
  checkBatteryOptimization,
  subscribeToBatteryOptimizationStatus,
} from './src/services/batteryModule';
import {enableLatestRenderer} from 'react-native-maps';

enableLatestRenderer();

const App = () => {
  const [batteryOptimizationEnabled, setBatteryOptimizationEnabled] =
    useState(false);

  useEffect(() => {
    // Check battery optimization status initially
    checkBatteryOptimization()?.then(status => {
      setBatteryOptimizationEnabled(status);
    });

    // Subscribe to battery optimization status changes
    const subscription = subscribeToBatteryOptimizationStatus(status => {
      setBatteryOptimizationEnabled(status);
    });

    // Clean up the subscription when the component unmounts
    return () => {
      subscription.remove();
    };
  }, []);

  return (
    <SafeAreaProvider>
      <AppNavigator />
    </SafeAreaProvider>
  );
};

export default App;
