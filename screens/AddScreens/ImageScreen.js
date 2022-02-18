import { View, Text, TouchableOpacity, TextInput, Image } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation, useNavigationState } from "@react-navigation/native";
import CheckBox from "../../components/CheckBox";
import { Ionicons } from "@expo/vector-icons";
import UploadPictureCard from "../../components/UploadPost";
import { useAuth } from "../../utils/Auth";

export default function ImageScreen({ route }) {
  const [Title, setTitle] = useState("");
  const [Loading, setLoading] = useState(false);
  const [publicMode, setPublicMode] = useState(true);
  const [matureMode, setMatureMode] = useState(false);
  const [Description, setDescription] = useState("");
  const navigation = useNavigation();
  const history = useNavigationState((state) => state.routes);
  const { state } = useAuth();

  useEffect(() => {
    const Upload = () => {
      fetch(`https://api.imgur.com/3/image`, {
        method: "post",
        headers: new Headers({
          Authorization: `Bearer ${state.userToken}`,
          "Content-type": "application/json",
        }),
        body: JSON.stringify({
          image: route.params.image.base64,
          type: "base64",
        }),
      })
        .then((response) => response.json())
        .catch((error) => alert(error));
    };
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={Upload} style={{ padding: 20 }}>
          <Text style={{ fontWeight: "bold", color: "#757a83", fontSize: 16 }}>
            {Loading ? "Loading" : "Post"}
          </Text>
        </TouchableOpacity>
      ),
      headerleft: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate({ key: history[0].key })}
          style={{
            padding: 5,
            alignItems: "center",
            justifyContent: "center",
            width: 60,
            height: 60,
          }}
        >
          <Ionicons size={30} color="#757a83" name="ios-arrow-back" />
        </TouchableOpacity>
      ),
    });
  }, [
    navigation,
    history,
    Loading,
    Title,
    Description,
    matureMode,
    publicMode,
  ]);

  return (
    <View>
      <View>
        <TextInput
          placeholder="Post Title (required)"
          keyboardType="default"
          returnKeyType="done"
          multiline
          blurOnSubmit
          value={Title}
          onSubmitEditing={() => Keyboard.dismiss()}
          numberOfLines={3}
          placeholderTextColor="#a0a1a3"
          onChangeText={(text) => setTitle(text)}
        />
        <View>
          <View>
            <Text>Public</Text>
            <CheckBox
              checked={publicMode}
              onPress={() => setPublicMode(!publicMode)}
            />
          </View>
          <View
            style={{
              borderColor: "#2e3034",
              borderWidth: 1,
              marginVertical: 1,
            }}
          />
          <View>
            <Text>Mature</Text>
            <CheckBox
              checked={matureMode}
              onPress={() => setMatureMode(!matureMode)}
            />
          </View>
        </View>
      </View>
      <UploadPictureCard
        uri={route.params.image.uri}
        width={route.params.image.width}
        height={route.params.image.height}
        type={route.params.image.type}
        description={Description}
        setDescription={setDescription}
      />
    </View>
  );
}
