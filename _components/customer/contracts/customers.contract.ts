export interface Customer {
    id: string;
    label: string;
    value: string;
}

export interface FormState {
    newCustumerAdHoc: Customer[];
    bannerMessage: string | null;
    customerName: string;
    selectCustomers: Customer | null | string;
    form: {
        customerId: string | null;
        contractId: string | null;
        customCustomerName: string | null;
    };
}

export interface SelectField {
    value: string;
    type: string;
    help: {
        description: string;
    };
    props: {
        rules: Function[];
        label: string;
        clearable: boolean;
        color: string;
        'hide-bottom-space': boolean;
        emitValue: boolean;
        options: Customer[];
    };
    loadOptions: {
        delayed: Function;
    };
    label: string;
}

export interface FieldConfig {
    banner: {
        type: string;
        props: {
            color: string;
            icon: string;
            message: string | null;
        };
    };
    customerId: SelectField;
}