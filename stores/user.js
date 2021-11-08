import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            email: '',
            full_name: '',
            avatar_url: '',
        }
    },
    actions: {
        setUser({ email, full_name, avatar_url }) {
            this.email = email;
            this.full_name = full_name;
            this.avatar_url = avatar_url;
        },
        logout() {
            this.email = '';
            this.full_name = '';
            this.avatar_url = '';
        }
    },
})
