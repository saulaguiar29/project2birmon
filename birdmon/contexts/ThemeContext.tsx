import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof MD3LightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom light theme
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#4CAF50",
    onPrimary: "#FFFFFF",
    primaryContainer: "#C8E6C9",
    onPrimaryContainer: "#1B5E20",
    secondary: "#8BC34A",
    onSecondary: "#FFFFFF",
    secondaryContainer: "#DCEDC8",
    onSecondaryContainer: "#33691E",
    background: "#F5F5F5",
    onBackground: "#1A1A1A",
    surface: "#FFFFFF",
    onSurface: "#1A1A1A",
    surfaceVariant: "#F5F5F5",
    onSurfaceVariant: "#424242",
    outline: "#E0E0E0",
  },
};

// Custom dark theme with better contrast
const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#81C784",
    onPrimary: "#1B5E20",
    primaryContainer: "#2E7D32",
    onPrimaryContainer: "#E8F5E9",
    secondary: "#AED581",
    onSecondary: "#33691E",
    secondaryContainer: "#558B2F",
    onSecondaryContainer: "#F1F8E9",
    background: "#121212",
    onBackground: "#E0E0E0",
    surface: "#1E1E1E",
    onSurface: "#E0E0E0",
    surfaceVariant: "#2C2C2C",
    onSurfaceVariant: "#BDBDBD",
    outline: "#424242",
  },
};

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem("themePreference");
      if (savedTheme !== null) {
        setIsDarkMode(savedTheme === "dark");
      }
    } catch (error) {
      console.error("Error loading theme preference:", error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem(
        "themePreference",
        newTheme ? "dark" : "light"
      );
    } catch (error) {
      console.error("Error saving theme preference:", error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme, theme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
