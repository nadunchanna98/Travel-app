import React, { useState, useContext, useEffect } from 'react';
import { View, ImageBackground, TouchableOpacity } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { AuthContext } from '../../components/AuthContext';
import axios from 'axios';

const Chatbot = ({ navigation }) => {
  const [messages, setMessages] = useState([]);
  const { userInfo, BASE_URL } = useContext(AuthContext);


  useEffect(() => {
    // Add initial welcome message when component mounts
    setMessages([
      {
        _id: 1,
        text: "I'm a travel bot. How can I help you? Tell me about your travel plans.",
        createdAt: new Date(),
        user: { _id: 2, name: 'Chatbot' },
      },
    ]);
  }, []);


  const sentToBackEnd = async (userInput) => {
    try {
      const response = await axios.post(`${BASE_URL}chatbot`, {
        message: userInput,
        // userId: userInfo._id
      });

      const message = response.data;
      return message;

    } catch (error) {
      console.error('Error calling backend:', error);
      throw error; // Re-throw the error to be caught in the calling function
    }
  };

  const onSend = async (newMessages = []) => {
    const userMessage = newMessages[0].text;

    // Add the user's message to the chat
    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    // Simulate the chatbot's response based on user input
    try {
      const botResponse = await getBotResponse(userMessage);

      // Add the chatbot's response to the chat
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, [
          {
            _id: prevMessages.length + 1,
            text: botResponse,
            createdAt: new Date(),
            user: { _id: 2, name: 'Chatbot' },
          },
        ])
      );
    } catch (error) {
      console.error('Error getting bot response:', error);
    }
  };

  const getBotResponse = async (userInput) => {
    const isGreeting = /^(Hello|hello|hii|hiii|helloo|hi|hi|hey|good (morning|afternoon|evening)|hi there|howdy|greetings|salutations|yo|what's up|hiya|sup|hello there|bonjour|g'day|aloha|namaste|welcome|travel safe)$/i.test(userInput);
    const isGoodbye = /^(bye|goodbye|farewell|see you|see ya|adios|later)$/i.test(userInput);
    const isThankYou = /^(thank you|thanks|thanks a lot|thank you very much|appreciate it)$/i.test(userInput);

    if (isGreeting) {
      return 'Hello! We are here to guide you in planning your trip to Sri Lanka. Please tell us about your plans.';
    } else if (isGoodbye) {
      return 'Goodbye! If you have more questions in the future, feel free to ask.';
    } else if (isThankYou) {
      return 'You\'re welcome! If you need any further assistance, feel free to ask.';
    } else {
      try {
        const response = await sentToBackEnd(userInput);

        // Check if the response is defined and has elements
        if (response && response.length > 0) {
          return response;
        } else {
          console.error('Empty or undefined response from the backend');
          return 'An error occurred while processing your request.';
        }
      } catch (error) {
        console.error('Error calling backend:', error);
        return 'An error occurred while processing your request.';
      }
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground source={require('./sea.jpg')} style={{ flex: 1 }}>
        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1, // User's ID
          }}
        />
      </ImageBackground>

      <TouchableOpacity
        style={{
          position: 'absolute',
          top: 20,
          left: 20,
          backgroundColor: 'transparent',
          borderRadius: 20,
          padding: 10,
        }}
        onPress={() => navigation.goBack()}
      >
        <Icon name="arrow-left" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default Chatbot;
