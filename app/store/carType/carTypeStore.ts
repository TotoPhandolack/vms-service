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
            // console.log("carType-data", response);
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

    // addCarType: async (newCarType) => {
    //     try {
    //         // Make API call to add a new center on the server
    //         const response = await axiosClientVMS.post('/CarType/Create', newCarType);
    //         console.log('response :', response)
    //         // Check if the API call was successful (status code 201)
    //         if (response.status === 200) {
    //             // Update the local state with the new center
    //             await get().getCarTypesData();
    //             set((state) => ({ dataCarType: [...state.dataCarType, response.data] }));
    //         } else {
    //             console.error('Failed to add center. Status:', response.status);
    //         }
    //     } catch (error) {
    //         console.error('Error adding center:', error);
    //     }
    // },

    addCarType: async (newCarType) => {
        set({ ...initialState, loading: true });
        try {
            // สร้าง FormData แทน JSON
            const formData = new FormData();
            formData.append('car_type', newCarType.car_type);

            const response = await axiosClientVMS.post('/CarType/Create', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });

            // console.log('Add CarType Response:', response);

            if (response.status === 200 || response.status === 201) {
                // Refresh data หลังเพิ่มสำเร็จ
                await get().getCarTypesData();
                set({ ...initialState, success: true });
                return { success: true, data: response.data };
            } else {
                console.error('Failed to add car type. Status:', response.status);
                set({ ...initialState, error: true });
                return { success: false, error: 'Failed to add car type' };
            }
        } catch (error: any) {
            console.error('Error adding car type:', error);
            console.error('Error response:', error.response?.data);
            set({ ...initialState, error: true, errorData: error.response?.data });
            return { success: false, error: error.response?.data?.message || 'Error adding car type' };
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
            const response = await axiosClientVMS.delete(`/CarType/Delete/${carTypeId}`);
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