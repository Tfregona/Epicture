import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, FlatList, ScrollView } from "react-native";
import ImagePost from "../components/Image";

const PostScreen = ({ route }) => {
  const { id } = route.params;
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const posturl = `https://api.imgur.com/3/gallery/${id}`;

    fetch(posturl, {
      method: "get",
      headers: new Headers({
        Authorization: "Client-ID 391147f7e8c47f6",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));

    fetch(posturl + "/comments", {
      method: "get",
      headers: new Headers({
        Authorization: "Client-ID 391147f7e8c47f6",
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setComments(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);
  const getHeader = () => {
    return (
      <>
        <View style={styles.card}>
          <ImagePost item={data} />
          <Text style={styles.text}>
            {data.account_url} : {data.title}
          </Text>
        </View>
        <Text style={styles.textbold}>Comments :</Text>
      </>
    );
  };

  const getFooter = () => {
    return <Text></Text>;
  };

  return (
    <>
      {isLoading ? (
        <Text>loading ...</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <View style={styles.comment}>
              <Text style={styles.textbold}>{item.author} : </Text>
              <Text style={styles.text}>{item.comment}</Text>
            </View>
          )}
          ListHeaderComponent={getHeader}
          ListFooterComponent={getFooter}
        />
      )}
    </>
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
  comment: {
    margin: 5,
    padding: 5,
    borderRadius: 5,
    backgroundColor: "white",
  },
  textbold: {
    fontSize: 15,
    fontWeight: "bold",
  },
  text: {
    fontSize: 15,
  },
});
export default PostScreen;
