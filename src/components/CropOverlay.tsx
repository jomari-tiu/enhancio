import React, { useState } from 'react';
import { View, Text, Dimensions } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { usePhoto, AspectRatio } from '../context/PhotoContext';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type CropOverlayProps = {
  imageWidth: number;
  imageHeight: number;
};

export const CropOverlay: React.FC<CropOverlayProps> = ({
  imageWidth,
  imageHeight,
}) => {
  const { state, setCropRegion, setAspectRatio } = usePhoto();
  const [isGestureActive, setIsGestureActive] = useState(false);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scale = useSharedValue(1);

  const aspectRatios: { label: string; ratio: AspectRatio }[] = [
    { label: 'Free', ratio: 'free' },
    { label: '1:1', ratio: '1:1' },
    { label: '4:5', ratio: '4:5' },
    { label: '16:9', ratio: '16:9' },
    { label: '9:16', ratio: '9:16' },
  ];

  const panGesture = Gesture.Pan()
    .onStart(() => {
      setIsGestureActive(true);
    })
    .onUpdate((e) => {
      translateX.value = e.translationX;
      translateY.value = e.translationY;
    })
    .onEnd(() => {
      setIsGestureActive(false);
      setCropRegion({
        x: translateX.value,
        y: translateY.value,
        width: imageWidth * scale.value,
        height: imageHeight * scale.value,
      });
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  return (
    <View className="flex-1 bg-black">
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[animatedStyle]} className="flex-1">
          <View className="absolute inset-0">
            <View className="absolute inset-0 border-2 border-white border-dashed" />
            <View className="absolute left-1/3 top-0 bottom-0 w-px bg-white opacity-30" />
            <View className="absolute left-2/3 top-0 bottom-0 w-px bg-white opacity-30" />
            <View className="absolute top-1/3 left-0 right-0 h-px bg-white opacity-30" />
            <View className="absolute top-2/3 left-0 right-0 h-px bg-white opacity-30" />
          </View>
        </Animated.View>
      </GestureDetector>

      <View className="absolute bottom-8 left-0 right-0 px-4">
        <View className="bg-dark-200 rounded-2xl p-4">
          <Text className="text-white text-sm font-semibold mb-3 text-center">
            Aspect Ratio
          </Text>
          <View className="flex-row justify-between">
            {aspectRatios.map((item) => (
              <View
                key={item.ratio}
                className={`px-4 py-2 rounded-lg ${
                  state.aspectRatio === item.ratio
                    ? 'bg-blue-500'
                    : 'bg-dark-300'
                }`}
                onTouchEnd={() => setAspectRatio(item.ratio)}
              >
                <Text
                  className={`text-sm font-medium ${
                    state.aspectRatio === item.ratio
                      ? 'text-white'
                      : 'text-gray-400'
                  }`}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </View>
    </View>
  );
};
