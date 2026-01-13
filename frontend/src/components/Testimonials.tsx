import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const Testimonials = () => {
  const navigate = useNavigate();

  const testimonials = [
    {
      id: 1,
      name: "Prasamith Kalith",
      property: "Prestige Sunrise Park",
      unit: "2.5 BHK",
      consultant: "Ravi Kumar (coimbatore.properties), Syed (Prestige Sales)",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 2,
      name: "Mr. Pradeep",
      property: "Prestige Song of the South",
      unit: "Booked Unit",
      consultant: "Prabat Suman (Prestige Sales), Ravi Kumar (coimbatore.properties)",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 3,
      name: "Dr. Shiva & Family",
      property: "L&T Raintree Boulevard",
      unit: "3 BHK",
      consultant: "Ravi Kumar (coimbatore.properties)",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 4,
      name: "Mr. & Mrs. Edwin Rajan",
      property: "Century Sports Village",
      unit: "Plot",
      consultant: "Srinidhi (coimbatore.properties), Mr. Nitin (Century Sales)",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 5,
      name: "Mr. & Mrs. Namresh",
      property: "DNR Atmosphere",
      unit: "3 BHK",
      consultant: "Ravi Kumar (coimbatore.properties), Mr. Hemanth (DNR Sales)",
      rating: 5,
      image: "/api/placeholder/80/80"
    },
    {
      id: 6,
      name: "Mr. Prashanth",
      property: "Prestige Kew Gardens",
      unit: "3 BHK",
      consultant: "Ravi Kumar (coimbatore.properties)",
      rating: 5,
      image: "/api/placeholder/80/80"
    }
  ];

  return (
    <section className="py-20 bg-muted/30">
      <div className="container-wide">
        {/* Section Header */}
        <div className="text-center mb-16 fade-in">
          <h2 className="text-section-title mb-4">
            Our Recent <span className="text-secondary">Delighted</span> Home Buyers
          </h2>
          <h3 className="text-xl text-muted-foreground font-medium">
            Who got the Best Deals & Offers!
          </h3>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={testimonial.id} className="group hover-lift slide-up bg-card text-card-foreground border-border" style={{ animationDelay: `${index * 0.1}s` }}>
              <CardContent className="p-6">
                {/* Quote Icon */}
                <div className="flex justify-center mb-4">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                    <Quote className="h-6 w-6 text-secondary" />
                  </div>
                </div>

                {/* Customer Info */}
                <div className="text-center mb-4">
                  <div className="w-20 h-20 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                    <span className="text-2xl font-bold text-muted-foreground">
                      {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </span>
                  </div>
                  <h3 className="font-semibold text-lg mb-1">{testimonial.name}</h3>

                  {/* Rating */}
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div className="space-y-3">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">
                      Booked {testimonial.unit}
                    </Badge>
                    <h4 className="font-semibold text-primary">{testimonial.property}</h4>
                  </div>

                  {/* Consultant Info */}
                  <div className="bg-muted/50 rounded-lg p-3">
                    <p className="text-sm text-muted-foreground text-center">
                      <span className="font-medium">With:</span> {testimonial.consultant}
                    </p>
                  </div>
                </div>

                {/* Success Badge */}
                <div className="flex justify-center mt-4">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    ✓ Successfully Booked
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16 fade-in">
          <div className="bg-primary/5 rounded-2xl p-8">
            <h3 className="text-2xl font-bold mb-4">Want to be our next success story?</h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied home buyers who found their dream properties with our expert guidance and zero commission fees.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                className="bg-secondary hover:bg-secondary-hover text-secondary-foreground px-8 py-3 rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
                onClick={() => navigate('/contact')}
              >
                Get Expert Consultation
              </Button>
              <Button
                variant="outline"
                className="border border-border hover:bg-accent hover:text-accent-foreground px-8 py-3 rounded-lg font-semibold transition-colors"
                onClick={() => navigate('/reviews')} // Assuming /reviews exists or will just redirect to home/reviews section
              >
                View All Success Stories
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;