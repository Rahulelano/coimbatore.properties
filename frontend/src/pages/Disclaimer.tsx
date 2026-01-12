import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

const Disclaimer = () => {
    return (
        <div className="min-h-screen bg-background">
            <Header />

            <section className="py-20">
                <div className="container-wide max-w-4xl">
                    <div className="flex items-center justify-center gap-3 mb-8">
                        <AlertTriangle className="h-8 w-8 text-secondary" />
                        <h1 className="text-section-title text-center">
                            <span className="text-primary">Disclaimer</span>
                        </h1>
                    </div>

                    <Card className="bg-card text-card-foreground border-border">
                        <CardContent className="p-8 space-y-6">
                            <div className="bg-secondary/10 border-l-4 border-secondary p-4 rounded">
                                <p className="text-foreground font-medium">
                                    Please read this disclaimer carefully before using the services provided by
                                    Coimbatore Properties.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">1. General Information</h2>
                                <p className="text-muted-foreground">
                                    The information provided on coimbatore.properties is for general informational
                                    purposes only. While we endeavor to keep the information up-to-date and accurate,
                                    we make no representations or warranties of any kind, express or implied, about
                                    the completeness, accuracy, reliability, or suitability of the information.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">2. Property Listings</h2>
                                <p className="text-muted-foreground">
                                    All property listings, descriptions, prices, and availability are subject to
                                    change without notice. We are not responsible for any errors, omissions, or
                                    changes in property information. Buyers must independently verify all property
                                    details before making any purchase decisions.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">3. Not Professional Advice</h2>
                                <p className="text-muted-foreground">
                                    The content on our platform does not constitute professional legal, financial,
                                    or investment advice. We recommend consulting with qualified professionals
                                    (lawyers, chartered accountants, financial advisors) before making any real
                                    estate transactions.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">4. Third-Party Properties</h2>
                                <p className="text-muted-foreground">
                                    Properties listed on our platform are owned and managed by third-party developers,
                                    builders, and property owners. Coimbatore Properties acts solely as an information
                                    and advisory service. We are not responsible for:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li>Quality of construction or materials</li>
                                    <li>Project delays or completion timelines</li>
                                    <li>Builder/developer performance</li>
                                    <li>Legal disputes related to properties</li>
                                    <li>Any contractual obligations between buyers and sellers</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">5. Reviews and Opinions</h2>
                                <p className="text-muted-foreground">
                                    Property reviews and ratings on our platform represent our honest assessment
                                    based on available information. These are opinions and should not be considered
                                    as definitive statements of fact. Individual experiences may vary.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">6. External Links</h2>
                                <p className="text-muted-foreground">
                                    Our website may contain links to external websites. We have no control over the
                                    content and availability of those sites and accept no responsibility for them or
                                    for any loss or damage arising from your use of them.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">7. Investment Risks</h2>
                                <p className="text-muted-foreground">
                                    Real estate investments carry inherent risks. Property values can fluctuate based
                                    on market conditions, location development, regulatory changes, and other factors.
                                    Past performance is not indicative of future results.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">8. User Responsibility</h2>
                                <p className="text-muted-foreground">
                                    Users are solely responsible for:
                                </p>
                                <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4 mt-4">
                                    <li>Conducting thorough due diligence</li>
                                    <li>Verifying all property documents and approvals</li>
                                    <li>Inspecting properties before purchase</li>
                                    <li>Understanding applicable laws and regulations</li>
                                    <li>Making informed investment decisions</li>
                                </ul>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">9. No Guarantee</h2>
                                <p className="text-muted-foreground">
                                    We do not guarantee property appreciation, rental yields, or returns on investment.
                                    All financial projections and estimates are approximate and should not be solely
                                    relied upon for making purchase decisions.
                                </p>
                            </div>

                            <div>
                                <h2 className="text-2xl font-semibold mb-4">10. Changes to Disclaimer</h2>
                                <p className="text-muted-foreground">
                                    We reserve the right to modify this disclaimer at any time. Continued use of
                                    our services constitutes acceptance of the updated disclaimer.
                                </p>
                            </div>

                            <div className="pt-6 border-t">
                                <p className="text-muted-foreground">
                                    For any questions or clarifications regarding this disclaimer:
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

export default Disclaimer;
