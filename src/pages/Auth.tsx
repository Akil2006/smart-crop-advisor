import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Sprout, Mail, Lock, Eye, EyeOff, UserPlus, LogIn, Leaf, Sun, Droplets } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast({ title: "Welcome back! 🌾", description: "You are now logged in." });
        navigate("/");
      } else {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: window.location.origin },
        });
        if (error) throw error;
        toast({
          title: "Account created! 🌱",
          description: "Please check your email to verify your account.",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-primary via-accent to-secondary" />

      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Logo & Title */}
          <div className="text-center mb-8 animate-fade-in">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-leaf-light mb-4">
              <Sprout className="w-10 h-10 text-leaf" />
            </div>
            <h1 className="text-3xl font-extrabold text-foreground">Smart Farmer</h1>
            <p className="text-muted-foreground mt-2 text-lg">
              {isLogin ? "Welcome back, farmer! 🌾" : "Join our farming community 🌱"}
            </p>
          </div>

          {/* Auth Card */}
          <div className="farmer-card animate-fade-in" style={{ animationDelay: "0.1s" }}>
            {/* Tab Switcher */}
            <div className="flex rounded-xl bg-muted p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-base font-bold transition-all ${
                  isLogin
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <LogIn className="w-5 h-5" />
                Login
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-base font-bold transition-all ${
                  !isLogin
                    ? "bg-primary text-primary-foreground shadow-md"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                <UserPlus className="w-5 h-5" />
                Sign Up
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block text-base font-bold text-foreground mb-2">
                  📧 Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="farmer-input pl-12"
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <label className="block text-base font-bold text-foreground mb-2">
                  🔒 Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={isLogin ? "Enter your password" : "Create a strong password"}
                    required
                    minLength={6}
                    className="farmer-input pl-12 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {!isLogin && (
                  <p className="text-sm text-muted-foreground mt-1.5">
                    Use at least 6 characters
                  </p>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="farmer-btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <span className="animate-spin w-6 h-6 border-3 border-primary-foreground border-t-transparent rounded-full" />
                ) : isLogin ? (
                  <>
                    <LogIn className="w-6 h-6" />
                    Login
                  </>
                ) : (
                  <>
                    <UserPlus className="w-6 h-6" />
                    Create Account
                  </>
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center gap-3 my-6">
              <div className="flex-1 h-px bg-border" />
              <span className="text-sm text-muted-foreground font-semibold">
                {isLogin ? "New to Smart Farmer?" : "Already have an account?"}
              </span>
              <div className="flex-1 h-px bg-border" />
            </div>

            {/* Switch Mode Link */}
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="w-full py-3 text-center text-base font-bold text-primary hover:underline transition-all"
            >
              {isLogin ? "Create a new account →" : "← Back to login"}
            </button>
          </div>

          {/* Decorative icons */}
          <div className="flex justify-center gap-6 mt-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="w-12 h-12 rounded-full bg-leaf-light flex items-center justify-center">
              <Leaf className="w-6 h-6 text-leaf" />
            </div>
            <div className="w-12 h-12 rounded-full bg-sun-light flex items-center justify-center">
              <Sun className="w-6 h-6 text-sun" />
            </div>
            <div className="w-12 h-12 rounded-full bg-water-light flex items-center justify-center">
              <Droplets className="w-6 h-6 text-water" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
