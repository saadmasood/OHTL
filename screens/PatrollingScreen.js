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

const PatrollingScreen = ({navigation, route}) => {
  const [isMeterReadingEditable, setIsMeterReadingEditable] = useState(true);
  const [isDCRemarksEditable, setIsDCRemarksEditable] = useState(false);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [MeterReading, setMeterReading] = useState();

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
  const [valueStructureType, setValueStructureType] = useState();
  const [itemsStructureType, setItemsStructureType] = useState([
    {label: 'RCC Gantry', value: 'RCC Gantry'},
    {label: 'Lattice Steel Gantry', value: 'Lattice Steel Gantry'},
    {label: 'PS- RCC (N)', value: 'PS- RCC (N)'},
    {label: 'PS- RCC (S)', value: 'PS- RCC (S)'},
    {label: 'PS- RCC (LA)', value: 'PS- RCC (LA)'},
    {label: 'PS- RCC (LB)', value: 'PS- RCC (LB)'},
    {label: 'PS- RCC (OFF)', value: 'PS- RCC (OFF)'},
    {label: 'PS- STP (N)', value: 'PS- STP (N)'},
    {label: 'PS- STP (S)', value: 'PS- STP (S)'},
    {label: 'PS- STP (LA)', value: 'PS- STP (LA)'},
    {label: 'PS- STP (LB)', value: 'PS- STP (LB)'},
    {label: 'PS- STP (Off)', value: 'PS- STP (Off)'},
    {label: 'PS- RCC+ STP (N)', value: 'PS- RCC+ STP (N)'},
    {label: 'PS- RCC+ STP (S)', value: 'PS- RCC+ STP (S)'},
    {label: 'PS- RCC+ STP (LA)', value: 'PS- RCC+ STP (LA)'},
    {label: 'PS- RCC+ STP (LB)', value: 'PS- RCC+ STP (LB)'},
    {label: 'PS- RCC+ STP (OFF)', value: 'PS- RCC+ STP (OFF)'},
    {label: 'J', value: 'J'},
    {label: 'DE', value: 'DE'},
    {label: 'T', value: 'T'},
    {label: 'TS', value: 'TS'},
    {label: 'TLA', value: 'TLA'},
    {label: 'TLB', value: 'TLB'},
    {label: 'TLB (DE)', value: 'TLB (DE)'},
    {label: 'T-OFF (T)', value: 'T-OFF (T)'},
    {label: 'PT', value: 'PT'},
    {label: 'PS', value: 'PS'},
    {label: 'PLA', value: 'PLA'},
    {label: 'PLB', value: 'PLB'},
    {label: 'PLDP', value: 'PLDP'},
    {label: 'PLT', value: 'PLT'},
    {label: '2PLA', value: '2PLA'},
    {label: '2PLB', value: '2PLB'},
    {label: '2PLT', value: '2PLT'},
    {label: 'Angle', value: 'Angle'},
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
      label: 'White Long Rod',
      value: 'White Long Rod',
    },
    {
      label: 'RTV Coated Disc',
      value: 'RTV Coated Disc',
    },
    {
      label: 'RTV Coated Long Rod',
      value: 'RTV Coated Long Rod',
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
      label: 'White Long Rod',
      value: 'White Long Rod',
    },
    {
      label: 'RTV Coated Disc',
      value: 'RTV Coated Disc',
    },
    {
      label: 'RTV Coated Long Rod',
      value: 'RTV Coated Long Rod',
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
      label: 'White Long Rod',
      value: 'White Long Rod',
    },
    {
      label: 'RTV Coated Disc',
      value: 'RTV Coated Disc',
    },
    {
      label: 'RTV Coated Long Rod',
      value: 'RTV Coated Long Rod',
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

  const handleIndexChange = index => {
    setSelectedIndex(index);
    console.log(index);
  };

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
              open={openStructureType}
              value={valueStructureType}
              items={itemsStructureType}
              setOpen={setOpenStructureType}
              setValue={setValueStructureType}
              setItems={setItemsStructureType}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              //onChangeValue={item => {}}
            />
          </View>
        </View>

        {valueStructureType == 'Angle' && (
          <View
            style={{
              flexDirection: 'row',
              flex: 0.1,
              width: '96%',
              top: 1,
              paddingTop: 10,
            }}>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <Text style={styles.pic_text_left}>Structure Side:</Text>
            </View>
            <View style={{flex: 1, alignItems: 'flex-start'}}>
              <DropDownPicker
                open={openStructureSide}
                value={valueStructureSide}
                items={itemsStructureSide}
                setOpen={setOpenStructureSide}
                setValue={setValueStructureSide}
                setItems={setItemsStructureSide}
                listMode="MODAL"
                searchable
                //disabled={isDCRemarksEditable}
                //onChangeValue={item => {}}
              />
            </View>
          </View>
        )}

        <View style={styles.header}>
          <Text style={[styles.logo]}> Record Jumper Phase Insulation</Text>
        </View>

        <SegmentedControlTab
          values={['Red', 'Yellow', 'Blue']}
          selectedIndex={selectedIndex}
          onTabPress={handleIndexChange}
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
                <Text style={styles.pic_text_left}>Insulation Type:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
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
                <Text style={styles.pic_text_left}>Insulation Type:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
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
                <Text style={styles.pic_text_left}>Insulation Type:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
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
          </View>
        )}
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
