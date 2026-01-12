import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import PropertyShowcase from "@/components/PropertyShowcase";
import Services from "@/components/Services";
import Testimonials from "@/components/Testimonials";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Show popup after 1.5 seconds if not seen in this session
    const hasSeenPopup = sessionStorage.getItem("agentPopupSeen");
    if (hasSeenPopup) return;

    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setShowPopup(false);
    sessionStorage.setItem("agentPopupSeen", "true");
  };

  const handleAgentClick = () => {
    handleClose();
    navigate("/agent/register");
  };

  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <Hero />
      <PropertyShowcase />
      <Services />
      <Testimonials />
      <ContactForm />
      <Footer />

      {/* Agent Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 fade-in">
          <Card className="w-full max-w-md relative bg-card border-secondary/20 shadow-2xl animate-in zoom-in-95">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto">
                <Building2 className="h-8 w-8 text-secondary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-2">Are you a Property Owner?</h2>
                <p className="text-muted-foreground">
                  List your property with us and reach thousands of potential buyers!
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <Button size="lg" className="w-full bg-secondary hover:bg-secondary-hover text-white" onClick={handleAgentClick}>
                  List Your Property
                </Button>
                <Button variant="ghost" className="w-full" onClick={handleClose}>
                  No, I'm looking to buy
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
