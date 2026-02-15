import { Sprout, LogIn, LogOut, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const Header = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/80 border-b border-border">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-leaf-light flex items-center justify-center">
            <Sprout className="w-6 h-6 text-leaf" />
          </div>
          <span className="text-xl font-bold text-foreground">
            Smart Farmer
          </span>
        </Link>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-leaf-light">
                <User className="w-4 h-4 text-leaf" />
                <span className="text-sm font-semibold text-leaf truncate max-w-[140px]">
                  {user.email}
                </span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive font-bold text-sm hover:bg-destructive/20 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          ) : (
            <Link
              to="/auth"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground font-bold text-sm hover:opacity-90 transition-opacity"
            >
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
