import { Sprout } from "lucide-react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container flex h-16 items-center">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-leaf-light flex items-center justify-center">
            <Sprout className="w-6 h-6 text-leaf" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Smart Farmer
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
