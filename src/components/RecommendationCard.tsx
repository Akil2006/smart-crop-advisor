import { LucideIcon } from "lucide-react";

interface RecommendationCardProps {
  title: string;
  icon: LucideIcon;
  iconBgClass: string;
  iconClass: string;
  children: React.ReactNode;
  highlight?: boolean;
}

const RecommendationCard = ({ 
  title, 
  icon: Icon, 
  iconBgClass, 
  iconClass, 
  children,
  highlight = false
}: RecommendationCardProps) => {
  return (
    <div className={`recommendation-card ${highlight ? 'ring-2 ring-primary' : ''}`}>
      <div className="flex items-center gap-4 mb-4">
        <div className={`icon-circle ${iconBgClass}`}>
          <Icon className={`w-8 h-8 ${iconClass}`} />
        </div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
};

export default RecommendationCard;
