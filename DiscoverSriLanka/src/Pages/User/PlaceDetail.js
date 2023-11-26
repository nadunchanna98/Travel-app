import { RefreshControl, SafeAreaView, StyleSheet, Text, View, Dimensions, Share, ScrollView, Alert, ImageBackground } from 'react-native'
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { SegmentedButtons, Menu, Divider, PaperProvider, Avatar, Button, Card, IconButton, Title } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import axios from 'axios';
const { height, width } = Dimensions.get('window');
import { AuthContext } from '../../components/AuthContext';
const secondaryColor = '#fff';
import moment from 'moment';

const PlaceDetail = () => {

  const id = useRoute().params.id;
  const { BASE_URL, userInfo } = useContext(AuthContext)
  const navigation = useNavigation();
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => { getCard(); }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getCard();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, [id]);

  const addBookmark = async (id) => {
    try {
      axios.post(`${BASE_URL}users/addbookmark/${userInfo._id}`, { CardId: id })
        .then(function (response) {
          console.log(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };


  const confirmDelete = (id) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this disease?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        { text: "OK", onPress: () => deleteCard(card._id) }
      ],
      { cancelable: false }
    );
  }

  const deleteCard = async (id) => {
    axios.delete(`${BASE_URL}places/place/${id}`)
      .then(function (response) {
        navigation.navigate('Dashboard')
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const getCard = async () => {

    if (id !== undefined) {
      axios.get(`${BASE_URL}places/place/${id}`)
        .then(function (response) {
          setCard(response.data.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  const [value, setValue] = useState('');
  const [card, setCard] = useState({});

  const RightContent = props => <Avatar.Icon {...props} icon="dots-vertical"

    iconColor={secondaryColor}
    style={{
      marginRight: 10,
    }}

  />

  return (

    <ImageBackground
      // source={card.image ? { uri: card.image } : require('./sea.jpg')}
      source={require('./sea.jpg')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        position: 'absolute',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        opacity: 1,
      }}
    >

      <SafeAreaView style={styles.container}>

        <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
          <View>
            <Card
              style={{
                width: width,
                backgroundColor: 'rgba(0,0,0,0.7)',
                paddingTop: height * 0.06,
              }}
            >
              <Card.Title
                title={card.title}
                subtitle={card.subtitle}

                right={(props) => <IconButton {...props}
                  icon="share-variant"
                  iconColor={'#fff'}
                  onPress={() => {
                    Share.share({
                      message: `Hey,` + `\nCheck out this Place named `
                        + `\n` + card.place + ` On Discover Sri Lanka App` + `\n\n` + `https://play.google.com/store/apps/details?id=com.discover.srilanka `
                    });
                  }} />}

                titleStyle={{
                  color: secondaryColor,
                  fontSize: width * 0.05,
                  fontWeight: 'bold',
                  margin: width * 0.02,
                  textTransform: 'capitalize',
                }}
                subtitleStyle={{
                  color: secondaryColor,
                  fontSize: width * 0.04,
                  margin: width * 0.02,
                }}

                rightStyle={{
                  marginRight: 10,
                  color: secondaryColor,
                }}
              />
              <Card.Cover
                source={{ uri: card.image }}
                style={{
                  height: height * 0.3,
                  width: width * 0.95,
                  resizeMode: 'contain',
                  alignSelf: 'center',
                }}
              />

              <View style={styles.Segmentcontainer}>
                <SegmentedButtons
                  value={value}
                  onValueChange={setValue}
                  buttons={[
                    {
                      onPress: () => setPage(1),
                      label: 'Details',
                      icon: 'book-open-variant',
                      tintColor: 'red',
                      labelStyle: {
                        color: secondaryColor,
                        fontSize: width * 0.04,
                      },
                      iconStyle: {
                        color: secondaryColor,
                      },
                      checkedColor: secondaryColor,
                      accessibilityLabel: 'Details',
                    },
                    {
                      onPress: () => setPage(2),
                      label: 'Places',
                      icon: 'map-marker-multiple',
                      labelStyle: {
                        color: secondaryColor,
                        fontSize: width * 0.04,
                      },
                      checkedColor: secondaryColor,
                    },
                    {
                      onPress: () => setPage(3),
                      label: 'Explore',
                      icon: 'more',
                      iconColor: '#fff',
                      iconStyle: {
                        color: '#fff',

                      },
                      labelStyle: {
                        color: secondaryColor,
                        fontSize: width * 0.04,
                      },
                      checkedColor: secondaryColor,
                    },
                  ]}

                />

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', margin: 10 }}>

                </View>
              </View>

              {
                page === 1 ? (
                  <View>
                    <Card.Content style={{ marginTop: 10, }}  >
                      <Title style={{ color: secondaryColor }}>Description</Title>
                      <Text variant="titleLarge"
                        style={{
                          color: secondaryColor,
                          fontSize: width * 0.04,
                        }}
                      >{card.description}</Text>
                    </Card.Content>
                    <Divider style={{ margin: 10, backgroundColor: secondaryColor, height: 1, width: width * 0.9, }} />

                    <Card.Content>
                      <Title style={{ color: secondaryColor }}>Important</Title>
                      <Text variant="titleLarge"
                        style={{
                          color: secondaryColor,
                          fontSize: width * 0.04,
                        }}
                      >{card.important}</Text>
                    </Card.Content>
                    <Divider style={{ margin: 10, backgroundColor: secondaryColor, height: 1, width: width * 0.9, }} />

                    <Card.Content>
                      <Title style={{ color: secondaryColor }}>Essential</Title>
                      <Text variant="titleLarge"
                        style={{
                          color: secondaryColor,
                          fontSize: width * 0.04,
                        }}
                      >{card.veryimportant}</Text>
                    </Card.Content>

                  </View>
                ) : page === 2 ? (
                  <View>
                    <Card.Content>
                      <Title style={{ color: secondaryColor, marginBottom: 10 }}>Places Can Visit in {card.place}</Title>
                      <Text variant="titleLarge"
                        style={{
                          color: secondaryColor,
                          fontSize: width * 0.04,
                        }}
                      >{card.recommondation}</Text>


<Button
                        icon="arrow-right-circle"
                        mode="outlined"
                        textColor={secondaryColor}
                        style={{
                          borderRadius: width * 0.1,
                          marginRight: width * 0.04,
                          marginLeft: width * 0.04,
                          margin: height * 0.02,
                          borderColor: secondaryColor,
                          borderWidth: 1,
                          width: width * 0.3,
                          alignSelf: 'center',
                        }

                        }
                        onPress={() => {
                          navigation.navigate('PlaceDetail', { title: card.place, id: card._id })
                        }} >Visit</Button>

                    </Card.Content>





                  </View>
                ) : page === 3 ? (
                  <View>
                    <Card.Content>
                      <Title style={{ color: secondaryColor }}>Location</Title>
                      <Text variant="titleLarge"
                        style={{
                          color: secondaryColor,
                          fontSize: width * 0.04,
                        }}
                      >{card.location}</Text>
                    </Card.Content>

                    <Divider style={{ margin: 10, backgroundColor: secondaryColor, height: 1, width: width * 0.9, }} />

                    <Card.Content>
                      <Title style={{ color: secondaryColor }}>Visit</Title>
                      <Text variant="titleLarge"
                        style={{
                          color: secondaryColor,
                          fontSize: width * 0.04,
                        }}
                      >{card.important}</Text>



                    </Card.Content>

                  </View>
                ) : null
              }

              <Card.Title
                title={moment(card.createdAt).format('MMMM Do YYYY, h:mm a')}
                right={(props) => <IconButton {...props}
                  iconColor='#fff'
                  icon={

                    Array.isArray(userInfo.saved)
                      ? userInfo.saved.map((savedId) =>
                        savedId === card._id ? 'bookmark' : 'bookmark-outline'
                      ).pop()
                      : 'bookmark-outline'
                  }
                  size={40} color={secondaryColor}
                  onPress={() => {
                    addBookmark(card._id)
                  }} />}

                titleStyle={{
                  color: secondaryColor,
                  fontSize: width * 0.03,
                  margin: width * 0.02,
                }}
                subtitleStyle={{
                  color: secondaryColor,
                  fontSize: width * 0.04,
                  margin: width * 0.02,
                }}

                rightStyle={{
                  marginRight: 20,
                  color: secondaryColor,

                }}
              />

              {
                userInfo.role === 'admin' ? (
                  <Card.Actions>
                    <Button
                      icon="pencil"
                      mode="outlined"
                      textColor={secondaryColor}
                      style={{
                        borderRadius: width * 0.1,
                        marginRight: width * 0.01,
                        marginLeft: width * 0.01,
                        marginBottom: height * 0.02,
                        borderColor: secondaryColor,
                        borderWidth: 1,
                        width: width * 0.3,
                        alignSelf: 'center',
                      }
                      }
                      onPress={() => { navigation.navigate('EditItem', { card: card }) }} >Edit</Button>
                    <Button
                      icon="delete"
                      mode="outlined"
                      textColor='red'
                      style={{
                        borderRadius: width * 0.1,
                        marginRight: width * 0.01,
                        marginLeft: width * 0.01,
                        marginBottom: height * 0.02,
                        borderColor: "red",
                        borderWidth: 1,
                        width: width * 0.3,
                        alignSelf: 'center',
                      }
                      }
                      onPress={() => {
                        confirmDelete(card._id);
                      }} >Delete</Button>
                  </Card.Actions>
                ) : null
              }



            </Card>


          </View>
        </ScrollView>

      </SafeAreaView>
    </ImageBackground>
  )
}

export default PlaceDetail

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'transparent',
  },

  Segmentcontainer: {
    marginTop: 10,
    backgroundColor: 'transparent',
    width: width * 0.9,
    alignContent: 'center',
    alignSelf: 'center',
  },


})