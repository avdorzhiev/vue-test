import {IState} from '@/store/models/store.state.models';
import {Module} from 'vuex';
import {ISimpleDialogState} from '@/store/models/types/SimpleDialog.models';


const moduleSimpleDialog: Module<ISimpleDialogState, IState> = {
    namespaced: true,
    state: {
        display: false,
    },
    getters: {
        displayDialog: (state) => {
            return state.display;
        },
        content: (state) => {
            const content = state.content;
            if (!content) return '';

            if (typeof content === 'object' && typeof content !== null) {
                let html = '<table>';

                Object.keys(content).forEach((key: string) => {
                    const value: any = (content as any)[key];
                    html += `<tr class="item">
                                <td class="label">${key} :</td>
                                <td class="value">${value}</td>
                            </tr>`
                })
                return html + '</table>'
            }

            return content;
        },
        buttons: (state) => {
            const buttons = state.buttons;
            return !buttons ? [] : buttons;
        },
        header: (state) => {
            const header = state.header;
            if (!header) return '';
            if (typeof header === 'object') return `<h5>${header.label}</h5>`
            return header;
        },
    },
    mutations: {
        setDisplayDialog: (state, value: boolean) => {
            state.display = value;
        },
        setContent: (state, value?: string | Object) => {
            state.content = value;
        },
        setButtons: (state, value?: {label: string, action: () => void}[]) => {
            state.buttons = value;
        },
        setHeader: (state, value?: string | {label: string}) => {
            state.header = value;
        },
    }
}

export default moduleSimpleDialog;
