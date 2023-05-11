/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import 'react-native-gesture-handler';
import React, {useState, useEffect, useRef} from 'react';
//import {StyleSheet, AsyncStorage} from 'react-native';
import {StyleSheet} from 'react-native';
import {decode, encode} from 'base-64';

//import React, {useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Login from './screens/Login';
import SplashScreen from './screens/SplashScreen';

import FirstScreen from './screens/FirstScreen';
import EmployeeInfo from './screens/EmployeeInfo';
import FLListView from './screens/FLListView';
import StrFLListView from './screens/StrFLListView';
import DiscrepancyListView from './screens/DiscrepancyListView';
import QueriesListView from './screens/QueriesListView';
import WorkSummary from './screens/WorkSummary';
import PatrollingScreen from './screens/PatrollingScreen';
import DiscrepancyScreen from './screens/DiscrepancyScreen';
import RectificationScreen from './screens/RectificationScreen';
import QueriesScreen from './screens/QueriesScreen';
import WorkLocation from './screens/WorkLocation';
import Dashboard2 from './screens/Dashboard2';
import LocationEnabler from 'react-native-location-enabler';

const {
  PRIORITIES: {HIGH_ACCURACY},
  useLocationSettings,
} = LocationEnabler;

const Stack = createStackNavigator();

const App = ({navigation}) => {
  const [enabled, requestResolution] = useLocationSettings(
    {
      priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
      alwaysShow: true, // default false
      needBle: true, // default false
    },
    false /* optional: default undefined */,
  );

  useEffect(() => {
    if (!enabled) {
      requestResolution();
    }
  }, []);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={FirstScreen}>
        <Stack.Screen
          key="FirstScreen"
          name="FirstScreen"
          component={FirstScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="SplashScreen"
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="Dashboard2"
          name="Dashboard2"
          component={Dashboard2}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="Login"
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="EmployeeInfo"
          name="EmployeeInfo"
          component={EmployeeInfo}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="FLListView"
          name="FLListView"
          component={FLListView}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="StrFLListView"
          name="StrFLListView"
          component={StrFLListView}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="DiscrepancyListView"
          name="DiscrepancyListView"
          component={DiscrepancyListView}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="QueriesListView"
          name="QueriesListView"
          component={QueriesListView}
          options={{headerShown: false}}
        />
        <Stack.Screen
          key="WorkSummary"
          name="WorkSummary"
          component={WorkSummary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          key="PatrollingScreen"
          name="PatrollingScreen"
          component={PatrollingScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          key="DiscrepancyScreen"
          name="DiscrepancyScreen"
          component={DiscrepancyScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="RectificationScreen"
          name="RectificationScreen"
          component={RectificationScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="QueriesScreen"
          name="QueriesScreen"
          component={QueriesScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          key="WorkLocation"
          name="WorkLocation"
          component={WorkLocation}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 1,
  },
});
export default App;
