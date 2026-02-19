# Enhancio - Professional Photo Editor

A beautiful, feature-rich mobile photo editing app built with React Native, Expo, and TypeScript. Inspired by Lightroom, Enhancio provides professional-grade photo editing tools with an intuitive, dark-themed interface.

## Features

### 🎨 Professional Photo Editing
- **12+ Travel-Style Presets**: Golden Hour, Arctic Blue, Desert Dust, Jungle Green, and more
- **Manual Adjustments**: Fine-tune brightness, contrast, saturation, temperature, highlights, shadows, and sharpness
- **Smart Cropping**: Gesture-based crop with platform-specific aspect ratios (1:1, 16:9, 4:5, 9:16, Free)
- **High-Quality Export**: Save photos with customizable quality settings

### 🎯 Key Highlights
- ⚡ Real-time preview with live adjustments
- 📱 Modern, dark-themed UI with NativeWind (Tailwind CSS)
- 🖼️ Pick from gallery or capture with camera
- 💾 Save directly to camera roll
- 🎭 Intuitive tabbed interface (Presets, Adjust, Crop)

## Tech Stack

- **Framework**: React Native + Expo SDK 52
- **Language**: TypeScript (Strict Mode)
- **Navigation**: Expo Router (File-based routing)
- **Styling**: NativeWind (Tailwind CSS for React Native)
- **State Management**: React Context API
- **Image Handling**: 
  - `react-native-image-crop-picker` - Image picking & capture
  - `@dariyd/react-native-image-filters` - GPU-accelerated filters
  - `react-native-gesture-handler` - Gesture-based crop overlay
  - `@react-native-community/slider` - Adjustment sliders
  - `expo-file-system` + `expo-media-library` - Export & save

## Project Structure

```
enhancio/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout + Context provider
│   ├── index.tsx                 # PhotoPickerScreen
│   ├── editor.tsx                # EditorScreen
│   └── export.tsx                # ExportScreen
├── src/
│   ├── components/
│   │   ├── Slider.tsx            # Reusable adjustment slider
│   │   ├── PresetButton.tsx      # Preset thumbnail button
│   │   └── CropOverlay.tsx       # Gesture-driven crop UI
│   ├── context/
│   │   └── PhotoContext.tsx      # Global photo state management
│   └── utils/
│       ├── filters.ts            # 12+ travel preset definitions
│       └── imageHelpers.ts       # Crop, resize, export helpers
├── assets/                       # App icons and splash screens
├── app.json                      # Expo configuration
├── eas.json                      # EAS Build configuration
├── tailwind.config.js            # Tailwind CSS configuration
└── tsconfig.json                 # TypeScript configuration
```

## Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Expo CLI
- iOS Simulator (for Mac) or Android Emulator

### Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build Custom Dev Client** (Required for native modules)
   ```bash
   npx eas build --profile development --platform ios
   # or
   npx eas build --profile development --platform android
   ```

   > **Note**: This app uses native modules (`react-native-image-crop-picker`, `@dariyd/react-native-image-filters`) that require a custom development client. Expo Go will not work.

## Running the App

### iOS
```bash
npm run ios
```

### Android
```bash
npm run android
```

## Available Presets

1. **Golden Hour** - Warm sunset tones with enhanced highlights
2. **Arctic Blue** - Cool, crisp winter atmosphere
3. **Desert Dust** - Muted warm tones with faded contrast
4. **Jungle Green** - Rich, vibrant greens and deep shadows
5. **Coastal Haze** - Soft, dreamy beach vibes
6. **Moody Noir** - Dramatic dark tones with high contrast
7. **Retro Film** - Vintage film aesthetic with warmth
8. **Vivid Pop** - Bold, punchy colors and contrast
9. **Matte Fade** - Lifted blacks and muted tones
10. **Pastel Dream** - Soft pastels with lifted shadows
11. **Cinematic Teal** - Teal and orange film look
12. **Sunrise Warm** - Soft morning light with warmth

## Permissions

The app requires the following permissions:

**iOS** (`app.json` - `ios.infoPlist`):
- `NSPhotoLibraryUsageDescription` - Access photo library
- `NSCameraUsageDescription` - Access camera
- `NSPhotoLibraryAddUsageDescription` - Save edited photos

**Android** (`app.json` - `android.permissions`):
- `READ_EXTERNAL_STORAGE` - Read photos
- `WRITE_EXTERNAL_STORAGE` - Save photos (Android < 13)
- `CAMERA` - Take photos
- `READ_MEDIA_IMAGES` - Read media (Android 13+)

## Development

### Scripts
- `npm start` - Start Expo development server
- `npm run android` - Run on Android
- `npm run ios` - Run on iOS
- `npm run web` - Run on web (limited functionality)

### Building for Production

**iOS**:
```bash
npx eas build --platform ios
```

**Android**:
```bash
npx eas build --platform android
```

## Architecture

### State Management
The app uses React Context (`PhotoContext`) for global state management, handling:
- Photo URI
- Crop region and aspect ratio
- All adjustment values (brightness, contrast, etc.)
- Active preset selection

### Screen Flow
```
PhotoPickerScreen → EditorScreen → ExportScreen
     (index)          (editor)        (export)
```

### Key Components
- **PhotoProvider**: Global state wrapper
- **SliderComponent**: Reusable adjustment slider
- **PresetButton**: Preset thumbnail with active state
- **CropOverlay**: Gesture-based crop interface with aspect ratio controls

## Notable Features

- **TypeScript Strict Mode**: Full type safety across the codebase
- **Dark Mode Optimized**: Beautiful dark theme with consistent color palette
- **Gesture-Driven**: Smooth pan and zoom gestures for cropping
- **Real-time Preview**: See adjustments applied instantly
- **High-res Export**: Maintains full image quality on export

## Future Enhancements

- [ ] Add more preset categories (Portrait, Food, Architecture)
- [ ] Implement undo/redo functionality
- [ ] Add text and sticker overlays
- [ ] Social media sharing integration
- [ ] History of recent edits
- [ ] Custom preset creation and saving
- [ ] Batch photo editing

## License

MIT License - Feel free to use this project for learning or commercial purposes.

## Credits

Built with ❤️ using:
- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [NativeWind](https://www.nativewind.dev/)
- [React Native Image Filters](https://github.com/dariyd/react-native-image-filters)

---

**Version**: 1.0.0  
**Author**: Enhancio Team  
**Last Updated**: February 2026
