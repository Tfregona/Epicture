import React from "react";
import { View, StyleSheet, Image, TextInput, Keyboard } from "react-native";
import { Video } from "expo-av";
import { Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const styles = StyleSheet.create({
  footer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
  },
  titleInput: {
    fontSize: 17,
    width: "100%",
    backgroundColor: "#2e3034",
    padding: 15,
    color: "white",
    textAlignVertical: "center",
    paddingTop: 15,
  },
  imageContainer: {
    display: "flex",
    backgroundColor: "#33353a",
    alignItems: "center",
    justifyContent: "flex-start",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 20,
  },
  image: {
    width: "100%",
    height: "100%",
    backgroundColor: "grey",
  },
});

const UploadPictureCard = ({
  type,
  uri,
  height,
  width,
  description,
  setDescription,
}) => {
  const getDimension = () => {
    const ratio = (windowWidth * 0.95) / width;
    return { width, height: height * ratio };
  };
  return (
    <View style={[styles.imageContainer, { width: "100%" }]}>
      {type === "video" ? (
        <Video
          source={{ uri }}
          shouldPlay
          style={[styles.image, { height: getDimension().height }]}
          isLooping
          isMuted
          usePoster
          resizeMode="contain"
        />
      ) : (
        <Image
          source={{ uri }}
          style={[styles.image, { height: getDimension().height }]}
        />
      )}
      <View style={styles.footer}>
        <TextInput
          placeholder="Description, #tags and @mentions"
          keyboardType="default"
          returnKeyType="done"
          multiline
          value={description}
          blurOnSubmit
          //   onSubmitEditing={() => Keyboard.dismiss()}
          style={styles.titleInput}
          placeholderTextColor="#a0a1a3"
          onChangeText={(text) => setDescription(text)}
        />
      </View>
    </View>
  );
};
export default UploadPictureCard;
