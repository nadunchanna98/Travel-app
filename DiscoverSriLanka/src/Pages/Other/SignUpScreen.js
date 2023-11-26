import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ImageBackground, ScrollView } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
import BASE_URL from '../../components/BaseURL';
import moment from 'moment';
const primaryColor = '#fff';

const validationSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email').required('Email is required')
        .test(
            'Unique email',
            'Email address already in use',
            async (value) => {
                try {
                    const response = await axios.post(`${BASE_URL}users/user/checkemail`, {
                        email: value,
                    });
                    return response.data.message === 'email is available';
                } catch (error) {
                    console.log(`Error checking Email address: ${error}`);
                    return false;
                }
            }
        ),
    language: yup.string().required('Language is required'),
    number: yup.string().required('Number is required'),
    password: yup.string().required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password'), null], 'Passwords must match')
        .required('Confirm Password is required'),
});

const SignUpScreen = () => {

    const navigation = useNavigation();
    var date = ''
    const handleDateInputChange = (day, month, year) => {
        const dateString = `${year}-${month}-${day}`;
        date = moment(dateString, 'YYYY-MM-DD').toDate();
    };

    const handleSignUp = (values) => {
        const { name, email, password, language,number } = values;

        const requestData = {
            name,
            email,
            password,
            dob: date,
            language,
            number
        };

        axios
            .post(`${BASE_URL}users/user/register`, requestData)
            .then((response) => {
                console.log(response.data);
                alert('User registered successfully!');
                navigation.navigate('Login');
            })
            .catch((error) => {
                console.log(error);
                alert('User registration failed!');
            });
    };

    return (
        <ImageBackground
            source={require('./ambekke.jpg')}
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
            <ScrollView >
                <View style={
                    {
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'rgba(0,0,0,0.7)',
                        height: height ,
           
                    }
                }>
                    <Text style={styles.title}>Sign Up Form</Text>

                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            language: '',
                            number: '',
                            password: '',
                            confirmPassword: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSignUp}
                    >
                        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                            <View>
                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={[styles.input, styles.disabledInput]}
                                        placeholder="Name *"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                    />
                                    {touched.name && errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Email *"
                                        keyboardType="email-address"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        autoCapitalize="none"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                    />
                                    {touched.email && errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
                                </View>

                                <View style={styles.inputContainerDate}>

                                    <TextInput
                                        style={styles.inputDate}
                                        placeholder="Birth Day"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        onChangeText={(text) => handleDateInputChange(text, values.month, values.year)}
                                        onBlur={handleBlur('day')}
        
                                        value={values.day}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />

                                    <TextInput
                                        style={styles.inputDate}
                                        placeholder="Month"
                                        onChangeText={(text) => handleDateInputChange(values.day, text, values.year)}
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        onBlur={handleBlur('month')}
                                        value={values.month}
                                        keyboardType="numeric"
                                        maxLength={2}
                                    />

                                    <TextInput
                                        style={styles.inputDate}
                                        placeholder="Year"
                                        onChangeText={(text) => handleDateInputChange(values.day, values.month, text)}
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        onBlur={handleBlur('year')}
                                        value={values.year}
                                        keyboardType="numeric"
                                        maxLength={4}
                                    />

                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Language *"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        onChangeText={handleChange('language')}
                                        onBlur={handleBlur('language')}
                                        value={values.language}
                                    />
                                    {touched.language && errors.language && <Text style={styles.errorText}>{errors.language}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Mobile Number *"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        onChangeText={handleChange('number')}
                                        onBlur={handleBlur('number')}
                                        value={values.number}
                                        keyboardType="numeric"
                                    />
                                    {touched.number && errors.number && <Text style={styles.errorText}>{errors.number}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Password *"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        secureTextEntry
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                        value={values.password}
                                    />
                                    {touched.password && errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
                                </View>

                                <View style={styles.inputContainer}>
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Confirm Password *"
                                        placeholderTextColor={'rgba(255,255,255,0.7)'}
                                        secureTextEntry
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                        value={values.confirmPassword}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                                    )}
                                </View>

                                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                    <Text style={styles.buttonText}>Sign Up</Text>
                                </TouchableOpacity>
                            </View>
                        )}
                    </Formik>
                    <View style={styles.footer}>
                        <Text style={styles.footerText}>Already have an account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                            <Text style={styles.footerLink}>Login</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
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
        height: height * 0.3,
    },
    lowerSection: {
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.1,
    },
    logo: {
        width: width * 0.3,
        height: width * 0.3,
        marginBottom: height * 0.15,

    },
    title: {
        fontSize: height * 0.035,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: primaryColor,
        marginTop: height * 0.1,
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
        forntWeight: 'bold',
    },

    inputDate: {
        height: height * 0.04,
        borderBottomWidth: 1,
        borderBottomColor: 'gray',
        fontSize: height * 0.02,
        width: width * 0.2,
        marginRight: width * 0.02,
        marginLeft: width * 0.02,
        color: '#fff',
    },
    errorText: {
        color: 'red',
        fontSize: height * 0.015,
        marginTop: height * 0.005,
    },
    button: {
        backgroundColor: primaryColor,
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

    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: height * 0.02,
        marginBottom: height * 0.05,
    },
    footerText: {
        fontSize: height * 0.02,
        marginRight: width * 0.02,
        color: "#fff",
    },
    footerLink: {
        fontSize: height * 0.02,
        color: "#fff",
        textDecorationLine: 'underline',
    },

    inputContainerDate: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: height * 0.02,
        marginLeft: width * 0.02,
        marginRight: width * 0.02,
    },


});

export default SignUpScreen;
