import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, X, ChevronDown, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logoIcon from "@/assets/logo-icon.png";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/properties?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };


  const [areas, setAreas] = useState<string[]>([]);

  // Fetch areas on component mount
  useState(() => {
    import("@/api/endpoints").then(m => m.fetchAreas()).then(setAreas).catch(console.error);
  });

  const user = JSON.parse(localStorage.getItem("user") || "null");
  const agent = JSON.parse(localStorage.getItem("agentUser") || "null");
  const adminToken = localStorage.getItem("adminToken");

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("user");
    localStorage.removeItem("agentToken");
    localStorage.removeItem("agentUser");
    localStorage.removeItem("adminToken");
    window.location.reload();
  };

  const properties = [
    "Apartments",
    "Villas",
    "Plots",
    "Commercial"
  ];

  const getDashboardLink = () => {
    if (adminToken) return "/admin/dashboard";
    if (agent) return "/agent/dashboard";
    if (user) return "/user/dashboard";
    return "/login";
  };

  const getDisplayName = () => {
    if (adminToken) return "Admin";
    if (agent) return agent.name || "Agent";
    if (user) return user.username || "User";
    return "";
  };

  const isLoggedIn = !!(user || agent || adminToken);

  const NavLinks = ({ mobile = false }: { mobile?: boolean }) => {
    const linkClass = mobile
      ? "text-foreground hover:text-primary transition-colors font-medium py-2 text-lg block border-b border-border/50"
      : "text-foreground hover:text-primary transition-colors font-medium";

    const dropdownTriggerClass = mobile
      ? "flex items-center justify-between w-full py-2 text-lg font-medium border-b border-border/50"
      : "flex items-center gap-1 text-foreground hover:text-primary transition-colors";

    return (
      <>
        <Link to="/" className={linkClass}>Home</Link>
        <Link to="/about" className={linkClass}>About</Link>
        <Link to="/services" className={linkClass}>Services</Link>
        <Link to="/testimonials" className={linkClass}>Testimonials</Link>
        <Link to="/contact" className={linkClass}>Contact</Link>


        <DropdownMenu>
          <DropdownMenuTrigger className={dropdownTriggerClass}>
            Areas <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg max-h-[300px] overflow-y-auto">
            {areas.length > 0 ? areas.map((area) => (
              <DropdownMenuItem key={area} className="cursor-pointer hover:bg-accent">
                <Link to={`/properties?area=${area}`} className="w-full block">
                  {area}
                </Link>
              </DropdownMenuItem>
            )) : (
              <DropdownMenuItem disabled>Loading...</DropdownMenuItem>
            )}
            <DropdownMenuItem className="cursor-pointer hover:bg-accent font-semibold border-t mt-1 pt-2">
              <Link to="/areas" className="w-full block">View All Areas</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>



        <DropdownMenu>
          <DropdownMenuTrigger className={dropdownTriggerClass}>
            Luxury Homes <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg">
            <DropdownMenuItem className="cursor-pointer hover:bg-accent">
              <Link to="/properties?type=Apartment" className="w-full block">Luxury Apartments</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-accent">
              <Link to="/properties?type=Villa" className="w-full block">Luxury Villas</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer hover:bg-accent">
              <Link to="/properties?type=Plot" className="w-full block">Premium Plots</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger className={dropdownTriggerClass}>
            All Properties <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 bg-popover border border-border shadow-lg">
            {properties.map((property) => (
              <DropdownMenuItem key={property} className="cursor-pointer hover:bg-accent">
                <Link to={`/properties?type=${property.toLowerCase()}`} className="w-full block">
                  {property}
                </Link>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

      </>
    )
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="hidden md:block bg-muted/30 py-2">
        <div className="container-wide flex justify-between items-center text-sm">
          <div className="flex items-center space-x-6">
            <Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">
              About Us
            </Link>

            <Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
              Contact Us
            </Link>

            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to={getDashboardLink()} className="text-primary font-medium hover:underline">
                  Hi, {getDisplayName()}
                </Link>
                <button onClick={handleLogout} className="text-muted-foreground hover:text-foreground transition-colors">
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4">
                <Link to="/login" className="text-muted-foreground hover:text-foreground transition-colors">
                  Login
                </Link>
                <Link to="/register" className="text-muted-foreground hover:text-foreground transition-colors">
                  Sign Up
                </Link>
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-secondary" />
            <a href="tel:+918608177777" className="text-foreground hover:text-primary font-medium transition-colors">
              +91 86081 77777
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container-wide py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-berkshire">
                <span className="text-white">coimbatore</span>
                <span className="text-primary">.properties</span>
              </span>
              <span className="text-xs text-muted-foreground tracking-wide">
                PREMIUM REAL ESTATE
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <NavLinks />
          </nav>

          {/* Search & Mobile Menu */}
          <div className="flex items-center space-x-4">
            {isSearchOpen ? (
              <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="flex items-center space-x-2 animate-in slide-in-from-right-5">
                <Input
                  type="text"
                  placeholder="Search..."
                  className="w-40 md:w-60 h-8 text-sm"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <Button type="submit" variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsSearchOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </form>
            ) : (
              <Button variant="ghost" size="icon" className="hidden md:flex" onClick={() => setIsSearchOpen(true)}>
                <Search className="h-5 w-5" />
              </Button>
            )}

            {/* Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="lg:hidden">
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[85vw] sm:w-96 bg-background overflow-y-auto">
                <div className="flex justify-between items-center mb-6 border-b pb-4">
                  <span className="text-xl font-bold font-berkshire text-primary">Menu</span>
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <nav className="flex flex-col space-y-2">
                  <NavLinks mobile={true} />
                </nav>
                <div className="mt-8 border-t pt-6 space-y-4">
                  {/* Mobile Auth Links */}
                  {isLoggedIn ? (
                    <>
                      <Link to={getDashboardLink()} className="block w-full text-center py-2 bg-muted rounded-md font-medium" onClick={() => setIsOpen(false)}>
                        My Dashboard ({getDisplayName()})
                      </Link>
                      <Button onClick={handleLogout} variant="outline" className="w-full">Logout</Button>
                    </>
                  ) : (
                    <>
                      <Link to="/login" className="block w-full" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full">Login</Button>
                      </Link>
                      <Link to="/register" className="block w-full" onClick={() => setIsOpen(false)}>
                        <Button className="w-full">Sign Up</Button>
                      </Link>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;