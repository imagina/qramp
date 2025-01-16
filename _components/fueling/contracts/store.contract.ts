export interface Form {
    serviceDate: null,
    aircraftType: null,
    fuelTicket: null,
    tailNumber: null,
    prist: null,
    jetA: null,
    diesel: null,
    gas: null,
    miscellaneous: null,
    overnightParking: null,
    callOutSecond: null,
    spirit: null,
    compass: null,
    defuelFee: null,
    endeavor: null,
    expressJet: null,
    goJet: null,
    gaugeFueling: null,
    regular: null,
    shuttle: null,
    skyWest: null,
    delta: null,
    republic: null,
    atlanticSoutheastAirlines: null,
}

export interface State {
    showModal: boolean;
    form: Form,
    loading: boolean;
    titleModal: string;
    updateModal: boolean;
}

export interface Store {
    showModal: boolean;
    form: Form;
    loading: boolean;
    titleModal: string;
    updateModal: boolean;
    reset(): void;
}