import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image,
  Text,
  Animated,
} from 'react-native';
//import {Icon} from 'react-native-elements';

import AsyncStorage from 'react-native-encrypted-storage';
import Moment from 'moment';

const SplashScreen = ({navigation}) => {
  const width = new Animated.Value(360);
  const height = new Animated.Value(600);
  const [animating, setAnimating] = useState(true);

  let vPlanDateTime = null;
  let vCurrentDate = null;

  let vUserName = null;
  let vUserPass = null;
  let dataN = null;

  navigation.navigate('Login');

  const getAsyncData = async () => {
    try {
      const uservalue = await AsyncStorage.getItem('User');

      let data = uservalue != null ? JSON.parse(uservalue) : null;

      console.log('datadata: ' + data);

      navigation.navigate('Login');

      if (data) {
        navigation.navigate('Menu');
      } else {
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log('******************error************' + error);
      return null;
    }
  };

  useEffect(() => {
    Animated.timing(width, {
      toValue: 360,
      duration: 450,
    }).start();
    Animated.timing(height, {
      toValue: 750,
      duration: 10000,
    }).start();

    setTimeout(() => {
      setAnimating(false);
      getAsyncData();
    }, 3000);
  }, []);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/logo2.png')}
        resizeMode="center"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});

export default SplashScreen;
