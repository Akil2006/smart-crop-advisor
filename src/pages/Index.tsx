import { Link } from "react-router-dom";
import { Sprout, Droplets, FlaskConical, ArrowRight, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import FeatureCard from "@/components/FeatureCard";
import FarmPulse from "@/components/FarmPulse";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section */}
      <section className="container py-12 md:py-20">
        <div className="text-center max-w-3xl mx-auto animate-fade-in">
          {/* Large Icon */}
          <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-8 rounded-full bg-leaf-light flex items-center justify-center">
            <Sprout className="w-14 h-14 md:w-20 md:h-20 text-leaf" />
          </div>
          
          <h1 className="text-3xl md:text-5xl font-extrabold mb-6 text-foreground leading-tight">
            Smart Farmer
            <span className="block text-primary">Advisory System</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed">
            Get expert advice for your farm. Know which crop to grow, 
            how much water to use, and what fertilizer works best.
          </p>

          <p className="text-lg text-secondary font-semibold mb-10">
            अपने खेत के लिए विशेषज्ञ सलाह पाएं 🌾
          </p>
          
          <Link to="/input">
            <Button variant="farmer" size="farmer" className="w-full sm:w-auto">
              <Sprout className="w-7 h-7" />
              Get Recommendation
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">
          How We Help You
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <FeatureCard
            icon={Sprout}
            title="Best Crop"
            description="Know which crop will grow best in your soil and season"
            iconBgClass="bg-leaf-light"
            iconClass="text-leaf"
          />
          
          <FeatureCard
            icon={Droplets}
            title="Water Advice"
            description="Learn how much water your crops need and when to irrigate"
            iconBgClass="bg-water-light"
            iconClass="text-water"
          />
          
          <FeatureCard
            icon={FlaskConical}
            title="Fertilizer Guide"
            description="Get the right fertilizer type and amount for your field"
            iconBgClass="bg-soil-light"
            iconClass="text-soil"
          />
        </div>
      </section>

      {/* Farm Pulse - Today's Advisory */}
      <FarmPulse />

      {/* CTA Section */}
      <section className="container py-12 md:py-20">
        <div className="text-center">
          <p className="text-xl text-muted-foreground mb-8">
            Ready to improve your farming?
          </p>
          <Link to="/input">
            <Button variant="farmerSecondary" size="farmer" className="w-full sm:w-auto">
              Start Now
              <ArrowRight className="w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="container text-center text-muted-foreground">
          <p className="text-lg">Made for Farmers, with ❤️</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
