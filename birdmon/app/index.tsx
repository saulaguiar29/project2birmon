import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, FAB, Button, IconButton } from "react-native-paper";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BirdCard from "../components/BirdCard";
import { useTheme } from "../contexts/ThemeContext";

export interface BirdData {
  id: string;
  imageUri: string;
  name: string;
  dateCaptured: string;
  location?: string;
}

export default function Index() {
  const [birds, setBirds] = useState<BirdData[]>([]);
  const { theme } = useTheme();

  useEffect(() => {
    loadBirds();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      loadBirds();
    }, [])
  );

  const loadBirds = async () => {
    try {
      const savedBirds = await AsyncStorage.getItem("birds");
      if (savedBirds) {
        setBirds(JSON.parse(savedBirds));
      }
    } catch (error) {
      console.error("Error loading birds:", error);
    }
  };

  const clearCollection = () => {
    Alert.alert(
      "Clear Collection",
      "Are you sure you want to delete all birds?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("birds");
              setBirds([]);
            } catch (error) {
              console.error("Error clearing birds:", error);
            }
          },
        },
      ]
    );
  };

  const handleCardPress = (bird: BirdData) => {
    router.push({
      pathname: "./avoidview/card-detail",
      params: { birdData: JSON.stringify(bird) },
    });
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={[styles.header, { backgroundColor: theme.colors.surface }]}>
        <View style={styles.headerContent}>
          <View style={styles.titleContainer}>
            <Text
              variant="headlineMedium"
              style={[styles.title, { color: theme.colors.primary }]}
              numberOfLines={1}
            >
              Your BirdMon Collection
            </Text>
            <Text
              variant="bodyMedium"
              style={[
                styles.subtitle,
                { color: theme.colors.onSurfaceVariant },
              ]}
            >
              {birds.length} Bird{birds.length !== 1 ? "s" : ""} Captured
            </Text>
          </View>
          <View style={styles.headerButtons}>
            <IconButton
              icon="chart-bar"
              size={24}
              onPress={() => router.push("./avoidview/statistics")}
              iconColor={theme.colors.primary}
              style={styles.headerButton}
              accessibilityLabel="View statistics"
            />
            <IconButton
              icon="cog"
              size={24}
              onPress={() => router.push("./avoidview/settings")}
              iconColor={theme.colors.primary}
              style={styles.headerButton}
              accessibilityLabel="Open settings"
            />
          </View>
        </View>
      </View>

      {birds.length === 0 ? (
        <View style={styles.emptyState}>
          <Text
            variant="titleLarge"
            style={[styles.emptyTitle, { color: theme.colors.primary }]}
          >
            No Birds Yet! 🐦
          </Text>
          <Text
            variant="bodyLarge"
            style={[styles.emptyText, { color: theme.colors.onSurfaceVariant }]}
          >
            Start your collection by capturing your first bird
          </Text>
        </View>
      ) : (
        <>
          <ScrollView
            style={styles.scrollView}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.cardsContainer}>
              {birds.map((bird) => (
                <BirdCard
                  key={bird.id}
                  bird={bird}
                  onPress={() => handleCardPress(bird)}
                />
              ))}
            </View>
          </ScrollView>

          <View style={styles.clearButtonContainer}>
            <Button
              mode="outlined"
              onPress={clearCollection}
              textColor="#f44336"
              style={styles.clearButton}
            >
              Clear Collection
            </Button>
          </View>
        </>
      )}

      <FAB
        style={[styles.fab, { backgroundColor: theme.colors.primary }]}
        icon="camera"
        onPress={() => router.push("./camera")}
        label="Capture"
        color="#fff"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  headerContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleContainer: {
    flex: 1,
    marginRight: 12, // FIXED: Increased from 8 to 12 for more breathing room
    minWidth: 0, // FIXED: Allows text to shrink and ellipsize
  },
  headerButtons: {
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0, // FIXED: Prevents buttons from shrinking
  },
  headerButton: {
    margin: 0, // FIXED: Changed from marginLeft to margin for consistency
  },
  title: {
    fontWeight: "bold",
    // FIXED: Text will now ellipsize with ... if too long
  },
  subtitle: {
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
  },
  scrollView: {
    flex: 1,
  },
  cardsContainer: {
    padding: 15,
    gap: 15,
  },
  clearButtonContainer: {
    padding: 15,
    paddingBottom: 100,
  },
  clearButton: {
    borderColor: "#f44336",
  },
  fab: {
    position: "absolute",
    margin: 16,
    right: 0,
    bottom: 0,
  },
});
