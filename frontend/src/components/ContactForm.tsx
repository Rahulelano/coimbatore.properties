import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Phone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const ContactForm = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    requirement: "",
    homeLoan: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.phoneNumber || !formData.email) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    try {
      const { submitContact } = await import("@/api/endpoints");

      await submitContact({
        name: formData.fullName,
        email: formData.email,
        phone: formData.phoneNumber,
        message: `Requirement: ${formData.requirement}\nHome Loan Assistance: ${formData.homeLoan}`
      });

      toast({
        title: "Success!",
        description: "Your enquiry has been submitted. Our expert will contact you soon.",
      });

      // Reset form
      setFormData({
        fullName: "",
        phoneNumber: "",
        email: "",
        requirement: "",
        homeLoan: ""
      });
    } catch (error) {
      console.error("Submission error:", error);
      toast({
        title: "Error",
        description: "Failed to submit enquiry. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <section className="py-20 bg-primary/5">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 fade-in">
            <h2 className="text-section-title mb-4">
              GET THE COMPLETE <span className="text-secondary">COSTING DETAILS</span> NOW!
            </h2>
            <p className="text-lg text-muted-foreground">
              Fill out the form below and our experts will provide you with detailed cost information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="lg:col-span-1 slide-up">
              <Card className="h-full bg-card text-card-foreground border-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Phone className="h-5 w-5 text-secondary" />
                    Contact Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-2">Call Now</h3>
                    <a
                      href="tel:+918608177777"
                      className="text-2xl font-bold text-primary hover:text-primary-hover transition-colors"
                    >
                      +91 86081 77777
                    </a>
                  </div>

                  <div className="space-y-3">
                    <h3 className="font-semibold">Our Services</h3>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Zero Commission Charges</li>
                      <li>• Expert Property Consultation</li>
                      <li>• Home Loan Assistance</li>
                      <li>• Legal Documentation Support</li>
                      <li>• Best Deal Negotiation</li>
                    </ul>
                  </div>

                  <div className="bg-secondary/10 rounded-lg p-4">
                    <p className="text-sm text-center">
                      <strong>Note:</strong> coimbatore.properties will NOT charge a Brokerage fee or Commission from You
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2 slide-up" style={{ animationDelay: "0.2s" }}>
              <Card className="bg-card text-card-foreground border-border">
                <CardHeader>
                  <CardTitle>Costing Enquiry Form</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Full Name */}
                    <div>
                      <Label htmlFor="fullName">Full Name *</Label>
                      <Input
                        id="fullName"
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => handleInputChange("fullName", e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    {/* Phone Number */}
                    <div>
                      <Label htmlFor="phoneNumber">Phone Number *</Label>
                      <Input
                        id="phoneNumber"
                        type="tel"
                        value={formData.phoneNumber}
                        onChange={(e) => handleInputChange("phoneNumber", e.target.value)}
                        placeholder="Enter your phone number"
                        required
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        placeholder="Enter your email address"
                        required
                      />
                    </div>

                    {/* Requirement */}
                    <div>
                      <Label htmlFor="requirement">Requirement</Label>
                      <Select onValueChange={(value) => handleInputChange("requirement", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select your requirement" />
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

                    {/* Home Loan Assistance */}
                    <div>
                      <Label>Do you require HOME LOAN assistance?</Label>
                      <RadioGroup
                        value={formData.homeLoan}
                        onValueChange={(value) => handleInputChange("homeLoan", value)}
                        className="flex space-x-6 mt-2"
                      >
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="yes" id="yes" />
                          <Label htmlFor="yes">YES</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="no" id="no" />
                          <Label htmlFor="no">NO</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" size="lg" className="w-full">
                      SUBMIT ENQUIRY
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;