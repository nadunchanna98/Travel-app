import { StyleSheet, View, Dimensions, ScrollView, Share, RefreshControl, ImageBackground, TouchableOpacity  } from 'react-native';
import React, { useCallback, useEffect, useState, useContext } from 'react';
import { Searchbar, Card, Avatar, IconButton, Button } from 'react-native-paper';
const { height, width } = Dimensions.get('window');
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import { AuthContext } from '../../components/AuthContext';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'; 

const secondaryColor = '#0077be';
const primaryColor = '#f1f1f1';

const Home = () => {

  const { BASE_URL } = useContext(AuthContext)

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getDiseases();

    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const interval = setInterval(getDiseases, 30000);
    getDiseases();
    return () => clearInterval(interval);
  }, []);

  const getDiseases = async () => {
    try {
      axios.get(`${BASE_URL}places/`)
        .then(function (response) {
          setCards(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  const [refreshing, setRefreshing] = useState(false);
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigation = useNavigation();

  const filteredCards = cards.filter((card) =>
    card.place.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const onChangeSearch = (query) => setSearchQuery(query);

  return (

    <ImageBackground
      source={require('./sea.jpg')}
      style={{
        resizeMode: 'cover',
        flex: 1,
        position: 'relative',
        right: 0,
        left: 0,
        top: 0,
        bottom: 0,
        opacity: 1,

      }}
    >
      <ScrollView style={styles.Container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}  >
        <View style={styles.searchbarContainer}>
          <Searchbar
            placeholder="Search Places"
            onChangeText={onChangeSearch}
            value={searchQuery}
            color={secondaryColor}
            iconColor={secondaryColor}
            placeholderTextColor={secondaryColor}
            style={{
              borderRadius: 20,
              backgroundColor: '#fff',
              borderColor: secondaryColor,
              borderWidth: 1,
              position: 'fixed'
            }}
          />
        </View>
        <View style={styles.searchItems}>
          {filteredCards.map((card) => (

            <View style={
              styles.searchItem
            } key={card._id} >
              <Card

                style={{
                  backgroundColor: 'rgba(0,0,0,0.4)',
                }}
              >
                <Card.Cover
                  source={{ uri: card.image }}
                  style={{ height: height * 0.2 }}

                />
                <Card.Title
                  key={card._id}
                  title={card.place}
                  titleStyle={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  subtitle={card.subtitle}
                  left={(props) => <Avatar.Icon
                    {...props}
                    icon="map-marker-radius-outline"
                    style={{
                      backgroundColor: secondaryColor,

                    }}
                  />}
                  right={(props) => <IconButton
                    {...props}
                    icon="share-variant"
                    style={{
                      backgroundColor: secondaryColor,
                    }}
                    iconColor={primaryColor}
                    onPress={() => {
                      Share.share({
                        message: `Hey,` + `\nCheck out this Place named `
                          + `\n` + card.place + ` On Discover Sri Lanka App` + `\n\n` + `https://play.google.com/store/apps/details?id=com.discover.srilanka `
                      });
                    }} />}
                />
                <Button
                  icon="arrow-right-circle"
                  mode="contained"
                  buttonColor={secondaryColor}
                  style={{
                    borderRadius: width * 0.1,
                    marginRight: width * 0.04,
                    marginLeft: width * 0.04,
                    marginBottom: height * 0.02,
                    borderColor: secondaryColor,
                    borderWidth: 1,
                    width: width * 0.6,
                    alignSelf: 'center',
                  }

                  }
                  onPress={() => {
                    navigation.navigate('PlaceDetail', { title: card.place, id: card._id })
                  }} >Discover the Destination</Button>
              </Card>

            </View>

          ))}
        </View>

      </ScrollView>

      <TouchableOpacity
        style={{
          position: 'absolute',
          top: height * 0.9,
          right: width * 0.05,
          backgroundColor: "#ad0505",
          borderRadius: 20,
          padding: 10,
        }}
        onPress={() => {
          navigation.navigate('Chatbot')
        }}
      >
        <Icon name="chat" size={30} color="#fff" />
      </TouchableOpacity>

    </ImageBackground>
  );
};

export default Home;

const styles = StyleSheet.create({

  Container: {
    flex: 1,
  },

  searchbarContainer: {
    marginTop: width * 0.2,
    marginHorizontal: 10,
    backgroundColor: 'transparent',
  },

  searchItems: {
    marginTop: 10,
  },

  searchItem: {
    marginVertical: 10,
    marginHorizontal: 10,
    borderRadius: 15,
  },
});
