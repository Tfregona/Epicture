import React from "react";
import AutoHeightImage from "react-native-auto-height-image";
import { Dimensions } from "react-native";
import { Video } from "expo-av";
import { Text } from "react-native";

const ImagePost = ({ item }) => {
  const windowWidth = Dimensions.get("window").width;
  if (item.is_album === true) {
    if (
      item.images[0].type === "image/jpeg" ||
      item.images[0].type === "image/png"
    ) {
      return (
        <AutoHeightImage
          width={windowWidth}
          source={{
            uri: item.images[0].link,
          }}
        />
      );
    } else if (
      item.images[0].type === "video/mp4" ||
      item.images[0].type === "image/gif"
    ) {
      return (
        <Video
          source={{
            uri: item.images[0].link,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: windowWidth, height: 300 }}
        />
      );
    }
  } else {
    if (item.type === "image/jpeg" || item.type === "image/png") {
      return (
        <AutoHeightImage
          width={windowWidth}
          source={{
            uri: item.link,
          }}
        />
      );
    } else if (item.type === "video/mp4" || item.type === "image/gif") {
      return (
        <Video
          source={{
            uri: item.link,
          }}
          rate={1.0}
          volume={1.0}
          isMuted={false}
          resizeMode="cover"
          shouldPlay
          isLooping
          style={{ width: windowWidth, height: 300 }}
        />
      );
    } else {
        return (
            <Text>No image found 😟</Text>
        )
    }
  }
};

export default ImagePost;
