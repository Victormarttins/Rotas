import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Text,
  Alert,
  Keyboard,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as MediaLibrary from 'expo-media-library';
import { MaterialIcons } from '@expo/vector-icons';
import * as Animatable from 'react-native-animatable';
import { onValue, push, ref } from 'firebase/database';
import { app, db } from '../../firebase-config';
import * as firebaseStorage from '@firebase/storage'
import { Camera } from 'expo-camera';


export default function HomePage ({ navigation, route })  {
  const { capturedImage } = route.params;
  const [markers, setMarkers] = useState<PlaceEntity[]>([]);
  const [currentLocation, setCurrentLocation] = useState<any>(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [markerImageUri, setMarkerImageUri] = useState<string | null>(null);
  const [markerDescription, setMarkerDescription] = useState('');
  const [isEditing, setEditing] = useState(false);
  const [photoDate, setPhotoDate] = useState<string>('');
  const [markerTitle, setMarkerTitle] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  

  useEffect(() => {
    getLocationPermission();
    getCameraPermission();
    getMediaLibraryPermission();

  }, []);

  const getCameraPermission = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de câmera não concedida');
    }
  };

  const getMediaLibraryPermission = async () => {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de biblioteca de mídia não concedida');
    }
  };

  const getLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão de localização não concedida');
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = async () => {
    const { coords } = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = coords;
    setCurrentLocation({ latitude, longitude });
  };

  const handleAddMarker = async () => {
    if (currentLocation && capturedImage) {
      const currentDate = new Date();
     


      const newMarker: PlaceEntity = {
        id: '',
        coords: { latitude: currentLocation.latitude, longitude: currentLocation.longitude },
        imagePath: await uploadImage(capturedImage),
        description: '',
        photoDate: '',
        title: ''
      };
      setMarkers([...markers, newMarker]);
      push(ref(db, 'places'), newMarker);
    }
  };

  

  const saveToGallery = async (photoUri: string) => {
    try {
      await MediaLibrary.saveToLibraryAsync(photoUri);
    } catch (error) {
      Alert.alert('Erro ao salvar imagem na galeria:', error);
    }
  };

  const handleMarkerPress = (marker: PlaceEntity) => {
    setMarkerImageUri(marker.imagePath);
    setMarkerTitle(marker.title);
    setMarkerDescription(marker.description);
    setPhotoDate(marker.photoDate);
    setModalVisible(true);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSaveMarker = () => {
    const updatedMarkers = markers.map((marker) => {
      if (marker.imagePath === markerImageUri) {
        return {
          ...marker,
          title: markerTitle,
          description: markerDescription,
        };
      }
      return marker;
    });

    setMarkers(updatedMarkers);
    setModalVisible(false);
    dismissKeyboard();
  };

  const handleDeleteMarker = (imageUri: string | null) => {
    const updatedMarkers = markers.filter((marker) => marker.imagePath !== imageUri);
    setMarkers(updatedMarkers);
    setModalVisible(false);
    dismissKeyboard();
  };

  const handleAddMarkerAndSaveToGallery = async () => {
    if (currentLocation && capturedImage) {
      await saveToGallery(capturedImage);
      handleAddMarker();
    }
  };

  async function getPlaces() {
    return onValue(ref(db, '/places'), (snapshot) => {
      try {
        setMarkers([]);
        if (snapshot !== undefined) {
          snapshot.forEach((childSnapshot) => {

            const childkey = childSnapshot.key;
            let childValue = childSnapshot.val();
            childValue.id = childkey;
            setMarkers((places) => [...places, (childValue as PlaceEntity)])
          });
        }
      } catch (e) {
        console.log(e);
      }

    });
  }

  useEffect(() => {

    getPlaces()
    handleAddMarkerAndSaveToGallery();
  }, [currentLocation, capturedImage]);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  async function uploadImage(imageUrl): Promise<string> {
    setIsUploading(true);
    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storage = firebaseStorage.getStorage(app);
    const storageRef = firebaseStorage.ref(
      storage,
      'images/' + imageUrl.replace(/^.*[\\\/]/, '')
    );

    await firebaseStorage.uploadBytes(storageRef, blob);

    const uploadedImageUrl = await firebaseStorage.getDownloadURL(storageRef);
    console.log(uploadedImageUrl);
    setIsUploading(false);
    return uploadedImageUrl;
    

  }

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <View style={styles.container}>
      {isUploading ?
        <View style={{ width: '100%', height: '100%', backgroundColor: 'black', opacity: 0.8, justifyContent: 'center', alignItems: 'center' }}>
          <Image style={{ width: 100, height: 80 }} source={{ uri: 'https://i.gifer.com/ZWdx.gif' }} />
          <Text style={{ color: 'white' }}>Aguarde...</Text>
        </View> : <></>
      }

        {currentLocation ? (
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            showsUserLocation={true}
          >
            {markers.map((marker, index) => (
              <Marker
                key={index.toString()}
                coordinate={marker.coords}
                onPress={() => handleMarkerPress(marker)}
              >
                <View style={styles.markerContainer}>
                  <Image source={{ uri: marker.imagePath }} style={styles.markerImage} />
                </View>
              </Marker>
            ))}
          </MapView>
        ) : (
          <Text style={styles.loadingText}>Carregando mapa...</Text>
        )}

        <TouchableOpacity style={styles.cameraButton} onPress={() => navigation.navigate('CameraPage')}>
          <MaterialIcons name="camera" size={30} color="#FFFFFF" />
        </TouchableOpacity>

        <Modal visible={isModalVisible} animationType="slide" transparent={true}>
          <TouchableWithoutFeedback onPress={dismissKeyboard}>
          
              <Animatable.View
                style={styles.modalContent}
                animation="fadeInUp"
                duration={500}
                useNativeDriver
              >
                <View style={styles.modalHeader}>
                  <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
                    <MaterialIcons name="close" size={24} color="black" />
                  </TouchableOpacity>
                </View>
                {markerImageUri && (
                  <Image source={{ uri: markerImageUri }} style={styles.modalImage} />
                )}
                <Text style={styles.dateStyle}>{photoDate}</Text>


                {isEditing ? (
                  <>
                    <TextInput
                      style={styles.input}
                      placeholder="Título"
                      value={markerTitle}
                      onChangeText={setMarkerTitle}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Descrição"
                      value={markerDescription}
                      onChangeText={setMarkerDescription}
                      multiline={true}
                      onBlur={dismissKeyboard}
                    />
                  </>
                ) : (
                  <>
                    <Text style={styles.modalTitle}>{markerTitle}</Text>
                    <Text style={styles.modalDescription}>{markerDescription}</Text>
                  </>
                )}
                <View style={styles.modalButtonContainer}>
                  {!isEditing && (
                    <Animatable.View animation="fadeIn" duration={500} delay={200}>
                      <TouchableOpacity
                        style={[styles.editButton, { backgroundColor: '#1976D2' }]}
                        onPress={handleEdit}
                      >
                        <Text style={styles.buttonText}>Editar</Text>
                      </TouchableOpacity>
                    </Animatable.View>
                  )}
                  <Animatable.View animation="fadeIn" duration={500} delay={200}>
                    <TouchableOpacity
                      style={[styles.saveButton, { backgroundColor: '#303F9F' }]}
                      onPress={handleSaveMarker}
                    >
                      <Text style={styles.buttonText}>Salvar</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                  <Animatable.View animation="fadeIn" duration={500} delay={300}>
                    <TouchableOpacity
                      style={[styles.deleteButton, { backgroundColor: '#FF0000' }]}
                      onPress={() => handleDeleteMarker(markerImageUri as string)}
                    >
                      <Text style={styles.buttonText}>Deletar</Text>
                    </TouchableOpacity>
                  </Animatable.View>
                </View>
              </Animatable.View>
            
          </TouchableWithoutFeedback>
        </Modal>
      </View>
    </TouchableWithoutFeedback>
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
  cameraButton: {
    position: 'absolute',
    bottom: 40,
    right: 30,
    backgroundColor: '#303F9F',
    borderRadius: 40,
    padding: 15,
    elevation: 5,
  },
  markerContainer: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 3,
    borderColor: '#FFFFFF',
    overflow: 'hidden',
    elevation: 5,
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
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    width: '80%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  closeButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 5,
    elevation: 5,
  },
  modalImage: {
    width: 250,
    height: 250,
    borderRadius: 10,
    marginBottom: 10,
    alignSelf: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 16,
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 0.5, height: 0.5 },
    textShadowRadius: 1,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  modalButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  editButton: {
    backgroundColor: '#303F9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#303F9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  deleteButton: {
    backgroundColor: '#303F9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
  },
  dateStyle: {
    fontSize: 12,
    fontStyle: 'italic',
    color: 'rgba(0, 0, 0, 0.7)',
    alignSelf: 'flex-end',
    marginBottom: 8,
    marginRight: 5

  },

});

