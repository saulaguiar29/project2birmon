import { useEffect, useRef, useState, useCallback } from "react";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import * as MediaLibrary from "expo-media-library";

type Maybe<T> = T | null;

export default function useCamera() {
  const cameraRef = useRef<Maybe<CameraView>>(null);
  const [cameraPermission, requestCameraPermission] = useCameraPermissions();
  const [mediaPermission, requestMediaPermission] =
    MediaLibrary.usePermissions();

  const [type, setType] = useState<CameraType>("back");
  const [flash, setFlash] = useState<"off" | "on">("off");

  // Simplified permission state for backward compatibility
  const hasCameraPermission = cameraPermission?.granted ?? null;
  const hasMediaLibraryPermission = mediaPermission?.granted ?? null;

  const requestPermissions = useCallback(async () => {
    const cam = await requestCameraPermission();
    const lib = await requestMediaPermission();

    return {
      camera: cam.granted,
      mediaLibrary: lib.granted,
    };
  }, [requestCameraPermission, requestMediaPermission]);

  const toggleType = useCallback(() => {
    setType((t) => (t === "back" ? "front" : "back"));
  }, []);

  const toggleFlash = useCallback(() => {
    setFlash((f) => (f === "off" ? "on" : "off"));
  }, []);

  const takePhoto = useCallback(
    async (saveToLibrary = true) => {
      if (!cameraRef.current) return null;

      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.85,
        });

        if (photo && saveToLibrary && hasMediaLibraryPermission) {
          try {
            await MediaLibrary.createAssetAsync(photo.uri);
          } catch (error) {
            console.warn("Failed to save to media library:", error);
          }
        }

        return photo;
      } catch (error) {
        console.error("Failed to take photo:", error);
        return null;
      }
    },
    [hasMediaLibraryPermission]
  );

  return {
    cameraRef,
    hasCameraPermission,
    hasMediaLibraryPermission,
    requestPermissions,
    type,
    setType,
    toggleType,
    flash,
    setFlash,
    toggleFlash,
    takePhoto,
  };
}
