import React from 'react';
import { View, Text } from 'react-native';
import Slider from '@react-native-community/slider';
import { usePhoto } from '../context/PhotoContext';
import { Adjustments } from '../context/PhotoContext';

type SliderComponentProps = {
  label: string;
  adjustmentKey: keyof Adjustments;
  min?: number;
  max?: number;
  step?: number;
};

export const SliderComponent: React.FC<SliderComponentProps> = ({
  label,
  adjustmentKey,
  min = -1,
  max = 1,
  step = 0.01,
}) => {
  const { state, setAdjustment } = usePhoto();
  const value = state.adjustments[adjustmentKey];

  return (
    <View className="mb-6">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-white text-base font-medium">{label}</Text>
        <Text className="text-gray-400 text-sm font-mono">
          {value.toFixed(2)}
        </Text>
      </View>
      <Slider
        style={{ width: '100%', height: 40 }}
        minimumValue={min}
        maximumValue={max}
        step={step}
        value={value}
        onValueChange={(newValue) => setAdjustment(adjustmentKey, newValue)}
        minimumTrackTintColor="#3b82f6"
        maximumTrackTintColor="#4a4a4a"
        thumbTintColor="#3b82f6"
      />
    </View>
  );
};
