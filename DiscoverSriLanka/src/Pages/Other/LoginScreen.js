import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../components/AuthContext';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const primaryColor = '#0d294f';

const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const { login, primaryColor, isLoading } = useContext(AuthContext);


  const handleFormSubmit = async (values) => {

    await login(values.email, values.password);

  };

  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  const handleSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (

    <ImageBackground
      source={require('./sigiriya.jpg')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        opacity: 0.8,

      }}
    >

      <View style={
        {
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'rgba(0,0,0,0.6)',
        }

      }>
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={primaryColor} />
          </View>
        ) : (
          <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={handleFormSubmit}
            validationSchema={validationSchema}
          >
            {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
              <View style={styles.lowerSection}>
                <View style={styles.upperSection}>
                  {/* <Image source={require('../../../assets/icon.png')} style={styles.logo} /> */}
                  <Text style={styles.upprtitle}>WELCOME</Text>
                  <Text style={
                    {
                      fontSize: height * 0.02,
                      fontWeight: 'bold',
                      marginBottom: height * 0.03,
                      textAlign: 'center',
                      color: "#fff",
                    }

                  }>TRAVEL WITH PEACE OF MIND</Text>
                </View>

                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Enter your Email"
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  {errors.email && touched.email && (
                    <Text style={styles.errorText}>{errors.email}</Text>
                  )}
                </View>

                <View style={styles.inputContainer}>
                  <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor={'rgba(255,255,255,0.7)'}
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                  />
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}
                </View>

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Sign In</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.forgotPasswordButton} onPress={handleForgotPassword}>
                  <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
                </TouchableOpacity>

                <View style={styles.signUpTextContainer}>
                  <Text style={styles.signUpText}>Don't have an account yet?  </Text>
                  <TouchableOpacity onPress={handleSignUp}>
                    <Text style={styles.signUpLink}>Sign up</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        )}
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  upperSection: {
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.25,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },

  lowerSection: {
    flex: 1,
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.15,
  },
  upprtitle: {
    fontSize: height * 0.07,
    fontWeight: 'bold',
    textAlign: 'center',
    color: "#fff",
  },

  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
    color: "#fff",
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: '#fff',
    fontSize: height * 0.025,
    color: '#fff',
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: height * 0.02,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#000',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forgotPasswordButton: {
    alignItems: 'center',
    marginBottom: height * 0.03,
    marginTop: height * 0.01,
    paddingLeft: width * 0.6,
  },
  forgotPasswordText: {
    color: '#fff',
    fontSize: height * 0.018,
    textDecorationLine: 'underline',
  },
  signUpTextContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: height * 0.06,
  },
  signUpText: {
    color: '#fff',
    fontSize: height * 0.018,
  },
  signUpLink: {
    textDecorationLine: 'underline',
    color: '#fff',
    fontSize: height * 0.018,
  },
  errorText: {
    color: 'red',
    fontSize: height * 0.018,
  },


});

export default LoginScreen;
