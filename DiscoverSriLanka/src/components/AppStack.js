import { Text, View, Dimensions, TouchableOpacity, Alert, Share } from 'react-native'
import React, { useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
import { useNavigation } from '@react-navigation/native';

import Home from '../Pages/User/Home';
import Profile from '../Pages/User/Profile';
import BMI from '../Pages/User/BMI';
import IntakeNote from '../Pages/User/IntakeNote';
import AddItem from '../Pages/Admin/AddItem';
import AdminDashboard from '../Pages/Admin/AdminDashboard';
import PlaceDetail from '../Pages/User/PlaceDetail';
import EditItem from '../Pages/Admin/EditItem';
import Saved from '../Pages/User/Saved';
import AddNote from '../Pages/User/AddNote';
import EditNote from '../Pages/User/EditNote';
import Chatbot from '../Pages/User/Chatbot';


const CustomHeader = ({ navigation, title }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    height: Dimensions.get('window').height * 0.08,
    position: 'absolute',
    width: Dimensions.get('window').width,
  }}>
    <TouchableOpacity onPress={() => navigation.openDrawer()}>
      <MaterialCommunityIcons name="menu" size={30} color="#ffffff" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center', marginRight: Dimensions.get('window').width * 0.1 }}>
      <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.05, fontWeight: 'bold' , }}>
        {title}
      </Text>
    </View>
  </View>
);

const CustomHeader2 = ({ navigation, title }) => (
  <View style={{
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    position: 'absolute',
    height: Dimensions.get('window').height * 0.08,
    width: Dimensions.get('window').width,
  }}>
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <MaterialCommunityIcons name="arrow-left" size={30} color="#ffffff" style={{ marginLeft: 10 }} />
    </TouchableOpacity>
    <View style={{ flex: 1, alignItems: 'center', marginRight: Dimensions.get('window').width * 0.1 }}>
      <Text style={{ color: '#ffffff', fontSize: Dimensions.get('window').width * 0.05, fontWeight: 'bold' }}>
        {title}
      </Text>
    </View>
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ position: 'absolute', right: 10 }}>
      <MaterialCommunityIcons name="menu" size={30} color="#ffffff" />
    </TouchableOpacity>
  </View>
);

const MainHeader = ({ navigation, title }) => (
  <CustomHeader navigation={navigation} title={title} />
);

const InsideHeader = ({ navigation, title }) => (
  <CustomHeader2 navigation={navigation} title={title} />
);

const HomeScreens = ({ }) => (

  <Stack.Navigator initialRouteName="Dashboard" >
    <Stack.Screen
      name="Dashboard"
      component={Home}
      initialParams={{ title: 'Dashboard' }}
      options={({ route, navigation }) => ({
        header: (props) => <MainHeader {...props} title={route.params?.title || 'Home'} />,
      })}
    />

    <Stack.Screen
      name="PlaceDetail"
      component={PlaceDetail}
      initialParams={{ title: 'FoodDetail' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'PlaceDetail'} />,
      })}
    />

    <Stack.Screen
      name="EditItem"
      component={EditItem}
      initialParams={{ title: 'EditItem' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'EditItem'} />,
      })}
    />

    <Stack.Screen
      name="BMI"
      component={BMI}
      initialParams={{ title: 'BMI Calculater' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'BMI Calculater'} />,
      })}
    />

    <Stack.Screen
      name="IntakeNote"
      component={IntakeNote}
      initialParams={{ title: 'Intake Notes' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'IntakeNote'} />,
      })}
    />

    <Stack.Screen
      name="Saved"
      component={Saved}
      initialParams={{ title: 'Saved Notes' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'Saved'} />,
      })}
    />

    <Stack.Screen
      name="Profile"
      component={Profile}
      initialParams={{ title: 'Profile' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'Profile'} />,
      })}
    />

    <Stack.Screen
      name="AddNote"
      component={AddNote}
      initialParams={{ title: 'Add Note' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'AddNote'} />,
      })}
    />

    <Stack.Screen
      name="EditNote"
      component={EditNote}
      initialParams={{ title: 'Edit Note' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'EditNote'} />,
      })}
    />

    <Stack.Screen
      name="Chatbot"
      component={Chatbot} 
      initialParams={{ title: 'Chat Me' }}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'Chatbot'} />,
      })}
    />



  </Stack.Navigator>


);


const AdminScreens = ({ }) => (

  <Stack.Navigator initialRouteName="Admin-Dashboard" >

    <Stack.Screen
      name="Admin-Dashboard"
      component={AdminDashboard}
      initialParams={{ title: 'Admin Board' }}
      options={({ route, navigation }) => ({
        header: (props) => <MainHeader {...props} title={route.params?.title || 'AdminDashboard'} />,
      })}
    />

    <Stack.Screen
      name="AddItem"
      component={AddItem}
      options={({ route, navigation }) => ({
        header: (props) => <InsideHeader {...props} title={route.params?.title || 'AddItem'} />,
      })}
    />

  </Stack.Navigator>

);


