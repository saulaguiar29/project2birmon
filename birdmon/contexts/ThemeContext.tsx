import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MD3LightTheme, MD3DarkTheme } from "react-native-paper";

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
  theme: typeof MD3LightTheme;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

// Custom themes
const lightTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: "#4CAF50",
    secondary: "#8BC34A",
    background: "#f5f5f5",
    surface: "#ffffff",
    text: "#000000",
  },
};

const darkTheme = {
  ...MD3DarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    primary: "#66BB6A",
    secondary: "#9CCC65",
    background: "#121212",
    surface: "#1E1E1E",
    text: "#FFFFFF",
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
