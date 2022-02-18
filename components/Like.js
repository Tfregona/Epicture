import { useAuth } from "../utils/Auth";
import Icon from "react-native-vector-icons/Ionicons";
import React, { useState, useEffect } from "react";
import tw from "tailwind-react-native-classnames";

const Like = ({ item }) => {
  const { state } = useAuth();
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(false);

  const favorite = (id) => {
    console.log(id);
    console.log(state.userToken);

    fetch(`https://api.imgur.com/3/image/${id}/favorite`, {
      method: "post",
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
  };
  return (
    <>
      {item.is_album === false ? (
        <>
          {item.favorite === true ? (
            <Icon
              style={tw`absolute`}
              name="ios-heart-sharp"
              size={40}
              onPress={() => favorite(item.id)}
            />
          ) : (
            <Icon
              style={tw`absolute`}
              name="ios-heart-outline"
              size={40}
              onPress={() => favorite(item.id)}
            />
          )}
        </>
      ) : (
        <>
          {item.images[0].favorite === true ? (
            <Icon
              style={tw`absolute`}
              name="ios-heart-sharp"
              size={40}
              onPress={() => favorite(item.images[0].id)}
            />
          ) : (
            <Icon
              style={tw`absolute`}
              name="ios-heart-outline"
              size={40}
              onPress={() => favorite(item.images[0].id)}
            />
          )}
        </>
      )}
    </>
  );
};

export default Like;
