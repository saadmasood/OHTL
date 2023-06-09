import React, {useState, useEffect} from 'react';
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

const Circle = props => {
  return <View style={[styles.circle, {backgroundColor: props.customcolor}]} />;
};

const styles = StyleSheet.create({
  circle: {
    width: 10,
    height: 10,
    borderRadius: 50,
    backgroundColor: 'blue',
  },
});

export default Circle;
