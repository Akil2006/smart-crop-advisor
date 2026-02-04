import { HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { LucideIcon } from "lucide-react";

interface FormFieldProps {
  label: string;
  tooltip: string;
  icon: LucideIcon;
  children: React.ReactNode;
  iconBgClass?: string;
  iconClass?: string;
}

const FormField = ({ 
  label, 
  tooltip, 
  icon: Icon, 
  children,
  iconBgClass = "bg-leaf-light",
  iconClass = "text-leaf"
}: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-xl ${iconBgClass} flex items-center justify-center flex-shrink-0`}>
          <Icon className={`w-5 h-5 ${iconClass}`} />
        </div>
        <label className="text-lg font-semibold flex items-center gap-2 flex-wrap">
          {label}
          <Tooltip>
            <TooltipTrigger asChild>
              <button type="button" className="inline-flex">
                <HelpCircle className="w-5 h-5 text-muted-foreground hover:text-primary transition-colors" />
              </button>
            </TooltipTrigger>
            <TooltipContent 
              side="top" 
              className="max-w-xs text-base p-4 bg-popover text-popover-foreground border border-border shadow-card"
            >
              {tooltip}
            </TooltipContent>
          </Tooltip>
        </label>
      </div>
      {children}
    </div>
  );
};

export default FormField;
