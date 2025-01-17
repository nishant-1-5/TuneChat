import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

interface AuthStore {
    isAdmin: boolean;
    error: string| null;
    isLoading: boolean;
    checkAdminStatus: () => Promise<void>;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    isAdmin: false,
    error: null,
    isLoading: false,
    
    checkAdminStatus: async () => {
        try {
            set({isLoading: true, error:null});
            const response = await axiosInstance.get("/admin/check");
            set({isAdmin: response.data.admin});
            
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            set({isAdmin: false, error: error.message});
        } finally {
            set({isLoading: false});
        }
    },
    reset: () => set({isAdmin: false, error: null, isLoading: false}),
}));