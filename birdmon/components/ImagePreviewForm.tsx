import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

interface ImagePreviewFormProps {
  imageUri: string;
  birdName: string;
  location: string;
  isSaving: boolean;
  onBirdNameChange: (name: string) => void;
  onLocationChange: (location: string) => void;
  onSave: () => void;
  onRetake: () => void;
}

export default function ImagePreviewForm({
  imageUri,
  birdName,
  location,
  isSaving,
  onBirdNameChange,
  onLocationChange,
  onSave,
  onRetake,
}: ImagePreviewFormProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.previewCard}>
          <Card.Cover source={{ uri: imageUri }} style={styles.previewImage} />
          <Card.Content style={styles.formContainer}>
            <TextInput
              label="Bird Name *"
              value={birdName}
              onChangeText={onBirdNameChange}
              mode="outlined"
              style={styles.input}
              autoFocus
              returnKeyType="next"
              disabled={isSaving}
            />
            <TextInput
              label="Location (Optional)"
              value={location}
              onChangeText={onLocationChange}
              mode="outlined"
              style={styles.input}
              returnKeyType="done"
              disabled={isSaving}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Fixed button container at bottom */}
      <View
        style={[
          styles.buttonContainer,
          { paddingBottom: Math.max(insets.bottom, 16) + 8 },
        ]}
      >
        <Button
          mode="outlined"
          onPress={onRetake}
          style={styles.button}
          disabled={isSaving}
          icon="camera-retake"
        >
          Retake
        </Button>
        <Button
          mode="contained"
          onPress={onSave}
          style={[styles.button, styles.saveButton]}
          loading={isSaving}
          disabled={isSaving}
          icon="check"
        >
          Save to Collection
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100, // Space for fixed buttons
  },
  previewCard: {
    margin: 16,
    marginBottom: 8,
  },
  previewImage: {
    height: 300,
  },
  formContainer: {
    padding: 16,
  },
  input: {
    marginBottom: 16,
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#e0e0e0",
    gap: 12,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  button: {
    flex: 1,
    minHeight: 48,
  },
  saveButton: {
    //
  },
});
