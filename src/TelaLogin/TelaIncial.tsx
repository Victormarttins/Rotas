import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput,
  TouchableOpacity,
  StyleSheet,
  TouchableHighlight,
  Image,
  Button,
} from 'react-native';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
  
} from 'react-native-reanimated';

export default function Login({ navigation }) {
  const randomWidth = useSharedValue(10);

  const config = {
    duration: 500,
    easing: Easing.bezier(0.5, 0.01, 0, 1),
  };
  function deslizarParaOCentro{

  }

  const style = useAnimatedStyle(() => {
    return {
      width: withTiming(randomWidth.value, config  ),
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.img, style]} />
      <Button
        title="toggle"
        onPress={() => {
          randomWidth.value = Math.random() * 350;
        }}
      />
   
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
        onPress={() => navigation.navigate('HomePage')}
      >
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
    backgroundColor: '#191919'
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
    width: '40%',
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
    width: '60%',
    height:'30%'
  },
})
function delight(finished?: boolean, current?: AnimatableValue): void {
  throw new Error('Function not implemented.');
}

