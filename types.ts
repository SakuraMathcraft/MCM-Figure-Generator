
export interface GeneratedImage {
  id: string;
  url: string;
  prompt: string;
  category: string;
  timestamp: number;
}

export enum ImageCategory {
  AGING = 'Battery Aging/Swelling',
  DECOMPOSITION = 'Power Decomposition',
  THERMAL = 'Thermal Balance',
  INTERNAL = 'Internal Structure',
  MICRO_SCALE = 'Microscopic Degradation',
  USAGE_PROFILE = 'User Behavior Modeling',
  SYSTEM_MODEL = 'System Level Logic'
}

export interface PresetPrompt {
  id: string;
  title: string;
  description: string;
  category: ImageCategory;
  prompt: string;
}
