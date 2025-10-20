import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";

export default function RootLayout() {
  return (
    <PaperProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: "#4CAF50",
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "BirdMon Collection" }} />
        <Stack.Screen name="camera" options={{ title: "Capture Bird" }} />
        <Stack.Screen name="card-detail" options={{ title: "Bird Details" }} />
      </Stack>
    </PaperProvider>
  );
}
