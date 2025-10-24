import React from "react";
import ThemedView from "../../contexts/ThemedView";
import ThemedText from "../../contexts/ThemedText";
import { useTheme } from "../../contexts/ThemeContext";
import { ScrollView, StyleSheet, View } from "react-native";
import { Switch, Divider } from "react-native-paper";

export default function Settings() {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedView style={styles.card}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          Appearance
        </ThemedText>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <ThemedText color="onSurface" style={styles.sectionTitle}>
              Dark Mode
            </ThemedText>
            <ThemedText color="onSurfaceVariant" style={styles.settingDesc}>
              {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
            </ThemedText>
          </View>
          <Switch value={isDarkMode} onValueChange={toggleTheme} />
        </View>
      </ThemedView>

      <ThemedView style={styles.card}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          About
        </ThemedText>
        <Divider style={styles.divider} />
        <ThemedText color="onSurface" style={styles.aboutText}>
          BirdMon is your personal bird collection app. Capture, catalog, and
          cherish your bird sightings!
        </ThemedText>
        <ThemedText color="onSurfaceVariant" style={styles.version}>
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
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
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
  settingDesc: {
    fontSize: 14,
  },
  divider: {
    marginBottom: 10,
  },
  aboutText: {
    lineHeight: 22,
  },
  version: {
    marginTop: 10,
  },
});
