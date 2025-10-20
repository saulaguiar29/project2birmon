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

BirdMon follows iOS and Android Human Interface Guidelines by implementing platform-appropriate navigation patterns and interaction paradigms. The app uses expo-router's Stack navigation, which automatically adapts to each platform's navigation conventions - showing a back button on iOS and a hamburger menu/back arrow on Android. All interactive elements follow platform-specific touch target sizes (minimum 44x44 points on iOS, 48x48 dp on Android) to ensure accessibility and ease of use. The app uses React Native Paper's Material Design components providing consistent predictable interactions that users expect from modern mobile applications.

The color scheme is a green theme that helps give it a nature look while maintaining contrast ratios for text readability (following WCAG AA standards). Typography is implemented with React Native Paper's variant system. It automatically scales text appropriately for both platforms and respects user accessibility settings like dynamic type on iOS. The card-based layout provides clear visual hierarchy and makes it easy to scan through collections at a glance.

### Feedback and Responsive Design

Every user interaction in BirdMon provides visual and haptic feedback. When users press buttons, they see visual state changes like an opacity change. The camera capture flow includes loading states like a spinner when saving birds to storage, helping in indicating that its being completed. Alert dialogs confirm deleting actions (like clearing the collection or resetting data) before executing them, providing clear exits and preventing accidental data loss.

There is a theme toggle in settings provides visual feedback, transforming the entire app's appearance when pressed. The responsiveness reinforces the user's sense of control and makes the app feel fast and fluid. Error states are handled with user-friendly alert messages. The Floating Action Button for capturing birds remains consistently positioned in the bottom-right corner across all screens where it's relevant, following Material Design guidelines for primary actions. Images load with proper aspect ratios and error handling, this helps ensure the interface never breaks even with poor network conditions or corrupted image data.

### Data Persistence and Context Usage

BirdMon implements proper data architecture using React Context for theme management and AsyncStorage for persistent data storage. The ThemeContext provides a clean, centralized way to manage dark mode preferences throughout the entire application. The theme preference is stored in AsyncStorage and persists across app launches, ensuring users' preferences are remembered.

The app stores two types of data: bird collection data ( images, names, dates, and locations) and application statistics (total captures, first/last capture dates, favorite locations). This approach demonstrates proper separation of concerns - user content vs. app metadata. Data operations are wrapped in try-catch blocks with proper error handling, ensuring the app gracefully degrades if storage operations fail. The useFocusEffect hook ensures data is refreshed whenever the user returns to the collection screen, keeping the UI synchronized with the underlying data store.

![Card Prototype](./cardprototype.png)
