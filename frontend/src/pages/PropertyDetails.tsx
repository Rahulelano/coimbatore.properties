import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById, Property, createInquiry } from "@/api/endpoints";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { MapPin, Bed, Bath, Square, Calendar, CheckCircle } from "lucide-react";

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);

    const [selectedImage, setSelectedImage] = useState<string>("");

    // Inquiry State
    const [inquiryMessage, setInquiryMessage] = useState("");
    const [sendingInquiry, setSendingInquiry] = useState(false);

    const handleSendInquiry = async () => {
        if (!inquiryMessage.trim()) {
            toast.error("Please enter a message");
            return;
        }
        if (!id) return;

        setSendingInquiry(true);
        try {
            await createInquiry(id, inquiryMessage);
            toast.success("Inquiry sent successfully! The agent will contact you soon.");
            setInquiryMessage("");
        } catch (error) {
            toast.error("Failed to send inquiry. Please try again.");
            console.error(error);
        } finally {
            setSendingInquiry(false);
        }
    };

    useEffect(() => {
        const loadProperty = async () => {
            try {
                if (!id) return;
                const data = await fetchPropertyById(id);
                setProperty(data);
                setSelectedImage(data.image);
            } catch (error) {
                console.error("Failed to fetch property:", error);
                toast.error("Could not load property details.");
            } finally {
                setLoading(false);
            }
        };
        loadProperty();
    }, [id]);

    // Auto-slide effect
    useEffect(() => {
        if (!property?.images || property.images.length <= 1) return;

        const interval = setInterval(() => {
            const currentIndex = property.images.indexOf(selectedImage || property.images[0]);
            const nextIndex = (currentIndex + 1) % property.images.length;
            setSelectedImage(property.images[nextIndex]);
        }, 3000); // Change every 3 seconds

        return () => clearInterval(interval);
    }, [property, selectedImage]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        );
    }

    if (!property) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Property Not Found</h1>
                <Button onClick={() => window.history.back()}>Go Back</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            <Header />

            {/* Hero Image */}
            {/* Hero Image */}
            <div className="container mx-auto px-4 mt-8">
                {/* Main Image Container */}
                <div className="relative h-[50vh] md:h-[60vh] w-full rounded-2xl overflow-hidden shadow-sm bg-gray-900 group border flex items-center justify-center">
                    {/* Background Blurred Image (Fills container) */}
                    <img
                        src={selectedImage || property.image}
                        alt={property.title}
                        className="absolute inset-0 w-full h-full object-cover blur-xl opacity-50 scale-110"
                    />

                    {/* Main Image (Contained within) */}
                    <img
                        src={selectedImage || property.image}
                        alt={property.title}
                        className="relative w-full h-full object-contain z-10 transition-transform duration-500"
                    />

                    {/* Thumbnails Overlay */}
                    {(property.images && property.images.length > 0) && (
                        <div className="absolute bottom-4 left-4 right-4 z-20">
                            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-start px-2">
                                {property.images.map((img, idx) => (
                                    <button
                                        key={idx}
                                        onClick={(e) => { e.stopPropagation(); setSelectedImage(img); }}
                                        className={`relative w-24 h-16 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all shadow-md bg-white ${selectedImage === img ? 'border-primary ring-2 ring-primary/50 scale-105' : 'border-white/80 hover:border-white hover:scale-105 opacity-90 hover:opacity-100'}`}
                                    >
                                        <img src={img} alt={`View ${idx + 1}`} className="w-full h-full object-cover" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Info Bar (Below Image) */}
                <div className="mt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b pb-8">
                    <div className="space-y-4">
                        <Badge className="bg-primary/10 text-primary hover:bg-primary/20 text-sm px-4 py-1 rounded-full border-primary/20 border">
                            {property.type}
                        </Badge>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-foreground mb-2">{property.title}</h1>
                            <div className="flex items-center gap-2 text-lg text-muted-foreground">
                                <MapPin className="h-5 w-5" />
                                {property.location}, {property.city}
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center gap-4 w-full md:w-auto">
                        <div className="hidden md:block text-right mr-4">
                            <p className="text-sm text-gray-500">Starting from</p>
                            <p className="text-2xl font-bold text-primary">{property.price}</p>
                        </div>
                        <Button
                            size="lg"
                            className="rounded-full px-8 h-12 text-lg shadow-lg hover:shadow-xl transition-all bg-[#ff4d6d] hover:bg-[#ff3355]"
                            onClick={() => {
                                if (property.booking_url) window.open(property.booking_url, '_blank');
                                else if (property.whatsapp) window.open(`https://wa.me/${property.whatsapp}?text=I am interested in ${property.title}`, '_blank');
                                else document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                            }}
                        >
                            Book Now
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="group rounded-full h-12 w-12 border-gray-300"
                            onClick={() => {
                                const url = window.location.href;
                                if (navigator.share) {
                                    navigator.share({
                                        title: property.title,
                                        text: `Check out this property: ${property.title}`,
                                        url
                                    }).catch(console.error);
                                } else {
                                    navigator.clipboard.writeText(url);
                                    toast.success("Link copied to clipboard!");
                                }
                            }}
                        >
                            <span className="sr-only">Share</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-share-2 group-hover:text-primary transition-colors"><circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" /><line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" /></svg>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-12">

                        {/* Overview */}
                        <section>
                            <h2 className="text-2xl font-bold mb-6 text-foreground">Overview</h2>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                <div className="p-4 bg-card rounded-lg flex flex-col items-center text-center border border-border">
                                    <Bed className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm text-muted-foreground">Bedrooms</span>
                                    <span className="font-semibold">{property.bedrooms || "-"}</span>
                                </div>
                                <div className="p-4 bg-card rounded-lg flex flex-col items-center text-center border border-border">
                                    <Bath className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm text-muted-foreground">Bathrooms</span>
                                    <span className="font-semibold">{property.bathrooms || "-"}</span>
                                </div>
                                <div className="p-4 bg-card rounded-lg flex flex-col items-center text-center border border-border">
                                    <Square className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm text-muted-foreground">Area</span>
                                    <span className="font-semibold">{property.sqft || "-"}</span>
                                </div>
                                <div className="p-4 bg-card rounded-lg flex flex-col items-center text-center border border-border">
                                    <Calendar className="h-6 w-6 text-primary mb-2" />
                                    <span className="text-sm text-muted-foreground">Possession</span>
                                    <span className="font-semibold">{property.possession || "-"}</span>
                                </div>
                            </div>
                        </section>

                        {/* Description */}
                        <section>
                            <h2 className="text-2xl font-bold mb-4 text-foreground">Description</h2>
                            <p className="text-muted-foreground leading-relaxed text-lg">
                                {property.description}
                            </p>
                        </section>

                        {/* Amenities */}
                        {property.amenities && property.amenities.length > 0 && (
                            <section>
                                <h2 className="text-2xl font-bold mb-6 text-gray-800">Amenities</h2>
                                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                                    {property.amenities.map((amenity, index) => (
                                        <div key={index} className="flex items-center gap-3 p-3 border rounded-lg hover:border-primary transition-colors">
                                            <CheckCircle className="h-5 w-5 text-green-500" />
                                            <span className="text-gray-700">{amenity}</span>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-24 bg-card p-6 rounded-xl shadow-lg border border-border">
                            <div className="mb-6">
                                <span className="text-sm text-muted-foreground">Price</span>
                                <div className="text-3xl font-bold text-primary">{property.price}</div>
                            </div>

                            <Button
                                className="w-full text-lg py-6 mb-4 bg-primary text-black hover:bg-primary/90"
                                onClick={() => {
                                    if (property.whatsapp) window.open(`https://wa.me/${property.whatsapp}?text=I'm interested in a Site Visit for ${property.title}`, '_blank');
                                    else window.location.href = "/contact";
                                }}
                            >
                                Book a Site Visit
                            </Button>
                            {property.brochure_url && (
                                <Button
                                    variant="outline"
                                    className="w-full text-lg py-6"
                                    onClick={() => window.open(property.brochure_url, '_blank')}
                                >
                                    Download Brochure
                                </Button>
                            )}

                            {/* Video Section in Sidebar */}
                            {property.video && (
                                <div className="mt-6">
                                    <h3 className="font-semibold mb-2 text-foreground">Property Video</h3>
                                    <video
                                        controls
                                        className="w-full rounded-lg shadow-sm bg-black"
                                        src={property.video}
                                    >
                                        Your browser does not support the video tag.
                                    </video>
                                </div>
                            )}

                            {/* Contact Developer / Agent Section */}
                            <div className="mt-8 pt-8 border-t">
                                <h3 className="font-semibold mb-4">Contact Agent</h3>
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="h-10 w-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                                        {property.builder ? property.builder[0] : "H"}
                                    </div>
                                    <div>
                                        <div className="font-medium text-foreground">{property.builder || "Coimbatore Properties"}</div>
                                        <div className="text-sm text-muted-foreground">Certified Agent</div>
                                    </div>
                                </div>

                                {!localStorage.getItem("userToken") ? (
                                    <Button
                                        variant="secondary"
                                        className="w-full"
                                        onClick={() => window.location.href = "/login"}
                                    >
                                        Login to Contact Agent
                                    </Button>
                                ) : (
                                    <div className="space-y-3">
                                        <textarea
                                            className="w-full p-2 border rounded-md text-sm bg-background"
                                            rows={3}
                                            placeholder="I'm interested in this property..."
                                            value={inquiryMessage}
                                            onChange={(e) => setInquiryMessage(e.target.value)}
                                        />
                                        <Button
                                            className="w-full bg-primary text-black hover:bg-primary/90"
                                            onClick={handleSendInquiry}
                                            disabled={sendingInquiry}
                                        >
                                            {sendingInquiry ? "Sending..." : "Send Message"}
                                        </Button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />

            {/* Mobile Fixed Bottom Actions */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t z-40 md:hidden flex gap-3 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)]">
                <Button
                    className="flex-1 bg-primary text-black hover:bg-primary/90 font-bold"
                    onClick={() => {
                        if (property.whatsapp) window.open(`https://wa.me/${property.whatsapp}?text=I'm interested in a Site Visit for ${property.title}`, '_blank');
                        else if (document.getElementById('contact-form')) document.getElementById('contact-form')?.scrollIntoView({ behavior: 'smooth' });
                        else window.location.href = "/contact";
                    }}
                >
                    Book Site Visit
                </Button>
                <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => {
                        // Scroll to inquiry form which is at the bottom of the page usually, or in the stacked sidebar
                        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                >
                    Contact Agent
                </Button>
            </div>
        </div>
    );
};

export default PropertyDetails;
