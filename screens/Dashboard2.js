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
  Alert,
  Image,
  ImageBackground,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal';
import {
  useNetInfo,
  fetch,
  addEventListener,
} from '@react-native-community/netinfo';
import base64 from 'react-native-base64';
import moment from 'moment';

import axios from 'axios';

// var AES = require('react-native-aes');
// var CryptoJS = require('crypto-js');
function Dashboard({navigation}) {
  const [user, setUser] = useState([]);
  const [IBC, setIBC] = useState([]);
  const [Area, setArea] = useState([]);
  const [error, setError] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [Workorders, setWorkorders] = useState([]);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);

  const [EmpName, setEmpName] = useState('');
  const [LINEMAN, setLINEMAN] = useState('');
  const [imageCount, setImageCount] = useState('');

  const [postCount, setPostCount] = useState();
  const [downloadCount, setDownloadCount] = useState();

  const [totalSavedCases, setTotalSavedCases] = useState();
  const [savedCasesCount, setSavedCasesCount] = useState(0);
  const [savedData, setSavedData] = useState([]);

  const [ImDate, setImDate] = useState(moment().format('DD.MM.YYYY'));
  const [imIbc, setImIbc] = useState();
  const [imGang, setImGang] = useState();
  const [imUser, setImUser] = useState();

  const [loader, setLoader] = useState(false);
  const [downloadloader, setDownloadLoader] = useState(false);
  const item = {};
  let logindata;

  function loadData() {
    var count1 = 0;
    AsyncStorage.getItem('DCRCRecord').then(items => {
      var data1 = items ? JSON.parse(items) : [];
      //console.log('data1', data1);
      if (data1.length >= 1) {
        data1.filter(item => {
          if (item.RecordStatus == 'Pending') {
            count1++;
          }

          setWorkorders(count1);
        });
      } else {
        setWorkorders(0);

        setLoading(false);
      }
    });
  }
  const [IsConnected, setIsConnected] = useState();

  const [netInfo1, setNetInfo1] = useState('');

  var netInfo = useNetInfo();

  const response = fetch().then(state => {
    setIsConnected(state.isConnected);
  });

  useEffect(() => {
    AsyncStorage.getItem('UserDetail').then(items => {
      var data = items ? JSON.parse(items) : [];
      // var datatable = [];
      logindata = data;

      setEmpName(data[0].EMP_NAME);
      setLINEMAN(data[0].LINEMAN);
      setImageCount(data[0].ImageCount);

      console.log(data[0].GANG_NAME);
      console.log(data[0].IBC_CODE);
      console.log(data[0].LINEMAN);
      console.log(data[0].EMP_NAME);

      setImIbc(data[0].IBC_CODE);
      setImGang(data[0].GANG_NAME);
      setImUser(data[0].LINEMAN);
    });

    navigation.addListener('focus', payload => {
      AsyncStorage.getItem('DCRCRecord').then(items => {
        var data1 = items ? JSON.parse(items) : [];
        var count1 = 0;

        data1 = data1.filter(x => x.RecordStatus == 'Saved');

        setTotalSavedCases(data1.length);
        setSavedData(data1);
        console.log('savedData::' + data1);
        setPostCount('');
      });
    });
  }, []);

  const getRecord = () => {
    let FLSTR_NAV = [];
    axios({
      method: 'get',
      url: 'https://fioridev.ke.com.pk:44300/sap/opu/odata/sap/ZPATROLLING_SRV/GET_FLsSet?$filter=(User%20eq%20%27TOOBA%27)&$expand=FLSTR_NAV&$format=json',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Basic ' + base64.encode('tooba:sapsap12'),
      },
    })
      .then(res => {
        if (res.data.d.results != []) {
          res.data.d.results.forEach(singleResult => {
            singleResult.FLSTR_NAV.results.forEach(subSingleResult => {
              FLSTR_NAV.push({
                StrFl: subSingleResult.StrFl,
                StrDescr: subSingleResult.StrDescr,
              });
            });
            _storeData(singleResult.Fl, singleResult.FlDescr, FLSTR_NAV);
            FLSTR_NAV = [];
          });
        } else {
          alert('No Record found');
        }
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const _storeData = async (fl, flDescr, FLSTR_NAV) => {
    let count = 0;
    var data = [],
      flag = false;
    console.log('fl: ' + fl);
    try {
      await AsyncStorage.getItem('FunctionalLocation')
        .then(items => {
          data = items ? JSON.parse(items) : [];

          data.forEach(child => {
            if (child.Fl == fl) {
              flag = true;
            }
          });

          if (flag == false) {
            data.push({
              Fl: fl,
              FlDescr: flDescr,
              FLSTR_NAV: FLSTR_NAV,
            });
          }
          flag == false;
        })
        .then(res => {
          AsyncStorage.setItem('FunctionalLocation', JSON.stringify(data));
        });
    } catch (error) {
      // Error saving data
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        //        source={require('../assets/Pic1.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View style={{marginTop: 100}}></View>

        <Text style={styles.logo}> Welcome {EmpName} !</Text>

        {/* ****** Saad Code  ******* */}
        <View style={[styles.container, {}]}>
          <View style={{flex: 1}}>
            <View style={styles.topleft}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Employee Info');
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'NewCases',
                  });
                  //navigation.navigate('EmployeeInfo');
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/personal.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>New Petrolling</Text>
            </View>
            <View style={styles.downleft}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Work Schedule');
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'NewCases',
                  });
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/abc.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Edit Petrolling Report</Text>
            </View>
            <View style={styles.downleft}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Work Schedule');
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'SavedCases',
                  });
                }}>
                <Image
                  style={[styles.tinyLogo, {width: 120, height: 120}]}
                  source={require('../assets/images/calender.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Reply Queries</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.topright}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Discrepency Screen');
                  navigation.navigate('DiscrepencyScreen');
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/location.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Discrepency</Text>
            </View>
            <View style={styles.downright}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Discrepency Screen');
                  navigation.navigate('DiscrepencyScreen');
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/graph.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Share Reports</Text>
            </View>
            <View style={styles.downright}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Work Summary');
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'PostCases',
                  });
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/post.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Close Discrepancies</Text>
            </View>
          </View>
        </View>

        {/* ****** Saad Code  ******* */}

        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {loader ? (
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                width: 70,
                height: 40,
              }}>
              <ActivityIndicator color="#0D90D0" />
              <Text>Loading</Text>
            </View>
          ) : (
            <TouchableOpacity
              style={{
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={() => {
                IsConnected == true
                  ? getRecord()
                  : setError('No Internet connection');
              }}>
              <Text>{postCount}</Text>
              <Image
                style={{width: 20, height: 20}}
                source={require('../assets/sync.png')}
              />
              <Text
                style={{
                  color: 'rgba(93,45,145,255)',
                }}>
                {' '}
                Download
              </Text>
              {loading ? (
                <ActivityIndicator color="black" style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity>
          )}
        </View>

        <View
          style={{
            position: 'absolute',
            top: 40,
            left: 40,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
            }}
            onPress={() => {
              // getapi();
              AsyncStorage.removeItem('UserDetail').then(() => {
                navigation.reset({
                  index: 0,
                  routes: [{name: 'Login'}],
                });
              });
            }}>
            <Image
              style={{width: 20, height: 20}}
              source={require('../assets/logout.png')}
            />
            <Text
              style={{
                color: 'rgba(93,45,145,255)',
              }}>
              {' '}
              Logout
            </Text>
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

              <Text style={{color: 'red', fontSize: 16, textAlign: 'center'}}>
                {error ? error : ''}
              </Text>

              <Button
                title="Close"
                color="red"
                onPress={() => {
                  setModalVisible(!isModalVisible);
                  setError('');
                  /*  navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'Menu' }],
                                      });*/
                  // navigation.replace('Update1)';
                  // navigation.navigate('Update1');
                  navigation.goBack();
                }}
              />
            </View>
          </Modal>
        </View>
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
    flexDirection: 'row',
  },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 25,
    // top:0,
    // color: '#0D90D0',
    color: 'rgba(93,45,145,255)',
    marginBottom: 10,
    marginTop: 10,
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
    backgroundColor: 'lightgrey',
    // borderRadius: 25,
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
  },
  forgot: {
    color: '#0D90D0',
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
    // borderRadius: 15,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  topleft: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
    //        backgroundColor: "red",
  },
  topright: {
    paddingTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  downleft: {
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  downright: {
    paddingBottom: 20,
    flex: 1,
    alignItems: 'center',
  },
  tinyLogo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    //backgroundColor:'red',
  },
  text_header: {
    //paddingTop: 5,
    color: 'rgba(93,45,145,255)',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
});

export default Dashboard;
