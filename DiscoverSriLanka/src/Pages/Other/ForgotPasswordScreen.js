import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Dimensions ,ToastAndroid } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
const primaryColor = '#0d294f';
import { AuthContext } from '../../components/AuthContext';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');



// Validation schema using Yup
const validationSchema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
});

const ForgotPasswordScreen = ({ navigation }) => {

  const { BASE_URL } = useContext(AuthContext);

  const generateRandomCode = () => {
    const min = 1000;
    const max = 9999;
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };


  const handleSendCode = async (values) => {

    const code = generateRandomCode(); 
    console.log('code:', code);
    // const subject = 'Forgot Password';
    // const body = `Your forgot password code is: ${code}`;
    // const recipients = [values.email]; 
  
    // // Check if the device supports sending emails
    // const isAvailable = await MailComposer.isAvailableAsync();
  
    // if (isAvailable) {
    //   await MailComposer.composeAsync({
    //     recipients,
    //     subject,
    //     body,
    //     isHtml: false,
    //   });
    // } else {
    //   console.log('Email is not available on this device.');
    // }
    ToastAndroid.show("Check your email for verification code", ToastAndroid.SHORT);
    
  };

  return (
    <View style={styles.container}>
      <View style={styles.upperSection}>
        <></>
      </View>

      <View style={styles.lowerSection}>
        <Text style={styles.title}>Forgot Password</Text>

        <Formik
          initialValues={{ email: '' }}
          validationSchema={validationSchema}
          onSubmit={handleSendCode}
        >
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
            <View>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  placeholder="Email"
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
              </View>

              <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Send Code</Text>
              </TouchableOpacity>
            </View>
          )}
        </Formik>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primaryColor,
  },
  upperSection: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lowerSection: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.1,
    borderTopLeftRadius: width * 0.15,
    borderTopRightRadius: width * 0.15,
    marginTop: -height * 0.2,
  },
  logo: {
    width: width * 0.3,
    height: width * 0.3,
    marginBottom: height * 0.05,
  },
  title: {
    fontSize: height * 0.035,
    fontWeight: 'bold',
    marginBottom: height * 0.03,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: height * 0.02,
  },
  input: {
    height: height * 0.04,
    borderBottomWidth: 1,
    borderBottomColor: 'gray',
    fontSize: height * 0.02,
  },
  button: {
    backgroundColor: primaryColor,
    paddingVertical: height * 0.02,
    borderRadius: height * 0.02,
    marginBottom: height * 0.02,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: height * 0.02,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: height * 0.018,
  },
});

export default ForgotPasswordScreen;
