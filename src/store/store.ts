import { createPinia, defineStore } from 'pinia';


export const pinia = createPinia();

interface User {
    firstName: string;
    businessName: string;
}

export const useUserStore = defineStore({
    id: 'store',
    state: () => ({
        token: '',
        user: {
            firstName: '',
            businessName: '',
        } as User,
    }),
});