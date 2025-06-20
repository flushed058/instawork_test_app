import axios, { AxiosError, AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:8000',
});

export const getMembers = async (): Promise<Member[]> => {
    try {
        const response: AxiosResponse<Member[]> = await api.get('/members/');


        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        return [];
    }
};

export const createMember = async (member: Omit<Member, 'id'>): Promise<Member | null> => {
    try {
        const response: AxiosResponse<Member> = await api.post('/members/', member);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        return null;
    }
};

export const updateMember = async (id: number, member: Omit<Member, 'id'>): Promise<Member | null> => {
    try {
        const response: AxiosResponse<Member> = await api.put(`/members/${id}/`, member);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        return null;
    }
};

export const getMember = async (id: number): Promise<Member | null> => {
    try {
        const response: AxiosResponse<Member> = await api.get(`/members/${id}/`);
        return response.data;
    } catch (error) {
        handleApiError(error as AxiosError);
        return null;
    }
};

function handleApiError(error: AxiosError): ApiError {
    const errorMessage = error.response?.data || error.message;
    console.error('API Error:', errorMessage);
    return {
        message: typeof errorMessage === 'string' ? errorMessage : 'An unknown error occurred',
        status: error.response?.status,
    };
}