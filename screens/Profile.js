import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  Button,
  Image,
  FlatList,
  Alert,
  Pressable,
} from "react-native";
import IonicIcon from "react-native-vector-icons/Ionicons";
import tailwind from "tailwind-react-native-classnames";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../utils/Auth";

const Profile = () => {
  const [data, setData] = useState([]);
  const [img, setImg] = useState([]);
  const { state } = useAuth();
  const { signOut } = useAuth();
  const navigation = useNavigation();

  const confirmSignOut = () => {
    console.log(state);
    Alert.alert(
      "Warning !",
      "You are about to sign out, are you sure ?",
      [
        { text: "Cancel" },
        {
          text: "Yes",
          onPress: async () => {
            try {
              await signOut();
            } catch (error) {
              alert(error);
            }
          },
        }, 
      ],
      { cancelable: false }
    );
  };
  useEffect(() => {
    const userpage = `https://api.imgur.com/3/account/${state.username}`;
    const userimage = `${userpage}/images`;

    fetch(userpage, {
      method: "get",
      headers: new Headers({
        Authorization: "Client-ID 6c975abe830397f",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));

    fetch(userimage, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${state.userToken}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setImg(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <View style={tailwind`items-end`}>
        <TouchableOpacity style={tailwind`absolute`} onPress={confirmSignOut}>
          <IonicIcon name="log-out-outline" size={40} />
        </TouchableOpacity>
        <View style={tailwind`flex flex-row m-2 items-center self-start`}>
          <Image
            style={{ width: 100, height: 100, borderRadius: 50 }}
            source={{ uri: data?.avatar }}
          />
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <Text
              style={tailwind`self-start ml-3 font-bold text-2xl mb-2`}
            >
              {state.username || ""}
            </Text>
            <Text
              style={tailwind`self-start ml-3 font-semibold text-base uppercase`}
            >
              {data?.reputation || ""}
              {data?.reputation ? " · " : ""}
              {data?.reputation_name || ""}
            </Text>
          </View>
        </View>
      </View>

      <FlatList
        data={img}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => navigation.navigate("PostScreen", { id: item.id })}
          >
            <Image
              style={{ width: 100, height: 200 }}
              source={{ uri: item.link }}
            />
          </Pressable>
        )}
      />
    </>
  );
};

export default Profile;
