import React from "react";
import { View, StyleSheet } from "react-native";
import { Button } from "react-native-paper";
import { CameraView, CameraType } from "expo-camera";

interface CameraViewComponentProps {
  facing: CameraType;
  cameraRef: React.RefObject<CameraView | null>;
  onToggleFacing: () => void;
  onTakePicture: () => void;
  onPickImage: () => void;
}

export default function CameraViewComponent({
  facing,
  cameraRef,
  onToggleFacing,
  onTakePicture,
  onPickImage,
}: CameraViewComponentProps) {
  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} ref={cameraRef}>
        <View style={styles.cameraButtonContainer}>
          <Button
            mode="contained"
            onPress={onToggleFacing}
            style={styles.cameraButton}
            icon="camera-flip"
            buttonColor="rgba(76, 175, 80, 0.8)"
            textColor="#fff"
          >
            Flip
          </Button>
        </View>
      </CameraView>

      <View style={styles.bottomControls}>
        <Button
          mode="outlined"
          onPress={onPickImage}
          style={styles.controlButton}
          icon="image"
        >
          Import
        </Button>
        <Button
          mode="contained"
          onPress={onTakePicture}
          style={[styles.controlButton, styles.captureButton]}
          icon="camera"
          buttonColor="#4CAF50"
          textColor="#fff"
        >
          Capture
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  camera: {
    flex: 1,
  },
  cameraButtonContainer: {
    position: "absolute",
    top: 20,
    right: 20,
  },
  cameraButton: {
    // buttonColor applied via prop
  },
  bottomControls: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#fff",
  },
  controlButton: {
    flex: 1,
    marginHorizontal: 10,
  },
  captureButton: {
    // buttonColor applied via prop
  },
});
