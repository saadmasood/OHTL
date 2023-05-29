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
import moment from 'moment';
import RNFetchBlob from 'rn-fetch-blob';

const DiscrepancyScreen = ({navigation, route}) => {
  const [isEditable, setIsEditable] = useState(true);

  const [descriptionError, setDescriptionError] = useState(false);
  const [description, setDescription] = useState('');

  const [remarksError, setRemarksError] = useState(false);
  const [remarks, setRemarks] = useState('');
  const [btnBackgroundColor, setBtnBackgroundColor] = useState(
    'rgba(93,45,145,255)',
  );
  const [ImagedeletionLoader, setImagedeletionLoader] = useState(false);

  const [openDiscrepancyTower, setOpenDiscrepancyTower] = useState(false);
  const [valueDiscrepancyTower, setValueDiscrepancyTower] = useState();
  const [itemsDiscrepancyTower, setItemsDiscrepancyTower] = useState([
    {label: 'Crane Access- Available', value: 'Crane Access- Available'},
    {
      label: 'Crane Access- Not available',
      value: 'Crane Access- Not available',
    },
    {label: 'Illegal encroachment', value: 'Illegal encroachment'},
    {label: 'Located inside boundary', value: 'Located inside boundary'},
    {
      label: 'Access Permission Required From Authority',
      value: 'Access Permission Required From Authority',
    },
    {
      label: 'Access Permission Required From Resident',
      value: 'Access Permission Required From Resident',
    },
    {label: 'Terrain/ Topography', value: 'Terrain/ Topography'},
    {label: 'Road Crossing', value: 'Road Crossing'},
    {label: 'Hookups', value: 'Hookups'},
    {label: 'EHT Circuit Crossing', value: 'EHT Circuit Crossing'},
    {label: 'HT Circuit Crossing', value: 'HT Circuit Crossing'},
    {label: 'LT Circuit Crossing', value: 'LT Circuit Crossing'},
    {label: 'Trees/ Bushes', value: 'Trees/ Bushes'},
    {label: 'Foundation', value: 'Foundation'},
    {label: 'Foundation- Cracked', value: 'Foundation- Cracked'},
    {label: 'Foundation- Buried', value: 'Foundation- Buried'},
    {label: 'Crash Barriers Required', value: 'Crash Barriers Required'},
    {
      label: 'Structure Numbering- Available',
      value: 'Structure Numbering- Available',
    },
    {label: 'Structure Numbering- Faded', value: 'Structure Numbering- Faded'},
    {
      label: 'Structure Numbering- Incorrect',
      value: 'Structure Numbering- Incorrect',
    },
    {
      label: 'Structure Numbering- Not Available',
      value: 'Structure Numbering- Not Available',
    },
    {
      label: 'Name Plate- Available & Ok condition',
      value: 'Name Plate- Available & Ok condition',
    },
    {
      label: 'Name Plate- Rusted/ Replacement Required',
      value: 'Name Plate- Rusted/ Replacement Required',
    },
    {label: 'Name Plate- Faded', value: 'Name Plate- Faded'},
    {label: 'Name Plate- Incorrect', value: 'Name Plate- Incorrect'},
    {label: 'Name Plate- Not Available', value: 'Name Plate- Not Available'},
    {
      label: 'Phase Indication Plate- Available & Ok condition',
      value: 'Phase Indication Plate- Available & Ok condition',
    },
    {
      label: 'Phase Indication Plate- Rusted/ Replacement Required',
      value: 'Phase Indication Plate- Rusted/ Replacement Required',
    },
    {
      label: 'Phase Indication Plate- Faded',
      value: 'Phase Indication Plate- Faded',
    },
    {
      label: 'Phase Indication Plate- Incorrect',
      value: 'Phase Indication Plate- Incorrect',
    },
    {
      label: 'Phase Indication Plate- Not Available',
      value: 'Phase Indication Plate- Not Available',
    },
    {label: 'Bird Nest- Tower Cage', value: 'Bird Nest- Tower Cage'},
    {
      label: 'Bird Nest- Monopole/ PLDP Shaft',
      value: 'Bird Nest- Monopole/ PLDP Shaft',
    },
    {label: 'Bird Nest- Gantry', value: 'Bird Nest- Gantry'},
    {label: 'Earth Wire/ OPGW- Damaged', value: 'Earth Wire/ OPGW- Damaged'},
    {label: 'Earth Wire/ OPGW- Missing', value: 'Earth Wire/ OPGW- Missing'},
    {label: 'Step Bolts- Rusted', value: 'Step Bolts- Rusted'},
    {label: 'Step Bolts- Missing', value: 'Step Bolts- Missing'},
    {label: 'Step Ladders- Rusted', value: 'Step Ladders- Rusted'},
    {label: 'Step Ladders- Missing', value: 'Step Ladders- Missing'},
    {label: 'Tower Condition ', value: 'Tower Condition '},
    {label: 'Tower Braces- Missing', value: 'Tower Braces- Missing'},
    {label: 'Tower Braces- Rusted', value: 'Tower Braces- Rusted'},
    {label: 'Tower Nut Bolts- Missing', value: 'Tower Nut Bolts- Missing'},
    {label: 'Tower Nut Bolts- Rusted', value: 'Tower Nut Bolts- Rusted'},
    {label: 'Joint Plates- Missing', value: 'Joint Plates- Missing'},
    {label: 'Joint Plates- Rusted', value: 'Joint Plates- Rusted'},
    {label: 'Monopole Condition', value: 'Monopole Condition'},
    {
      label: 'Monopole Anchor Bolt Nuts- Missing',
      value: 'Monopole Anchor Bolt Nuts- Missing',
    },
    {
      label: 'Monopole Anchor Bolt Nuts- Rusted',
      value: 'Monopole Anchor Bolt Nuts- Rusted',
    },
    {
      label: 'Monopole Anchor Bolt Cover- Missing',
      value: 'Monopole Anchor Bolt Cover- Missing',
    },
    {
      label: 'Monopole Anchor Bolt Cover- Damaged',
      value: 'Monopole Anchor Bolt Cover- Damaged',
    },
    {label: 'PS (STP) Condition', value: 'PS (STP) Condition'},
    {label: 'PS (STP) Poles Rusted', value: 'PS (STP) Poles Rusted'},
    {label: 'PS (STP) Channel Rusted', value: 'PS (STP) Channel Rusted'},
    {label: 'PS (STP) Poles Damaged', value: 'PS (STP) Poles Damaged'},
    {label: 'PS (STP) Channel Damaged', value: 'PS (STP) Channel Damaged'},
    {
      label: 'PS (STP) Eye Bolt Rusted/ Damaged',
      value: 'PS (STP) Eye Bolt Rusted/ Damaged',
    },
    {label: 'PS (STP) Eye Bolt Missing', value: 'PS (STP) Eye Bolt Missing'},
    {label: 'PS (RCC) Condition', value: 'PS (RCC) Condition'},
    {label: 'PS (RCC) Poles Damaged', value: 'PS (RCC) Poles Damaged'},
    {
      label: 'PS (RCC) Channel Damaged/ Dislocated',
      value: 'PS (RCC) Channel Damaged/ Dislocated',
    },
    {
      label: 'PS (RCC) Channel plates rusted/ damaged',
      value: 'PS (RCC) Channel plates rusted/ damaged',
    },
    {
      label: 'PS (RCC) Eye Bolt Rusted/ Damaged',
      value: 'PS (RCC) Eye Bolt Rusted/ Damaged',
    },
    {
      label: 'PS (RCC) Eye Bolt Rusted/ Damaged',
      value: 'PS (RCC) Eye Bolt Rusted/ Damaged',
    },
    {
      label: 'PS (RCC) Flying Stay Deteriorated',
      value: 'PS (RCC) Flying Stay Deteriorated',
    },
    {label: 'Stay Wire- Missing', value: 'Stay Wire- Missing'},
    {label: 'Stay Wire- Deteriorated', value: 'Stay Wire- Deteriorated'},
    {
      label: 'Structure Grounding- Missing',
      value: 'Structure Grounding- Missing',
    },
    {
      label: 'Structure Grounding- Damaged',
      value: 'Structure Grounding- Damaged',
    },
    {
      label: 'Trench- Sub-soil water accumulation',
      value: 'Trench- Sub-soil water accumulation',
    },
    {
      label: 'Trench- Rain water accumulation',
      value: 'Trench- Rain water accumulation',
    },
    {label: 'Trench- Deterioration', value: 'Trench- Deterioration'},
    {
      label: 'Cable Gantry/ PLDP- Boundary Wall Damaged',
      value: 'Cable Gantry/ PLDP- Boundary Wall Damaged',
    },
    {
      label: 'Cable Gantry/ PLDP- Barbed Wire Missing',
      value: 'Cable Gantry/ PLDP- Barbed Wire Missing',
    },
    {
      label: 'Cable Gantry/ PLDP- Painting Required',
      value: 'Cable Gantry/ PLDP- Painting Required',
    },
    {
      label: 'Cable Gantry/ PLDP- Lighting Required',
      value: 'Cable Gantry/ PLDP- Lighting Required',
    },
    {
      label: 'Foundation of Sealing End- Deteriorated',
      value: 'Foundation of Sealing End- Deteriorated',
    },
    {
      label: 'RCC Structure for Sealing End- Deteriorated',
      value: 'RCC Structure for Sealing End- Deteriorated',
    },
    {
      label: 'Steel Structures for Sealing End- Rusted',
      value: 'Steel Structures for Sealing End- Rusted',
    },
    {
      label: 'Steel Structures for Sealing End- Nut Bolts Rusted',
      value: 'Steel Structures for Sealing End- Nut Bolts Rusted',
    },
    {label: 'Trench- Slabs Missing', value: 'Trench- Slabs Missing'},
    {label: 'Trench- Slabs Damaged', value: 'Trench- Slabs Damaged'},
    {label: 'Bunker- Opening Damaged', value: 'Bunker- Opening Damaged'},
    {
      label: 'Bunker- Wall/ Roof Deteriorated',
      value: 'Bunker- Wall/ Roof Deteriorated',
    },
    {
      label: 'Bunker- Sub-soil water accumulation',
      value: 'Bunker- Sub-soil water accumulation',
    },
    {
      label: 'Bunker- Rain water accumulation',
      value: 'Bunker- Rain water accumulation',
    },
    {label: 'Any other discrepancy', value: 'Any other discrepancy'},
  ]);

  const [openDiscrepancyPhase, setOpenDiscrepancyPhase] = useState(false);
  const [valueDiscrepancyPhase, setValueDiscrepancyPhase] = useState();
  const [itemsDiscrepancyPhase, setItemsDiscrepancyPhase] = useState([
    {label: 'Span Conductor- Damaged', value: 'Span Conductor- Damaged'},
    {
      label: 'Span Conductor- Bolted Joint',
      value: 'Span Conductor- Bolted Joint',
    },
    {
      label: 'Span Conductor- Shunt Joint',
      value: 'Span Conductor- Shunt Joint',
    },
    {label: 'Jumper Conductor- Damaged', value: 'Jumper Conductor- Damaged'},
    {
      label: 'Jumper Conductor- PG/SC Installed',
      value: 'Jumper Conductor- PG/SC Installed',
    },
    {label: 'Partial Jumper', value: 'Partial Jumper'},
    {label: 'Double Jumper', value: 'Double Jumper'},
    {
      label: 'Jumper installed on main conductor',
      value: 'Jumper installed on main conductor',
    },
    {label: 'Jumper terminal disengaged', value: 'Jumper terminal disengaged'},
    {
      label: 'Jumper terminal nut bolts missing',
      value: 'Jumper terminal nut bolts missing',
    },
    {
      label: 'Jumper terminal nut bolts rusted',
      value: 'Jumper terminal nut bolts rusted',
    },
    {label: 'Bi- metallic', value: 'Bi- metallic'},
    {label: 'Insulator- Damaged', value: 'Insulator- Damaged'},
    {label: 'Insulator- Flashed Over', value: 'Insulator- Flashed Over'},
    {label: 'Insulator- Rusted', value: 'Insulator- Rusted'},
    {label: 'Hardware Fittings- Rusted', value: 'Hardware Fittings- Rusted'},
    {
      label: 'Hardware Fittings- Flashed Over',
      value: 'Hardware Fittings- Flashed Over',
    },
    {label: 'Vibration Damper- Missing', value: 'Vibration Damper- Missing'},
    {label: 'Vibration Damper- Damaged', value: 'Vibration Damper- Damaged'},
    {label: 'Spacer- Missing', value: 'Spacer- Missing'},
    {label: 'Spacer- Damaged', value: 'Spacer- Damaged'},
    {label: 'Corona Ring- Missing', value: 'Corona Ring- Missing'},
    {label: 'Corona Ring- Misaligned ', value: 'Corona Ring- Misaligned '},
    {label: 'Bird Nest- Cross Arm', value: 'Bird Nest- Cross Arm'},
    {
      label: 'Bird Nest- Insulator String',
      value: 'Bird Nest- Insulator String',
    },
    {
      label: 'Bird Nest- Cable Sealing End',
      value: 'Bird Nest- Cable Sealing End',
    },
    {label: 'PVC Wire- Cross Arm', value: 'PVC Wire- Cross Arm'},
    {label: 'PVC Wire- Insulator String', value: 'PVC Wire- Insulator String'},
    {label: 'PVC Wire- Span Conductor', value: 'PVC Wire- Span Conductor'},
    {label: 'PVC Wire- Jumper', value: 'PVC Wire- Jumper'},
    {label: 'Thread/ Rope- Cross Arm', value: 'Thread/ Rope- Cross Arm'},
    {
      label: 'Thread/ Rope- Insulator String',
      value: 'Thread/ Rope- Insulator String',
    },
    {
      label: 'Thread/ Rope- Span Conductor',
      value: 'Thread/ Rope- Span Conductor',
    },
    {label: 'Thread/ Rope- Jumper', value: 'Thread/ Rope- Jumper'},
    {
      label: 'Ground clearance compromised due to encroachment',
      value: 'Ground clearance compromised due to encroachment',
    },
    {
      label: 'Ground clearance compromised due loose conductor sag',
      value: 'Ground clearance compromised due loose conductor sag',
    },
    {label: 'Chattering', value: 'Chattering'},
    {label: 'Red Hot', value: 'Red Hot'},
    {label: 'Any other discrepancy', value: 'Any other discrepancy'},
    {label: 'Oil Seepage', value: 'Oil Seepage'},
    {label: 'Oil Seepage- Teflon', value: 'Oil Seepage- Teflon'},
    {label: 'Oil Seepage- Tank', value: 'Oil Seepage- Tank'},
    {label: 'Oil Seepage- Sealing End', value: 'Oil Seepage- Sealing End'},
    {label: 'Oil Seepage- Plumb', value: 'Oil Seepage- Plumb'},
    {label: 'Oil Seepage- Valve', value: 'Oil Seepage- Valve'},
    {label: 'Oil Leakage', value: 'Oil Leakage'},
    {label: 'Earthing', value: 'Earthing'},
    {
      label: 'Earthing for Cable Sealing End- Missing',
      value: 'Earthing for Cable Sealing End- Missing',
    },
    {
      label: 'Earthing for Cable Sealing End Structure- Missing',
      value: 'Earthing for Cable Sealing End Structure- Missing',
    },
    {
      label: 'Earthing for Oil Tank- Missing',
      value: 'Earthing for Oil Tank- Missing',
    },
    {
      label: 'Earthing for Link Box- Missing ',
      value: 'Earthing for Link Box- Missing ',
    },
    {label: 'Link box- Missing', value: 'Link box- Missing'},
    {label: 'Link box- Rusted', value: 'Link box- Rusted'},
    {label: 'Link box- Damaged', value: 'Link box- Damaged'},
    {label: 'Route Markers- Missing', value: 'Route Markers- Missing'},
    {label: 'Route Markers- Damaged', value: 'Route Markers- Damaged'},
    {label: 'Route Markers- Incorrect', value: 'Route Markers- Incorrect'},
    {label: 'Route Markers- Missing', value: 'Route Markers- Missing'},
    {
      label: 'Route Markers- Available & Ok Condition',
      value: 'Route Markers- Available & Ok Condition',
    },
    {label: 'Cable Trays- Rusted', value: 'Cable Trays- Rusted'},
    {label: 'Cable Trays- Damaged', value: 'Cable Trays- Damaged'},
    {
      label: 'Cable Sealing End- Porcelain Damaged',
      value: 'Cable Sealing End- Porcelain Damaged',
    },
    {label: 'Pressure gauge- Faulty', value: 'Pressure gauge- Faulty'},
    {
      label: 'Pressure gauge- Glass Cover Broken',
      value: 'Pressure gauge- Glass Cover Broken',
    },
  ]);

  const [openDiscrepancyRoute, setOpenDiscrepancyRoute] = useState(false);
  const [valueDiscrepancyRoute, setValueDiscrepancyRoute] = useState();
  const [itemsDiscrepancyRoute, setItemsDiscrepancyRoute] = useState([
    {label: 'Illegal encroachment', value: 'Illegal encroachment'},
    {label: 'Located inside boundary', value: 'Located inside boundary'},
    {
      label: 'Access Permission Required From Authority',
      value: 'Access Permission Required From Authority',
    },
    {
      label: 'Access Permission Required From Resident',
      value: 'Access Permission Required From Resident',
    },
    {label: 'Nala Crossing', value: 'Nala Crossing'},
    {
      label: 'Dump yard over EHT cable circuit route',
      value: 'Dump yard over EHT cable circuit route',
    },
    {label: 'Open Nala', value: 'Open Nala'},
    {label: 'Excavation ongoing- Legal', value: 'Excavation ongoing- Legal'},
    {
      label: 'Excavation ongoing- Illegal',
      value: 'Excavation ongoing- Illegal',
    },
  ]);

  const [openDiscrepancyType, setOpenDiscrepancyType] = useState(false);
  const [valueDiscrepancyType, setValueDiscrepancyType] = useState();
  const [itemsDiscrepancyType, setItemsDiscrepancyType] = useState([
    {label: 'OH/ UG Structure related', value: 'OH/ UG Structure related'},
    {label: 'OH/ UG Phase related', value: 'OH/ UG Phase related'},
    {label: 'UG Route related', value: 'UG Route related'},
  ]);

  const [openPhase, setOpenPhase] = useState(false);
  const [valuePhase, setValuePhase] = useState();
  const [itemsPhase, setItemsPhase] = useState([
    {label: 'Red', value: 'Red'},
    {label: 'Blue', value: 'Blue'},
    {label: 'Yellow', value: 'Yellow'},
    {label: 'Earth wire/OGW/OPGW', value: 'Earth wire/OGW/OPGW'},
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
    {label: 'Very High', value: 'Very High'},
    {label: 'High', value: 'High'},
    {label: 'Low', value: 'Low'},
    {label: 'Medium', value: 'Medium'},
    {label: 'Non- Critical', value: 'Non- Critical'},
  ]);

  const [discrepancyImage, setDiscrepancyImage] = useState([]);
  const [filePath, setFilePath] = useState([]);

  const [postImages, setPostImages] = useState([]);
  const [images, setImages] = useState([]);
  const [isImage, setIsImage] = useState('N');
  const carouselRef = useRef();
  const flatListRef = useRef();
  const [imageview, setimageview] = useState(false);
  const [indexer1, setindexer1] = useState(0);
  const {width} = Dimensions.get('window');
  const [indexSelected, setIndexSelected] = useState(0);
  const {data, PtlSnro, StrSnro, CaseType, regionName} = route.params;
  const [empName, setEmpName] = useState('');
  const [imageFolder, setImageFolder] = useState('');
  const [discrepancyID, setDiscrepancyID] = useState(0);

  const PostSIRImage = () => {
    let imageData = [];

    let count = 1;
    console.log('Post SIR Image Data called');
    console.log('regionName: ' + regionName);
    console.log('route.params.PtlSnro: ' + route.params.PtlSnro);
    console.log('route.params.Fl: ' + route.params.Fl);
    console.log('route.params.StrFl: ' + route.params.StrFl);
    console.log('discrepancyID: ' + discrepancyID);

    const doubledNumbers = images.map(item => {
      imageData.push({Base64ImageString: item.base64});
    });

    console.log(imageData);

    let data1 = {
      RegionName: regionName,
      PRT_Number: route.params.PtlSnro,
      FL_Number: route.params.Fl,
      StructData: [
        {
          StructNumber: route.params.StrFl,
          DiscrepencyDetail: [
            {
              DiscrepencyNumber: discrepancyID,
              Base64Images: imageData,
            },
          ],
        },
      ],
    };

    /*
    RNFetchBlob.config({trusty: true})
      .fetch(
        'GET',
        'https://stagingdev.ke.com.pk:8095/api/discrepancy',
        {},
        JSON.stringify(data1),
      )
 */
    axios({
      method: 'POST',
      url: 'https://stagingdev.ke.com.pk:8095/api/discrepancy',
      headers: {
        'content-type': 'application/json',
        //'Access-Control-Allow-Origin': '*',
        //'Access-Control-Allow-Headers': '*',
      },
      data: JSON.stringify(data1),
    })
      .then(res => {
        console.log(
          '******************Post SIR Image updated*********************************',
        );
        console.log(res.data.Data);
        PostDiscrepancyRecord();
      })
      .catch(error => {
        console.log('Post SIR Image ERROR STARTS NOW');
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log('error.message: ', error.message);
        }
        console.log('error: ', error);
      });
  };

  const PostDiscrepancyRecord = () => {
    console.log('route.params.Fl: ' + route.params.Fl);
    console.log('route.params.StrFl: ' + route.params.StrFl);
    console.log('imageFolder: ' + imageFolder);

    let discrepancyDropdown;

    if (valueDiscrepancyType == 'OH/ UG Structure related') {
      discrepancyDropdown = valueDiscrepancyTower;
    } else if (valueDiscrepancyType == 'OH/ UG Phase related') {
      discrepancyDropdown = valueDiscrepancyPhase;
    } else {
      discrepancyDropdown = valueDiscrepancyRoute;
    }
    console.log('discrepancyDropdown: ' + discrepancyDropdown);

    axios({
      method: 'POST',
      url: 'https://fioriqa.ke.com.pk:44300/sap/opu/odata/sap/ZPATROLLING_SRV/FLHeaderSet',
      headers: {
        Authorization: 'Basic ' + base64.encode('tooba:abap123'),
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'X-CSRF-Token': '',
        'X-Requested-With': 'X',
      },
      data: JSON.stringify({
        Fl: route.params.Fl,
        HEADERDSCR_NAV: [
          {
            Qmnum: route.params.PtlSnro,
            Fl: route.params.Fl,
            Structure: route.params.StrFl,
            Discrepency: discrepancyDropdown,
            Username: empName,
            DiscrType: valueDiscrepancyType,
            DiscrDescr: description,
            InBetween: valueInBetween,
            FaultCount: valueFaultCount,
            Citicality: valueCiticality,
            Remarks: remarks,
            Phase: valuePhase,
            ImagePath: '',
          },
        ],
      }),
    }).then(items => {
      StoreInDevice('Post');
    });
  };
  const StoreInDevice = status => {
    AsyncStorage.getItem(route.params.StrSnro)
      .then(items => {
        var DiscrepancyData = items ? JSON.parse(items) : [];
        console.log(route.params.CaseType);
        if (route.params.CaseType == 'New') {
          DiscrepancyData.push({
            DiscrepancyID: DiscrepancyData.length + 1,
            PtlSnro: route.params.PtlSnro,
            StrSnro: route.params.StrSnro,
            valueDiscrepancyType: valueDiscrepancyType,
            valuePhase: valuePhase,
            valueDiscrepancyTower: valueDiscrepancyTower,
            valueDiscrepancyPhase: valueDiscrepancyPhase,
            valueDiscrepancyRoute: valueDiscrepancyRoute,
            valuePhase: valuePhase,
            description: description,
            valueInBetween: valueInBetween,
            valueFaultCount: valueFaultCount,
            valueCiticality: valueCiticality,
            remarks: remarks,
            createdDate: moment(Date.now()).format('YYYYMMDD'),
            imageFolder: imageFolder,
            status: status,
          });

          AsyncStorage.setItem(
            route.params.StrSnro,
            JSON.stringify(DiscrepancyData),
          );
        } else {
          DiscrepancyData.filter((item, index) => {
            if (item.DiscrepancyID == data.DiscrepancyID) {
              DiscrepancyData[index].valueDiscrepancyType =
                valueDiscrepancyType;
              DiscrepancyData[index].valueDiscrepancyTower =
                valueDiscrepancyTower;
              DiscrepancyData[index].valueDiscrepancyPhase =
                valueDiscrepancyPhase;
              DiscrepancyData[index].valueDiscrepancyRoute =
                valueDiscrepancyRoute;
              DiscrepancyData[index].description = description;
              DiscrepancyData[index].valueInBetween = valueInBetween;
              DiscrepancyData[index].valueFaultCount = valueFaultCount;
              DiscrepancyData[index].valueCiticality = valueCiticality;
              DiscrepancyData[index].remarks = remarks;
              DiscrepancyData[index].status = status;
              AsyncStorage.setItem(
                route.params.StrSnro,
                JSON.stringify(DiscrepancyData),
              );
            }
          });
        }
      })
      .then(items => {
        StoreInDeviceImages();
      });
  };

  const StoreInDeviceImages = isPost => {
    let dataSIRImages = [];
    console.log('discrepancyImage: ' + discrepancyImage);
    dataSIRImages.push({
      PtlSnro: route.params.PtlSnro,
      ImageFlag: isImage,
      DiscrepancyImages: images,
    });
    AsyncStorage.setItem(discrepancyImage, JSON.stringify(dataSIRImages));
    navigation.navigate('DiscrepancyListView', {
      PtlSnro: route.params.PtlSnro,
      StrSnro: route.params.StrSnro,
      Fl: route.params.Fl,
      StrFl: route.params.StrFl,
    });
  };

  useEffect(() => {
    console.log('route.params.CaseType: ' + route.params.CaseType);
    console.log('route.params.Fl: ' + route.params.Fl);
    console.log('route.params.StrFl: ' + route.params.StrFl);
    console.log('route.params.index: ' + route.params.index);
    console.log('data.DiscrepancyID: ' + data.DiscrepancyID);

    AsyncStorage.getItem('UserDetail')
      .then(items => {
        var data1 = items ? JSON.parse(items) : [];
      })
      .then(userDetailItems => {
        var systemImageData = [];
        if (route.params.CaseType != 'New')
          AsyncStorage.getItem(
            route.params.StrSnro + '-' + data.DiscrepancyID,
          ).then(items => {
            var localImageData = items ? JSON.parse(items) : [];
            var filterImageData = localImageData.filter(item => {
              if (item.DiscrepancyImages != undefined) {
                setIsImage(item.ImageFlag);
                setImages(item.DiscrepancyImages);
                item.DiscrepancyImages.filter(singleItem => {
                  systemImageData.push({
                    Base64ImageString: singleItem.base64,
                  });
                });
              }
            });
          });

        setPostImages(systemImageData);

        AsyncStorage.getItem(route.params.StrSnro).then(items => {
          var descID;
          var DiscrepancyData = items ? JSON.parse(items) : [];
          if (route.params.CaseType == 'New') {
            descID = DiscrepancyData.length + 1;
            setDiscrepancyID(DiscrepancyData.length + 1);
            console.log('regioncalled: ' + regionName);
            setImageFolder(
              'https://stagingdev:8095/PTR_ImageData/' +
                moment().year() +
                '/' +
                (moment().month() + 1) +
                '/' +
                regionName +
                '/' +
                route.params.PtlSnro +
                '/' +
                route.params.Fl +
                '/' +
                route.params.StrFl +
                '/' +
                Number(DiscrepancyData.length + 1),
            );
          } else {
            if (data.DiscrepancyID != undefined) {
              descID = data.DiscrepancyID;
              setDiscrepancyID(data.DiscrepancyID);
            }
          }
          setDiscrepancyImage(route.params.StrSnro + '-' + descID);

          if (route.params.CaseType != 'New')
            var filterData = DiscrepancyData.filter(item => {
              if (item.DiscrepancyID == data.DiscrepancyID) {
                if (data.status == 'Post') {
                  setIsEditable(false);
                  console.log('data.status: ' + data.status);
                }
                setValueDiscrepancyType(item.valueDiscrepancyType);
                setValueDiscrepancyTower(item.valueDiscrepancyTower);
                setValueDiscrepancyPhase(item.valueDiscrepancyPhase);
                setValueDiscrepancyRoute(item.valueDiscrepancyRoute);
                setValuePhase(item.valuePhase);
                setDescription(item.description);
                setValueInBetween(item.valueInBetween);
                setValueFaultCount(item.valueFaultCount);
                setValueCiticality(item.valueCiticality);
                setRemarks(item.remarks);
                setValuePhase(item.valuePhase);
                console.log('regionName:Called: ' + regionName);
                setImageFolder(
                  'https://stagingdev:8095/PTR_ImageData/' +
                    moment().year() +
                    '/' +
                    (moment().month() + 1) +
                    '/' +
                    regionName +
                    '/' +
                    route.params.PtlSnro +
                    '/' +
                    route.params.Fl +
                    '/' +
                    route.params.StrFl +
                    '/' +
                    data.DiscrepancyID,
                );
              }
            });
        });

        //console.log('route.params.PtlSnro:::', route.params.PtlSnro);
        //console.log('route.params.StrSnro:::', route.params.StrSnro);

        console.log('imageFolder: ' + imageFolder);
      });
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
        var AllPostimages = postImages;
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
        setPostImages([
          {
            Base64ImageString: response.data,
          },
          ...AllPostimages,
        ]);
        //console.log('images1.uri----ali', images[0].uri);
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
      var AllPostimages = postImages;

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
      setPostImages([
        {
          Base64ImageString: response.data,
        },
        ...AllPostimages,
      ]);
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View>
        <View style={{paddingTop: 10}}></View>

        <View style={styles.header}>
          <Text style={[styles.logo]}>Discrepancy Data Collection</Text>
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
              disabled={!isEditable}
              open={openDiscrepancyType}
              value={valueDiscrepancyType}
              items={itemsDiscrepancyType}
              setOpen={setOpenDiscrepancyType}
              setValue={setValueDiscrepancyType}
              setItems={setItemsDiscrepancyType}
              listMode="MODAL"
              searchable
              //disabled={isDCRemarksEditable}
              //onChangeValue={item => {}}
            />
          </View>
        </View>

        {valueDiscrepancyType == 'OH/ UG Structure related' && (
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
                disabled={!isEditable}
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
                  setValueDiscrepancyPhase('');
                  setValueDiscrepancyRoute('');
                }}
              />
            </View>
          </View>
        )}

        {valueDiscrepancyType == 'OH/ UG Phase related' && (
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
                <Text style={styles.pic_text_left}>Phase:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
                  open={openPhase}
                  value={valuePhase}
                  items={itemsPhase}
                  setOpen={setOpenPhase}
                  setValue={setValuePhase}
                  setItems={setItemsPhase}
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
                <Text style={styles.pic_text_left}>Discrepancy:</Text>
              </View>
              <View style={{flex: 1, alignItems: 'flex-start'}}>
                <DropDownPicker
                  disabled={!isEditable}
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
                    setValueDiscrepancyTower('');
                    setValueDiscrepancyRoute('');
                  }}
                />
              </View>
            </View>
          </View>
        )}

        {valueDiscrepancyType == 'UG Route related' && (
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
                disabled={!isEditable}
                open={openDiscrepancyRoute}
                value={valueDiscrepancyRoute}
                items={itemsDiscrepancyRoute}
                setOpen={setOpenDiscrepancyRoute}
                setValue={setValueDiscrepancyRoute}
                setItems={setItemsDiscrepancyRoute}
                listMode="MODAL"
                searchable
                //disabled={isDCRemarksEditable}
                onChangeValue={item => {
                  console.log(item);
                  setValueDiscrepancyTower('');
                  setValueDiscrepancyPhase('');
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
              disabled={!isEditable}
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
              disabled={!isEditable}
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
            <Text style={styles.pic_text_left}>Criticality:</Text>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start'}}>
            <DropDownPicker
              disabled={!isEditable}
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
                        var arrpost = postImages;

                        arr.splice(index, 1);
                        arrpost.splice(index, 1);
                        // console.log(index)
                        //console.log("index", index);
                        //console.log("arr)", arr);

                        setImages(arr);
                        setPostImages(arrpost);

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
                      }}
                      editable={isEditable}>
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
            <TouchableOpacity
              onPress={() => chooseFile('photo')}
              disabled={!isEditable}>
              <Image
                source={require('../assets/gallery4.png')} // source={{uri: filePath.uri}}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
          </View>
          <View style={{flex: 1, alignItems: 'flex-start', paddingLeft: 50}}>
            <TouchableOpacity
              onPress={() => captureImage('photo', '2')}
              disabled={!isEditable}>
              <Image
                source={require('../assets/camera2.png')} // source={{uri: filePath.uri}}
                style={styles.imageStyle}
              />
            </TouchableOpacity>
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
              PostDiscrepancyRecord();
              //PostSIRImage();
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

export default DiscrepancyScreen;
