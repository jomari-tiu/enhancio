import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { usePhoto } from '../src/context/PhotoContext';
import { SliderComponent } from '../src/components/Slider';
import { PresetButton } from '../src/components/PresetButton';
import { CropOverlay } from '../src/components/CropOverlay';
import { FilteredImage } from '../src/components/FilteredImage';
import { PRESETS } from '../src/utils/filters';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type Tab = 'presets' | 'adjust' | 'crop';

export default function EditorScreen() {
  const router = useRouter();
  const { state, resetAdjustments } = usePhoto();
  const [activeTab, setActiveTab] = useState<Tab>('presets');

  if (!state.uri) {
    router.replace('/');
    return null;
  }

  const renderPreviewImage = () => {
    if (activeTab === 'crop') {
      return null;
    }

    return (
      <View className="items-center justify-center bg-black">
        <FilteredImage
          style={{
            width: SCREEN_WIDTH,
            height: SCREEN_HEIGHT * 0.5,
          }}
          resizeMode="contain"
        />
      </View>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'presets':
        return (
          <View className="flex-1 bg-dark-100 pt-4">
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="px-4"
            >
              {PRESETS.map((preset) => (
                <PresetButton key={preset.id} preset={preset} />
              ))}
            </ScrollView>
            <View className="px-6 py-4">
              {state.activePreset && (
                <View className="bg-dark-200 rounded-xl p-4">
                  <Text className="text-white text-sm font-medium mb-1">
                    {PRESETS.find((p) => p.id === state.activePreset)?.name}
                  </Text>
                  <Text className="text-gray-400 text-xs">
                    {PRESETS.find((p) => p.id === state.activePreset)?.description}
                  </Text>
                </View>
              )}
            </View>
          </View>
        );

      case 'adjust':
        return (
          <ScrollView className="flex-1 bg-dark-100 px-6 pt-6">
            <SliderComponent label="Brightness" adjustmentKey="brightness" />
            <SliderComponent label="Contrast" adjustmentKey="contrast" />
            <SliderComponent label="Saturation" adjustmentKey="saturation" />
            <SliderComponent label="Temperature" adjustmentKey="temperature" />
            <SliderComponent label="Highlights" adjustmentKey="highlights" />
            <SliderComponent label="Shadows" adjustmentKey="shadows" />
            <SliderComponent label="Sharpness" adjustmentKey="sharpness" />
            
            <TouchableOpacity
              onPress={resetAdjustments}
              className="bg-dark-300 rounded-xl py-4 mb-6 mt-2"
            >
              <Text className="text-white text-center font-semibold">
                Reset All
              </Text>
            </TouchableOpacity>
          </ScrollView>
        );

      case 'crop':
        return (
          <View className="flex-1">
            <CropOverlay
              imageWidth={SCREEN_WIDTH}
              imageHeight={SCREEN_HEIGHT * 0.5}
            />
          </View>
        );

      default:
        return null;
    }
  };

  return (
    <View className="flex-1 bg-black">
      <StatusBar style="light" />

      <View className="bg-dark-200 pt-12 pb-3 px-4 flex-row items-center justify-between">
        <TouchableOpacity
          onPress={() => router.back()}
          className="px-4 py-2"
        >
          <Text className="text-white text-base">← Back</Text>
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">Edit Photo</Text>
        <TouchableOpacity
          onPress={() => router.push('/export')}
          className="px-4 py-2 bg-blue-500 rounded-lg"
        >
          <Text className="text-white text-base font-semibold">Export</Text>
        </TouchableOpacity>
      </View>

      {renderPreviewImage()}

      <View className="bg-dark-200 flex-row justify-around py-3 border-t border-gray-800">
        <TouchableOpacity
          onPress={() => setActiveTab('presets')}
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'presets' ? 'bg-blue-500' : 'bg-transparent'
          }`}
        >
          <Text
            className={`text-base font-medium ${
              activeTab === 'presets' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Presets
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('adjust')}
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'adjust' ? 'bg-blue-500' : 'bg-transparent'
          }`}
        >
          <Text
            className={`text-base font-medium ${
              activeTab === 'adjust' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Adjust
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setActiveTab('crop')}
          className={`px-6 py-2 rounded-lg ${
            activeTab === 'crop' ? 'bg-blue-500' : 'bg-transparent'
          }`}
        >
          <Text
            className={`text-base font-medium ${
              activeTab === 'crop' ? 'text-white' : 'text-gray-400'
            }`}
          >
            Crop
          </Text>
        </TouchableOpacity>
      </View>

      <View className="flex-1">
        {renderTabContent()}
      </View>
    </View>
  );
}
