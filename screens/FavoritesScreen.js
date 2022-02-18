import React, { useEffect, useState } from "react";
import {
  RefreshControl,
  View,
  Text,
  FlatList,
  Image,
  Pressable,
} from "react-native";
import { useAuth } from "../utils/Auth";
import PostCard from "../components/PostCard";

const FavoritesScreen = () => {
  const { state } = useAuth();
  const [fav, setFav] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {setRefreshing(false)}, 3000);
  }, []);

  useEffect(() => {
    const userpage = `https://api.imgur.com/3/account/${state.username}`;
    const userfav = `${userpage}/favorites`;

    fetch(userfav, {
      method: "get",
      headers: new Headers({
        Authorization: `Bearer ${state.userToken}`,
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setFav(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  }, []);
  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        data={fav}
        keyExtractor={({ id }, index) => id}
        renderItem={({ item }) => <PostCard item={item} />}
      />
    </View>
  );
};

export default FavoritesScreen;
