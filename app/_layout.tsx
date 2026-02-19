import '../global.css';
import React from 'react';
import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PhotoProvider } from '../src/context/PhotoContext';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PhotoProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            animation: 'slide_from_right',
            contentStyle: { backgroundColor: '#000000' },
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="editor" />
          <Stack.Screen name="export" />
        </Stack>
      </PhotoProvider>
    </GestureHandlerRootView>
  );
}
