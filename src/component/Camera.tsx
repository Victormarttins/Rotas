import React, { useEffect, useState } from "react";
import { View, StyleSheet, TouchableHighlight, TouchableOpacity
 } from "react-native";
 import { Image } from "react-native";
import { Camera, CameraType } from "expo-camera";
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { getDownloadURL,getStorage, uploadBytes,ref } from "@firebase/storage";
import { app } from "../../firebase-config";
import *as firebaseStorage from '@firebase/storage';

export default function CameraPage({ navigation }:any) {
  const [image, setImage] = useState(null);
  const [camera, setCamera] = useState(null);
  const [Permission, setPermission] = useState(null);
  const [cameraType, setCameraType] = useState(CameraType.back);
  const[isUploading,setIsuploading]=useState(true)
  const [isCameraVisible, setCameraVisible] = useState(false);
   async function UploadImage(imageUrl):Promise<string>{
    setIsuploading(true);

    const response = await fetch(imageUrl);
    const blob = await response.blob();

    const storage = getStorage(app);
    const storageRef = ref(
      storage,
      'images/'+ imageUrl.replace(/^*.[\\\\/]/,'')

    );

    


    const uploadedImageUrl = await getDownloadURL (storageRef);
    console.log(uploadedImageUrl);
    setIsuploading(false);
    return uploadedImageUrl ;   
   } 

  useEffect(() => {
    (async () => {
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setPermission(cameraStatus.status === "granted");
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      const { uri } = await camera.takePictureAsync();
      console.log(uri);
      setImage(uri);
     
      navigation.goBack();
    }
    
    

  }

  function toggleCameraType() {
    setCameraType((prevType) =>
      prevType === CameraType.back ? CameraType.front : CameraType.back
    );
  }
  const handleOpenCamera = async () => {
    const { status } = await Camera.requestCameraPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permissão da câmera não concedida');
    } else {
      setCameraVisible(true);
    }
  };
  const handleCaptureImage = async () => {
    if (camera.current) {
      const photo = await camera.current.takePictureAsync();
     
    };
  
     

  return (
    <View style={styles.container}>
      <Camera
        ref={(l) => setCamera(l)}
        style={styles.styleCamera}
        type={cameraType}
        ratio={"1:1"}
      />
       {!isCameraVisible && (
        <TouchableOpacity style={styles.buttonContainer} onPress={handleOpenCamera}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="camera" size={30} color="#FFFFFF" />
          </View>
        </TouchableOpacity>
      )}

      {isCameraVisible && (
        <Camera
          ref={camera}
          style={StyleSheet.absoluteFillObject}
          type={cameraType}
          onCameraReady={() => console.log('Câmera pronta')}
          onMountError={(error) => console.log('Erro ao montar a câmera:', error)}
        >
          <TouchableOpacity style={styles.captureButton} onPress={handleCaptureImage}>
            <MaterialIcons name="camera-alt" size={34} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.toggleButton} onPress={toggleCameraType}>
            <AntDesign name="retweet" size={24} color="black" />
          </TouchableOpacity>

        </Camera>
      )}

       isUploading?
       <View style={{
        width:'100%',
        height:'100%',
        backgroundColor:'black',
          opacity:0.8,
          justifyContent:'center',
          alignItems:'center'
       }}>
      
        <Image style={{width:'100%',height:'80%'}} 
        source={{uri:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQryeRHG9TqOiKY2n092Fcg557MhFajQYdc3A&usqp=CAU'}}
        />
      
        
        </View> 




      <View style={styles.buttonContainer}>

        <TouchableHighlight
          style={styles.button}
          onPress={() => toggleCameraType()}
        >
          <AntDesign name="retweet" size={24} color="black" />
        </TouchableHighlight>
      </View>
    </View>
  );
}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleCamera: {
    aspectRatio: 1,
    flex: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 16,
    left: 0,
    right: 0,
  },
  button: {
    justifyContent: "center",
    backgroundColor: "#1919",
    elevation: 5,
    alignItems: "center",
    height: 50,
    width: 50,
    borderRadius: 100,
    marginHorizontal: 8,
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
});


