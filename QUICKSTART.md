# Enhancio - Quick Start Guide

## Prerequisites
- Node.js (v16+)
- Expo CLI
- iOS Simulator or Android Emulator

## Quick Setup

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the development server**
   ```bash
   npm start
   ```

3. **Build custom dev client** (Required - app uses native modules)
   ```bash
   # For iOS
   npx eas build --profile development --platform ios
   
   # For Android
   npx eas build --profile development --platform android
   ```

4. **Run on your device**
   - Install the custom dev client from the build
   - Scan the QR code from the terminal
   - Start editing photos!

## Important Notes

⚠️ **This app CANNOT run on Expo Go** due to native modules:
- `react-native-image-crop-picker`
- `@dariyd/react-native-image-filters`

You MUST build a custom development client using EAS Build.

## First Time Setup

If this is your first time using EAS:

1. **Create an Expo account** at https://expo.dev
2. **Login to EAS**
   ```bash
   npx eas login
   ```
3. **Configure EAS** (if not already done)
   ```bash
   npx eas build:configure
   ```

## Troubleshooting

### Issue: "Module not found" errors
**Solution**: Run `npm install` again and restart the dev server

### Issue: "Native module cannot be found"
**Solution**: You're probably using Expo Go. Build and use a custom dev client instead.

### Issue: Build fails on EAS
**Solution**: Check that your Expo account is properly configured and you have the necessary credentials set up.

### Issue: Camera/Gallery permissions not working
**Solution**: 
- iOS: Check `app.json` for proper permission strings
- Android: Ensure permissions are declared in `app.json`

## Development Tips

1. **Hot Reload**: Save any file to see changes instantly
2. **Debug Menu**: Shake device or press `Cmd+D` (iOS) / `Cmd+M` (Android)
3. **Logs**: Use React Native Debugger or Expo DevTools
4. **TypeScript**: Run `npx tsc --noEmit` to check for type errors

## Useful Commands

```bash
# Start development server
npm start

# Run on iOS
npm run ios

# Run on Android
npm run android

# Check TypeScript
npx tsc --noEmit

# Build for production (iOS)
npx eas build --platform ios

# Build for production (Android)
npx eas build --platform android
```

## Need Help?

- 📚 [Expo Documentation](https://docs.expo.dev/)
- 💬 [Expo Discord](https://chat.expo.dev/)
- 🐛 [Report Issues](https://github.com/your-repo/issues)

Happy editing! 📸✨
