import { NativeEventEmitter, NativeModules } from 'react-native';

const { BatteryStatusModule } = NativeModules;

const batteryOptimizationEvents = new NativeEventEmitter(BatteryStatusModule);

export const checkBatteryOptimization = () => {
  return BatteryStatusModule.getBatteryOptimizationStatus();
};

export const subscribeToBatteryOptimizationStatus = (callback) => {
  return batteryOptimizationEvents.addListener('BatteryOptimizationStatus', callback);
};
