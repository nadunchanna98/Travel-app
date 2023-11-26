import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image, Dimensions, ActivityIndicator } from 'react-native'
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../config';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
const secondaryColor = '#0d294f';
const { width, height } = Dimensions.get('window');


const FileUpload = ({ onImageUpload }) => {

    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [ link , setLink ] = useState(null);

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
            multiple: true,
        });

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };

    const uploadMedia = async () => {
        if (!image) {
            return;
        }
        setUploading(true);

        try {
            const { uri } = await FileSystem.getInfoAsync(image);
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = () => {
                    resolve(xhr.response);
                }
                xhr.onerror = (e) => {
                    console.log(e);
                    reject(new TypeError('Network request failed'));
                }
                xhr.responseType = 'blob';
                xhr.open('GET', uri, true);
                xhr.send(null);

            });

            const filename = image.substring(image.lastIndexOf('/') + 1);
            const ref = firebase.storage().ref().child(`images/${filename}`);

            await ref.put(blob);
            setUploading(false);
            Alert.alert('Success');
            const downloadURL = await ref.getDownloadURL();
            onImageUpload(downloadURL);
            setLink(downloadURL);
            setImage(null);
        }
        catch (err) {
            console.log(err);
            setUploading(false);
        }

    }


    return (
        <SafeAreaView style={styles.container}>

            <TouchableOpacity onPress={pickImage}>
                {
                    !image ? (
                        <Text style={styles.buttonText2}  >Select Image</Text>
                    ) : (
                        <Text style={styles.buttonText2}  >Change Image</Text>
                    )
                }
                <View style={styles.imagecontainer}>

                    {
                        image ? (
                            <Image source={{ uri: image }} style={styles.image} />
                        ) : link ?(
                            <Image source={{ uri: link }} style={styles.image} />

                        ) : (
                            <Image source={require('./img.jpg')}
                                style={styles.image} />
                        )

                    }
                </View>
            </TouchableOpacity>


            <TouchableOpacity
                style={[styles.button, !image && styles.disabledButton]}
                onPress={uploadMedia}
                disabled={!image}
            >
                <Text style={styles.buttonText} >Upload Image</Text>
            </TouchableOpacity>
            <ActivityIndicator

                style={{

                    position: 'absolute',
                    alignSelf: 'center',
                    top: height * 0.2,
                    color: secondaryColor,

                }}

                animating={uploading} size="large" color="#0000ff" />

        </SafeAreaView>
    )
}

export default FileUpload

const styles = StyleSheet.create({

    buttoncontainer: {
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },

    button: {
        backgroundColor: secondaryColor,
        paddingVertical: height * 0.02,
        borderRadius: height * 0.02,
        marginBottom: height * 0.02,
        marginHorizontal: width * 0.02,
        alignContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: '#ffffff',
        fontSize: height * 0.02,
        fontWeight: 'bold',
        textAlign: 'center',
    },

    buttonText2: {
        color: secondaryColor,
        fontSize: height * 0.03,
        fontWeight: 'bold',
        textAlign: 'center',
        margin: height * 0.02,
    },

    image: {
        width: width * 0.9,
        height: height * 0.3,
        resizeMode: 'contain',
        marginBottom: height * 0.02,
    },

})