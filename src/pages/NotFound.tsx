
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="glass-card rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-4xl font-bold mb-2 text-gradient">404</h1>
        <p className="text-xl text-gray-300 mb-6">Oops! Page not found</p>
        <p className="text-gray-400 mb-8">
          The magical page you're looking for doesn't exist or has been moved to another realm.
        </p>
        <Button 
          onClick={() => navigate('/')}
          className="magic-gradient border-none text-white font-medium py-2 px-6"
        >
          Return to Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
