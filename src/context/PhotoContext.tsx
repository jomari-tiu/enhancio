import React, { createContext, useContext, useState, ReactNode } from 'react';

export type AspectRatio = '1:1' | '16:9' | '4:5' | '9:16' | 'free';

export type CropRegion = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type Adjustments = {
  brightness: number;
  contrast: number;
  saturation: number;
  temperature: number;
  highlights: number;
  shadows: number;
  sharpness: number;
};

export type PhotoState = {
  uri: string | null;
  cropRegion: CropRegion | null;
  adjustments: Adjustments;
  activePreset: string | null;
  aspectRatio: AspectRatio;
};

const defaultAdjustments: Adjustments = {
  brightness: 0,
  contrast: 0,
  saturation: 0,
  temperature: 0,
  highlights: 0,
  shadows: 0,
  sharpness: 0,
};

const initialState: PhotoState = {
  uri: null,
  cropRegion: null,
  adjustments: defaultAdjustments,
  activePreset: null,
  aspectRatio: 'free',
};

type PhotoContextType = {
  state: PhotoState;
  setPhotoUri: (uri: string | null) => void;
  setAdjustment: (key: keyof Adjustments, value: number) => void;
  setAllAdjustments: (adjustments: Adjustments) => void;
  resetAdjustments: () => void;
  setActivePreset: (preset: string | null) => void;
  setCropRegion: (region: CropRegion | null) => void;
  setAspectRatio: (ratio: AspectRatio) => void;
  resetAll: () => void;
};

const PhotoContext = createContext<PhotoContextType | undefined>(undefined);

export const PhotoProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<PhotoState>(initialState);

  const setPhotoUri = (uri: string | null) => {
    setState((prev) => ({ ...prev, uri }));
  };

  const setAdjustment = (key: keyof Adjustments, value: number) => {
    setState((prev) => ({
      ...prev,
      adjustments: {
        ...prev.adjustments,
        [key]: value,
      },
    }));
  };

  const setAllAdjustments = (adjustments: Adjustments) => {
    setState((prev) => ({
      ...prev,
      adjustments,
    }));
  };

  const resetAdjustments = () => {
    setState((prev) => ({
      ...prev,
      adjustments: defaultAdjustments,
      activePreset: null,
    }));
  };

  const setActivePreset = (preset: string | null) => {
    setState((prev) => ({ ...prev, activePreset: preset }));
  };

  const setCropRegion = (region: CropRegion | null) => {
    setState((prev) => ({ ...prev, cropRegion: region }));
  };

  const setAspectRatio = (ratio: AspectRatio) => {
    setState((prev) => ({ ...prev, aspectRatio: ratio }));
  };

  const resetAll = () => {
    setState(initialState);
  };

  return (
    <PhotoContext.Provider
      value={{
        state,
        setPhotoUri,
        setAdjustment,
        setAllAdjustments,
        resetAdjustments,
        setActivePreset,
        setCropRegion,
        setAspectRatio,
        resetAll,
      }}
    >
      {children}
    </PhotoContext.Provider>
  );
};

export const usePhoto = (): PhotoContextType => {
  const context = useContext(PhotoContext);
  if (!context) {
    throw new Error('usePhoto must be used within a PhotoProvider');
  }
  return context;
};
