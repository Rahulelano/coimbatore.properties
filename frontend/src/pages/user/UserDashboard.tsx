import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import UserProfile from "@/components/UserProfile";
import UserInquiries from "@/components/UserInquiries";
import { fetchUserProfile, updateUserProfile, fetchUserInquiries } from "@/api/endpoints";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const UserDashboard = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>(null);
    const [inquiries, setInquiries] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (!token) {
            navigate("/login");
            return;
        }
        loadData();
    }, [navigate]);

    const loadData = async () => {
        try {
            const userData = await fetchUserProfile();
            setUser(userData);

            const inquiriesData = await fetchUserInquiries();
            setInquiries(inquiriesData);
        } catch (error) {
            console.error("Failed to load user data");
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateProfile = async (data: any) => {
        const updatedUser = await updateUserProfile(data);
        setUser(updatedUser);
    };

    const handleLogout = () => {
        localStorage.removeItem("userToken");
        localStorage.removeItem("user");
        navigate("/login");
    };

    if (loading) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <main className="flex-1 container mx-auto px-4 py-8">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-bold">User Dashboard</h1>
                    <Button variant="outline" onClick={handleLogout} className="gap-2">
                        <LogOut className="h-4 w-4" /> Logout
                    </Button>
                </div>

                <div className="flex flex-col md:flex-row gap-8">
                    {/* Sidebar / Tabs List for Desktop */}
                    <div className="md:w-64">
                        {/* We use Tabs for simplicity */}
                    </div>

                    <div className="flex-1">
                        <Tabs defaultValue="inquiries" className="w-full">
                            <TabsList className="grid w-full grid-cols-2 mb-8">
                                <TabsTrigger value="inquiries" className="gap-2">
                                    <MessageSquare className="h-4 w-4" /> My Inquiries
                                </TabsTrigger>
                                <TabsTrigger value="profile" className="gap-2">
                                    <User className="h-4 w-4" /> Profile
                                </TabsTrigger>
                            </TabsList>

                            <TabsContent value="inquiries">
                                <UserInquiries inquiries={inquiries} />
                            </TabsContent>

                            <TabsContent value="profile">
                                <UserProfile user={user} onUpdate={handleUpdateProfile} />
                            </TabsContent>
                        </Tabs>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
};

export default UserDashboard;
