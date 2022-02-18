import React, { useState, useEffect } from "react";
import { useAuth } from "../utils/Auth";
import {
  View,
  SafeAreaView,
  ActivityIndicator,
  FlatList,
  Button,
  StyleSheet,
} from "react-native";
// get data from this URL!
import PostCard from "../components/PostCard";
import tailwind from "tailwind-react-native-classnames";

const HomeScreen = () => {
  // managing state with 'useState'
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const { state } = useAuth();

  useEffect(() => {
    refetch("day");
  }, []);

  const refetch = (datequery) => {
    fetch(
      `https://api.imgur.com/3/gallery/hot/viral/${datequery}/1?showViral=true&mature=true&album_previews=true`,
      {
        method: "get",
        headers: new Headers({
          Authorization: `Bearer ${state.userToken}`,
        }),
      }
    )
      .then((response) => response.json())
      .then((json) => {
        setData(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };

  return (
    <>
      <View style={styles.fixToText}>
        <Button style={styles.btnFilter} title="day" onPress={() => refetch("day")} color="#63AD90"/>
        <Button style={styles.btnFilter} title="week" onPress={() => refetch("week")} color="#63AD90"/>
        <Button style={styles.btnFilter} title="year" onPress={() => refetch("year")} color="#63AD90"/>
      </View>
      <SafeAreaView
        style={tailwind`flex flex-col bg-gray-200 rounded shadow-lg`}
      >
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <View style={tailwind``}>
            <FlatList
              data={data}
              keyExtractor={({ id }, index) => id}
              renderItem={({ item }) => <PostCard item={item} />}
            />
          </View>
        )}
      </SafeAreaView>
    </>
  );
};
const styles = StyleSheet.create({
  fixToText: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 15,
  },
  btnFilter: {
    borderRadius: 15,
  }
});
export default HomeScreen;
