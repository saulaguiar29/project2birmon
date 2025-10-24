import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider, Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BirdData } from "../index";
import { useTheme } from "../../contexts/ThemeContext";
import { useFocusEffect } from "expo-router";

interface StatsData {
  totalBirds: number;
  uniqueLocations: number;
  mostCommonLocation: string | null;
  firstCaptureDate: string | null;
  lastCaptureDate: string | null;
  birdsThisMonth: number;
}

export default function Statistics() {
  const { theme } = useTheme();
  const [stats, setStats] = useState<StatsData>({
    totalBirds: 0,
    uniqueLocations: 0,
    mostCommonLocation: null,
    firstCaptureDate: null,
    lastCaptureDate: null,
    birdsThisMonth: 0,
  });

  useFocusEffect(
    React.useCallback(() => {
      loadStats();
    }, [])
  );

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const savedBirds = await AsyncStorage.getItem("birds");
      if (!savedBirds) {
        return;
      }

      const birds: BirdData[] = JSON.parse(savedBirds);

      // Calculate statistics
      const locations = birds
        .map((b) => b.location)
        .filter((loc): loc is string => !!loc);
      const uniqueLocs = new Set(locations);

      // Find most common location
      const locationCounts: Record<string, number> = {};
      locations.forEach((loc) => {
        locationCounts[loc] = (locationCounts[loc] || 0) + 1;
      });

      let mostCommon: string | null = null;
      let maxCount = 0;
      Object.entries(locationCounts).forEach(([loc, count]) => {
        if (count > maxCount) {
          maxCount = count;
          mostCommon = loc;
        }
      });

      // Date calculations
      const dates = birds.map((b) => new Date(b.dateCaptured));
      const sortedDates = dates.sort((a, b) => a.getTime() - b.getTime());

      const currentMonth = new Date().getMonth();
      const currentYear = new Date().getFullYear();
      const birdsThisMonth = birds.filter((b) => {
        const d = new Date(b.dateCaptured);
        return d.getMonth() === currentMonth && d.getFullYear() === currentYear;
      }).length;

      setStats({
        totalBirds: birds.length,
        uniqueLocations: uniqueLocs.size,
        mostCommonLocation: mostCommon,
        firstCaptureDate:
          sortedDates.length > 0 ? sortedDates[0].toLocaleDateString() : null,
        lastCaptureDate:
          sortedDates.length > 0
            ? sortedDates[sortedDates.length - 1].toLocaleDateString()
            : null,
        birdsThisMonth,
      });
    } catch (error) {
      console.error("Error loading stats:", error);
    }
  };

  const StatCard = ({
    title,
    value,
  }: {
    title: string;
    value: string | number;
  }) => (
    <Card
      style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
      elevation={2}
    >
      <Card.Content style={styles.statContent}>
        <Text
          variant="bodyLarge"
          style={[styles.statTitle, { color: theme.colors.onSurfaceVariant }]}
        >
          {title}
        </Text>
        <Text
          variant="displaySmall"
          style={[styles.statValue, { color: theme.colors.primary }]}
        >
          {value}
        </Text>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Card
        style={[styles.section, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Collection Overview
          </Text>
          <Divider style={styles.divider} />

          <View style={styles.statsGrid}>
            <StatCard title="Total Birds" value={stats.totalBirds} />
            <StatCard title="This Month" value={stats.birdsThisMonth} />
            <StatCard title="Locations Visited" value={stats.uniqueLocations} />
          </View>
        </Card.Content>
      </Card>

      <Card
        style={[styles.section, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Capture History
          </Text>
          <Divider style={styles.divider} />

          <View style={styles.detailRow}>
            <Text
              variant="bodyLarge"
              style={[styles.detailLabel, { color: theme.colors.onSurface }]}
            >
              First Capture:
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.detailValue,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {stats.firstCaptureDate || "No captures yet"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              variant="bodyLarge"
              style={[styles.detailLabel, { color: theme.colors.onSurface }]}
            >
              Most Recent:
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.detailValue,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {stats.lastCaptureDate || "No captures yet"}
            </Text>
          </View>

          <View style={styles.detailRow}>
            <Text
              variant="bodyLarge"
              style={[styles.detailLabel, { color: theme.colors.onSurface }]}
            >
              Favorite Location:
            </Text>
            <Text
              variant="bodyLarge"
              style={[
                styles.detailValue,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {stats.mostCommonLocation || "No location data"}
            </Text>
          </View>
        </Card.Content>
      </Card>

      <Card
        style={[styles.section, { backgroundColor: theme.colors.surface }]}
        elevation={1}
      >
        <Card.Content>
          <Text
            variant="titleLarge"
            style={[styles.sectionTitle, { color: theme.colors.primary }]}
          >
            Achievements
          </Text>
          <Divider style={styles.divider} />

          <View style={styles.achievementRow}>
            <Text
              variant="bodyLarge"
              style={[
                styles.achievementText,
                { color: theme.colors.onSurface },
              ]}
            >
              {stats.totalBirds >= 1 ? "✓" : "○"} First Bird Captured
            </Text>
          </View>
          <View style={styles.achievementRow}>
            <Text
              variant="bodyLarge"
              style={[
                styles.achievementText,
                { color: theme.colors.onSurface },
              ]}
            >
              {stats.totalBirds >= 5 ? "✓" : "○"} 5 Birds Collected
            </Text>
          </View>
          <View style={styles.achievementRow}>
            <Text
              variant="bodyLarge"
              style={[
                styles.achievementText,
                { color: theme.colors.onSurface },
              ]}
            >
              {stats.totalBirds >= 10 ? "✓" : "○"} 10 Birds Collected
            </Text>
          </View>
          <View style={styles.achievementRow}>
            <Text
              variant="bodyLarge"
              style={[
                styles.achievementText,
                { color: theme.colors.onSurface },
              ]}
            >
              {stats.uniqueLocations >= 3 ? "✓" : "○"} Explorer (3+ Locations)
            </Text>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    margin: 15,
    marginBottom: 10,
  },
  sectionTitle: {
    fontWeight: "bold",
    marginBottom: 15,
  },
  divider: {
    marginBottom: 15,
  },
  statsGrid: {
    gap: 15,
  },
  statCard: {
    marginBottom: 10,
  },
  statContent: {
    alignItems: "center",
    paddingVertical: 20,
  },
  statTitle: {
    fontSize: 14,
    marginBottom: 8,
  },
  statValue: {
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  detailLabel: {
    fontWeight: "500",
  },
  detailValue: {
    // Dynamic color applied
  },
  achievementRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  achievementText: {
    // Dynamic color applied
  },
});
