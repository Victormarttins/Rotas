import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

import { onValue, push, ref } from 'firebase/database';

import { db } from '../../firebase-config';
import { getStorageData } from '../sheared/secure-store-sercive';
import ChatEntity from '../entities/chat-Entity';


export default function ChatPage({ navigation, route }) {
  const [messages, setMessages] = useState<ChatEntity[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const flatListRef = useRef(null);
  const [author, setAuthor] = useState('');

  useEffect(() => {
    getAuthor();
    getMessages();
  }, []);

  async function getAuthor() {
    const storedAuthor = await getStorageData('author');
    setAuthor(storedAuthor);
  }

  async function getMessages() {
    onValue(ref(db, `/messages/${route.params.marker.id}`), (snapshot) => {
      try {
        setMessages([]);
        if (snapshot !== undefined) {
          snapshot.forEach((childSnapshot) => {

            const childkey = childSnapshot.key;
            let childValue = childSnapshot.val();
            childValue.id = childkey;
            setMessages((messages) => [...messages, (childValue as ChatEntity)])
          });
        }
      } catch (e) {
        console.log(e);
      }
    });
  }

  async function sendMessage() {
    if (inputMessage.trim() === '') {
      return;
    }

    const newMessage: ChatEntity = {
      id: Math.random().toString(),
      data: Date.now(),
      message: inputMessage,
      sender: author,
    };

    await push(ref(db, `messages/${route.params.marker.id}`), newMessage);
    setInputMessage('');
  }

  return (
   
      
      <View style={styles.container}>
                <Image style={{width:'50%',height:'50%' ,position:"absolute"}} source={{uri:" https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT1VOrzttGGG8v806Uhs8qc2I28ITbZM_QUlw&usqp=CAU"}}/>

      <View style={styles.container}>
        <View style={styles.chatContainer}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              
             
              <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', marginHorizontal: 3 }}>
                <View style={styles.ImageName}>
                  <Image
                    style={styles.authorImage}
                    source={{ uri: item.sender === author ? 'https://thinksport.com.au/wp-content/uploads/2020/01/avatar-.jpg' : 'https://st3.depositphotos.com/19428878/36416/v/450/depositphotos_364169666-stock-illustration-default-avatar-profile-icon-vector.jpg' }}
                  />
                  <Text style={styles.authorName}>{item.sender}</Text>
                </View>
                <View style={[styles.messageBubble, item.sender === author ? styles.userBubble : styles.otherBubble]}>
                  <View style={styles.messageContent}>
                    <Text style={styles.messageText}>{item.message}</Text>
                    <Text style={styles.timestamp}>{new Date(item.data).toLocaleTimeString()}</Text>
                  </View>
                </View>
              </View>
          
            )}
            contentContainerStyle={styles.messageList}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Digite sua mensagem..."
            value={inputMessage}
            onChangeText={setInputMessage}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>
        </View>
      </View>
      </View>
      
     
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  chatContainer: {
    flex: 1,
  },
  messageList: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingRight: 180,
    width: '100%',
  },
  messageBubble: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 16,
    width: '100%',
  },
  userBubble: {
    backgroundColor: 'white',
    alignItems: 'flex-end',
    marginVertical: 4,
    width: '100%',
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: '#EDEDED',
  },
  ImageName: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  authorImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 10

  },
  authorName: {
    fontSize: 14,
    color: 'black',
    marginTop: 3
  },
  messageContent: {
    flex: 1,
    alignItems: 'flex-start',
    marginLeft: 5,
  },
  messageText: {
    color: 'black',
  },
  timestamp: {
    fontSize: 12,
    color: 'black',
    alignSelf: 'flex-end',
    marginTop: 2,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#EDEDED',
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: '#EDEDED',
    borderRadius: 20,
    paddingHorizontal: 15,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#303F9F',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  buttonText: {
    color: 'white',
  },
});
