import React from "react";
import { StyleSheet, Pressable } from "react-native";
import { Card, Text, Chip } from "react-native-paper";
import { BirdData } from "../app/index";

interface BirdCardProps {
  bird: BirdData;
  onPress: () => void;
}

export default function BirdCard({ bird, onPress }: BirdCardProps) {
  return (
    <Pressable onPress={onPress}>
      <Card style={styles.card} elevation={4}>
        <Card.Cover source={{ uri: bird.imageUri }} style={styles.image} />
        <Card.Content style={styles.content}>
          <Text variant="titleLarge" style={styles.name}>
            {bird.name}
          </Text>
          <Chip icon="calendar" style={styles.chip}>
            {bird.dateCaptured}
          </Chip>
          {bird.location && (
            <Chip icon="map-marker" style={styles.locationChip}>
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
    backgroundColor: "#fff",
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
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chip: {
    marginBottom: 5,
    backgroundColor: "#e8f5e8",
  },
  locationChip: {
    backgroundColor: "#fff3e0",
  },
});
