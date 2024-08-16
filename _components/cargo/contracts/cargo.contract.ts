export interface FormContract {
    inboundCargoTotalUldsUnloaded: string;
    inboundCargoBulkUnloaded: string;
    outboundCargoTotalUldsLoaded: string;
    outboundCargoBulkLoaded: string;
    cargoTotalKilosLoaded: string;
    cargoTotalKilosUnloaded: string;
}

export interface DelayListContract {
    code: string;
    hours: string;
}

export interface CargoStoreContract {
    form: FormContract;
    delayList: DelayListContract[];
    delay: boolean;
    ourDelay: string | null;
    delayComment: string | null;
    error: boolean;
}

export interface UseCargoStoreContract {
    getForm(): FormContract;
    setForm(cargo: FormContract): void;
    getDelayList(): DelayListContract[];
    setDelayList(data: DelayListContract[]): void;
    getDelay(): boolean;
    setDelay(value: boolean): void;
    payload(): PayloadContract;
    reset(): void;
    getOurDelay(): string | null;
    setOurDelay(value: string | null);
    getDelayComment(): string | null;
    setDelayComment(value: string | null);
    getError(): boolean;
    setError(value: boolean);
    setDelayListData(data: DelayListContract[]): void;
}

export interface PayloadContract {
    delay: DelayListContract[],
    cargo: FormContract,
    ourDelay: string | null;
    delayComment: string | null;
}