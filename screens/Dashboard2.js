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
import AsyncStorage from 'react-native-encrypted-storage';
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

    //logindata

    //getapi();

    let a = [1, 2, 3, 4, 5, 6];
    let b = [1, 2, 3, 8];

    for (let i = 0; i < a.length; i++) {
      var bl = false;
      for (let j = 0; j < b.length; j++) {
        if (b[j] == a[i]) {
          // bl = true;
        } else {
        }
      }
    }
  }, []);

  const updateSingleRecord = (singleRecord, singleRecordCount) => {
    if (singleRecord.Vertrag == undefined) {
      console.log('*** cases completed ****');
    }
    console.log('******************');
    console.log('Vertrag: ' + singleRecord.Vertrag);
    console.log('******************');

    console.log('Post');
    console.log('pnumber: ' + singleRecord.Pnumber);
    console.log('imUser: ' + LINEMAN);
    console.log('MeterReading: ' + singleRecord.MeterReading);
    console.log('MrNote: ' + singleRecord.MrNote);
    console.log('savedDate: ' + singleRecord.SavedDate);
    console.log('savedTime: ' + singleRecord.SavedTime);
    console.log('Latitude: ' + singleRecord.ImLati);
    console.log('Longitude: ' + singleRecord.ImLong);
    console.log('PayDate: ' + singleRecord.PayDate);
    console.log('PayAmount: ' + singleRecord.PayAmount);
    console.log('ImPnumber: ' + singleRecord.Pnumber);
    console.log('Discno: ' + singleRecord.Discno);
    console.log('PicLink1: ' + singleRecord.PicLink1);
    console.log('PicLink2: ' + singleRecord.PicLink2);
    console.log('PicLink3: ' + singleRecord.PicLink3);

    axios({
      method: 'POST',
      url: 'https://fioriprd.ke.com.pk:44300/sap/opu/odata/sap/ZDCRC_SERVICES_SRV/DCRC_UPDATESet',
      headers: {
        Authorization: 'Basic ' + base64.encode('mobility_rfc:Z@p12345'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRFToken': '',
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: JSON.stringify({
        d: {
          ImPnumber: singleRecord.Pnumber,
          ImUser: LINEMAN,
          ImMeterReading: singleRecord.MeterReading,
          MrNote: singleRecord.MrNote,
          SaveDate: singleRecord.SavedDate,
          SaveTime: singleRecord.SavedTime,
          ImLati: singleRecord.ImLati,
          ImLong: singleRecord.ImLong,
          PicLink1: singleRecord.PicLink1,
          PicLink2: singleRecord.PicLink2,
          PicLink3: singleRecord.PicLink3,
        },
      }),
    })
      .then(res => {
        //console.log("singleRecord.Vertrag: " + singleRecord.Vertrag + " ::: " + res.d.ImMessage);
        if (res.data.d.ImMessage == 'RECORD UPDATED!!') {
          console.log('res.data.d.ImMessage: ' + res.data.d.ImMessage);
          AsyncStorage.getItem('DCRCRecord').then(async items => {
            let data = JSON.parse(items);
            data.filter((item, index) => {
              if (item.Vertrag == singleRecord.Vertrag) {
                data[index].RecordStatus = 'Post';
                if (singleRecordCount <= totalSavedCases)
                  setPostCount(singleRecordCount + '/' + totalSavedCases);
                if (savedData.length > singleRecordCount) {
                  //console.log('savedCasesCount: ' + savedCasesCount);
                  console.log('singleRecordCount: ' + singleRecordCount);
                  updateSingleRecord(
                    savedData[singleRecordCount],
                    singleRecordCount + 1,
                  );
                }
                AsyncStorage.setItem('DCRCRecord', JSON.stringify(data));
                console.log(
                  'Record Updated: ' +
                    singleRecord.Vertrag +
                    ' :data[index].RecordStatus: ' +
                    data[index].RecordStatus,
                );
              }
            });
          });
          if (singleRecord.ImageCount > 0) {
            console.log(
              'Vertrag: ' +
                singleRecord.Vertrag +
                ' :imageCount: ' +
                singleRecord.ImageCount,
            );
            insertImage(singleRecord);
          } else {
            navigation.navigate('Dashboard2');
            return;
          }
        }
      })
      .catch(error => {
        console.error('consle.error:: ', error);
        alert(error);
      });
  };

  const insertImage = singleRecord => {
    console.log('IMAGE 1 Posting started: ');
    axios({
      method: 'POST',
      url: 'https://dc-rc.ke.com.pk:8001/MMR/api/Service/PostImageData',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRFToken': '',
        'X-Requested-With': 'XMLHttpRequest',
      },
      data: JSON.stringify({
        imageName: 'BFDC.jpg',
        imageData: singleRecord.Image[0].base64,
        accountNumber: singleRecord.Vertrag,
        dcOrderNumber: singleRecord.Discno,
        ibc: singleRecord.ImIbc,
      }),
    })
      .then(resp => {
        //console.log("POST IMAGE 1 RESPONSE: " + resp.StatusMessage + ": singleRecord.Vertrag: " + singleRecord.Vertrag);

        if (singleRecord.ImageCount > 1) {
          console.log('IMAGE 2 Posting started: ');
          axios({
            method: 'POST',
            url: 'https://dc-rc.ke.com.pk:8001/MMR/api/Service/PostImageData',
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
              'X-CSRFToken': '',
              'X-Requested-With': 'XMLHttpRequest',
            },
            data: JSON.stringify({
              imageName: 'AFDC.jpg',
              imageData: singleRecord.Image[1].base64,
              accountNumber: singleRecord.Vertrag,
              dcOrderNumber: singleRecord.Discno,
              ibc: singleRecord.ImIbc,
            }),
          })
            .then(resp => {
              //console.log("POST IMAGE 2 RESPONSE: " + resp.StatusMessage + ": singleRecord.Vertrag: " + singleRecord.Vertrag);

              if (singleRecord.ImageCount > 2) {
                console.log('IMAGE 3 Posting started: ');
                axios({
                  method: 'POST',
                  url: 'https://dc-rc.ke.com.pk:8001/MMR/api/Service/PostImageData',
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                    'X-CSRFToken': '',
                    'X-Requested-With': 'XMLHttpRequest',
                  },
                  data: JSON.stringify({
                    imageName: 'PRDC.jpg',
                    imageData: singleRecord.Image[2].base64,
                    accountNumber: singleRecord.Vertrag,
                    dcOrderNumber: singleRecord.Discno,
                    ibc: singleRecord.ImIbc,
                  }),
                })
                  .then(resp => {
                    //console.log("POST IMAGE 3 RESPONSE: " + resp.StatusMessage + ": singleRecord.Vertrag: " + singleRecord.Vertrag);
                    //navigation.navigate('Dashboard2');
                    //return;
                  })
                  .catch(error => {});
              } else {
                //navigation.navigate('Dashboard2');
                //return;
                setLoading(false);
              }
            })
            .catch(error => {});
        } else {
          //navigation.navigate('Dashboard2');
          // return;
          setLoading(false);
        }
      })
      .then(resp => {
        setLoading(false);
      })
      .catch(error => {});
  };

  const getRecord = () => {
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
          console.log('res.data.d.result' + res.data.d.results);
          _storeData(res.data.d.results);
        } else {
          alert('No Record found');
        }
      })
      .catch(error => {
        console.error('axios:error: ' + error);
      });
  };

  const _storeData = async sapData => {
    let count = 0;
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
              count++;
            }
            flag = false;
          });
        })
        .then(res => {
          console.log('final:data: ' + typeof data + ' length: ' + data.length);
          alert('Total new cases downloaded: ' + count);
          AsyncStorage.setItem('DCRCRecord', JSON.stringify(data));
        });
    } catch (error) {
      // Error saving data
    }
  };

  function getapi() {
    console.log('-getapi function---');

    //console.log("loopCount: " + loopCount);
    loadData();

    setLoading(true);

    if (savedData.length >= 1) {
      updateSingleRecord(savedData[savedCasesCount], 1);
    } else {
      alert('No Record found');
      //setModalVisible(true);
      setLoading(false);
      return;
    }
  }

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
                  /*   
                                    navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'EmployeeInfo' }],
                                    });
                                    */
                  navigation.navigate('EmployeeInfo');
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/personal.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Employee Info</Text>
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
              <Text style={styles.text_header}>Work Schedule</Text>
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
              <Text style={styles.text_header}>Saved Cases</Text>
            </View>
          </View>
          <View style={{flex: 1}}>
            <View style={styles.topright}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Work Location');
                  navigation.navigate('WorkLocation');
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/location.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Work Location</Text>
            </View>
            <View style={styles.downright}>
              <TouchableOpacity
                onPress={() => {
                  console.log('Work Summary');
                  navigation.navigate('WorkSummary');
                }}>
                <Image
                  style={styles.tinyLogo}
                  source={require('../assets/images/graph.png')}
                />
              </TouchableOpacity>
              <Text style={styles.text_header}>Work Summary</Text>
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
              <Text style={styles.text_header}>Completed Cases</Text>
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
                  ? getapi()
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
                Post to Server
              </Text>
              {loading ? (
                <ActivityIndicator color="black" style={{marginLeft: 8}} />
              ) : null}
            </TouchableOpacity>
          )}
        </View>

        {/* ****** Saad Code  ** 02-Feb-2023***** */}
        <View
          style={{
            position: 'absolute',
            top: 20,
            right: 170,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {downloadloader ? (
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
              <Text>{downloadCount}</Text>
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
        {/* ****** Saad Code  ******* */}

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
