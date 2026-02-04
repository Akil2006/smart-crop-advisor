import { Recommendation, SoilData } from "@/types/farmer";

export const getRecommendation = (data: SoilData): Recommendation => {
  // Mock recommendation logic based on soil data
  const crops = [
    { name: "Rice (धान)", description: "Best suited for your soil with high moisture retention", icon: "🌾" },
    { name: "Wheat (गेहूं)", description: "Excellent choice for your nutrient-rich soil", icon: "🌾" },
    { name: "Cotton (कपास)", description: "Good drainage and warm climate crop", icon: "🌿" },
    { name: "Sugarcane (गन्ना)", description: "High water and nutrient requirements match your soil", icon: "🎋" },
    { name: "Maize (मक्का)", description: "Versatile crop for your balanced soil", icon: "🌽" },
  ];

  const seasonCropMap: Record<string, number> = {
    Kharif: 0, // Rice
    Rabi: 1,   // Wheat
    Zaid: 4,   // Maize
  };

  const selectedCrop = crops[seasonCropMap[data.season] || 0];

  const irrigationSchedules = {
    Kharif: {
      waterQuantity: "5-6 liters per square meter",
      timing: "Every 3-4 days",
      tips: [
        "Water early morning or evening",
        "Check soil moisture before watering",
        "Reduce watering during rainy days"
      ]
    },
    Rabi: {
      waterQuantity: "3-4 liters per square meter",
      timing: "Every 5-7 days",
      tips: [
        "Irrigate in morning to avoid frost",
        "Increase water during flowering stage",
        "Use mulching to retain moisture"
      ]
    },
    Zaid: {
      waterQuantity: "6-8 liters per square meter",
      timing: "Every 2-3 days",
      tips: [
        "Water in early morning only",
        "Use drip irrigation if possible",
        "Add mulch to reduce evaporation"
      ]
    }
  };

  // Calculate fertilizer based on NPK values
  let fertilizerType = "NPK 10-26-26";
  let fertilizerAmount = "50 kg per acre";
  
  if (data.nitrogen < 30) {
    fertilizerType = "Urea (46-0-0)";
    fertilizerAmount = "60 kg per acre";
  } else if (data.phosphorus < 20) {
    fertilizerType = "DAP (18-46-0)";
    fertilizerAmount = "40 kg per acre";
  } else if (data.potassium < 20) {
    fertilizerType = "MOP (0-0-60)";
    fertilizerAmount = "30 kg per acre";
  }

  // Weather alerts based on season
  const weatherAlerts: Record<string, { condition: string; alert: string; temperature: string }> = {
    Kharif: {
      condition: "Monsoon Season",
      alert: "Heavy rainfall expected. Ensure proper drainage in fields.",
      temperature: "28-35°C"
    },
    Rabi: {
      condition: "Winter Season",
      alert: "Frost risk in early morning. Protect young plants with straw cover.",
      temperature: "12-22°C"
    },
    Zaid: {
      condition: "Summer Season",
      alert: "High temperature expected. Increase irrigation frequency.",
      temperature: "35-42°C"
    }
  };

  return {
    crop: selectedCrop,
    irrigation: irrigationSchedules[data.season],
    fertilizer: {
      type: fertilizerType,
      amount: fertilizerAmount,
      schedule: data.season === 'Kharif' ? "Apply in 2 splits" : "Apply at sowing"
    },
    weather: weatherAlerts[data.season]
  };
};
