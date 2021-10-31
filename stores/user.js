import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
    state: () => {
        return {
            email: '',
            displayName: '',
            photoURL: '',
        }
    },
    actions: {
        setUser({ email, displayName, photoURL }) {
            this.email = email;
            this.displayName = displayName;
            this.photoURL = photoURL;
        },
        logout() {
            this.email = '';
            this.displayName = '';
            this.photoURL = '';
        }
    },
})
