import React, { useState, useContext, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { AuthContext } from '../../components/AuthContext';
import { useNavigation ,useRoute } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
const primaryColor = '#0ac4af';
const secondaryColor = '#0d294f';
import { Card, Text } from 'react-native-paper';
import axios from 'axios';

const validationSchema = yup.object().shape({
    note: yup.string().required('Note is required'),
});


const EditNote = () => {

    const navigation = useNavigation();
    const { userInfo, BASE_URL } = useContext(AuthContext);

    const note = useRoute().params.note;

    const handleFormSubmit = (values) => {

        const data = {
            note: values.note,
            user: userInfo._id,
            noteid: note._id
        }

        axios.put(`${BASE_URL}users/editnote`, data)
            .then(function (response) {
                console.log(response);
                navigation.navigate('IntakeNote')
            })
            .catch(function (error) {
                console.log(error);
            });
    };


    return (
        <View style={styles.container}>
            <Formik
                initialValues={{ note: note.content }}
                onSubmit={handleFormSubmit}
                validationSchema={validationSchema}
            >
                {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                    <View style={styles.lowerSection}>

                        <Text style={styles.title}>Change the Note</Text>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={[styles.input, styles.multilineInput]}
                                placeholder="Enter your Note"
                                onChangeText={handleChange('note')}
                                onBlur={handleBlur('note')}
                                value={values.note}
                                multiline={true}
                                numberOfLines={4}
                            />
                            {errors.note && touched.note && (
                                <Text style={styles.errorText}>{errors.note}</Text>
                            )}
                        </View>

                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={styles.buttonText}>Update your Note</Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },

    lowerSection: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: width * 0.05,
        paddingTop: height * 0.1,
        borderTopLeftRadius: width * 0.15,
        borderTopRightRadius: width * 0.15,

    },


    title: {
        fontSize: height * 0.03,
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
        backgroundColor: secondaryColor,
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

    signUpText: {
        color: 'black',
        fontSize: height * 0.018,
    },

    errorText: {
        color: 'red',
        fontSize: height * 0.018,
    },
    multilineInput: {
        height: null, // Remove fixed height
        textAlignVertical: 'top', // Allows text to start from the top of the input field
        paddingTop: height * 0.01,
    },


    buttonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },

});

export default EditNote;
