import { useEffect, useRef, useState, useCallback } from "react";
import { Platform } from "react-native";
import * as MediaLibrary from "expo-media-library";
import * as ExpoCamera from "expo-camera";
const { Camera, FlashMode, VideoQuality } = ExpoCamera as any;
type CameraType = ExpoCamera.CameraType;
type CameraCapturedPicture = ExpoCamera.CameraCapturedPicture;

type Maybe<T> = T | null;

export default function useCamera() {
  const cameraRef = useRef<Maybe<any>>(null);
  const [hasCameraPermission, setHasCameraPermission] = useState<
    boolean | null
  >(null);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState<
    boolean | null
  >(null);
  const [type, setType] = useState<CameraType>("back" as CameraType);
  const [flash, setFlash] = useState<number>(
    FlashMode.off as unknown as number
  );
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    (async () => {
      const cam = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cam.status === "granted");

      // media library permission only needed for saving
      const lib = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(lib.status === "granted");
    })();
  }, []);

  const requestPermissions = useCallback(async () => {
    const cam = await Camera.requestCameraPermissionsAsync();
    setHasCameraPermission(cam.status === "granted");
    const lib = await MediaLibrary.requestPermissionsAsync();
    setHasMediaLibraryPermission(lib.status === "granted");
    return {
      camera: cam.status === "granted",
      mediaLibrary: lib.status === "granted",
    };
  }, []);

  const toggleType = useCallback(() => {
    setType((t) =>
      t === "back" ? ("front" as CameraType) : ("back" as CameraType)
    );
  }, []);

  const toggleFlash = useCallback(() => {
    setFlash((f: number) => {
      switch (f) {
        case FlashMode.off:
          return FlashMode.on;
        case FlashMode.on:
          return FlashMode.auto;
        default:
          return FlashMode.off;
      }
    });
  }, []);

  const takePhoto = useCallback(
    async (saveToLibrary = true): Promise<Maybe<CameraCapturedPicture>> => {
      if (!cameraRef.current) return null;
      try {
        const options = { quality: 0.85, skipProcessing: false } as const;
        const photo = await cameraRef.current.takePictureAsync(options);
        if (saveToLibrary && hasMediaLibraryPermission) {
          try {
            await MediaLibrary.createAssetAsync(photo.uri);
          } catch {
            // ignore save errors
          }
        }
        return photo;
      } catch {
        return null;
      }
    },
    [hasMediaLibraryPermission]
  );

  let currentRecording: Promise<any> | null = null;

  const startRecording = useCallback(
    async (onRecordingFinished?: (result: any) => void) => {
      if (!cameraRef.current || isRecording) return null;
      try {
        setIsRecording(true);
        const promise = cameraRef.current.recordAsync({
          quality: VideoQuality["720p"],
        });
        currentRecording = promise;
        const result = await promise;
        currentRecording = null;
        setIsRecording(false);

        if (hasMediaLibraryPermission) {
          try {
            await MediaLibrary.createAssetAsync(result.uri);
          } catch {
            // ignore
          }
        }

        onRecordingFinished?.(result);
        return result;
      } catch {
        currentRecording = null;
        setIsRecording(false);
        return null;
      }
    },
    [isRecording, hasMediaLibraryPermission]
  );

  const stopRecording = useCallback(() => {
    if (!cameraRef.current || !isRecording) return;
    try {
      cameraRef.current.stopRecording();
    } catch {
      // stop may throw on some platforms; ignore
    }
  }, [isRecording]);

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
    startRecording,
    stopRecording,
    isRecording,
  };
}
