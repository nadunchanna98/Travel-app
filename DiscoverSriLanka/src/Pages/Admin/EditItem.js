import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, ScrollView, Image } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useNavigation, useRoute } from '@react-navigation/native';
const { width, height } = Dimensions.get('window');
import axios from 'axios';
import BASE_URL from '../../components/BaseURL';
const primaryColor = '#0ac4af';
const secondaryColor = '#0d294f';
import FileUpload from './FileUpload';
import Modal from "react-native-modal";
import { AuthContext } from '../../components/AuthContext';
import { SelectList } from 'react-native-dropdown-select-list'


const validationSchema = yup.object().shape({
    place: yup.string().required('Title is required')
        .test(
            'Unique ',
            'place already added',
            async (value) => {
                try {
                    const response = await axios.post(`${BASE_URL}places/place/checkplace`, {
                        title: value,
                    });
                    return response.data.message === 'title is available';
                } catch (error) {
                    console.log(`Error checking place : ${error}`);
                    return false;
                }
            }
        ),
    location: yup.string().required('Location is required'),
    description: yup.string().required('Description is required'),
    important: yup.string().required('Important is required'),
    // veryimportant: yup.string().required('Very important is required'),
    // recommondation: yup.string().required('Recommondation is required'),
});


const EditItem = () => {

    const card = useRoute().params.card;
    const { userInfo, } = useContext(AuthContext)
    const navigation = useNavigation();
    const [uploadedImageLink, setUploadedImageLink] = useState();
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedType, setSelectedType] = useState(card.district);

