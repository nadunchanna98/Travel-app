import { StyleSheet, View, Dimensions ,Alert ,RefreshControl } from 'react-native'
import React, { useState, useContext, useEffect ,useCallback} from 'react';
import { Button, Divider, Card, Text ,Avatar ,IconButton } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
const secondaryColor = '#0d294f';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../components/AuthContext';
import axios from 'axios';
import moment from 'moment';
import { ScrollView } from 'react-native-gesture-handler';

const IntakeNote = () => {

  const navigation = useNavigation();
  const { userInfo, BASE_URL } = useContext(AuthContext);
  const [notes, setNotes] = useState([])
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getNotes();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);


  useEffect(() => {
    const interval = setInterval(getNotes, 30000);
    getNotes();
    return () => clearInterval(interval);
  }, []);

  const getNotes = async () => {
    try {
      axios.get(`${BASE_URL}users/note/${userInfo._id}`)
        .then(function (response) {
          setNotes(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (

    <ScrollView  refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
    <View style={styles.container}  >

      <View style={styles.buttonContainer}>
        <Button icon="plus"
          mode="contained"
          buttonColor={secondaryColor}
          labelStyle={{
            color: '#fff',
            fontSize: width * 0.05,
            margin: width * 0.02,
          }}
          style={{
            borderRadius: width * 0.1,
            marginRight: width * 0.04,
            marginLeft: width * 0.04,
            marginBottom: height * 0.02,
            borderColor: secondaryColor,
            borderWidth: 1,
            width: width * 0.8,
            alignSelf: 'center',
          }}
          onPress={() => {
            navigation.navigate('AddNote', { title: 'Add Note' })
          }}>
          Add Note
        </Button>
      </View>

      <View style={styles.notesContainer}>
        <Card>
          {notes.length > 0 ? (
            notes.map((note, index) => (
              <View key={index}>

                <Card.Content>
                  <Text style={styles.titleLarge}>{note.content}</Text>
                  <Text style={styles.date}>{moment(note.createdAt).format('DD-MM-YYYY hh:mm A')}</Text>
                </Card.Content>

                <Card.Title
                  left={(props) => <IconButton {...props} icon="pencil" size={30} color={secondaryColor}
                    onPress={() => {
                      navigation.navigate('EditNote', { title: 'Edit Note', note: note })
                    }} />}
                  right={(props) => <IconButton {...props} icon="delete"  size={30}  color={secondaryColor} style={{marginRight: width * 0.05,}}
                    onPress={() => {
                      Alert.alert(
                        "Delete Note",
                        "Are you sure you want to delete this note?",
                        [
                          {
                            text: "Cancel",
                            style: "cancel"
                          },
                          {
                            text: "OK", onPress: () => {
                              axios.delete(`${BASE_URL}users/note/${userInfo._id}/${note._id}`)
                                .then(function (response) {
                                  getNotes();
                                })
                                .catch(function (error) {
                                  console.log(error);
                                });
                            }
                          }
                        ],
                        { cancelable: false }
                      );
                    }} />}
                />


                <Divider
                  style={{
                    margin: width * 0.03,
                    backgroundColor: secondaryColor,
                    height: 1,
                    width: width * 0.9,
                  }}
                />
              </View>
            ))
          ) : (
            <Card.Content>
              <Text style={styles.titleLarge}>No notes available</Text>
            </Card.Content>
          )}
        </Card>
      </View>

    </View>
    </ScrollView>
  )
}

export default IntakeNote

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#fff',
  },

  buttonContainer: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },

  titleLarge : {
    fontSize: width * 0.05,
    marginBottom: height * 0.03,
    marginTop: height * 0.03,
  },

  date: {
    fontSize: width * 0.03,
    textAlign: 'left',
    marginRight: width * 0.05,
  },


})