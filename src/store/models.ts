import {AxiosError} from 'axios';

export interface IErrorDialogState {
    display: boolean;
    error?: AxiosError;
}

export interface IErrorDialogGetters {
    displayErrorDialog(): boolean;
    errorCode(): string;
    errorMessage(): string;
}


export interface IState {
    // errorDialog?: IErrorDialog
}
