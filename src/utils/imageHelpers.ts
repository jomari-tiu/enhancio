import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { CropRegion, Adjustments } from '../context/PhotoContext';

export type ExportOptions = {
  quality: 'high' | 'medium' | 'low';
};

export const getQualityValue = (quality: 'high' | 'medium' | 'low'): number => {
  switch (quality) {
    case 'high':
      return 1.0;
    case 'medium':
      return 0.8;
    case 'low':
      return 0.6;
    default:
      return 0.8;
  }
};

export const requestMediaLibraryPermissions = async (): Promise<boolean> => {
  try {
    const { status } = await MediaLibrary.requestPermissionsAsync();
    return status === 'granted';
  } catch (error) {
    console.error('Error requesting media library permissions:', error);
    return false;
  }
};

export const saveToMediaLibrary = async (uri: string): Promise<boolean> => {
  try {
    const hasPermission = await requestMediaLibraryPermissions();
    if (!hasPermission) {
      throw new Error('Media library permission not granted');
    }

    await MediaLibrary.saveToLibraryAsync(uri);
    return true;
  } catch (error) {
    console.error('Error saving to media library:', error);
    return false;
  }
};

export const getImageDimensions = async (
  uri: string
): Promise<{ width: number; height: number } | null> => {
  try {
    const info = await FileSystem.getInfoAsync(uri);
    if (!info.exists) {
      return null;
    }

    return { width: 1920, height: 1080 };
  } catch (error) {
    console.error('Error getting image dimensions:', error);
    return null;
  }
};

export const calculateCropRegion = (
  imageWidth: number,
  imageHeight: number,
  aspectRatio: string
): CropRegion => {
  let targetWidth = imageWidth;
  let targetHeight = imageHeight;

  switch (aspectRatio) {
    case '1:1':
      const size = Math.min(imageWidth, imageHeight);
      targetWidth = size;
      targetHeight = size;
      break;
    case '16:9':
      targetHeight = (imageWidth * 9) / 16;
      if (targetHeight > imageHeight) {
        targetHeight = imageHeight;
        targetWidth = (imageHeight * 16) / 9;
      }
      break;
    case '4:5':
      targetHeight = (imageWidth * 5) / 4;
      if (targetHeight > imageHeight) {
        targetHeight = imageHeight;
        targetWidth = (imageHeight * 4) / 5;
      }
      break;
    case '9:16':
      targetHeight = (imageWidth * 16) / 9;
      if (targetHeight > imageHeight) {
        targetHeight = imageHeight;
        targetWidth = (imageHeight * 9) / 16;
      }
      break;
    default:
      break;
  }

  return {
    x: (imageWidth - targetWidth) / 2,
    y: (imageHeight - targetHeight) / 2,
    width: targetWidth,
    height: targetHeight,
  };
};

export const generateTempFilePath = (extension: string = 'jpg'): string => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 10000);
  return `${FileSystem.cacheDirectory}enhancio_${timestamp}_${random}.${extension}`;
};

export const adjustmentToFilterValue = (value: number, filterType: string): number => {
  switch (filterType) {
    case 'brightness':
      return 1 + value;
    case 'contrast':
      return 1 + value;
    case 'saturation':
      return 1 + value;
    case 'temperature':
      return value;
    case 'highlights':
      return value;
    case 'shadows':
      return value;
    case 'sharpness':
      return value;
    default:
      return value;
  }
};
