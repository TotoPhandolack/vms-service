import { create } from 'zustand';
import { initialState } from '@/config/constants-api';
import axiosClientVMS from '@/config/axiosClientVMS';

export interface CarType {
    ct_id: number;
    car_type: string;
    createdAt?: string;
    updatedAt?: string;
}

type CarTypeStore = {
    success: boolean;
    error: boolean;
    totalCount: number;
    page: number;
    pageSize: number;
    totalPages: number;
    loading: boolean;
    dataCarType: CarType[];
    getCarTypesData: () => Promise<void>;
    getCarTypeByCarTypeId: (carTypeId: number) => Promise<any>;
    getCarTypeById: (carTypeId: number) => any;
    addCarType: (newCarType: CarType) => Promise<void>;
    updateCarType: (updatedCarType: CarType) => Promise<void>;
    deleteCarType: (carTypeId: number) => void;
};

export const useCarTypeStore = create<CarTypeStore>((set, get) => ({
    ...initialState,
    dataCarType: [],
    loading: false,

    getCarTypesData: async () => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClientVMS.get('/CarType/GetAll');
            console.log("carType-data", response);
            set({
                ...initialState,
                loading: false,
                success: true,
                dataCarType: response.status === 200 ? response.data : []
            });
        } catch (error) {
            console.error('Error fetching car types:', error);
            set({ ...initialState, loading: false, error: true });
        }
    },

    getCarTypeByCarTypeId: async (carTypeId) => {
        set({ ...initialState, loading: true });
        try {
            const response = await axiosClientVMS.get('/CarType/GetById/' + carTypeId);
            set({ ...initialState, success: true, dataUser: response.status === 200 ? response.data : [] });
        } catch (error) {
            console.error('Error fetching data by province ID:', error);
            set({ ...initialState, error: true });
        }
    },

    getCarTypeById: async (carTypeId) => {
        try {
            // Make API call to get center details by ID from the server
            const response = await axiosClientVMS.get(`/Users/byId/${carTypeId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Return the retrieved news details
                return response.data.data;
            } else {
                console.error('Failed to fetch news details. Status:', response.status);
                return null;
            }
        } catch (error) {
            console.error('Error fetching news details:', error);
            return null;
        }
    },

    addCarType: async (newCarType) => {
        try {
            // Make API call to add a new center on the server
            const response = await axiosClientVMS.post('/CarType/Create', newCarType);
            // Check if the API call was successful (status code 201)
            if (response.status === 200) {
                // Update the local state with the new center
                set((state) => ({ dataCarType: [...state.dataCarType, response.data] }));
            } else {
                console.error('Failed to add center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error adding center:', error);
        }
    },

    updateCarType: async (updatedCarType) => {
        try {
            // Make API call to update the center on the server
            const response = await axiosClientVMS.put(`/CarType/Update`, updatedCarType);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state with the updated center
                set((state) => ({
                    dataCarType: state.dataCarType.map((center) =>
                        center.ct_id === updatedCarType.ct_id ? updatedCarType : center
                    ),
                }));
            } else {
                console.error('Failed to update center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error updating center:', error);
        }
    },
    deleteUser: async (carTypeId: number) => {
        try {
            // Make API call to delete the center on the server
            const response = await axiosClientVMS.delete(`/Users/del/${carTypeId}`);
            // Check if the API call was successful (status code 200)
            if (response.status === 200) {
                // Update the local state by removing the deleted center
                set((state) => ({
                    dataCarType: state.dataCarType.filter((center) => center.ct_id !== carTypeId),
                }));
            } else {
                console.error('Failed to delete center. Status:', response.status);
            }
        } catch (error) {
            console.error('Error deleting center:', error);
        }
    }

}));