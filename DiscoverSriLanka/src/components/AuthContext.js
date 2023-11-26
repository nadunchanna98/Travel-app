import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { Alert } from 'react-native';
import BASE_URL from './BaseURL';


export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [data, setData] = useState([]);
  const [userRole, setUserRole] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userToken, setUserToken] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const primaryColor = '#0ac4af';

  


  const getUserInfo = async (id) => {

   if ( id !== undefined && id !== null && id !== '' && id !== 0){

    axios.get(`${BASE_URL}users/user/${id}`)
      .then((res) => {
        setUserInfo(res.data.data);
      })
      .catch((err) => {
        console.log(`get users error : ${err}`);
      });

  }}

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        {
          text: "Cancel",
          style: "cancel"
        }
        ,
        {
          text: "OK", onPress: () => {
            logout();
          }
        }
      ]
    );
  }



  const login = (email, password) => {

    let values = {
      email: email,
      password: password
    };

    setIsLoading(true);

    axios.post(`${BASE_URL}users/login`, values)
      .then((res) => {

        let userInfo = res.data.user;
        setUserInfo(userInfo);
        setUserToken(res.data.token);
        console.log(userInfo.role);
        setUserRole(userInfo.role);


        AsyncStorage.setItem('userInfo', JSON.stringify(userInfo));
        AsyncStorage.setItem('userToken', res.data.token);

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(`login error : ${err}`);
        Alert.alert(
          "Login Failed",
          "Email or Password is incorrect. Please try again.",
          [
            {
              text: "Cancel",
              onPress: () => console.log("Cancel Pressed"),
              style: "cancel"


            }
          ]
        );


        setIsLoading(false);
      });


    AsyncStorage.setItem('userToken', 'fgkj');
  };

  const logout = () => {

    setIsLoading(true);
    setUserToken(null);
    AsyncStorage.removeItem('userInfo');
    AsyncStorage.removeItem('userToken');
    setIsLoading(false);
  };

  const isLoggedIn = async () => {

    try {

      setIsLoading(true);
      let userInfo = await AsyncStorage.getItem('userInfo');
      let userToken = await AsyncStorage.getItem('userToken');
      userInfo = JSON.parse(userInfo);

      if (userInfo) {
        setUserToken(userToken);
        setUserInfo(userInfo);
      }
      setIsLoading(false);
    }
    catch (e) {
      console.log(`isLogged in error: ${e}`);
    }

  };

  useEffect(() => {
    isLoggedIn();
  }, []);


  return (
    <AuthContext.Provider
      value={{

        data,
        setData,
        login,
        handleLogout,
        isLoading,
        setIsLoading,
        userToken,
        setUserToken,
        userInfo,
        getUserInfo,
        BASE_URL,
        primaryColor,
        isLoading,

      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
