import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';

import MainView from './MainView';
import ReportView from './ReportView';
import SettingsView from './SettingsView';

const Tab = createBottomTabNavigator();

export default function TabView() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({route}) => ({
          // headerShown: false,
          tabBarStyle: {
            // height: 90,
            // paddingHorizontal: 5,
            // paddingTop: 0,
            backgroundColor: 'rgba(34,36,40,1)',
            position: 'absolute',
            borderTopWidth: 0,
          },
          headerStyle: {
            backgroundColor: 'rgba(34,36,40,1)',
          },
          headerTintColor: '#cccccc',
        })}>
        <Tab.Screen
          name="Home"
          component={MainView}
          options={{
            title: 'KendoLog',
            // headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="home" color={color} size={size} />
            ),
            // headerRight: () => (
            //   <Button
            //     onPress={() => alert('This is a button!')}
            //     title="ADD"
            //     color="#000000"
            //   />
            // ),
          }}
        />
        <Tab.Screen
          name="Report"
          component={ReportView}
          options={{
            title: 'Report',
            unmountOnBlur: true,
            // headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="list" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsView}
          options={{
            title: 'Settings',
            // headerShown: false,
            tabBarShowLabel: false,
            tabBarIcon: ({color, size}) => (
              <Icon name="settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
