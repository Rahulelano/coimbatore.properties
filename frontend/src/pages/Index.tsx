import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Building2, ArrowDown, Home, TrendingUp, Key, Tag, MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

// THE STACKED DECISION DECK
// Combines the "4 Pillars" content with the "Sticky Stacking" animation.

const Index = () => {
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const hasSeenPopup = sessionStorage.getItem("agentPopupSeen");
    if (hasSeenPopup) return;
    const timer = setTimeout(() => { setShowPopup(true); }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => { setShowPopup(false); sessionStorage.setItem("agentPopupSeen", "true"); };
  const navTo = (path: string) => { handleClose(); navigate(path); };

  return (
    <div className="bg-[#050505] min-h-screen font-sans text-white selection:bg-yellow-500 selection:text-black">
      <Header />

      <div className="relative w-full">

        {/* --- CARD 1: HERO (Sticky) --- */}
        <div className="sticky top-0 h-[100svh] w-full bg-[#050505] border-b border-white/5 flex flex-col justify-center items-center shadow-2xl relative z-0">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover opacity-60"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/50 to-transparent"></div>



          <div className="absolute bottom-12 animate-bounce flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase tracking-widest text-neutral-500">Scroll to Begin</span>
            <ArrowDown className="w-6 h-6 text-white/50" />
          </div>
          <div className="absolute top-24 right-4 md:right-8 font-mono text-xs opacity-50 rotate-90 origin-right text-white">01 / 04 START</div>
        </div>

        {/* --- CARD 2: OWNERSHIP (Buy & Sell) --- */}
        <div className="sticky top-0 h-[100svh] w-full bg-[#0A0A0A] z-10 border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,1)] flex flex-col md:flex-row relative overflow-hidden">

          {/* LEFT: BUY */}
          <div
            onClick={() => navTo('/properties?listingType=Sale')}
            className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/10 p-12 flex flex-col justify-center items-center text-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="relative z-10">
              <Home className="w-16 h-16 mb-6 mx-auto text-yellow-500 group-hover:text-black transition-colors" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Buy.</h2>
              <p className="max-w-xs mx-auto text-neutral-500 group-hover:text-neutral-600">Find your dream home in Bangalore's prime sectors.</p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                Explore <MoveRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* RIGHT: SELL */}
          <div
            onClick={() => navTo('/agent/register')}
            className="w-full md:w-1/2 h-1/2 md:h-full p-12 flex flex-col justify-center items-center text-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="relative z-10">
              <TrendingUp className="w-16 h-16 mb-6 mx-auto text-red-500 group-hover:text-black transition-colors" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Sell.</h2>
              <p className="max-w-xs mx-auto text-neutral-500 group-hover:text-neutral-600">List your asset for premium buyers and investors.</p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                Get Listed <MoveRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="absolute top-24 right-4 md:right-8 font-mono text-xs opacity-50 rotate-90 origin-right text-white pointer-events-none">02 / 04 OWNERSHIP</div>
        </div>

        {/* --- CARD 3: TENANCY (Rent & Lease) --- */}
        <div className="sticky top-0 h-[100svh] w-full bg-[#050505] z-20 border-t border-white/10 shadow-[0_-50px_100px_rgba(0,0,0,1)] flex flex-col md:flex-row relative overflow-hidden">

          {/* LEFT: RENT (Finding) */}
          <div
            onClick={() => navTo('/properties?listingType=Rent')}
            className="w-full md:w-1/2 h-1/2 md:h-full border-b md:border-b-0 md:border-r border-white/10 p-12 flex flex-col justify-center items-center text-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="relative z-10">
              <Key className="w-16 h-16 mb-6 mx-auto text-blue-500 group-hover:text-black transition-colors" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Rent.</h2>
              <p className="max-w-xs mx-auto text-neutral-500 group-hover:text-neutral-600">Discover properties available for lease.</p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                Find Space <MoveRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* RIGHT: LIST FOR RENT */}
          <div
            onClick={() => navTo('/agent/register')}
            className="w-full md:w-1/2 h-1/2 md:h-full p-12 flex flex-col justify-center items-center text-center hover:bg-white hover:text-black transition-all cursor-pointer group relative overflow-hidden"
          >
            <div className="relative z-10">
              <Tag className="w-16 h-16 mb-6 mx-auto text-green-500 group-hover:text-black transition-colors" />
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-4">Lease Out.</h2>
              <p className="max-w-xs mx-auto text-neutral-500 group-hover:text-neutral-600">Monetize your vacant property.</p>
              <div className="mt-8 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 font-bold uppercase tracking-widest text-xs">
                List Now <MoveRight className="w-4 h-4" />
              </div>
            </div>
          </div>

          <div className="absolute top-24 right-4 md:right-8 font-mono text-xs opacity-50 rotate-90 origin-right text-white pointer-events-none">03 / 04 TENANCY</div>
        </div>

        {/* --- CARD 4: FOOTER (Connect) --- */}
        <div className="sticky top-0 h-[100svh] w-full bg-yellow-500 z-30 shadow-[0_-50px_100px_rgba(0,0,0,0.5)] flex flex-col justify-center items-center text-black relative">
          <div className="text-center space-y-8 animate-in slide-in-from-bottom-20 duration-1000">
            <h2 className="text-[7vw] font-black uppercase tracking-tighter leading-none break-words max-w-full px-4 text-center">
              coimbatore.properties
            </h2>
            <p className="text-xl font-bold uppercase tracking-widest">
              Premium Real Estate Solutions
            </p>
            <div className="flex gap-4 justify-center pt-8">
              <Button size="lg" className="bg-black text-white hover:bg-white hover:text-black rounded-none h-14 px-8 uppercase tracking-widest font-bold" onClick={() => window.open('tel:+919566556695')}>
                Call Us
              </Button>
              <Button size="lg" variant="outline" className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white rounded-none h-14 px-8 uppercase tracking-widest font-bold" onClick={() => navTo('/contact')}>
                Contact
              </Button>
            </div>
          </div>

          <div className="absolute bottom-0 w-full">
            <Footer />
          </div>
          <div className="absolute top-24 right-4 md:right-8 font-mono text-xs opacity-50 rotate-90 origin-right text-white mix-blend-difference pointer-events-none">04 / 04 ENDGAME</div>
        </div>

      </div>

      {/* POPUP (Preserved) */}
      {showPopup && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 fade-in">
          <Card className="w-full max-w-md relative bg-[#111] border-yellow-500/20 shadow-2xl animate-in zoom-in-95">
            <button onClick={handleClose} className="absolute top-4 right-4 text-neutral-500 hover:text-white transition-colors"><X className="h-5 w-5" /></button>
            <CardContent className="p-8 text-center space-y-6">
              <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center mx-auto border border-yellow-500/20"><Building2 className="h-8 w-8 text-yellow-500" /></div>
              <div>
                <h2 className="text-2xl font-bold mb-2 text-white">Start With Us</h2>
                <p className="text-neutral-400">List your property with us and reach thousands of premium buyers.</p>
              </div>
              <div className="flex flex-col gap-3">
                <Button size="lg" className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-bold uppercase tracking-widest" onClick={() => navTo("/agent/register")}>List Your Property</Button>
                <Button variant="ghost" className="w-full text-neutral-500 hover:text-white" onClick={handleClose}>Browse Market</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Index;
