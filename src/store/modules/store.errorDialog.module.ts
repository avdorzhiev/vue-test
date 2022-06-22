import {IState} from '@/store/models/store.state.models';
import {Module} from 'vuex';
import {AxiosError} from 'axios';
import {IErrorDialogState} from '@/store/models/ErrorDialog.models';


const moduleErrorDialog: Module<IErrorDialogState, IState> = {
    namespaced: true,
    state: {
        display: false,
    },
    getters: {
        displayErrorDialog: (state) => {
            return state.display;
        },
        errorCode: (state) => {
            return state.error && state.error.code;
        },
        errorMessage: (state) => {
            return state.error && state.error.message;
        }

    },
    mutations: {
        displayErrorDialog(state, value: boolean) {
            return state.display = value;
        },
        setError(state, error: AxiosError) {
            return state.error = error;
        }
    }
};

export default moduleErrorDialog;
