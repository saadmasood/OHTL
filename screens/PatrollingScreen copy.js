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

import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import SegmentedControlTab from 'react-native-segmented-control-tab';
import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import base64 from 'react-native-base64';

import {myGlobalVariable} from './globals';

const PatrollingScreen = ({navigation, route}) => {
  const [isEditable, setIsEditable] = useState(true);
  const [isMeterReadingEditable, setIsMeterReadingEditable] = useState(true);
  const [isDCRemarksEditable, setIsDCRemarksEditable] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedStructureSide, setSelectedStructureSide] = useState(0);

  const [MeterReading, setMeterReading] = useState();
  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    'rgba(93,45,145,255)',
  );
  const [tabcolor, setTabcolor] = useState('red');

  const [openStructure, setOpenStructure] = useState(false);
  const [valueStructure, setValueStructure] = useState();
  const [itemsStructure, setItemsStructure] = useState([
    {
      label: 'RCC Gantry',
      value: 'RCC Gantry',
    },
    {
      label: 'Lattice Steel Gantry',
      value: 'Lattice Steel Gantry',
    },
    {
      label: 'PS- RCC (N)',
      value: 'PS- RCC (N)',
    },
    {
      label: 'PS- RCC (S)',
      value: 'PS- RCC (S)',
    },
  ]);

  const [openStructureType, setOpenStructureType] = useState(false);
  const [valueStructureType, setValueStructureType] = useState('');
  const [itemsStructureType, setItemsStructureType] = useState([
    {label: 'Tower (Angle)', value: 'Tower (Angle)'},
    {label: 'Tower (Normal)', value: 'Tower (Normal)'},
    {label: 'Monopole (Angle)', value: 'Monopole (Angle)'},
    {label: 'Monopole (Normal)', value: 'Monopole (Normal)'},
    {label: 'PLDP (Angle)', value: 'PLDP (Angle)'},
    {
      label: 'Pole Structure (RCC- Angle)',
      value: 'Pole Structure (RCC- Angle)',
    },
    {
      label: 'Pole Structure (STP- Angle)',
      value: 'Pole Structure (STP- Angle)',
    },
    {
      label: 'Pole Structure (RCC- Normal)',
      value: 'Pole Structure (RCC- Normal)',
    },
    {
      label: 'Pole Structure (STP- Normal)',
      value: 'Pole Structure (STP- Normal)',
    },
    {label: 'Gantry (RCC)', value: 'Gantry (RCC)'},
    {label: 'Gantry (Lattice Steel)', value: 'Gantry (Lattice Steel)'},
  ]);

  const [openStructureSide, setOpenStructureSide] = useState(false);
  const [valueStructureSide, setValueStructureSide] = useState();
  const [itemsStructureSide, setItemsStructureSide] = useState([
    {
      label: 'Side-A',
      value: 'Side-A',
    },
    {
      label: 'Side-B',
      value: 'Side-B',
    },
  ]);

  const [openInsulationTypeRed, setOpenInsulationTypeRed] = useState(false);
  const [valueInsulationTypeRed, setValueInsulationTypeRed] = useState();
  const [itemsInsulationTypeRed, setItemsInsulationTypeRed] = useState([
    {
      label: 'Disc',
      value: 'Disc',
    },
    {
      label: 'Brown Long Rod',
      value: 'Brown Long Rod',
    },
    {
      label: 'Grey Long Rod',
      value: 'Grey Long Rod',
    },
    {
      label: 'RTV Coated Disc',
      value: 'RTV Coated Disc',
    },
    {
      label: 'RTV Coated Brown Long Rod',
      value: 'RTV Coated Brown Long Rod',
    },
    {
      label: 'RTV Coated Grey Long Rod',
      value: 'RTV Coated Grey Long Rod',
    },
    {
      label: 'Composite Long Rod',
      value: 'Composite Long Rod',
    },
  ]);

  const [openInsulationTypeJumperRed, setOpenInsulationTypeJumperRed] =
    useState(false);
  const [valueInsulationTypeJumperRed, setValueInsulationTypeJumperRed] =
    useState();
  const [itemsInsulationTypeJumperRed, setItemsInsulationTypeJumperRed] =
    useState([
      {
        label: 'Disc',
        value: 'Disc',
      },
      {
        label: 'Brown Long Rod',
        value: 'Brown Long Rod',
      },
      {
        label: 'Grey Long Rod',
        value: 'Grey Long Rod',
      },
      {
        label: 'RTV Coated Disc',
        value: 'RTV Coated Disc',
      },
      {
        label: 'RTV Coated Brown Long Rod',
        value: 'RTV Coated Brown Long Rod',
      },
      {
        label: 'RTV Coated Grey Long Rod',
        value: 'RTV Coated Grey Long Rod',
      },
      {
        label: 'Composite Long Rod',
        value: 'Composite Long Rod',
      },
    ]);

  const [openInsulatorSchemeRed, setOpenInsulatorSchemeRed] = useState(false);
  const [valueInsulatorSchemeRed, setValueInsulatorSchemeRed] = useState();
  const [itemsInsulatorSchemeRed, setItemsInsulatorSchemeRed] = useState([
    {
      label: 'SSS',
      value: 'SSS',
    },
    {
      label: 'DSS',
      value: 'DSS',
    },
    {
      label: 'TSS',
      value: 'TSS',
    },
    {
      label: 'STS',
      value: 'STS',
    },
    {
      label: 'DTS',
      value: 'DTS',
    },
    {
      label: 'TTS',
      value: 'TTS',
    },
  ]);

  const [openInsulatorSchemeJumperRed, setOpenInsulatorSchemeJumperRed] =
    useState(false);
  const [valueInsulatorSchemeJumperRed, setValueInsulatorSchemeJumperRed] =
    useState();
  const [itemsInsulatorSchemeJumperRed, setItemsInsulatorSchemeJumperRed] =
    useState([
      {
        label: 'SSS',
        value: 'SSS',
      },
      {
        label: 'DSS',
        value: 'DSS',
      },
      {
        label: 'TSS',
        value: 'TSS',
      },
      {
        label: 'STS',
        value: 'STS',
      },
      {
        label: 'DTS',
        value: 'DTS',
      },
      {
        label: 'TTS',
        value: 'TTS',
      },
    ]);

  const [openInsulationTypeYellow, setOpenInsulationTypeYellow] =
    useState(false);
  const [valueInsulationTypeYellow, setValueInsulationTypeYellow] = useState();
  const [itemsInsulationTypeYellow, setItemsInsulationTypeYellow] = useState([
    {
      label: 'Disc',
      value: 'Disc',
    },
    {
      label: 'Brown Long Rod',
      value: 'Brown Long Rod',
    },
    {
      label: 'Grey Long Rod',
      value: 'Grey Long Rod',
    },
    {
      label: 'RTV Coated Disc',
      value: 'RTV Coated Disc',
    },
    {
      label: 'RTV Coated Brown Long Rod',
      value: 'RTV Coated Brown Long Rod',
    },
    {
      label: 'RTV Coated Grey Long Rod',
      value: 'RTV Coated Grey Long Rod',
    },
    {
      label: 'Composite Long Rod',
      value: 'Composite Long Rod',
    },
  ]);

  const [openInsulationTypeJumperYellow, setOpenInsulationTypeJumperYellow] =
    useState(false);
  const [valueInsulationTypeJumperYellow, setValueInsulationTypeJumperYellow] =
    useState();
  const [itemsInsulationTypeJumperYellow, setItemsInsulationTypeJumperYellow] =
    useState([
      {
        label: 'Disc',
        value: 'Disc',
      },
      {
        label: 'Brown Long Rod',
        value: 'Brown Long Rod',
      },
      {
        label: 'Grey Long Rod',
        value: 'Grey Long Rod',
      },
      {
        label: 'RTV Coated Disc',
        value: 'RTV Coated Disc',
      },
      {
        label: 'RTV Coated Brown Long Rod',
        value: 'RTV Coated Brown Long Rod',
      },
      {
        label: 'RTV Coated Grey Long Rod',
        value: 'RTV Coated Grey Long Rod',
      },
      {
        label: 'Composite Long Rod',
        value: 'Composite Long Rod',
      },
    ]);

  const [openInsulatorSchemeYellow, setOpenInsulatorSchemeYellow] =
    useState(false);
  const [valueInsulatorSchemeYellow, setValueInsulatorSchemeYellow] =
    useState();
  const [itemsInsulatorSchemeYellow, setItemsInsulatorSchemeYellow] = useState([
    {
      label: 'SSS',
      value: 'SSS',
    },
    {
      label: 'DSS',
      value: 'DSS',
    },
    {
      label: 'TSS',
      value: 'TSS',
    },
    {
      label: 'STS',
      value: 'STS',
    },
    {
      label: 'DTS',
      value: 'DTS',
    },
    {
      label: 'TTS',
      value: 'TTS',
    },
  ]);

  const [openInsulatorSchemeJumperYellow, setOpenInsulatorSchemeJumperYellow] =
    useState(false);
  const [
    valueInsulatorSchemeJumperYellow,
    setValueInsulatorSchemeJumperYellow,
  ] = useState();
  const [
    itemsInsulatorSchemeJumperYellow,
    setItemsInsulatorSchemeJumperYellow,
  ] = useState([
    {
      label: 'SSS',
      value: 'SSS',
    },
    {
      label: 'DSS',
      value: 'DSS',
    },
    {
      label: 'TSS',
      value: 'TSS',
    },
    {
      label: 'STS',
      value: 'STS',
    },
    {
      label: 'DTS',
      value: 'DTS',
    },
    {
      label: 'TTS',
      value: 'TTS',
    },
  ]);

  const [openInsulationTypeBlue, setOpenInsulationTypeBlue] = useState(false);
  const [valueInsulationTypeBlue, setValueInsulationTypeBlue] = useState();
  const [itemsInsulationTypeBlue, setItemsInsulationTypeBlue] = useState([
    {
      label: 'Disc',
      value: 'Disc',
    },
    {
      label: 'Brown Long Rod',
      value: 'Brown Long Rod',
    },
    {
      label: 'Grey Long Rod',
      value: 'Grey Long Rod',
    },
    {
      label: 'RTV Coated Disc',
      value: 'RTV Coated Disc',
    },
    {
      label: 'RTV Coated Brown Long Rod',
      value: 'RTV Coated Brown Long Rod',
    },
    {
      label: 'RTV Coated Grey Long Rod',
      value: 'RTV Coated Grey Long Rod',
    },
    {
      label: 'Composite Long Rod',
      value: 'Composite Long Rod',
    },
  ]);

  const [openInsulationTypeJumperBlue, setOpenInsulationTypeJumperBlue] =
    useState(false);
  const [valueInsulationTypeJumperBlue, setValueInsulationTypeJumperBlue] =
    useState();
  const [itemsInsulationTypeJumperBlue, setItemsInsulationTypeJumperBlue] =
    useState([
      {
        label: 'Disc',
        value: 'Disc',
      },
      {
        label: 'Brown Long Rod',
        value: 'Brown Long Rod',
      },
      {
        label: 'Grey Long Rod',
        value: 'Grey Long Rod',
      },
      {
        label: 'RTV Coated Disc',
        value: 'RTV Coated Disc',
      },
      {
        label: 'RTV Coated Brown Long Rod',
        value: 'RTV Coated Brown Long Rod',
      },
      {
        label: 'RTV Coated Grey Long Rod',
        value: 'RTV Coated Grey Long Rod',
      },
      {
        label: 'Composite Long Rod',
        value: 'Composite Long Rod',
      },
    ]);

  const [openInsulatorSchemeBlue, setOpenInsulatorSchemeBlue] = useState(false);
  const [valueInsulatorSchemeBlue, setValueInsulatorSchemeBlue] = useState();
  const [itemsInsulatorSchemeBlue, setItemsInsulatorSchemeBlue] = useState([
    {
      label: 'SSS',
      value: 'SSS',
    },
    {
      label: 'DSS',
      value: 'DSS',
    },
    {
      label: 'TSS',
      value: 'TSS',
    },
    {
      label: 'STS',
      value: 'STS',
    },
    {
      label: 'DTS',
      value: 'DTS',
    },
    {
      label: 'TTS',
      value: 'TTS',
    },
  ]);

  const [openInsulatorSchemeJumperBlue, setOpenInsulatorSchemeJumperBlue] =
    useState(false);
  const [valueInsulatorSchemeJumperBlue, setValueInsulatorSchemeJumperBlue] =
    useState();
  const [itemsInsulatorSchemeJumperBlue, setItemsInsulatorSchemeJumperBlue] =
    useState([
      {
        label: 'SSS',
        value: 'SSS',
      },
      {
        label: 'DSS',
        value: 'DSS',
      },
      {
        label: 'TSS',
        value: 'TSS',
      },
      {
        label: 'STS',
        value: 'STS',
      },
      {
        label: 'DTS',
        value: 'DTS',
      },
      {
        label: 'TTS',
        value: 'TTS',
      },
    ]);

  const [strFL, setStrFL] = useState();

  const [isCheckedRed, setIsCheckedRed] = useState(false);
  const [isCheckedYellow, setIsCheckedYellow] = useState(false);
  const [isCheckedBlue, setIsCheckedBlue] = useState(false);

  const [empName, setEmpName] = useState('');

  const handleCheckBoxRed = () => {
    setIsCheckedRed(!isCheckedRed);
  };

  const handleCheckBoxYellow = () => {
    setIsCheckedYellow(!isCheckedYellow);
  };

  const handleCheckBoxBlue = () => {
    setIsCheckedBlue(!isCheckedBlue);
  };

  const handleIndexChange = index => {
    setSelectedIndex(index);
    console.log(typeof index);
    if (index == 0) {
      setTabcolor('red');
    } else if (index == 1) {
      setTabcolor('yellow');
    } else {
      setTabcolor('blue');
    }
  };

  const handleStructureSide = index => {
    setSelectedStructureSide(index);
    console.log(typeof index);
    /*
    if (index == 0) {
      setTabcolor('red');
    } else if (index == 1) {
      setTabcolor('yellow');
    } else {
      setTabcolor('blue');
    }
    */
  };

  const PostPatrollingRecord = () => {
    console.log('route.params.data.PtlSnro: ' + route.params.data.PtlSnro);
    console.log('route.params.data.StrSnro: ' + route.params.data.StrSnro);
    console.log('route.params.data.Fl: ' + route.params.data.Fl);
    console.log('route.params.data.Fl: ' + route.params.data.StrFl);
    console.log('valueStructureSide: ' + valueStructureSide);

    const isCheckedDataRed = isCheckedRed != true ? 'T' : 'F';
    const isCheckedDataBlue = isCheckedBlue != true ? 'T' : 'F';
    const isCheckedDataYellow = isCheckedYellow != true ? 'T' : 'F';

    axios({
      method: 'POST',
      url: 'https://' + myGlobalVariable[0] + '/FLHeaderSet',
      headers: {
        Authorization: 'Basic ' + base64.encode(myGlobalVariable[1]),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Fl: route.params.data.Fl,
        HEADERSTR_NAV: [
          {
            Qmnum: route.params.data.PtlSnro,
            Fl: route.params.data.Fl,
            Structure: route.params.data.StrFl,
            Username: empName,
            StrType: valueStructureType,
            Side: valueStructureSide,
            PhaseR: 'X',
            InsulTypeR: valueInsulationTypeRed,
            InsulSchemeR: valueInsulatorSchemeRed,
            IsJumperR: isCheckedDataRed,
            JumpInsulTypeR: valueInsulationTypeJumperRed,
            JumpInsulSchemeR: valueInsulatorSchemeRed,
            PhaseY: 'X',
            InsulTypeY: valueInsulationTypeYellow,
            InsulSchemeY: valueInsulatorSchemeYellow,
            IsJumperY: isCheckedDataYellow,
            JumpInsulTypeY: valueInsulationTypeJumperYellow,
            JumpInsulSchemeY: valueInsulatorSchemeYellow,
            PhaseB: 'X',
            InsulTypeB: valueInsulationTypeBlue,
            InsulSchemeB: valueInsulatorSchemeBlue,
            IsJumperB: isCheckedDataBlue,
            JumpInsulTypeB: valueInsulationTypeJumperBlue,
            JumpInsulSchemeB: valueInsulatorSchemeBlue,
          },
        ],
      }),
    }).then(items => {
      console.log('***** UPLOADED SUCCESFULLY');
      StoreInDevice('Post');
    });
  };
  const StoreInDevice = (status, isDescripancyList) => {
    AsyncStorage.getItem(route.params.PtlSnro)
      .then(async items => {
        var dataslice = items ? JSON.parse(items) : {};

        dataslice.filter((item, index) => {
          if (item.StrFl == strFL) {
            dataslice[index].status = status;
            dataslice[index].valueStructureType = valueStructureType;
            dataslice[index].valueStructureSide = valueStructureSide;

            dataslice[index].valueInsulationTypeRed = valueInsulationTypeRed;
            dataslice[index].valueInsulationTypeJumperRed =
              valueInsulationTypeJumperRed;
            dataslice[index].isCheckedRed = isCheckedRed;
            dataslice[index].valueInsulatorSchemeRed = valueInsulatorSchemeRed;
            dataslice[index].valueInsulatorSchemeJumperRed =
              valueInsulatorSchemeJumperRed;

            dataslice[index].valueInsulationTypeYellow =
              valueInsulationTypeYellow;
            dataslice[index].valueInsulationTypeJumperYellow =
              valueInsulationTypeJumperYellow;
            dataslice[index].isCheckedYellow = isCheckedYellow;
            dataslice[index].valueInsulatorSchemeYellow =
              valueInsulatorSchemeYellow;
            dataslice[index].valueInsulatorSchemeJumperYellow =
              valueInsulatorSchemeJumperYellow;

            dataslice[index].valueInsulationTypeBlue = valueInsulationTypeBlue;
            dataslice[index].valueInsulationTypeJumperBlue =
              valueInsulationTypeJumperBlue;
            dataslice[index].isCheckedBlue = isCheckedBlue;
            dataslice[index].valueInsulatorSchemeBlue =
              valueInsulatorSchemeBlue;
            dataslice[index].valueInsulatorSchemeJumperBlue =
              valueInsulatorSchemeJumperBlue;

            console.log(strFL);

            AsyncStorage.setItem(
              route.params.PtlSnro,
              JSON.stringify(dataslice),
            );
          }
        });
      })
      .then(item => {
        AsyncStorage.getItem('FunctionalLocation')
          .then(async items => {
            var data1 = items ? JSON.parse(items) : {};
            console.log(route.params.data.PtlSnro);
            console.log('***************');
            data1.filter((item, index) => {
              if (item.PtlSnro == route.params.data.PtlSnro) {
                data1[index].Status = 'Saved';

                AsyncStorage.setItem(
                  'FunctionalLocation',
                  JSON.stringify(data1),
                );
              }
            });
          })
          .then(item => {
            if (!isDescripancyList) {
              navigation.navigate('StrFLListView', {
                data: route.params.data,
                PtlSnro: route.params.data.PtlSnro,
              });
            } else {
              navigation.navigate('DiscrepancyListView', {
                PtlSnro: route.params.data.PtlSnro,
                StrSnro: route.params.data.StrSnro,
                Fl: route.params.data.Fl,
                StrFl: strFL,
              });
            }
          });
      });
  };

  useEffect(() => {
    //console.log(route.params.data);
    setStrFL(route.params.data.StrFl);

    AsyncStorage.getItem(route.params.data.PtlSnro).then(items => {
      var localData = items ? JSON.parse(items) : [];
      var filterData = localData.filter(item => {
        if (item.StrFl == route.params.data.StrFl) {
          console.log('item.StrDescr: ' + item.StrDescr);
          console.log('item.valueStructureType: ' + item.valueStructureType);

          if (item.status == 'Post') {
            setIsEditable(false);
          }

          if (item.valueStructureType != undefined)
            setValueStructureType(item.valueStructureType);
          if (item.valueStructureSide != undefined)
            setValueStructureSide(item.valueStructureSide);

          if (item.valueInsulationTypeRed != undefined)
            setValueInsulationTypeRed(item.valueInsulationTypeRed);
          if (item.valueInsulationTypeJumperRed != undefined)
            setValueInsulationTypeJumperRed(item.valueInsulationTypeJumperRed);
          if (item.isCheckedRed != undefined)
            setIsCheckedRed(item.isCheckedRed);
          if (item.valueInsulatorSchemeRed != undefined)
            setValueInsulatorSchemeRed(item.valueInsulatorSchemeRed);
          if (item.valueInsulatorSchemeJumperRed != undefined)
            setValueInsulatorSchemeJumperRed(
              item.valueInsulatorSchemeJumperRed,
            );

          if (item.valueInsulationTypeYellow != undefined)
            setValueInsulationTypeYellow(item.valueInsulationTypeYellow);
          if (item.valueInsulationTypeJumperYellow != undefined)
            setValueInsulationTypeJumperYellow(
              item.valueInsulationTypeJumperYellow,
            );
          if (item.isCheckedYellow != undefined)
            setIsCheckedYellow(item.isCheckedYellow);
          if (item.valueInsulatorSchemeYellow != undefined)
            setValueInsulatorSchemeYellow(item.valueInsulatorSchemeYellow);
          if (item.valueInsulatorSchemeJumperYellow != undefined)
            setValueInsulatorSchemeJumperYellow(
              item.valueInsulatorSchemeJumperYellow,
            );

          if (item.valueInsulationTypeBlue != undefined)
            setValueInsulationTypeBlue(item.valueInsulationTypeBlue);
          if (item.valueInsulationTypeJumperBlue != undefined)
            setValueInsulationTypeJumperBlue(
              item.valueInsulationTypeJumperBlue,
            );
          if (item.isCheckedBlue != undefined)
            setIsCheckedBlue(item.isCheckedBlue);
          if (item.valueInsulatorSchemeBlue != undefined)
            setValueInsulatorSchemeBlue(item.valueInsulatorSchemeBlue);
          if (item.valueInsulatorSchemeJumperBlue != undefined)
            setValueInsulatorSchemeJumperBlue(
              item.valueInsulatorSchemeJumperBlue,
            );
        }
      });
    });

    AsyncStorage.getItem('UserDetail').then(items => {
      var data1 = items ? JSON.parse(items) : [];

      data1.forEach(singleResult => {
        setEmpName(singleResult.userName);
      });
    });
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{paddingTop: 10}}></View>

        <View style={styles.header}>
          <Text style={[styles.logo]}> New Patrolling</Text>
        </View>

        {MeterReading == 'Angle' && (
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
                onChangeText={text => {}}
                value={MeterReading}
                maxLength={8}
                placeholder="Meter Reading"
                keyboardType="numeric"
                editable={isMeterReadingEditable}
              />
            </View>
          </View>
        )}

        <View style={{flexDirection: 'row', flex: 0.1, width: '96%', top: 1}}>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <Text style={styles.pic_text_left}>Structure:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            {/*
            <DropDownPicker
              open={openStructure}
              value={valueStructure}
              items={itemsStructure}
              setOpen={setOpenStructure}
              setValue={setValueStructure}
              setItems={setItemsStructure}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              onChangeValue={item => {
                console.log(item);
              }}
            />
            */}
            <TextInput
              style={{color: 'black', fontSize: 15}}
              value={strFL}
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
            <Text style={styles.pic_text_left}>Structure Type:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              disabled={!isEditable}
              open={openStructureType}
              value={valueStructureType}
              items={itemsStructureType}
              setOpen={setOpenStructureType}
              setValue={setValueStructureType}
              setItems={setItemsStructureType}
              listMode="MODAL"
              searchable
              onChangeValue={item => {
                if (valueStructureType.indexOf('Angle') < 0) {
                  setValueStructureSide('');
                }
              }}
              //disabled={isDCRemarksEditable}
              //onChangeValue={item => {}}
            />
          </View>
        </View>

        {valueStructureType.indexOf('Angle') >= 0 && (
          <View
            style={{
              paddingTop: 10,
            }}>
            <SegmentedControlTab
              values={['Side A', 'Side B']}
              selectedIndex={selectedStructureSide}
              onTabPress={handleStructureSide}
              activeTabStyle={{
                backgroundColor: 'purple',
                marginTop: 2,
                color: 'black',
              }}
              tabTextStyle={{color: 'black'}}
            />
          </View>
        )}

        {/* Start ONE */}
        <View style={styles.header}>
          <Text style={[styles.logo]}> Phase Insulators Data Collection</Text>
        </View>

        <SegmentedControlTab
          values={['Red', 'Yellow', 'Blue']}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
          activeTabStyle={{
            backgroundColor: tabcolor,
            marginTop: 2,
            color: 'black',
          }}
          tabTextStyle={{color: 'black'}}
        />
        {selectedIndex == '0' && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.1,
                width: '96%',
                top: 1,
                paddingTop: 10,
              }}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={styles.pic_text_left}>Insulator Type:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openInsulationTypeRed}
                  value={valueInsulationTypeRed}
                  items={itemsInsulationTypeRed}
                  setOpen={setOpenInsulationTypeRed}
                  setValue={setValueInsulationTypeRed}
                  setItems={setItemsInsulationTypeRed}
                  listMode="MODAL"
                  searchable
                  //disabled={isDCRemarksEditable}
                  //onChangeValue={item => {}}
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
                <Text style={styles.pic_text_left}>Insulator Scheme:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openInsulatorSchemeRed}
                  value={valueInsulatorSchemeRed}
                  items={itemsInsulatorSchemeRed}
                  setOpen={setOpenInsulatorSchemeRed}
                  setValue={setValueInsulatorSchemeRed}
                  setItems={setItemsInsulatorSchemeRed}
                  listMode="MODAL"
                  searchable
                  //disabled={isDCRemarksEditable}
                  //onChangeValue={item => {}}
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
                <Text style={styles.pic_text_left}>
                  Jumper string installed?:
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <CheckBox
                  disabled={!isEditable}
                  value={isCheckedRed}
                  onValueChange={handleCheckBoxRed}
                />
                <Text>{isCheckedRed ? 'Checked' : 'Unchecked'}</Text>
              </View>
            </View>

            {isCheckedRed == true && (
              <View>
                <View style={styles.header}>
                  <Text style={[styles.logo]}>
                    {' '}
                    Jumper Insulators Data Collection
                  </Text>
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
                    <Text style={styles.pic_text_left}>Insulator Type:</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      open={openInsulationTypeJumperRed}
                      value={valueInsulationTypeJumperRed}
                      items={itemsInsulationTypeJumperRed}
                      setOpen={setOpenInsulationTypeJumperRed}
                      setValue={setValueInsulationTypeJumperRed}
                      setItems={setItemsInsulationTypeJumperRed}
                      listMode="MODAL"
                      searchable
                      //disabled={isDCRemarksEditable}
                      //onChangeValue={item => {}}
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
                    <Text style={styles.pic_text_left}>Insulator Scheme:</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      open={openInsulatorSchemeJumperRed}
                      value={valueInsulatorSchemeJumperRed}
                      items={itemsInsulatorSchemeJumperRed}
                      setOpen={setOpenInsulatorSchemeJumperRed}
                      setValue={setValueInsulatorSchemeJumperRed}
                      setItems={setItemsInsulatorSchemeJumperRed}
                      listMode="MODAL"
                      searchable
                      //disabled={isDCRemarksEditable}
                      //onChangeValue={item => {}}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
        {selectedIndex == '1' && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.1,
                width: '96%',
                top: 1,
                paddingTop: 10,
              }}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={styles.pic_text_left}>Insulator Type:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openInsulationTypeYellow}
                  value={valueInsulationTypeYellow}
                  items={itemsInsulationTypeYellow}
                  setOpen={setOpenInsulationTypeYellow}
                  setValue={setValueInsulationTypeYellow}
                  setItems={setItemsInsulationTypeYellow}
                  listMode="MODAL"
                  searchable
                  //disabled={isDCRemarksEditable}
                  //onChangeValue={item => {}}
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
                <Text style={styles.pic_text_left}>Insulator Scheme:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openInsulatorSchemeYellow}
                  value={valueInsulatorSchemeYellow}
                  items={itemsInsulatorSchemeYellow}
                  setOpen={setOpenInsulatorSchemeYellow}
                  setValue={setValueInsulatorSchemeYellow}
                  setItems={setItemsInsulatorSchemeYellow}
                  listMode="MODAL"
                  searchable
                  //disabled={isDCRemarksEditable}
                  //onChangeValue={item => {}}
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
                <Text style={styles.pic_text_left}>
                  Jumper string installed?:
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <CheckBox
                  disabled={!isEditable}
                  value={isCheckedYellow}
                  onValueChange={handleCheckBoxYellow}
                />
                <Text>{isCheckedYellow ? 'Checked' : 'Unchecked'}</Text>
              </View>
            </View>

            {isCheckedYellow == true && (
              <View>
                <View style={styles.header}>
                  <Text style={[styles.logo]}>
                    {' '}
                    Jumper Insulators Data Collection
                  </Text>
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
                    <Text style={styles.pic_text_left}>Insulator Type:</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      open={openInsulationTypeJumperYellow}
                      value={valueInsulationTypeJumperYellow}
                      items={itemsInsulationTypeJumperYellow}
                      setOpen={setOpenInsulationTypeJumperYellow}
                      setValue={setValueInsulationTypeJumperYellow}
                      setItems={setItemsInsulationTypeJumperYellow}
                      listMode="MODAL"
                      searchable
                      //disabled={isDCRemarksEditable}
                      //onChangeValue={item => {}}
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
                    <Text style={styles.pic_text_left}>Insulator Scheme:</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      open={openInsulatorSchemeJumperYellow}
                      value={valueInsulatorSchemeJumperYellow}
                      items={itemsInsulatorSchemeJumperYellow}
                      setOpen={setOpenInsulatorSchemeJumperYellow}
                      setValue={setValueInsulatorSchemeJumperYellow}
                      setItems={setItemsInsulatorSchemeJumperYellow}
                      listMode="MODAL"
                      searchable
                      //disabled={isDCRemarksEditable}
                      //onChangeValue={item => {}}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
        {selectedIndex == '2' && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                flex: 0.1,
                width: '96%',
                top: 1,
                paddingTop: 10,
              }}>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <Text style={styles.pic_text_left}>Insulator Type:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openInsulationTypeBlue}
                  value={valueInsulationTypeBlue}
                  items={itemsInsulationTypeBlue}
                  setOpen={setOpenInsulationTypeBlue}
                  setValue={setValueInsulationTypeBlue}
                  setItems={setItemsInsulationTypeBlue}
                  listMode="MODAL"
                  searchable
                  //disabled={isDCRemarksEditable}
                  //onChangeValue={item => {}}
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
                <Text style={styles.pic_text_left}>Insulator Scheme:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openInsulatorSchemeBlue}
                  value={valueInsulatorSchemeBlue}
                  items={itemsInsulatorSchemeBlue}
                  setOpen={setOpenInsulatorSchemeBlue}
                  setValue={setValueInsulatorSchemeBlue}
                  setItems={setItemsInsulatorSchemeBlue}
                  listMode="MODAL"
                  searchable
                  //disabled={isDCRemarksEditable}
                  //onChangeValue={item => {}}
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
                <Text style={styles.pic_text_left}>
                  Jumper string installed?:
                </Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <CheckBox
                  disabled={!isEditable}
                  value={isCheckedBlue}
                  onValueChange={handleCheckBoxBlue}
                />
                <Text>{isCheckedBlue ? 'Checked' : 'Unchecked'}</Text>
              </View>
            </View>

            {isCheckedBlue == true && (
              <View>
                <View style={styles.header}>
                  <Text style={[styles.logo]}>
                    {' '}
                    Jumper Insulators Data Collection
                  </Text>
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
                    <Text style={styles.pic_text_left}>Insulator Type:</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      open={openInsulationTypeJumperBlue}
                      value={valueInsulationTypeJumperBlue}
                      items={itemsInsulationTypeJumperBlue}
                      setOpen={setOpenInsulationTypeJumperBlue}
                      setValue={setValueInsulationTypeJumperBlue}
                      setItems={setItemsInsulationTypeJumperBlue}
                      listMode="MODAL"
                      searchable
                      //disabled={isDCRemarksEditable}
                      //onChangeValue={item => {}}
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
                    <Text style={styles.pic_text_left}>Insulator Scheme:</Text>
                  </View>
                  <View style={{flex: 1, alignItems: 'flex-start'}}>
                    <DropDownPicker
                      disabled={!isEditable}
                      open={openInsulatorSchemeJumperBlue}
                      value={valueInsulatorSchemeJumperBlue}
                      items={itemsInsulatorSchemeJumperBlue}
                      setOpen={setOpenInsulatorSchemeJumperBlue}
                      setValue={setValueInsulatorSchemeJumperBlue}
                      setItems={setItemsInsulatorSchemeJumperBlue}
                      listMode="MODAL"
                      searchable
                      //disabled={isDCRemarksEditable}
                      //onChangeValue={item => {}}
                    />
                  </View>
                </View>
              </View>
            )}
          </View>
        )}
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            disabled={!isEditable}
            style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
            onPress={() => {
              StoreInDevice('saved', 'No');
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              Save Insulator Details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            disabled={!isEditable}
            style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
            onPress={() => {
              PostPatrollingRecord('No');
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              Post Insulator Details
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{alignItems: 'center'}}>
          <TouchableOpacity
            //disabled={!isEditable}
            style={[styles.loginBtn, {backgroundColor: btnBackgroundColor}]}
            onPress={() => {
              StoreInDevice('saved', 'Yes');
            }}>
            <Text style={{color: 'white', fontSize: 18}}>
              Add Discrepancies
            </Text>
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
    width: '60%',
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

export default PatrollingScreen;
