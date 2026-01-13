import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Trash, Edit, LogOut, Check, X } from "lucide-react";
import { Property, deleteProperty, fetchPendingAgents, approveAgent, rejectAgentRequest } from "@/api/endpoints";
import { toast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

const AdminDashboard = () => {
    const navigate = useNavigate();
    const [properties, setProperties] = useState<Property[]>([]);
    const [pendingAgents, setPendingAgents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("adminToken");
        if (!token) {
            navigate("/admin/login");
            return;
        }

        const loadData = async () => {
            try {
                // Load Properties
                const propsData = await import("@/api/endpoints").then(m => m.fetchProperties());
                setProperties(propsData);

                // Load Pending Agents
                const agentsData = await fetchPendingAgents();
                setPendingAgents(agentsData);
            } catch (error) {
                console.error("Failed to load data", error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [navigate]);

    const handleDelete = async (id: string) => {
        if (!confirm("Are you sure you want to delete this property?")) return;

        try {
            const token = localStorage.getItem("adminToken");
            if (!token) return;

            await deleteProperty(id, token);
            setProperties(properties.filter(p => p._id !== id));
            toast({ title: "Property Deleted" });
        } catch (error) {
            toast({ title: "Delete Failed", variant: "destructive" });
        }
    };

    const handleApproveAgent = async (id: string) => {
        try {
            await approveAgent(id);
            setPendingAgents(pendingAgents.filter(a => a._id !== id));
            toast({ title: "Agent Approved" });
        } catch (error) {
            toast({ title: "Approval Failed", variant: "destructive" });
        }
    };

    const handleRejectAgent = async (id: string) => {
        if (!confirm("Reject and remove this agent request?")) return;
        try {
            await rejectAgentRequest(id);
            setPendingAgents(pendingAgents.filter(a => a._id !== id));
            toast({ title: "Agent Rejected" });
        } catch (error) {
            toast({ title: "Rejection Failed", variant: "destructive" });
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        navigate("/admin/login");
    };

    if (loading) return <div className="p-8">Loading...</div>;

    return (
        <div className="min-h-screen bg-background p-8 text-foreground">
            <div className="max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                    <h1 className="text-3xl font-bold text-primary">Admin Dashboard</h1>
                    <div className="flex gap-4 w-full md:w-auto">
                        <Button className="flex-1 md:flex-none" onClick={() => navigate("/admin/properties/new")}>
                            <Plus className="mr-2 h-4 w-4" /> Add Property
                        </Button>
                        <Button variant="outline" className="flex-1 md:flex-none" onClick={handleLogout}>
                            <LogOut className="mr-2 h-4 w-4" /> Logout
                        </Button>
                    </div>
                </div>

                {/* Pending Agent Account Requests */}
                {pendingAgents.length > 0 && (
                    <div className="mb-10">
                        <h2 className="text-2xl font-semibold mb-4 text-secondary">Pending Agent Approvals</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {pendingAgents.map((agent) => (
                                <Card key={agent._id} className="p-4 bg-card border-l-4 border-l-secondary shadow-sm">
                                    <div className="flex justify-between items-start mb-2">
                                        <div>
                                            <h3 className="font-bold text-lg">{agent.name}</h3>
                                            <p className="text-sm text-muted-foreground">{agent.email}</p>
                                            <p className="text-sm text-muted-foreground">{agent.phone}</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-2 mt-4">
                                        <Button
                                            size="sm"
                                            className="bg-green-600 hover:bg-green-700 w-full"
                                            onClick={() => handleApproveAgent(agent._id)}
                                        >
                                            <Check className="w-4 h-4 mr-1" /> Approve
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="destructive"
                                            className="w-full"
                                            onClick={() => handleRejectAgent(agent._id)}
                                        >
                                            <X className="w-4 h-4 mr-1" /> Reject
                                        </Button>
                                    </div>
                                </Card>
                            ))}
                        </div>
                        <Separator className="my-8" />
                    </div>
                )}


                <h2 className="text-2xl font-semibold mb-4">Properties Management</h2>
                <div className="grid grid-cols-1 gap-4">
                    {properties.map((property) => (
                        <Card key={property._id} className="flex flex-col md:flex-row items-start md:items-center p-4 bg-card border-border hover:bg-muted/10 transition-colors gap-4">
                            <img
                                src={property.image}
                                alt={property.title}
                                className="w-full md:w-32 h-48 md:h-24 object-cover rounded"
                            />
                            <div className="flex-1 w-full">
                                <h3 className="font-bold text-lg text-foreground truncate">{property.title}</h3>
                                <p className="text-muted-foreground text-sm">{property.location} - {property.type}</p>
                                <div className="text-sm text-primary font-semibold mt-1">{property.price}</div>
                            </div>
                            <div className="flex gap-2 w-full md:w-auto">
                                <Button variant="outline" className="flex-1 md:flex-none" onClick={() => navigate(`/admin/properties/edit/${property._id}`)}>
                                    <Edit className="h-4 w-4 mr-2 md:mr-0" /> <span className="md:hidden">Edit</span>
                                </Button>
                                <Button variant="destructive" className="flex-1 md:flex-none" onClick={() => handleDelete(property._id)}>
                                    <Trash className="h-4 w-4 mr-2 md:mr-0" /> <span className="md:hidden">Delete</span>
                                </Button>
                            </div>
                        </Card>
                    ))}
                    {properties.length === 0 && <p>No properties found.</p>}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
