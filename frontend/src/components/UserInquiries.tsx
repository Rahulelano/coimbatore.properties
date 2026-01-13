import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Calendar } from "lucide-react";

interface Inquiry {
    _id: string;
    property: {
        title: string;
        location: string;
        image: string;
    } | null;
    agent: {
        name: string;
        email: string;
        phone: string;
    } | null;
    message: string;
    status: string;
    created_at: string;
}

const UserInquiries = ({ inquiries }: { inquiries: Inquiry[] }) => {
    if (inquiries.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/20 rounded-lg">
                <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-medium">No Inquiries Yet</h3>
                <p className="text-muted-foreground">You haven't contacted any agents yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-4">
            {inquiries.map((inquiry) => (
                <Card key={inquiry._id} className="overflow-hidden">
                    <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                            {/* Property Image & Info */}
                            {inquiry.property && (
                                <div className="w-full md:w-1/3 h-48 md:h-auto relative">
                                    <img
                                        src={inquiry.property.image}
                                        alt={inquiry.property.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            )}

                            {/* Inquiry Details */}
                            <div className="flex-1 p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h3 className="font-bold text-lg">
                                            {inquiry.property ? inquiry.property.title : "Property Removed"}
                                        </h3>
                                        <p className="text-muted-foreground text-sm">
                                            {inquiry.property?.location}
                                        </p>
                                    </div>
                                    <Badge variant={inquiry.status === 'Resolved' ? 'secondary' : 'default'}>
                                        {inquiry.status}
                                    </Badge>
                                </div>

                                <div className="bg-muted p-4 rounded-md mb-4">
                                    <p className="text-sm italic">"{inquiry.message}"</p>
                                </div>

                                {inquiry.agent && (
                                    <div className="pt-4 border-t">
                                        <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">Agent Details</p>
                                        <div className="grid grid-cols-2 gap-2 text-sm">
                                            <div><span className="font-medium">Name:</span> {inquiry.agent.name}</div>
                                            <div><span className="font-medium">Phone:</span> {inquiry.agent.phone}</div>
                                            <div className="col-span-2"><span className="font-medium">Email:</span> {inquiry.agent.email}</div>
                                        </div>
                                    </div>
                                )}

                                <div className="mt-4 flex items-center text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3 mr-1" />
                                    {new Date(inquiry.created_at).toLocaleDateString()}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
};

export default UserInquiries;
