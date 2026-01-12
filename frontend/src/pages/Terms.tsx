import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";

const Terms = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="py-20">
                <div className="container-wide max-w-4xl">
                    <h1 className="text-section-title mb-8 text-center">
                        Terms & <span className="text-primary">Conditions</span>
                    </h1>

                    <Card className="bg-card text-card-foreground border-border">
                        <CardContent className="p-8 space-y-6">
                            <p className="text-muted-foreground">
                                Last Updated: January 2026
                            </p>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
                                <p className="text-muted-foreground">
                                    By accessing and using coimbatore.properties, you accept and agree to be bound
                                    by these Terms and Conditions. If you do not agree to these terms, please do not
                                    use our services.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">2. Our Services</h2>
                                <p className="text-muted-foreground mb-4">
                                    Coimbatore Properties provides:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Property listing and information services</li>
                                    <li>Expert real estate consultation</li>
                                    <li>Unbiased property reviews and analysis</li>
                                    <li>Assistance in property search and evaluation</li>
                                    <li>Home loan guidance and support</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">3. Zero Commission Policy</h2>
                                <p className="text-muted-foreground">
                                    We do not charge any brokerage or commission fees from property buyers.
                                    Our services are provided free of charge to help you make informed real estate decisions.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">4. Property Information</h2>
                                <p className="text-muted-foreground">
                                    While we strive to provide accurate and up-to-date property information, we cannot
                                    guarantee the completeness or accuracy of all listings. Property details, prices,
                                    and availability are subject to change without notice.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">5. User Responsibilities</h2>
                                <p className="text-muted-foreground mb-4">
                                    Users agree to:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                                    <li>Provide accurate and truthful information</li>
                                    <li>Conduct independent verification of property details</li>
                                    <li>Perform due diligence before making purchase decisions</li>
                                    <li>Not misuse our platform or services</li>
                                    <li>Respect intellectual property rights</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">6. Limitation of Liability</h2>
                                <p className="text-muted-foreground">
                                    Coimbatore Properties shall not be liable for any direct, indirect, incidental,
                                    or consequential damages arising from the use of our services or reliance on
                                    information provided on our platform.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">7. Third-Party Links</h2>
                                <p className="text-muted-foreground">
                                    Our website may contain links to third-party websites. We are not responsible
                                    for the content, privacy practices, or terms of these external sites.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">8. Modifications</h2>
                                <p className="text-muted-foreground">
                                    We reserve the right to modify these terms at any time. Continued use of our
                                    services after changes constitutes acceptance of the revised terms.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
                                <p className="text-muted-foreground">
                                    These terms shall be governed by the laws of India, and disputes shall be
                                    subject to the jurisdiction of courts in Coimbatore, Tamil Nadu.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">10. Contact Information</h2>
                                <p className="text-muted-foreground">
                                    For questions about these Terms and Conditions:
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

export default Terms;
