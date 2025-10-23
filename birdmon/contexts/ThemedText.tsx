import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  PropsWithChildren,
} from "react";
import {
  Text,
  TextProps,
  TextStyle,
  useColorScheme,
  StyleProp,
} from "react-native";

type Theme = {
  dark: boolean;
  colors: {
    text: string;
    background: string;
    primary: string;
    muted: string;
    [key: string]: string;
  };
};

const LightTheme: Theme = {
  dark: false,
  colors: {
    text: "#111827",
    background: "#FFFFFF",
    primary: "#2563EB",
    muted: "#6B7280",
  },
};

const DarkTheme: Theme = {
  dark: true,
  colors: {
    text: "#F9FAFB",
    background: "#0F172A",
    primary: "#60A5FA",
    muted: "#9CA3AF",
  },
};

type ThemeContextValue = {
  theme: Theme;
  setTheme: (t: Theme) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue>({
  theme: LightTheme,
  // no-op defaults for safe fallback
  setTheme: () => {},
  toggleTheme: () => {},
});

export const ThemeProvider: React.FC<PropsWithChildren<{}>> = ({
  children,
}) => {
  const system = useColorScheme();
  const initial = system === "dark" ? DarkTheme : LightTheme;
  const [theme, setTheme] = useState<Theme>(initial);

  const toggleTheme = () => {
    setTheme((t) => (t.dark ? LightTheme : DarkTheme));
  };

  const value = useMemo(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [theme]
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextValue => useContext(ThemeContext);

export type ThemedTextProps = TextProps & {
  /**
   * Optional override for text color. If not provided the theme text color is used.
   */
  color?: string;
  style?: StyleProp<TextStyle>;
};

export const ThemedText: React.FC<PropsWithChildren<ThemedTextProps>> = ({
  children,
  style,
  color,
  ...rest
}) => {
  const { theme } = useTheme();
  const textColor = color ?? theme.colors.text;

  return (
    <Text {...rest} style={[{ color: textColor }, style]}>
      {children}
    </Text>
  );
};

export default ThemedText;
