/* eslint-disable react/no-unstable-nested-components */
import * as React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from '../screens/HomeScreen';
import CustomerScreen from '../screens/CustomerScreen';
import LoginScreen from '../screens/LoginScreen';
import DetailsScreen from '../screens/DetailsScreen';

import {useTheme} from '../theme/useTheme';
import {RootState} from '../store/store';
import {useSelector} from 'react-redux';

//Screen names
const loginName = 'Login';
const homeName = 'Home';
const customerName = 'Customer';

const Tab = createBottomTabNavigator();

const CustomerStack = createNativeStackNavigator();

function CustomerStackScreen() {
  return (
    <CustomerStack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <CustomerStack.Screen name="Customer" component={CustomerScreen} />
      <CustomerStack.Screen name="Details" component={DetailsScreen} />
    </CustomerStack.Navigator>
  );
}

function RootNavigation() {
  const {theme} = useTheme();
  const user = useSelector((state: RootState) => state.user);

  const isToken = user?.token || '';
  return (
    <NavigationContainer>
      {!isToken ? (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({color, size}) => {
              let iconName = '';

              if (route.name === loginName) {
                iconName = 'home';
              }

              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
              backgroundColor: theme.cardBg,
              borderTopColor: theme?.layoutBg,
            },
            tabBarInactiveTintColor: theme.color,
            tabBarActiveTintColor: theme.primary,
            headerStyle: {backgroundColor: theme.cardBg, height: 50},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: theme.primary,
              fontSize: 18,
              fontWeight: 'bold',
            },
            tabBarShowLabel: false,
          })}>
          <Tab.Screen name={loginName} component={LoginScreen} />
        </Tab.Navigator>
      ) : (
        <Tab.Navigator
          screenOptions={({route}) => ({
            tabBarIcon: ({focused, color, size}) => {
              let iconName = '';

              if (route.name === homeName) {
                iconName = focused ? 'clipboard' : 'clipboard-outline';
              } else if (route.name === 'Customer') {
                iconName = focused ? 'ios-list' : 'ios-list-outline';
              }
              // You can return any component that you like here!
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarStyle: {
              backgroundColor: theme.cardBg,
              borderTopColor: theme?.layoutBg,
            },
            tabBarInactiveTintColor: theme.color,
            tabBarActiveTintColor: theme.primary,
            headerStyle: {backgroundColor: theme.cardBg, height: 50},
            headerTitleAlign: 'center',
            headerTitleStyle: {
              color: theme.primary,
              fontSize: 18,
              fontWeight: 'bold',
            },
            tabBarShowLabel: true,
          })}>
          <Tab.Screen name={homeName} component={HomeScreen} />
          <Tab.Screen name={customerName} component={CustomerStackScreen} />
        </Tab.Navigator>
      )}
    </NavigationContainer>
  );
}

export default RootNavigation;
