import React, { useEffect, useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';
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

  const touristSpots = [
    { id: 1, name: 'Praça São Sebastião', latitude: -22.1195, longitude: -43.2184 },
    { id: 2, name: 'Parque de Exposições', latitude: -22.1240, longitude: -43.2189 },
    { id: 3, name: 'Lago Azul', latitude: -22.1155, longitude: -43.1959 },
    // Adicione outros pontos turísticos aqui
  ];

  <View>
    <Image style={{width:35,height:30}} source={{uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF8-fS0hg0m4CYRhPsa4bnZ0iRYqNCzsIp_3aq6fW_AcK57CWByO_PKoEd7z3vJUQS1Eg&usqp=CAU'}}>

    </Image>
  </View>
    
      
       
  


  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: -22.1234,
          longitude: -43.2096,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {/* Exibe o marcador na localização atual */}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
          />
        )}

        {/* Exibe marcadores dos pontos turísticos */}
        {touristSpots.map((spot) => (
          <Marker
            key={spot.id}
            coordinate={{ latitude: spot.latitude, longitude: spot.longitude }}
            title={spot.name}
          >
             <Image style={{width:35,height:30}} source={{uri:
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRF8-fS0hg0m4CYRhPsa4bnZ0iRYqNCzsIp_3aq6fW_AcK57CWByO_PKoEd7z3vJUQS1Eg&usqp=CAU'}}>

    </Image>
          </Marker>
        ))}
      </MapView>

      <TouchableHighlight onPress={() => navigation.navigate('CameraPage')}>
        <View
          style={{
            justifyContent: 'center',
            backgroundColor: '#1919',
            elevation: 5,
            alignItems: 'center',
            height: 50,
            width: 50,
            borderRadius: 100,
            position: 'absolute',
            bottom: 100,
          }}
        >
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
 
    markerImage: {
      width: 40,
      height: 40,
      borderRadius: 20,
    },
  });

