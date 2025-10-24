Updated readme casual · MD
Copy

# BirdMon - Your Personal Bird Collection App

## Application Description

BirdMon is a mobile app that allows bird enthusiasts to capture, catalog, and manage their bird sightings in a fun way. Inspired by card games, BirdMon transforms bird watching into an engaging experience where each bird you photograph becomes part of your personal collection.

Users can use their device's camera to capture photos of birds they encounter, add names and location information and collect them like cards. The app includes stats and information for each bird, as well as a settings page to manage themes and see statistics about your bird-watching.

Key features include:

- **Camera Integration**: Capture birds using your device's camera or import photos from your gallery
- **Persistent Storage**: All your bird data is saved locally on your device using AsyncStorage
- **Dark Mode**: Toggle between light and dark themes based on your preference
- **Statistics Tracking**: Monitor your collection growth, favorite locations, and capture dates
- **Card-Based UI**: Interactive cards displaying your bird collection
- **Detailed Views**: Tap any bird to see details and stats

## Human Interface Guidelines Implementation

I made sure to follow iOS and Android design guidelines to create an app that feels native and intuitive. Here's how I applied some key principles:

**[iOS HIG - Touch Targets](https://developer.apple.com/design/human-interface-guidelines/inputs/touchscreen-gestures)** (44x44 points minimum):

- Made all buttons at least 44x44pt so they're easy to tap. The settings and statistics icons in the header are 24pt but have padding to make the full touch area 48pt.
- The camera FAB button is 56x56pt - nice and big so you can't miss it.
- Camera controls are even bigger (56-72pt) since you're using them while trying to photograph birds.

**[iOS HIG - Navigation](https://developer.apple.com/design/human-interface-guidelines/navigation):**

- Used expo-router's Stack navigation which gives you the standard iOS back button with "< Back" text automatically.
- The flow is straightforward: Collection → Camera/Settings/Statistics/Bird Details. Every screen has a way back.
- Added an extra back button on the camera screen itself so you never feel stuck.

**[iOS HIG - Feedback](https://developer.apple.com/design/human-interface-guidelines/feedback):**

- Buttons change opacity when you press them (drops to 0.7) so you know something's happening.
- Loading spinners show up when the app is saving your bird data.
- Pop-up dialogs ask "are you sure?" before doing anything destructive like clearing your whole collection or discarding a photo - better safe than sorry!

**[iOS HIG - Keyboards](https://developer.apple.com/design/human-interface-guidelines/keyboards):**

- Used `KeyboardAvoidingView` so the keyboard never covers up the text fields when you're typing in bird names.
- Set it up differently for iOS (uses "padding") and Android (uses "height") since they handle keyboards differently.
- The text fields stay visible while you're typing - super annoying when apps don't do this right!

**[iOS HIG - Layout](https://developer.apple.com/design/human-interface-guidelines/layout):**

- Used `react-native-safe-area-context` to handle all the weird screen shapes (iPhone notches, home indicators, etc.).
- Camera controls sit below the notch at the top and above the home indicator at the bottom.
- Works properly on iPhone 12+ with notches, older iPhones without them, and Android phones.

**[Material Design - Touch Targets](https://m3.material.io/foundations/interaction/gestures)** (48x48 dp minimum):

- All Android buttons are at least 48dp - same idea as iOS but slightly bigger minimum.
- Cards have that nice Material Design shadow (4dp elevation) to make them feel raised off the screen.
- The FAB sits 16dp from the edge like Material Design recommends.

**[Material Design - Typography](https://m3.material.io/styles/typography/overview):**

- Used Material Design 3's type scale (`headlineMedium`, `titleLarge`, `bodyMedium`) to keep text sizing consistent.
- Text automatically gets bigger or smaller if users change their phone's accessibility settings.

**[WCAG - Color Contrast](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)** (AA Standard):

- The main green (#4CAF50) has a 4.5:1 contrast ratio against white - passes accessibility standards.
- Dark mode uses lighter colors (#81C784, #E0E0E0) that still have great contrast (7.2:1+) on dark backgrounds.
- Made sure all the text is readable in both light and dark mode by checking contrast ratios.
- The colored chips use Material Design 3's container colors which automatically have good contrast.

**Visual Hierarchy:**

- Kept spacing consistent (15-20px between things) so the layout doesn't feel cramped.
- Added icons next to text labels throughout the app - makes things way easier to scan.
- Used rounded corners (8-24dp) and shadows (2-12dp) to create depth and show what's interactive.

![Card Prototype](./cardprototype.png)
