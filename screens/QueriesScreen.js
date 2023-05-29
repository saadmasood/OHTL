import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  PermissionsAndroid,
  ActivityIndicator,
  LogBox,
  Dimensions,
} from 'react-native';

import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';

import ImagePicker from 'react-native-image-crop-picker';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import base64 from 'react-native-base64';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

const QueriesScreen = ({navigation, route}) => {
  const [isEditable, setIsEditable] = useState(true);

  const [descriptionError, setDescriptionError] = useState(false);
  const [description, setDescription] = useState('');

  const [remarksError, setRemarksError] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    'rgba(93,45,145,255)',
  );

  const [openDiscrepancyTower, setOpenDiscrepancyTower] = useState(false);
  const [valueDiscrepancyTower, setValueDiscrepancyTower] = useState();
  const [itemsDiscrepancyTower, setItemsDiscrepancyTower] = useState([
    {label: 'Access/ Encroachment', value: 'Access/ Encroachment'},
    {label: 'Crash Barriers', value: 'Crash Barriers'},
    {label: 'Earth wire/ OPGW', value: 'Earth wire/ OPGW'},
    {label: 'Foundation', value: 'Foundation'},
    {label: 'Terrain/ Topography', value: 'Terrain/ Topography'},
    {label: 'Vibration Dampers/ Spacers', value: 'Vibration Dampers/ Spacers'},
    {label: 'Gantry', value: 'Gantry'},
    {label: 'Ground Clearance', value: 'Ground Clearance'},
    {label: 'Hardware Fittings', value: 'Hardware Fittings'},
    {label: 'Hookups', value: 'Hookups'},
    {label: 'Insulators', value: 'Insulators'},
    {label: 'Joints', value: 'Joints'},
    {label: 'Jumpers', value: 'Jumpers'},
    {label: 'PVC Wire', value: 'PVC Wire'},
    {label: 'Road Crossing', value: 'Road Crossing'},
    {label: 'Span Conductor', value: 'Span Conductor'},
    {label: 'Step Bolts/ Ladders', value: 'Step Bolts/ Ladders'},
    {label: 'Structure Numbering', value: 'Structure Numbering'},
    {label: 'Stay Wire', value: 'Stay Wire'},
    {label: 'Phase Indication', value: 'Phase Indication'},
    {
      label: 'Name Plates/ Danger Plates ',
      value: 'Name Plates/ Danger Plates ',
    },
    {label: 'Tower Braces', value: 'Tower Braces'},
    {label: 'PS (STP) Condition', value: 'PS (STP) Condition'},
    {label: 'PS (STP) Collapse', value: 'PS (STP) Collapse'},
    {label: 'PS (RCC) Collapse', value: 'PS (RCC) Collapse'},
    {label: 'PS (RCC) Condition', value: 'PS (RCC) Condition'},
    {label: 'Trees/ Bushes', value: 'Trees/ Bushes'},
  ]);

  const [openDiscrepancyPhase, setOpenDiscrepancyPhase] = useState(false);
  const [valueDiscrepancyPhase, setValueDiscrepancyPhase] = useState();
  const [itemsDiscrepancyPhase, setItemsDiscrepancyPhase] = useState([
    {label: 'Bird Nest', value: 'Bird Nest'},
    {label: 'Corona Ring', value: 'Corona Ring'},
    {label: 'Earth wire/ OPGW', value: 'Earth wire/ OPGW'},
    {label: 'Foundation', value: 'Foundation'},
    {label: 'Terrain/ Topography', value: 'Terrain/ Topography'},
    {label: 'Vibration Dampers/ Spacers', value: 'Vibration Dampers/ Spacers'},
    {label: 'Gantry', value: 'Gantry'},
    {label: 'Ground Clearance', value: 'Ground Clearance'},
    {label: 'Hardware Fittings', value: 'Hardware Fittings'},
    {label: 'Hookups', value: 'Hookups'},
    {label: 'Insulators', value: 'Insulators'},
    {label: 'Joints', value: 'Joints'},
    {label: 'Jumpers', value: 'Jumpers'},
    {label: 'PVC Wire', value: 'PVC Wire'},
    {label: 'Road Crossing', value: 'Road Crossing'},
    {label: 'Span Conductor', value: 'Span Conductor'},
    {label: 'Step Bolts/ Ladders', value: 'Step Bolts/ Ladders'},
    {label: 'Structure Numbering', value: 'Structure Numbering'},
    {label: 'Stay Wire', value: 'Stay Wire'},
    {label: 'Phase Indication', value: 'Phase Indication'},
    {
      label: 'Name Plates/ Danger Plates ',
      value: 'Name Plates/ Danger Plates ',
    },
    {label: 'Tower Braces', value: 'Tower Braces'},
    {label: 'PS (STP) Condition', value: 'PS (STP) Condition'},
    {label: 'PS (STP) Collapse', value: 'PS (STP) Collapse'},
    {label: 'PS (RCC) Collapse', value: 'PS (RCC) Collapse'},
    {label: 'PS (RCC) Condition', value: 'PS (RCC) Condition'},
    {label: 'Trees/ Bushes', value: 'Trees/ Bushes'},
  ]);

  const [openDiscrepancyType, setOpenDiscrepancyType] = useState(false);
  const [valueDiscrepancyType, setValueDiscrepancyType] = useState();
  const [itemsDiscrepancyType, setItemsDiscrepancyType] = useState([
    {label: 'Tower Related', value: 'Tower Related'},
    {label: 'Phase Related', value: 'Phase Related'},
  ]);

  const [openRectificationStatus, setOpenRectificationStatus] = useState(false);
  const [valueRectificationStatus, setValueRectificationStatus] = useState();
  const [itemsRectificationStatus, setItemsRectificationStatus] = useState([
    {label: 'Done', value: 'Done'},
    {label: 'Partially Done', value: 'Partially Done'},
    {label: 'Not Done', value: 'Not Done'},
  ]);

  const [openRectificationCount, setOpenRectificationCount] = useState(false);
  const [valueRectificationCount, setValueRectificationCount] = useState();
  const [itemsRectificationCount, setItemsRectificationCount] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
    {label: '32', value: '32'},
    {label: '33', value: '33'},
    {label: '34', value: '34'},
    {label: '35', value: '35'},
    {label: '36', value: '36'},
    {label: '37', value: '37'},
    {label: '38', value: '38'},
    {label: '39', value: '39'},
    {label: '40', value: '40'},
    {label: '41', value: '41'},
    {label: '42', value: '42'},
    {label: '43', value: '43'},
    {label: '44', value: '44'},
    {label: '45', value: '45'},
    {label: '46', value: '46'},
    {label: '47', value: '47'},
    {label: '48', value: '48'},
    {label: '49', value: '49'},
    {label: '50', value: '50'},
  ]);

  const [openRectificationTeam, setOpenRectificationTeam] = useState(false);
  const [valueRectificationTeam, setValueRectificationTeam] = useState();
  const [itemsRectificationTeam, setItemsRectificationTeam] = useState([
    {label: 'MT#1- FM', value: 'MT#1- FM'},
    {label: 'MT#2- IQ', value: 'MT#2- IQ'},
    {label: 'MT#3- SO', value: 'MT#3- SO'},
    {label: 'MT#4- IM', value: 'MT#4- IM'},
    {label: 'MT#5- WA', value: 'MT#5- WA'},
    {label: 'MT#6- SA', value: 'MT#6- SA'},
    {label: 'WST#7- SS', value: 'WST#7- SS'},
    {label: 'CLIT#8- AN', value: 'CLIT#8- AN'},
    {label: 'LWT#9- ZE', value: 'LWT#9- ZE'},
    {label: 'PTP#10- AR', value: 'PTP#10- AR'},
  ]);

  const [openInBetween, setOpenInBetween] = useState(false);
  const [valueInBetween, setValueInBetween] = useState();
  const [itemsInBetween, setItemsInBetween] = useState([
    {
      label: 'preceeding location to current location',
      value: 'preceeding location to current location',
    },
    {
      label: 'current location to succeeding location',
      value: 'current location to succeeding location',
    },
  ]);

  const [openFaultCount, setOpenFaultCount] = useState(false);
  const [valueFaultCount, setValueFaultCount] = useState();
  const [itemsFaultCount, setItemsFaultCount] = useState([
    {label: '1', value: '1'},
    {label: '2', value: '2'},
    {label: '3', value: '3'},
    {label: '4', value: '4'},
    {label: '5', value: '5'},
    {label: '6', value: '6'},
    {label: '7', value: '7'},
    {label: '8', value: '8'},
    {label: '9', value: '9'},
    {label: '10', value: '10'},
    {label: '11', value: '11'},
    {label: '12', value: '12'},
    {label: '13', value: '13'},
    {label: '14', value: '14'},
    {label: '15', value: '15'},
    {label: '16', value: '16'},
    {label: '17', value: '17'},
    {label: '18', value: '18'},
    {label: '19', value: '19'},
    {label: '20', value: '20'},
    {label: '21', value: '21'},
    {label: '22', value: '22'},
    {label: '23', value: '23'},
    {label: '24', value: '24'},
    {label: '25', value: '25'},
    {label: '26', value: '26'},
    {label: '27', value: '27'},
    {label: '28', value: '28'},
    {label: '29', value: '29'},
    {label: '30', value: '30'},
    {label: '31', value: '31'},
    {label: '32', value: '32'},
    {label: '33', value: '33'},
    {label: '34', value: '34'},
    {label: '35', value: '35'},
    {label: '36', value: '36'},
    {label: '37', value: '37'},
    {label: '38', value: '38'},
    {label: '39', value: '39'},
    {label: '40', value: '40'},
    {label: '41', value: '41'},
    {label: '42', value: '42'},
    {label: '43', value: '43'},
    {label: '44', value: '44'},
    {label: '45', value: '45'},
    {label: '46', value: '46'},
    {label: '47', value: '47'},
    {label: '48', value: '48'},
    {label: '49', value: '49'},
    {label: '50', value: '50'},
  ]);

  const [openCiticality, setOpenCiticality] = useState(false);
  const [valueCiticality, setValueCiticality] = useState();
  const [itemsCiticality, setItemsCiticality] = useState([
    {label: 'High', value: 'High'},
    {label: 'Low', value: 'Low'},
    {label: 'Medium', value: 'Medium'},
  ]);

  const [queryDate, setQueryDate] = useState('');
  const [mngrComment, setMngrComment] = useState('');
  const [userComment, setUserComment] = useState('');
  const [queryNo, setQueryNo] = useState('');
  const [username, setUsername] = useState('');
  const [objnr, setObjnr] = useState('');

  const [discrepancyImage, setDiscrepancyImage] = useState([]);
  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [isImage, setIsImage] = useState('N');
  const carouselRef = useRef();
  const flatListRef = useRef();
  const {width} = Dimensions.get('window');
  const [indexSelected, setIndexSelected] = useState(0);
  const {data, PtlSnro, StrSnro, CaseType} = route.params;
  const [empName, setEmpName] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [queryRemarks, setQueryRemarks] = useState(false);
  const [queryRemarksError, setQueryRemarksError] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date);
    setQueryDate(moment(date).format('DD.MM.YYYY'));
    //setBtnBackgroundColor('rgba(93,45,145,255)');
    hideDatePicker();
  };

  const PostQueriesRecord = () => {
    console.log('objnr: ' + objnr);
    console.log('username: ' + username);
    console.log('queryNo: ' + queryNo);
    console.log('userComment: ' + userComment);
    console.log('mngrComment: ' + mngrComment);

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPATROLLING_SRV/QueriesSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('tooba:abap123'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Objnr: objnr,
        Username: username,
        QueryNo: queryNo,
        UserComment: userComment,
        MngrComment: mngrComment,
      }),
    }).then(items => {
      console.log('**Updated');
      StoreInDevice('Post');
    });
  };
  const StoreInDevice = queryStatus => {
    AsyncStorage.getItem('QueriesData')
      .then(items => {
        var QueriesData = items ? JSON.parse(items) : [];
        QueriesData.filter((item, index) => {
          if (item.Objnr == data.Objnr && item.QueryNo == data.QueryNo) {
            QueriesData[index].UserComment = userComment;
            QueriesData[index].QueryStatus = queryStatus;
            console.log(userComment);
            AsyncStorage.setItem('QueriesData', JSON.stringify(QueriesData));
          }
        });
      })
      .then(items => {
        console.log(route.params.StrSnro);
        navigation.navigate('QueriesListView', {
          PtlSnro: route.params.PtlSnro,
          StrSnro: route.params.StrSnro,
        });
        navigation.navigate('QueriesListView', {
          Fl: route.params.Fl,
          StrFl: route.params.StrFl,
          PtlSnro: route.params.PtlSnro,
          StrSnro: route.params.StrSnro,
          isDiscrepancyScreenRequest: 'RectificationScreen',
        });
      });
  };

  useEffect(() => {
    console.log('route.params.data.QueryNo: ' + route.params.data.QueryNo);
    console.log('route.params.data.Username: ' + route.params.data.Username);

    setQueryDate(route.params.data.CreatedDate);
    setMngrComment(route.params.data.MngrComment);
    setUserComment(route.params.data.UserComment); //QueryNo
    setQueryNo(route.params.data.QueryNo);
    setUsername(route.params.data.Username);
    setObjnr(route.params.data.Objnr);
  }, []);

  const validate = (text, textLength) => {
    if (text.length <= textLength) {
      return false;
    }
    return true;
  };

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA,
          {
            title: 'Camera Permission',
            message: 'App needs camera permission',
          },
        );
        // If CAMERA Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        return false;
      }
    } else return true;
  };

  const requestExternalWritePermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title: 'External Storage Write Permission',
            message: 'App needs write permission',
          },
        );
        // If WRITE_EXTERNAL_STORAGE Permission is granted
        return granted === PermissionsAndroid.RESULTS.GRANTED;
      } catch (err) {
        console.warn(err);
        alert('Write permission err', err);
      }
      return false;
    } else return true;
  };

  const onSelect = indexSelected => {
    setIndexSelected(indexSelected);
    flatListRef?.current?.scrollToOffset({
      offset: indexSelected * THUMB_SIZE,
      animated: true,
    });
  };

  const captureImage = async (type, imageNo) => {
    let isCameraPermitted = await requestCameraPermission();
    let isStoragePermitted = await requestExternalWritePermission();

    console.log('isCameraPermitted', isCameraPermitted);
    console.log('isStoragePermitted', isStoragePermitted);

    if (isCameraPermitted) {
      ImagePicker.openCamera({
        width: 700,
        height: 700,
        cropping: true,
        includeBase64: true,
        compressImageQuality: 1,
      }).then(response => {
        if (response.didCancel) {
          //  alert('User cancelled camera picker');
          return;
        } else if (response.errorCode == 'camera_unavailable') {
          //  alert('Camera not available on device');
          return;
        } else if (response.errorCode == 'permission') {
          alert('Permission not satisfied');
          return;
        } else if (response.errorCode == 'others') {
          alert('captureImage: ' + response.errorMessage);
          return;
        }
        var Allimages = images;
        setIsImage('Y');
        setFilePath([
          {
            uri: response.path,
            url: response.path,
            fileName: 'consumerImage.jpg',
            base64: response.data,
          },
          ...Allimages,
        ]);
        setImages([
          {
            uri: response.path,
            url: response.path,
            fileName: 'BFDC.jpg',
            base64: response.data,
            Status: 'Pending',
            RoshniBajiWebID: '',
          },
          ...Allimages,
        ]);
        console.log('images1.uri----ali', images[0].uri);
      });
    }
  };

  const chooseFile = type => {
    ImagePicker.openPicker({
      width: 700,
      height: 700,
      cropping: true,
      includeBase64: true,
      compressImageQuality: 1,
    }).then(response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        // alert('User cancelled camera picker');
        return;
      } else if (response.errorCode == 'camera_unavailable') {
        // alert('Camera not available on device');
        return;
      } else if (response.errorCode == 'permission') {
        alert('Permission not satisfied');
        return;
      } else if (response.errorCode == 'others') {
        alert('chooseFile: ' + response.errorMessage);
        return;
      }

      setIsImage('Y');

      var Allimages = images;

      setFilePath([
        {
          uri: response.path,
          url: response.path,
          fileName: 'BFDC.jpg',
          base64: response.data,
          Status: 'Pending',
          RoshniBajiWebID: '',
        },
        ...Allimages,
      ]);
      setImages([
        {
          uri: response.path,
          url: response.path,
          fileName: 'BFDC.jpg',
          base64: response.data,
          Status: 'Pending',
          RoshniBajiWebID: '',
        },
        ...Allimages,
      ]);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{paddingTop: 10}}></View>

        <View style={styles.header}>
          <Text style={[styles.logo]}> Queries Screen</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Query Date:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              style={[
                styles.text_left,
                {borderLeftWidth: 0, borderRightWidth: 0},
              ]}
              value={moment(queryDate).format('MMMM Do YYYY')}
              placeholder=""
              keyboardType="default"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Object No:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              style={[
                styles.text_left,
                {borderLeftWidth: 0, borderRightWidth: 0},
              ]}
              value={objnr}
              placeholder=""
              keyboardType="default"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Query No:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              style={[
                styles.text_left,
                {borderLeftWidth: 0, borderRightWidth: 0},
              ]}
              value={queryNo.toString()}
              placeholder=""
              keyboardType="default"
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Manager Comment:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              multiline={true}
              onChangeText={text => {
                setRemarks(text);
                if (validate(text, 255)) {
                  setQueryRemarksError(
                    'Input must be at least 255 characters long.',
                  );
                } else setQueryRemarksError('');
              }}
              placeholder={'Any comment (if required)'}
              placeholderTextColor="black"
              style={{
                height: 150,
                width: '100%',
                borderWidth: 0.75,
                textAlign: 'left',
                textAlignVertical: 'top',
                color: 'black',
              }}
              value={mngrComment}
              editable={false}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>User Remarks:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              multiline={true}
              onChangeText={text => {
                setUserComment(text);
                if (validate(text, 255)) {
                  setQueryRemarksError(
                    'Input must be at least 255 characters long.',
                  );
                } else setQueryRemarksError('');
              }}
              placeholder={'Any comment (if required)'}
              placeholderTextColor="black"
              style={{
                height: 150,
                width: '100%',
                borderWidth: 0.75,
                textAlign: 'left',
                textAlignVertical: 'top',
                color: 'black',
              }}
              value={userComment}
              editable={isEditable}
            />
            {setQueryRemarksError !== '' && (
              <Text style={styles.error}>{queryRemarksError}</Text>
            )}
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            disabled={!isEditable}
            style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
            onPress={() => {
              StoreInDevice('Saved');
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Save</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={!isEditable}
            style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
            onPress={() => {
              PostQueriesRecord();
            }}>
            <Text style={{color: 'white', fontSize: 18}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    paddingLeft: 5,
    //    backgroundColor: 'pink',
    //        flexDirection: "row",
  },

  text_main: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    //  padding: 15,
  },
  text_left: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    //padding: 15,
  },
  pic_text_left: {
    color: '#111012',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: 15,
  },
  text_right: {
    color: '#111012',
    fontSize: 15,
    textAlign: 'center',
    //padding: 15,
  },

  formheader: {
    flex: 1,
    //    justifyContent:'space-between',
    //paddingBottom: 50,
    //backgroundColor: 'red',
  },

  tinyLogo: {
    width: '96%',
    height: 100,
    paddingHorizontal: 20,
    resizeMode: 'contain',
  },

  imageStyle: {
    width: 50,
    height: 50,
    // margin: 5,
  },

  loginBtn: {
    width: '80%',
    borderRadius: 25,
    height: 40,
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
  logo: {
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
  header: {
    width: '100%',
    backgroundColor: 'rgba(93,45,145,255)',
    //height: 50,
    //paddingTop: 100,
    //        flex: 1,
    //      justifyC3ntent: 'flex-end',
    //paddingHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
    //paddingBottom: 100,
  },
});

export default QueriesScreen;
