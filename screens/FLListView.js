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
  Image,
  ImageBackground,
  LogBox,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const base64 = require('base-64');
import Swipeable from 'react-native-swipeable';
import {FlatList} from 'react-native-gesture-handler';
//import axios from 'axios';

let i = 0;
let j = 10;
let dataslice;

function FLListView({route, navigation}) {
  const data3 = {
    DAssignedDC: '0',
    DDCPerformed: '0',
    DPendingDC: '0',
    DPayment: '0',
    MAssignedDC: '0',
    MDCPerformed: '0',
    MPendingDC: '0',
    MPayment: '0',
  };

  const [loader, setLoader] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tableData, settableData] = useState([]);
  const item = {};
  const [temptableData, settemptableData] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [startOfMonth, setstartOfMonth] = useState(
    moment().subtract(3, 'days').format('YYYYMMDD'),
  );
  const [endOfMonth, setendOfMonth] = useState(
    moment().add(1, 'days').format('YYYYMMDD'),
  );

  const [caseTypeHeading, setCaseTypeHeading] = useState();

  const loadData = val => {
    let data1;
    AsyncStorage.getItem('FunctionalLocation').then(items => {
      var data = [];
      data = items ? JSON.parse(items) : [];

      //console.log('route.params.otherParam:::', route.params.otherParam);

      console.log('data: ' + typeof data + ' length: ' + data.length);

      if (data.length == 0) {
        alert('There is no item against the list');
      }

      settableData([...tableData, ...data]);
      settemptableData([...temptableData, ...data]);

      setLoader(false);
    });
  };

  useEffect(() => {
    setLoader(true);
    console.log(route.params.otherParam);

    navigation.addListener('focus', payload => {
      loadData();
    });

    LogBox.ignoreLogs(['Animated.event ']);

    loadData();

    if (route.params.otherParam == 'NewCases') {
      setCaseTypeHeading('Functional Location List');
    } else if (route.params.otherParam == 'SavedCases') {
      setCaseTypeHeading('SAVED CASES');
    } else {
      setCaseTypeHeading('Functional Location List');
    }
  }, []);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    searchFilterFunctionDate(moment(date).format('YYYYMMDD'));
    hideDatePicker();
  };

  const searchFilterFunction = text => {
    setRefresh(true);

    if (text == '' || text == null) {
      setRefresh(true);
      //alert('');
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    } else {
      var arrayholder = temptableData;

      const newData = arrayholder.filter(item => {
        const itemData = `${item.ConsumerNo.toUpperCase()}  ${item.Vkont.toUpperCase()} ${item.Mtno.toUpperCase()} ${item.Mru.toUpperCase()}`;

        const textData = text.toUpperCase();

        return itemData.indexOf(textData) > -1;
      });
      settableData(newData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    // this.setState({data: newData});
  };

  const searchFilterFunctionDate = text => {
    console.log('date: ' + text);
    //        console.log(moment(text, "YYYYMMDD").format("Do MMM YYYY"));

    setRefresh(true);

    if (text == '' || text == null) {
      setRefresh(true);
      //alert('');
      settableData(temptableData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    } else {
      var arrayholder = temptableData;

      const newData = arrayholder.filter(item => {
        const itemData = `${item.ImDate.toUpperCase()}`;
        const textData = text.toUpperCase();
        //console.log("item.ImDate: " + item.ImDate);
        return itemData.indexOf(textData) > -1;
      });
      settableData(newData);
      setTimeout(() => {
        setRefresh(false);
      }, 1000);
    }
    // this.setState({data: newData});
  };

  return (
    <View style={styles.container}>
      {/* <ImageBackground
        source={require('../assets/Pic4.jpg')}
        style={{
          width: '100%',
          height: '100%',
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}> */}
      <View
        style={{
          //position: 'absolute',
          top: 10,
          right: 10,
          alignItems: 'flex-end',
          marginBottom: 15,
          //justifyContent: 'center',
        }}>
        <TouchableOpacity
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{name: 'Dashboard2'}],
            });
          }}>
          <Image
            style={{width: 20, height: 20}}
            source={require('../assets/home.png')}
          />
          <Text
            style={{
              color: 'rgba(93,45,145,255)',
            }}>
            {' '}
            Home
          </Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          backgroundColor: '#371A80', //rgba(93,45,145,255)
        }}>
        <TextInput
          style={{
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            //height:405,
            //fontSize:,
          }}>
          {caseTypeHeading}
        </TextInput>
      </View>
      <TextInput
        onChangeText={text => searchFilterFunction(text)}
        autoCorrect={false}
        placeholder="Search"
        placeholderTextColor="black"
        style={{
          backgroundColor: '#C2C2C2',
          textAlignVertical: 'center',
          fontSize: 16,
          height: 40,
          borderRadius: 25,
          paddingHorizontal: 20,
          alignSelf: 'center',
          width: '94%',
          marginVertical: 10,
          color: 'black',
          elevation: 4,
        }}
      />

      {/*
      <View>
        <Button
          title="Search by Date"
          onPress={showDatePicker}
          color="rgba(93,45,145,255)"
        />
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
      </View>
        */}
      {loader ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          style={{flex: 1, width: '100%'}}
          data={tableData.length > 0 ? tableData : 0}
          //data.splice(index, 1);0
          extraData={tableData}
          keyExtractor={item => item.id}
          maxToRenderPerBatch={10}
          initialNumToRender={10}
          // onEndReachedThreshold={0.5}
          ListFooterComponent={() => {
            return (
              <View
                style={{
                  width: '90%',
                  alignSelf: 'center',
                  marginBottom: 20,
                  height: 60,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                {tableData ? (
                  tableData.length > 0 ? (
                    <TouchableOpacity onPress={() => loadData('more')}>
                      <Text
                        style={{
                          color: 'black',
                          fontSize: 18,
                          fontWeight: 'bold',
                        }}>
                        Load More
                      </Text>
                      {loading ? (
                        <ActivityIndicator
                          color="black"
                          style={{marginLeft: 8}}
                        />
                      ) : null}
                    </TouchableOpacity>
                  ) : (
                    <View />
                  )
                ) : (
                  <Text>No Record to Show</Text>
                )}
              </View>
            );
          }}
          renderItem={({item, index}) => {
            // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

            return (
              <Swipeable>
                <TouchableOpacity
                  // disabled={true}
                  onPress={() => {
                    navigation.navigate('StrFLListView', {
                      data: item,
                      index: index,
                      otherParam: item.PtlSnro,
                      isDiscrepancyScreenRequest: route.params.otherParam,
                    });
                  }}
                  style={{
                    backgroundColor: 'white',
                    alignSelf: 'center',
                    borderRadius: 15,
                    // marginHorizontal:2,
                    marginVertical: 8,
                    width: '96%',
                    justifyContent: 'center',
                    borderWidth: 1,

                    borderColor: '#ddd',
                    borderBottomWidth: 0,
                    shadowColor: '#000',
                    shadowOffset: {width: 10, height: 10},
                    shadowOpacity: 0.8,
                    shadowRadius: 15,
                    elevation: 10,
                    // borderBottomColor: 'grey',
                    // borderBottomWidth: 0.5,
                  }}>
                  <View style={{flex: 1, flexDirection: 'row'}}>
                    <View
                      style={{
                        backgroundColor: '#fff',
                        flexDirection: 'row',
                        // paddingHorizontal: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingHorizontal: 15,
                        height: 34,
                        position: 'absolute',
                        borderBottomRightRadius: 15,
                        right: -1,
                        bottom: 0,
                      }}>
                      <Text
                        style={{
                          // marginLeft: 5,
                          fontSize: 14,
                          fontWeight: 'bold',
                          color: '#FFFFFF', //'#FFFFFF',
                          marginBottom: 4,
                        }}>
                        {item.MrNote}
                      </Text>
                    </View>
                    <View>
                      {item.Status == 'Saved' ? (
                        <View
                          style={{
                            backgroundColor: 'rgb(0, 100, 0)',
                            flexDirection: 'row',
                            // paddingHorizontal: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 15,
                            height: 34,
                            position: 'absolute',
                            borderBottomLeftRadius: 15,
                            left: -1,
                            bottom: 0,
                          }}>
                          <Text
                            style={{
                              // marginLeft: 5,
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#FFFFFF', //'#FFFFFF',
                              marginBottom: 4,
                            }}>
                            {index + 1}
                          </Text>
                        </View>
                      ) : (
                        <View
                          style={{
                            backgroundColor: 'rgba(248,147,30,255)',
                            flexDirection: 'row',
                            // paddingHorizontal: 6,
                            alignItems: 'center',
                            justifyContent: 'center',
                            paddingHorizontal: 15,
                            height: 34,
                            position: 'absolute',
                            borderBottomLeftRadius: 15,
                            left: -1,
                            bottom: 0,
                          }}>
                          <Text
                            style={{
                              // marginLeft: 5,
                              fontSize: 14,
                              fontWeight: 'bold',
                              color: '#FFFFFF', //'#FFFFFF',
                              marginBottom: 4,
                            }}>
                            {index + 1}
                          </Text>
                        </View>
                      )}
                    </View>
                    <View
                      style={{
                        flex: 1,
                        paddingLeft: 10,
                        justifyContent: 'space-between',
                        paddingVertical: 10,
                        //backgroundColor: "red",
                      }}>
                      <Text
                        style={{
                          fontSize: 10,
                          //fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          //fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            marginLeft: 5,
                            color: 'black',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}>
                          SIR NO:
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                            color: 'black',
                            fontSize: 13,
                          }}>
                          {item.PtlSnro}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            marginLeft: 5,
                            color: 'black',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}>
                          Functional Location:
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                            color: 'black',
                            fontSize: 13,
                          }}>
                          {item.Fl}
                        </Text>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <Text
                          style={{
                            marginLeft: 5,
                            color: 'black',
                            fontSize: 13,
                            fontWeight: 'bold',
                          }}>
                          Description:
                        </Text>
                        <Text
                          style={{
                            marginLeft: 5,
                            fontSize: 13,
                            color: 'black',
                          }}>
                          {item.FlDescr}
                        </Text>
                      </View>

                      <Text
                        style={{
                          fontSize: 10,
                          //fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 10,
                          //fontWeight: 'bold',
                          color: '#0873C3',
                        }}
                      />
                    </View>

                    <View
                      style={{
                        flex: 0.55,
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        // marginBottom: 6,
                      }}>
                      <View
                        style={{
                          // backgroundColor: '#0873C3',
                          alignItems: 'center',
                          justifyContent: 'center',
                          height: 65,
                          width: 180,
                          borderRadius: 15,
                        }}></View>
                    </View>
                    <View
                      style={{
                        backgroundColor: 'rgba(93,45,145,255)',
                        flexDirection: 'row',
                        paddingHorizontal: 6,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 100,
                        height: 34,
                        position: 'absolute',
                        borderTopRightRadius: 15,
                        right: -1,
                      }}>
                      <Text
                        style={{
                          // marginLeft: 5,
                          fontSize: 9,
                          fontWeight: 'bold',
                          color: '#FFFFFF',
                        }}>
                        {'Dated : ' +
                          moment(item.AssignedDate, 'YYYYMMDD').format(
                            'DD MM YYYY',
                          )}
                      </Text>
                    </View>
                  </View>
                </TouchableOpacity>
              </Swipeable>
            );
          }}
        />
      )}
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, width: '100%', backgroundColor: '#fff'},
  head: {height: 40, backgroundColor: '#f1f8ff'},
  text: {margin: 6},
  row: {flexDirection: 'row', backgroundColor: '#FFF1C1'},
  //   container: {
  //     flex: 1,
  //     backgroundColor: 'white',
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  logo: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 50,
    color: '#465881',
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
    backgroundColor: 'lightgrey',
    // borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputText: {
    width: '98%',
    paddingLeft: 10,
    height: 50,
    color: 'black',
  },
  forgot: {
    color: '#465881',
    fontSize: 11,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 20,
  },
  loginBtn: {
    width: 135,
    backgroundColor: 'rgba(93,45,145,255)',
    // borderRadius: 25,
    height: 35,
    alignItems: 'center',
    marginHorizontal: 5,
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
    elevation: 4,
    shadowOffset: {width: 15, height: 15},
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 50,
    right: -1,
    bottom: 0,
    borderBottomRightRadius: 15,
  },
});

export default FLListView;
