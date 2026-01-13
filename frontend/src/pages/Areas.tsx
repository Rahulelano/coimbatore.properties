import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import apartmentImage from "@/assets/property-apartment.jpg";

interface AreaDef {
  name: string;
  slug: string;
  projects: number;
  image: string;
  description: string;
  featured: boolean;
}

const Areas = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [areas, setAreas] = useState<AreaDef[]>([]);

  useEffect(() => {
    const loadAreas = async () => {
      try {
        const data = await import("@/api/endpoints").then(m => m.fetchAreas());
        // Map string array to object structure expected by UI
        const formattedAreas = data.map(area => ({
          name: area,
          slug: area, // Areas might have spaces, better to keep as is for query or slugify if needed. Backend regex handles it.
          projects: 0, // Mock or fetch count if available
          image: apartmentImage,
          description: "Prime residential location",
          featured: false
        }));
        setAreas(formattedAreas);
      } catch (error) {
        console.error("Failed to load areas", error);
      }
    };
    loadAreas();
  }, []);

  const filteredAreas = areas.filter(area =>
    area.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-primary/5">
        <div className="container-wide text-center">
          <h1 className="text-section-title mb-4">
            Explore Properties in <span className="text-secondary">Coimbatore Areas</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Discover premium residential projects across Coimbatore's top neighborhoods
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Search areas (e.g., Saravanampatti)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Areas Grid */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredAreas.map((area, index) => (
              <Card
                key={area.slug}
                className="group overflow-hidden hover-lift cursor-pointer slide-up bg-card text-card-foreground border-border"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/properties?area=${area.name}`)}
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={area.image}
                    alt={area.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  {area.featured && (
                    <div className="absolute top-4 right-4">
                      <Badge variant="secondary" className="bg-background/90 text-foreground">Featured</Badge>
                    </div>
                  )}
                  <div className="absolute bottom-4 left-4 text-white">
                    <h3 className="text-xl font-bold mb-1">{area.name}</h3>
                    <div className="flex items-center gap-1 text-sm">
                      <MapPin className="h-3 w-3" />
                      <span>{area.projects} Projects</span>
                    </div>
                  </div>
                </div>
                <CardContent className="p-6">
                  <p className="text-muted-foreground text-sm mb-4">{area.description}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-border text-foreground hover:bg-accent hover:text-accent-foreground"
                    onClick={(e) => {
                      e.stopPropagation();
                      navigate(`/properties?area=${area.name}`);
                    }}
                  >
                    Explore {area.name} Projects
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAreas.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">No areas found matching your search.</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Areas;