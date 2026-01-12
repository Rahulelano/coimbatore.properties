import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import heroImage from "@/assets/hero-cityscape.jpg";
import logoIcon from "@/assets/logo-icon.png";

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate('/properties');
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-hero-overlay"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container-wide text-center text-white">


        {/* Main Heading */}
        <h1 className="text-hero mb-4 fade-in" style={{ animationDelay: "0.2s" }}>
          WELCOME
        </h1>
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-semibold mb-8 fade-in" style={{ animationDelay: "0.4s" }}>
          SHOWCASING COIMBATORE'S BEST REAL ESTATE PROJECTS
        </h2>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12 fade-in px-4" style={{ animationDelay: "0.6s" }}>
          <div className="bg-background/95 backdrop-blur-sm rounded-lg shadow-2xl p-2 border border-white/10">
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-0 sm:space-x-2">
              <div className="flex items-center w-full">
                <MapPin className="h-5 w-5 text-muted-foreground ml-3 shrink-0" />
                <Input
                  type="text"
                  placeholder="Search for Project, Builder, Area"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="flex-1 border-0 bg-transparent text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
                />
              </div>
              <Button variant="hero" size="lg" className="w-full sm:w-auto shrink-0" onClick={handleSearch}>
                <Search className="h-5 w-5 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Stats */}


        {/* CTA */}
        <div className="mt-8 md:mt-12 fade-in flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: "1s" }}>
          <Button variant="glass" size="xl" className="w-full sm:w-auto" onClick={() => navigate('/properties')}>
            Explore Properties
          </Button>
          <Button variant="outline" size="xl" className="w-full sm:w-auto bg-white/10 border-white/30 text-white hover:bg-white/20" onClick={() => navigate('/contact')}>
            Contact Expert
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 animate-bounce">
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
        </div>
      </div>
    </section>
  );
};

export default Hero;