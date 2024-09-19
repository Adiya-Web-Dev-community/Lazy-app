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
import Profile from '../Screen/CotegoryScreen/Profile';
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
import ShowDetails from '../Screen/Redeem/ShowDetails';
import RedeemCoupon from '../Screen/Redeem/RedeemCoupon';
import BrandHub from '../Screen/HomeHeaderCards/BrandHub';
import SuggestUsScreen from '../Screen/SuggestUs/SuggestUs';
import CotegoryScreen from '../Screen/CotegoryScreen/CotegoryScreen';
import SelectedBrandScreen from '../Screen/HomeHeaderCards/SelectedBrandScreen';
import CategoryDetails from '../Screen/CotegoryScreen/CategoryDetails';
import AllDetails from '../Screen/CotegoryScreen/AllDetails';
import UserPostScreen from '../Screen/InfromAndInspire/UserPostScreen';
import ProfileScreen from '../Screen/ProfileScreen/UserProfileScreen';
import UserProfileScreen from '../Screen/ProfileScreen/UserProfileScreen';
import SavePost from '../Screen/BuzzFeed/SavePost';
import ForgotPassword from '../Screen/ProfileScreen/ForgotPassword';
import OTPScreen from '../Screen/ProfileScreen/OTPScreen';
import EmailVerification from '../Screen/ProfileScreen/EmailVerification';
import MyEarningsScreen from '../Screen/ProfileScreen/MyEarningsScreen';
import ReferAndEarnScreen from '../Screen/ProfileScreen/ReferAndEarnScreen';
import ReportScreen from '../Screen/ProfileScreen/ReportScreen';
import EditProfile from '../Screen/ProfileScreen/EditProfile';
import Earnings from '../Screen/ProfileScreen/Earnings';
import OrderDetails from '../Screen/ProfileScreen/Order/AllOrderDetails';
import OrderDescription from '../Screen/ProfileScreen/Order/OrderDescription';
import AllOrderDetails from '../Screen/ProfileScreen/Order/AllOrderDetails';
import Reports from '../Screen/ProfileScreen/Order/Reports';
import RequestPayment from '../Screen/ProfileScreen/Order/RequestPayment';
import GetHelp from '../Screen/ProfileScreen/Order/GetHelp';

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
            backgroundColor: COLORS.White,
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
          let iconColor = focused ? COLORS.blue : 'grey';
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
  const linking = {
    prefixes: ['https://lazydeeplink.netlify.app/app'],
    config: {
      screens: {
        BuzzFeedDetails: {
          path: 'BuzzFeedDetails/:name',
        },
      },
    },
  };

  return (
    <NavigationContainer linking={linking}>
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
        <Stack.Screen name="showDetails" component={ShowDetails} />
        <Stack.Screen name="RedeemCoupon" component={RedeemCoupon} />
        <Stack.Screen
          name="BrandHub"
          component={BrandHub}
          options={{headerShown: false}}
        />
        <Stack.Screen name="SuggestUsScreen" component={SuggestUsScreen} />
        <Stack.Screen name="CotegoryScreen" component={CotegoryScreen} />
        <Stack.Screen
          name="SelectedBrandScreen"
          component={SelectedBrandScreen}
          options={{title: 'Lazybat'}}
        />
        <Stack.Screen name="CategoryDetails" component={CategoryDetails} />
        <Stack.Screen name="AllDetails" component={AllDetails} />
        <Stack.Screen
          name="UserPostScreen"
          component={UserPostScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UserProfileScreen"
          component={UserProfileScreen}
          options={{
            headerShown: false,
            title: 'Profile',
          }}
        />
        <Stack.Screen
          name="SavePost"
          component={SavePost}
          options={{headerShown: true}}
        />
        <Stack.Screen
          name="OTPScreen"
          component={OTPScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="EmailVerification"
          component={EmailVerification}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyEarningsScreen"
          component={MyEarningsScreen}
          options={{headerShown: true, title: 'My Earning'}}
        />
        <Stack.Screen
          name="ReferAndEarn"
          component={ReferAndEarnScreen}
          options={{headerShown: true, title: 'Refer and Earn'}}
        />
        <Stack.Screen
          name="ReportScreen"
          component={ReportScreen}
          options={{headerShown: true, title: 'Reports'}}
        />
        <Stack.Screen
          name="EditProfile"
          component={EditProfile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Earnings"
          component={Earnings}
          options={{headerShown: true, title: 'My Earning'}}
        />
        <Stack.Screen
          name="AllOrderDetails"
          component={AllOrderDetails}
          options={{headerShown: true, title: 'Order Details'}}
        />
        <Stack.Screen
          name="OrderDescription"
          component={OrderDescription}
          options={{headerShown: true, title: 'Order Details'}}
        />
        <Stack.Screen
          name="Reports"
          component={Reports}
          options={{headerShown: false}}
        />
        <Stack.Screen name="RequestPayment" component={RequestPayment} />
        <Stack.Screen name="GetHelp" component={GetHelp} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
