import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import ImagePost from "../components/Image";
import { useNavigation } from "@react-navigation/native";
import { Dimensions } from "react-native";
import tw from "tailwind-react-native-classnames";
import Like from '../components/Like';

const PostCard = ({ item }) => {
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;

  return (
    <Pressable
      style={styles.card}
      onPress={() => navigation.navigate("PostScreen", { id: item.id })}
    >
      <ImagePost item={item} />
      <View
        style={{
          width: windowWidth,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <View style={{ marginRight: 30 }}>
          <Text style={styles.title}>
            {item.account_url} : {item.title}
          </Text>
          <Text style={styles.title}>
            🔝 : {item.ups} 🗨️ : {item.comment_count}
          </Text>
        </View>
        <View style={tw`items-end`}>
          <Like item={item}/>
        </View>
      </View>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
    backgroundColor: "white",
  },
  title: {
    padding: 5,
  },
});
export default PostCard;
