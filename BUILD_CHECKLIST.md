# 🎯 Build & Test Checklist

## Pre-Build Checklist

### ✅ Project Setup (COMPLETED)
- [x] Initialize Expo + TypeScript project
- [x] Install all dependencies (963 packages)
- [x] Configure EAS Build
- [x] Setup NativeWind + Tailwind CSS
- [x] Configure app permissions in app.json
- [x] Create all screens (3 total)
- [x] Build all components (4 total)
- [x] Implement PhotoContext state management
- [x] Define 12+ travel presets
- [x] Create image helper utilities
- [x] TypeScript compilation passes (0 errors)

## Build Instructions

### Step 1: EAS Login
```bash
npx eas login
```

### Step 2: Build Development Client

**For iOS:**
```bash
npm run build:dev:ios
# or
npx eas build --profile development --platform ios
```

**For Android:**
```bash
npm run build:dev:android
# or
npx eas build --profile development --platform android
```

### Step 3: Install Dev Client
- Download the build from EAS
- Install on your device or simulator

### Step 4: Start Development Server
```bash
npm start
```

### Step 5: Connect and Test
- Scan QR code from terminal
- App should launch on your device

---

## Testing Checklist

### 📸 Image Selection
- [ ] Pick image from camera roll works
- [ ] Take photo with camera works
- [ ] Permissions are requested properly
- [ ] Navigate to editor after selection

### 🎨 Editor Functionality
- [ ] Image displays correctly
- [ ] Presets tab shows all 12 presets
- [ ] Clicking preset applies adjustments
- [ ] Active preset is highlighted
- [ ] Adjust tab shows all 7 sliders
- [ ] Sliders update values in real-time
- [ ] Reset button clears adjustments
- [ ] Crop tab displays crop overlay
- [ ] Aspect ratio buttons work
- [ ] Navigation between tabs is smooth

### 💾 Export Functionality
- [ ] Export button navigates to export screen
- [ ] Preview shows edited image
- [ ] Quality selector works (High/Medium/Low)
- [ ] Save to camera roll succeeds
- [ ] Success alert appears
- [ ] Exported image appears in camera roll
- [ ] Can edit another photo after export

### 🎯 Edge Cases
- [ ] App handles permission denial gracefully
- [ ] Back navigation works correctly
- [ ] App doesn't crash on rapid interactions
- [ ] Loading states display properly
- [ ] Error messages are user-friendly

---

## Common Issues & Solutions

### Issue: "Cannot find module 'expo-router/entry'"
**Solution:** 
```bash
npm install expo-router
npm start -- --clear
```

### Issue: "Metro bundler failed to start"
**Solution:**
```bash
# Clear metro cache
npx expo start --clear
```

### Issue: "Native module cannot be found"
**Solution:** You're likely using Expo Go. Build a custom dev client with EAS.

### Issue: "TypeScript errors"
**Solution:**
```bash
npm run type-check
# Fix any errors shown
```

### Issue: "NativeWind styles not applying"
**Solution:**
```bash
# Regenerate tailwind config
npx tailwindcss init
npm start -- --clear
```

---

## Performance Testing

### Test These Scenarios:
1. **Large Images**: Try editing high-resolution photos
2. **Multiple Adjustments**: Apply several adjustments at once
3. **Rapid Preset Changes**: Quickly switch between presets
4. **Crop Gestures**: Test smooth pan and zoom
5. **Export Speed**: Time the export process

---

## Production Build Checklist

When ready for production:

### Pre-Production
- [ ] Test all features thoroughly
- [ ] Fix any bugs found
- [ ] Update app version in app.json
- [ ] Create proper app icons (not placeholders)
- [ ] Create proper splash screen
- [ ] Review and test permissions
- [ ] Test on multiple devices
- [ ] Test on different OS versions

### Build for Production
```bash
# iOS
npm run build:prod:ios
# or
npx eas build --profile production --platform ios

# Android
npm run build:prod:android
# or
npx eas build --profile production --platform android
```

### App Store Submission
- [ ] iOS: Submit to App Store Connect
- [ ] Android: Upload to Google Play Console
- [ ] Prepare app description and screenshots
- [ ] Set up app pricing/availability

---

## Useful Commands

```bash
# Type checking
npm run type-check

# Start dev server
npm start

# Build for development
npm run build:dev:ios
npm run build:dev:android

# Build for production
npm run build:prod:ios
npm run build:prod:android

# Clear all caches
npx expo start --clear

# Check EAS build status
npx eas build:list
```

---

## Support Resources

- **Expo Docs**: https://docs.expo.dev/
- **React Native Docs**: https://reactnative.dev/
- **EAS Build Docs**: https://docs.expo.dev/build/introduction/
- **Expo Discord**: https://chat.expo.dev/

---

## Next Steps

1. ✅ Complete initial build (DONE)
2. 🔨 Build custom dev client with EAS
3. 📱 Install and test on device
4. 🐛 Fix any bugs found
5. 🎨 Refine UI/UX based on testing
6. 🚀 Prepare for production release

---

**Status**: Ready for EAS Build ✅  
**Last Updated**: February 19, 2026
