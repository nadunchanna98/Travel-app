import React, { useState, useContext, useEffect } from 'react';
import { View, ImageBackground, ActivityIndicator, Text, Dimensions } from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import { AuthContext } from '../../components/AuthContext';
import axios from 'axios';

const Chatbot = ({ navigation }) => {


  const { userInfo, BASE_URL } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {

    setMessages([
      {
        _id: 1,
        text: `${userInfo.name} I'm a travel bot. How can I help you? Tell me about your travel plans.`,
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
      throw error; 
    }
  };

  const onSend = async (newMessages = []) => {
    const userMessage = newMessages[0].text;

    setMessages((prevMessages) => GiftedChat.append(prevMessages, newMessages));

    setIsTyping(true);

    try {
      const botResponse = await getBotResponse(userMessage);
      
      setIsTyping(false);

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
      setIsTyping(false);
    }
  };

  const getBotResponse = async (userInput) => {
    const isGreeting = /^(Hello|hello|hii|hiii|helloo|hi|hi|hey|good (morning|afternoon|evening)|hi there|howdy|greetings|salutations|yo|what's up|hiya|sup|hello there|bonjour|g'day|aloha|namaste|welcome|travel safe)$/i.test(userInput);
    const isGoodbye = /^(bye|goodbye|farewell|see you|see ya|adios|later)$/i.test(userInput);
    const isThankYou = /^(thank you|thanks|thanks a lot|thank you very much|appreciate it)$/i.test(userInput);

    if (isGreeting) {
      return `Hello! ${userInfo.name} We are here to guide you in planning your trip to Sri Lanka. Please tell us about your plans. `;
    } else if (isGoodbye) {
      return 'Goodbye! If you have more questions in the future, feel free to ask.';
    } else if (isThankYou) {
      return 'You\'re welcome! If you need any further assistance, feel free to ask.';
    } else {
      try {
        const response = await sentToBackEnd(userInput);

        // Check if the response is defined and has elements
        if (response && response.length > 0) {

            if (response === "I don't know.")
            {
              return "Sorry, Upto now I don't know about that. But I'm still learning. Please ask me any travel related questions about Kandy, Jaffna, Galle and Trinco. I can guide you.";
            }
            else{
              return response;
            }
          
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
        {isTyping && (
          <View style={{ 
            flexDirection: 'row',
             alignItems: 'center',
             justifyContent : 'center',
            //  position: 'absolute',
             marginLeft: Dimensions.get('window').width * 0.05,
             marginTop: Dimensions.get('window').height * 0.1,
             }}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={{ 
              marginLeft: 10, 
              fontSize: 16,
              color: '#fff',
              fontWeight: 'bold',
              

             }}>Chatbot is typing...</Text>
          </View>
        )}

        <GiftedChat
          messages={messages}
          onSend={(newMessages) => onSend(newMessages)}
          user={{
            _id: 1, 
          }}
        />
      </ImageBackground>

    </View>
  );
};

export default Chatbot;
