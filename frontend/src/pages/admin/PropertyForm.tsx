import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/hooks/use-toast";
import { createProperty, updateProperty, fetchPropertyById } from "@/api/endpoints";

const PropertyForm = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = !!id;

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        price: "",
        location: "",
        area: "",
        city: "Coimbatore",
        type: "Apartment",
        bedrooms: "",
        bathrooms: "",
        sqft: "",
        possession: "",
        builder: "",
        amenities: "", // comma separated
        rating: "4.5",
        reviews: "0",
        status: "Available",
        whatsapp: "",
        booking_url: "",
        brochure_url: "",
        is_featured: false,
        listingType: "Sale"
    });
    const [imageFiles, setImageFiles] = useState<FileList | null>(null);
    const [videoFile, setVideoFile] = useState<File | null>(null);
    const [brochureFile, setBrochureFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isEdit && id) {
            import("@/api/endpoints").then(m => m.fetchPropertyById(id)).then(data => {
                setFormData({
                    title: data.title,
                    description: data.description,
                    price: data.price,
                    location: data.location,
                    area: data.area || "",
                    city: data.city,
                    type: data.type,
                    bedrooms: data.bedrooms || "",
                    bathrooms: data.bathrooms?.toString() || "",
                    sqft: data.sqft || "",
                    possession: data.possession || "",
                    builder: data.builder || "",
                    amenities: data.amenities?.join(", ") || "",
                    rating: data.rating?.toString() || "4.5",
                    reviews: data.reviews?.toString() || "0",
                    status: data.status || "Available",
                    whatsapp: data.whatsapp || "",
                    booking_url: data.booking_url || "",
                    brochure_url: data.brochure_url || "",
                    is_featured: data.is_featured,
                    listingType: data.listingType || "Sale"
                });
            });
        }
    }, [id, isEdit]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageFiles(e.target.files);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Prepare FormData
        const submissionData = new FormData();
        // Append fields
        const dataObj = {
            ...formData,
            amenities: formData.amenities.split(",").map(s => s.trim()).filter(s => s),
            bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : undefined,
            rating: parseFloat(formData.rating),
            reviews: parseInt(formData.reviews)
        };

        submissionData.append("data", JSON.stringify(dataObj));

        if (imageFiles && imageFiles.length > 0) {
            Array.from(imageFiles).forEach((file) => {
                submissionData.append("images", file);
            });
        } else if (!isEdit && (!imageFiles || imageFiles.length === 0)) {
            toast({ title: "At least one image required", variant: "destructive" });
            setLoading(false);
            return;
        }

        if (videoFile) {
            submissionData.append("video", videoFile);
        }

        if (brochureFile) {
            submissionData.append("brochure", brochureFile);
        }

        try {
            let token = localStorage.getItem("adminToken");
            let isAgent = false;

            if (!token) {
                token = localStorage.getItem("agentToken");
                isAgent = true;
            }

            if (!token) throw new Error("Not authenticated");

            if (isEdit && id) {
                await updateProperty(id, submissionData, token);
                toast({ title: "Property Updated" });
            } else {
                await createProperty(submissionData, token);
                toast({ title: "Property Created" });
            }
            navigate(isAgent ? "/agent/dashboard" : "/admin/dashboard");
        } catch (error) {
            console.error(error);
            toast({ title: "Operation Failed", variant: "destructive" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background p-8 text-foreground">
            <Card className="max-w-2xl mx-auto bg-card border-border">
                <CardHeader>
                    <CardTitle>{isEdit ? "Edit Property" : "Add New Property"}</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">

                        <div>
                            <Label>Title</Label>
                            <Input name="title" value={formData.title} onChange={handleChange} required />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Price (e.g. 50 Lacs)</Label>
                                <Input name="price" value={formData.price} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Listing For</Label>
                                <Select
                                    value={formData.listingType}
                                    onValueChange={(val) => setFormData(p => ({ ...p, listingType: val as "Sale" | "Rent" }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Sale">Buy (Sale)</SelectItem>
                                        <SelectItem value="Rent">Rent</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div>
                                <Label>Type</Label>
                                <Select
                                    value={formData.type}
                                    onValueChange={(val) => setFormData(p => ({ ...p, type: val }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Apartment">Apartment</SelectItem>
                                        <SelectItem value="Villa">Villa</SelectItem>
                                        <SelectItem value="Plot">Plot</SelectItem>
                                        <SelectItem value="Row House">Row House</SelectItem>
                                        <SelectItem value="Villament">Villament</SelectItem>
                                        <SelectItem value="Commercial">Commercial</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <Label>Area (e.g. Saravanampatti)</Label>
                                <Input name="area" value={formData.area} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>Location (Landmark)</Label>
                                <Input name="location" value={formData.location} onChange={handleChange} required />
                            </div>
                            <div>
                                <Label>City</Label>
                                <Input name="city" value={formData.city} onChange={handleChange} disabled />
                            </div>
                        </div>

                        <div>
                            <Label>Description</Label>
                            <Textarea name="description" value={formData.description} onChange={handleChange} required />
                        </div>

                        <div className="grid grid-cols-4 gap-4">
                            <div> <Label>Bedrooms</Label> <Input name="bedrooms" value={formData.bedrooms} onChange={handleChange} /> </div>
                            <div> <Label>Bathrooms</Label> <Input name="bathrooms" type="number" value={formData.bathrooms} onChange={handleChange} /> </div>
                            <div> <Label>Sqft</Label> <Input name="sqft" value={formData.sqft} onChange={handleChange} /> </div>
                            <div> <Label>Possession</Label> <Input name="possession" value={formData.possession} onChange={handleChange} /> </div>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            <div> <Label>Status</Label>
                                <Select value={formData.status} onValueChange={(val) => setFormData(p => ({ ...p, status: val }))}>
                                    <SelectTrigger><SelectValue /></SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Available">Available</SelectItem>
                                        <SelectItem value="Sold Out">Sold Out</SelectItem>
                                        <SelectItem value="Under Construction">Under Construction</SelectItem>
                                        <SelectItem value="Launch">Launch</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div> <Label>Rating</Label> <Input name="rating" type="number" step="0.1" value={formData.rating} onChange={handleChange} /> </div>
                            <div> <Label>Reviews</Label> <Input name="reviews" type="number" value={formData.reviews} onChange={handleChange} /> </div>
                        </div>

                        <div>
                            <Label>Builder</Label>
                            <Input name="builder" value={formData.builder} onChange={handleChange} />
                        </div>

                        <div>
                            <Input name="amenities" value={formData.amenities} onChange={handleChange} />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label>WhatsApp Number (e.g. 919999999999)</Label>
                                <Input name="whatsapp" value={formData.whatsapp} onChange={handleChange} placeholder="919999999999" />
                            </div>
                            <div>
                                <Label>Booking/Site Visit URL</Label>
                                <Input name="booking_url" value={formData.booking_url} onChange={handleChange} placeholder="https://..." />
                            </div>
                            <div>
                                <Label>Brochure PDF (Upload New)</Label>
                                <Input type="file" onChange={(e) => e.target.files && setBrochureFile(e.target.files[0])} accept="application/pdf" />
                                {formData.brochure_url && <a href={formData.brochure_url} target="_blank" rel="noreferrer" className="text-xs text-blue-500 hover:underline mt-1 block">View Current Brochure</a>}
                            </div>
                        </div>

                        <div>
                            <Label>Images (Select Multiple)</Label>
                            <Input type="file" onChange={handleFileChange} accept="image/*" multiple />
                            {isEdit && <p className="text-sm text-gray-500 mt-1">Leave empty to keep existing images. New uploads will prevent appending.</p>}
                        </div>

                        <div>
                            <Label>Video</Label>
                            <Input type="file" onChange={(e) => e.target.files && setVideoFile(e.target.files[0])} accept="video/*" />
                            {isEdit && <p className="text-sm text-gray-500 mt-1">Leave empty to keep existing video</p>}
                        </div>

                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? "Saving..." : "Save Property"}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div >
    );
};

export default PropertyForm;
