import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { CameraView, CameraType } from "expo-camera";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

interface CameraViewComponentProps {
  facing: CameraType;
  cameraRef: React.RefObject<CameraView | null>;
  onToggleFacing: () => void;
  onTakePicture: () => void;
  onPickImage: () => void;
  bottomInset?: number;
}

export default function CameraViewComponent({
  facing,
  cameraRef,
  onToggleFacing,
  onTakePicture,
  onPickImage,
  bottomInset = 0,
}: CameraViewComponentProps) {
  const insets = useSafeAreaInsets();
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {/* Camera takes all available space */}
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        {/* Flip button - positioned from top with safe area */}
        <View style={[styles.flipButtonContainer, { top: insets.top + 16 }]}>
          <IconButton
            icon="camera-flip"
            mode="contained"
            size={24}
            iconColor="#fff"
            containerColor="rgba(76, 175, 80, 0.9)"
            onPress={onToggleFacing}
            style={styles.flipButton}
          />
        </View>
      </CameraView>

      {/* Bottom controls - themed for dark mode */}
      <View
        style={[
          styles.bottomControls,
          {
            paddingBottom: Math.max(bottomInset, 16) + 8,
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
          },
        ]}
      >
        {/* Import button with label */}
        <View style={styles.buttonContainer}>
          <IconButton
            icon="image"
            mode="contained"
            size={28}
            iconColor="#fff"
            containerColor="rgba(76, 175, 80, 0.8)"
            onPress={onPickImage}
            style={styles.controlButton}
          />
          <Text style={[styles.buttonLabel, { color: theme.colors.onSurface }]}>
            Import
          </Text>
        </View>

        {/* Capture button - larger and prominent */}
        <View style={styles.buttonContainer}>
          <IconButton
            icon="camera"
            mode="contained"
            size={36}
            iconColor="#fff"
            containerColor={theme.colors.primary}
            onPress={onTakePicture}
            style={styles.captureButton}
          />
          <Text
            style={[
              styles.buttonLabel,
              styles.captureLabel,
              { color: theme.colors.primary },
            ]}
          >
            Capture
          </Text>
        </View>

        {/* Empty space for balance */}
        <View style={styles.buttonContainer}>
          {/* Invisible spacer for symmetry */}
          <View style={styles.spacer} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    backgroundColor: "#000",
  },
  camera: {
    flex: 1,
    width: "100%",
  },
  flipButtonContainer: {
    position: "absolute",
    right: 16,
    zIndex: 10,
  },
  flipButton: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  bottomControls: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingHorizontal: 24,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  buttonContainer: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },
  controlButton: {
    margin: 0,
    elevation: 2,
  },
  captureButton: {
    margin: 0,
    elevation: 4,
  },
  buttonLabel: {
    marginTop: 4,
    fontSize: 12,
    fontWeight: "500",
  },
  captureLabel: {
    fontWeight: "600",
    fontSize: 13,
  },
  spacer: {
    width: 56,
    height: 56,
  },
});
