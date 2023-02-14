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
} from 'react-native';

import AsyncStorage from 'react-native-encrypted-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import {ScrollView} from 'react-native-gesture-handler';
import ImageView from 'react-native-image-viewing';
import moment from 'moment';
import Geolocation from '@react-native-community/geolocation';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import base64 from 'react-native-base64';

import axios from 'axios';

import {
  launchCamera,
  launchImageLibrary,
  //    ImagePicker,
  Select,
} from 'react-native-image-picker';

import ImagePicker from 'react-native-image-crop-picker';
import {set} from 'react-native-reanimated';

const WorkScheduleDetail = ({navigation, route}) => {
  const carouselRef = useRef();

  const [visible1, setIsVisible1] = useState(false);
  const [visible2, setIsVisible2] = useState(false);
  const [visible3, setIsVisible3] = useState(false);
  const [visible4, setIsVisible4] = useState(false);

  const [imageCount, setImageCount] = useState();
  const [imageShow, setImageShow] = useState(true);
  const [image1Show, setImage1Show] = useState(false);
  const [image2Show, setImage2Show] = useState(false);
  const [image3Show, setImage3Show] = useState(false);
  const [image4Show, setImage4Show] = useState(false);
  const [image1Take, setImage1Take] = useState(false);
  const [image2Take, setImage2Take] = useState(false);
  const [image3Take, setImage3Take] = useState(false);

  const [payShow, setPayShow] = useState(false);

  const [image1, setImage1] = useState([]);
  const [image2, setImage2] = useState([]);
  const [image3, setImage3] = useState([]);
  const [image4, setImage4] = useState([]);

  const [images1, setImages1] = useState([]);
  const [images2, setImages2] = useState([]);
  const [images3, setImages3] = useState([]);
  const [images4, setImages4] = useState([]);

  const [loader, setLoader] = useState(false);
  const [name, setName] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const [MeterReading, setMeterReading] = useState('');
  const [DCRemarks, setDCRemarks] = useState('');

  const [pnumber, setPnumber] = useState('');
  const [imUser, setImUser] = useState('');

  const [savedDate, setSavedDate] = useState('');
  const [savedTime, setSavedTime] = useState('');

  const [latitude1, setlatitude] = useState('');
  const [longitude1, setlongitude] = useState('');

  const [PayDate, setPayDate] = useState('');
  const [PayAmount, setPayAmount] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [PicLink1, setPicLink1] = useState('');
  const [PicLink2, setPicLink2] = useState('');
  const [PicLink3, setPicLink3] = useState('');
  const [PicLink4, setPicLink4] = useState('');

  const [isReadingRequired, setIsReadingRequired] = useState('Y');
  const [isPostCase, setIsPostCase] = useState(false);
  const [isSavedCase, setIsSavedCase] = useState(false);
  const [caseType, setcaseType] = useState();

  const [isDCRemarksEditable, setIsDCRemarksEditable] = useState(false);
  const [isMeterReadingEditable, setIsMeterReadingEditable] = useState(true);

  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    'rgba(227,226,222,255)',
  );

  const [isSavedBtn, setIsSavedBtn] = useState(true);
  const [isPostBtn, setIsPostBtn] = useState(true);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState();

  const [items, setItems] = useState([
    //        { label: '-- Please Select --', value: '', imageCount: 0 },
    {
      label: 'Disconnected',
      value: 'DC',
      imageCount: 3,
      picture1Title: 'Before DC',
      picture2Title: 'After DC',
      picture3Title: 'Premise',
      isReadingRequired: 'Y',
    },
    {
      label: 'Found DC',
      value: 'FD',
      imageCount: 2,
      picture1Title: 'After DC',
      picture2Title: 'Premise',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'No Meter Hook Removed',
      value: 'NM',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Temporary Premises Closed',
      value: 'TPC',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Permanent Premises Closed',
      value: 'PPC',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Address Not Found',
      value: 'ANF',
      imageCount: 0,
      picture1Title: '',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Not Allowed',
      value: 'NA',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'N',
    },
    {
      label: 'Already Paid',
      value: 'AP',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Court Case',
      value: 'CC',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Disputed billing',
      value: 'DB',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Rebate',
      value: 'R',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    {
      label: 'Warning',
      value: 'W',
      imageCount: 1,
      picture1Title: 'Premise',
      picture2Title: '',
      picture3Title: '',
      isReadingRequired: 'Y',
    },
    //{ label: 'Payment Made', value: 'PM', imageCount: 1, picture1Title: 'Premise', picture2Title: '', picture3Title: '' ,isReadingRequired:'Y'}
  ]);

  const [picture1Title, setPicture1Title] = useState();
  const [picture2Title, setPicture2Title] = useState();
  const [picture3Title, setPicture3Title] = useState();
  const [picture4Title, setPicture4Title] = useState();

  const [data3, setdata3] = useState([]);
  const [data3Images, setdata3Images] = useState([]);

  const [currentBill, setCurrentBill] = useState();
  const [totalDues, setTotalDues] = useState();
  const [lastPaidAmount, setLastPaidAmount] = useState();

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

  /*
        const requestLOCATIONPermission = async () => {
            if (Platform.OS === 'android') {
                try {
                    const granted = await PermissionsAndroid.request(
                        PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                        {
                            title: 'LOCATION Permission',
                            message: 'App needs access to your location ',
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
    */

  const onSelectDropDown = item => {
    if (item == '0') {
      setImage1([]);
      setImages1([]);
      setImage2([]);
      setImages2([]);
      setImage3([]);
      setImages3([]);
    }
    if (item == '1') {
      setImage2([]);
      setImages2([]);
      setImage3([]);
      setImages3([]);
    }
    if (item == '2') {
      setImage3([]);
      setImages3([]);
    }
  };

  const insertImage4 = () => {
    console.log('IMAGE 4 Posting started: ');

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
        imageName: 'PaidBill.jpg',
        imageData: image4.base64,
        accountNumber: data3.Vertrag,
        dcOrderNumber: data3.Discno,
        //                    "dcOrderNumber": "9022803814",
        ibc: data3.ImIbc,
      }),
    })
      .then(resp => {
        console.log('POST IMAGE 4 RESPONSE: ' + resp.data.StatusMessage);

        if (caseType == 'Post') {
          navigation.navigate('WorkSchedule', {
            otherParam: 'PostCases',
          });
        } else if (caseType == 'SavedCases') {
          navigation.navigate('WorkSchedule', {
            otherParam: 'Saved',
          });
        } else {
          navigation.navigate('WorkSchedule', {
            otherParam: 'NewCases',
          });
        }

        return;
      })

      .catch(error => {});
  };

  const insertImage = () => {
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
        imageData: image1.base64,
        accountNumber: data3.Vertrag,
        dcOrderNumber: data3.Discno,
        //                    "dcOrderNumber": "9022803814",
        ibc: data3.ImIbc,
      }),
    })
      .then(resp => {
        console.log('POST IMAGE 1 RESPONSE: ' + resp.StatusMessage);

        if (imageCount > 1) {
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
              imageData: image2.base64,
              accountNumber: data3.Vertrag,
              dcOrderNumber: data3.Discno,
              ibc: data3.ImIbc,
            }),
          })
            .then(resp => {
              console.log('POST IMAGE 2 RESPONSE: ' + resp.StatusMessage);

              if (imageCount > 2) {
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
                    imageData: image3.base64,
                    accountNumber: data3.Vertrag,
                    dcOrderNumber: data3.Discno,
                    ibc: data3.ImIbc,
                  }),
                })
                  .then(resp => {
                    console.log('POST IMAGE 3 RESPONSE: ' + resp.StatusMessage);

                    if (caseType == 'Post') {
                      navigation.navigate('WorkSchedule', {
                        otherParam: 'PostCases',
                      });
                    } else if (caseType == 'SavedCases') {
                      navigation.navigate('WorkSchedule', {
                        otherParam: 'Saved',
                      });
                    } else {
                      navigation.navigate('WorkSchedule', {
                        otherParam: 'NewCases',
                      });
                    }

                    return;
                  })
                  .catch(error => {});
              } else {
                if (caseType == 'Post') {
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'PostCases',
                  });
                } else if (caseType == 'SavedCases') {
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'Saved',
                  });
                } else {
                  navigation.navigate('WorkSchedule', {
                    otherParam: 'NewCases',
                  });
                }
                return;
              }
            })
            .catch(error => {});
        } else {
          if (caseType == 'Post') {
            navigation.navigate('WorkSchedule', {
              otherParam: 'PostCases',
            });
          } else if (caseType == 'SavedCases') {
            navigation.navigate('WorkSchedule', {
              otherParam: 'Saved',
            });
          } else {
            navigation.navigate('WorkSchedule', {
              otherParam: 'NewCases',
            });
          }
          return;
        }
      })
      .catch(error => {});
  };

  const LoginRequest = (
    back,
    backPinGeneration,
    btnType,
    userPassword,
    loader,
  ) => {
    if (DCRemarks == null) {
      alert('please select DC Remarks');
      setLoader(false);
      return true;
    }

    if (latitude1 == '') {
      alert('Location is not enabled on your mobile phone. Kindly enable it.');
      setLoader(false);
      return true;
    }

    if (btnType == 'Saved') {
      console.log('SAVED:MeterReading: ' + MeterReading);
      if (MeterReading == '' && isReadingRequired == 'Y') {
        alert('please insert meter reading');
        setLoader(false);
        return;
      }
      AsyncStorage.getItem('DCRCRecord').then(async items => {
        let data = JSON.parse(items);
        data.filter((item, index) => {
          if (item.Vertrag == route.params.otherParam) {
            if (isPostCase) data[index].RecordStatus = 'Post';
            else data[index].RecordStatus = 'Saved';

            data[index].Image[0] = image1;
            data[index].Image[1] = image2;
            data[index].Image[2] = image3;
            data[index].Image[3] = image4;
            data[index].PicLink1 = PicLink1;
            data[index].PicLink2 = PicLink2;
            data[index].PicLink3 = PicLink3;
            data[index].PicLink4 = PicLink4;

            data[index].MeterReading = MeterReading;
            data[index].MrNote = DCRemarks;
            data[index].ImageCount = imageCount;
            data[index].isReadingRequired = isReadingRequired;
            data[index].LinemanPaydate = PayDate;
            data[index].LinemanPayamnt = PayAmount;

            if (!isSavedCase) {
              data[index].SavedDate = savedDate;
              data[index].SavedTime = savedTime;
              data[index].ImLati = latitude1;
              data[index].ImLong = longitude1;
            }

            //data[index].PayDate = PayDate;
            //data[index].PayAmount = PayAmount;

            AsyncStorage.setItem('DCRCRecord', JSON.stringify(data));
          }
        });
        //
      });
      console.log('typeof imageCount: ' + typeof imageCount);
      console.log('imageCount: ' + imageCount);
      if (imageCount == 1 && image1.base64 === undefined) {
        alert('Please take ' + picture1Title + ' Picture');
        setLoader(false);
        return;
      }
      if (imageCount == 2) {
        if (image1.base64 === undefined) {
          alert('Please take ' + picture1Title + ' Picture');
          setLoader(false);
          return;
        } else if (image2.base64 === undefined) {
          alert('Please take ' + picture2Title + ' Picture');
          setLoader(false);
          return;
        }
      }
      if (imageCount == 3) {
        if (image1.base64 === undefined) {
          alert('Please take ' + picture1Title + ' Picture');
          setLoader(false);
          return;
        } else if (image2.base64 === undefined) {
          alert('Please take ' + picture2Title + ' Picture');
          setLoader(false);
          return;
        } else if (image3.base64 === undefined) {
          alert('Please take ' + picture3Title + ' Picture');
          setLoader(false);
          return;
        }
      }
      if (caseType == 'Post') {
        navigation.navigate('WorkSchedule', {
          otherParam: 'PostCases',
        });
      } else if (caseType == 'SavedCases') {
        navigation.navigate('WorkSchedule', {
          otherParam: 'Saved',
        });
      } else {
        navigation.navigate('WorkSchedule', {
          otherParam: 'NewCases',
        });
      }
      return;
    }

    if (btnType == 'Post') {
      console.log('Post');
      console.log('pnumber: ' + pnumber);
      console.log('imUser: ' + imUser);
      console.log('MeterReading: ' + MeterReading);
      console.log('DCRemarks: : ' + DCRemarks);
      console.log('savedDate: ' + savedDate);
      console.log('savedTime: ' + savedTime);
      console.log('latitude1: ' + latitude1);
      console.log('longitude1: ' + longitude1);
      console.log('LinemanPaydate: ' + PayDate);
      console.log('LinemanPayamnt: ' + PayAmount);
      console.log('Vertrag: ' + data3.Vertrag);
      console.log('Discno: ' + data3.Discno);
      console.log('PicLink1: ' + PicLink1);
      console.log('PicLink2: ' + PicLink2);
      console.log('PicLink3: ' + PicLink3);
      console.log('PicLink4: ' + PicLink4);

      if (MeterReading == '' && isReadingRequired == 'Y') {
        alert('please insert meter reading');
        setLoader(false);
        return;
      }

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
            ImPnumber: pnumber,
            ImUser: imUser,
            ImMeterReading: MeterReading,
            MrNote: DCRemarks,
            SaveDate: savedDate,
            SaveTime: savedTime,
            ImLati: latitude1,
            ImLong: longitude1,
            PicLink1: PicLink1,
            PicLink2: PicLink2,
            PicLink3: PicLink3,
            PicLink4: PicLink4,

            LinemanPaydate: PayDate,
            LinemanPayamnt: PayAmount,
          },
        }),
      })
        .then(res => {
          console.log(res.data.d.ImMessage);
          if (res.data.d.ImMessage == 'RECORD UPDATED!!') {
            AsyncStorage.getItem('DCRCRecord').then(async items => {
              let data = JSON.parse(items);
              data.filter((item, index) => {
                if (item.Vertrag == route.params.otherParam) {
                  data[index].RecordStatus = 'Post';
                  data[index].Image[0] = image1;
                  data[index].Image[1] = image2;
                  data[index].Image[2] = image3;
                  data[index].Image[3] = image4;
                  data[index].PicLink1 = PicLink1;
                  data[index].PicLink2 = PicLink2;
                  data[index].PicLink3 = PicLink3;
                  data[index].PicLink4 = PicLink4;
                  data[index].MeterReading = MeterReading;
                  data[index].MrNote = DCRemarks;
                  data[index].ImageCount = imageCount;
                  data[index].isReadingRequired = isReadingRequired;

                  data[index].LinemanPaydate = PayDate;
                  data[index].LinemanPayamnt = PayAmount;

                  data[index].SavedDate = savedDate;
                  data[index].SavedTime = savedTime;
                  data[index].ImLati = latitude1;
                  data[index].ImLong = longitude1;

                  AsyncStorage.setItem('DCRCRecord', JSON.stringify(data));
                }
              });
            });
            if (data3.RecordStatus == 'Post') {
              console.log('***imageCount: 4 Paid Bill Only');
              insertImage4();
            } else if (imageCount > 0 && imageCount < 4) {
              console.log('imageCount: ' + imageCount);
              insertImage();
            } else {
              if (caseType == 'Post') {
                navigation.navigate('WorkSchedule', {
                  otherParam: 'PostCases',
                });
              } else if (caseType == 'SavedCases') {
                navigation.navigate('WorkSchedule', {
                  otherParam: 'Saved',
                });
              } else {
                navigation.navigate('WorkSchedule', {
                  otherParam: 'NewCases',
                });
              }
              return;
            }
          }
        })
        .catch(error => {
          console.error(error);
          alert(error);
        });
    }
  };

  const selectImageGallery = async (type, imageNo) => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(response => {
      if (imageNo == '1') {
        setImageCount(1);
        var Allimage1 = image1;
        setImage1({
          uri: response.path,
          url: response.path,
          fileName: 'BFDC.jpg',
          base64: response.data,
        });
        setImages1([
          {
            uri: response.path,
            url: response.path,
            fileName: 'BFDC.jpg',
            base64: response.data,
          },
        ]);
        setPicLink1(
          'http://dc-rc.ke.com.pk/DCRCImages/' +
            data3.ImIbc +
            '/' +
            data3.Vertrag +
            '/' +
            data3.Discno +
            '/BFDC.jpg',
        );
        //                    console.log("imageCount: " + imageCount);
        //                    console.log("images1 uri *****" + image1.filename);
        //                    console.log("images1 base64 ************* : " + image1.base64);
      }
      if (imageNo == '2') {
        setImageCount(2);
        var Allimage2 = image2;
        setImage2({
          uri: response.path,
          url: response.path,
          fileName: 'AFDC.jpg',
          base64: response.data,
        });
        setImages2([
          {
            uri: response.path,
            url: response.path,
            fileName: 'AFDC.jpg',
            base64: response.data,
          },
        ]);
        setPicLink2(
          'http://dc-rc.ke.com.pk/DCRCImages/' +
            data3.ImIbc +
            '/' +
            data3.Vertrag +
            '/' +
            data3.Discno +
            '/AFDC.jpg',
        );
        //                   console.log("imageCount: " + imageCount);
        //                   console.log("images2 uri *****" + image2.filename);
        //                   console.log("images2 base64 ************* : " + image2.base64);
      }
      if (imageNo == '3') {
        setImageCount(3);
        var Allimage3 = image3;
        setImage3({
          uri: response.path,
          url: response.path,
          fileName: 'PRDC.jpg',
          base64: response.data,
        });
        setImages3([
          {
            uri: response.path,
            url: response.path,
            fileName: 'PRDC.jpg',
            base64: response.data,
          },
        ]);
        setPicLink3(
          'http://dc-rc.ke.com.pk/DCRCImages/' +
            data3.ImIbc +
            '/' +
            data3.Vertrag +
            '/' +
            data3.Discno +
            '/PRDC.jpg',
        );
        //                   console.log("imageCount: " + imageCount);
        //                   console.log("images3 uri *****" + image3.filename);
        //                   console.log("images3 base64 ************* : " + image3.base64);
      }
      if (imageNo == '4') {
        setImageCount(4);
        var Allimage3 = image4;
        setImage4({
          uri: response.path,
          url: response.path,
          fileName: 'PaidBill.jpg',
          base64: response.data,
        });
        setImages4([
          {
            uri: response.path,
            url: response.path,
            fileName: 'PaidBill.jpg',
            base64: response.data,
          },
        ]);
        setPicLink4(
          'http://dc-rc.ke.com.pk/DCRCImages/' +
            data3.ImIbc +
            '/' +
            data3.Vertrag +
            '/' +
            data3.Discno +
            '/PaidBill.jpg',
        );
        //                   console.log("imageCount: " + imageCount);
        //                   console.log("images3 uri *****" + image3.filename);
        //                   console.log("images3 base64 ************* : " + image3.base64);
      }
    });
  };
  const captureImage = async (type, imageNo) => {
    let options = {
      mediaType: type,
      maxWidth: 300,
      maxHeight: 550,
      quality: 1,
      includeBase64: true,
      videoQuality: 'low',
      durationLimit: 30, //Video max duration in seconds
      saveToPhotos: true,
    };

    let isCameraPermitted = await requestCameraPermission();
    //let isLocationPermitted = await requestLOCATIONPermission();
    console.log('isCameraPermitted: ' + isCameraPermitted);
    if (isCameraPermitted) {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      }).then(response => {
        //console.log(response.data);
        //console.log(response.path);
        //console.log(response.data);

        //launchCamera(options, (response) => {
        if (imageNo == '1') {
          setImageCount(1);
          var Allimage1 = image1;
          setImage1({
            uri: response.path,
            url: response.path,
            fileName: 'BFDC.jpg',
            base64: response.data,
          });
          setImages1([
            {
              uri: response.path,
              url: response.path,
              fileName: 'BFDC.jpg',
              base64: response.data,
            },
          ]);
          setPicLink1(
            'http://dc-rc.ke.com.pk/DCRCImages/' +
              data3.ImIbc +
              '/' +
              data3.Vertrag +
              '/' +
              data3.Discno +
              '/BFDC.jpg',
          );
          //                    console.log("imageCount: " + imageCount);
          //                    console.log("images1 uri *****" + image1.filename);
          //                    console.log("images1 base64 ************* : " + image1.base64);
        }
        if (imageNo == '2') {
          setImageCount(2);
          var Allimage2 = image2;
          setImage2({
            uri: response.path,
            url: response.path,
            fileName: 'AFDC.jpg',
            base64: response.data,
          });
          setImages2([
            {
              uri: response.path,
              url: response.path,
              fileName: 'AFDC.jpg',
              base64: response.data,
            },
          ]);
          setPicLink2(
            'http://dc-rc.ke.com.pk/DCRCImages/' +
              data3.ImIbc +
              '/' +
              data3.Vertrag +
              '/' +
              data3.Discno +
              '/AFDC.jpg',
          );
          //                   console.log("imageCount: " + imageCount);
          //                   console.log("images2 uri *****" + image2.filename);
          //                   console.log("images2 base64 ************* : " + image2.base64);
        }
        if (imageNo == '3') {
          setImageCount(3);
          var Allimage3 = image3;
          setImage3({
            uri: response.path,
            url: response.path,
            fileName: 'PRDC.jpg',
            base64: response.data,
          });
          setImages3([
            {
              uri: response.path,
              url: response.path,
              fileName: 'PRDC.jpg',
              base64: response.data,
            },
          ]);
          setPicLink3(
            'http://dc-rc.ke.com.pk/DCRCImages/' +
              data3.ImIbc +
              '/' +
              data3.Vertrag +
              '/' +
              data3.Discno +
              '/PRDC.jpg',
          );
          //                   console.log("imageCount: " + imageCount);
          //                   console.log("images3 uri *****" + image3.filename);
          //                   console.log("images3 base64 ************* : " + image3.base64);
        }
        if (imageNo == '4') {
          var Allimage3 = image4;
          //setImageCount(4);
          setImage4({
            uri: response.path,
            url: response.path,
            fileName: 'PaidBill.jpg',
            base64: response.data,
          });
          setImages4([
            {
              uri: response.path,
              url: response.path,
              fileName: 'PaidBill.jpg',
              base64: response.data,
            },
          ]);
          setPicLink4(
            'http://dc-rc.ke.com.pk/DCRCImages/' +
              data3.ImIbc +
              '/' +
              data3.Vertrag +
              '/' +
              data3.Discno +
              '/PaidBill.jpg',
          );
          //                   console.log("imageCount: " + imageCount);
          //                   console.log("images3 uri *****" + image3.filename);
          //                   console.log("images3 base64 ************* : " + image3.base64);
        }
      });
    }
  };

  const getUserCurrentLocation = async () => {
    Geolocation.getCurrentPosition(
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        const currentLatitude = JSON.stringify(position.coords.latitude);

        setlatitude(currentLatitude.slice(0, 8));
        setlongitude(currentLongitude.slice(0, 8));

        console.log('latitude1 : ' + latitude1);
        console.log('longitude1: ' + longitude1);
      },
      error => console.log('Geolocation Error: ' + error.message),
      {
        enableHighAccuracy: false,
        timeout: 2000,
        maximumAge: 3600000,
      },
    );
  };

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    //console.warn("A date has been picked: ", date);
    setPayDate(moment(date).format('YYYYMMDD'));
    setBtnBackgroundColor('rgba(93,45,145,255)');
    hideDatePicker();
  };

  useEffect(() => {
    let data2 = route.params.data;
    console.log('route.params.index' + route.params.index);

    //LogBox.ignoreWarnings(['VirtualizedLists should never be nested']);
    LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

    setdata3(data2);
    //setdata3Images(data2.Image);

    console.log('data2.Image[0].uri ' + data2.Image[0].uri);
    console.log('data2.MrNote: ' + data2.MrNote);

    setImage1(data2.Image[0] ? data2.Image[0] : {});
    setImages1(data2.Image[0] ? [data2.Image[0]] : [{}]);
    setImage2(data2.Image[1] ? data2.Image[1] : {});
    setImages2(data2.Image[1] ? [data2.Image[1]] : [{}]);
    setImage3(data2.Image[2] ? data2.Image[2] : {});
    setImages3(data2.Image[2] ? [data2.Image[2]] : [{}]);
    setImage4(data2.Image[3] ? data2.Image[3] : {});
    setImages4(data2.Image[3] ? [data2.Image[3]] : [{}]);

    setMeterReading(data2.MeterReading);
    setValue(data2.MrNote);
    setImageCount(data2.ImageCount);
    setPnumber(data2.Pnumber);
    setImUser(data2.ImUser);
    setIsReadingRequired(data2.isReadingRequired);
    setDCRemarks(data2.MrNote);

    setPicLink1(data2.PicLink1);
    setPicLink2(data2.PicLink2);
    setPicLink3(data2.PicLink3);

    setcaseType(data2.RecordStatus);
    setCurrentBill(data2.CurrentDues.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    setTotalDues(data2.TotDues.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    setLastPaidAmount(data2.AsonDues.replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    setPayAmount(data2.LinemanPayamnt);
    setPayDate(data2.LinemanPaydate);

    console.log('savedTime: ' + savedTime);
    console.log('savedDate: ' + savedDate);

    getUserCurrentLocation();

    console.log('IMAGE COUNT INSIDE: ' + data2.ImageCount);
    console.log('data2.PicLink1: ' + data2.PicLink1);

    if (data2.ImageCount == '0') {
      setImage1Show(false);
      setImage2Show(false);
      setImage3Show(false);
      setImage1Take(false);
      setImage2Take(false);
      setImage3Take(false);
    }
    if (data2.ImageCount == '1') {
      setImage1Show(true);
      setImage2Show(false);
      setImage3Show(false);
      setImage1Take(true);
      setImage2Take(false);
      setImage3Take(false);
    }
    if (data2.ImageCount == '2') {
      setImage1Show(true);
      setImage2Show(true);
      setImage3Show(false);
      setImage1Take(true);
      setImage2Take(true);
      setImage3Take(false);
    }
    if (data2.ImageCount == '3') {
      setImage1Show(true);
      setImage2Show(true);
      setImage3Show(true);
      setImage1Take(true);
      setImage2Take(true);
      setImage3Take(true);
    }

    items.map(item => {
      if (data2.MrNote == item.value) {
        setPicture1Title(item.picture1Title);
        setPicture2Title(item.picture2Title);
        setPicture3Title(item.picture3Title);
      }
    });

    if (data2.RecordStatus == 'Post') {
      setImage4Show(true);
      setPicture4Title('Paid Bill');
      setImage1Take(false);
      setImage2Take(false);
      setImage3Take(false);
      setIsMeterReadingEditable(false);
      setIsDCRemarksEditable(true);
      setIsPostBtn(false);
      setIsSavedBtn(true);
      setIsPostCase(true);
      setPayShow(true);
      console.log('setPayShow' + payShow);
      setSavedDate(data2.SavedDate);
      setSavedTime(data2.SavedTime);
    } else if (data2.RecordStatus == 'Saved') {
      setIsSavedBtn(false);
      setIsSavedCase(true);
    } else {
      setIsSavedBtn(false);
      setIsPostBtn(false);
      setSavedDate(moment(Date.now()).format('YYYYMMDD'));
      setSavedTime(moment(Date.now()).format('HHmmss'));
    }
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={{paddingTop: 10}}></View>
      <View style={styles.header}>
        <Text style={[styles.logo]}> Work Schedule Detail</Text>
      </View>
      {/*
            <Image
                style={styles.tinyLogo}
                source={require('../assets/images/kelogo.jpg')}
            />
            <View style={styles.header}>
                <Text style={styles.text_main}>Daily History</Text>
            </View>
*/}
      <View style={[styles.formheader, {}]}>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Account No:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{data3.Vkont}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Meter No:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{data3.Mtno}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Consumer No:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{data3.ConsumerNo}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Contract:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{data3.Vertrag}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Name:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{data3.ConsumerName}</Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Address:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{data3.ConsumerAdd}</Text>
          </View>
        </View>
        <View
          style={{
            height: 1,
            //marginVertical: 10,
            width: '100%',
            backgroundColor: 'black',
          }}></View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Current Bill:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={[styles.text_right, {fontWeight: 'bold'}]}>
              {currentBill}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Total Dues:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={[styles.text_right, {fontWeight: 'bold'}]}>
              {totalDues}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Last Paid Date:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>
              {moment(data3.AsonPaydt, 'YYYYMMDD').format('Do MMM YYYY')}
            </Text>
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_left}>Last Paid Amt:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.text_right}>{lastPaidAmount}</Text>
          </View>
        </View>
      </View>
      <View
        style={{
          height: 1,
          //marginVertical: 10,
          width: '100%',
          backgroundColor: 'black',
          paddingtop: 20,
        }}></View>

      <View style={styles.header}>
        <Text style={[styles.logo]}> User Input</Text>
      </View>
      <View style={[styles.formheader, {}]}>
        <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Meter Reading:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              style={[
                styles.text_left,
                {borderLeftWidth: 0, borderRightWidth: 0},
              ]}
              onChangeText={text => {
                let newText = '';
                let numbers = '0123456789';

                for (var i = 0; i < text.length; i++) {
                  if (numbers.indexOf(text[i]) > -1) {
                    newText = newText + text[i];
                  } else {
                    alert('please enter numbers only');
                  }
                }
                setMeterReading(newText);
              }}
              value={MeterReading}
              maxLength={8}
              placeholder="Meter Reading"
              keyboardType="numeric"
              editable={isMeterReadingEditable}
            />
          </View>
        </View>
        <View style={{flexDirection: 'row', flex: 0.1, width: '96%', top: 1}}>
          <View style={{flex: 0.5, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>DC Remarks:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              disabled={isDCRemarksEditable}
              onChangeValue={item => {
                console.log('onChangeValue: ' + item);
                setDCRemarks(item);
                if (item == 'AP' || caseType == 'Post') {
                  setPayShow(true);
                } else {
                  setPayShow(false);
                  setPayDate('');
                  setPayAmount('0');
                }
              }}
              onSelectItem={item => {
                setBtnBackgroundColor('rgba(93,45,145,255)');
                onSelectDropDown(item.imageCount);
                setImageCount(item.imageCount);
                setIsReadingRequired(item.isReadingRequired);
                setPicture1Title(item.picture1Title);
                setPicture2Title(item.picture2Title);
                setPicture3Title(item.picture3Title);
                console.log(
                  'onSelectItem:item.imageCount: ' + typeof item.imageCount,
                );
                if (item.imageCount == '0') {
                  console.log('onChangeValue: ' + item);
                  //setImage0Show(false);
                  setImage1Show(false);
                  setImage2Show(false);
                  setImage3Show(false);
                  setImage1Take(false);
                  setImage2Take(false);
                  setImage3Take(false);
                }
                if (item.imageCount == '1') {
                  console.log('OneImage: ' + item);
                  setImageShow(true);
                  setImage1Show(true);
                  setImage2Show(false);
                  setImage3Show(false);
                  setImage1Take(true);
                  setImage2Take(false);
                  setImage3Take(false);
                }
                if (item.imageCount == '2') {
                  console.log('TwoImage: ' + item);
                  setImageShow(true);
                  setImage1Show(true);
                  setImage2Show(true);
                  setImage3Show(false);
                  setImage1Take(true);
                  setImage2Take(true);
                  setImage3Take(false);
                }
                if (item.imageCount == '3') {
                  console.log('ThreeImage: ' + item);
                  setImageShow(true);
                  setImage1Show(true);
                  setImage2Show(true);
                  setImage3Show(true);
                  setImage1Take(true);
                  setImage2Take(true);
                  setImage3Take(true);
                }
              }}
            />
          </View>
          <View>
            <DateTimePickerModal
              isVisible={isDatePickerVisible}
              mode="date"
              onConfirm={handleConfirm}
              onCancel={hideDatePicker}
            />
          </View>
        </View>
        {payShow ? (
          <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.pic_text_left}>Pay Date:</Text>
            </View>
            <View
              style={{flexDirection: 'row', flex: 1, alignItems: 'flex-start'}}>
              <TextInput
                style={[
                  styles.text_left,
                  {borderLeftWidth: 0, borderRightWidth: 0},
                ]}
                onChangeText={newText => {
                  setPayDate(newText);
                  console.log('date selected');
                }}
                value={PayDate}
                placeholder="Pay Date  "
                keyboardType="default"
              />
              <Button
                title="Calender"
                onPress={showDatePicker}
                color="rgba(93,45,145,255)"
              />
            </View>
          </View>
        ) : null}
        {payShow ? (
          <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.pic_text_left}>Pay Amount:</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <TextInput
                style={[
                  styles.text_left,
                  {borderLeftWidth: 0, borderRightWidth: 0},
                ]}
                onChangeText={newText => setPayAmount(newText)}
                value={PayAmount}
                placeholder="Pay Amount"
                keyboardType="numeric"
              />
            </View>
          </View>
        ) : null}
      </View>
      <View
        style={{
          height: 1,
          marginVertical: 10,
          width: '100%',
          backgroundColor: 'black',
        }}></View>
      <View style={styles.header}>
        {imageShow ? <Text style={[styles.logo]}> Pictures</Text> : null}
      </View>
      <View style={[styles.formheader, {}]}>
        <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            {image1Show ? (
              <Text style={styles.pic_text_left}>{picture1Title}</Text>
            ) : null}
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            {/*
                        {image1Take ? (
                            <TouchableOpacity onPress={() => selectImageGallery('photo', '1')} >
                                <Image
                                    source={require('../assets/gallery2.jpg')}// source={{uri: filePath.uri}}
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        ) : null}
                        */}
            {image1Take ? (
              <TouchableOpacity onPress={() => captureImage('photo', '1')}>
                <Image
                  source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            ) : null}
            <ImageView
              images={images1}
              imageIndex={0}
              visible={visible1}
              onRequestClose={() => setIsVisible1(false)}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              {image1Show ? (
                <TouchableOpacity onPress={() => setIsVisible1(true)}>
                  <Image
                    source={{uri: image1.uri}} // source={{uri: filePath.uri}}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        {image2Show ? (
          <View
            style={{
              height: 1,
              //marginVertical: 10,
              width: '96%',
              backgroundColor: 'black',
              paddingtop: 20,
            }}></View>
        ) : null}
        <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            {image2Show ? (
              <Text style={styles.pic_text_left}>{picture2Title}</Text>
            ) : null}
          </View>
          <View
            style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
            {/*
                        {image2Take ? (
                            <TouchableOpacity onPress={() => selectImageGallery('photo', '2')} >
                                <Image
                                    source={require('../assets/gallery2.jpg')}// source={{uri: filePath.uri}}
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        ) : null}
                        */}
            {image2Take ? (
              <TouchableOpacity onPress={() => captureImage('photo', '2')}>
                <Image
                  source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            ) : null}
            <ImageView
              images={images2}
              imageIndex={0}
              visible={visible2}
              onRequestClose={() => setIsVisible2(false)}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              {image2Show ? (
                <TouchableOpacity onPress={() => setIsVisible2(true)}>
                  <Image
                    source={{uri: image2.uri}} // source={{uri: filePath.uri}}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        {image3Show ? (
          <View
            style={{
              height: 1,
              //marginVertical: 10,
              width: '96%',
              backgroundColor: 'black',
              paddingtop: 20,
            }}></View>
        ) : null}
        <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            {image3Show ? (
              <Text style={styles.pic_text_left}>{picture3Title}</Text>
            ) : null}
          </View>
          <View
            style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
            {/*
                        {image3Take ? (
                            <TouchableOpacity onPress={() => selectImageGallery('photo', '3')} >
                                <Image
                                    source={require('../assets/gallery2.jpg')}// source={{uri: filePath.uri}}
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        ) : null}
                        */}
            {image3Take ? (
              <TouchableOpacity onPress={() => captureImage('photo', '3')}>
                <Image
                  source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            ) : null}
            <ImageView
              images={images3}
              imageIndex={0}
              visible={visible3}
              onRequestClose={() => setIsVisible3(false)}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              {image3Show ? (
                <TouchableOpacity onPress={() => setIsVisible3(true)}>
                  <Image
                    source={{uri: image3.uri}} // source={{uri: filePath.uri}}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
        {image4Show ? (
          <View
            style={{
              height: 1,
              //marginVertical: 10,
              width: '96%',
              backgroundColor: 'black',
              paddingtop: 20,
            }}></View>
        ) : null}
        <View style={{flexDirection: 'row', flex: 0.2, width: '96%'}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            {image4Show ? (
              <Text style={styles.pic_text_left}>{picture4Title}</Text>
            ) : null}
          </View>
          <View
            style={{flex: 1, flexDirection: 'row', alignItems: 'flex-start'}}>
            {/*
                        image4Show ? (
                            <TouchableOpacity onPress={() => selectImageGallery('photo', '4')} >
                                <Image
                                    source={require('../assets/gallery2.jpg')}// source={{uri: filePath.uri}}
                                    style={styles.imageStyle}
                                />
                            </TouchableOpacity>
                        ) : null
                        */}
            {image4Show ? (
              <TouchableOpacity onPress={() => captureImage('photo', '4')}>
                <Image
                  source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                  style={styles.imageStyle}
                />
              </TouchableOpacity>
            ) : null}
            <ImageView
              images={images4}
              imageIndex={0}
              visible={visible4}
              onRequestClose={() => setIsVisible4(false)}
            />
            <View style={{flex: 1, paddingLeft: 10}}>
              {image4Show ? (
                <TouchableOpacity onPress={() => setIsVisible4(true)}>
                  <Image
                    source={{uri: image4.uri}} // source={{uri: filePath.uri}}
                    style={styles.imageStyle}
                  />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </View>
      <View style={[styles.formheader, {}]}>
        <View
          style={{
            height: 1,
            marginVertical: 14,
            width: '100%',
            backgroundColor: 'black',
            alignSelf: 'center',
          }}></View>
        <View
          style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            alignSelf: 'center',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
            paddingLeft: 20,
            paddingRight: 20,
            padding: 10,
            //backgroundColor:'pink'
          }}>
          {isSavedBtn ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <TouchableOpacity
              disabled={loader}
              style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
              onPress={() => {
                console.log('Login Pressed');
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
                  'Saved',
                  userPassword,
                  () => {
                    return setLoader(false);
                  },
                );
              }}>
              {loader ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Text style={{color: 'white', fontSize: 18}}>Save</Text>
              )}
            </TouchableOpacity>
          )}
          {isPostBtn ? (
            <ActivityIndicator size="small" color="white" />
          ) : (
            <TouchableOpacity
              disabled={loader}
              style={[
                styles.loginBtn,
                {flex: 0.955, backgroundColor: btnBackgroundColor},
              ]}
              onPress={() => {
                console.log('Login Pressed');
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
                  'Post',
                  userPassword,
                  () => {
                    return setLoader(false);
                  },
                );
              }}>
              {loader ? (
                <ActivityIndicator size="large" color="#FFFFFF" />
              ) : (
                <Text style={{color: 'white', fontSize: 18}}>Post</Text>
              )}
            </TouchableOpacity>
          )}
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
    //   paddingBottom: 50,
    //        backgroundColor: "red",
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
    width: '50%',
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
});

export default WorkScheduleDetail;
