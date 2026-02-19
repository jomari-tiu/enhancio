import React, { useEffect, useState } from 'react';
import { Image, View, ActivityIndicator } from 'react-native';
import * as ImageManipulator from 'expo-image-manipulator';
import { usePhoto } from '../context/PhotoContext';

type FilteredImageProps = {
  style?: any;
  resizeMode?: 'cover' | 'contain' | 'stretch' | 'center';
};

export const FilteredImage: React.FC<FilteredImageProps> = ({ style, resizeMode = 'contain' }) => {
  const { state } = usePhoto();
  const [processedUri, setProcessedUri] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    processImage();
  }, [state.uri, state.adjustments, state.cropRegion]);

  const processImage = async () => {
    if (!state.uri) {
      setProcessedUri(null);
      return;
    }

    try {
      setIsProcessing(true);
      
      const actions: ImageManipulator.Action[] = [];

      if (state.cropRegion) {
        actions.push({
          crop: {
            originX: state.cropRegion.x,
            originY: state.cropRegion.y,
            width: state.cropRegion.width,
            height: state.cropRegion.height,
          },
        });
      }

      const brightness = Math.max(0, Math.min(2, 1 + state.adjustments.brightness));
      const contrast = Math.max(0, Math.min(2, 1 + state.adjustments.contrast));
      
      const manipResult = await ImageManipulator.manipulateAsync(
        state.uri,
        actions,
        {
          compress: 0.9,
          format: ImageManipulator.SaveFormat.JPEG,
        }
      );

      setProcessedUri(manipResult.uri);
    } catch (error) {
      console.error('Error processing image:', error);
      setProcessedUri(state.uri);
    } finally {
      setIsProcessing(false);
    }
  };

  if (isProcessing || !processedUri) {
    return (
      <View style={[style, { justifyContent: 'center', alignItems: 'center', backgroundColor: '#000' }]}>
        <ActivityIndicator size="large" color="#3b82f6" />
      </View>
    );
  }

  return (
    <Image
      source={{ uri: processedUri }}
      style={style}
      resizeMode={resizeMode}
    />
  );
};
