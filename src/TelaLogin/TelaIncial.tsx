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
export default function Login({ navigation}) {

  const slide = new Animated.Value(-200);
  
  const [username, setUsername] = useState('');

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();

 checkLoggedIn();
  }, []);


   

const checkLoggedIn = async () => {
  try {
      const storedUsername = await SecureStore.getItemAsync("username");
      if (storedUsername) {
          navigation.navigate("HomePage");
      }
  } catch (error) {
      console.log("Erro ao verificar login:", error);
  }
};
const Login = async () => {
  try {
      await SecureStore.setItemAsync("username", username);
      console.log("Nome de usuário salvo com sucesso!");
  } catch (error) {
      console.log("Erro ao salvar o nome de usuário:", error);
  }

  navigation.navigate("HomePage")
};

  return (

    <View style={styles.container}>
      <Text style={{ fontSize: 45, justifyContent: 'center', right: 5, marginBottom: 25, fontWeight: '800' }}> Show The Way</Text>
      <Animated.View style={[styles.animaçao, { transform: [{ translateX: slide }] }]}>

        <Image style={styles.img} source={{ uri: "https://www.totvs.com/wp-content/uploads/2022/05/gerenciador-de-rotas.jpg" }} />
      </Animated.View>
    <TextInput

        style={styles.input}
        placeholder="Nome"
        value={username}
        onChangeText={setUsername}
    />


      <TouchableHighlight style={styles.buttonSubmit}
        onPress={Login}
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

