import { useNavigate } from "react-router-dom"; // Added import
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import apartmentImage from "@/assets/property-apartment.jpg";
import villaImage from "@/assets/property-villa.jpg";
import plotImage from "@/assets/property-plots.jpg";
import townshipImage from "@/assets/property-township.jpg";

const PropertyShowcase = () => {
  const navigate = useNavigate(); // Hook for navigation

  const propertyTypes = [
    {
      title: "Apartments",
      image: apartmentImage,
      description: "Premium apartment complexes with modern amenities",
      link: "/properties?type=Apartment"
    },
    {
      title: "Villas",
      image: villaImage,
      description: "Luxury independent villas with private gardens",
      link: "/properties?type=Villa"
    },
    {
      title: "Plots",
      image: plotImage,
      description: "Residential plots in prime locations",
      link: "/properties?type=Plot"
    },
    {
      title: "Townships",
      image: townshipImage,
      description: "Integrated township developments",
      link: "/properties?type=Township"
    }
  ];

  const featuredProjects = [
    {
      id: 1,
      title: "G Square City in Coimbatore",
      location: "L&T Bypass Road",
      type: "Plot",
      status: "New Launch",
      image: plotImage,
      description: "Premium residential plots in Coimbatore's IT corridor"
    },
    {
      id: 2,
      title: "Puravankara BluBelle in Coimbatore",
      location: "Singanallur",
      type: "Apartment",
      status: "Available",
      image: apartmentImage,
      description: "Luxury apartments in the heart of Coimbatore"
    },
    {
      id: 3,
      title: "Casagrand FirstCity in Coimbatore",
      location: "Kalapatti",
      type: "Apartment",
      status: "Pre Launch",
      image: apartmentImage,
      description: "Ultra-premium residential project near Coimbatore Airport"
    },
    {
      id: 4,
      title: "Isha Homes Villas in Coimbatore",
      location: "Vadavalli",
      type: "Villa",
      status: "New Launch",
      image: villaImage,
      description: "Serene residential villas with modern amenities"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-section-title mb-4">
            Explore The <span className="text-primary">Finest</span> Projects in Coimbatore
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover premium residential properties across Coimbatore's prime locations with expert guidance and unbiased reviews
          </p>
        </div>

        {/* Property Types Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {propertyTypes.map((type, index) => (
            <Card
              key={type.title}
              className="group overflow-hidden hover-lift cursor-pointer slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={() => navigate(type.link)}
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={type.image}
                  alt={type.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <CardContent className="p-6 text-center">
                <h3 className="text-card-title mb-2">{type.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{type.description}</p>
                <Button variant="outline" size="sm" className="w-full">
                  Explore {type.title}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Latest Projects Section */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row items-center justify-between mb-8 gap-4">
            <h3 className="text-section-title">Latest Projects</h3>
            <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 px-2 scrollbar-none snap-x">
              <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0" onClick={() => navigate('/properties?status=new-launch')}>New Launch</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0" onClick={() => navigate('/properties?type=Apartment')}>Apartments</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0" onClick={() => navigate('/properties?type=Plot')}>Plots</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0" onClick={() => navigate('/properties?type=Villa')}>Villas</Button>
              <Button variant="outline" size="sm" className="whitespace-nowrap shrink-0" onClick={() => navigate('/properties')}>All Projects</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProjects.map((project, index) => (
              <Card
                key={project.id}
                className="group overflow-hidden hover-lift cursor-pointer slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={() => navigate(`/properties`)} // Since these are hardcoded for showcase, we just go to properties list or dummy details. Use properties list for now as IDs might not match DB.
              >
                <div className="aspect-[4/3] overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="shadow-lg">
                      {project.status}
                    </Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-background/90 text-foreground shadow-lg">
                      {project.type}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h4 className="font-semibold text-sm mb-2 line-clamp-2">{project.title}</h4>
                  <p className="text-muted-foreground text-xs mb-3">{project.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-primary">{project.location}</span>
                    <Button variant="ghost" size="sm" className="text-xs">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Pagination - For visual purpose on index, but linking to main properties page */}
        <div className="flex items-center justify-center space-x-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/properties')}>View All Projects</Button>
        </div>
      </div>
    </section>
  );
};

export default PropertyShowcase;