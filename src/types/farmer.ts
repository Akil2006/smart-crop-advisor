export interface SoilData {
  nitrogen: number;
  phosphorus: number;
  potassium: number;
  ph: number;
  location: string;
  season: 'Kharif' | 'Rabi' | 'Zaid';
}

export interface Recommendation {
  crop: {
    name: string;
    description: string;
    icon: string;
  };
  irrigation: {
    waterQuantity: string;
    timing: string;
    tips: string[];
  };
  fertilizer: {
    type: string;
    amount: string;
    schedule: string;
  };
  weather: {
    condition: string;
    alert: string;
    temperature: string;
  };
}
