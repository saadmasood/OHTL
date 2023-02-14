import React, { useState, useEffect } from 'react';
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

const WorkLocation = ({ navigation }) => {

    const data3 =
    {
        EmpNo: '80012932',
        EmpName: 'ASIF BAIG',
        IBC: '130 - IBC JOHAR',
        Gang: 'GANG A',
    };

    return (
        <ImageBackground
            source={require('../assets/images/kebackground.jpg')}
            style={{
                width: '100%',
                resizeMode: 'contain',
                height: '100%',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
            }}>
            <View style={styles.header}>
                <Text style={styles.text_main}>This Screen is under construction</Text>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
        flexDirection: "row",
    },
    formheader: {
        flex: 3,
        paddingBottom: 200,
    },

    text_main: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        padding: 15,
    },
    text_left: {
        color: '#111012',
        fontWeight: 'bold',
        fontSize: 20,
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
    header: {
        paddingTop: 100,
        flex: 1,
        //      justifyC3ntent: 'flex-end',
        //paddingHorizontal: 20,
        //  marginTop: 200,
        //  paddingBottom: 100
    },
})


export default WorkLocation;