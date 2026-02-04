import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Beaker, 
  MapPin, 
  Calendar, 
  ArrowRight, 
  ArrowLeft,
  FlaskConical,
  Droplets,
  Leaf
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import FormField from "@/components/FormField";
import { SoilData } from "@/types/farmer";
import { getRecommendation } from "@/lib/mockData";

const InputForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Partial<SoilData>>({
    nitrogen: undefined,
    phosphorus: undefined,
    potassium: undefined,
    ph: undefined,
    location: "",
    season: undefined
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields are filled
    if (
      formData.nitrogen === undefined ||
      formData.phosphorus === undefined ||
      formData.potassium === undefined ||
      formData.ph === undefined ||
      !formData.location ||
      !formData.season
    ) {
      return;
    }

    const recommendation = getRecommendation(formData as SoilData);
    
    // Store in sessionStorage and navigate
    sessionStorage.setItem('farmerData', JSON.stringify(formData));
    sessionStorage.setItem('recommendation', JSON.stringify(recommendation));
    navigate('/recommendation');
  };

  const handleNumberInput = (field: keyof SoilData, value: string) => {
    const numValue = value === '' ? undefined : parseFloat(value);
    setFormData(prev => ({ ...prev, [field]: numValue }));
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        <div className="max-w-2xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')}
            className="mb-6 text-lg gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>

          <div className="farmer-card animate-fade-in">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-leaf-light flex items-center justify-center">
                <Beaker className="w-8 h-8 text-leaf" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                Enter Your Soil Details
              </h1>
              <p className="text-muted-foreground text-lg">
                Tell us about your soil and we'll help you grow better crops
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Nitrogen */}
              <FormField
                label="Nitrogen (N) Value"
                tooltip="Nitrogen helps plants grow green and healthy leaves. You can get this value from a soil test kit or your local agriculture office."
                icon={Leaf}
                iconBgClass="bg-leaf-light"
                iconClass="text-leaf"
              >
                <Input
                  type="number"
                  placeholder="Enter nitrogen value (0-100)"
                  className="farmer-input"
                  value={formData.nitrogen ?? ''}
                  onChange={(e) => handleNumberInput('nitrogen', e.target.value)}
                  min={0}
                  max={100}
                  required
                />
              </FormField>

              {/* Phosphorus */}
              <FormField
                label="Phosphorus (P) Value"
                tooltip="Phosphorus helps roots grow strong and produces more flowers and fruits. Get this tested at a soil lab."
                icon={FlaskConical}
                iconBgClass="bg-soil-light"
                iconClass="text-soil"
              >
                <Input
                  type="number"
                  placeholder="Enter phosphorus value (0-100)"
                  className="farmer-input"
                  value={formData.phosphorus ?? ''}
                  onChange={(e) => handleNumberInput('phosphorus', e.target.value)}
                  min={0}
                  max={100}
                  required
                />
              </FormField>

              {/* Potassium */}
              <FormField
                label="Potassium (K) Value"
                tooltip="Potassium helps plants fight diseases and improves crop quality. This is also measured in a soil test."
                icon={Beaker}
                iconBgClass="bg-sun-light"
                iconClass="text-sun"
              >
                <Input
                  type="number"
                  placeholder="Enter potassium value (0-100)"
                  className="farmer-input"
                  value={formData.potassium ?? ''}
                  onChange={(e) => handleNumberInput('potassium', e.target.value)}
                  min={0}
                  max={100}
                  required
                />
              </FormField>

              {/* pH */}
              <FormField
                label="Soil pH Value"
                tooltip="pH tells if your soil is acidic or alkaline. Most crops grow best between 6.0 and 7.0. You can test this with a simple pH meter."
                icon={Droplets}
                iconBgClass="bg-water-light"
                iconClass="text-water"
              >
                <Input
                  type="number"
                  step="0.1"
                  placeholder="Enter pH value (0-14)"
                  className="farmer-input"
                  value={formData.ph ?? ''}
                  onChange={(e) => handleNumberInput('ph', e.target.value)}
                  min={0}
                  max={14}
                  required
                />
              </FormField>

              {/* Location */}
              <FormField
                label="Location (City/District)"
                tooltip="Enter your village, city or district name. This helps us give weather-based advice for your area."
                icon={MapPin}
                iconBgClass="bg-destructive/10"
                iconClass="text-destructive"
              >
                <Input
                  type="text"
                  placeholder="Enter your city or district"
                  className="farmer-input"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  required
                />
              </FormField>

              {/* Season */}
              <FormField
                label="Growing Season"
                tooltip="Kharif (June-Oct): Monsoon crops like rice, cotton. Rabi (Oct-Mar): Winter crops like wheat. Zaid (Mar-Jun): Summer crops like watermelon."
                icon={Calendar}
                iconBgClass="bg-primary/10"
                iconClass="text-primary"
              >
                <Select
                  value={formData.season}
                  onValueChange={(value: SoilData['season']) => 
                    setFormData(prev => ({ ...prev, season: value }))
                  }
                  required
                >
                  <SelectTrigger className="farmer-input">
                    <SelectValue placeholder="Select growing season" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border border-border shadow-card">
                    <SelectItem value="Kharif" className="text-lg py-3">
                      🌧️ Kharif (Monsoon - June to October)
                    </SelectItem>
                    <SelectItem value="Rabi" className="text-lg py-3">
                      ❄️ Rabi (Winter - October to March)
                    </SelectItem>
                    <SelectItem value="Zaid" className="text-lg py-3">
                      ☀️ Zaid (Summer - March to June)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              {/* Submit Button */}
              <div className="pt-4">
                <Button 
                  type="submit" 
                  variant="farmer" 
                  size="farmer"
                  className="w-full"
                >
                  Get My Recommendation
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default InputForm;
