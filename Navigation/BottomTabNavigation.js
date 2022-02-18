import React from "react";

// navigation components
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonicIcon from "react-native-vector-icons/Ionicons";
import { Text, Dimensions } from "react-native";

// Import Screens
import ProfilScreen from "../screens/Profile";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import AddMediaScreen from "../screens/AddMedia";
import FavoriteScreen from "../screens/FavoritesScreen"
const FullScreenWidth = Dimensions.get("window").width;

const BottomTab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size, padding }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Search") {
            iconName = focused ? "search-sharp" : "search-outline";
          } else if (route.name === "Add") {
            iconName = focused ? "add" : "add-outline";
          } else if (route.name === "Notification") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Favorites") {
            iconName = focused ? "heart-sharp" :"heart-outline"
          }

          return (
            <IonicIcon
              name={iconName}
              size={size}
              color={color}
              style={{ paddingBottom: padding }}
            />
          );
        },
          headerShown: false,
          activeTintColor: "lightseagreen",
          inactiveTintColor: "grey",
          labelStyle: { fontSize: 16 },
          style: { width: FullScreenWidth },
      })}
    >
      <BottomTab.Screen name="Home" component={HomeScreen} />
      <BottomTab.Screen name="Search" component={SearchScreen} />
      <BottomTab.Screen name="Add" component={AddMediaScreen} />
      <BottomTab.Screen name="Favorites" component={FavoriteScreen} />
      <BottomTab.Screen name="Profile" component={ProfilScreen} />
    </BottomTab.Navigator>
  );
}
