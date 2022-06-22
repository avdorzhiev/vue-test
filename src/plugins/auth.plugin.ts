import {Vue as _Vue} from 'vue/types/vue';
import {PluginObject} from 'vue/types/plugin';

export const LOCAL_STORAGE_KEY_USER_ID = 'USER_ID';

export interface ILoginPlugin {
    userId(): number;
    isLogin(): boolean;
    login(userId: number): void;
    logout(): void;
}

const AuthPlugin: PluginObject<void> = {
    install: (Vue: typeof _Vue) => {
        Vue.prototype.$auth = {
            userId: function(): number {
                return AuthService.userId();
            },
            isLogin: function(): boolean {
                return AuthService.isLogin();
            },
            login: function(userId: number) {
                return AuthService.login(userId);
            },
            logout: function() {
                return AuthService.logout();
            },
        };
    }
};

export class AuthService {
    static userId(): number {
        return Number(localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID));
    }

    static isLogin(): boolean {
        return !!localStorage.getItem(LOCAL_STORAGE_KEY_USER_ID);
    }

    static login(userId: number) {
        localStorage.setItem(LOCAL_STORAGE_KEY_USER_ID, userId.toString());
    }

    static logout() {
        localStorage.removeItem(LOCAL_STORAGE_KEY_USER_ID);
    }
}

export default AuthPlugin;
