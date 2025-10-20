import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, Switch, Card, Divider, Button, List } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTheme } from "../contexts/ThemeContext";
import { useFocusEffect } from "expo-router";

interface AppStatistics {
  totalBirdsCaptured: number;
  firstCaptureDate: string | null;
  lastCaptureDate: string | null;
  mostCommonLocation: string | null;
}

export default function Settings() {
  const { isDarkMode, toggleTheme, theme } = useTheme();
  const [statistics, setStatistics] = useState<AppStatistics>({
    totalBirdsCaptured: 0,
    firstCaptureDate: null,
    lastCaptureDate: null,
    mostCommonLocation: null,
  });

  // Load statistics when screen first opens
  useEffect(() => {
    loadStatistics();
  }, []);

  // Reload statistics every time user navigates to this screen
  useFocusEffect(
    React.useCallback(() => {
      loadStatistics();
    }, [])
  );

  const loadStatistics = async () => {
    try {
      const savedBirds = await AsyncStorage.getItem("birds");

      // If no birds saved yet, keep default empty statistics
      if (!savedBirds) {
        setStatistics({
          totalBirdsCaptured: 0,
          firstCaptureDate: null,
          lastCaptureDate: null,
          mostCommonLocation: null,
        });
        return;
      }

      const birds = JSON.parse(savedBirds);

      // Calculate statistics only if we have birds
      if (birds.length === 0) {
        setStatistics({
          totalBirdsCaptured: 0,
          firstCaptureDate: null,
          lastCaptureDate: null,
          mostCommonLocation: null,
        });
        return;
      }

      const total = birds.length;
      const firstDate = birds[0].dateCaptured;
      const lastDate = birds[birds.length - 1].dateCaptured;

      // Find most common location
      const locationCounts: { [key: string]: number } = {};
      birds.forEach((bird: any) => {
        if (bird.location) {
          locationCounts[bird.location] =
            (locationCounts[bird.location] || 0) + 1;
        }
      });

      // Get the location with the highest count
      const mostCommon =
        Object.keys(locationCounts).length > 0
          ? Object.keys(locationCounts).reduce((a, b) =>
              locationCounts[a] > locationCounts[b] ? a : b
            )
          : null;

      setStatistics({
        totalBirdsCaptured: total,
        firstCaptureDate: firstDate,
        lastCaptureDate: lastDate,
        mostCommonLocation: mostCommon,
      });
    } catch (error) {
      console.error("Error loading statistics:", error);
      Alert.alert("Error", "Failed to load statistics");
    }
  };

  const resetStatistics = () => {
    Alert.alert(
      "Reset Statistics",
      "This will clear all your captured birds. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Reset",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("birds");
              setStatistics({
                totalBirdsCaptured: 0,
                firstCaptureDate: null,
                lastCaptureDate: null,
                mostCommonLocation: null,
              });
              Alert.alert("Success", "Statistics have been reset");
            } catch (error) {
              console.error("Error resetting statistics:", error);
              Alert.alert("Error", "Failed to reset statistics");
            }
          },
        },
      ]
    );
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* APPEARANCE SECTION */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Appearance
          </Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text
                variant="bodyLarge"
                style={{ color: theme.colors.onSurface }}
              >
                Dark Mode
              </Text>
              <Text
                variant="bodySmall"
                style={{ color: theme.colors.onSurfaceVariant }}
              >
                Toggle between light and dark theme
              </Text>
            </View>
            <Switch value={isDarkMode} onValueChange={toggleTheme} />
          </View>
        </Card.Content>
      </Card>

      {/* STATISTICS SECTION */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Statistics
          </Text>
          <Divider style={styles.divider} />

          {/* Show message if no birds yet */}
          {statistics.totalBirdsCaptured === 0 ? (
            <Text
              variant="bodyMedium"
              style={{
                color: theme.colors.onSurfaceVariant,
                textAlign: "center",
                paddingVertical: 20,
              }}
            >
              No birds captured yet! Start your collection to see statistics.
            </Text>
          ) : (
            <>
              <List.Item
                title="Total Birds Captured"
                description={statistics.totalBirdsCaptured.toString()}
                left={(props) => (
                  <List.Icon
                    {...props}
                    icon="bird"
                    color={theme.colors.primary}
                  />
                )}
                titleStyle={{ color: theme.colors.onSurface }}
                descriptionStyle={{
                  color: theme.colors.primary,
                  fontWeight: "bold",
                  fontSize: 18,
                }}
              />

              {statistics.firstCaptureDate && (
                <List.Item
                  title="First Capture"
                  description={statistics.firstCaptureDate}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="calendar-star"
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                />
              )}

              {statistics.lastCaptureDate && (
                <List.Item
                  title="Last Capture"
                  description={statistics.lastCaptureDate}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="calendar-check"
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                />
              )}

              {statistics.mostCommonLocation && (
                <List.Item
                  title="Favorite Location"
                  description={statistics.mostCommonLocation}
                  left={(props) => (
                    <List.Icon
                      {...props}
                      icon="map-marker-star"
                      color={theme.colors.primary}
                    />
                  )}
                  titleStyle={{ color: theme.colors.onSurface }}
                  descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
                />
              )}
            </>
          )}

          {/* Only show reset button if there are birds */}
          {statistics.totalBirdsCaptured > 0 && (
            <Button
              mode="outlined"
              onPress={resetStatistics}
              style={styles.resetButton}
              textColor="#f44336"
            >
              Reset All Data
            </Button>
          )}
        </Card.Content>
      </Card>

      {/* ABOUT SECTION */}
      <Card style={[styles.card, { backgroundColor: theme.colors.surface }]}>
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            About
          </Text>
          <Divider style={styles.divider} />
          <Text
            variant="bodyMedium"
            style={[styles.aboutText, { color: theme.colors.onSurface }]}
          >
            BirdMon is your personal bird collection app. Capture, catalog, and
            cherish your bird sightings!
          </Text>
          <Text
            variant="bodySmall"
            style={{ color: theme.colors.onSurfaceVariant, marginTop: 10 }}
          >
            Version 1.0.0
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    margin: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  settingRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
  },
  settingInfo: {
    flex: 1,
    marginRight: 15,
  },
  divider: {
    marginBottom: 10,
  },
  resetButton: {
    marginTop: 20,
    borderColor: "#f44336",
  },
  aboutText: {
    lineHeight: 22,
  },
});
