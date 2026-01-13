import api from './axios';

export interface Property {
    _id: string;
    title: string;
    description: string;
    price: string;
    location: string;
    city: string;
    type: string;
    image: string;
    images?: string[];
    video?: string;
    bedrooms?: string;
    bathrooms?: number;
    sqft?: string;
    possession?: string;
    builder?: string;
    amenities?: string[];
    is_featured: boolean;
    rating?: number;
    reviews?: number;
    status?: string;
    whatsapp?: string;
    booking_url?: string;
    brochure_url?: string;
    listingType?: 'Sale' | 'Rent';
    // UI specific fields (mapped or defaulted)
    // frontend 'area' typically maps to backend 'sqft', while backend 'area' is neighborhood
    area?: string;
}

export const fetchProperties = async (filters?: Record<string, string>) => {
    const params = new URLSearchParams(filters);
    const response = await api.get<Property[]>(`/properties?${params.toString()}`);
    return response.data;
};

export const fetchPropertyById = async (id: string) => {
    const response = await api.get<Property>(`/properties/${id}`);
    return response.data;
};


export const fetchAreas = async () => {
    const response = await api.get<string[]>('/areas');
    return response.data;
};

export const fetchAgentProperties = async () => {
    const token = localStorage.getItem("agentToken");
    const response = await api.get('/properties/my-listings', {
        headers: {
            'x-auth-token': token
        }
    });
    return response.data;
};

// Admin Auth
export const loginAdmin = async (credentials: { username: string; password: string }) => {
    const response = await api.post('/auth/login', credentials);
    return response.data; // Returns { token: string }
};

// User Auth
export const registerUser = async (userData: { username: string; email: string; password: string }) => {
    const response = await api.post('/auth/user/register', userData);
    return response.data;
};

export const loginUser = async (credentials: { email: string; password: string }) => {
    const response = await api.post('/auth/user/login', credentials);
    return response.data;
};

export const createProperty = async (data: FormData, token: string) => {
    const response = await api.post('/properties', data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
        }
    });
    return response.data;
};

export const updateProperty = async (id: string, data: FormData, token: string) => {
    const response = await api.put(`/properties/${id}`, data, {
        headers: {
            'Content-Type': 'multipart/form-data',
            'x-auth-token': token
        }
    });
    return response.data;
};

export const deleteProperty = async (id: string, token: string) => {
    const response = await api.delete(`/properties/${id}`, {
        headers: {
            'x-auth-token': token
        }
    });
    return response.data;
};

export const submitContact = async (data: {
    name: string;
    email: string;
    phone: string;
    message?: string;
    property_id?: string;
}) => {
    const response = await api.post('/contact', data);
    return response.data;
};

// Agent Auth
export const registerAgent = async (agentData: { name: string; email: string; phone: string; password: string }) => {
    const response = await api.post('/auth/agent/register', agentData);
    return response.data;
};

export const loginAgent = async (credentials: { email: string; password: string }) => {
    try {
        const response = await api.post('/auth/agent/login', credentials);
        return response.data;
    } catch (error: any) {
        throw error;
    }
};

// Admin Agent Management
export const fetchPendingAgents = async () => {
    const response = await api.get('/auth/admin/pending-agents');
    return response.data;
};

export const approveAgent = async (id: string) => {
    const response = await api.put(`/auth/admin/approve-agent/${id}`);
    return response.data;
};

export const rejectAgentRequest = async (id: string) => {
    const response = await api.delete(`/auth/admin/reject-agent/${id}`);
    return response.data;
};

// Profile APIs
export const fetchUserProfile = async () => {
    const token = localStorage.getItem("userToken");
    const response = await api.get('/auth/user/profile', { headers: { 'x-auth-token': token } });
    return response.data;
};

export const updateUserProfile = async (data: any) => {
    const token = localStorage.getItem("userToken");
    const response = await api.put('/auth/user/profile', data, { headers: { 'x-auth-token': token } });
    return response.data;
};

export const fetchAgentProfile = async () => {
    const token = localStorage.getItem("agentToken");
    const response = await api.get('/auth/agent/profile', { headers: { 'x-auth-token': token } });
    return response.data;
};

export const updateAgentProfile = async (data: any) => {
    const token = localStorage.getItem("agentToken");
    const response = await api.put('/auth/agent/profile', data, { headers: { 'x-auth-token': token } });
    return response.data;
};

// Inquiry APIs
export const createInquiry = async (propertyId: string, message: string) => {
    const token = localStorage.getItem("userToken");
    const response = await api.post('/inquiries', { propertyId, message }, { headers: { 'x-auth-token': token } });
    return response.data;
};

export const fetchUserInquiries = async () => {
    const token = localStorage.getItem("userToken");
    const response = await api.get('/inquiries/user', { headers: { 'x-auth-token': token } });
    return response.data;
};

export const fetchAgentInquiries = async () => {
    const token = localStorage.getItem("agentToken");
    const response = await api.get('/inquiries/agent', { headers: { 'x-auth-token': token } });
    return response.data;
};
