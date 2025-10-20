import React from "react";
import { View, StyleSheet } from "react-native";
import { Button, TextInput, Card } from "react-native-paper";

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
  return (
    <View style={styles.container}>
      <Card style={styles.previewCard}>
        <Card.Cover source={{ uri: imageUri }} style={styles.previewImage} />
        <Card.Content style={styles.formContainer}>
          <TextInput
            label="Bird Name *"
            value={birdName}
            onChangeText={onBirdNameChange}
            mode="outlined"
            style={styles.input}
          />
          <TextInput
            label="Location (Optional)"
            value={location}
            onChangeText={onLocationChange}
            mode="outlined"
            style={styles.input}
          />
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="outlined"
          onPress={onRetake}
          style={styles.button}
          disabled={isSaving}
        >
          Retake
        </Button>
        <Button
          mode="contained"
          onPress={onSave}
          style={styles.button}
          loading={isSaving}
          disabled={isSaving}
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
  previewCard: {
    margin: 15,
    flex: 1,
  },
  previewImage: {
    height: 300,
  },
  formContainer: {
    padding: 15,
  },
  input: {
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    padding: 15,
    gap: 15,
  },
  button: {
    flex: 1,
  },
});
