import * as Linking from "expo-linking";
import { CLIENT_ID, useAuth, CALLBACK_URL, CLIENT_SECRET } from "../utils/Auth";
import * as React from "react";
import * as WebBrowser from "expo-web-browser";
import { Button, ImageBackground, Platform, Text } from "react-native";
import tailwind from "tailwind-react-native-classnames";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { ResizeMode } from "expo-av";
import { Dimensions } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

WebBrowser.maybeCompleteAuthSession();

const image = {
  uri: "https://blog.octo.com/wp-content/uploads/2015/12/react-logo-1000-transparent.png",
};
const windowWidth = Dimensions.get("window").width;

export default function LoginScreen() {
  const { signIn } = useAuth();

  async function Login() {
    const result = await WebBrowser.openAuthSessionAsync(
      `https://api.imgur.com/oauth2/authorize?client_id=${CLIENT_ID}&response_type=token`,
      CALLBACK_URL || "?"
    );

    if (result.type === "success") {
      const { path, queryParams } = Linking.parse(
        result.url.replace("#access_token", "?access_token")
      );
      if (queryParams?.access_token && queryParams?.account_username) {
        await signIn(queryParams?.access_token, queryParams?.account_username);
      }
    }
  }

  return (
    <ImageBackground
      source={image}
      width={windowWidth}
      style={tailwind`flex-1 justify-center`}
    >
      <TouchableOpacity
        onPress={() => {
          Login();
        }}
      >
        <Text
          style={tailwind`text-center text-white bg-black bg-opacity-50 p-5 text-2xl font-semibold`}
        >
          Login With Imgur
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
}
