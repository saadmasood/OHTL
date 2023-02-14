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
import moment from 'moment';

const WorkSummary = ({navigation}) => {
  //   const [data, setdata] = useState();
  const [DAssignedDC, setDAssignedDC] = useState();
  const [DDCPerformed, setDDCPerformed] = useState();
  const [DPendingDC, setDPendingDC] = useState();
  const [DPayment, setDPayment] = useState();

  const [MAssignedDC, setMAssignedDC] = useState();
  const [MDCPerformed, setMDCPerformed] = useState();
  const [MPendingDC, setMPendingDC] = useState();
  const [MPayment, setMPayment] = useState();

  const [PlanningDate, setPlanningDate] = useState(
    moment().subtract(0, 'days').format('YYYYMMDD'),
  );

  const [startOfMonth, setstartOfMonth] = useState(
    moment().startOf('month').subtract(1, 'days').format('YYYYMMDD'),
  );
  const [endOfMonth, setendOfMonth] = useState(
    moment().endOf('month').add(1, 'days').format('YYYYMMDD'),
  );

  const loadData = () => {
    AsyncStorage.getItem('DCRCRecord').then(items => {
      console.log('startOfMonth: ' + startOfMonth);
      console.log('endOfMonth: ' + endOfMonth);

      var dailyData = items ? JSON.parse(items) : {};
      var monthlyData = items ? JSON.parse(items) : {};

      console.log('total cases: ' + monthlyData.length);

      dailyData = dailyData.filter(x => x.ImDate == PlanningDate);
      monthlyData = monthlyData.filter(x =>
        moment(moment(x.ImDate).format('YYYYMMDD')).isBetween(
          startOfMonth,
          endOfMonth,
        ),
      );

      setDAssignedDC(dailyData.length);
      setDDCPerformed(dailyData.filter(x => x.RecordStatus != '').length);
      setDPendingDC(
        dailyData.filter(
          x => x.RecordStatus != 'Post' && x.RecordStatus != 'Saved',
        ).length,
      );
      setDPayment(
        dailyData.reduce(
          (total, cv) => (total = total + Number(cv.LinemanPayamnt)),
          0,
        ),
      );

      setMAssignedDC(monthlyData.length);
      setMDCPerformed(monthlyData.filter(x => x.RecordStatus != '').length);
      setMPendingDC(
        monthlyData.filter(
          x => x.RecordStatus != 'Post' && x.RecordStatus != 'Saved',
        ).length,
      );
      setMPayment(
        monthlyData.reduce(
          (total, cv) => (total = total + Number(cv.LinemanPayamnt)),
          0,
        ),
      );
    });
  };

  useEffect(() => {
    loadData();
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
      <View style={styles.header}>
        <Text style={styles.text_main}>Daily History</Text>
      </View>
      <View style={styles.formheader}>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Assigned DC:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{DAssignedDC}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>DC Performed</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{DDCPerformed}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Pending DC</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{DPendingDC}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Payment</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{DPayment}</Text>
          </View>
        </View>
      </View>
      <View style={styles.header}>
        <Text style={styles.text_main}>Monthly History</Text>
      </View>
      <View style={styles.formheader}>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Assigned DC:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{MAssignedDC}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>DC Performed</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{MDCPerformed}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Pending DC</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{MPendingDC}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Payment</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{MPayment}</Text>
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
    fontSize: 15,
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
    padding: 15,
  },
  text_right: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    padding: 15,
  },

  formheader: {
    flex: 1,
    //   paddingBottom: 50,
    //        backgroundColor: "red",
  },

  header: {
    width: '100%',
    backgroundColor: 'rgba(93,45,145,255)',
    height: 30,
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
