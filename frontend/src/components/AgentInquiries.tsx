import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar, User, Phone, Mail } from "lucide-react";

interface Inquiry {
    _id: string;
    property: {
        title: string;
    } | null;
    user: {
        username: string;
        email: string;
        phone: string;
    } | null;
    message: string;
    status: string;
    created_at: string;
}

const AgentInquiries = ({ inquiries }: { inquiries: Inquiry[] }) => {
    if (inquiries.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Inquiries Yet</h3>
                <p className="text-muted-foreground">You haven't received any inquiries yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {inquiries.map((inquiry) => (
                <Card key={inquiry._id} className="overflow-hidden">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="font-bold text-lg">
                                    {inquiry.property ? inquiry.property.title : "Property Removed"}
                                </h3>
                                <div className="flex items-center text-xs text-muted-foreground mt-1">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(inquiry.created_at).toLocaleDateString()}
                                </div>
                            </div>
                            <Badge variant={inquiry.status === 'Resolved' ? 'secondary' : 'default'}>
                                {inquiry.status}
                            </Badge>
                        </div>

                        <div className="bg-muted p-4 rounded-md mb-4 border-l-4 border-primary">
                            <p className="text-sm italic">"{inquiry.message}"</p>
                        </div>

                        {inquiry.user && (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t bg-gray-50 -mx-6 -mb-6 p-4 px-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <User className="h-4 w-4 text-black" />
                                    <span className="font-bold text-sm text-black">{inquiry.user.username}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-black" />
                                    <span className="text-sm font-medium text-black">{inquiry.user.email}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-black" />
                                    <span className="text-sm font-medium text-black">
                                        {inquiry.user.phone ? inquiry.user.phone : <span className="text-red-500">No Phone Provided</span>}
                                    </span>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default AgentInquiries;
