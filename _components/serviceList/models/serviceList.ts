import cargo from '../../cargo.vue';
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
    component?: any;
    form?: any,
}

const dataModel: ServiceModelContract[] = [
    {
        id: 1,
        title: 'Services',
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
        id: 2,
        title: 'Equipment',
        dynamicField: [
            {
                "icon": "settings",
                "title": "Belt Loader",
                "id": 112,
                "categoryId": 2,
                "formField": {
                    "selectLoad": {
                        "name": "Load",
                        "value": null,
                        "type": "select",
                        "id": 7,
                        "props": {
                            "readonly": false,
                            "label": "Load",
                            "options": [
                                {
                                    "name": "ALD1055",
                                    "value": "ALD1055",
                                    "attributeId": 7,
                                    "id": 12,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1055"
                                },
                                {
                                    "name": "ALD1056",
                                    "value": "ALD1056",
                                    "attributeId": 7,
                                    "id": 13,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1056"
                                },
                                {
                                    "name": "ALD1057",
                                    "value": "ALD1057",
                                    "attributeId": 7,
                                    "id": 14,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1057"
                                },
                                {
                                    "name": "ALD1058",
                                    "value": "ALD1058",
                                    "attributeId": 7,
                                    "id": 15,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1058"
                                },
                                {
                                    "name": "ALD1059",
                                    "value": "ALD1059",
                                    "attributeId": 7,
                                    "id": 16,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1059"
                                },
                                {
                                    "name": "ALD1060",
                                    "value": "ALD1060",
                                    "attributeId": 7,
                                    "id": 17,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1060"
                                },
                                {
                                    "name": "ALD1061",
                                    "value": "ALD1061",
                                    "attributeId": 7,
                                    "id": 18,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1061"
                                },
                                {
                                    "name": "ALD1062",
                                    "value": "ALD1062",
                                    "attributeId": 7,
                                    "id": 19,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1062"
                                },
                                {
                                    "name": "ALD1063",
                                    "value": "ALD1063",
                                    "attributeId": 7,
                                    "id": 20,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1063"
                                },
                                {
                                    "name": "ALD1064",
                                    "value": "ALD1064",
                                    "attributeId": 7,
                                    "id": 21,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1064"
                                },
                                {
                                    "name": "ALD1065",
                                    "value": "ALD1065",
                                    "attributeId": 7,
                                    "id": 22,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1065"
                                },
                                {
                                    "name": "ALD1066",
                                    "value": "ALD1066",
                                    "attributeId": 7,
                                    "id": 23,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1066"
                                },
                                {
                                    "name": "ALD1067",
                                    "value": "ALD1067",
                                    "attributeId": 7,
                                    "id": 24,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1067"
                                },
                                {
                                    "name": "ALD1068",
                                    "value": "ALD1068",
                                    "attributeId": 7,
                                    "id": 25,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1068"
                                },
                                {
                                    "name": "ALD1069",
                                    "value": "ALD1069",
                                    "attributeId": 7,
                                    "id": 26,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1069"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "GPU Equipment",
                "id": 148,
                "categoryId": 2,
                "formField": {
                    "selectGPU": {
                        "name": "GPU",
                        "value": null,
                        "type": "select",
                        "id": 6,
                        "props": {
                            "readonly": false,
                            "label": "GPU",
                            "options": [
                                {
                                    "name": "AGP1027",
                                    "value": "AGP1027",
                                    "attributeId": 6,
                                    "id": 1,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1027"
                                },
                                {
                                    "name": "AGP1028",
                                    "value": "AGP1028",
                                    "attributeId": 6,
                                    "id": 2,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1028"
                                },
                                {
                                    "name": "AGP1029",
                                    "value": "AGP1029",
                                    "attributeId": 6,
                                    "id": 3,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1029"
                                },
                                {
                                    "name": "AGP1031",
                                    "value": "AGP1031",
                                    "attributeId": 6,
                                    "id": 4,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1031"
                                },
                                {
                                    "name": "AGP1032",
                                    "value": "AGP1032",
                                    "attributeId": 6,
                                    "id": 5,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1032"
                                },
                                {
                                    "name": "AGP1033",
                                    "value": "AGP1033",
                                    "attributeId": 6,
                                    "id": 6,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1033"
                                },
                                {
                                    "name": "AGP1034",
                                    "value": "AGP1034",
                                    "attributeId": 6,
                                    "id": 7,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1034"
                                },
                                {
                                    "name": "AGP1035",
                                    "value": "AGP1035",
                                    "attributeId": 6,
                                    "id": 8,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1035"
                                },
                                {
                                    "name": "AGP1036",
                                    "value": "AGP1036",
                                    "attributeId": 6,
                                    "id": 9,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1036"
                                },
                                {
                                    "name": "AGP1037",
                                    "value": "AGP1037",
                                    "attributeId": 6,
                                    "id": 10,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1037"
                                },
                                {
                                    "name": "AGP1038",
                                    "value": "AGP1038",
                                    "attributeId": 6,
                                    "id": 11,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AGP1038"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Main Loader",
                "id": 149,
                "categoryId": 2,
                "formField": {
                    "hourConnected Time": {
                        "name": "Connected Time",
                        "value": null,
                        "type": "hour",
                        "id": 5,
                        "props": {
                            "readonly": false,
                            "label": "Connected Time"
                        }
                    },
                    "selectLoad": {
                        "name": "Load",
                        "value": null,
                        "type": "select",
                        "id": 7,
                        "props": {
                            "readonly": false,
                            "label": "Load",
                            "options": [
                                {
                                    "name": "ALD1055",
                                    "value": "ALD1055",
                                    "attributeId": 7,
                                    "id": 12,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1055"
                                },
                                {
                                    "name": "ALD1056",
                                    "value": "ALD1056",
                                    "attributeId": 7,
                                    "id": 13,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1056"
                                },
                                {
                                    "name": "ALD1057",
                                    "value": "ALD1057",
                                    "attributeId": 7,
                                    "id": 14,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1057"
                                },
                                {
                                    "name": "ALD1058",
                                    "value": "ALD1058",
                                    "attributeId": 7,
                                    "id": 15,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1058"
                                },
                                {
                                    "name": "ALD1059",
                                    "value": "ALD1059",
                                    "attributeId": 7,
                                    "id": 16,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1059"
                                },
                                {
                                    "name": "ALD1060",
                                    "value": "ALD1060",
                                    "attributeId": 7,
                                    "id": 17,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1060"
                                },
                                {
                                    "name": "ALD1061",
                                    "value": "ALD1061",
                                    "attributeId": 7,
                                    "id": 18,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1061"
                                },
                                {
                                    "name": "ALD1062",
                                    "value": "ALD1062",
                                    "attributeId": 7,
                                    "id": 19,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1062"
                                },
                                {
                                    "name": "ALD1063",
                                    "value": "ALD1063",
                                    "attributeId": 7,
                                    "id": 20,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1063"
                                },
                                {
                                    "name": "ALD1064",
                                    "value": "ALD1064",
                                    "attributeId": 7,
                                    "id": 21,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1064"
                                },
                                {
                                    "name": "ALD1065",
                                    "value": "ALD1065",
                                    "attributeId": 7,
                                    "id": 22,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1065"
                                },
                                {
                                    "name": "ALD1066",
                                    "value": "ALD1066",
                                    "attributeId": 7,
                                    "id": 23,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1066"
                                },
                                {
                                    "name": "ALD1067",
                                    "value": "ALD1067",
                                    "attributeId": 7,
                                    "id": 24,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1067"
                                },
                                {
                                    "name": "ALD1068",
                                    "value": "ALD1068",
                                    "attributeId": 7,
                                    "id": 25,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1068"
                                },
                                {
                                    "name": "ALD1069",
                                    "value": "ALD1069",
                                    "attributeId": 7,
                                    "id": 26,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1069"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Lower Loader",
                "id": 150,
                "categoryId": 2,
                "formField": {
                    "hourConnected Time": {
                        "name": "Connected Time",
                        "value": null,
                        "type": "hour",
                        "id": 5,
                        "props": {
                            "readonly": false,
                            "label": "Connected Time"
                        }
                    },
                    "selectLoad": {
                        "name": "Load",
                        "value": null,
                        "type": "select",
                        "id": 7,
                        "props": {
                            "readonly": false,
                            "label": "Load",
                            "options": [
                                {
                                    "name": "ALD1055",
                                    "value": "ALD1055",
                                    "attributeId": 7,
                                    "id": 12,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1055"
                                },
                                {
                                    "name": "ALD1056",
                                    "value": "ALD1056",
                                    "attributeId": 7,
                                    "id": 13,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1056"
                                },
                                {
                                    "name": "ALD1057",
                                    "value": "ALD1057",
                                    "attributeId": 7,
                                    "id": 14,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1057"
                                },
                                {
                                    "name": "ALD1058",
                                    "value": "ALD1058",
                                    "attributeId": 7,
                                    "id": 15,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1058"
                                },
                                {
                                    "name": "ALD1059",
                                    "value": "ALD1059",
                                    "attributeId": 7,
                                    "id": 16,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1059"
                                },
                                {
                                    "name": "ALD1060",
                                    "value": "ALD1060",
                                    "attributeId": 7,
                                    "id": 17,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1060"
                                },
                                {
                                    "name": "ALD1061",
                                    "value": "ALD1061",
                                    "attributeId": 7,
                                    "id": 18,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1061"
                                },
                                {
                                    "name": "ALD1062",
                                    "value": "ALD1062",
                                    "attributeId": 7,
                                    "id": 19,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1062"
                                },
                                {
                                    "name": "ALD1063",
                                    "value": "ALD1063",
                                    "attributeId": 7,
                                    "id": 20,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1063"
                                },
                                {
                                    "name": "ALD1064",
                                    "value": "ALD1064",
                                    "attributeId": 7,
                                    "id": 21,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1064"
                                },
                                {
                                    "name": "ALD1065",
                                    "value": "ALD1065",
                                    "attributeId": 7,
                                    "id": 22,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1065"
                                },
                                {
                                    "name": "ALD1066",
                                    "value": "ALD1066",
                                    "attributeId": 7,
                                    "id": 23,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1066"
                                },
                                {
                                    "name": "ALD1067",
                                    "value": "ALD1067",
                                    "attributeId": 7,
                                    "id": 24,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1067"
                                },
                                {
                                    "name": "ALD1068",
                                    "value": "ALD1068",
                                    "attributeId": 7,
                                    "id": 25,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1068"
                                },
                                {
                                    "name": "ALD1069",
                                    "value": "ALD1069",
                                    "attributeId": 7,
                                    "id": 26,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1069"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Add Loader",
                "id": 151,
                "categoryId": 2,
                "formField": {
                    "hourConnected Time": {
                        "name": "Connected Time",
                        "value": null,
                        "type": "hour",
                        "id": 5,
                        "props": {
                            "readonly": false,
                            "label": "Connected Time"
                        }
                    },
                    "selectLoad": {
                        "name": "Load",
                        "value": null,
                        "type": "select",
                        "id": 7,
                        "props": {
                            "readonly": false,
                            "label": "Load",
                            "options": [
                                {
                                    "name": "ALD1055",
                                    "value": "ALD1055",
                                    "attributeId": 7,
                                    "id": 12,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1055"
                                },
                                {
                                    "name": "ALD1056",
                                    "value": "ALD1056",
                                    "attributeId": 7,
                                    "id": 13,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1056"
                                },
                                {
                                    "name": "ALD1057",
                                    "value": "ALD1057",
                                    "attributeId": 7,
                                    "id": 14,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1057"
                                },
                                {
                                    "name": "ALD1058",
                                    "value": "ALD1058",
                                    "attributeId": 7,
                                    "id": 15,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1058"
                                },
                                {
                                    "name": "ALD1059",
                                    "value": "ALD1059",
                                    "attributeId": 7,
                                    "id": 16,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1059"
                                },
                                {
                                    "name": "ALD1060",
                                    "value": "ALD1060",
                                    "attributeId": 7,
                                    "id": 17,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1060"
                                },
                                {
                                    "name": "ALD1061",
                                    "value": "ALD1061",
                                    "attributeId": 7,
                                    "id": 18,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1061"
                                },
                                {
                                    "name": "ALD1062",
                                    "value": "ALD1062",
                                    "attributeId": 7,
                                    "id": 19,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1062"
                                },
                                {
                                    "name": "ALD1063",
                                    "value": "ALD1063",
                                    "attributeId": 7,
                                    "id": 20,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1063"
                                },
                                {
                                    "name": "ALD1064",
                                    "value": "ALD1064",
                                    "attributeId": 7,
                                    "id": 21,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1064"
                                },
                                {
                                    "name": "ALD1065",
                                    "value": "ALD1065",
                                    "attributeId": 7,
                                    "id": 22,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1065"
                                },
                                {
                                    "name": "ALD1066",
                                    "value": "ALD1066",
                                    "attributeId": 7,
                                    "id": 23,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1066"
                                },
                                {
                                    "name": "ALD1067",
                                    "value": "ALD1067",
                                    "attributeId": 7,
                                    "id": 24,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1067"
                                },
                                {
                                    "name": "ALD1068",
                                    "value": "ALD1068",
                                    "attributeId": 7,
                                    "id": 25,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1068"
                                },
                                {
                                    "name": "ALD1069",
                                    "value": "ALD1069",
                                    "attributeId": 7,
                                    "id": 26,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ALD1069"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Transport",
                "id": 152,
                "categoryId": 2,
                "formField": {}
            },
            {
                "icon": "settings",
                "title": "Water Equip",
                "id": 153,
                "categoryId": 2,
                "formField": {
                    "selectwater equip": {
                        "name": "water equip",
                        "value": null,
                        "type": "select",
                        "id": 12,
                        "props": {
                            "readonly": false,
                            "label": "water equip",
                            "options": [
                                {
                                    "name": "AWC1006",
                                    "value": "AWC1006",
                                    "attributeId": 12,
                                    "id": 27,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AWC1006"
                                },
                                {
                                    "name": "AWC1007",
                                    "value": "AWC1007",
                                    "attributeId": 12,
                                    "id": 28,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AWC1007"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Lavatory Equip",
                "id": 154,
                "categoryId": 2,
                "formField": {}
            },
            {
                "icon": "settings",
                "title": "Airstart Equip",
                "id": 155,
                "categoryId": 2,
                "formField": {
                    "selectairstart equip": {
                        "name": "airstart equip",
                        "value": null,
                        "type": "select",
                        "id": 13,
                        "props": {
                            "readonly": false,
                            "label": "airstart equip",
                            "options": [
                                {
                                    "name": "AAS1005",
                                    "value": "AAS1005",
                                    "attributeId": 13,
                                    "id": 29,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AAS1005"
                                },
                                {
                                    "name": "AAS1006",
                                    "value": "AAS1006",
                                    "attributeId": 13,
                                    "id": 30,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AAS1006"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Tow Equip",
                "id": 156,
                "categoryId": 2,
                "formField": {
                    "selecttow equip": {
                        "name": "tow equip",
                        "value": null,
                        "type": "select",
                        "id": 14,
                        "props": {
                            "readonly": false,
                            "label": "tow equip",
                            "options": [
                                {
                                    "name": "ATU1002",
                                    "value": "ATU1002",
                                    "attributeId": 14,
                                    "id": 31,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1002"
                                },
                                {
                                    "name": "ATU1003",
                                    "value": "ATU1003",
                                    "attributeId": 14,
                                    "id": 32,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1003"
                                },
                                {
                                    "name": "ATU1004",
                                    "value": "ATU1004",
                                    "attributeId": 14,
                                    "id": 33,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1004"
                                },
                                {
                                    "name": "ATU1051",
                                    "value": "ATU1051",
                                    "attributeId": 14,
                                    "id": 34,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1051"
                                },
                                {
                                    "name": "ATU1052",
                                    "value": "ATU1052",
                                    "attributeId": 14,
                                    "id": 35,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1052"
                                },
                                {
                                    "name": "ATU1099",
                                    "value": "ATU1099",
                                    "attributeId": 14,
                                    "id": 36,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1099"
                                },
                                {
                                    "name": "ABL1019",
                                    "value": "ABL1019",
                                    "attributeId": 14,
                                    "id": 37,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1019"
                                },
                                {
                                    "name": "ABL1020",
                                    "value": "ABL1020",
                                    "attributeId": 14,
                                    "id": 38,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1020"
                                },
                                {
                                    "name": "ABL1021",
                                    "value": "ABL1021",
                                    "attributeId": 14,
                                    "id": 39,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1021"
                                },
                                {
                                    "name": "ABL1022",
                                    "value": "ABL1022",
                                    "attributeId": 14,
                                    "id": 40,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1022"
                                },
                                {
                                    "name": "ABL1022",
                                    "value": "ABL1022",
                                    "attributeId": 14,
                                    "id": 41,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1022"
                                },
                                {
                                    "name": "ABL1023",
                                    "value": "ABL1023",
                                    "attributeId": 14,
                                    "id": 42,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1023"
                                },
                                {
                                    "name": "ABL1024",
                                    "value": "ABL1024",
                                    "attributeId": 14,
                                    "id": 43,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1024"
                                },
                                {
                                    "name": "ABL1025",
                                    "value": "ABL1025",
                                    "attributeId": 14,
                                    "id": 44,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1025"
                                },
                                {
                                    "name": "ABL1026",
                                    "value": "ABL1026",
                                    "attributeId": 14,
                                    "id": 45,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1026"
                                },
                                {
                                    "name": "ABL1027",
                                    "value": "ABL1027",
                                    "attributeId": 14,
                                    "id": 46,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1027"
                                },
                                {
                                    "name": "ABL1028",
                                    "value": "ABL1028",
                                    "attributeId": 14,
                                    "id": 47,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1028"
                                },
                                {
                                    "name": "ABL1029",
                                    "value": "ABL1029",
                                    "attributeId": 14,
                                    "id": 48,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1029"
                                },
                                {
                                    "name": "ATU1184",
                                    "value": "ATU1184",
                                    "attributeId": 14,
                                    "id": 49,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1184"
                                },
                                {
                                    "name": "ATU1185",
                                    "value": "ATU1185",
                                    "attributeId": 14,
                                    "id": 50,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1185"
                                },
                                {
                                    "name": "ATU1187",
                                    "value": "ATU1187",
                                    "attributeId": 14,
                                    "id": 51,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1187"
                                },
                                {
                                    "name": "ATU1188",
                                    "value": "ATU1188",
                                    "attributeId": 14,
                                    "id": 52,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1188"
                                },
                                {
                                    "name": "ATU1189",
                                    "value": "ATU1189",
                                    "attributeId": 14,
                                    "id": 53,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1189"
                                },
                                {
                                    "name": "ATU1191",
                                    "value": "ATU1191",
                                    "attributeId": 14,
                                    "id": 54,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1191"
                                },
                                {
                                    "name": "ATU1192",
                                    "value": "ATU1192",
                                    "attributeId": 14,
                                    "id": 55,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1192"
                                },
                                {
                                    "name": "ATU1193",
                                    "value": "ATU1193",
                                    "attributeId": 14,
                                    "id": 56,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1193"
                                },
                                {
                                    "name": "ATU1194",
                                    "value": "ATU1194",
                                    "attributeId": 14,
                                    "id": 57,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1194"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Tow Ext",
                "id": 157,
                "categoryId": 2,
                "formField": {
                    "selecttow equip": {
                        "name": "tow equip",
                        "value": null,
                        "type": "select",
                        "id": 14,
                        "props": {
                            "readonly": false,
                            "label": "tow equip",
                            "options": [
                                {
                                    "name": "ATU1002",
                                    "value": "ATU1002",
                                    "attributeId": 14,
                                    "id": 31,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1002"
                                },
                                {
                                    "name": "ATU1003",
                                    "value": "ATU1003",
                                    "attributeId": 14,
                                    "id": 32,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1003"
                                },
                                {
                                    "name": "ATU1004",
                                    "value": "ATU1004",
                                    "attributeId": 14,
                                    "id": 33,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1004"
                                },
                                {
                                    "name": "ATU1051",
                                    "value": "ATU1051",
                                    "attributeId": 14,
                                    "id": 34,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1051"
                                },
                                {
                                    "name": "ATU1052",
                                    "value": "ATU1052",
                                    "attributeId": 14,
                                    "id": 35,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1052"
                                },
                                {
                                    "name": "ATU1099",
                                    "value": "ATU1099",
                                    "attributeId": 14,
                                    "id": 36,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1099"
                                },
                                {
                                    "name": "ABL1019",
                                    "value": "ABL1019",
                                    "attributeId": 14,
                                    "id": 37,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1019"
                                },
                                {
                                    "name": "ABL1020",
                                    "value": "ABL1020",
                                    "attributeId": 14,
                                    "id": 38,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1020"
                                },
                                {
                                    "name": "ABL1021",
                                    "value": "ABL1021",
                                    "attributeId": 14,
                                    "id": 39,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1021"
                                },
                                {
                                    "name": "ABL1022",
                                    "value": "ABL1022",
                                    "attributeId": 14,
                                    "id": 40,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1022"
                                },
                                {
                                    "name": "ABL1022",
                                    "value": "ABL1022",
                                    "attributeId": 14,
                                    "id": 41,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1022"
                                },
                                {
                                    "name": "ABL1023",
                                    "value": "ABL1023",
                                    "attributeId": 14,
                                    "id": 42,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1023"
                                },
                                {
                                    "name": "ABL1024",
                                    "value": "ABL1024",
                                    "attributeId": 14,
                                    "id": 43,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1024"
                                },
                                {
                                    "name": "ABL1025",
                                    "value": "ABL1025",
                                    "attributeId": 14,
                                    "id": 44,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1025"
                                },
                                {
                                    "name": "ABL1026",
                                    "value": "ABL1026",
                                    "attributeId": 14,
                                    "id": 45,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1026"
                                },
                                {
                                    "name": "ABL1027",
                                    "value": "ABL1027",
                                    "attributeId": 14,
                                    "id": 46,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1027"
                                },
                                {
                                    "name": "ABL1028",
                                    "value": "ABL1028",
                                    "attributeId": 14,
                                    "id": 47,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1028"
                                },
                                {
                                    "name": "ABL1029",
                                    "value": "ABL1029",
                                    "attributeId": 14,
                                    "id": 48,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ABL1029"
                                },
                                {
                                    "name": "ATU1184",
                                    "value": "ATU1184",
                                    "attributeId": 14,
                                    "id": 49,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1184"
                                },
                                {
                                    "name": "ATU1185",
                                    "value": "ATU1185",
                                    "attributeId": 14,
                                    "id": 50,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1185"
                                },
                                {
                                    "name": "ATU1187",
                                    "value": "ATU1187",
                                    "attributeId": 14,
                                    "id": 51,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1187"
                                },
                                {
                                    "name": "ATU1188",
                                    "value": "ATU1188",
                                    "attributeId": 14,
                                    "id": 52,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1188"
                                },
                                {
                                    "name": "ATU1189",
                                    "value": "ATU1189",
                                    "attributeId": 14,
                                    "id": 53,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1189"
                                },
                                {
                                    "name": "ATU1191",
                                    "value": "ATU1191",
                                    "attributeId": 14,
                                    "id": 54,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1191"
                                },
                                {
                                    "name": "ATU1192",
                                    "value": "ATU1192",
                                    "attributeId": 14,
                                    "id": 55,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1192"
                                },
                                {
                                    "name": "ATU1193",
                                    "value": "ATU1193",
                                    "attributeId": 14,
                                    "id": 56,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1193"
                                },
                                {
                                    "name": "ATU1194",
                                    "value": "ATU1194",
                                    "attributeId": 14,
                                    "id": 57,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "ATU1194"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Forklift Equip",
                "id": 158,
                "categoryId": 2,
                "formField": {
                    "selectforklift equip": {
                        "name": "forklift equip",
                        "value": null,
                        "type": "select",
                        "id": 15,
                        "props": {
                            "readonly": false,
                            "label": "forklift equip",
                            "options": [
                                {
                                    "name": "AFL1018",
                                    "value": "AFL1018",
                                    "attributeId": 15,
                                    "id": 58,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL1018"
                                },
                                {
                                    "name": "AFL1019",
                                    "value": "AFL1019",
                                    "attributeId": 15,
                                    "id": 59,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL1019"
                                },
                                {
                                    "name": "AFL1418",
                                    "value": "AFL1418",
                                    "attributeId": 15,
                                    "id": 60,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL1418"
                                },
                                {
                                    "name": "AFL1419",
                                    "value": "AFL1419",
                                    "attributeId": 15,
                                    "id": 61,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL1419"
                                },
                                {
                                    "name": "AFL1420",
                                    "value": "AFL1420",
                                    "attributeId": 15,
                                    "id": 62,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL1420"
                                },
                                {
                                    "name": "AFL2026",
                                    "value": "AFL2026",
                                    "attributeId": 15,
                                    "id": 63,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2026"
                                },
                                {
                                    "name": "AFL2027",
                                    "value": "AFL2027",
                                    "attributeId": 15,
                                    "id": 64,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2027"
                                },
                                {
                                    "name": "AFL2028",
                                    "value": "AFL2028",
                                    "attributeId": 15,
                                    "id": 65,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2028"
                                },
                                {
                                    "name": "AFL2029",
                                    "value": "AFL2029",
                                    "attributeId": 15,
                                    "id": 66,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2029"
                                },
                                {
                                    "name": "AFL2030",
                                    "value": "AFL2030",
                                    "attributeId": 15,
                                    "id": 67,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2030"
                                },
                                {
                                    "name": "AFL2031",
                                    "value": "AFL2031",
                                    "attributeId": 15,
                                    "id": 68,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2031"
                                },
                                {
                                    "name": "AFL2032",
                                    "value": "AFL2032",
                                    "attributeId": 15,
                                    "id": 69,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2032"
                                },
                                {
                                    "name": "AFL2033",
                                    "value": "AFL2033",
                                    "attributeId": 15,
                                    "id": 70,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2033"
                                },
                                {
                                    "name": "AFL2034",
                                    "value": "AFL2034",
                                    "attributeId": 15,
                                    "id": 71,
                                    "createdAt": null,
                                    "updatedAt": null,
                                    "deletedAt": null,
                                    "createdBy": null,
                                    "updatedBy": null,
                                    "deletedBy": null,
                                    "externalId": null,
                                    "options": null,
                                    "crudPermissions": {},
                                    "defaultInclude": "",
                                    "searchableFields": "",
                                    "fileFormats": null,
                                    "label": "AFL2034"
                                }
                            ],
                            "type": "select"
                        }
                    }
                }
            }
        ],
    },
    {
        id: 3,
        title: 'Crew',
        dynamicField: [
            {
                "icon": "settings",
                "title": "Supervisor Headcount",
                "id": 160,
                "categoryId": 3,
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
                "title": "Ramp Supervisor Reg Hours",
                "id": 86,
                "categoryId": 3,
                "formField": {
                    "quantityFloatHours": {
                        "name": "Hours",
                        "value": null,
                        "type": "quantity",
                        "id": 9,
                        "props": {
                            "readonly": false,
                            "type": "number",
                            "step": "0.1"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Ramp Supervisor Overtime",
                "id": 87,
                "categoryId": 3,
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
                "title": "Lead Headcount",
                "id": 161,
                "categoryId": 3,
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
                "title": "Ramp Agent Lead Reg Hours",
                "id": 79,
                "categoryId": 3,
                "formField": {
                    "quantityFloatHours": {
                        "name": "Hours",
                        "value": null,
                        "type": "quantity",
                        "id": 9,
                        "props": {
                            "readonly": false,
                            "type": "number",
                            "step": "0.1"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Ramp Agent Lead Overtime",
                "id": 80,
                "categoryId": 3,
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
                "title": "Agent Headcount",
                "id": 162,
                "categoryId": 3,
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
                "title": "Ramp Agent Reg Hours",
                "id": 163,
                "categoryId": 3,
                "formField": {
                    "quantityFloatHours": {
                        "name": "Hours",
                        "value": null,
                        "type": "quantity",
                        "id": 9,
                        "props": {
                            "readonly": false,
                            "type": "number",
                            "step": "0.1"
                        }
                    }
                }
            },
            {
                "icon": "settings",
                "title": "Ramp Agent Overtime",
                "id": 164,
                "categoryId": 3,
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
            }
        ],
    },
    {
        id: 4,
        title: 'Cargo',
        component: cargo,
        form: {},
    },
];

export default dataModel;