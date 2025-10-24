import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { BirdData } from "../app/index";
import { useTheme } from "../contexts/ThemeContext";

interface BirdCardProps {
  bird: BirdData;
  onPress: () => void;
}

export default function BirdCard({ bird, onPress }: BirdCardProps) {
  const { theme } = useTheme();

  return (
    <Pressable onPress={onPress}>
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={4}
      >
        <Card.Cover
          source={{ uri: bird.imageUri }}
          style={styles.image}
          accessible={true}
          accessibilityLabel={`Photo of ${bird.name}`}
        />
        <Card.Content style={styles.content}>
          <Text
            variant="titleLarge"
            style={[styles.name, { color: theme.colors.primary }]}
          >
            {bird.name}
          </Text>
          <Chip
            icon="calendar"
            style={[
              styles.chip,
              { backgroundColor: theme.colors.primaryContainer },
            ]}
            textStyle={{ color: theme.colors.onPrimaryContainer }}
          >
            {bird.dateCaptured}
          </Chip>
          {bird.location && (
            <Chip
              icon="map-marker"
              style={[
                styles.locationChip,
                { backgroundColor: theme.colors.secondaryContainer },
              ]}
              textStyle={{ color: theme.colors.onSecondaryContainer }}
            >
              {bird.location}
            </Chip>
          )}
        </Card.Content>
      </Card>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 15,
  },
  image: {
    height: 200,
  },
  content: {
    padding: 15,
    alignItems: "center",
  },
  name: {
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chip: {
    marginBottom: 5,
  },
  locationChip: {
    // backgroundColor applied dynamically
  },
});
