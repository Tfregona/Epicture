import { useNavigation } from "@react-navigation/native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import useCamera from "../hooks/useCamera";
import useImagePicker from "../hooks/useImagePicker";
import tailwind from "tailwind-react-native-classnames";

const AddMedia = () => {
  const navigation = useNavigation();
  const { cameraHasPermission, AllowCamera } = useCamera();
  const pickImage = useImagePicker();

  const openCamera = async () => {
    if (cameraHasPermission !== 1) {
      if ((await AllowCamera()) === 1) navigation.navigate("CameraScreen");
    } else navigation.navigate("CameraScreen");
  };

  const openGallery = async () => {
    const res = await pickImage();
    if (res) navigation.navigate("PostDraftScreen", { image: res });
  };

  return (
    <View style={{ alignItems: "center", justifyContent: "center" }}>
      <TouchableOpacity onPress={openCamera}>
        <Text style={tailwind`self-start ml-3 font-bold text-2xl mb-2`}>
          Camera
        </Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={openGallery}>
        <Text style={tailwind`self-start ml-3 font-bold text-2xl mb-2`}>
          Gallery
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default AddMedia;
