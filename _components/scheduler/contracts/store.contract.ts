export interface State {
    showModal: boolean;
    form: any
}

export interface Store {
    showModal: boolean;
    form: any;
    reset(): void;
}