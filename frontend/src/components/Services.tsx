import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, MessageCircle, Home, Users, Star, Shield } from "lucide-react";

const Services = () => {
  const navigate = useNavigate();
  const services = [
    {
      icon: Search,
      title: "Real Estate Market",
      description: "We provide authentic and latest information on residential and commercial projects along with unbiased reviews, feedback from buyers, group buying offers, property Q&A, best inventory, best deals, and much more at ZERO commission charges."
    },
    {
      icon: Star,
      title: "Detailed Analysis across the board",
      description: "Our analysis & findings meet the expectations of people in their need for clarity and simplification of real estate experience and dealings."
    },
    {
      icon: Shield,
      title: "Unbiased reviews on Branded residential projects",
      description: "We review each property based on multiple criteria so that home buyers get complete information including pros and cons for every property thus making sure their investments are safe."
    },
    {
      icon: MessageCircle,
      title: "Discussion Forum for Home Buyers",
      description: "coimbatore.properties is open to guests and subscribed members get alerts on latest discussions, reviews, home buyers' experiences, clear real estate uncertainties, private messaging system to communicate with other members and much more!"
    }
  ];

  const buyingSteps = [
    {
      step: "01",
      title: "Search from Property Reviews",
      description: "Our reviews provide in-depth property coverage on location, builder, unique selling points of projects, layout plans, floor plans, pricing, specification, amenities and much more.",
      icon: Search
    },
    {
      step: "02",
      title: "Consult on your chosen Property",
      description: "This provides us the ability to invaluable buying inputs on the basis of your requirements. We will help you shortlist the properties that suit your needs and requirements and guide you to the best property.",
      icon: Users
    },
    {
      step: "03",
      title: "Book your Dream Home",
      description: "Our excellent relationship with the developers gives us the opportunity to negotiate best deals for you. We ensure a convenient & hassle free transaction by guiding you through the complete booking, home loan & allotment process.",
      icon: Home
    }
  ];

  return (
    <section className="py-20">
      <div className="container-wide">
        {/* Home Buying Made Easy Section */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-section-title mb-4">
            <span className="text-secondary">Home Buying</span> Made Easy
          </h2>
          <h3 className="text-xl text-muted-foreground font-medium mb-8">
            The Coimbatore Properties Way
          </h3>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card key={index} className="group hover-lift slide-up bg-card text-card-foreground border-border" style={{ animationDelay: `${index * 0.1}s` }}>
                <CardContent className="p-8 text-center">
                  <div className="mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>
                  <h3 className="text-card-title mb-4">{service.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{service.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* How We Help Property Seekers */}
        <div className="mb-20">
          <div className="text-center mb-16 fade-in">
            <h2 className="text-section-title mb-4">
              How we help <span className="text-secondary">Property Seekers</span>
            </h2>
            <p className="text-xl text-muted-foreground font-medium mb-8">
              Our FREE Service will help you buy your Dream Property in 3 easy Steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {buyingSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={index} className="text-center slide-up" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="mb-6">
                    <div className="relative inline-block">
                      <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mx-auto shadow-xl">
                        <Icon className="h-10 w-10 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                        {step.step}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-card-title mb-4">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-primary/5 rounded-2xl p-12 fade-in">
          <h3 className="text-2xl font-bold mb-4">Ready to Find Your Dream Home?</h3>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            Let our experts guide you through the entire home buying process. Get personalized recommendations and the best deals in the market.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="default" size="lg" onClick={() => navigate('/properties')}>
              Start Property Search
            </Button>
            <Button variant="outline" size="lg" onClick={() => navigate('/contact')}>
              Consult Our Experts
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;