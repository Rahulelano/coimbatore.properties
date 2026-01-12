import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Privacy = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="py-20">
                <div className="container-wide max-w-4xl">
                    <h1 className="text-section-title mb-8 text-center">
                        Privacy <span className="text-primary">Policy</span>
                    </h1>

                    <Card className="bg-card text-card-foreground border-border">
                        <CardContent className="p-8 space-y-6">
                            <p className="text-muted-foreground">
                                Last Updated: January 2026
                            </p>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">1. Information We Collect</h2>
                                <p className="text-muted-foreground mb-4">
                                    We collect information you provide directly to us, including:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Name, email address, and phone number</li>
                                    <li>Property preferences and requirements</li>
                                    <li>Communications with our team</li>
                                    <li>Inquiries and messages submitted through our forms</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">2. How We Use Your Information</h2>
                                <p className="text-muted-foreground mb-4">
                                    We use the information we collect to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Provide property consultation and recommendations</li>
                                    <li>Respond to your inquiries and requests</li>
                                    <li>Send you property updates and relevant information</li>
                                    <li>Improve our services and user experience</li>
                                    <li>Comply with legal obligations</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">3. Information Sharing</h2>
                                <p className="text-muted-foreground">
                                    We do not sell, trade, or rent your personal information to third parties.
                                    We may share your information with:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li>Property developers and builders (with your consent)</li>
                                    <li>Service providers who assist our operations</li>
                                    <li>Legal and regulatory authorities when required</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">4. Data Security</h2>
                                <p className="text-muted-foreground">
                                    We implement appropriate security measures to protect your personal information
                                    against unauthorized access, alteration, disclosure, or destruction. However,
                                    no method of transmission over the internet is 100% secure.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">5. Your Rights</h2>
                                <p className="text-muted-foreground mb-4">
                                    You have the right to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Access and update your personal information</li>
                                    <li>Request deletion of your data</li>
                                    <li>Opt-out of marketing communications</li>
                                    <li>Lodge a complaint with relevant authorities</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">6. Cookies</h2>
                                <p className="text-muted-foreground">
                                    We use cookies and similar technologies to enhance your browsing experience,
                                    analyze site traffic, and understand user preferences. You can control cookies
                                    through your browser settings.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">7. Contact Us</h2>
                                <p className="text-muted-foreground">
                                    For any privacy-related questions or concerns, please contact us at:
                                </p>
                                <p className="text-foreground font-medium mt-2">
                                    Email: info@coimbatore.properties<br />
                                    Phone: +91 86081 77777
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Privacy;