//  useEffect(() => {
//     setSelectedType(card.district);
//     }, [card.district])


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const handleAdd = (values) => {
        const { place, location, description, important, veryimportant, recommondation } = values;

        const requestData = {
            place,
            location,
            district: selectedType,
            description,
            image: uploadedImageLink ? uploadedImageLink : card.image,
            important,
            veryimportant,
            recommondation,
        };

        axios
            .put(`${BASE_URL}places/place/edit/${card._id}`, requestData)
            .then((response) => {
                alert('Changed successfully!');
                navigation.navigate('Dashboard');
            })
            .catch((error) => {
                console.log(error);
                alert('failed!');
            });
    };

    return (
        <ScrollView style={styles.container}>


            <View style={styles.lowerSection}>
                <Formik
                    initialValues={{
                        place: card.place,
                        location: card.location,
                        description: card.description,
                        important: card.important,
                        veryimportant: card.veryimportant,
                        recommondation: card.recommondation,
                    }}
                    validationSchema={validationSchema}
                    onSubmit={handleAdd}
                >
                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
                        <View>
                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Place Name *</Text>
                                <TextInput
                                    style={styles.input}
                                    placeholder="place"
                                    onChangeText={handleChange('place')}
                                    onBlur={handleBlur('place')}
                                    value={values.place}
                                />
                                {touched.place && errors.place && <Text style={styles.errorText}>{errors.place}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Description</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter the Description"
                                    onChangeText={handleChange('description')}
                                    onBlur={handleBlur('description')}
                                    value={values.description}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.description && errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Location</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter location..."
                                    onChangeText={handleChange('location')}
                                    onBlur={handleBlur('location')}
                                    value={values.location}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.location && errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>District</Text>
                                <SelectList
                                    setSelected={(val) => setSelectedType(val)}
                                    data={[
                                        { key: '1', value: 'Colombo' },
                                        { key: '2', value: 'Gampaha' },
                                        { key: '3', value: 'Kalutara' },
                                        { key: '4', value: 'Kandy' },
                                        { key: '5', value: 'Matale' },
                                        { key: '6', value: 'Nuwara Eliya' },
                                        { key: '7', value: 'Galle' },
                                        { key: '8', value: 'Matara' },
                                        { key: '9', value: 'Hambantota' },
                                        { key: '10', value: 'Jaffna' },
                                        { key: '11', value: 'Kilinochchi' },
                                        { key: '12', value: 'Mannar' },
                                        { key: '13', value: 'Vavuniya' },
                                        { key: '14', value: 'Mullaitivu' },
                                        { key: '15', value: 'Batticaloa' },
                                        { key: '16', value: 'Ampara' },
                                        { key: '17', value: 'Trincomalee' },
                                        { key: '18', value: 'Kurunegala' },
                                        { key: '19', value: 'Puttalam' },
                                        { key: '20', value: 'Anuradhapura' },
                                        { key: '21', value: 'Polonnaruwa' },
                                        { key: '22', value: 'Badulla' },
                                        { key: '23', value: 'Moneragala' },
                                        { key: '24', value: 'Ratnapura' },
                                        { key: '25', value: 'Kegalle' },
                                    ]}
                                    save="value"
                                    boxStyles={styles.selectList}
                                    search={true}
                                    maxHeight={Dimensions.get('window').height * 0.43}
                                    defaultOption={selectedType}
                                    dropdownTextStyles={{ fontSize: Dimensions.get('window').width * 0.04 }}
                                    inputStyles={{
                                        fontSize: Dimensions.get('window').width * 0.04,
                                    }}
                                    placeholder={selectedType}
                                />
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Important *</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Important ..."
                                    onChangeText={handleChange('important')}
                                    onBlur={handleBlur('important')}
                                    value={values.important}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.important && errors.important && <Text style={styles.errorText}>{errors.important}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Very Important *</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Very Important ..."
                                    onChangeText={handleChange('veryimportant')}
                                    onBlur={handleBlur('veryimportant')}
                                    value={values.veryimportant}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.veryimportant && errors.veryimportant && <Text style={styles.errorText}>{errors.veryimportant}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Important *</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Important ..."
                                    onChangeText={handleChange('important')}
                                    onBlur={handleBlur('important')}
                                    value={values.important}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.important && errors.important && <Text style={styles.errorText}>{errors.important}</Text>}
                            </View>

                            <View style={styles.inputContainer}>
                                <Text style={styles.label}>Recommondation</Text>
                                <TextInput
                                    style={[styles.input, styles.multilineInput]}
                                    placeholder="Enter Recommondation ..."
                                    onChangeText={handleChange('recommondation')}
                                    onBlur={handleBlur('recommondation')}
                                    value={values.recommondation}
                                    multiline={true}
                                    numberOfLines={4}
                                />
                                {touched.recommondation && errors.recommondation && <Text style={styles.errorText}>{errors.recommondation}</Text>}
                            </View>

                            <TouchableOpacity onPress={toggleModal}>
                                <Text style={styles.label}>Change Image</Text>
                                <View style={styles.imagecontainer}>
                                    {uploadedImageLink ? (
                                        <Image source={{ uri: uploadedImageLink }} style={styles.image} />
                                    ) : card.image ? (
                                        <Image source={{ uri: card.image }} style={styles.image} />
                                    ) : (
                                        <Image source={require('./img.jpg')}
                                            style={styles.image} />
                                    )
                                    }
                                </View>
                            </TouchableOpacity>

                            <View style={styles.FileUploadContainer}>

                                <Modal isVisible={isModalVisible}>
                                    <View style={styles.model}>
                                        <FileUpload onImageUpload={setUploadedImageLink} />


                                        <TouchableOpacity style={styles.button2} onPress={toggleModal}>
                                            <Text style={styles.buttonText}>Go back</Text>
                                        </TouchableOpacity>

                                    </View>
                                </Modal>

                            </View>

                            <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                                <Text style={styles.buttonText}>Save Disease</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                </Formik>

            </View>
        </ScrollView>
    );
};

export default EditItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    lowerSection: {
        backgroundColor: '#ffffff',
        paddingHorizontal: width * 0.05,
        paddingVertical: height * 0.05,
    },
    title: {
        fontSize: height * 0.035,
        fontWeight: 'bold',
        marginBottom: height * 0.03,
        textAlign: 'center',
        color: secondaryColor,
    },
    label: {
        fontSize: height * 0.02,
        fontWeight: 'bold',
        marginBottom: height * 0.01,
        color: secondaryColor,
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
    multilineInput: {
        height: null, // Remove fixed height
        textAlignVertical: 'top', // Allows text to start from the top of the input field
        paddingTop: height * 0.01,
    },
    errorText: {
        color: 'red',
        fontSize: height * 0.015,
        marginTop: height * 0.005,
    },
    button: {
        backgroundColor: secondaryColor,
        paddingVertical: height * 0.02,
        borderRadius: height * 0.02,
        marginBottom: height * 0.02,
    },

    button2: {
        backgroundColor: secondaryColor,
        paddingVertical: height * 0.02,
        borderRadius: height * 0.02,
        marginBottom: height * 0.02,
        width: width * 0.5,
    },


    buttonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    model: {
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        height: height * 0.6,
    },

    image: {
        width: width * 0.9,
        height: height * 0.3,
        resizeMode: 'contain',
        marginBottom: height * 0.02,
    },
});