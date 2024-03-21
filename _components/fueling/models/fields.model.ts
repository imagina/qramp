export const fields = {
    blockOne: {
        serviceDate: {
            value: '',
            type: "date",
            props: {
                label: 'Service Date',
            },
        },
        aircraftType: {
            value: '',
            type: "select",
            props: {
                label: 'Aircraft Type',
            },
            loadOptions: {
                apiRoute: 'apiRoutes.qfly.aircraftTypes',
                select: {
                    label:'model',
                    id: 'id'
                },
                refresh: true,
            }
        },
        fuelTicket: {
            value: '',
            type: "input",
            props: {
                label: 'Fuel Ticket #',
            },
        },
        tailNumber: {
            value: '',
            type: "input",
            props: {
                label: 'Tail Number',
            },
        },
        prist: {
            value: '',
            type: "checkbox",
            props: {
                label: 'Prist',
            },
        },
    },
    blockTwo: {
        jetA: {
            label: 'Jet A',
            fields: {
                priceJetA: {
                    value: '',
                    type: "input",
                    props: {
                        label: 'Price',
                        icon: 'fa-solid fa-dollar-sign',
                    },
                },
                amountJetA: {
                    value: '',
                    type: "input",
                    props: {
                        label: 'Amount',
                        endText: 'GAL',
                    },
                },
            }
        },
        diesel: {
            label: 'Diesel',
            fields: {
                priceDiesel: {
                    value: '',
                    type: "input",
                    props: {
                        label: 'Price',
                        icon: 'fa-solid fa-dollar-sign',
                    },
                },
                amountDiesel: {
                    value: '',
                    type: "input",
                    props: {
                        label: 'Amount',
                        endText: 'GAL',
                    },
                },
            }
        },
        gas: {
            label: 'Gas',
            fields: {
                priceGas: {
                    value: '',
                    type: "input",
                    props: {
                        label: 'Price',
                        icon: 'fa-solid fa-dollar-sign',
                    },
                },
                amountGas: {
                    value: '',
                    type: "input",
                    props: {
                        label: 'Amount',
                        endText: 'GAL',
                    },
                },
            }
        },
        miscellaneous: {
            value: '',
            type: "input",
            props: {
                label: 'Miscellaneous',
                endText: 'DOL',
            },
        },
        overnightParking: {
            value: '',
            type: "input",
            props: {
                label: 'Overnight Parking -Aviation',
                endText: 'DOL',
            },
        },
    },
    blockThree: {
        callOutSecond: {
            value: '',
            type: "input",
            props: {
                label: 'Call Out-Second',
                endText: 'FLT',
            },
        },
        spirit: {
            value: '',
            type: "input",
            props: {
                label: 'Spirit',
                endText: 'FLT',
            },
        },
        compass: {
            value: '',
            type: "input",
            props: {
                label: 'Compass',
                endText: 'FLT',
            },
        },
        defuelFee: {
            value: '',
            type: "input",
            props: {
                label: 'Defuel Fee',
                endText: 'EA',
            },
        },
        endeavor: {
            value: '',
            type: "input",
            props: {
                label: 'Endeavor',
                endText: 'FLT',
            },
        },
        expressJet: {
            value: '',
            type: "input",
            props: {
                label: 'ExpressJet',
                endText: 'FLT',
            },
        },
        goJet: {
            value: '',
            type: "input",
            props: {
                label: 'GoJet',
                endText: 'FLT',
            },
        },
        gaugeFueling: {
            value: '',
            type: "input",
            props: {
                label: 'INOP Gauge Fueling',
                endText: 'FLT',
            },
        },
        regular: {
            value: '',
            type: "input",
            props: {
                label: 'Regular',
                endText: 'FLT',
            },
        },
        shuttle: {
            value: '',
            type: "input",
            props: {
                label: 'Shuttle',
                endText: 'FLT',
            },
        },
        skyWest: {
            value: '',
            type: "input",
            props: {
                label: 'SkyWest',
                endText: 'FLT',
            },
        },
        delta: {
            value: '',
            type: "input",
            props: {
                label: 'Delta',
                endText: 'FLT',
            },
        },
        republic: {
            value: '',
            type: "input",
            props: {
                label: 'Republic',
                endText: 'FLT',
            },
        },
        atlanticSoutheastAirlines: {
            value: '',
            type: "input",
            props: {
                label: 'Atlantic Southeast Airlines',
                endText: 'FLT',
            },
        },
    }
}