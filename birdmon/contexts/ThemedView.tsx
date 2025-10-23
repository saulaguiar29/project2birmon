import React, { ReactNode } from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StatusBar,
  useColorScheme,
  StatusBarStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type ThemedViewProps = {
  children?: ReactNode;
  /**
   * Extra style to apply to the outer container
   */
  style?: ViewStyle | ViewStyle[];
  /**
   * Choose a named background or pass a color string (e.g. '#fff' or 'rgba(0,0,0,0.5)')
   * Supported names: 'background', 'surface', 'card'
   */
  background?: "background" | "surface" | "card" | string;
  /**
   * Force status bar style. Defaults to 'dark-content' for light mode and 'light-content' for dark mode.
   */
  statusBarStyle?: "auto" | "default" | "light-content" | "dark-content";
  /**
   * If true, the inner content will not expand (useful when embedding)
   */
  full?: boolean;
};

/**
 * Simple themed container used across the app.
 * - Uses device color scheme to pick colors.
 * - Accepts a named background or any color string.
 * - Wraps content in SafeAreaView and sets an appropriate StatusBar style.
 */
export default function ThemedView({
  children,
  style,
  background,
  statusBarStyle,
  full = true,
}: ThemedViewProps) {
  const scheme = useColorScheme() ?? "light";
  const isDark = scheme === "dark";

  const light = {
    background: "#FFFFFF",
    surface: "#F6F6F7",
    card: "#FFFFFF",
    text: "#111827",
  };

  const dark = {
    background: "#0B1220",
    surface: "#0F1724",
    card: "#0B1220",
    text: "#E5E7EB",
  };

  const colors = isDark ? dark : light;

  const resolvedBackground =
    background == null
      ? colors.background
      : background === "background" ||
        background === "surface" ||
        background === "card"
      ? (colors as Record<string, string>)[background]
      : background;
  const barStyle: StatusBarStyle =
    statusBarStyle === "auto"
      ? isDark
        ? "light-content"
        : "dark-content"
      : (statusBarStyle as StatusBarStyle) ??
        (isDark ? "light-content" : "dark-content");
  statusBarStyle ??
    (isDark ? ("light-content" as const) : ("dark-content" as const));

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: resolvedBackground }, style]}
    >
      <StatusBar barStyle={barStyle} />
      <View style={[full ? styles.full : undefined]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  full: {
    flex: 1,
  },
});
