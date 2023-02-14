/* eslint-disable eqeqeq */
/* eslint-disable no-alert */
/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
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
import AsyncStorage from 'react-native-encrypted-storage';

import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from 'moment';


const base64 = require('base-64');
import Swipeable from 'react-native-swipeable';
import { FlatList } from 'react-native-gesture-handler';
//import axios from 'axios';

let i = 0;
let j = 10;
let dataslice;

function WorkSchedule({ route, navigation }) {

    const data3 =
    {
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

    const [startOfMonth, setstartOfMonth] = useState(moment().subtract(3, 'days').format('YYYYMMDD'));
    const [endOfMonth, setendOfMonth] = useState(moment().add(1, 'days').format('YYYYMMDD'));

    const [caseTypeHeading, setCaseTypeHeading] = useState();

/*    
        var manualData = [
    
            {
                Vertrag: "LA982000", AccountNo: "400002718535",
                MeterNo: "SCA24438", CurrentBill: "2,214.58",
                TotalDues: "6869.84", Tariff: "A1-R",
                LoginDate: "20220201", ConsumerName: "AKD Builder",
                ConsumerAddress: "FLAT No. 202-A Block-A Gulshan-e-Iqbal", Contract: "30490615",
                LastPaidAmount: "3090.00", Status: "Pending",
            },
            {
                ConsumerNo: "LA982001", AccountNo: "400002718535",
                MeterNo: "SCA24438", CurrentBill: "2,214.58",
                TotalDues: "6869.84", Tariff: "A1-R",
                LoginDate: "20220202", ConsumerName: "Maymar Society",
                ConsumerAddress: "FLAT No. 202-A Block-A Gulshan-e-Iqbal", Contract: "30490615",
                LastPaidAmount: "3090.00", Status: "Pending",
            },
            {
                ConsumerNo: "LA982002", AccountNo: "400002718535",
                MeterNo: "SCA24438", CurrentBill: "2,214.58",
                TotalDues: "6869.84", Tariff: "A1-R",
                LoginDate: "20220203", ConsumerName: "A. Y. Builders",
                ConsumerAddress: "FLAT No. 202-A Block-A Gulshan-e-Iqbal", Contract: "30490615",
                LastPaidAmount: "3090.00", RecordStatus: "",ImDate:"20220902", CurrentDues:"1000"
                , TotDues:"1000",Image: [{}, {}, {}, {}], AsonDues:"1000" 
            },
        ];
    
        AsyncStorage.setItem('DCRCRecord', JSON.stringify(manualData));
*/    
    
    const loadData = val => {
        console.log('values == >', i, j);
        setLoading(true);
        let data1;
        AsyncStorage.getItem('DCRCRecord').then(items => {

            var data = [];
            data = items ? JSON.parse(items) : {};

            console.log("startOfMonth: " + startOfMonth);
            console.log("endOfMonth: " + endOfMonth);

            //            console.log('data', data[0].ImageCount);
            console.log('route.params.otherParam:::', route.params.otherParam);
            //            console.log('*******', data);
            console.log("data: " + typeof data + " length: " + data.length);

            data1 = data.filter(x => moment(moment(x.ImDate).format('YYYYMMDD')).isBetween(startOfMonth, endOfMonth));

            data1.sort((a, b) => b.ImDate - a.ImDate);

            if (route.params.otherParam == 'PostCases')
                data1 = data1.filter(x => x.RecordStatus == 'Post');
            else if (route.params.otherParam == 'SavedCases')
                data1 = data1.filter(x => x.RecordStatus == 'Saved');
            else if (route.params.otherParam == 'NewCases')
                data1 = data1.filter(x => (x.RecordStatus == ''));
            //                data1 = data.filter(x => (x.Status == null && x.DcStatus == ''));


            if (val) {
                i += 30;

                dataslice = data1.splice(i, j);
                //                console.log('if', dataslice);

                setLoading(false);
            } else {
                i = 0;
                j = 30;

                dataslice = data1.splice(i, j);
                //                console.log('else', dataslice);
                setLoading(false);
            }

            console.log('data', i, j);
            settableData([...tableData, ...dataslice]);
            settemptableData([...temptableData, ...dataslice]);
            setLoader(false);
        });
    };

    useEffect(() => {
        setLoader(true);

        navigation.addListener(
            'focus',
            payload => {
                loadData()
            }
        );

        LogBox.ignoreLogs(['Animated.event ']);

        loadData();

        if (route.params.otherParam == "NewCases") {
            setCaseTypeHeading("NEW CASES");
        }
        else if (route.params.otherParam == "SavedCases") {
            setCaseTypeHeading("SAVED CASES");
        }
        else {
            setCaseTypeHeading("COMPLETED CASES");
        }


    }, []);

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        console.warn("A date has been picked: ", date);
        searchFilterFunctionDate(moment(date).format("YYYYMMDD"));
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

        console.log("date: " + text);
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
            <View
                style={{
                    backgroundColor: '#371A80',//rgba(93,45,145,255)                   
                }}>
                <TextInput
                    style={{
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        //height:405,
                        //fontSize:,
                    }}>
                    {caseTypeHeading}</TextInput>
            </View>
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
            {loader ? (
                <ActivityIndicator />
            ) : (
                <FlatList
                    style={{ flex: 1, width: '100%' }}
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
                                            <Text style={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Load More</Text>
                                            {loading ? (
                                                <ActivityIndicator
                                                    color="black"
                                                    style={{ marginLeft: 8 }}
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
                    renderItem={({ item, index }) => {
                        // var date = +item.PreqDate.replace(/\/Date\((.*?)\)\//g, '$1');

                        return (
                            <Swipeable>
                                <TouchableOpacity
                                    // disabled={true}
                                    onPress={() => {
                                        //  alert('asdfasd');
                                        /*
                                        navigation.reset({
                                            index: 0,
                                            routes: [{ name: 'WorkScheduleDetail' }],
                                        });
                                        */
                                        navigation.navigate('WorkScheduleDetail', {
                                            data: item,
                                            index: index,
                                            otherParam: item.Vertrag,
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
                                        shadowOffset: { width: 10, height: 10 },
                                        shadowOpacity: 0.8,
                                        shadowRadius: 15,
                                        elevation: 10,
                                        // borderBottomColor: 'grey',
                                        // borderBottomWidth: 0.5,
                                    }}>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
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
                                        <View
                                            style={{
                                                flex: 1,
                                                paddingLeft: 10,
                                                justifyContent: 'space-between',
                                                paddingVertical: 10,
                                                //backgroundColor: "red",
                                            }}>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    Consumer No:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                    }}>
                                                    {item.ConsumerNo}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    Acc No:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 13,
                                                        color: 'black',
                                                    }}>
                                                    {item.Vkont}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    Meter No:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 13,
                                                        color: 'black',
                                                    }}>
                                                    {item.Mtno}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    Current Bill:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 13,
                                                        color: 'black',
                                                        fontWeight: 'bold',
                                                    }}>
                                                    {(item.CurrentDues).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    Total Dues:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 13,
                                                        color: 'black',
                                                         fontWeight: 'bold',
                                                    }}>
                                                    {(item.TotDues).replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    MRU:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 13,
                                                        color: 'black',
                                                    }}>
                                                    {item.Mru}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: "row"
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        color: 'black',
                                                        fontSize: 13,
                                                        fontWeight: 'bold',
                                                    }}>
                                                    Tariff:
                                                </Text>
                                                <Text
                                                    style={{
                                                        marginLeft: 5,
                                                        fontSize: 13,
                                                        color: 'black',
                                                    }}>
                                                    {item.Tariff}
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
                                                    height: 90,
                                                    width: 140,
                                                    marginRight: 10,
                                                    borderRadius: 15,
                                                }}>
                                                <Text
                                                    style={{
                                                        marginLeft: 70,
                                                        fontSize: 13,
                                                        color: 'black',
                                                    }}>
                                                    {item.ActionType1}
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontSize: 15,
                                                        //fontWeight: 'bold',
                                                        color: '#0873C3',
                                                    }}
                                                />
                                            </View>
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
                                                }}>
                                                <View
                                                    style={{
                                                        //backgroundColor: '#0873C3',
                                                        alignItems: 'center',
                                                        justifyContent: 'center',
                                                        height: 90,
                                                        width: 140,
                                                        marginRight: 10,
                                                        borderRadius: 15,
                                                        display: 'none',
                                                    }}>
                                                    <Text
                                                        style={{
                                                            marginLeft: 70,
                                                            fontSize: 13,
                                                            color: 'black',
                                                        }}>
                                                        {item.filterkey}
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            fontSize: 15,
                                                            //fontWeight: 'bold',
                                                            color: '#0873C3',
                                                        }}
                                                    />
                                                </View>
                                                {/*
                                                <TouchableOpacity
                                                    // disabled={loader}

                                                    style={styles.loginBtn}
                                                    onPress={() => {
                                                        //alert('asfasf');

                                                        navigation.navigate('EditRecordDetails', {
                                                            data: item,
                                                            index: index,
                                                            otherParam: item.filterkey,
                                                        });
                                                    }}>
                                                    <View
                                                        style={{
                                                            height: 30,
                                                            //width: '97%',
                                                            borderColor: 'white',
                                                            // height: 15,
                                                            width: 140,
                                                            borderRadius: 30,
                                                            //  borderWidth: 2,
                                                            alignItems: 'center',
                                                            justifyContent: 'center',
                                                        }}>
                                                        <Text
                                                            style={{
                                                                color: 'white',
                                                                fontSize: 12,
                                                                fontWeight: 'bold',
                                                            }}>
                                                            Edit Record
                                                        </Text>
                                                    </View>
                                                </TouchableOpacity>
                                                */}
                                            </View>
                                        </View>
                                        <View
                                            style={{
                                                backgroundColor: 'rgba(93,45,145,255)',
                                                flexDirection: 'row',
                                                paddingHorizontal: 6,
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                width: 140,
                                                height: 34,
                                                position: 'absolute',
                                                borderTopRightRadius: 15,
                                                right: -1,
                                            }}>
                                            <Text
                                                style={{
                                                    // marginLeft: 5,
                                                    fontSize: 11,
                                                    fontWeight: 'bold',
                                                    color: '#FFFFFF',
                                                }}>
                                                {'Dated : ' + moment(item.ImDate, "YYYYMMDD").format("DD MM YYYY")}
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
        </View >
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, width: '100%', backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { margin: 6 },
    row: { flexDirection: 'row', backgroundColor: '#FFF1C1' },
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
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 0.8,
        shadowRadius: 20,
    },
    inputView: {
        flexDirection: 'row',
        alignItems: 'center',
        elevation: 4,
        shadowOffset: { width: 15, height: 15 },
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
        shadowOffset: { width: 15, height: 15 },
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
        shadowOffset: { width: 15, height: 15 },
        shadowColor: 'black',
        shadowOpacity: 0.2,
        shadowRadius: 50,
        right: -1,
        bottom: 0,
        borderBottomRightRadius: 15,
    },
});

export default WorkSchedule;