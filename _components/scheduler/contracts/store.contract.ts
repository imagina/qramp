export interface State {
    showModal: boolean;
    form: any,
    loading: boolean;
    titleModal: string,
}

export interface Store {
    showModal: boolean;
    form: any;
    loading: boolean;
    titleModal: string;
    reset(): void;
    dateFormatterFull(date: string): string;
}