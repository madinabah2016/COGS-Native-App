
import React from 'react';
import {
  View, Text, StyleSheet
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import SignIn from './SignInPage';
import SignUp from './SignUpPage'; 
import Home from './HomePage';


export default function App() {
  return <MainStackNavigator />
}

const styles = StyleSheet.create({

});

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='SignIn' component={SignIn} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
