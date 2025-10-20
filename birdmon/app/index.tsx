import React, { useState, useEffect } from "react";
import { View, StyleSheet, ScrollView, Alert } from "react-native";
import { Text, FAB, Button } from "react-native-paper";
import { router, useFocusEffect } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import BirdCard from "../components/BirdCard";

export interface BirdData {
  id: string;
  imageUri: string;
  name: string;
  dateCaptured: string;
  location?: string;
}

export default function Index() {
  const [birds, setBirds] = useState<BirdData[]>([]);

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
      pathname: "./card-detail",
      params: { birdData: JSON.stringify(bird) },
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="headlineMedium" style={styles.title}>
          Your BirdMon Collection
        </Text>
        <Text variant="bodyMedium" style={styles.subtitle}>
          {birds.length} Bird{birds.length !== 1 ? "s" : ""} Captured
        </Text>
      </View>

      {birds.length === 0 ? (
        <View style={styles.emptyState}>
          <Text variant="titleLarge" style={styles.emptyTitle}>
            No Birds Yet! 🐦
          </Text>
          <Text variant="bodyLarge" style={styles.emptyText}>
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
        style={styles.fab}
        icon="camera"
        onPress={() => router.push("./camera")}
        label="Capture"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    color: "#4CAF50",
    fontWeight: "bold",
  },
  subtitle: {
    color: "#666",
    marginTop: 5,
  },
  emptyState: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  emptyTitle: {
    color: "#4CAF50",
    textAlign: "center",
    marginBottom: 10,
  },
  emptyText: {
    textAlign: "center",
    color: "#666",
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
    backgroundColor: "#4CAF50",
  },
});
