/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';

import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  //AsyncStorage,
  Image,
  ImageBackground,
  LogBox,
} from 'react-native';
import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';
//import Config from 'react-native-config';
import Moment from 'moment';
import DeviceInfo from 'react-native-device-info';
//import { getUniqueId, getManufacturer } from 'react-native-device-info';

import {and} from 'react-native-reanimated';

const base64 = require('base-64');

// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
function FirstScreen({navigation}) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const [UniqueId, setUniqueId] = useState('');

  const item = {};
  const LoginRequest = (
    back,
    backPinGeneration,
    name,
    userPassword,
    btnType,
    loader,
  ) => {
    if (btnType == 'About') {
      navigation.reset({
        index: 0,
        routes: [{name: 'EmployeeInfo'}],
      });
      return;
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });
      return;
    }

    console.log('HELLO THERE');
    // alert("name", name); alert("userPassword", userPassword);

    if (name == '') {
      // loader();
      setError('Enter User Name');
      setModalVisible(true);
      loader();

      return;
    }
    if (userPassword == '') {
      // loader();
      setError('Enter Password');
      setModalVisible(true);
      loader();
      return;
    }

    /*
         if (name != null  &&  userPassword!= null) {
          // loader();
           
            setError('');
             setModalVisible(false);
             navigation.reset({
              index: 0,
              routes: [{name: 'Menu'}],
            });
         }
          */

    //var apiURLN=Config.API_LoginURL;
    // console.log("apiURLN", apiURLN);

    // AsyncStorage.setItem('User', JSON.stringify(name));
  };

  useEffect(() => {
    /* AsyncStorage.getItem('User').then(items => {
     
          // var datatable = [];
          console.log(items);
        if (items) {
            navigation.reset({
              index: 0,
              routes: [{ name: 'Menu' }],
            });
          }
        });
    */
    /*
        NetInfo.fetch().then(networkState => {
          console.log("Connection type - ", networkState.type);
          console.log("Is connected? - ", networkState.isConnected);
        });
        */

    LogBox.ignoreLogs(['react-native-gesture-handler']);
    let VuniqueId = DeviceInfo.getUniqueId();
    console.log('uniqueId', VuniqueId);
    setUniqueId(VuniqueId);

    SplashScreen.hide();
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/background.jpg')}
        style={{
          width: '100%',
          resizeMode: 'contain',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={styles.header}>
          <Text style={styles.text_header}>
            Transmission Line Patrolling App
          </Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.loginText} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loader}
          style={styles.loginBtn}
          onPress={() => {
            console.log('Login to Continue');
            setLoader(true);

            LoginRequest(
              () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Menu'}],
                });
              },
              () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'PinGeneration'}],
                });
              },
              name,
              userPassword,
              'Login',
              () => {
                return setLoader(false);
              },
            );
          }}>
          {loader ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text style={{color: 'white', fontSize: 18}}>
              LOGIN TO CONTINUE
            </Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.loginText} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loader}
          style={styles.aboutBtn}
          onPress={() => {
            console.log('About');
            setLoader(true);

            LoginRequest(
              () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Menu'}],
                });
              },
              () => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'PinGeneration'}],
                });
              },
              name,
              userPassword,
              'About',
              () => {
                return setLoader(false);
                ``;
              },
            );
          }}>
          {loader ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <View>
              <View>
                <Text style={{color: 'white', fontSize: 18}}>ABOUT</Text>
              </View>
            </View>
          )}
        </TouchableOpacity>
        <View>
          <Text style={[styles.text_header, {color: 'white', fontSize: 24}]}>
            {UniqueId}
          </Text>
        </View>
        <Modal
          style={{alignItems: 'center', justifyContent: 'center'}}
          isVisible={isModalVisible}>
          <View
            style={{
              width: '80%',
              height: 250,
              backgroundColor: 'white',
              borderRadius: 10,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 20,
            }}>
            <Text style={{color: 'red', fontSize: 24, fontWeight: 'bold'}}>
              Error
            </Text>

            <Text style={{color: 'black', fontSize: 16, textAlign: 'center'}}>
              {error ? error : ''}
            </Text>

            <Button
              title="Close"
              color="red"
              onPress={() => {
                setModalVisible(!isModalVisible);
                setError('');
              }}
            />
          </View>
        </Modal>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 22,
    color: '#0A8FCF',
    marginBottom: 40,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  inputView: {
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
    width: '80%',
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black',
    // color: 'black',
  },
  forgot: {
    color: '#0A8FCF',
    fontSize: 11,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: '80%',
    backgroundColor: 'rgba(93,45,145,255)',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 150,
    // marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  aboutBtn: {
    width: '80%',
    backgroundColor: 'rgba(93,45,145,255)',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 250,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    //paddingHorizontal: 20,
    //  marginTop: 200,
    //  paddingBottom: 100
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
  },
});

export default FirstScreen;
