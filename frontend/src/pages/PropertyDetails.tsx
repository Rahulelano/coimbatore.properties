import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchPropertyById, Property, createInquiry } from "@/api/endpoints";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
    MapPin, Bed, Bath, Square, Calendar,
    ArrowRight, Share2, Phone, MessageCircle,
    ChevronLeft, ChevronRight, Star, ShieldCheck
} from "lucide-react";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PropertyDetails = () => {
    const { id } = useParams<{ id: string }>();
    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [inquiryMessage, setInquiryMessage] = useState("");
    const [sendingInquiry, setSendingInquiry] = useState(false);

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [id]);

    useEffect(() => {
        const loadProperty = async () => {
            try {
                if (!id) return;
                const data = await fetchPropertyById(id);
                setProperty(data);
            } catch (error) {
                console.error("Failed to fetch property:", error);
                toast.error("Data unavailable.");
            } finally {
                setLoading(false);
            }
        };
        loadProperty();
    }, [id]);

    const handleSendInquiry = async () => {
        if (!inquiryMessage.trim()) {
            toast.error("Please enter a message");
            return;
        }
        if (!id) return;
        setSendingInquiry(true);
        try {
            await createInquiry(id, inquiryMessage);
            toast.success("VIP Request sent successfully.");
            setInquiryMessage("");
        } catch (error) {
            toast.error("Failed to send.");
        } finally {
            setSendingInquiry(false);
        }
    };

    if (loading) return (
        <div className="h-screen bg-black flex items-center justify-center">
            <div className="flex flex-col items-center gap-6">
                <div className="relative">
                    <div className="w-24 h-24 border-t-2 border-b-2 border-yellow-500 rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center font-bold text-yellow-500 text-xl">CP</div>
                </div>
                <span className="text-neutral-500 tracking-[0.5em] text-xs uppercase animate-pulse">Loading Luxury...</span>
            </div>
        </div>
    );

    if (!property) return null;

    const media = [
        ...(property.images || []),
        ...(property.video ? [property.video] : [])
    ];

    return (
        <div className="bg-black min-h-screen text-white font-sans selection:bg-yellow-500 selection:text-black overflow-x-hidden">
            <Header />


            {/* --- SECTION 1: THE SWISS DATA MONOLITH (NO IMAGE) --- */}
            <div className="relative w-full min-h-[95vh] bg-black flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden border-b border-white/10">

                {/* Large Background Outlined Text (Watermark) */}
                <div className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none select-none">
                    <span className="text-[12vw] font-black uppercase tracking-tighter leading-none opacity-[0.05] text-white">
                        {property.location}
                    </span>
                </div>

                <div className="container mx-auto px-6 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">

                        {/* LEFT: THE HEADLINE (60%) */}
                        <div className="lg:col-span-7 space-y-10 animate-in fade-in slide-in-from-left-10 duration-1000">
                            <div className="space-y-4">
                                <Badge className="bg-yellow-500 text-black rounded-none px-6 py-1.5 text-xs font-black uppercase tracking-widest hover:bg-white transition-colors">
                                    Certified Asset
                                </Badge>
                                <h1 className="text-5xl md:text-7xl xl:text-8xl font-black uppercase tracking-tighter leading-[0.9] text-white">
                                    {property.title}
                                </h1>
                            </div>

                            <div className="max-w-md space-y-6">
                                <p className="text-neutral-500 text-lg font-medium tracking-tight leading-relaxed">
                                    A landmark residential offering in <span className="text-white">{property.location}</span>.
                                    Engineered for the elite, delivered with uncompromising precision.
                                </p>
                                <div className="flex gap-12">
                                    <div>
                                        <span className="text-[10px] text-neutral-600 uppercase tracking-widest block mb-2">Build Quality</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4, 5].map(i => <div key={i} className="w-4 h-1 bg-yellow-500"></div>)}
                                        </div>
                                    </div>
                                    <div>
                                        <span className="text-[10px] text-neutral-600 uppercase tracking-widest block mb-2">Exclusivity</span>
                                        <div className="flex gap-1">
                                            {[1, 2, 3, 4].map(i => <div key={i} className="w-4 h-1 bg-white/20"></div>)}
                                            <div className="w-4 h-1 bg-yellow-500"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: THE DATA MONOLITH (40%) */}
                        <div className="lg:col-span-5 animate-in fade-in slide-in-from-right-10 duration-1000 delay-200">
                            <div className="bg-[#0a0a0a] p-px border border-white/10 relative group">
                                {/* Animated Scan Line */}
                                <div className="absolute top-0 left-0 w-full h-0.5 bg-yellow-500/30 animate-[bounce_4s_infinite] pointer-events-none"></div>

                                <div className="bg-black p-12 space-y-12">
                                    <div className="flex justify-between items-start border-b border-white/10 pb-8">
                                        <div>
                                            <span className="text-[10px] text-yellow-500 uppercase tracking-[0.5em] font-black">Valuation</span>
                                            <div className="text-5xl md:text-6xl font-black text-white mt-4 font-mono tracking-tighter">
                                                {property.price}
                                            </div>
                                        </div>
                                        <div className="w-12 h-12 border border-white/20 flex items-center justify-center">
                                            <ShieldCheck className="w-6 h-6 text-yellow-500" />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-y-12 gap-x-8">
                                        {[
                                            { label: "Asset Type", value: property.type },
                                            { label: "Net Area", value: property.sqft + " FT²" },
                                            { label: "Possession", value: property.possession },
                                            { label: "Units", value: `${property.bedrooms} Bed / ${property.bathrooms} Bath` },
                                        ].map((item, i) => (
                                            <div key={i} className="space-y-2">
                                                <span className="text-[9px] text-neutral-600 uppercase tracking-[0.3em] font-bold block">{item.label}</span>
                                                <span className="text-lg font-bold text-white uppercase tracking-tight">{item.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="pt-12 border-t border-white/5 flex justify-between items-center text-[9px] text-neutral-700 font-mono tracking-widest">
                                        <div className="flex items-center gap-2">
                                            <div className="w-1 h-1 bg-yellow-500 rounded-full animate-ping"></div>
                                            SYNC_VERIFIED
                                        </div>
                                        <span>REF_{property._id?.slice(-8).toUpperCase()}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* --- SECTION 2: THE IMMERSIVE GALLERY (CAROUSEL) --- */}
            <div className="bg-[#050505] py-24 border-t border-white/5 relative">
                <div className="container mx-auto px-4 mb-12 flex justify-between items-end">
                    <div>
                        <span className="text-yellow-500 font-mono text-xs tracking-[0.5em] uppercase">Visual Tour</span>
                        <h2 className="text-3xl md:text-5xl font-bold text-white mt-4 uppercase tracking-tight">The Aesthetics</h2>
                    </div>
                </div>

                <Carousel className="w-full max-w-[95vw] mx-auto cursor-grab active:cursor-grabbing" opts={{ align: "start", loop: true }}>
                    <CarouselContent className="-ml-4">
                        {media.map((src, index) => (
                            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-2/3 h-[50vh] md:h-[60vh]">
                                <div className="w-full h-full relative group overflow-hidden rounded-none md:rounded-lg">
                                    <img src={src} alt={`View ${index + 1}`} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />
                                    <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                                    <div className="absolute bottom-4 left-4 bg-black/50 backdrop-blur px-3 py-1 text-xs text-white uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
                                        View {index + 1 < 10 ? `0${index + 1}` : index + 1}
                                    </div>
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <div className="absolute -bottom-12 right-12 flex gap-4">
                        <CarouselPrevious className="static translate-y-0 hover:bg-yellow-500 hover:text-black border-white/10 bg-transparent text-white rounded-none" />
                        <CarouselNext className="static translate-y-0 hover:bg-yellow-500 hover:text-black border-white/10 bg-transparent text-white rounded-none" />
                    </div>
                </Carousel>
            </div>


            {/* --- SECTION 3: THE DETAILS (BENTO GRID) --- */}
            <div className="bg-black py-24 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none"></div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                        {/* Text Content (Left) */}
                        <div className="lg:col-span-7 space-y-12">
                            <div>
                                <span className="text-yellow-500 font-mono text-xs tracking-[0.5em] uppercase">Description</span>
                                <h2 className="text-3xl md:text-4xl font-light text-white mt-4 leading-relaxed">
                                    <span className="font-bold">Experience Unmatched Luxury. </span>
                                    {property.description}
                                </h2>
                            </div>

                            {/* Features List */}
                            <div>
                                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-widest border-b border-white/10 pb-4 inline-block">Key Highlights</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {(property.amenities || []).map((tech, i) => (
                                        <div key={i} className="flex items-center gap-4 group cursor-default">
                                            <div className="w-2 h-2 bg-neutral-700 group-hover:bg-yellow-500 transition-colors rotate-45"></div>
                                            <span className="text-neutral-400 group-hover:text-white transition-colors text-sm uppercase tracking-wider">{tech}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Bento Specs (Right) */}
                        <div className="lg:col-span-5 grid grid-cols-2 gap-4 auto-rows-min">
                            <Card className="col-span-2 bg-[#111] border-white/5 text-white p-6 hover:border-yellow-500/30 transition-colors">
                                <CardContent className="p-0 flex items-center justify-between">
                                    <div>
                                        <div className="text-neutral-500 text-xs uppercase tracking-widest mb-1">Builder</div>
                                        <div className="text-xl font-bold">{property.builder || "Premium Developer"}</div>
                                    </div>
                                    <ShieldCheck className="w-8 h-8 text-yellow-500" />
                                </CardContent>
                            </Card>

                            <Card className="bg-[#111] border-white/5 text-white p-6 flex flex-col justify-center items-center hover:bg-yellow-500 hover:text-black transition-colors group cursor-pointer">
                                <Square className="w-8 h-8 mb-4 text-neutral-500 group-hover:text-black" />
                                <div className="text-2xl font-bold">{property.sqft}</div>
                                <div className="text-[10px] uppercase tracking-widest opacity-60">Square Feet</div>
                            </Card>

                            <Card className="bg-[#111] border-white/5 text-white p-6 flex flex-col justify-center items-center hover:bg-yellow-500 hover:text-black transition-colors group cursor-pointer">
                                <Calendar className="w-8 h-8 mb-4 text-neutral-500 group-hover:text-black" />
                                <div className="text-xl font-bold whitespace-nowrap">{property.possession}</div>
                                <div className="text-[10px] uppercase tracking-widest opacity-60">Handover</div>
                            </Card>

                            <div className="col-span-2 bg-gradient-to-r from-yellow-600 to-yellow-500 p-6 rounded-lg text-black flex flex-col justify-between h-40 relative overflow-hidden group">
                                <div className="relative z-10">
                                    <div className="text-xs font-bold uppercase tracking-widest mb-1 opacity-80">Total Valuation</div>
                                    <div className="text-4xl font-black">{property.price}</div>
                                </div>
                                <div className="relative z-10 flex gap-2">
                                    <Star className="w-4 h-4 fill-black" />
                                    <Star className="w-4 h-4 fill-black" />
                                    <Star className="w-4 h-4 fill-black" />
                                    <Star className="w-4 h-4 fill-black" />
                                    <Star className="w-4 h-4 fill-black" />
                                </div>
                                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-black/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* --- SECTION 4: THE VIP ACCESS (CONTACT) --- */}
            <div className="bg-[#0a0a0a] py-24 border-t border-white/5">
                <div className="container mx-auto px-4 max-w-5xl">
                    <div className="bg-[#050505] border border-white/10 p-8 md:p-16 relative overflow-hidden group">

                        {/* Interactive Border Gradient */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-1000"></div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-4xl md:text-6xl font-black text-white uppercase leading-none mb-2">
                                        Make It <span className="text-yellow-500">Yours.</span>
                                    </h2>
                                    <p className="text-neutral-500 text-lg">
                                        Initiate a private conversation about this asset.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer" onClick={() => window.open(`tel:+919566556695`)}>
                                        <div className="w-12 h-12 bg-white/5 flex items-center justify-center text-yellow-500">
                                            <Phone className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase text-neutral-500 tracking-widest">Priority Line</div>
                                            <div className="text-white font-bold">+91 95665 56695</div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 p-4 border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors cursor-pointer" onClick={() => window.open(`https://wa.me/${property.whatsapp}`, '_blank')}>
                                        <div className="w-12 h-12 bg-[#25D366]/10 flex items-center justify-center text-[#25D366]">
                                            <MessageCircle className="w-5 h-5" />
                                        </div>
                                        <div>
                                            <div className="text-xs uppercase text-neutral-500 tracking-widest">WhatsApp Direct</div>
                                            <div className="text-white font-bold">Chat Now</div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0a0a0a] p-8 border border-white/10 space-y-6 relative hover:shadow-2xl hover:shadow-yellow-500/10 transition-shadow duration-500">
                                <div className="space-y-2">
                                    <label className="text-xs uppercase font-bold text-neutral-500">Your Intent</label>
                                    <Textarea
                                        placeholder="I am interested in acquiring this property..."
                                        className="bg-black border-white/20 min-h-[150px] text-white focus:border-yellow-500 rounded-none resize-none p-4"
                                        value={inquiryMessage}
                                        onChange={(e) => setInquiryMessage(e.target.value)}
                                    />
                                </div>
                                <Button
                                    className="w-full h-16 bg-yellow-500 hover:bg-white hover:text-black text-black font-black uppercase tracking-widest text-lg rounded-none transition-all"
                                    onClick={handleSendInquiry}
                                    disabled={sendingInquiry}
                                >
                                    {sendingInquiry ? "Processing..." : "Submit Offer"}
                                </Button>
                                <div className="text-center">
                                    <p className="text-[10px] text-neutral-600 uppercase tracking-widest">
                                        Protected by reCAPTCHA & Privacy Policy
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default PropertyDetails;




