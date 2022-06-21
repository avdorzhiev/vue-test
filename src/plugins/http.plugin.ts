import {Axios, AxiosError, AxiosRequestConfig, AxiosResponse} from 'axios';
import {Store} from 'vuex';
import {Vue as _Vue} from 'vue/types/vue';
import {PluginObject} from 'vue/types/plugin';

export interface IHttpOptions {
    axios: Axios
}

export interface IHttpFilters {
    [key: string]: boolean | string | number | Array<boolean | string | number>;
}

export interface IHttpCollectionParams {
    page?: number;
    size?: number;
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
                },
                prepareFilter(filters: IHttpFilters, arrayHandler?: (arr: any[]) => string): string {
                    return HttpClass.prepareFilter(filters, arrayHandler)
                },
                prepareCollectionParams(collectionParams: IHttpCollectionParams, paginationName?: { page: string, size: string }): string {
                    return HttpClass.prepareCollectionParams(collectionParams, paginationName)
                },
                prepareUrl(
                    url: string,
                    filters?: IHttpFilters,
                    collectionParams?: IHttpCollectionParams,
                    arrayHandlerForFilter?: (arr: any[]) => string,
                    paginationName?: { page: string, size: string }
                ): string {
                    return HttpClass.prepareUrl(url, filters, collectionParams, arrayHandlerForFilter, paginationName);
                }
            }
        } else console.error('HttpPlugin:::install: Can you please add Axios in Vue.use() as options')
    }
}


export class HttpClass {

    static displayErrorHandler(error: AxiosError, store: Store<any>) {
        store.commit('errorDialog/setError', error)
        store.commit('errorDialog/displayErrorDialog', true);
    }

    static prepareFilter(filters: IHttpFilters, arrayHandler?: (arr: any[]) => string): string {
        return Object.keys(filters)
            .filter(key => Array.isArray(filters[key]) ? !!(filters[key] as Array<boolean | string | number>).length : !!filters[key])
            .map((key: string) => {
                const value = filters[key];
                if (Array.isArray(value)) {
                    return 'key=' + (arrayHandler ? arrayHandler(value) : value.join(','));
                }
                return `${key}=${filters[key]}`
            }).join('&');
    }

    static prepareCollectionParams(collectionParams: IHttpCollectionParams, paginationName: { page: string, size: string } = {
        page: 'page',
        size: 'size'
    }): string {
        return collectionParams.page ? `${paginationName.page}=${collectionParams.page}` : '' + '&' +
            collectionParams.size ? `${paginationName.size}=${collectionParams.size}` : '';
    }

    static prepareUrl(
        url: string,
        filters?: IHttpFilters,
        collectionParams?: IHttpCollectionParams,
        arrayHandlerForFilter?: (arr: any[]) => string,
        paginationName?: { page: string, size: string },
    ): string {
        return url + '?' +
            (collectionParams && this.prepareCollectionParams(collectionParams, paginationName) + '&' || '') +
            (filters && this.prepareFilter(filters, arrayHandlerForFilter));
    }

}

export default HttpPlugin;
