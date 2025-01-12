declare module '*.json' {
  const value: any;
  export default value;
}

export interface MaturityData {
  score: number;  // 0-100
  stage: 'mature' | 'emerging' | 'early';
  description: string;
}

export interface FeatureSupport {
  status: 'full' | 'partial' | 'none';
  details?: string;
}

export interface Feature {
  description: string;
  supported_by: {
    [player: string]: FeatureSupport;
  };
}

export interface Player {
  name: string;
  company: string;
  notable_features: string[];
  feature_support?: {
    [feature: string]: FeatureSupport;
  };
}

export interface News {
  date: string;
  title: string;
}

export interface Subsection extends MaturityData {
  features?: {
    [key: string]: Feature;
  };
}

export interface Capability extends MaturityData {
  subsections?: { [key: string]: Subsection };
  top_players: Player[];
  recent_news: News[];
}

export interface CapabilitiesData {
  metadata: {
    last_updated: string;
    version: string;
  };
  capabilities: {
    [key: string]: Capability;
  };
}
