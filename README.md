# BirdMon - Your Personal Bird Collection App

## Application Description

BirdMon is a mobile app that allows bird enthusiasts to capture, catalog, and manage their bird sightings in a fun way. Inspired by card games, BirdMon transforms bird watching into an engaging experience where each bird you photograph becomes part of your personal collection.

Users can use their device's camera to capture photos of birds they encounter, add names and location information and collect them like cards. The app includes stats and information for each bird, as well as a settings page to manage themes and see statistics about your bird-watching.

Key features include:

- **Camera Integration**: Capture birds using your device's camera or import photos from your gallery
- **Persistent Storage**: All your bird data is saved locally on your device using AsyncStorage
- **Dark Mode**: Toggle between light and dark themes based on your preference
- **Statistics Tracking**: Monitor your collection growth, favorite locations, and capture dates
- **Card-Based UI**:vInteractive cards displaying your bird collection
- **Detailed Views**: Tap any bird to see details and stats

## Human Interface Guidelines Implementation

### Platform Conventions and User Expectations

BirdMon implements several iOS and Android Human Interface Guidelines principles:

**iOS HIG - Touch Targets (44x44 points minimum):**

- All interactive buttons meet the 44x44pt minimum touch target size. For example, the IconButtons in the header (settings and statistics icons) are set to 24pt icon size with adequate padding to reach the 44pt target.
- The Floating Action Button (FAB) for camera capture is 56x56pt, exceeding the minimum requirement.
- All TextInput fields have sufficient height (48pt) for comfortable interaction.

**iOS HIG - Navigation:**

- The app uses expo-router's Stack navigation which provides the standard iOS back button with "< Back" text in the navigation bar.
- Navigation hierarchy is clear: Collection → Camera/Settings/Statistics, with each screen having a clear back path.

**iOS HIG - Feedback:**

- Button presses provide visual feedback through opacity changes (0.7 opacity when pressed).
- Loading states are shown with spinners when saving birds to storage.
- Alert dialogs confirm destructive actions (clearing collection) before execution, following the HIG principle of "Ask permission before deleting user data."

**Android Material Design - Touch Targets (48x48 dp minimum):**

- All buttons and interactive elements meet the 48dp minimum touch target.
- Cards have 8dp elevation for visual hierarchy.
- The FAB follows Material Design placement guidelines (16dp margin from edges).

**Android Material Design - Typography:**

- Uses Material Design 3 type scale with proper hierarchy (headlineMedium, titleLarge, bodyMedium).
- Text automatically scales based on user accessibility settings.

**Cross-Platform - Color Contrast (WCAG AA):**

- Primary green (#4CAF50) provides 4.5:1 contrast ratio against white backgrounds.
- Dark mode uses lighter green (#66BB6A) to maintain contrast on dark backgrounds.
- All text meets WCAG AA standards for readability.

**iOS HIG - Keyboard Management:**

- Camera screen uses KeyboardAvoidingView to prevent the keyboard from obscuring input fields.
- Follows iOS behavior with "padding" and Android with "height" strategies.

**iOS HIG & Material Design - Visual Hierarchy:**

- Card-based layout provides clear content grouping.
- Proper spacing and padding (15-20px) creates visual breathing room.
- Icons consistently accompany text labels for better scannability.

![Card Prototype](./cardprototype.png)
