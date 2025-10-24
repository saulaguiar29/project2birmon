import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { ThemeProvider, useTheme } from "../contexts/ThemeContext";

function StackNavigator() {
  const { theme } = useTheme();

  return (
    <PaperProvider theme={theme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: theme.colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: "bold",
          },
        }}
      >
        <Stack.Screen name="index" options={{ title: "BirdMon Collection" }} />
        <Stack.Screen name="camera" options={{ title: "Capture Bird" }} />
        <Stack.Screen
          name="avoidview/card-detail"
          options={{ title: "Bird Details" }}
        />
        <Stack.Screen
          name="avoidview/statistics"
          options={{ title: "Statistics" }}
        />
        <Stack.Screen
          name="avoidview/settings"
          options={{ title: "Settings" }}
        />
      </Stack>
    </PaperProvider>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <StackNavigator />
    </ThemeProvider>
  );
}
