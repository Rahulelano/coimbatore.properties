import { useNavigate } from "react-router-dom"; // Added
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Award, Home, Shield, Target, Eye } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const About = () => {
  const navigate = useNavigate(); // Hook


  const values = [
    {
      icon: Shield,
      title: "Transparency",
      description: "We provide honest, unbiased reviews and transparent pricing with zero hidden costs."
    },
    {
      icon: Users,
      title: "Customer First",
      description: "Your satisfaction is our priority. We guide you through every step of your home buying journey."
    },
    {
      icon: Award,
      title: "Excellence",
      description: "We maintain the highest standards in service delivery and property advisory."
    },
    {
      icon: Target,
      title: "Expertise",
      description: "Our team of real estate experts brings deep market knowledge and insights."
    }
  ];



  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-primary/5">
        <div className="container-wide text-center">
          <h1 className="text-section-title mb-4">
            About <span className="text-secondary">coimbatore.properties</span>
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-3xl mx-auto">
            India's most trusted real estate advisory platform, helping home buyers make informed decisions
            with expert guidance, unbiased reviews, and zero commission charges.
          </p>

        </div>
      </section>



      {/* Our Story */}
      <section className="py-20 bg-muted/30">
        <div className="container-wide">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="slide-up">
              <h2 className="text-section-title mb-6">Our Story</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Founded with a vision to simplify the real estate experience for home buyers,
                coimbatore.properties has emerged as India's leading real estate advisory platform.
                We understand that buying a home is one of life's most significant decisions,
                and we're here to make it easier, transparent, and stress-free.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Our journey began with a simple belief: every home buyer deserves honest,
                unbiased information and expert guidance without paying hefty commission fees.
                Today, we've helped over 70,000 families find their dream homes across major Indian cities.
              </p>
              <Button variant="default" size="lg" onClick={() => navigate('/contact')}>
                Start Your Journey
              </Button>
            </div>

            <div className="slide-up" style={{ animationDelay: "0.2s" }}>
              <Card className="p-8 bg-card text-card-foreground border-border">
                <div className="flex items-center gap-4 mb-6">
                  <Eye className="h-8 w-8 text-primary" />
                  <div>
                    <h3 className="text-xl font-semibold">Our Vision</h3>
                    <p className="text-muted-foreground">
                      To be India's most trusted real estate advisory platform
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Target className="h-8 w-8 text-secondary" />
                  <div>
                    <h3 className="text-xl font-semibold">Our Mission</h3>
                    <p className="text-muted-foreground">
                      Empowering home buyers with transparent information and expert guidance
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-20">
        <div className="container-wide">
          <div className="text-center mb-16">
            <h2 className="text-section-title mb-4">Our Core Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center hover-lift slide-up bg-card text-card-foreground border-border" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="text-card-title mb-3">{value.title}</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>



      {/* CTA Section */}
      <section className="py-20">
        <div className="container-wide">
          <Card className="bg-card text-card-foreground border-border">
            <CardContent className="p-12 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to Start Your Home Buying Journey?</h2>
              <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
                Let our experienced team guide you through the process of finding and purchasing your dream home.
                Get started with a free consultation today.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button variant="default" size="lg" onClick={() => navigate('/contact')}>
                  Schedule Free Consultation
                </Button>
                <Button variant="outline" size="lg" onClick={() => navigate('/properties')}>
                  Browse Properties
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;