import React, { useEffect, useRef, useState } from 'react';
import {Camera} from 'expo-camera';

export default function useCamera() {
    const [cameraHasPermission, setCameraHasPermission] = useState();
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.back);
    const cameraRef = useRef(null);

    useEffect(() => {
        (async () => {
            const cameraPerm = await Camera.getCameraPermissionsAsync();
            setCameraHasPermission(cameraPerm.status === 'granted' ? 1 : -1);
        })();
    }, []);

    const AllowCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();
        setCameraHasPermission(status === 'granted' ? 1 : -1)
        return status === 'granted' ? 1 : -1;
    };

    const handleCameraType = () => {
        const currentCameraType = cameraType;
        setCameraType(
            currentCameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back,
        );
    };

    const takePicture = async () => {
        if (cameraRef) {
            const photo = await cameraRef.current?.takePictureAsync({ quality: 1, base64: true });
            return photo;
        }
        return undefined;
    };

  return {
    cameraRef,
    cameraHasPermission,
    cameraType,
    takePicture,
    AllowCamera,
    handleCameraType,
  };
}
