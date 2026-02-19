import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import ImagePicker from 'react-native-image-crop-picker';
import { usePhoto } from '../src/context/PhotoContext';
import { StatusBar } from 'expo-status-bar';

export default function PhotoPickerScreen() {
  const router = useRouter();
  const { setPhotoUri } = usePhoto();
  const [isLoading, setIsLoading] = useState(false);

  const handlePickFromGallery = async () => {
    try {
      setIsLoading(true);
      const image = await ImagePicker.openPicker({
        width: 2000,
        height: 2000,
        cropping: false,
        mediaType: 'photo',
      });

      if (image && image.path) {
        setPhotoUri(image.path);
        router.push('/editor');
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to pick image from gallery');
        console.error('Gallery picker error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleTakePhoto = async () => {
    try {
      setIsLoading(true);
      const image = await ImagePicker.openCamera({
        width: 2000,
        height: 2000,
        cropping: false,
        mediaType: 'photo',
      });

      if (image && image.path) {
        setPhotoUri(image.path);
        router.push('/editor');
      }
    } catch (error: any) {
      if (error.code !== 'E_PICKER_CANCELLED') {
        Alert.alert('Error', 'Failed to open camera');
        console.error('Camera error:', error);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />
      
      <View className="flex-1 justify-center items-center px-6">
        <View className="mb-12">
          <Text className="text-white text-5xl font-bold text-center mb-2">
            Enhancio
          </Text>
          <Text className="text-gray-400 text-lg text-center">
            Professional Photo Editor
          </Text>
        </View>

        <View className="w-full max-w-sm">
          <TouchableOpacity
            onPress={handlePickFromGallery}
            disabled={isLoading}
            className="bg-blue-500 rounded-2xl py-5 px-8 mb-4 items-center active:bg-blue-600"
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text className="text-white text-lg font-semibold mb-1">
                  📸 Pick from Gallery
                </Text>
                <Text className="text-blue-100 text-sm">
                  Choose a photo to edit
                </Text>
              </>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleTakePhoto}
            disabled={isLoading}
            className="bg-dark-200 rounded-2xl py-5 px-8 items-center border-2 border-gray-700 active:bg-dark-300"
            activeOpacity={0.8}
          >
            {isLoading ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <>
                <Text className="text-white text-lg font-semibold mb-1">
                  📷 Take Photo
                </Text>
                <Text className="text-gray-400 text-sm">
                  Capture with camera
                </Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View className="mt-12">
          <Text className="text-gray-600 text-xs text-center">
            v1.0.0 • Made with ❤️
          </Text>
        </View>
      </View>
    </View>
  );
}
