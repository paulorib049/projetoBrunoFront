import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { Ionicons, Entypo } from '@expo/vector-icons';
import carrinhoIcon from '../../../assets/carrinhoicon.png';
import { useNavigation } from '@react-navigation/native';

const Chat = () => {
  const navigation = useNavigation();
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const addMessageToChat = (text, sender) => {
    const newMessage = { text, sender };
    setChat([...chat, newMessage]);
  };

  const sendMessage = () => {
    if (message.trim() !== '') {
      addMessageToChat(message, 'user');

      setTimeout(() => {
        addMessageToChat('Oi! Como posso ajudar?', 'bot');
      }, 1000);
    }
  };

  useEffect(() => {
    // Exemplo de boas-vindas inicial do bot
    setTimeout(() => {
      addMessageToChat('Olá! Bem-vindo ao chat.', 'bot');
    }, 500);
  }, []);

  const goToHomePage = () => {
    navigation.navigate('ProductScreen');
  };

  const goToCartPage = () => {
    navigation.navigate('Cart');
  };

  const goToUserPage = () => {
    navigation.navigate('User');
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.chatContainer}>
        {chat.map((item, index) => (
          <View
            key={index}
            style={[
              styles.message,
              item.sender === 'bot' ? styles.botMessage : styles.userMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.text}</Text>
          </View>
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite sua mensagem"
          value={message}
          onChangeText={(text) => setMessage(text)}
          onSubmitEditing={sendMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
          <Text style={styles.sendButtonText}>Enviar</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.navBar}>
        <TouchableOpacity style={styles.navBarButton} onPress={goToHomePage}>
          <Entypo name="home" size={30} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton} onPress={goToCartPage}>
          <Image source={carrinhoIcon} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navBarButton} onPress={goToUserPage}>
          <Ionicons name="man" size={30} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4EEE7',
  },
  chatContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  message: {
    maxWidth: '80%',
    marginVertical: 5,
    padding: 10,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  botMessage: {
    backgroundColor: '#2A9F85',
    alignSelf: 'flex-start',
  },
  userMessage: {
    backgroundColor: '#FFD700',
    alignSelf: 'flex-end',
  },
  messageText: {
    color: 'white',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#2A9F85',
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#2A9F85',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  sendButtonText: {
    color: '#F4EEE7',
    fontWeight: 'bold',
  },
  navBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A9F85',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  navBarButton: {
    padding: 10,
  },
  icon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    tintColor: '#F4EEE7',
  },
});

export default Chat;