export interface MemoryItem {
  id: string;
  title: string;
  date: string;
  location?: string;
  imageUrl: string;
  note: string;
  category: 'date' | 'milestone' | 'fun' | 'cute';
  heartCount: number;
  isCustom?: boolean;
}

export interface FlowerType {
  id: string;
  name: string;
  color: string;
  emoji: string;
  symbolMeaning: string;
  bgGradient: string;
}

export interface TimeTogether {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  totalDays: number;
  totalHours: number;
  totalMinutes: number;
  totalSeconds: number;
}

export type AppStage = 'envelope' | 'letter' | 'main';
export type MainSection = 'counter' | 'memories' | 'bouquet';
