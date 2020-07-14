
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './screens/SignInPage';
import SignUp from './screens/SignUpPage'; 
import Home from './screens/HomePage';
import Settings from './screens/SettingsPage';
import CreateGroup from './screens/CreateGroupsPage';
import SearchGroup from './screens/SearchGroupPage';
import JoinGroup from './screens/JoinGroupPage';

export default function App() {
  return <MainStackNavigator />
}

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='SignIn' component={SignIn} options={{
          //Removes back buton from navigation bar
          headerLeft:null
        }} />
        <Stack.Screen name='SignUp' component={SignUp} />
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Settings' component={Settings}/>
        <Stack.Screen name='Create Group' component={CreateGroup}/>
        <Stack.Screen name='Search Group' component={SearchGroup}/>
        <Stack.Screen name='Join Group' component={JoinGroup}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
