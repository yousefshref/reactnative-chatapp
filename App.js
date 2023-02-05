import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Signup } from './Screeens/Signup';
import { Login } from './Screeens/Login';
import { Home } from './Screeens/Home';
import React from 'react';
import { Chat } from './Screeens/Chat';
import { AddUser } from './Screeens/AddUser';
import { Settings } from './Screeens/Settings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RecordingContext from './Contexts/RecordingContext';

export default function App() {
  const Stack = createNativeStackNavigator();

  const user = AsyncStorage.getItem('user')

  return (
    <RecordingContext>
      <NavigationContainer>
        <View style={styles.container}>
          <Stack.Navigator screenOptions={{
            contentStyle: {
              backgroundColor: 'black',
              marginTop: 10
            },
            headerStyle: { backgroundColor: 'black' },
            headerTintColor: 'white',
            headerTitleStyle: {
              fontSize: 23,
            },
            headerShown: false,
          }}
            initialRouteName='signup'
          >
            <Stack.Screen component={Home} name='home' />
            <Stack.Screen component={Chat} name='chat' />
            <Stack.Screen component={AddUser} name='adduser' />
            <Stack.Screen component={Settings} name='settings' />
            <Stack.Screen component={Signup} name='signup' />
            <Stack.Screen
              component={Login} name='login' />
          </Stack.Navigator>
          <StatusBar style={"light"} />
        </View>
      </NavigationContainer>
    </RecordingContext>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});

