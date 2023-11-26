import { StyleSheet, Text, View, Dimensions } from 'react-native'
import React from 'react'
import { Button } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
const secondaryColor = '#0d294f';
import { useNavigation } from '@react-navigation/native';

const AdminDashboard = () => {

  const navigation = useNavigation();

  return (
    <View style={styles.container}  >

      <View style={styles.buttonContainer}>
        <Button icon="plus"
          mode="outlined"
          buttonColor={'rgba(0,0,0,0.2)'}
          labelStyle={{
            color: '#fff',
            fontSize: width * 0.05,
            margin : width * 0.02,
            alignContent : 'center',
            justifyContent : 'center',
            alignItems : 'center',
          }}
          style={{
            borderRadius: width * 0.1,
            marginRight: width * 0.04,
            marginLeft: width * 0.04,
            marginBottom: height * 0.02,
            borderColor: '#fff',
            borderWidth: 1,
            width: width * 0.8,
            height: height * 0.08,
            alignSelf: 'center',
            justifyContent : 'center',
          }}
          onPress={() => {
            navigation.navigate('AddItem', { title: 'Add Item' })
          }}>
          Add A New Place
        </Button>
      </View>



    </View>
  )
}

export default AdminDashboard

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#00505c',
    paddingTop: height * 0.1,
  },

  buttonContainer: {
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },


})