import { Platform } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useEffect, useState } from "react";

export default function useImagePicker() {
  const [rollHasPermission, setRollHasPermission] = useState();

  useEffect(() => {
    (async = () => {
      const imagePerm = ImagePicker.getMediaLibraryPermissionsAsync();
      setRollHasPermission(imagePerm.status === "granted" ? 1 : -1);
    })();
  }, []);

  const AllowCameraRoll = async () => {
    if (Platform.OS === "ios") {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setRollHasPermission(status === "granted" ? 1 : -1);
    }
  };

  return async () => {
    if (rollHasPermission === -1) await AllowCameraRoll();

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      quality: 1,
      base64: true,
    });
    return result.cancelled ? null : result;
  };
}
