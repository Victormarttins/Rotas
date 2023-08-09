import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Image,
  Button,
  Animated,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { getStoredData, setStoredData } from '../sheared/secure-store-sercive';
export default function Login({ navigation}) {

  const slide = new Animated.Value(-200);
  
  const [author, setauthor] = useState('');

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();


    getAuthor();
 
  }, []);



  function login(){
    setStoredData('author',author)
    navigation.navigate('HomePage');

  }
  
  async function getAuthor(){
    const localAuthor = await getStoredData('author');
   console.log(localAuthor)
    if(localAuthor){
      navigation.navigate('HomePage')
    }
  }


   


  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 45, justifyContent: 'center', right: 5, marginBottom: 25, fontWeight: '800' }}> Show The Way</Text>
      <Animated.View style={[styles.animaçao, { transform: [{ translateX: slide }] }]}>

        <Image style={styles.img} source={{ uri: "https://www.totvs.com/wp-content/uploads/2022/05/gerenciador-de-rotas.jpg" }} />
      </Animated.View>
    <TextInput

        style={styles.input}
        placeholder="Nome"
        value={author}
        onChangeText={setauthor}
    />


      <TouchableHighlight style={styles.buttonSubmit}
        onPress={login}
        >
        <Text style={styles.submitText}>Login</Text>
      </TouchableHighlight>
    
  

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1919'
  },

  input: {
    backgroundColor: '#FFF',
    width: '90%',
    marginBottom: 15,
    color: '#222',
    fontSize: 22,
    borderRadius: 7,
    padding: 10,
    marginHorizontal: 20
  },

  buttonSubmit: {
    backgroundColor: '#59BFFF',
    width: '50%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    marginHorizontal: 120
  },

  submitText: {
    color: '#FFF',
    fontSize: 25,
    fontWeight: '800'
  },

  img: {
    width: '100%',
    height: '100%',
    borderRadius: 40,
    marginHorizontal: 3
  },
  animaçao: {
    width: '90%',
    height: 300,
    borderRadius: 30,

    paddingBottom: 40
  }
})

