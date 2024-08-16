import React, {useState, useEffect} from 'react';
import {View, TouchableOpacity} from 'react-native';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Feather from 'react-native-vector-icons/Feather';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Login from '../Screen/Login/Login';
import Signup from '../Screen/Singup/Singup';
import Home from '../Screen/HomeScreen/Home';
import Profile from '../Screen/ProfileScreen/Profile';
import {COLORS} from '../Theme/Colors';
import {moderateScale, scale, verticalScale} from '../utils/Scaling';
import Redeem from '../Screen/Redeem/Redeem';
import Claim from '../Screen/Claim/Claim';
import Info from '../Screen/Info/Guide/Info';
import {createDrawerNavigator} from '@react-navigation/drawer';
import EarnMore from '../Screen/DrawerScreen/EarnMore';
import LazybatWorks from '../Screen/DrawerScreen/LazybatWorks';
import TelegramChannel from '../Screen/DrawerScreen/TelegramChannel';
import ContactUS from '../Screen/DrawerScreen/ContactUS';
import RateUS from '../Screen/DrawerScreen/RateUS';
import Privacy from '../Screen/DrawerScreen/Privacy';
import DrawerProfile from '../Screen/DrawerScreen/DrawerProfile';
import AccountSettings from '../Screen/DrawerScreen/AccountSettings';
import KnowMoreAboutProduct from '../Screen/DrawerScreen/KnowMoreAboutProduct';
import ReferAndEarn from '../Screen/DrawerScreen/ReferAndEarn';
import MissingCashback from '../Screen/DrawerScreen/MissingCashback';
import Authlogin from '../utils/Authlogin';
import Notification from '../Screen/Notification/Notification';
import Logout from '../Screen/DrawerScreen/Logout';
import CustomDrawerContent from '../Components/CustomDrawerContent ';
import BuzzFeed from '../Screen/BuzzFeed/BuzzFeed';
import BuzzFeedDetails from '../Screen/BuzzFeed/BuzzFeedDetails';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

function DrawerTab({route, navigation}) {
  const fromProfile = route.params?.fromProfile || false;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (fromProfile) {
        navigation.dispatch(DrawerActions.openDrawer());
      }
    });
    return unsubscribe;
  }, [navigation, fromProfile]);

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        name="Home"
        component={BottomTab}
        options={({navigation}) => ({
          title: 'LazyApp',
          headerStyle: {
            elevation: scale(10),
            shadowColor: '#000',
            shadowOpacity: 0.25,
            shadowRadius: moderateScale(4),
            shadowOffset: {width: 0, height: 2},
            backgroundColor: '#f1f2f4',
          },
          headerTitleStyle: {
            color: COLORS.green,
            fontWeight: 'bold',
          },
          headerRight: () => (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() => navigation.navigate('Notification')}>
                <Feather
                  name="bell"
                  size={25}
                  color="black"
                  style={{marginRight: 20}}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <MaterialIcons
                  name="settings"
                  size={25}
                  color="black"
                  style={{marginRight: 10}}
                />
              </TouchableOpacity>
            </View>
          ),
        })}
      />
      {fromProfile ? (
        <>
          <Drawer.Screen name="DrawerProfile" component={DrawerProfile} />
          <Drawer.Screen name="AccountSettings" component={AccountSettings} />
          <Drawer.Screen name="LazybatWorks" component={LazybatWorks} />
          <Drawer.Screen name="EarnMore" component={EarnMore} />
          <Drawer.Screen name="TelegramChannel" component={TelegramChannel} />
          <Drawer.Screen
            name="Know More About Products THROUGH MINI VIDEOS"
            component={KnowMoreAboutProduct}
          />
          <Drawer.Screen name="ReferAndEarn" component={ReferAndEarn} />
          <Drawer.Screen name="MissingCashback" component={MissingCashback} />
          <Drawer.Screen name="ContactUS" component={ContactUS} />
          <Drawer.Screen name="RateUS" component={RateUS} />
          <Drawer.Screen name="Privacy" component={Privacy} />
          <Drawer.Screen name="Logout" component={Logout} />
        </>
      ) : (
        <>
          <Drawer.Screen name="LazybatWorks" component={LazybatWorks} />
          <Drawer.Screen name="EarnMore" component={EarnMore} />
          <Drawer.Screen name="TelegramChannel" component={TelegramChannel} />
          <Drawer.Screen name="ContactUS" component={ContactUS} />
          <Drawer.Screen name="RateUS" component={RateUS} />
          <Drawer.Screen name="Privacy" component={Privacy} />
        </>
      )}
    </Drawer.Navigator>
  );
}

function BottomTab({navigation}) {
  const [fromProfile, setFromProfile] = useState(false);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;
          let iconSize = focused ? 30 : 25;
          let iconColor = focused ? COLORS.Black : 'grey';
          if (route.name === 'Home') {
            iconName = 'home';
            return (
              <Feather name={iconName} size={iconSize} color={iconColor} />
            );
          } else if (route.name === 'Profile') {
            iconName = 'user';
            return (
              <Feather name={iconName} size={iconSize} color={iconColor} />
            );
          } else if (route.name === 'Redeem') {
            iconName = 'redeem';
            return (
              <MaterialIcons
                name={iconName}
                size={iconSize}
                color={iconColor}
              />
            );
          } else if (route.name === 'Claim') {
            iconName = 'credit-card';
            return <Entypo name={iconName} size={iconSize} color={iconColor} />;
          } else if (route.name === 'Info') {
            iconName = 'info-with-circle';
            return <Entypo name={iconName} size={iconSize} color={iconColor} />;
          }
        },
        tabBarActiveTintColor: COLORS.Black,
        tabBarInactiveTintColor: 'grey',
        tabBarStyle: {
          height: verticalScale(50),
          backgroundColor: COLORS.White,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
      })}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Redeem"
        component={Redeem}
        options={{
          tabBarLabel: 'Redeem',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Claim"
        component={Claim}
        options={{
          tabBarLabel: 'Claim',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Info"
        component={Info}
        options={{
          tabBarLabel: 'Info',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          headerShown: false,
          tabBarButton: props => (
            <TouchableOpacity
              {...props}
              onPress={() => {
                setFromProfile(true);
                navigation.navigate('DrawerTab', {fromProfile: true});
                navigation.dispatch(DrawerActions.openDrawer());
              }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function NavigationScreen() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Authlogin"
          component={Authlogin}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="DrawerTab"
          component={DrawerTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Notification" component={Notification} />
        <Stack.Screen name="BuzzFeed" component={BuzzFeed} />
        <Stack.Screen
          name="BuzzFeedDetails"
          component={BuzzFeedDetails}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
