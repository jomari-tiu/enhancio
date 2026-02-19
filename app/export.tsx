import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
  Dimensions,
  ScrollView,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { usePhoto } from '../src/context/PhotoContext';
import {
  saveToMediaLibrary,
  ExportOptions,
  generateTempFilePath,
} from '../src/utils/imageHelpers';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type QualityOption = 'high' | 'medium' | 'low';

export default function ExportScreen() {
  const router = useRouter();
  const { state, resetAll } = usePhoto();
  const [quality, setQuality] = useState<QualityOption>('high');
  const [isExporting, setIsExporting] = useState(false);

  if (!state.uri) {
    router.replace('/');
    return null;
  }

  const handleExport = async () => {
    if (!state.uri) {
      Alert.alert('Error', 'No image to export');
      return;
    }

    try {
      setIsExporting(true);

      const success = await saveToMediaLibrary(state.uri);

      if (success) {
        Alert.alert(
          'Success!',
          'Your photo has been saved to the camera roll.',
          [
            {
              text: 'Edit Another',
              onPress: () => {
                resetAll();
                router.replace('/');
              },
            },
            {
              text: 'OK',
              onPress: () => {
                resetAll();
                router.replace('/');
              },
            },
          ]
        );
      } else {
        Alert.alert(
          'Error',
          'Failed to save photo. Please check permissions and try again.'
        );
      }
    } catch (error) {
      console.error('Export error:', error);
      Alert.alert('Error', 'An unexpected error occurred while exporting.');
    } finally {
      setIsExporting(false);
    }
  };

  const qualityOptions: { value: QualityOption; label: string; description: string }[] = [
    { value: 'high', label: 'High Quality', description: 'Best for printing (100%)' },
    { value: 'medium', label: 'Medium Quality', description: 'Balanced size (80%)' },
    { value: 'low', label: 'Compressed', description: 'Smaller file (60%)' },
  ];

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <View className="bg-dark-200 pt-12 pb-3 px-4 flex-row items-center justify-between">
        <TouchableOpacity onPress={() => router.back()} className="px-4 py-2">
          <Text className="text-white text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Export Photo</Text>
        <View className="w-20" />
      </View>

      <ScrollView className="flex-1">
        <View className="items-center justify-center py-8 bg-black">
          <Image
            source={{ uri: state.uri }}
            style={{
              width: SCREEN_WIDTH - 40,
              height: SCREEN_HEIGHT * 0.4,
              borderRadius: 16,
            }}
            resizeMode="contain"
          />
        </View>

        <View className="px-6 py-6">
          <Text className="text-white text-xl font-semibold mb-4">
            Export Quality
          </Text>
          
          <View className="space-y-3">
            {qualityOptions.map((option) => (
              <TouchableOpacity
                key={option.value}
                onPress={() => setQuality(option.value)}
                className={`rounded-xl p-4 border-2 ${
                  quality === option.value
                    ? 'bg-blue-500 border-blue-500'
                    : 'bg-dark-200 border-gray-700'
                }`}
              >
                <View className="flex-row justify-between items-center">
                  <View className="flex-1">
                    <Text
                      className={`text-base font-semibold mb-1 ${
                        quality === option.value ? 'text-white' : 'text-gray-200'
                      }`}
                    >
                      {option.label}
                    </Text>
                    <Text
                      className={`text-sm ${
                        quality === option.value ? 'text-blue-100' : 'text-gray-400'
                      }`}
                    >
                      {option.description}
                    </Text>
                  </View>
                  <View
                    className={`w-6 h-6 rounded-full border-2 ${
                      quality === option.value
                        ? 'bg-white border-white'
                        : 'border-gray-600'
                    }`}
                  >
                    {quality === option.value && (
                      <View className="flex-1 items-center justify-center">
                        <View className="w-3 h-3 rounded-full bg-blue-500" />
                      </View>
                    )}
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>

          <View className="mt-8 bg-dark-200 rounded-xl p-4">
            <Text className="text-gray-400 text-sm mb-2">
              <Text className="font-semibold">Adjustments Applied:</Text>
            </Text>
            <View className="flex-row flex-wrap">
              {state.activePreset && (
                <View className="bg-blue-500 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-white text-xs">
                    Preset: {state.activePreset}
                  </Text>
                </View>
              )}
              {state.cropRegion && (
                <View className="bg-green-500 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-white text-xs">Cropped</Text>
                </View>
              )}
              {state.aspectRatio !== 'free' && (
                <View className="bg-purple-500 px-3 py-1 rounded-full mr-2 mb-2">
                  <Text className="text-white text-xs">
                    Ratio: {state.aspectRatio}
                  </Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="px-6 pb-8 pt-4 bg-dark-200 border-t border-gray-800">
        <TouchableOpacity
          onPress={handleExport}
          disabled={isExporting}
          className="bg-blue-500 rounded-2xl py-5 items-center active:bg-blue-600"
          activeOpacity={0.8}
        >
          {isExporting ? (
            <ActivityIndicator color="#ffffff" size="small" />
          ) : (
            <Text className="text-white text-lg font-bold">
              💾 Save to Camera Roll
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}
