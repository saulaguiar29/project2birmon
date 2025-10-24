import React, { useState, useEffect } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Card, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BirdData } from "../index";
import ThemedView from "../../contexts/ThemedView";
import ThemedText from "../../contexts/ThemedText";
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
    icon,
  }: {
    title: string;
    value: string | number;
    icon: string;
  }) => (
    <Card
      style={[styles.statCard, { backgroundColor: theme.colors.surface }]}
      elevation={2}
    >
      <Card.Content style={styles.statContent}>
        <ThemedText color="onSurfaceVariant" style={styles.statTitle}>
          {title}
        </ThemedText>
        <ThemedText color="primary" style={styles.statValue}>
          {value}
        </ThemedText>
      </Card.Content>
    </Card>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <ThemedView style={styles.section}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          Collection Overview
        </ThemedText>
        <Divider style={styles.divider} />

        <View style={styles.statsGrid}>
          <StatCard title="Total Birds" value={stats.totalBirds} icon="bird" />
          <StatCard
            title="This Month"
            value={stats.birdsThisMonth}
            icon="calendar"
          />
          <StatCard
            title="Locations Visited"
            value={stats.uniqueLocations}
            icon="map-marker"
          />
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          Capture History
        </ThemedText>
        <Divider style={styles.divider} />

        <View style={styles.detailRow}>
          <ThemedText color="onSurface" style={styles.detailLabel}>
            First Capture:
          </ThemedText>
          <ThemedText color="onSurfaceVariant" style={styles.detailValue}>
            {stats.firstCaptureDate || "No captures yet"}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText color="onSurface" style={styles.detailLabel}>
            Most Recent:
          </ThemedText>
          <ThemedText color="onSurfaceVariant" style={styles.detailValue}>
            {stats.lastCaptureDate || "No captures yet"}
          </ThemedText>
        </View>

        <View style={styles.detailRow}>
          <ThemedText color="onSurface" style={styles.detailLabel}>
            Favorite Location:
          </ThemedText>
          <ThemedText color="onSurfaceVariant" style={styles.detailValue}>
            {stats.mostCommonLocation || "No location data"}
          </ThemedText>
        </View>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText color="primary" style={styles.sectionTitle}>
          Achievements
        </ThemedText>
        <Divider style={styles.divider} />

        <View style={styles.achievementRow}>
          <ThemedText color="onSurface" style={styles.achievementText}>
            {stats.totalBirds >= 1 ? "✓" : "○"} First Bird Captured
          </ThemedText>
        </View>
        <View style={styles.achievementRow}>
          <ThemedText color="onSurface" style={styles.achievementText}>
            {stats.totalBirds >= 5 ? "✓" : "○"} 5 Birds Collected
          </ThemedText>
        </View>
        <View style={styles.achievementRow}>
          <ThemedText color="onSurface" style={styles.achievementText}>
            {stats.totalBirds >= 10 ? "✓" : "○"} 10 Birds Collected
          </ThemedText>
        </View>
        <View style={styles.achievementRow}>
          <ThemedText color="onSurface" style={styles.achievementText}>
            {stats.uniqueLocations >= 3 ? "✓" : "○"} Explorer (3+ Locations)
          </ThemedText>
        </View>
      </ThemedView>
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
    fontSize: 18,
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
    fontSize: 32,
    fontWeight: "bold",
  },
  detailRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  detailLabel: {
    fontSize: 16,
    fontWeight: "500",
  },
  detailValue: {
    fontSize: 16,
  },
  achievementRow: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  achievementText: {
    fontSize: 16,
  },
});
