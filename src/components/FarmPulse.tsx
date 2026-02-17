import { Droplets, CloudRain, AlertTriangle, FlaskConical } from "lucide-react";

const advisories = [
  {
    icon: Droplets,
    iconBg: "bg-water-light",
    iconColor: "text-water",
    title: "Water Today",
    badge: "NOW",
    badgeColor: "bg-water-light text-water",
    description: "Soil moisture is low. Irrigate your wheat field this evening.",
  },
  {
    icon: CloudRain,
    iconBg: "bg-muted",
    iconColor: "text-muted-foreground",
    title: "Delay Sowing",
    badge: "WAIT",
    badgeColor: "bg-muted text-muted-foreground",
    description: "Heavy rain expected in 3 days. Wait before sowing rice.",
  },
  {
    icon: AlertTriangle,
    iconBg: "bg-destructive/10",
    iconColor: "text-destructive",
    title: "High Pest Risk",
    badge: "ALERT",
    badgeColor: "bg-destructive/10 text-destructive",
    description: "Aphid infestation likely in mustard crops. Apply neem spray.",
  },
  {
    icon: FlaskConical,
    iconBg: "bg-leaf-light",
    iconColor: "text-leaf",
    title: "Apply Fertilizer",
    badge: "DO",
    badgeColor: "bg-leaf-light text-leaf",
    description: "Nitrogen level is low. Apply 50kg Urea per acre.",
  },
];

const FarmPulse = () => {
  return (
    <section className="container py-10 md:py-14">
      <div className="farmer-card p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold text-foreground mb-6">
          🌿 Farm Pulse — Today's Advisory
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {advisories.map((a) => (
            <div key={a.title} className="flex items-start gap-4 bg-background rounded-2xl p-4 border border-border">
              <div className={`w-11 h-11 rounded-full flex items-center justify-center flex-shrink-0 ${a.iconBg}`}>
                <a.icon className={`w-5 h-5 ${a.iconColor}`} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="font-bold text-foreground">{a.title}</h4>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${a.badgeColor}`}>{a.badge}</span>
                </div>
                <p className="text-muted-foreground text-sm mt-1">{a.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FarmPulse;
