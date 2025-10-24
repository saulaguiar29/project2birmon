import React from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Button, TextInput, Card } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useTheme } from "../contexts/ThemeContext";

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
  const { theme } = useTheme();

  return (
    <KeyboardAvoidingView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <Card
          style={[
            styles.previewCard,
            { backgroundColor: theme.colors.surface },
          ]}
        >
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
              outlineColor={theme.colors.outline}
              activeOutlineColor={theme.colors.primary}
              textColor={theme.colors.onSurface}
            />
            <TextInput
              label="Location (Optional)"
              value={location}
              onChangeText={onLocationChange}
              mode="outlined"
              style={styles.input}
              returnKeyType="done"
              disabled={isSaving}
              outlineColor={theme.colors.outline}
              activeOutlineColor={theme.colors.primary}
              textColor={theme.colors.onSurface}
            />
          </Card.Content>
        </Card>
      </ScrollView>

      {/* Fixed button container at bottom - themed */}
      <View
        style={[
          styles.buttonContainer,
          {
            paddingBottom: Math.max(insets.bottom, 16) + 8,
            backgroundColor: theme.colors.surface,
            borderTopColor: theme.colors.outline,
          },
        ]}
      >
        <Button
          mode="outlined"
          onPress={onRetake}
          style={styles.button}
          disabled={isSaving}
          icon="camera-retake"
          textColor={theme.colors.primary}
          buttonColor="transparent"
        >
          Retake
        </Button>
        <Button
          mode="contained"
          onPress={onSave}
          style={[styles.button, { backgroundColor: theme.colors.primary }]}
          loading={isSaving}
          disabled={isSaving}
          icon="check"
          textColor={theme.colors.onPrimary}
        >
          Save to Collection
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // Extra space for fixed buttons + keyboard
    flexGrow: 1,
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
    backgroundColor: "transparent", // Prevent white flash
  },
  buttonContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingTop: 16,
    borderTopWidth: 1,
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
});
