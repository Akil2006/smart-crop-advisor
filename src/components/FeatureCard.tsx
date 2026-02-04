import { LucideIcon } from "lucide-react";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconBgClass: string;
  iconClass: string;
}

const FeatureCard = ({ icon: Icon, title, description, iconBgClass, iconClass }: FeatureCardProps) => {
  return (
    <div className="farmer-card flex flex-col items-center text-center animate-fade-in">
      <div className={`icon-circle ${iconBgClass} mb-4`}>
        <Icon className={`w-8 h-8 ${iconClass}`} />
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
};

export default FeatureCard;
