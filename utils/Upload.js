import { useAuth } from "../utils/Auth";
import React, { useState, useEffect } from "react";

const Upload = ({ item }) => {
  const { state } = useAuth();
  const [fav, setFav] = useState([]);
  const [loading, setLoading] = useState(false);

    fetch(`https://api.imgur.com/3/image`, {
      method: "post",
      headers: new Headers({
        Authorization: `Bearer ${state.userToken}`,
        body: {"image" : item.params.image.uri, "type": 'base64'}
      }),
    })
      .then((response) => response.json())
      .then((json) => {
        setFav(json.data);
      })
      .catch((error) => alert(error))
      .finally(() => setLoading(false));
  };


export default Upload;
