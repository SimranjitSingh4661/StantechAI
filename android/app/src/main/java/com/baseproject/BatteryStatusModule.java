// BatteryStatusModule.java
package com.baseproject;

import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.PowerManager;
import android.provider.Settings;

import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.facebook.react.bridge.ReactMethod;


public class BatteryStatusModule extends ReactContextBaseJavaModule {
    public BatteryStatusModule(ReactApplicationContext reactContext) {
        super(reactContext);
    }

    @Override
    public String getName() {
        return "BatteryStatusModule";
    }

    @ReactMethod
    public void getBatteryOptimizationStatus() {
        boolean isBatteryOptimizationOn = isBatteryOptimizationEnabled();
        sendEvent("batteryOptimizationStatus", isBatteryOptimizationOn);
    }

    private boolean isBatteryOptimizationEnabled() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
            PowerManager pm = (PowerManager) getReactApplicationContext().getSystemService(Context.POWER_SERVICE);
            return pm.isIgnoringBatteryOptimizations(getReactApplicationContext().getPackageName());
        } else {
            // For devices below Marshmallow, there's no battery optimization
            return false;
        }
    }

    private void sendEvent(String eventName, boolean isBatteryOptimizationOn) {
        getReactApplicationContext()
                .getJSModule(DeviceEventManagerModule.RCTDeviceEventEmitter.class)
                .emit(eventName, isBatteryOptimizationOn);
    }
}
