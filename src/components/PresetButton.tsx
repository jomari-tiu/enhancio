import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { usePhoto } from '../context/PhotoContext';
import { Preset } from '../utils/filters';

type PresetButtonProps = {
  preset: Preset;
};

export const PresetButton: React.FC<PresetButtonProps> = ({ preset }) => {
  const { state, setAllAdjustments, setActivePreset } = usePhoto();
  const isActive = state.activePreset === preset.id;

  const handlePress = () => {
    setAllAdjustments(preset.adjustments);
    setActivePreset(preset.id);
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      className={`mr-4 ${isActive ? 'opacity-100' : 'opacity-70'}`}
      activeOpacity={0.8}
    >
      <View
        className={`w-24 h-32 rounded-lg overflow-hidden border-2 ${
          isActive ? 'border-blue-500' : 'border-gray-700'
        }`}
      >
        <View className="flex-1 bg-gradient-to-b from-gray-700 to-gray-800 justify-center items-center">
          <View className="w-16 h-16 rounded-full bg-gray-600 justify-center items-center">
            <Text className="text-white text-xs">Preview</Text>
          </View>
        </View>
      </View>
      <Text
        className={`text-center text-xs mt-2 ${
          isActive ? 'text-blue-500 font-semibold' : 'text-gray-400'
        }`}
        numberOfLines={1}
      >
        {preset.name}
      </Text>
    </TouchableOpacity>
  );
};
