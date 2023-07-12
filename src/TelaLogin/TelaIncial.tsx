import React, { useState, useEffect } from 'react';
import
  { View,Text,TextInput,
    TouchableOpacity,
 StyleSheet,
 TouchableHighlight,
   
  } from 'react-native';
  import { Image } from 'expo-image';


export default function Login({navigation}) {
 

  return (
    
     <View> 
        <Image
          style={styles.img}
          source={{uri:"https://img.freepik.com/vetores-premium/pino-de-simbolo-de-mapa-desenho-de-icone-de-vetor-de-itinerario-de-cartografia-conceito-de-entrega_575709-358.jpg"}}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            keyboardType="email-address"
            textContentType="emailAddress"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            onChangeText={() => {}}
          />

          <TextInput
            style={styles.input}
            placeholder="Senha"
            textContentType="password"
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect={false}
            secureTextEntry={true}
            onChangeText={() => {}}
          />

          <TouchableHighlight style={styles.buttonSubmit}
          onPress={() => navigation.navigate('HomePage')}
          >
            <Text style={styles.submitText}>Acessar</Text>
          </TouchableHighlight>

         
         

         
        
    </View>
    
  );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#191919'
      },
    
      containerLogo: {
        flex: 1,
        justifyContent: 'center'
      },

    
      form: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '90%',
        paddingBottom: 25
      },
    
      input: {
        backgroundColor: '#FFF',
        width: '90%',
        marginBottom: 15,
        color: '#222',
        fontSize: 22,
        borderRadius: 7,
        padding: 10,
        marginHorizontal:20
      },
    
      buttonSubmit: {
        backgroundColor: '#59BFFF',
        width: '40%',
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        marginHorizontal:120
      },
    
      submitText: {
        color: '#FFF',
        fontSize: 19
      },
    
      buttonRegister: {
        marginTop: 10
      },
    
      img:{
        width:'60%',
        height:'30%',
        marginHorizontal:80,
        borderRadius:30,
        margin:60


      }
    });
