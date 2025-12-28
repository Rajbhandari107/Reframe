
export interface ReframeResult {
  organizedToday: {
    activities: string[];
    signals: string[];
    patterns: string[];
  };
  organizedTomorrow: {
    activities: string[];
  };
  planVsReality?: {
    followedThrough: string[];
    missed: string[];
    unplanned: string[];
  };
  realityCheck: string;
  smallAdjustment: string;
}

export interface ReflectionEntry {
  id: string;
  date: string;
  todayInput: string;
  tomorrowInput: string;
  result: ReframeResult;
}

export enum AppView {
  LANDING = 'LANDING',
  ENTRY = 'ENTRY',
  MAIN = 'MAIN',
  HISTORY = 'HISTORY'
}
