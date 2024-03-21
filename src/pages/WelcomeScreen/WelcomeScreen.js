import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';

export default function WelcomeScreen() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerLogo}>
        <Animatable.Image
          animation="flipInY"
          source={require('../../../assets/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Animatable.View
        deLay={600}
        animation="fadeInUp"
        style={styles.containerForm}
      >
        <Text style={styles.title}>
          Bem-vindo à nossa loja de camisetas esportivas!
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('AuthScreens')}
        >
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EEE7',
  },
  containerLogo: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
  },
  containerForm: {
    flex: 1,
    backgroundColor: '#72AB86',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingHorizontal: '5%',
    paddingTop: 40,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#F4EEE7',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#F4EEE7',
    borderRadius: 25,
    paddingVertical: 12,
    width: '80%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
});
