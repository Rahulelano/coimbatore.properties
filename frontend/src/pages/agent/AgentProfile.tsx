import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { fetchAgentProfile, updateAgentProfile } from "@/api/endpoints";
import { ArrowLeft, Loader2 } from "lucide-react";

const AgentProfile = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: ""
    });
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

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
            const agentData = await fetchAgentProfile();
            setFormData({
                name: agentData.name || "",
                email: agentData.email || "",
                phone: agentData.phone || ""
            });
        } catch (error) {
            console.error("Failed to load profile");
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        try {
            await updateAgentProfile(formData);
            toast({ title: "Profile Updated Successfully" });
        } catch (error) {
            toast({
                title: "Update Failed",
                description: "Could not update profile. Please try again.",
                variant: "destructive"
            });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) return <div className="p-8 text-center">Loading...</div>;

    return (
        <div className="min-h-screen bg-muted/30 p-6">
            <div className="max-w-xl mx-auto space-y-6">
                <Button variant="ghost" onClick={() => navigate("/agent/dashboard")} className="gap-2 p-0 hover:bg-transparent">
                    <ArrowLeft className="h-4 w-4" /> Back to Dashboard
                </Button>

                <Card>
                    <CardHeader>
                        <CardTitle>Agent Profile</CardTitle>
                        <CardDescription>Manage your public agent details</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Display Name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    disabled
                                    className="bg-muted"
                                />
                                <p className="text-xs text-muted-foreground">Contact Admin to change email</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phone">Contact Phone</Label>
                                <Input
                                    id="phone"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                />
                            </div>
                            <Button type="submit" className="w-full" disabled={updating}>
                                {updating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Save Changes
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AgentProfile;
