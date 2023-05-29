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
} from 'react-native';
import Modal from 'react-native-modal';
import SplashScreen from 'react-native-splash-screen';
import AsyncStorage from '@react-native-community/async-storage';

//import Config from 'react-native-config';
import Moment from 'moment';
import DeviceInfo from 'react-native-device-info';
import {and, getRelativeCoords} from 'react-native-reanimated';
import moment from 'moment';

import base64 from 'react-native-base64';

import axios from 'axios';

// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
function Login({navigation}) {
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [loader, setLoader] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [error, setError] = useState('');

  const [UniqueId, setUniqueId] = useState('');

  //const [ImDate, setImDate] = useState('30.06.2022');
  const [ImDate, setImDate] = useState(moment().format('DD.MM.YYYY'));

  const [cacheData, setCacheData] = useState([{}]);
  const [newData, setnewData] = useState();

  const [isLoginServiceCall, setIsLoginServiceCall] = useState(true);

  useEffect(() => {
    /*
    AsyncStorage.setItem(
      'DCRCRecord',
      JSON.stringify([])
    );
    */
    AsyncStorage.setItem('OHTL', JSON.stringify([]));

    console.log('****IMDATE***' + ImDate);
    AsyncStorage.getItem('UserDetail').then(items => {
      var userData = items ? JSON.parse(items) : {};

      //    setEmpNo(data[0].LINEMAN);
      //    setEmpName(data[0].EMP_NAME);
      //    setIBC(data[0].IBC_CODE);
      //    setGang(data[0].GANG_NAME);
      //setIMEI(data[0].IMEI);

      setName(userData[0].userName);
      setUserPassword(userData[0].userPassword);
      console.log('userData[0].userName: ' + userData[0].userName);
      console.log('userData[0].userPassword: ' + userData[0].userPassword);
      if (userData[0].userName != '' && userData[0].userPassword != '') {
        setIsLoginServiceCall(false);
      }

      //console.log("Login: UserDetail:userName: " + userData[0].userName);
      //console.log("Login: UserDetail:userPassword: " + userData[0].userPassword);
    });

    let VuniqueId = DeviceInfo.getUniqueId();
    console.log('uniqueId', VuniqueId);
    setUniqueId(VuniqueId);

    SplashScreen.hide();
  }, []);

  const _storeData = async sapData => {
    var data = [],
      flag = false;
    console.log(
      '_storeData:sapData: ' + typeof sapData + ' length: ' + sapData.length,
    );

    try {
      await AsyncStorage.getItem('DCRCRecord')
        .then(items => {
          data = items ? JSON.parse(items) : [];
          //             data = data.filter(x => (x.Status == null));

          console.log(
            'async:getItem:sapData: ' +
              typeof sapData +
              ' length: ' +
              sapData.length,
          );
          console.log(
            'after filter :data : ' + typeof data + ' length: ' + data.length,
          );

          sapData.forEach(parent => {
            //console.log("parent" + parent);
            data.forEach(child => {
              //console.log("child" + child);
              if (child.Vertrag == parent.Vertrag) {
                flag = true;
                //console.log("matched" + parent);
              }
            });
            //console.log("flag:" + flag);
            if (flag == false) {
              //data.push(parent); commented
              data.push({
                ConsumerNo: parent.ConsumerNo,
                Vertrag: parent.Vertrag,
                Vkont: parent.Vkont,
                Mtno: parent.Mtno,
                Mru: parent.Mru,
                CurrentDues: parent.CurrentDues,
                TotDues: parent.TotDues,
                Tariff: parent.Tariff,
                ImDate: parent.ImDate,
                ConsumerName: parent.ConsumerName,
                ConsumerAdd: parent.ConsumerAdd,
                AsonPaydt: parent.AsonPaydt,
                AsonDues: parent.AsonDues,
                Discno: parent.Discno,
                ImIbc: parent.ImIbc,
                Pnumber: parent.Pnumber,
                ImUser: parent.ImUser,
                ImageCount: 0,
                MeterReading: '',
                PayAmount: 0,
                RecordStatus: '',
                LinemanPayamnt: 0,
                LinemanPaydate: '',
                //Image:[{Image1:{uri:'',url:'', fileName:'',base64:''},Image2:{},Image3:{}}]
                Image: [{}, {}, {}, {}],
              });
              console.log('New Addded' + parent);
            }
            flag = false;
          });
        })
        .then(res => {
          console.log('final:data: ' + typeof data + ' length: ' + data.length);
          AsyncStorage.setItem('DCRCRecord', JSON.stringify(data));
        });
    } catch (error) {
      // Error saving data
    }
  };

  const getRecord = (imIbc, imGang, imUser) => {
    console.log('getRecord: date: ' + ImDate);
    console.log('ibc: ' + imIbc);
    console.log('gang: ' + imGang);
    console.log('User: ' + imUser);

    axios({
      method: 'get',
      url:
        'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZDCRC_SRV/DCRCListSet?$filter=%20ImDate%20eq%20%27' +
        ImDate +
        '%27%20and%20ImIbc%20eq%20%27' +
        imIbc +
        '%27%20and%20ImGang%20eq%20%27' +
        imGang +
        '%27%20and%20ImUser%20eq%20%27' +
        imUser +
        '%27%20and%20ImHistory%20eq%20%27%27&$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('mobility_rfc:Z@p12345'),
      },
    })
      .then(res => {
        console.log(res.data);
        if (res.data.d.results != []) {
          //console.log("res.d.results" + res.d.results);
          _storeData(res.data.d.results);
        }
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const item = {};
  const LoginRequest = (
    back,
    backPinGeneration,
    name,
    userPassword,
    loader,
  ) => {
    console.log('name: ' + name);

    console.log('password: ' + userPassword);

    /*    
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
    */
    console.log(name);
    console.log(userPassword);
    console.log(UniqueId.toUpperCase());
    console.log(isLoginServiceCall);

    if (isLoginServiceCall) {
      axios({
        method: 'GET',
        url:
          "https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPATROLLING_SRV/ValidateUserSet(Pass='" +
          userPassword +
          "',Swid='" +
          UniqueId.toUpperCase() +
          "',User='" +
          name +
          "')?$format=json",
        headers: {
          Authorization: 'Basic ' + base64.encode('tooba:abap123'),
          'Content-Type': 'application/json',
        },
      })
        .then(resp => {
          //console.log('res', resp);
          loader();
          var response = resp.data;
          console.log('response.d.Result::: ', response.d.Result);
          if (response.d.Result == 'False') {
            setError('Please insert correct informmation');
            setModalVisible(true);
            return;
          } else {
            let arr = [];

            arr.push({
              IMEI: UniqueId.toUpperCase(),
              userName: name,
              userPassword: userPassword,
              regionName: response.d.Region,
            });
            //console.log("arr" + arr[0]);

            AsyncStorage.setItem('UserDetail', JSON.stringify(arr));

            navigation.reset({
              index: 0,
              routes: [{name: 'Dashboard2'}],
            });
          }
        })
        .catch(error => {
          //   alert(error);

          setError('setError: ', error);
          console.log('error:AuthSet: ', error);
          console.log('isLoginServiceCall: ' + isLoginServiceCall);

          AsyncStorage.getItem('User')
            .then(items => {
              var data = JSON.parse(items);
              var nameTemp = data[0].name.toLowerCase();
              nameTemp = nameTemp.trim();
              var passwordTemp = data[0].userPassword.toLowerCase();
              passwordTemp = passwordTemp.trim();
              var sUser = name.toLowerCase();
              sUser = sUser.trim();
              var sPassword = userPassword.toLowerCase();
              sPassword = sPassword.trim();

              if (nameTemp == sUser && passwordTemp == sPassword) {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Menu'}],
                });
                loader();
              } else {
                setError('User Name or Password Incorrect');

                setModalVisible(true);
                loader();

                return;
              }
            })
            .catch(() => {
              setError('Something went wrong. ' + error);

              setModalVisible(true);
              loader();
            });
        });
    } else {
      navigation.reset({
        index: 0,
        routes: [{name: 'Dashboard2'}],
      });
    }

    // AsyncStorage.setItem('User', JSON.stringify(name));
  };

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
          <Text style={styles.text_header}>OHTL Mobile App</Text>
        </View>
        <View style={{marginTop: 100}}></View>
        <View style={styles.inputView}>
          <Image
            style={{width: 26, height: 26}}
            source={require('../assets/user.png')}
          />
          <TextInput
            style={styles.inputText}
            placeholder="User Name"
            placeholderTextColor="rgba(93,45,145,255)"
            onChangeText={text => setName(text)}
            value={name}
          />
        </View>
        <View style={styles.inputView}>
          <Image
            style={{width: 24, height: 24}}
            source={require('../assets/key.png')}
          />
          <TextInput
            style={styles.inputText}
            secureTextEntry={true}
            placeholder="User Password"
            placeholderTextColor="rgba(93,45,145,255)"
            onChangeText={text => setUserPassword(text)}
            value={userPassword}
          />
        </View>

        <TouchableOpacity>
          <Text style={styles.loginText} />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={loader}
          style={styles.loginBtn}
          onPress={() => {
            console.log('Login Pressed');
            //_storeData();
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
              () => {
                return setLoader(false);
              },
            );
          }}>
          {loader ? (
            <ActivityIndicator size="large" color="#FFFFFF" />
          ) : (
            <Text style={{color: 'white', fontSize: 18}}>LOGIN</Text>
          )}
        </TouchableOpacity>
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
    //    justifyContent: 'initial',
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
    marginTop: 20,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  header: {
    flex: 0.5,
    justifyContent: 'flex-end',
    //paddingHorizontal: 20,
    marginTop: -200,
    //  paddingBottom: 100
  },
  text_header: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 30,
    textAlign: 'center',
    //    backgroundColor: 'red',
  },
});

export default Login;
