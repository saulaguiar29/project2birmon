import React from "react";
import { View, StyleSheet, ScrollView } from "react-native";
import { Text, Card, Button, Chip } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { BirdData } from "../index";
import { useTheme } from "../../contexts/ThemeContext";

export default function CardDetail() {
  const { birdData } = useLocalSearchParams();
  const { theme } = useTheme();

  if (!birdData || typeof birdData !== "string") {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.onBackground }}>
          Error loading bird data
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          Go Back
        </Button>
      </View>
    );
  }

  let bird: BirdData;
  try {
    bird = JSON.parse(birdData);
  } catch (error) {
    return (
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <Text style={{ color: theme.colors.onBackground }}>
          Invalid bird data format
        </Text>
        <Button
          mode="contained"
          onPress={() => router.back()}
          style={{ marginTop: 20 }}
        >
          Go Back
        </Button>
      </View>
    );
  }

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={5}
      >
        <Card.Cover
          source={{ uri: bird.imageUri }}
          style={styles.image}
          accessible={true}
          accessibilityLabel={`Photo of ${bird.name}`}
        />
        <Card.Content style={styles.content}>
          <View style={styles.header}>
            <Text
              variant="headlineMedium"
              style={[styles.name, { color: theme.colors.primary }]}
            >
              {bird.name}
            </Text>
            <Chip
              icon="calendar"
              style={[
                styles.chip,
                {
                  backgroundColor: theme.colors.primaryContainer,
                },
              ]}
              textStyle={{ color: theme.colors.onPrimaryContainer }}
            >
              {bird.dateCaptured}
            </Chip>
          </View>

          {bird.location && (
            <View style={styles.locationContainer}>
              <Chip
                icon="map-marker"
                style={[
                  styles.locationChip,
                  {
                    backgroundColor: theme.colors.secondaryContainer,
                  },
                ]}
                textStyle={{ color: theme.colors.onSecondaryContainer }}
              >
                {bird.location}
              </Chip>
            </View>
          )}

          <View
            style={[
              styles.statsContainer,
              {
                backgroundColor: theme.colors.surfaceVariant,
                borderColor: theme.colors.outline,
              },
            ]}
          >
            <Text
              variant="titleMedium"
              style={[styles.statsTitle, { color: theme.colors.primary }]}
            >
              BirdMon Stats
            </Text>
            <View style={styles.statRow}>
              <Text
                variant="bodyLarge"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Rarity:
              </Text>
              <Text
                variant="bodyLarge"
                style={[styles.statValue, { color: theme.colors.primary }]}
              >
                ★★★☆☆
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text
                variant="bodyLarge"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Type:
              </Text>
              <Text
                variant="bodyLarge"
                style={[styles.statValue, { color: theme.colors.primary }]}
              >
                Flying
              </Text>
            </View>
            <View style={styles.statRow}>
              <Text
                variant="bodyLarge"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Power:
              </Text>
              <Text
                variant="bodyLarge"
                style={[styles.statValue, { color: theme.colors.primary }]}
              >
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
          style={[styles.backButton, { backgroundColor: theme.colors.primary }]}
          icon="arrow-left"
          accessibilityLabel="Go back to collection"
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
  },
  card: {
    margin: 15,
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
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  chip: {
    marginVertical: 4,
  },
  locationContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  locationChip: {
    marginVertical: 4,
  },
  statsContainer: {
    padding: 15,
    borderRadius: 10,
    borderWidth: 1,
  },
  statsTitle: {
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
  },
  buttonContainer: {
    padding: 15,
    paddingBottom: 30,
  },
  backButton: {
    //
  },
});
