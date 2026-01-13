import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    propertyType: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.message) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      // Import submitContact dynamically or use import at top level
      const { submitContact } = await import("@/api/endpoints");

      await submitContact({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: `${formData.subject ? `Subject: ${formData.subject}\n` : ''}${formData.propertyType ? `Type: ${formData.propertyType}\n` : ''}${formData.message}`
      });

      toast({
        title: "Message Sent!",
        description: "Thank you for contacting us. We'll get back to you within 24 hours.",
      });

      setFormData({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        propertyType: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Call Us",
      details: ["+91 86081 77777"],
      description: "Available 24/7 for your queries"
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@coimbatore.properties", "support@coimbatore.properties"],
      description: "We'll respond within 24 hours"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["Coimbatore, Tamil Nadu", "India"],
      description: "Schedule an appointment"
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: ["Mon - Sat: 9:00 AM - 8:00 PM", "Sun: 10:00 AM - 6:00 PM"],
      description: "We're here to help you"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="py-20 bg-primary/5">
        <div className="container-wide text-center">
          <h1 className="text-section-title mb-4">
            Get in <span className="text-secondary">Touch</span> with Us
          </h1>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Have questions about real estate? Need expert guidance for your home buying journey?
            We're here to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20">
        <div className="container-wide">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card key={index} className="text-center hover-lift slide-up bg-card text-card-foreground border-border" style={{ animationDelay: `${index * 0.1}s` }}>
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-card-title mb-3">{info.title}</h3>
                    <div className="space-y-1 mb-3">
                      {info.details.map((detail, i) => (
                        <p key={i} className="font-semibold text-foreground">{detail}</p>
                      ))}
                    </div>
                    <p className="text-muted-foreground text-sm">{info.description}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Contact Form & Map */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <Card className="slide-up bg-card text-card-foreground border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5 text-primary" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Full Name *
                    </label>
                    <Input
                      id="name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email address"
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      Phone Number *
                    </label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Enter your phone number"
                      required
                    />
                  </div>

                  {/* Property Type */}
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Property Interest
                    </label>
                    <Select
                      value={formData.propertyType}
                      onValueChange={(value) => setFormData({ ...formData, propertyType: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select property type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apartment">Apartment</SelectItem>
                        <SelectItem value="villa">Villa</SelectItem>
                        <SelectItem value="plot">Plot</SelectItem>
                        <SelectItem value="commercial">Commercial</SelectItem>
                        <SelectItem value="investment">Investment Property</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Enter message subject"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Message *
                    </label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Tell us about your requirements or questions"
                      rows={5}
                      required
                    />
                  </div>

                  {/* Submit Button */}
                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Additional Info */}
            <div className="space-y-8 slide-up" style={{ animationDelay: "0.2s" }}>
              {/* Why Choose Us */}
              <Card className="bg-card text-card-foreground border-border">
                <CardHeader>
                  <CardTitle>Why Choose Us?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Zero Commission</h4>
                      <p className="text-sm text-muted-foreground">
                        We don't charge any brokerage or commission fees from buyers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Expert Guidance</h4>
                      <p className="text-sm text-muted-foreground">
                        15+ years of experience in real estate advisory
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">Unbiased Reviews</h4>
                      <p className="text-sm text-muted-foreground">
                        Honest property reviews with pros and cons
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-secondary rounded-full mt-2 shrink-0"></div>
                    <div>
                      <h4 className="font-semibold mb-1">End-to-End Support</h4>
                      <p className="text-sm text-muted-foreground">
                        From property search to home loan assistance
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-card text-card-foreground border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Need Immediate Assistance?</h3>
                  <p className="text-muted-foreground mb-6">
                    For urgent property queries or site visits, call us directly.
                  </p>
                  <Button variant="secondary" size="lg" className="w-full">
                    <Phone className="h-4 w-4 mr-2" />
                    Call Now: +91 86081 77777
                  </Button>
                </CardContent>
              </Card>

              {/* Live Chat */}
              <Card className="bg-card text-card-foreground border-border">
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Live Chat Available</h3>
                  <p className="text-muted-foreground mb-6">
                    Connect with us on WhatsApp for instant replies and property details.
                  </p>
                  <Button variant="outline" size="lg" className="w-full" onClick={() => window.open('https://wa.me/918608177777', '_blank')}>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Chat on WhatsApp
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;