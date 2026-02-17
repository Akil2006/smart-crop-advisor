import { Sun, Droplets, CloudRain, Wind, AlertTriangle, Sprout, Leaf, FlaskConical, Clock, Target } from "lucide-react";

const WarningBanner = () => (
  <div className="flex items-center gap-3 bg-sun-light border border-sun rounded-xl px-5 py-3 mb-6">
    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0" />
    <p className="text-sm md:text-base font-semibold text-foreground">
      Heat wave warning for next week — protect crops by mulching
    </p>
  </div>
);

const AdvisoryCard = ({
  icon: Icon,
  iconBg,
  iconColor,
  title,
  badge,
  badgeColor,
  description,
}: {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  title: string;
  badge: string;
  badgeColor: string;
  description: string;
}) => (
  <div className="farmer-card flex items-start gap-4 p-4">
    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${iconBg}`}>
      <Icon className={`w-5 h-5 ${iconColor}`} />
    </div>
    <div className="min-w-0">
      <div className="flex items-center gap-2 flex-wrap">
        <h4 className="font-bold text-foreground text-sm">{title}</h4>
        <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${badgeColor}`}>{badge}</span>
      </div>
      <p className="text-muted-foreground text-xs mt-1">{description}</p>
    </div>
  </div>
);

const ProgressBar = ({ value, max, color }: { value: number; max: number; color: string }) => (
  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
    <div className={`h-full rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
  </div>
);

const WeatherCard = () => (
  <div className="farmer-card p-5">
    <h3 className="font-bold text-lg mb-3 text-foreground">Weather</h3>
    <div className="flex items-center gap-3 mb-4">
      <Sun className="w-10 h-10 text-sun" />
      <div>
        <span className="text-3xl font-extrabold text-foreground">34°C</span>
        <p className="text-sm text-sun font-semibold">Sunny</p>
      </div>
    </div>
    <div className="grid grid-cols-3 gap-3 mb-4">
      {[
        { label: "Humidity", value: "62%", icon: Droplets },
        { label: "Rainfall", value: "0mm", icon: CloudRain },
        { label: "Wind", value: "12km/h", icon: Wind },
      ].map((item) => (
        <div key={item.label} className="text-center bg-muted rounded-xl p-2">
          <item.icon className="w-4 h-4 mx-auto mb-1 text-muted-foreground" />
          <p className="text-sm font-bold text-foreground">{item.value}</p>
          <p className="text-xs text-muted-foreground">{item.label}</p>
        </div>
      ))}
    </div>
    <p className="text-xs font-semibold text-muted-foreground mb-2">5-Day Forecast</p>
    <div className="flex justify-between text-center">
      {[
        { day: "Mon", temp: "34°", icon: Sun },
        { day: "Tue", temp: "32°", icon: Sun },
        { day: "Wed", temp: "29°", icon: CloudRain },
        { day: "Thu", temp: "26°", icon: CloudRain },
        { day: "Fri", temp: "35°", icon: Sun },
      ].map((d) => (
        <div key={d.day} className="flex flex-col items-center gap-1">
          <p className="text-xs text-muted-foreground">{d.day}</p>
          <d.icon className="w-4 h-4 text-muted-foreground" />
          <p className="text-xs font-bold text-foreground">{d.temp}</p>
        </div>
      ))}
    </div>
  </div>
);

const SoilHealthCard = () => {
  const metrics = [
    { label: "Soil Moisture", value: "38%", pct: 38, color: "bg-water" },
    { label: "Soil Temp", value: "28°C", pct: 56, color: "bg-sun" },
    { label: "Nitrogen", value: "45kg/ha", pct: 60, color: "bg-leaf" },
    { label: "Phosphorus", value: "32kg/ha", pct: 42, color: "bg-leaf" },
    { label: "Potassium", value: "58kg/ha", pct: 75, color: "bg-sun" },
    { label: "pH Level", value: "6.5", pct: 65, color: "bg-water" },
  ];
  return (
    <div className="farmer-card p-5">
      <h3 className="font-bold text-lg mb-3 text-foreground">Soil Health</h3>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex justify-between text-xs mb-1">
              <span className="text-muted-foreground">{m.label}</span>
              <span className="font-bold text-foreground">{m.value}</span>
            </div>
            <ProgressBar value={m.pct} max={100} color={m.color} />
          </div>
        ))}
      </div>
    </div>
  );
};

const CropHealthCard = () => {
  const crops = [
    { name: "Wheat", status: "Healthy", score: 0.78, color: "text-leaf" },
    { name: "Rice", status: "Moderate", score: 0.52, color: "text-sun" },
    { name: "Mustard", status: "Stressed", score: 0.35, color: "text-destructive" },
  ];
  return (
    <div className="farmer-card p-5">
      <h3 className="font-bold text-lg mb-1 text-foreground">Crop Health</h3>
      <p className="text-xs text-muted-foreground mb-3">NDVI Index</p>
      <div className="space-y-4">
        {crops.map((c) => (
          <div key={c.name} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
              <span className={`text-sm font-extrabold ${c.color}`}>{c.score}</span>
            </div>
            <div>
              <p className="font-bold text-sm text-foreground">{c.name}</p>
              <p className={`text-xs font-semibold ${c.color}`}>{c.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const IrrigationCard = () => (
  <div className="farmer-card p-5">
    <h3 className="font-bold text-lg mb-3 text-foreground">Irrigation</h3>
    <div className="space-y-3">
      <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
        <Clock className="w-5 h-5 text-water flex-shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">Next Watering</p>
          <p className="font-bold text-sm text-foreground">Today, 6:00 PM</p>
        </div>
      </div>
      <div className="flex items-center gap-3 bg-muted rounded-xl p-3">
        <Target className="w-5 h-5 text-leaf flex-shrink-0" />
        <div>
          <p className="text-xs text-muted-foreground">Recommended</p>
          <p className="font-bold text-sm text-foreground">2,500 liters/acre</p>
        </div>
      </div>
    </div>
  </div>
);

const FarmerDashboard = () => {
  return (
    <section className="container py-8 md:py-12">
      <WarningBanner />

      {/* Today's Advisory */}
      <h2 className="text-xl md:text-2xl font-bold mb-4 text-foreground">Today's Advisory</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <AdvisoryCard
          icon={Droplets}
          iconBg="bg-water-light"
          iconColor="text-water"
          title="Water Today"
          badge="NOW"
          badgeColor="bg-water-light text-water"
          description="Soil moisture is low. Irrigate your wheat field this evening."
        />
        <AdvisoryCard
          icon={CloudRain}
          iconBg="bg-muted"
          iconColor="text-muted-foreground"
          title="Delay Sowing"
          badge="WAIT"
          badgeColor="bg-muted text-muted-foreground"
          description="Heavy rain expected in 3 days. Wait before sowing rice."
        />
        <AdvisoryCard
          icon={AlertTriangle}
          iconBg="bg-destructive/10"
          iconColor="text-destructive"
          title="High Pest Risk"
          badge="ALERT"
          badgeColor="bg-destructive/10 text-destructive"
          description="Aphid infestation likely in mustard crops. Apply neem spray."
        />
        <AdvisoryCard
          icon={FlaskConical}
          iconBg="bg-leaf-light"
          iconColor="text-leaf"
          title="Apply Fertilizer"
          badge="DO"
          badgeColor="bg-leaf-light text-leaf"
          description="Nitrogen level is low. Apply 50kg Urea per acre."
        />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <WeatherCard />
        <SoilHealthCard />
        <div className="space-y-4">
          <CropHealthCard />
          <IrrigationCard />
        </div>
      </div>
    </section>
  );
};

export default FarmerDashboard;
