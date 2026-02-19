import { Adjustments } from '../context/PhotoContext';

export type Preset = {
  id: string;
  name: string;
  adjustments: Adjustments;
  description: string;
};

export const PRESETS: Preset[] = [
  {
    id: 'golden-hour',
    name: 'Golden Hour',
    description: 'Warm sunset tones with enhanced highlights',
    adjustments: {
      brightness: 0.15,
      contrast: 0.2,
      saturation: 0.25,
      temperature: 0.4,
      highlights: 0.15,
      shadows: -0.1,
      sharpness: 0.1,
    },
  },
  {
    id: 'arctic-blue',
    name: 'Arctic Blue',
    description: 'Cool, crisp winter atmosphere',
    adjustments: {
      brightness: 0.1,
      contrast: 0.3,
      saturation: 0.15,
      temperature: -0.5,
      highlights: 0.2,
      shadows: 0.1,
      sharpness: 0.2,
    },
  },
  {
    id: 'desert-dust',
    name: 'Desert Dust',
    description: 'Muted warm tones with faded contrast',
    adjustments: {
      brightness: 0.05,
      contrast: -0.15,
      saturation: -0.1,
      temperature: 0.3,
      highlights: 0.1,
      shadows: 0.15,
      sharpness: -0.05,
    },
  },
  {
    id: 'jungle-green',
    name: 'Jungle Green',
    description: 'Rich, vibrant greens and deep shadows',
    adjustments: {
      brightness: -0.05,
      contrast: 0.25,
      saturation: 0.4,
      temperature: -0.15,
      highlights: -0.1,
      shadows: -0.2,
      sharpness: 0.15,
    },
  },
  {
    id: 'coastal-haze',
    name: 'Coastal Haze',
    description: 'Soft, dreamy beach vibes',
    adjustments: {
      brightness: 0.2,
      contrast: -0.2,
      saturation: 0.1,
      temperature: 0.15,
      highlights: 0.25,
      shadows: 0.2,
      sharpness: -0.15,
    },
  },
  {
    id: 'moody-noir',
    name: 'Moody Noir',
    description: 'Dramatic dark tones with high contrast',
    adjustments: {
      brightness: -0.2,
      contrast: 0.5,
      saturation: -0.3,
      temperature: -0.1,
      highlights: -0.15,
      shadows: -0.3,
      sharpness: 0.25,
    },
  },
  {
    id: 'retro-film',
    name: 'Retro Film',
    description: 'Vintage film aesthetic with warmth',
    adjustments: {
      brightness: 0.05,
      contrast: -0.1,
      saturation: -0.15,
      temperature: 0.25,
      highlights: 0.1,
      shadows: 0.05,
      sharpness: -0.1,
    },
  },
  {
    id: 'vivid-pop',
    name: 'Vivid Pop',
    description: 'Bold, punchy colors and contrast',
    adjustments: {
      brightness: 0.1,
      contrast: 0.4,
      saturation: 0.6,
      temperature: 0.05,
      highlights: 0.15,
      shadows: -0.15,
      sharpness: 0.3,
    },
  },
  {
    id: 'matte-fade',
    name: 'Matte Fade',
    description: 'Lifted blacks and muted tones',
    adjustments: {
      brightness: 0.05,
      contrast: -0.3,
      saturation: -0.2,
      temperature: 0.1,
      highlights: -0.05,
      shadows: 0.3,
      sharpness: -0.05,
    },
  },
  {
    id: 'pastel-dream',
    name: 'Pastel Dream',
    description: 'Soft pastels with lifted shadows',
    adjustments: {
      brightness: 0.25,
      contrast: -0.15,
      saturation: 0.15,
      temperature: 0.2,
      highlights: 0.2,
      shadows: 0.25,
      sharpness: -0.1,
    },
  },
  {
    id: 'cinematic-teal',
    name: 'Cinematic Teal',
    description: 'Teal and orange film look',
    adjustments: {
      brightness: 0.05,
      contrast: 0.3,
      saturation: 0.3,
      temperature: -0.2,
      highlights: 0.1,
      shadows: -0.15,
      sharpness: 0.2,
    },
  },
  {
    id: 'sunrise-warm',
    name: 'Sunrise Warm',
    description: 'Soft morning light with warmth',
    adjustments: {
      brightness: 0.2,
      contrast: 0.15,
      saturation: 0.2,
      temperature: 0.35,
      highlights: 0.25,
      shadows: -0.05,
      sharpness: 0.05,
    },
  },
];

export const getPresetById = (id: string): Preset | undefined => {
  return PRESETS.find((preset) => preset.id === id);
};
