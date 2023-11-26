import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Alert, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { firebase } from '../../../config';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';

const FileUpload = ({ onImageUpload }) => {

  const [images, setImages] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const pickImage = async () => {

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
      multiple: true,
    });

    if (!result.canceled) {
      setImages(images => [...images, ...result.assets]);
    }
  };

  const uploadMedia = async () => {

    if (images.length === 0) {
      return;
    }

    setUploading(true);
    setProgress(0);

    const promises = images.map(async (image) => {

      const { uri } = await FileSystem.getInfoAsync(image);
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = () => {
          resolve(xhr.response);
        };
        xhr.onerror = (e) => {
          console.log(e);
          reject(new TypeError('Network request failed'));
        };
        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      const filename = image.substring(image.lastIndexOf('/') + 1);
      const ref = firebase.storage().ref().child(`images/${filename}`);

      const uploadTask = await ref.put(blob);

      uploadTask.on('state_changed', (snapshot) => {
        setProgress(snapshot.bytesTransferred / snapshot.totalBytes * 100);
      });

      await uploadTask.promise();

      return await ref.getDownloadURL();

    });

    const downloadURLs = await Promise.all(promises);

    setUploading(false);
    setProgress(0);

    onImageUpload(downloadURLs);
    setImages([]);

  };

  return (
    <SafeAreaView style={styles.container}>

      <TouchableOpacity onPress={pickImage}>
        <Text>Choose Images</Text>
      </TouchableOpacity>

      {images.length > 0 && (
        <Image source={{ uri: images[0] }} style={{ width: 200, height: 200 }} />
      )}

      <TouchableOpacity onPress={uploadMedia}>
        <Text>Upload Images</Text>
      </TouchableOpacity>

      {uploading && (
        <Text>Uploading... {progress}%</Text>
      )}

    </SafeAreaView>
  );
};

export default FileUpload;

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
