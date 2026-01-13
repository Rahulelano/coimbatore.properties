import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, LogOut, LayoutGrid, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { fetchAgentProperties, deleteProperty, fetchAgentInquiries } from "@/api/endpoints";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AgentInquiries from "@/components/AgentInquiries";

const AgentDashboard = () => {
    const navigate = useNavigate();
    const { toast } = useToast();
    const [properties, setProperties] = useState<any[]>([]);
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const agent = JSON.parse(localStorage.getItem("agentUser") || "{}");

    useEffect(() => {
        const token = localStorage.getItem("agentToken");
        if (!token) {
            navigate("/agent/login");
            return;
        }
        loadData();
    }, [navigate]);

    const loadData = async () => {
        try {
            // Load Properties
            try {
                const propsData = await fetchAgentProperties();
                setProperties(propsData);
            } catch (err: any) {
                console.error("Failed to fetch properties:", err.response?.status, err.response?.data);
                if (err.response?.status === 401) throw err; // Re-throw 401 to be caught by outer
            }

            // Load Inquiries
            try {
                const inquiriesData = await fetchAgentInquiries();
                setInquiries(inquiriesData);
            } catch (err: any) {
                console.error("Failed to fetch inquiries:", err.response?.status, err.response?.data);
                if (err.response?.status === 401) throw err;
            }

        } catch (error: any) {
            console.error("Critical dashboard error:", error);
            if (error.response && error.response.status === 401) {
                localStorage.removeItem("agentToken");
                localStorage.removeItem("agentUser");
                navigate("/agent/login");
                toast({
                    title: "Session Expired",
                    description: "Please login again.",
                    variant: "destructive",
                });
                return;
            }
            toast({
                title: "Error",
                description: `Failed to load data: ${error.message}`,
                variant: "destructive",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation(); // Prevent card click
        if (!confirm("Are you sure you want to delete this property?")) return;

        try {
            const token = localStorage.getItem("agentToken");
            if (!token) return;

            await deleteProperty(id, token);

            toast({
                title: "Property deleted",
                description: "The property has been successfully removed.",
            });
            loadData();
        } catch (error) {
            toast({
                title: "Error",
                description: "Failed to delete property.",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-muted/30 pb-12">
            <header className="bg-background border-b sticky top-0 z-30">
                <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-start">
                        <div className="flex items-center gap-2">
                            <h1 className="text-xl font-bold text-primary">Agent Dashboard</h1>
                            <Badge variant="secondary">Approved</Badge>
                        </div>
                        {/* Mobile Menu Toggle could go here if we had one, but strict buttons for now */}
                    </div>
                    <div className="grid grid-cols-3 gap-2 w-full md:flex md:w-auto">
                        <Button variant="outline" size="sm" onClick={() => navigate("/agent/profile")} className="w-full">
                            Profile
                        </Button>
                        <Button size="sm" onClick={() => navigate("/admin/properties/new")} className="gap-1 w-full whitespace-nowrap">
                            <Plus className="h-4 w-4" /> Add
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => {
                            localStorage.removeItem("agentToken");
                            localStorage.removeItem("agentUser");
                            navigate("/agent/login");
                        }} className="gap-1 w-full">
                            <LogOut className="h-4 w-4" /> Exit
                        </Button>
                    </div>
                </div>
            </header>

            <main className="container mx-auto px-4 py-8">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold tracking-tight">Overview</h2>
                    <p className="text-muted-foreground">Welcome back, {agent.name || "Agent"}</p>
                </div>

                <Tabs defaultValue="properties" className="space-y-6">
                    <TabsList>
                        <TabsTrigger value="properties" className="gap-2">
                            <LayoutGrid className="h-4 w-4" /> My Properties ({properties.length})
                        </TabsTrigger>
                        <TabsTrigger value="inquiries" className="gap-2">
                            <MessageSquare className="h-4 w-4" /> Inquiries ({inquiries.length})
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="properties" className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {properties.map((property) => (
                                <Card key={property._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                                    <div className="relative h-48">
                                        <img
                                            src={property.image}
                                            alt={property.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute top-2 right-2 flex gap-1">
                                            <Badge variant={property.status === 'Available' ? 'default' : 'secondary'}>
                                                {property.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-1 truncate">{property.title}</h3>
                                        <div className="text-sm text-muted-foreground mb-4">
                                            {property.location}, {property.city}
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-primary">{property.price}</span>
                                            <div className="flex gap-2">
                                                <Button variant="outline" size="sm" onClick={() => navigate(`/admin/properties/edit/${property._id}`)}>
                                                    Edit
                                                </Button>
                                                <Button variant="destructive" size="sm" onClick={(e) => handleDelete(property._id, e)}>
                                                    Delete
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                            {properties.length === 0 && (
                                <div className="col-span-full text-center py-12 bg-background rounded-lg border border-dashed border-2">
                                    <h3 className="text-lg font-medium text-muted-foreground mb-2">No properties listed yet</h3>
                                    <Button onClick={() => navigate("/admin/properties/new")}>List Your First Property</Button>
                                </div>
                            )}
                        </div>
                    </TabsContent>

                    <TabsContent value="inquiries">
                        <AgentInquiries inquiries={inquiries} />
                    </TabsContent>
                </Tabs>
            </main>
        </div>
    );
};

export default AgentDashboard;
