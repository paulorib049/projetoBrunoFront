import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import * as Animatable from 'react-native-animatable';
import { useNavigation } from '@react-navigation/native';
import httpservice from '../../routes/http';

export default function AuthScreens() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const goToProductScreen = () => {
    navigation.navigate('ProductScreen');
  };

  const goToCreateAccount = () => {
    navigation.navigate('CreateAccount');
  };

  const login = async () => {
    try {
      const user = { email, password };
      const result = await httpservice.login(user);
      const data = await result.json();

      if (result.status === 200) {
        console.log('Mensagem de sucesso:', data.msg);
        navigation.navigate('ProductScreen');
      } else {
        console.error('Mensagem de erro:', data.msg);
        Alert.alert('Erro', `Erro ao realizar o login. Tente novamente. Erro: ${data.msg}`);
      }
    } catch (error) {
      console.error('Erro ao logar:', error);
      Alert.alert('Erro', 'Aconteceu um erro. Tente novamente mais tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Animatable.View animation="fadeInLeft" delay={500} style={styles.containerHeader}>
        <Text style={styles.headerText}>Bem-Vindo(a)</Text>
      </Animatable.View>
      <Animatable.View animation="fadeInUp" style={styles.containerForm}>
        <Text style={styles.title}>Email</Text>
        <TextInput
          placeholder="Digite seu email..."
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
        <TextInput
          placeholder="Sua senha"
          style={styles.input}
          secureTextEntry={true}
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <TouchableOpacity style={styles.button} onPress={login}>
          <Text style={styles.buttonText}>Acessar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonRegister} onPress={goToCreateAccount}>
          <Text style={styles.registerText}>Não possui uma conta? Cadastre-se</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EEE7',
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  headerText: {
    color: '#72AB86',
    fontSize: 24,
    fontWeight: 'bold',
  },
  containerForm: {
    backgroundColor: '#72AB86',
    borderRadius: 15,
    padding: 20,
    width: '80%',
  },
  title: {
    color: '#F4EEE7',
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#F4EEE7',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#F4EEE7',
    borderRadius: 25,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    fontSize: 18,
    color: '#72AB86',
    fontWeight: 'bold',
  },
  buttonRegister: {
    marginTop: 10,
    alignSelf: 'center',
  },
  registerText: {
    color: '#F4EEE7',
    textAlign: 'center',
  },
});
