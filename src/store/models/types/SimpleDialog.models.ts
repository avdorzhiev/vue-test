export interface ISimpleDialogState {
    display: boolean;
    header?: string | {label: string};
    content?: string | Object;
    buttons?: {label: string, action: () => void}[];
}

export interface ISimpleDialogGetters {
    displayDialog(): boolean;
    content(): string;
    buttons(): {label: string, action: () => void}[];
    header(): string;
}
