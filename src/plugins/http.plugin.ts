import {Axios, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Store} from 'vuex';
import {Vue as _Vue} from 'vue/types/vue';
import {PluginObject} from 'vue/types/plugin';

export interface IHttpOptions {
    axios: Axios
}

export interface IHttpPlugin {
    get<T = any, O = any>(url: string, config?: AxiosRequestConfig<O>): Promise<T>
}


const HttpPlugin: PluginObject<Axios> = {
    install(Vue: typeof _Vue, axios) {

        if (axios) {
            Vue.prototype.$http = {
                get<T = any, O = any>(url: string, config?: AxiosRequestConfig<O>): Promise<T> {
                    return axios.get(url, config)
                        .then((response: AxiosResponse<T>) => response.data)
                }
            }
        }
        else console.error('HttpPlugin:::install: Can you please add Axios in Vue.use() as options')
    }
}


export class HttpClass {

    static displayErrorHandler(error: AxiosError, store: Store<any>) {
        store.commit('setError', error)
        store.commit('displayErrorDialog', true);
    }

}

export default HttpPlugin;
