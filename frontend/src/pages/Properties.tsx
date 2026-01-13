import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchProperties, fetchAreas, Property } from "@/api/endpoints";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Search, Filter, Heart, Share2, Eye, ArrowUpRight, Grid, List } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is installed as per previous files

const Properties = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // State
  const [properties, setProperties] = useState<Property[]>([]);
  const [areas, setAreas] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  // Filters
  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [areaFilter, setAreaFilter] = useState("all");
  const [listingTypeFilter, setListingTypeFilter] = useState("all");

  // Load Initial Data
  useEffect(() => {
    const init = async () => {
      try {
        const [propsData, areasData] = await Promise.all([
          fetchProperties(),
          fetchAreas()
        ]);

        setProperties(propsData);
        setAreas(areasData);
      } catch (error) {
        console.error("Failed to load data", error);
        toast.error("Network synchronization failed.");
      } finally {
        setLoading(false);
      }
    };
    init();
  }, []);

  // Sync URL Params
  useEffect(() => {
    const area = searchParams.get("area");
    const type = searchParams.get("type");
    const listingType = searchParams.get("listingType");
    if (area) setAreaFilter(area);
    if (type) setTypeFilter(type);
    if (listingType) setListingTypeFilter(listingType);
  }, [searchParams]);

  // Filtering Logic
  const filteredProperties = properties.filter(p => {
    const matchSearch = p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchType = typeFilter === "all" || p.type.toLowerCase() === typeFilter.toLowerCase();
    const matchArea = areaFilter === "all" || (p.location && p.location.includes(areaFilter)); // Use location for area filtering if fuzzy
    const matchListingType = listingTypeFilter === "all" || p.listingType?.toLowerCase() === listingTypeFilter.toLowerCase();
    // Price filter logic would go here if price was numeric, currenty string. Skipping for now or exact match ??
    // Assuming simple string match or "all" for now as per previous logic.
    return matchSearch && matchType && matchArea && matchListingType;
  });

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-4 border-neutral-800 border-t-yellow-500 rounded-full animate-spin"></div>
          <div className="text-yellow-500 font-mono text-xs uppercase tracking-widest">Loading Assets</div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#050505] font-sans text-white selection:bg-yellow-500 selection:text-black">
      <Header />

      {/* 1. HERO SECTION: "The Gold Slash" */}
      <section className="relative pt-32 pb-32 px-6 overflow-hidden border-b border-white/5">
        {/* Background Texture */}
        <div className="absolute inset-0 z-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] brightness-100 contrast-150 mix-blend-overlay"></div>

        {/* Slash */}
        <div className="absolute top-[-50%] right-[-50%] w-[150%] h-[200%] bg-gradient-to-b from-[#111] to-transparent -rotate-12 z-0 pointer-events-none border-l border-white/5" />

        <div className="max-w-7xl mx-auto relative z-10 text-center">
          <span className="inline-block py-1 px-3 border border-yellow-500/30 rounded-full bg-yellow-500/10 text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-6 backdrop-blur-md">
            Premium Inventory
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-6">
            Acquire <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-600">Legacy</span>
          </h1>
          <p className="text-xl text-neutral-400 font-light max-w-2xl mx-auto mb-12 leading-relaxed">
            A curated selection of Coimbatore's finest architectural statements.
          </p>

          {/* SEARCH & FILTER BAR - Floating Glass */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl max-w-5xl mx-auto transform transition-all hover:scale-[1.01]">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4">

              {/* Search Input */}
              <div className="md:col-span-4 relative group">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500 group-hover:text-yellow-500 transition-colors w-4 h-4" />
                <Input
                  className="bg-[#0A0A0A] border-white/10 pl-10 h-12 rounded-xl text-white focus:border-yellow-500 focus:ring-0 transition-all font-medium placeholder:text-neutral-600"
                  placeholder="Search by location or title..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Type Select */}
              <div className="md:col-span-3">
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="bg-[#0A0A0A] border-white/10 h-12 rounded-xl text-white">
                    <SelectValue placeholder="Asset Type" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    <SelectItem value="all">All Assets</SelectItem>
                    <SelectItem value="Apartment">Apartment</SelectItem>
                    <SelectItem value="Villa">Villa</SelectItem>
                    <SelectItem value="Plot">Plot</SelectItem>
                    <SelectItem value="Individual House">Independent House</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Area Select */}
              <div className="md:col-span-3">
                <Select value={areaFilter} onValueChange={setAreaFilter}>
                  <SelectTrigger className="bg-[#0A0A0A] border-white/10 h-12 rounded-xl text-white">
                    <SelectValue placeholder="Location" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#111] border-white/10 text-white">
                    <SelectItem value="all">All Locations</SelectItem>
                    {areas.map(area => (
                      <SelectItem key={area} value={area}>{area}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Mode Toggle & Count */}
              <div className="md:col-span-2 flex items-center justify-center gap-2 bg-[#0A0A0A] rounded-xl border border-white/10 px-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-lg ${viewMode === 'grid' ? 'bg-white/10 text-yellow-500' : 'text-neutral-500'}`}
                  onClick={() => setViewMode('grid')}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`h-8 w-8 rounded-lg ${viewMode === 'list' ? 'bg-white/10 text-yellow-500' : 'text-neutral-500'}`}
                  onClick={() => setViewMode('list')}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 2. RESULTS GRID */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        {/* Results Header */}
        <div className="flex justify-between items-end mb-12 border-b border-white/5 pb-4">
          <div>
            <h2 className="text-white text-3xl font-black uppercase tracking-tight">
              Inventory <span className="text-neutral-600 text-lg align-middle ml-2">({filteredProperties.length})</span>
            </h2>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-neutral-500 uppercase tracking-widest">
            <span>Sorting: Default</span>
            <Filter className="w-4 h-4" />
          </div>
        </div>

        {/* Grid */}
        <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property, idx) => (
              <div
                key={property._id}
                onClick={() => navigate(`/properties/${property._id}`)}
                className={`group bg-[#0A0A0A] border rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 hover:shadow-[0_0_30px_rgba(234,179,8,0.15)] ${viewMode === 'list'
                  ? 'flex flex-col md:flex-row border-white/5 hover:border-yellow-500/30'
                  : 'flex flex-col border-white/5 hover:border-yellow-500/30 hover:-translate-y-2'
                  }`}
              >
                {/* Image Box */}
                <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-full md:w-1/3 aspect-video' : 'w-full aspect-[4/3]'}`}>
                  <div className="absolute inset-0 bg-yellow-500/10 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <Badge className="absolute top-4 left-4 bg-black/80 backdrop-blur border border-white/10 text-white rounded-md px-3 py-1 uppercase tracking-wider text-[10px] font-bold z-20">
                    {property.possession || "Available"}
                  </Badge>

                  {/* Overlay Stats */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20 flex justify-between items-end">
                    <div className="flex gap-4 text-xs font-bold text-white">
                      <span className="flex items-center gap-1"><MapPin className="w-3 h-3 text-yellow-500" /> {property.location}</span>
                    </div>
                  </div>
                </div>

                {/* Content Box */}
                <div className={`p-6 flex flex-col justify-between ${viewMode === 'list' ? 'w-full md:w-2/3' : 'w-full'}`}>
                  <div>
                    <div className="flex justify-between items-start mb-2 opacity-50 text-[10px] font-mono uppercase tracking-widest">
                      <span>ID: {property._id?.slice(0, 5)}</span>
                      <span>{property.type}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2 leading-tight group-hover:text-yellow-500 transition-colors line-clamp-2">
                      {property.title}
                    </h3>

                    {/* Amenities Row */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {(property.amenities || []).slice(0, 3).map((am, i) => (
                        <span key={i} className="text-[10px] font-medium bg-[#151515] border border-white/5 px-2 py-1 rounded text-neutral-400">
                          {am}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="text-2xl font-black text-white">
                      {property.price}
                    </div>
                    <Button
                      size="icon"
                      className="rounded-full bg-white text-black hover:bg-yellow-500 hover:text-black transition-all w-10 h-10"
                    >
                      <ArrowUpRight className="w-5 h-5" />
                    </Button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full py-20 text-center border border-dashed border-white/10 rounded-2xl bg-[#080808]">
              <Search className="w-12 h-12 text-neutral-700 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">No Assets Found</h3>
              <p className="text-neutral-500">Adjust your reconnaissance parameters.</p>
              <Button
                variant="outline"
                className="mt-6 border-white/10 text-white hover:bg-yellow-500 hover:text-black hover:border-transparent"
                onClick={() => {
                  setSearchTerm("");
                  setTypeFilter("all");
                  setAreaFilter("all");
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Properties;