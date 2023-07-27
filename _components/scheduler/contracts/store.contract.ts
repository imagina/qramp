export interface State {
    showModal: boolean;
    form: any,
    loading: boolean;
    titleModal: string;
    updateModal: boolean;
}

export interface Store {
    showModal: boolean;
    form: any;
    loading: boolean;
    titleModal: string;
    updateModal: boolean;
    reset(): void;
    dateFormatterFull(date: string): string;
}