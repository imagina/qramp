export interface PropsContract {
    readonly?: boolean;
    mask?: string;
    label?: string;
    hint?: string;
    placeHolder?: string;
    format24h?: boolean;
    typeIndexDate?: number;
}

export interface QuantityContract {
    name: string;
    value?: any;
    type: string;
    id: number;
    props?: PropsContract;
}

export interface Inputremark {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface FullDateStart {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface FullDateEnd {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface Quantityquantity {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}

export interface DynamicField {
    icon: string;
    title: string;
    id: number;
    categoryId: number;
    formField: any;
}

export interface ListContract {
    id: number;
    title: string;
    dynamicField?: DynamicField[];
    lists?: any[];
}


export interface Quantity2 {
    name: string;
    value?: any;
    type: string;
    id: number;
    props: PropsContract;
}
export interface ServiceModelContract {
    id?: number;
    title?: string;
    lists?: ListContract[];
    dynamicField?: DynamicField[];
}

const dataModel: ServiceModelContract[] = [
    {
        id: 1,
        title: 'Services',
        lists: [
            {
                id: 5,
                title: 'Fligth service 1',
                dynamicField: [
                    {
                        "icon": "settings",
                        "title": "Aircraft Cleaning",
                        "id": 1,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "AC Unit",
                        "id": 2,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            },
                            "inputremark": {
                                "name": "remark",
                                "value": null,
                                "type": "input",
                                "id": 2,
                                "props": {
                                    "readonly": false,
                                    "label": "remark"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Airstart Unit",
                        "id": 3,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            },
                            "inputremark": {
                                "name": "remark",
                                "value": null,
                                "type": "input",
                                "id": 2,
                                "props": {
                                    "readonly": false,
                                    "label": "remark"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Crew Services - Transport",
                        "id": 20,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Crew Stairs Unit",
                        "id": 21,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "GPU Service",
                        "id": 32,
                        "categoryId": 1,
                        "formField": {
                            "fullDateStart": {
                                "name": "Start",
                                "value": null,
                                "type": "fullDate",
                                "id": 3,
                                "props": {
                                    "readonly": false,
                                    "label": "Start",
                                    "hint": "Format: MM/DD/YYYY HH:mm",
                                    "mask": "MM/DD/YYYY HH:mm",
                                    "place-holder": "MM/DD/YYYY HH:mm",
                                    "format24h": true,
                                    "typeIndexDate": 0
                                }
                            },
                            "fullDateEnd": {
                                "name": "End",
                                "value": null,
                                "type": "fullDate",
                                "id": 4,
                                "props": {
                                    "readonly": false,
                                    "label": "End",
                                    "hint": "Format: MM/DD/YYYY HH:mm",
                                    "mask": "MM/DD/YYYY HH:mm",
                                    "place-holder": "MM/DD/YYYY HH:mm",
                                    "format24h": true,
                                    "typeIndexDate": 1
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Lavatory Service",
                        "id": 40,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Pallet Transport",
                        "id": 46,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Pushback Service",
                        "id": 49,
                        "categoryId": 1,
                        "formField": {
                            "quantityquantity": {
                                "name": "quantity",
                                "value": null,
                                "type": "quantity",
                                "id": 11,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Regulated Garbage",
                        "id": 55,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Transfers/Line Haul/Drayage Ramp",
                        "id": 68,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Water Service",
                        "id": 73,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Ramp Marshalling",
                        "id": 83,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Aircraft Parking",
                        "id": 101,
                        "categoryId": 1,
                        "formField": {
                            "fullDateStart": {
                                "name": "Start",
                                "value": null,
                                "type": "fullDate",
                                "id": 3,
                                "props": {
                                    "readonly": false,
                                    "label": "Start",
                                    "hint": "Format: MM/DD/YYYY HH:mm",
                                    "mask": "MM/DD/YYYY HH:mm",
                                    "place-holder": "MM/DD/YYYY HH:mm",
                                    "format24h": true,
                                    "typeIndexDate": 0
                                }
                            },
                            "fullDateEnd": {
                                "name": "End",
                                "value": null,
                                "type": "fullDate",
                                "id": 4,
                                "props": {
                                    "readonly": false,
                                    "label": "End",
                                    "hint": "Format: MM/DD/YYYY HH:mm",
                                    "mask": "MM/DD/YYYY HH:mm",
                                    "place-holder": "MM/DD/YYYY HH:mm",
                                    "format24h": true,
                                    "typeIndexDate": 1
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Towing Service",
                        "id": 126,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Extended Towing Service",
                        "id": 138,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Loadmaster",
                        "id": 144,
                        "categoryId": 1,
                        "formField": {
                            "quantityquantity": {
                                "name": "quantity",
                                "value": null,
                                "type": "quantity",
                                "id": 11,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Forklift",
                        "id": 145,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            },
                            "inputremark": {
                                "name": "remark",
                                "value": null,
                                "type": "input",
                                "id": 2,
                                "props": {
                                    "readonly": false,
                                    "label": "remark"
                                }
                            }
                        }
                    },
                    {
                        "icon": "settings",
                        "title": "Loader",
                        "id": 147,
                        "categoryId": 1,
                        "formField": {
                            "quantity": {
                                "name": "",
                                "value": null,
                                "type": "quantity",
                                "id": 1,
                                "props": {
                                    "readonly": false,
                                    "mask": "###################"
                                }
                            },
                            "inputremark": {
                                "name": "remark",
                                "value": null,
                                "type": "input",
                                "id": 2,
                                "props": {
                                    "readonly": false,
                                    "label": "remark"
                                }
                            }
                        }
                    }
                ],
            },
            {
                id: 6,
                title: 'Fligth service 2',
                lists: [],
            },
            {
                id: 7,
                title: 'Fligth service 3',
                dynamicField: [],
            },
        ],
    },
    {
        id: 2,
        title: 'Equipment',
        dynamicField: [
            {
                "icon": "settings",
                "title": "Aircraft Cleaning",
                "id": 1,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "AC Unit",
                "id": 2,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    },
                    "inputremark": {
                        "name": "remark",
                        "value": null,
                        "type": "input",
                        "id": 2,
                        "props": {
                            "readonly": false,
                            "label": "remark"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Airstart Unit",
                "id": 3,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    },
                    "inputremark": {
                        "name": "remark",
                        "value": null,
                        "type": "input",
                        "id": 2,
                        "props": {
                            "readonly": false,
                            "label": "remark"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Crew Services - Transport",
                "id": 20,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Crew Stairs Unit",
                "id": 21,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "GPU Service",
                "id": 32,
                "categoryId": 1,
                "formField": {
                    "fullDateStart": {
                        "name": "Start",
                        "value": null,
                        "type": "fullDate",
                        "id": 3,
                        "props": {
                            "readonly": false,
                            "label": "Start",
                            "hint": "Format: MM/DD/YYYY HH:mm",
                            "mask": "MM/DD/YYYY HH:mm",
                            "place-holder": "MM/DD/YYYY HH:mm",
                            "format24h": true,
                            "typeIndexDate": 0
                        }
                    },
                    "fullDateEnd": {
                        "name": "End",
                        "value": null,
                        "type": "fullDate",
                        "id": 4,
                        "props": {
                            "readonly": false,
                            "label": "End",
                            "hint": "Format: MM/DD/YYYY HH:mm",
                            "mask": "MM/DD/YYYY HH:mm",
                            "place-holder": "MM/DD/YYYY HH:mm",
                            "format24h": true,
                            "typeIndexDate": 1
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Lavatory Service",
                "id": 40,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Pallet Transport",
                "id": 46,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Pushback Service",
                "id": 49,
                "categoryId": 1,
                "formField": {
                    "quantityquantity": {
                        "name": "quantity",
                        "value": null,
                        "type": "quantity",
                        "id": 11,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Regulated Garbage",
                "id": 55,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Transfers/Line Haul/Drayage Ramp",
                "id": 68,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Water Service",
                "id": 73,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Ramp Marshalling",
                "id": 83,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Aircraft Parking",
                "id": 101,
                "categoryId": 1,
                "formField": {
                    "fullDateStart": {
                        "name": "Start",
                        "value": null,
                        "type": "fullDate",
                        "id": 3,
                        "props": {
                            "readonly": false,
                            "label": "Start",
                            "hint": "Format: MM/DD/YYYY HH:mm",
                            "mask": "MM/DD/YYYY HH:mm",
                            "place-holder": "MM/DD/YYYY HH:mm",
                            "format24h": true,
                            "typeIndexDate": 0
                        }
                    },
                    "fullDateEnd": {
                        "name": "End",
                        "value": null,
                        "type": "fullDate",
                        "id": 4,
                        "props": {
                            "readonly": false,
                            "label": "End",
                            "hint": "Format: MM/DD/YYYY HH:mm",
                            "mask": "MM/DD/YYYY HH:mm",
                            "place-holder": "MM/DD/YYYY HH:mm",
                            "format24h": true,
                            "typeIndexDate": 1
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Towing Service",
                "id": 126,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Extended Towing Service",
                "id": 138,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Loadmaster",
                "id": 144,
                "categoryId": 1,
                "formField": {
                    "quantityquantity": {
                        "name": "quantity",
                        "value": null,
                        "type": "quantity",
                        "id": 11,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Forklift",
                "id": 145,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    },
                    "inputremark": {
                        "name": "remark",
                        "value": null,
                        "type": "input",
                        "id": 2,
                        "props": {
                            "readonly": false,
                            "label": "remark"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Loader",
                "id": 147,
                "categoryId": 1,
                "formField": {
                    "quantity": {
                        "name": "",
                        "value": null,
                        "type": "quantity",
                        "id": 1,
                        "props": {
                            "readonly": false,
                            "mask": "###################"
                        }
                    },
                    "inputremark": {
                        "name": "remark",
                        "value": null,
                        "type": "input",
                        "id": 2,
                        "props": {
                            "readonly": false,
                            "label": "remark"
                        }
                    }
                }
            }
        ],
    },
    {
        id: 3,
        title: 'Crew',
        lists: [],
    },
    {
        id: 4,
        title: 'Labor OT',
        lists: [],
    },
];

export default dataModel;