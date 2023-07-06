import React, { useEffect, useState } from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, TouchableHighlight, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import * as Location from 'expo-location';


export default function HomePage({ navigation }) {
  const [markers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    getLocationPermission();
  }, []);

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão de localização não concedida');
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    setCurrentLocation({ latitude, longitude });
  };
  return (
    <View style={styles.container}>
      <MapView style={styles.map} 
      />

      <TouchableHighlight onPress={() => navigation.navigate('CameraPage')}>
        <View style={{justifyContent:'center',
    backgroundColor:'#1919',
    elevation:5,
    alignItems:'center',
    height:50,
    width:50,
    borderRadius:100,
    position:'absolute',
    bottom:100,}}>
       <MaterialIcons name="camera" size={30} color="black" />
       </View>
      </TouchableHighlight> 
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});