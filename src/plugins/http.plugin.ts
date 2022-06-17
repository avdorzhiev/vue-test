import {AxiosError} from 'axios';
import {Store} from 'vuex';

export class HttpClass {

    static displayErrorHandler(error: AxiosError, store: Store<any>) {
        store.commit('setError', error)
        store.commit('displayErrorDialog', true);
    }

}
