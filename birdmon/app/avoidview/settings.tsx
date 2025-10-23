import React from "react";
import { ScrollView, StyleSheet, View, Pressable } from "react-native";
import { Switch, Divider, List } from "react-native-paper";
import { router } from "expo-router";
import ThemedView from "../../contexts/ThemedView";
import ThemedText from "../../contexts/ThemedText";
import { useTheme } from "../../contexts/ThemeContext";

export default function Settings() {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      {/* APPEARANCE SECTION */}
      <ThemedView style={styles.card}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          Appearance
        </ThemedText>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText color="onSurface">Dark Mode</ThemedText>
            <ThemedText color="onSurface">
              {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
            </ThemedText>
          </View>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </ThemedView>

      {/* STATISTICS SECTION */}
      <ThemedView style={styles.card}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          Statistics
        </ThemedText>
        <Divider style={styles.divider} />

        <Pressable
          onPress={() => router.push("./statistics")}
          style={({ pressed }) => [
            styles.menuItem,
            pressed && styles.menuItemPressed,
          ]}
        >
          <List.Item
            title="View Statistics"
            description="See your collection stats and insights"
            left={(props) => (
              <List.Icon
                {...props}
                icon="chart-bar"
                color={theme.colors.primary}
              />
            )}
            right={(props) => (
              <List.Icon
                {...props}
                icon="chevron-right"
                color={theme.colors.onSurfaceVariant}
              />
            )}
            titleStyle={{ color: theme.colors.onSurface }}
            descriptionStyle={{ color: theme.colors.onSurfaceVariant }}
          />
        </Pressable>
      </ThemedView>

      {/* ABOUT SECTION */}
      <ThemedView style={styles.card}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          About
        </ThemedText>
        <Divider style={styles.divider} />
        <ThemedText color="onSurface" style={styles.aboutText}>
          BirdMon is your personal bird collection app. Capture, catalog, and
          cherish your bird sightings!
        </ThemedText>
        <ThemedText color="onSurface" style={styles.version}>
          Version 1.0.0
        </ThemedText>
      </ThemedView>
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
  menuItem: {
    borderRadius: 8,
  },
  menuItemPressed: {
    opacity: 0.7,
  },
  aboutText: {
    lineHeight: 22,
  },
  version: {
    marginTop: 10,
  },
});
