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
} from 'react-native';



const Dashboard = ({ navigation }) => {


    return (
        <ImageBackground
            //            source={require('../assets/images/kebackground.jpg')}
            style={{
                width: '100%',
                resizeMode: 'contain',
                height: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: '#ffff',
            }}>
            <View style={styles.header}>
                <Text style={styles.text_header}>Welcome </Text>
            </View>
            <View style={styles.container} >
                <View style={{ flex: 1 }}>

                    <View style={styles.topleft}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Employee Info');
                                /*   
                                navigation.reset({
                                    index: 0,
                                    routes: [{ name: 'EmployeeInfo' }],
                                });
                                */
                                navigation.navigate('EmployeeInfo');
                            }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/images/personal.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text_header}>Employee Info</Text>
                    </View>
                    <View style={styles.downleft}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Work Schedule');
                                navigation.navigate('WorkSchedule');
                            }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/images/calendar2.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text_header}>Work Schedule</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <View style={styles.topright}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Work Location');
                                navigation.navigate('WorkLocation');
                            }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/images/location.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text_header}>Work Location</Text>
                    </View>
                    <View style={styles.downright}>
                        <TouchableOpacity
                            onPress={() => {
                                console.log('Work Summary');
                                navigation.navigate('WorkSummary');
                            }}>
                            <Image
                                style={styles.tinyLogo}
                                source={require('../assets/images/graph.png')}
                            />
                        </TouchableOpacity>
                        <Text style={styles.text_header}>Work Summary</Text>
                    </View>
                </View>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "row",
    },
    topleft: {
        paddingTop: 100,
        flex: 1,
        alignItems: 'center',
        //        backgroundColor: "red",
    },
    topright: {
        paddingTop: 100,
        flex: 1,
        alignItems: 'center',
    },
    downleft: {
        paddingBottom: 100,
        flex: 1,
        alignItems: 'center',
    },
    downright: {
        paddingBottom: 100,
        flex: 1,
        alignItems: 'center',
    },
    tinyLogo: {
        width: 150,
        height: 150,
        resizeMode: 'contain',
    },
    text_header: {
        paddingTop: 20,
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center'
    },


})


export default Dashboard;