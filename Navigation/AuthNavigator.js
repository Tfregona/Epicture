import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import LoginScreen from '../screens/LoginScreen';

const AuthStack = createStackNavigator();

export default function AuthNavigator() {
  return (
    <AuthStack.Navigator >
      <AuthStack.Screen name="Login" component={LoginScreen} />
    </AuthStack.Navigator>
  );
}