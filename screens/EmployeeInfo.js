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

import AsyncStorage from 'react-native-encrypted-storage';

const WorkSummary = ({navigation}) => {
  const [EmpNo, setEmpNo] = useState('');
  const [EmpName, setEmpName] = useState('');
  const [IBC, setIBC] = useState('');
  const [Gang, setGang] = useState('');
  const [IMEI, setIMEI] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('UserDetail').then(items => {
      var data = items ? JSON.parse(items) : {};

      setEmpNo(data[0].LINEMAN);
      setEmpName(data[0].EMP_NAME);
      setIBC(data[0].IBC_CODE);
      setGang(data[0].GANG_NAME);
      setIMEI(data[0].IMEI);

      console.log('data::::' + data[0].LINEMAN);
    });
  }, []);

  return (
    <ImageBackground
      //           source={require('../assets/images/kebackground.jpg')}
      style={{
        width: '100%',
        resizeMode: 'contain',
        height: '100%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Image
        style={styles.tinyLogo}
        source={require('../assets/images/kelogo.jpg')}
      />
      <View style={{paddingBottom: 50}}></View>

      <View style={styles.header}>
        <Text style={styles.text_main}>Employee Info</Text>
      </View>
      <View style={styles.formheader}>
        <View style={{flexDirection: 'row', flex: 0.5, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Emp No:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{EmpNo}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.5, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Employee Name</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{EmpName}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.5, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>IBC</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{IBC}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.5, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Gang</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{Gang}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>IMEI</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{IMEI}</Text>
          </View>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },

  text_main: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    // top:0,
    // color: '#0D90D0',
    color: '#ffff',
    //marginBottom: 10,
    marginTop: 5,
    //elevation: 4,
    //shadowOffset: { width: 15, height: 15 },
    //shadowColor: 'black',
    //shadowOpacity: 0.8,
    //shadowRadius: 20,
  },
  text_left: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },
  text_right: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    padding: 5,
  },

  formheader: {
    flex: 1,
    paddingTop: 20,
    //        backgroundColor: "red",
  },

  header: {
    width: '100%',
    backgroundColor: 'rgba(93,45,145,255)',
    height: 40,
    //  paddingTop: 100,
    //        flex: 1,
    //      justifyC3ntent: 'flex-end',
    //paddingHorizontal: 20,
    //  marginTop: 200,
    //  paddingBottom: 100
  },

  tinyLogo: {
    width: '96%',
    height: 100,
    paddingHorizontal: 20,
    resizeMode: 'contain',
  },
});

export default WorkSummary;
