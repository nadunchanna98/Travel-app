import React, { useState, useContext, useCallback, useEffect } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Modal,
  TextInput,
  ScrollView,
  Alert,
  RefreshControl
} from 'react-native';
import { Button } from 'react-native-paper';
import { Entypo, Ionicons, MaterialCommunityIcons, Fontisto, FontAwesome, MaterialIcons } from '@expo/vector-icons';
import { AuthContext } from '../../components/AuthContext';
import { Formik } from 'formik';
import * as yup from 'yup';
import axios from 'axios'
import BASE_URL from '../../components/BaseURL';
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import moment from 'moment';
const { height, width } = Dimensions.get("window")
const primaryColor = '#0ac4af';
const secondaryColor = '#0d294f';

let schema = yup.object().shape({
  name: yup.string().required("Name is required!"),
  email: yup.string().email("Enter a valid email!").required("Email is required!"),
});

const UserProfile = () => {

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getUserInfo(id);

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [id]);


  const [refreshing, setRefreshing] = useState(false);
  const { getUserInfo, userInfo, handleLogout } = useContext(AuthContext)
  const navigation = useNavigation();

  console.log(userInfo)

  var id = userInfo._id
  const language = userInfo.language
  const dob = moment(userInfo.dob).format('YYYY-MM-DD')
  const number = userInfo.number
  let name = userInfo.name
  let email = userInfo.email


  const [updatedUserInfo, setUpdatedUserInfo] = useState(userInfo)


  const updateUserDetails = async (values) => {
    updatedData = {
      ...updatedUserInfo,
      name: values.name,
      email: values.email,
      language: values.language,
      dob: values.dob,
      number: values.number
    }
    setUpdatedUserInfo(updatedData)

    console.log(userInfo)

    const dataToBeSend = {
      name: updatedData.name,
      email: updatedData.email,
      dob: updatedData.dob,
      number: updatedData.number,
      language: updatedData.language
    }

    if (id !== undefined && id !== null && id !== '' && id !== 0) {
      try {
        const response = await axios.put(`${BASE_URL}users/user/edit/${id}`, dataToBeSend)
        getUserInfo(id)
        Alert.alert("User Updated Successfully!")
      } catch (error) {
        console.log(error)
        Alert.alert("Something Went Wrong!")
      }
    }
    else {
      Alert.alert("Something Went Wrong!")
    }

  }

  const [visible, setVisible] = useState(false);
  const show = () => { setVisible(true) };
  const hide = () => { setVisible(false) };

  return (
    <SafeAreaView>

      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
        <View style={styles.topBar}></View>
        <View style={styles.container}>

          <View style={styles.imageContainer}>
            <View style={styles.profileContainer}>
              <Ionicons name="person" size={width * 0.18} color="black" />
            </View>
          </View>

          <View style={styles.detailsContainer}>
            <View style={styles.detail}>
              <Entypo name="user" size={24} color="black" />
              <Text style={styles.detailText}>{userInfo.name}</Text>
            </View>
            <View style={styles.detail}>
              <Ionicons name="mail" size={24} color="black" />
              <Text style={styles.detailText}>{userInfo.email}</Text>
            </View>
            <View style={styles.detail}>
              <Fontisto name="language" size={24} color="black" />
              {language ? <Text style={styles.detailText}>language : {language}</Text> : <Text style={{
                fontSize: width * 0.042,
                paddingLeft: width * 0.06,
                fontWeight: "language"
              }}>Add your language !!</Text>}
            </View>
            <View style={styles.detail}>
              <FontAwesome name="birthday-cake" size={24} color="black" />
              {dob ? <Text style={styles.detailText}>Birth Day : {dob}</Text> : <Text style={{
                fontSize: width * 0.042,
                paddingLeft: width * 0.06,
                fontWeight: "bold"
              }}>Add your Birth Date !!</Text>}
            </View>
            <View style={styles.detail}>
              <FontAwesome name="phone" size={24} color="black" />
              {dob ? <Text style={styles.detailText}>Phone Number : {number}</Text> : <Text style={{
                fontSize: width * 0.042,
                paddingLeft: width * 0.06,
                fontWeight: "bold"
              }}>Add your Phone Number !!</Text>}
            </View>

          </View>

          <Modal visible={visible} animationType="slide" onRequestClose={hide}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <View style={styles.modalContainer}>
                <Text style={styles.editTitleText}>Edit Profile</Text>
                <Formik
                  initialValues={{ name: name, email: email , dob: dob, number: number, language: language     }}
                  validationSchema={schema}
                  onSubmit={(values) => {
                    hide()
                    updateUserDetails(values)
                  }}
                >
                  {({ handleChange, handleSubmit, setFieldTouched, isValid, touched, values, errors }) => {
                    return (
                      <View>
                        <View style={styles.inputContainer}>
                          <View>
                            <Text style={styles.textInputTitle}>Name</Text>
                            <TextInput style={styles.input} value={values.name} onBlur={() => { setFieldTouched('name') }} onChangeText={handleChange('name')} placeholder="Ex: David Boby" />
                            {touched.name && errors.name && (<Text style={styles.errorText}>{errors.name}</Text>)}
                          </View>

                          <View>
                            <Text style={styles.textInputTitle}>Email</Text>
                            <TextInput style={styles.input} value={values.email} onBlur={() => { setFieldTouched('email') }} onChangeText={handleChange('email')} placeholder="sample@email.com" />
                            {touched.email && errors.email && (<Text style={styles.errorText}>{errors.email}</Text>)}
                          </View>
                          <View>
                            <Text style={styles.textInputTitle}>Phone Number</Text>
                            <TextInput style={styles.input} value={values.number} placeholder="Ex: 0771234567" />
                          </View>
                          <View>
                            <Text style={styles.textInputTitle}>Date of Birth</Text>
                            <TextInput style={styles.input} value={values.dob} placeholder="Ex: 1998/12/12" />
                          </View>
                          <View>
                            <Text style={styles.textInputTitle}>Language</Text>
                            <TextInput style={styles.input} value={values.language} placeholder="Ex: language" />
                          </View>
                        </View>


                        <View style={styles.buttonContainer}>
                          <Button style={{ width: "40%", margin: "5%" }} mode='contained' buttonColor="#707070" onPress={hide}>Cancel</Button>
                          <Button
                            onPress={handleSubmit}
                            mode='contained'
                            buttonColor={isValid ? secondaryColor : "#7a7a7a"}
                            disabled={!isValid}
                            style={{ width: "40%", opacity: isValid ? 1 : 0.8 }}
                          >
                            Submit
                          </Button>
                        </View>
                        {/*  */}

                      </View>);
                  }}
                </Formik>
              </View>
            </ScrollView>
          </Modal>

          <View style={styles.buttonContainer2}>
            <TouchableOpacity style={styles.button3} onPress={show} >
              <Text style={styles.buttonText}>
                <MaterialCommunityIcons name="account-edit" size={width * 0.06} color="white" />Edit Profile</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button2} onPress={() => { handleLogout() }}>
              <Text style={styles.buttonText}>
                <MaterialCommunityIcons name="logout" size={width * 0.05} color="white" />Logout</Text>
            </TouchableOpacity>
          </View>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  topBar: {
    width: "100%",
    height: height * 0.2,
  },
  container: {
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05,
  },

  imageContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  profileContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: width * 0.3,
    height: width * 0.3,
    backgroundColor: "#FFFFFF",
    borderRadius: 500,
    top: -(width * 0.15 + width * 0.1),
  },
  detailsContainer: {
    marginTop: -width * 0.2,
    marginBottom: width * 0.1,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingLeft: width * 0.05,
    borderColor: "#19AFE2",
    borderBottomWidth: 1,
  },
  detailText: {
    fontSize: width * 0.042,
    paddingLeft: width * 0.06,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  buttonContainer2: {
    flexDirection: "column",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  button: {
    backgroundColor: secondaryColor,
    padding: width * 0.04,
    paddingHorizontal: width * 0.1,
    borderRadius: 500,
  },
  button2: {
    backgroundColor: "red",
    padding: width * 0.04,
    paddingHorizontal: width * 0.1,
    borderRadius: 500,
    width: width * 0.5,
    marginBottom: width * 0.05

  },
  button3: {
    backgroundColor: secondaryColor,
    marginVertical: width * 0.001,
    padding: width * 0.04,
    paddingHorizontal: width * 0.1,
    borderRadius: 500,
    marginBottom: width * 0.05
  },
  cancelButton: {
    backgroundColor: "#707070",
  },
  buttonText: {
    fontSize: width * 0.045,
    color: "#FFFFFF",
    marginRight: width * 0.0,
    marginLeft: width * 0.02,

  },
  modalContainer: {
    padding: 10,
  },
  editTitleText: {
    fontSize: width * 0.1,
    textAlign: "center",
    fontWeight: "bold",
    marginVertical: width * 0.05,
  },
  inputContainer: {
    marginBottom: width * 0.06,
  },
  input: {
    borderWidth: 1,
    borderColor: "#95A695",
    borderRadius: 5,
    paddingVertical: 5,
    paddingHorizontal: 15,
    marginVertical: 8,
  },
  textInputTitle: {
    fontSize: width * 0.045,
  },
  errorText: {
    color: "#ff0000",
  },
  submitButton: {
    marginVertical: width * 0.1,
    padding: width * 0.04,
    paddingHorizontal: width * 0.1,
    borderRadius: 500,
  },
  //header
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#237473',
    justifyContent: 'center',
    height: height * 0.08,
  },

  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: width * 0.26,
  },
});

export default UserProfile