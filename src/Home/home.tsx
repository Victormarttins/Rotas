import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Modal,
  TextInput,
  Button,
  Image,
  Alert,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, TouchableHighlight, View, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import * as Location from 'expo-location';
import { Camera } from 'expo-camera';
import * as MediaLibrary from 'expo-media-library';
import { Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';

const App = () => {
  const [markers, setMarkers] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [isCameraVisible, setCameraVisible] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerImageUri, setMarkerImageUri] = useState(null);
  const [markerTitle, setMarkerTitle] = useState('');
  const [markerDescription, setMarkerDescription] = useState('');
  const [cameraType, setCameraType] = useState(Camera.Constants.Type['back']);

  
  const handleDeleteConfirmation = () => {
    Alert.alert(
      'Confirmação',
      'Tem certeza de que deseja excluir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => handleDeleteMarker(markerImageUri) },
      ]
    );
  };


  

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const cameraRef = useRef(null);

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
    
      
       
  

  const toggleCameraType = () => {
    setCameraType((prevType) =>
      prevType === Camera.Constants.Type['back']
        ? Camera.Constants.Type['front']
        : Camera.Constants.Type['back']
    );
  };

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

      {isCameraVisible && (
        <Camera
          ref={cameraRef}
          style={StyleSheet.absoluteFillObject}
          type={cameraType}
          onCameraReady={() => console.log('Câmera pronta')}
          onMountError={(error) => console.log('Erro ao montar a câmera:', error)}
        >
          <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
           <MaterialIcons name="camera-alt" size={34} color="black"  />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
          <AntDesign name="retweet" size={24} color="black" />
          </TouchableOpacity>
          
        </Camera>
      )}

      <Modal visible={isModalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity activeOpacity={1} style={styles.modalContainer} onPress={dismissKeyboard}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              {markerImageUri && (
                <>
                  <Image source={{ uri: markerImageUri }} style={styles.modalImage} />
                </>
              )}
              <TextInput
                style={styles.input}
                placeholder="Título"
                value={markerTitle}
                onChangeText={setMarkerTitle}
              />
              
              <View style={{flexDirection:'row' , justifyContent:'space-between'}}>
                <Button title="Salvar" onPress={handleSaveMarker} />
                <Button title="Deletar" onPress={handleDeleteConfirmation} />
              </View>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  loadingText: {
    flex: 1,
    textAlign: 'center',
    textAlignVertical: 'center',
    fontSize: 16,
    marginTop: 320,
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#303F9F',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  captureButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    backgroundColor: '#1919',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
  },
  backButton: {
    position: 'absolute',
    top: 30,
    left: 20,
    backgroundColor: '#1919',
    borderRadius: 20,
    padding: 10,
    elevation: 5,
  },
  toggleButton: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'flex-end',
    backgroundColor: '#1919',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
    right: 10,
  },
  markerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    resizeMode: 'cover',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
});

export default App;