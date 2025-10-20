import React, { useState, useRef } from "react";
import { View, StyleSheet, Alert } from "react-native";
import { Text, Button } from "react-native-paper";
import { CameraView, CameraType, useCameraPermissions } from "expo-camera";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BirdData } from "./index";
import CameraViewComponent from "../components/CameraViewComponent";
import ImagePreviewForm from "../components/ImagePreviewForm";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [birdName, setBirdName] = useState("");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const cameraRef = useRef<CameraView>(null);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Grant Permission</Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          quality: 0.8,
        });
        if (photo) {
          setCapturedImage(photo.uri);
        }
      } catch (error) {
        console.error("Error taking picture:", error);
        Alert.alert("Error", "Failed to take picture");
      }
    }
  };

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert(
        "Permission needed",
        "We need camera roll permissions to import images"
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [3, 4],
      quality: 0.8,
    });

    if (!result.canceled) {
      setCapturedImage(result.assets[0].uri);
    }
  };

  const saveBird = async () => {
    if (!capturedImage || !birdName.trim()) {
      Alert.alert(
        "Missing Information",
        "Please capture an image and enter a bird name"
      );
      return;
    }

    setIsSaving(true);
    try {
      const newBird: BirdData = {
        id: Date.now().toString(),
        imageUri: capturedImage,
        name: birdName.trim(),
        dateCaptured: new Date().toLocaleDateString(),
        location: location.trim() || undefined,
      };

      // Get existing birds from AsyncStorage
      const existingBirds = await AsyncStorage.getItem("birds");
      const birds = existingBirds ? JSON.parse(existingBirds) : [];
      birds.push(newBird);

      // Save back to AsyncStorage
      await AsyncStorage.setItem("birds", JSON.stringify(birds));

      Alert.alert(
        "Success!",
        `${birdName} has been added to your collection!`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error) {
      console.error("Error saving bird:", error);
      Alert.alert("Error", "Failed to save bird to collection");
    } finally {
      setIsSaving(false);
    }
  };

  const retake = () => {
    setCapturedImage(null);
    setBirdName("");
    setLocation("");
  };

  // Show the image preview form if we have a captured image
  if (capturedImage) {
    return (
      <ImagePreviewForm
        imageUri={capturedImage}
        birdName={birdName}
        location={location}
        isSaving={isSaving}
        onBirdNameChange={setBirdName}
        onLocationChange={setLocation}
        onSave={saveBird}
        onRetake={retake}
      />
    );
  }

  // Show the camera view
  return (
    <View style={styles.container}>
      <CameraViewComponent
        facing={facing}
        cameraRef={cameraRef}
        onToggleFacing={toggleCameraFacing}
        onTakePicture={takePicture}
        onPickImage={pickImage}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
});
