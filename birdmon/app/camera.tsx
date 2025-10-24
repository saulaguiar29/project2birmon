import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Text, Button, IconButton } from "react-native-paper";
import { CameraType } from "expo-camera";
import { router } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BirdData } from "./index";
import CameraViewComponent from "../components/CameraViewComponent";
import ImagePreviewForm from "../components/ImagePreviewForm";
import { useTheme } from "../contexts/ThemeContext";
import useCamera from "../hooks/useCamera";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Camera() {
  const [facing, setFacing] = useState<CameraType>("back");
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [birdName, setBirdName] = useState("");
  const [location, setLocation] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const { theme } = useTheme();
  const { cameraRef, hasCameraPermission, requestPermissions } = useCamera();
  const insets = useSafeAreaInsets();

  if (hasCameraPermission === null) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={[styles.message, { color: theme.colors.onBackground }]}>
          Loading camera...
        </Text>
      </View>
    );
  }

  if (!hasCameraPermission) {
    return (
      <View
        style={[
          styles.permissionContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <Text style={[styles.message, { color: theme.colors.onBackground }]}>
          We need your permission to show the camera
        </Text>
        <Button
          mode="contained"
          onPress={requestPermissions}
          style={{ backgroundColor: theme.colors.primary, marginTop: 20 }}
        >
          Grant Permission
        </Button>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  const handleGoBack = () => {
    router.back();
  };

  const handleCancelCapture = () => {
    Alert.alert(
      "Discard Photo?",
      "Are you sure you want to discard this photo?",
      [
        { text: "Keep Editing", style: "cancel" },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => {
            setCapturedImage(null);
            setBirdName("");
            setLocation("");
          },
        },
      ]
    );
  };

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
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={100}
      >
        {/* Back button for preview screen */}
        <View style={[styles.previewHeader, { paddingTop: insets.top + 8 }]}>
          <IconButton
            icon="close"
            size={24}
            iconColor={theme.colors.onBackground}
            onPress={handleCancelCapture}
            accessibilityLabel="Cancel and go back"
          />
          <Text
            variant="titleMedium"
            style={{ color: theme.colors.onBackground }}
          >
            Add Bird Details
          </Text>
          <View style={{ width: 48 }} />
        </View>

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
      </KeyboardAvoidingView>
    );
  }

  // Show the camera view - TRULY FULL SCREEN
  return (
    <View style={styles.fullScreenContainer}>
      <StatusBar hidden />

      {/* Back button overlay on camera */}
      <View style={[styles.cameraHeader, { paddingTop: insets.top + 8 }]}>
        <IconButton
          icon="arrow-left"
          size={28}
          iconColor="#fff"
          containerColor="rgba(0, 0, 0, 0.5)"
          onPress={handleGoBack}
          style={styles.backButton}
          accessibilityLabel="Go back to collection"
        />
      </View>

      <CameraViewComponent
        facing={facing}
        cameraRef={cameraRef}
        onToggleFacing={toggleCameraFacing}
        onTakePicture={takePicture}
        onPickImage={pickImage}
        bottomInset={insets.bottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  fullScreenContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#000",
  },
  container: {
    flex: 1,
  },
  permissionContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    paddingHorizontal: 20,
    fontSize: 16,
  },
  cameraHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    flexDirection: "row",
    paddingHorizontal: 8,
  },
  backButton: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  previewHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 8,
    backgroundColor: "transparent",
  },
});