const AppStack = () => {

  const [active, setActive] = React.useState('');
  const { userInfo, handleLogout } = useContext(AuthContext)
  const navigation = useNavigation();

  return (

    <View style={{ flex: 1, }}>

      <Drawer.Navigator initialRouteName="Home"
        screenOptions={{
          activeTintColor: '#e91e63',
          itemStyle: {
            marginVertical: 2,
          },
          labelStyle: {
            color: '#000',
            fontSize: Dimensions.get('window').width * 0.05,
            fontFamily: 'sans-serif',
          },
          drawerStyle: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Set the drawer background color with transparency
          },
        }}
        drawerContent={(props) => (

          <View style={{ flex: 1 }}>
            <View style={{
              backgroundColor: "transparent",
              paddingLeft: Dimensions.get('window').width * 0.1,
              paddingRight: Dimensions.get('window').width * 0.1,
              paddingTop: Dimensions.get('window').height * 0.01,
              marginBottom: 0,
              paddingBottom: 0,
              alignItems: 'center',
              justifyContent: 'center',
              height: Dimensions.get('window').height * 0.15,
              borderBottomColor: 'white',
              borderBottomWidth: 1,
            }}>
              <Text style={{
                color: 'white',
                fontSize: Dimensions.get('window').width * 0.06,
                fontWeight: 'bold',
                fontFamily: 'sans-serif'
              }}>
                Discover Sri Lanka
              </Text>
              <Text style={{
                color: 'white',
                fontSize: Dimensions.get('window').width * 0.04,
                fontFamily: 'sans-serif'
              }}>
                Version 1.0.0
              </Text>

            </View>


            <DrawerContentScrollView {...props} style={styles.drawerContainer} >
              <DrawerItem
                style={styles.drawerItem}
                label="Home"
                key="Home"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'home' : 'home-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('Home')}
              />
              <DrawerItem
                label="Profile"
                key="Profile"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'account' : 'account-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('Profile')}
              />
              <DrawerItem
                label="Currncy Converter"
                key="BMI"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'calculator' : 'calculator'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('BMI')}
              />
              <DrawerItem
                label="Intake Note"
                key="IntakeNote"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'book-open-variant' : 'book-open-page-variant'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('IntakeNote')}
              />

              <DrawerItem
                label="Saved"
                key="Savednotes"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'bookmarks' : 'bookmark-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => navigation.navigate('Saved')}
              />

              {
                userInfo.role === 'admin' ? (
                  <DrawerItem
                    label="Admin Board"
                    key="Admin"
                    labelStyle={styles.drawerLabel}
                    icon={({ focused, color, size }) => (
                      <MaterialCommunityIcons
                        name={focused ? 'lock' : 'lock'}
                        size={size}
                        color='white'
                      />
                    )}
                    onPress={() => navigation.navigate('Admin')}
                  />
                ) : null
              }


              <DrawerItem
                label="Invtie Friends"
                key="InvtieFriends"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'account-plus' : 'account-plus-outline'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => {
                  Share.share({
                    message: `Hey check out this amazing app for health and fitness on Doctor Food App.` + ` \n\nDownload it from` + `\n https://play.google.com/store/apps/details?id=com.doctorfood`,
                  });
                }
                }
              />

              <DrawerItem
                label="App Features"
                key="AppFeatures"
                labelStyle={styles.drawerLabel}
                icon={({ focused, color, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'creation' : 'creation'}
                    size={size}
                    color='white'
                  />
                )}
                onPress={() => Alert.alert('App Features', 'This app is designed to help you to maintain your health and fitness.')}
              />

            </DrawerContentScrollView>

            <TouchableOpacity
              style={{
                padding: Dimensions.get('window').width * 0.001,
                alignItems: 'start',
                justifyContent: 'center',
              }}
              onPress={() => handleLogout()}
            >
              <View style={{
                padding: Dimensions.get('window').width * 0.03 , alignItems: 'start', flexDirection: 'row'
              }}>
                <MaterialCommunityIcons
                  paddingLeft={Dimensions.get('window').width * 0.03}
                  paddingRight={Dimensions.get('window').width * 0.05}
                  name='logout'
                  size={30}
                  color='white'
                /> 
                <Text style={{ color: 'white', fontSize: Dimensions.get('window').width * 0.05 }}>
                Logout
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        )}>
        <Drawer.Screen
          name="Home"
          component={HomeScreens}
          options={{
            headerShown: false,
            drawerIcon: ({ focused, size }) => (
              <MaterialCommunityIcons
                name={focused ? 'home' : 'home-outline'}
                size={size}
              />
            ),
          }}
        />

        {
          userInfo.role === 'admin' ? (
            <Drawer.Screen
              name="Admin"
              component={AdminScreens}
              options={{
                headerShown: false,
                drawerIcon: ({ focused, size }) => (
                  <MaterialCommunityIcons
                    name={focused ? 'book' : 'book-outline'}
                    size={size}
                  />
                ),
              }}
            />
          ) : null
        }

      </Drawer.Navigator>
    </View>
  );
}

export default AppStack

const styles = {

  drawerContainer: {
    backgroundColor: "transparent",
  },

  drawerItem: {
    color: 'white',
  },

  drawerLabel: {
    color: '#fff',
    fontSize: Dimensions.get('window').width * 0.04,
    fontFamily: 'sans-serif',

  }

};