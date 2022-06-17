import {IErrorDialogGetters, IErrorDialogState, IState} from '@/store/models';
import {Module, ModuleTree} from 'vuex';
import {AxiosError} from 'axios';


const moduleErrorDialog: Module<IErrorDialogState, IState> = {
    state: {
        display: false,
    },
    getters: {
        displayErrorDialog: (state) => {
            return state.display;
        },
        errorCode: (state) => {
            return state.error && state.error.code
        },
        errorMessage: (state) => {
            return state.error && state.error.message
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
}

export default moduleErrorDialog;
