import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Text, Switch, Divider, Card } from "react-native-paper";
import { useTheme } from "../../contexts/ThemeContext";

export default function Settings() {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Appearance
          </Text>
          <View style={styles.settingRow}>
            <View style={styles.settingInfo}>
              <Text
                variant="bodyLarge"
                style={[styles.settingLabel, { color: theme.colors.onSurface }]}
              >
                Dark Mode
              </Text>
              <Text
                variant="bodyMedium"
                style={[
                  styles.settingDesc,
                  { color: theme.colors.onSurfaceVariant },
                ]}
              >
                {isDarkMode ? "Dark theme enabled" : "Light theme enabled"}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              color={theme.colors.primary}
            />
          </View>
        </Card.Content>
      </Card>

      <Card
        style={[styles.card, { backgroundColor: theme.colors.surface }]}
        elevation={2}
      >
        <Card.Content>
          <Text
            variant="titleMedium"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            About
          </Text>
          <Divider style={styles.divider} />
          <Text
            variant="bodyLarge"
            style={[styles.aboutText, { color: theme.colors.onSurface }]}
          >
            BirdMon is your personal bird collection app. Capture, catalog, and
            cherish your bird sightings!
          </Text>
          <Text
            variant="bodyMedium"
            style={[styles.version, { color: theme.colors.onSurfaceVariant }]}
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
  settingLabel: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 4,
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
