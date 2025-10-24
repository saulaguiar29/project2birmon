import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { BirdData } from "../index"; // FIXED: Changed from "./index" to "../index"

export default function CardDetail() {
  const { birdData } = useLocalSearchParams();

  if (!birdData || typeof birdData !== "string") {
    return (
      <View style={styles.container}>
        <Text>Error loading bird data</Text>
      </View>
    );
  }

  const bird: BirdData = JSON.parse(birdData);

  return (
    <ScrollView style={styles.container}>
      <Card style={styles.card} elevation={5}>
        <Card.Cover source={{ uri: bird.imageUri }} style={styles.image} />
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Text variant="headlineMedium" style={styles.name}>
              {bird.name}
            </Text>
            <Chip icon="calendar" style={styles.chip}>
              {bird.dateCaptured}
            </Chip>
          </View>

          {bird.location && (
            <View style={styles.locationContainer}>
              <Chip icon="map-marker" style={styles.locationChip}>
                {bird.location}
              </Chip>
            </View>
          )}

          <View style={styles.statsContainer}>
            <Text variant="titleMedium" style={styles.statsTitle}>
              BirdMon Stats
            </Text>
            <View style={styles.statRow}>
              <Text variant="bodyLarge">Rarity:</Text>
              <Text variant="bodyLarge" style={styles.statValue}>
                ★★★☆☆
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text variant="bodyLarge">Type:</Text>
              <Text variant="bodyLarge" style={styles.statValue}>
                Flying
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text variant="bodyLarge">Power:</Text>
              <Text variant="bodyLarge" style={styles.statValue}>
                {Math.floor(Math.random() * 100) + 50}
              </Text>
            </View>
          </View>
        </Card.Content>
      </Card>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={styles.backButton}
          icon="arrow-left"
        >
          Back to Collection
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  card: {
    margin: 15,
    backgroundColor: "#fff",
  },
  image: {
    height: 400,
  },
  content: {
    padding: 20,
  },
  header: {
    alignItems: "center",
    marginBottom: 15,
  },
  name: {
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chip: {
    backgroundColor: "#e8f5e8",
  },
  locationContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  locationChip: {
    backgroundColor: "#fff3e0",
  },
  statsContainer: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 10,
  },
  statsTitle: {
    color: "#4CAF50",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  statRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  statValue: {
    fontWeight: "bold",
    color: "#4CAF50",
  },
  buttonContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  backButton: {
    backgroundColor: "#4CAF50",
  },
});
