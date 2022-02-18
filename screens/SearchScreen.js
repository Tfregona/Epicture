import React, { useState } from "react";
import { ID } from "@env";
import { View, TextInput, Text, FlatList, StyleSheet } from "react-native";
import IonicIcon from "react-native-vector-icons/Ionicons";
import PostCard from "../components/PostCard";
const SearchScreen = () => {
  const [query, onChangeQuery] = React.useState("");
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const search = () => {
    fetch(`https://api.imgur.com/3/gallery/search?q=${query}`, {
      method: "get",
      headers: new Headers({
        Authorization: `Client-ID ${ID}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
        console.log(ID);
        setIsLoading(false);
      })
      .catch((error) => alert(error))
      .finally(() => setIsLoading(false));
  };
  return (
    <View>
      <View style={styles.fixToText}>
        <TextInput
          onChangeText={onChangeQuery}
          value={query}
          placeholder="Search a post ..."
          onSubmitEditing={search}
        />
        <IonicIcon name={"search"} size={25} color={"black"} onPress={search} />
      </View>
      {isLoading ? (
        <View>
          <Text style={styles.textbold}>Search something !</Text>
        </View>
      ) : (
        <View>
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => <PostCard item={item} />}
          />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
    padding: 15,
    borderRadius: 50,
    backgroundColor: "white",
  },
  textbold: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default SearchScreen;
