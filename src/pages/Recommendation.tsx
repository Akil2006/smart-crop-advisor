import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Sprout, 
  Droplets, 
  FlaskConical, 
  CloudRain, 
  ArrowLeft, 
  RefreshCw,
  CheckCircle,
  AlertTriangle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import RecommendationCard from "@/components/RecommendationCard";
import { Recommendation as RecommendationType, SoilData } from "@/types/farmer";

const Recommendation = () => {
  const navigate = useNavigate();
  const [recommendation, setRecommendation] = useState<RecommendationType | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);

  useEffect(() => {
    const storedRecommendation = sessionStorage.getItem('recommendation');
    const storedData = sessionStorage.getItem('farmerData');
    
    if (storedRecommendation && storedData) {
      setRecommendation(JSON.parse(storedRecommendation));
      setSoilData(JSON.parse(storedData));
    } else {
      navigate('/input');
    }
  }, [navigate]);

  if (!recommendation || !soilData) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-leaf-light animate-pulse flex items-center justify-center">
            <Sprout className="w-8 h-8 text-leaf" />
          </div>
          <p className="text-xl text-muted-foreground">Loading your recommendations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container py-8 md:py-12">
        <div className="max-w-3xl mx-auto">
          {/* Navigation */}
          <div className="flex flex-wrap gap-4 mb-6">
            <Button 
              variant="ghost" 
              onClick={() => navigate('/')}
              className="text-lg gap-2"
            >
              <ArrowLeft className="w-5 h-5" />
              Home
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/input')}
              className="text-lg gap-2"
            >
              <RefreshCw className="w-5 h-5" />
              New Input
            </Button>
          </div>

          {/* Success Header */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-leaf-light flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-leaf" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Your Farm Recommendations
            </h1>
            <p className="text-muted-foreground text-lg">
              Based on your soil data for <span className="font-semibold text-foreground">{soilData.location}</span> in <span className="font-semibold text-foreground">{soilData.season}</span> season
            </p>
          </div>

          {/* Recommendations Grid */}
          <div className="space-y-6">
            {/* Crop Recommendation - Highlighted */}
            <div className="animate-scale-in">
              <RecommendationCard
                title="Recommended Crop"
                icon={Sprout}
                iconBgClass="bg-leaf-light"
                iconClass="text-leaf"
                highlight
              >
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{recommendation.crop.icon}</span>
                  <div>
                    <h4 className="text-2xl font-bold text-primary">
                      {recommendation.crop.name}
                    </h4>
                    <p className="text-muted-foreground text-lg">
                      {recommendation.crop.description}
                    </p>
                  </div>
                </div>
              </RecommendationCard>
            </div>

            {/* Irrigation Advice */}
            <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
              <RecommendationCard
                title="Irrigation Advice"
                icon={Droplets}
                iconBgClass="bg-water-light"
                iconClass="text-water"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-water-light/50">
                    <p className="text-sm text-muted-foreground mb-1">Water Quantity</p>
                    <p className="text-xl font-bold">{recommendation.irrigation.waterQuantity}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-water-light/50">
                    <p className="text-sm text-muted-foreground mb-1">Timing</p>
                    <p className="text-xl font-bold">{recommendation.irrigation.timing}</p>
                  </div>
                </div>
                <div className="mt-4">
                  <p className="font-semibold mb-2">Tips:</p>
                  <ul className="space-y-2">
                    {recommendation.irrigation.tips.map((tip, index) => (
                      <li key={index} className="flex items-start gap-2 text-muted-foreground">
                        <CheckCircle className="w-5 h-5 text-leaf flex-shrink-0 mt-0.5" />
                        <span>{tip}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </RecommendationCard>
            </div>

            {/* Fertilizer Recommendation */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <RecommendationCard
                title="Fertilizer Guide"
                icon={FlaskConical}
                iconBgClass="bg-soil-light"
                iconClass="text-soil"
              >
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-soil-light/50">
                    <p className="text-sm text-muted-foreground mb-1">Type</p>
                    <p className="text-lg font-bold">{recommendation.fertilizer.type}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-soil-light/50">
                    <p className="text-sm text-muted-foreground mb-1">Amount</p>
                    <p className="text-lg font-bold">{recommendation.fertilizer.amount}</p>
                  </div>
                  <div className="p-4 rounded-xl bg-soil-light/50">
                    <p className="text-sm text-muted-foreground mb-1">When to Apply</p>
                    <p className="text-lg font-bold">{recommendation.fertilizer.schedule}</p>
                  </div>
                </div>
              </RecommendationCard>
            </div>

            {/* Weather Alert */}
            <div className="animate-fade-in" style={{ animationDelay: '0.3s' }}>
              <RecommendationCard
                title="Weather Alert"
                icon={CloudRain}
                iconBgClass="bg-sun-light"
                iconClass="text-warning"
              >
                <div className="flex items-start gap-4 p-4 rounded-xl bg-sun-light/50 border border-warning/20">
                  <AlertTriangle className="w-8 h-8 text-warning flex-shrink-0" />
                  <div>
                    <div className="flex flex-wrap items-center gap-4 mb-2">
                      <span className="text-lg font-bold">{recommendation.weather.condition}</span>
                      <span className="px-3 py-1 rounded-full bg-sun text-foreground font-semibold text-sm">
                        {recommendation.weather.temperature}
                      </span>
                    </div>
                    <p className="text-muted-foreground text-lg">
                      {recommendation.weather.alert}
                    </p>
                  </div>
                </div>
              </RecommendationCard>
            </div>
          </div>

          {/* Soil Data Summary */}
          <div className="mt-8 farmer-card bg-muted/50 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <h3 className="text-lg font-bold mb-4">Your Soil Data Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="p-3 rounded-xl bg-background">
                <p className="text-sm text-muted-foreground">Nitrogen (N)</p>
                <p className="text-xl font-bold text-leaf">{soilData.nitrogen}</p>
              </div>
              <div className="p-3 rounded-xl bg-background">
                <p className="text-sm text-muted-foreground">Phosphorus (P)</p>
                <p className="text-xl font-bold text-soil">{soilData.phosphorus}</p>
              </div>
              <div className="p-3 rounded-xl bg-background">
                <p className="text-sm text-muted-foreground">Potassium (K)</p>
                <p className="text-xl font-bold text-sun">{soilData.potassium}</p>
              </div>
              <div className="p-3 rounded-xl bg-background">
                <p className="text-sm text-muted-foreground">pH Level</p>
                <p className="text-xl font-bold text-water">{soilData.ph}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="farmer" 
              size="farmer"
              onClick={() => navigate('/input')}
              className="w-full sm:w-auto"
            >
              <RefreshCw className="w-6 h-6" />
              Get New Recommendation
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-8 mt-12">
        <div className="container text-center text-muted-foreground">
          <p className="text-lg">Made for Farmers, with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Recommendation;
