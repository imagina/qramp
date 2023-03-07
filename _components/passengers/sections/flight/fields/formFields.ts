import Vue from 'vue';
function formFields() {
    return {
        banner: {
            type: 'banner',
            props: {
                color: 'info',
                icon: 'fas fa-exclamation-triangle',
                message: null,
            }
        },
        flyFormLeft: {
            customerId: {
                name: 'customerId',
                value: '',
                type: 'select',
                help: {
                    description: 'You can add a new customer to the list if it\'s not available. Type the Customer Name and click on "Create new customer". The Work Order will be created as Ad-Hoc.'
                },
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.customer')}`,
                    clearable: true,
                    color: "primary",
                    'hide-bottom-space': false,
                    emitValue: false,
                    options: [],
                },
                loadOptions: {
                    delayed: [],
                },
                label: Vue.prototype.$tr('ifly.cms.form.customer'),
            },
            customCustomerName: {
                name: 'customCustomerName',
                value: '',
                type: 'input',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.customer')}`,
                    clearable: true,
                    color: "primary",
                    'hide-bottom-space': false
                },
                label: Vue.prototype.$tr('ifly.cms.form.customer'),
            },
            stationId: {
                name: 'stationId',
                value: '',
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    selectByDefault: true,
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.station')}`,
                    clearable: true,
                    color: "primary"
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qramp.setupStations',
                    select: { label: 'stationName', id: 'id' },
                    requestParams: { filter: { status: 1 } }
                },
            },
            acTypeId: {
                name: 'acTypeId',
                value: '',
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.acType')}`,
                    clearable: true,
                    color: "primary",
                    'hide-bottom-space': false
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qfly.aircraftTypes',
                    select: { label: 'model', id: 'id' },
                    requestParams: { filter: { status: 1 } }
                },
                label: Vue.prototype.$tr('ifly.cms.form.acType'),
            },
            operationTypeId: {
                name: 'operationTypeId',
                value: '',
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.operation')}`,
                    clearable: true,
                    color: "primary",
                    'hide-bottom-space': false
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qramp.operationTypes',
                    select: { label: 'operationName', id: 'id' },
                    requestParams: { filter: { status: 1 } }
                },
                label: Vue.prototype.$tr('ifly.cms.form.operation'),
            },
        },
        flyFormRight: {
            carrierId: {
                name: 'carrierId',
                value: '',
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.carrier')}`,
                    clearable: true,
                    color: "primary",
                    'hide-bottom-space': false
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qfly.airlines',
                    select: { label: 'airlineName', id: 'id' },
                    requestParams: { filter: { status: 1 } }
                },
                label: Vue.prototype.$tr('ifly.cms.form.carrier'),
            },
            statusId: {
                name: 'statusId',
                value: 1,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: this.readStatus,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.status')}`,
                    clearable: true,
                    color: "primary",
                    'hide-bottom-space': false
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qramp.workOrderStatuses',
                    select: { label: 'statusName', id: 'id' },
                    requestParams: { filter: { status: 1 } }
                },
                label: Vue.prototype.$tr('ifly.cms.form.status'),
            },
            responsibleId: {
                name: "responsibleId",
                value: '',
                type: "select",
                props: {
                    vIf: this.manageResponsiblePermissions,
                    rules: [
                        (val) => !!val || Vue.prototype.$tr("isite.cms.message.fieldRequired"),
                    ],
                    readonly: this.disabledReadonly,
                    label: '*Responsible',
                    clearable: true,
                    color: "primary",
                    emitValue: false,
                    options: this.responsibleList,
                },
                loadOptions: {
                    apiRoute: "apiRoutes.quser.users",
                    select: { label: "fullName", id: "id", value: "fullName" },
                    filterByQuery: true
                },
            },
        },
        inboundLeft: {
            inboundFlightNumber: {
                name: 'inboundFlightNumber',
                value: '',
                type: 'search',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Enter the fight number and press enter or press the search icon',
                    loading: this.loadingState,
                    readonly: false || this.loadingState,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.flight')}`,
                    clearable: true,
                    maxlength: 7,
                    color: "primary"
                },
                label: Vue.prototype.$tr('ifly.cms.form.flight'),
            },
            inboundOriginAirportId: {
                name: 'inboundOriginAirportId',
                value: '',
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: this.disabledReadonly || this.flightBoundFormStatus.boundOriginAirportId,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.origin')}`,
                    clearable: true,
                    color: "primary"
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qfly.airports',
                    select: { label: 'fullName', id: 'id' },
                    requestParams: { filter: { status: this.refresh } }
                },
                label: Vue.prototype.$tr('ifly.cms.form.origin'),
            },
            inboundTailNumber: {
                name: 'inboundTailNumber',
                value: '',
                type: 'input',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: this.disabledReadonly || this.flightBoundFormStatus.boundTailNumber,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.tail')}`,
                    clearable: true,
                    color: "primary"
                },
                label: Vue.prototype.$tr('ifly.cms.form.tail'),
            },
            inboundScheduledArrival: {
                name: 'inboundScheduledArrival',
                value: '',
                type: 'fullDate',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY HH:mm',
                    mask: 'MM/DD/YYYY HH:mm',
                    'place-holder': 'MM/DD/YYYY HH:mm',
                    readonly: this.disabledReadonly || this.flightBoundFormStatus.boundScheduled,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.scheduledArrival')}`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                },
                label: Vue.prototype.$tr('ifly.cms.form.scheduledArrival'),
            },
        },
        outboundRight: {
            outboundFlightNumber: {
                name: 'outboundFlightNumber',
                value: '',
                type: 'search',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Enter the fight number and press enter or press the search icon',
                    loading: this.loadingState,
                    readonly: false || this.loadingState,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.flight')}`,
                    clearable: true,
                    maxlength: 7,
                    color: "primary"
                },
                label: Vue.prototype.$tr('ifly.cms.form.flight'),
            },
            outboundDestinationAirportId: {
                name: 'outboundDestinationAirportId',
                value: '',
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: this.disabledReadonly || this.flightBoundFormStatus.boundDestinationAirport,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.destination')}`,
                    clearable: true,
                    color: "primary"
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qfly.airports',
                    select: { label: 'fullName', id: 'id' },
                    requestParams: { filter: { status: this.refresh } }
                },
                label: Vue.prototype.$tr('ifly.cms.form.destination'),
            },
            outboundTailNumber: {
                name: 'outboundTailNumber',
                value: '',
                type: 'input',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: this.disabledReadonly || this.flightBoundFormStatus.boundTailNumber,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.tail')}`,
                    clearable: true,
                    color: "primary"
                },
                label: Vue.prototype.$tr('ifly.cms.form.tail'),
            },
            outboundScheduledDeparture: {
                name: 'outboundScheduledDeparture',
                value: '',
                type: 'fullDate',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY HH:mm',
                    mask: 'MM/DD/YYYY HH:mm',
                    'place-holder': 'MM/DD/YYYY HH:mm',
                    readonly: this.disabledReadonly || this.flightBoundFormStatus.boundScheduledDeparture,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.scheduledDeparture')}`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                },
                label: Vue.prototype.$tr('ifly.cms.form.scheduledDeparture'),
            },
        },
        dateBound: {
            inboundBlockIn: {
                name: 'inboundBlockIn',
                value: '',
                type: 'fullDate',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY HH:mm',
                    mask: 'MM/DD/YYYY HH:mm',
                    'place-holder': 'MM/DD/YYYY HH:mm',
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.blockIn')}`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                    options: (date, min) => this.validateFutureDateTime(date, min, this.form.inboundBlockIn),
                },
                label: Vue.prototype.$tr('ifly.cms.form.blockIn'),
            },
            outboundBlockOut: {
                name: 'outboundBlockOut',
                value: '',
                type: 'fullDate',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY HH:mm',
                    mask: 'MM/DD/YYYY HH:mm',
                    'place-holder': 'MM/DD/YYYY HH:mm',
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.blockOut')}`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                    options: this.validateDateOutboundBlockOut,
                },
                label: Vue.prototype.$tr('ifly.cms.form.blockOut'),
            },
        },
        customerField: {
            customCustomerName: {
                name: 'customCustomerName',
                value: '',
                type: 'input',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    readonly: false,
                    label: `*${Vue.prototype.$tr('ifly.cms.form.customCustomerName')}`,
                    clearable: true,
                    color: "primary"
                },
                label: Vue.prototype.$tr('ifly.cms.form.gate'),
            },
        }
    }
}