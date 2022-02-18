import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import PostScreen from "../screens/PostScreen";
import { useAuth } from "../utils/Auth";
import AuthNavigator from "./AuthNavigator";
import ImageScreen from "../screens/AddScreens/ImageScreen";
import BottomTabNavigator from "./BottomTabNavigation";
import CameraScreen from "../screens/AddScreens/CameraScreen";
const Stack = createStackNavigator();

function RootNavigator() {
  const { state } = useAuth();

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Epicture"
        component={state.userToken ? BottomTabNavigator : AuthNavigator}
      />
      <Stack.Screen name="PostScreen" component={PostScreen} />
      <Stack.Screen
        name="CameraScreen"
        component={CameraScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PostDraftScreen"
        component={ImageScreen}
        options={{
          headerShown: true,
          headerTitle: "",
          gestureEnabled: false,
        }}
      />
    </Stack.Navigator>
  );
}

export default function Navigation() {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
}
