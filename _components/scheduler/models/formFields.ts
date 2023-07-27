import Vue, { computed } from 'vue';
import { COMPANY_RAMP } from '../../model/constants.js';
import workOrderList from '../../../_store/actions/workOrderList';
import { modelWeek } from './constants'
import store from '../store/index.store'


export default function modelFields() {
    const updateModal = computed(() => store.updateModal);
    const formFields = computed(() => ({
        mainForm: {
            carrierId: {
                value: null,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    label: Vue.prototype.$tr('ifly.cms.sidebar.airline'),
                },
                loadOptions: {
                    apiRoute: 'apiRoutes.qfly.airlines',
                    select: {
                        label: 'airlineName',
                        id: 'id'
                    },
                    refresh: true,
                }
            },
            stationId: {
                value: null,
                type: 'select',
                loadOptions: {
                    apiRoute: 'apiRoutes.qsetupagione.setupStations',
                    select: { 'label': 'fullName', 'id': 'id' },
                    requestParams: {
                        filter: {
                            companyId: COMPANY_RAMP,
                        },
                    },
                },
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    label: 'Station',
                    'clearable': true
                },
            },
            acTypeId: {
                value: null,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    label: Vue.prototype.$tr('ifly.cms.sidebar.aircraftType'),
                    options: workOrderList().getACTypesList().map(item => ({
                        label: item.model,
                        value: item.id
                    })),
                },
            },
            fromDate: {
                value: '',
                type: 'date',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY',
                    mask: 'MM/DD/YYYY',
                    'place-holder': 'MM/DD/YYYY',
                    label: `* fromDate`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                    readonly: updateModal.value
                },
                label: Vue.prototype.$tr('ifly.cms.form.scheduledArrival'),
            },
            untilDate: {
                value: '',
                type: 'date',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY',
                    mask: 'MM/DD/YYYY',
                    'place-holder': 'MM/DD/YYYY',
                    label: `* untilDate`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                    readonly: updateModal.value
                },
                label: Vue.prototype.$tr('ifly.cms.form.scheduledArrival'),
            },
            daysOfWeek: {
                value: null,
                type: 'select',
                props: {
                    multiple: true,
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    label: 'daysOfWeek',
                    alphabeticalSort: false,
                    options: modelWeek,
                    readonly: updateModal.value
                },
            },
            operationTypeId: {
                value: null,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    label: `*${Vue.prototype.$tr('ifly.cms.form.operation')}`,
                    clearable: true,
                    color: "primary",
                    options: workOrderList().getOperationTypeList()
                },
                label: Vue.prototype.$tr('ifly.cms.form.operation'),
            },
        },
        inbound: {
            flightNumber: {
                value: null,
                type: "input",
                props: {
                    rules: [
                        (val) => !!val || Vue.prototype.$tr("isite.cms.message.fieldRequired"),
                    ],
                    label: `*${Vue.prototype.$tr("ifly.cms.form.flight")}`,
                    clearable: true,
                    maxlength: 7,
                    color: "primary",
                },
                label: Vue.prototype.$tr("ifly.cms.form.flight"),
            },
            inboundScheduleArrival: {
                value: '',
                type: 'fullDate',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY HH:mm',
                    mask: 'MM/DD/YYYY HH:mm',
                    'place-holder': 'MM/DD/YYYY HH:mm',
                    label: `*${Vue.prototype.$tr('ifly.cms.form.scheduledArrival')}`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                },
                label: Vue.prototype.$tr('ifly.cms.form.scheduledArrival'),
            },
        },
        outbound: {
            outboundFlightNumber: {
                value: null,
                type: "input",
                props: {
                    rules: [
                        (val) => !!val || Vue.prototype.$tr("isite.cms.message.fieldRequired"),
                    ],
                    label: `* outboundFlightNumber`,
                    clearable: true,
                    maxlength: 7,
                    color: "primary",
                },
                label: Vue.prototype.$tr("ifly.cms.form.flight"),
            },
            outboundScheduleDeparture: {
                value: '',
                type: 'fullDate',
                props: {
                    rules: [
                        val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                    ],
                    hint: 'Format: MM/DD/YYYY HH:mm',
                    mask: 'MM/DD/YYYY HH:mm',
                    'place-holder': 'MM/DD/YYYY HH:mm',
                    label: `* outbound Schedule Departure `,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                },
                label: Vue.prototype.$tr('ifly.cms.form.scheduledArrival'),
            },
        },
    }))

    return {
        formFields
    }
}