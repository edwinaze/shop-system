import { defineStore } from 'pinia'
import { ref } from 'vue'


export const useAuthStore = defineStore('auth', () => {
    const isLogin = ref(false);
    const username = ref('');
    const password = ref('');
    const nickname = ref('');
    const role = ref('');

    function setAuthStore(UserUsername, UserPassword, UserNickname, UserRole) {
        isLogin.value = true;
        username.value = UserUsername;
        password.value = UserPassword;
        nickname.value = UserNickname;
        role.value = UserRole;
    }

    const removeAuthStore = () => {
        isLogin.value = false;
        username.value = '';
        password.value = '';
        nickname.value = '';
        role.value = '';
    }

    return { isLogin, username, password, nickname, role, setAuthStore, removeAuthStore }
})
