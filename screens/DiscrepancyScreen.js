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

const DiscrepancyScreen = ({navigation, route}) => {
  const [isEditable, setIsEditable] = useState(true);

  const [descriptionError, setDescriptionError] = useState(false);
  const [description, setDescription] = useState(false);

  const [remarksError, setRemarksError] = useState(false);
  const [remarks, setRemarks] = useState(false);
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
  ]);

  const [openCiticality, setOpenCiticality] = useState(false);
  const [valueCiticality, setValueCiticality] = useState();
  const [itemsCiticality, setItemsCiticality] = useState([
    {label: 'High', value: 'High'},
    {label: 'Low', value: 'Low'},
    {label: 'Medium', value: 'Medium'},
  ]);

  const [filePath, setFilePath] = useState([]);
  const [images, setImages] = useState([]);
  const [isImage, setIsImage] = useState('N');
  const carouselRef = useRef();
  const flatListRef = useRef();
  const {width} = Dimensions.get('window');
  const [indexSelected, setIndexSelected] = useState(0);

  useEffect(() => {
    console.log('route.params.PtlSnro:::', route.params.PtlSnro);
    console.log('route.params.StrSnro:::', route.params.StrSnro);
  }, []);

  const onTouchThumbnail = touched => {
    if (touched === indexSelected) return;
    carouselRef?.current?.snapToItem(touched);
  };

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
          <Text style={[styles.logo]}> Discrepancy Screen</Text>
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
            <Text style={styles.pic_text_left}>Discrepancy Type:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              open={openDiscrepancyType}
              value={valueDiscrepancyType}
              items={itemsDiscrepancyType}
              setOpen={setOpenDiscrepancyType}
              y
              setValue={setValueDiscrepancyType}
              setItems={setItemsDiscrepancyType}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              //onChangeValue={item => {}}
            />
          </View>
        </View>

        {valueDiscrepancyType == 'Tower Related' && (
          <View
            style={{
              flexDirection: 'row',
              flex: 0.1,
              width: '96%',
              top: 1,
              paddingTop: 10,
            }}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.pic_text_left}>Discrepancy:</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <DropDownPicker
                open={openDiscrepancyTower}
                value={valueDiscrepancyTower}
                items={itemsDiscrepancyTower}
                setOpen={setOpenDiscrepancyTower}
                setValue={setValueDiscrepancyTower}
                setItems={setItemsDiscrepancyTower}
                listMode="MODAL"
                searchable
                //disabled={isDCRemarksEditable}
                onChangeValue={item => {
                  console.log(item);
                }}
              />
            </View>
          </View>
        )}

        {valueDiscrepancyType == 'Phase Related' && (
          <View
            style={{
              flexDirection: 'row',
              flex: 0.1,
              width: '96%',
              top: 1,
              paddingTop: 10,
            }}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.pic_text_left}>Discrepancy:</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <DropDownPicker
                open={openDiscrepancyPhase}
                value={valueDiscrepancyPhase}
                items={itemsDiscrepancyPhase}
                setOpen={setOpenDiscrepancyPhase}
                setValue={setValueDiscrepancyPhase}
                setItems={setItemsDiscrepancyPhase}
                listMode="MODAL"
                searchable
                //disabled={isDCRemarksEditable}
                onChangeValue={item => {
                  console.log(item);
                }}
              />
            </View>
          </View>
        )}

        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Description:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              multiline={true}
              onChangeText={text => {
                setDescription(text);
                if (validate(text, 255)) {
                  setDescriptionError(
                    'Input must be at least 255 characters long.',
                  );
                } else setDescriptionError('');
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
              value={description}
              editable={isEditable}
            />
            {setDescriptionError !== '' && (
              <Text style={styles.error}>{descriptionError}</Text>
            )}
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
            <Text style={styles.pic_text_left}>In Between:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              open={openInBetween}
              value={valueInBetween}
              items={itemsInBetween}
              setOpen={setOpenInBetween}
              setValue={setValueInBetween}
              setItems={setItemsInBetween}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              onChangeValue={item => {
                console.log(item);
              }}
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
            <Text style={styles.pic_text_left}>Fault Count:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              open={openFaultCount}
              value={valueFaultCount}
              items={itemsFaultCount}
              setOpen={setOpenFaultCount}
              setValue={setValueFaultCount}
              setItems={setItemsFaultCount}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              onChangeValue={item => {
                console.log(item);
              }}
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
            <Text style={styles.pic_text_left}>Citicality:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              open={openCiticality}
              value={valueCiticality}
              items={itemsCiticality}
              setOpen={setOpenCiticality}
              setValue={setValueCiticality}
              setItems={setItemsCiticality}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              onChangeValue={item => {
                console.log(item);
              }}
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
            <Text style={styles.pic_text_left}>Remarks:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <TextInput
              multiline={true}
              onChangeText={text => {
                setRemarks(text);
                if (validate(text, 255)) {
                  setRemarksError(
                    'Input must be at least 255 characters long.',
                  );
                } else setRemarksError('');
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
              value={remarks}
              editable={isEditable}
            />
            {setRemarksError !== '' && (
              <Text style={styles.error}>{remarksError}</Text>
            )}
          </View>
        </View>

        <View
          style={{
            flex: 2,
            alignItems: 'center',
            justifyContent: 'center',
            // height: 50,
            flexDirection: 'row',
            marginVertical: 10,
            marginLeft: 85,
            // paddingHorizontal: 110,
          }}>
          <Carousel
            ref={carouselRef}
            layout="default"
            data={images}
            sliderWidth={width}
            itemWidth={width}
            renderItem={({item, index}) => {
              return (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      onTouchThumbnail(index);
                      setindexer1(index);
                      setimageview(true);
                    }}
                    activeOpacity={0.9}>
                    <Image
                      source={{uri: item.uri}}
                      style={{height: 200, width: 200}}></Image>
                  </TouchableOpacity>
                  <TouchableOpacity
                    disabled={!isEditable}
                    onPress={() => {
                      setTimeout(() => {
                        // setRefresh(true);
                        setImagedeletionLoader(true);

                        //console.log("images", images);
                        var arr = images;
                        arr.splice(index, 1);
                        // console.log(index)
                        //console.log("index", index);
                        //console.log("arr)", arr);

                        setImages(arr);
                        setImagedeletionLoader(false);
                      }, 2000);
                    }}
                    style={{
                      width: 200,
                      height: 16,
                      // borderRadius: 13,
                      zIndex: 100,
                      backgroundColor: 'red',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 12,
                        fontWeight: 'bold',
                      }}>
                      Remove
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            }}
            // sliderWidth={150}
            //itemWidth={120}
            onSnapToItem={index => onSelect(index)}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            flex: 0.1,
            width: '96%',
            top: 1,
            paddingTop: 10,
          }}>
          <View
            style={{flex: 1, alignItems: 'flex-start', alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={() => chooseFile('photo')}>
              <Image
                source={require('../assets/Gallery.png')} // source={{uri: filePath.uri}}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 50}}>
            <TouchableOpacity onPress={() => captureImage('photo', '2')}>
              <Image
                source={require('../assets/camera.png')} // source={{uri: filePath.uri}}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
        </View>

        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            disabled={!isEditable}
            style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
            onPress={() => {}}>
            <Text style={{color: 'white', fontSize: 18}}>Save</Text>
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

export default DiscrepancyScreen;
