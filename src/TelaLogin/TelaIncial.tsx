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

export default function Login({ navigation,route }) {
  const [x, setX] = useState(0);
  const slide = new Animated.Value(-200);
  

  useEffect(() => {
    Animated.timing(slide, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start(); 

   
  }, []);

  return (

    <View style={styles.container}>
      <Animated.View style={[styles.animaçao, { transform: [{ translateX: slide }] }]}>
      <Image style={styles.img} source={{uri:"https://www.totvs.com/wp-content/uploads/2022/05/gerenciador-de-rotas.jpg"}} />
      </Animated.View>
        <TextInput
          style={styles.input}
          placeholder="Email"
          keyboardType="email-address"
          textContentType="emailAddress"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect={false}
          onChangeText={() => { }}
        />
      
        <TextInput
          style={styles.input}
          placeholder="Senha"
          textContentType="password"
          autoCapitalize="none"
          autoComplete="password"
          autoCorrect={false}
          secureTextEntry={true}
          onChangeText={() => { }}
        />
      

      
        <TouchableHighlight style={styles.buttonSubmit}
          onPress={() => navigation.navigate('HomePage')}>
          <Text style={styles.submitText}>Acessar</Text>
        </TouchableHighlight>
      

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    fontSize: 19
  },

  img: {
    width: '100%',
    height:'100%',
    borderRadius:40,
    marginHorizontal:3
  },
  animaçao:{
    width: '90%',
    height:300,
    borderRadius:30,
  
    paddingBottom:40
  }
})

 