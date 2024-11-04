import { computed, ComputedRef } from 'vue';
import workOrderList from '../../../_store/actions/workOrderList';
import { modelWeek } from './constants'
import store from '../store/index.store'
import {ModelFields, FormFields} from '../contracts/formFields.contract'
import { i18n } from 'src/plugins/utils'
import qRampStore from 'modules/qramp/_store/qRampStore'
import moment from 'moment'

export default function modelFields(): ModelFields {
    const updateModal: ComputedRef<boolean> = computed(() => store.updateModal);
    const filterCompany = computed(() =>
        qRampStore().getFilterCompany()
    );
    const isbound = computed(() => qRampStore().isbound(store.form.operationTypeId))
    const formFields: ComputedRef<FormFields> = computed(() => ({
        left: {
            carrierId: {
                value: null,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                    ],
                    label: i18n.tr('ifly.cms.sidebar.airline'),
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
                            companyId: filterCompany.value,
                        },
                    },
                },
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                    ],
                    label: 'Station',
                    'clearable': true,
                    readonly: updateModal.value
                },
            },
            acTypeId: {
                value: null,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                    ],
                    label: i18n.tr('ifly.cms.sidebar.aircraftType'),
                    options: workOrderList().getACTypesList().map(item => ({
                        label: item.model,
                        value: item.id
                    })),
                },
            },
        },
        right: {
            fromDate: {
                value: '',
                type: 'date',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired'),
                    ],
                    hint: 'Format: MM/DD/YYYY',
                    mask: 'MM/DD/YYYY',
                    'place-holder': 'MM/DD/YYYY',
                    label: `* From Date`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                    readonly: updateModal.value
                },
                label: i18n.tr('ifly.cms.form.scheduledArrival'),
            },
            untilDate: {
                value: '',
                type: 'date',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired'),
                        val => {
                          if(store.form.fromDate) {
                            const FORMAT_DATE = 'MM/DD/YYYY'
                            const dateInFormat = store.form.fromDate
                              ? moment(store.form.fromDate, FORMAT_DATE)
                              : moment(FORMAT_DATE)
                            const date = moment(val, FORMAT_DATE)
                            const diff = date.diff(dateInFormat)
                            return diff >= 0 || 'The end date cannot be less than the start date'
                          }
                          return true;
                        }
                    ],
                    hint: 'Format: MM/DD/YYYY',
                    mask: 'MM/DD/YYYY',
                    'place-holder': 'MM/DD/YYYY',
                    label: `* Until Date`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                    readonly: updateModal.value,
                    options: (dateTime) => {
                      if (!store.form.fromDate) return false;
                      if (isNaN(dateTime)) {
                        return dateTime >= moment(store.form.fromDate, 'MM/DD/YYYY').format('YYYY/MM/DD')
                      }
                    }
                },
                label: i18n.tr('ifly.cms.form.scheduledArrival'),
            },
            daysOfWeek: {
                value: null,
                type: 'select',
                props: {
                    multiple: true,
                    rules: [
                        val => val.length > 0 || i18n.tr('isite.cms.message.fieldRequired')
                    ],
                    label: 'Days Of Week',
                    alphabeticalSort: false,
                    options: modelWeek,
                    readonly: updateModal.value
                },
            },
        },
        center: {
            operationTypeId: {
                value: null,
                type: 'select',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                    ],
                    label: `*${i18n.tr('ifly.cms.form.operation')}`,
                    clearable: true,
                    color: "primary",
                    options: workOrderList().getOperationTypeList()
                },
                label: i18n.tr('ifly.cms.form.operation'),
            },
        },
        inbound: {
            flightNumber: {
                value: null,
                type: "input",
                props: {
                    rules: [
                        (val) => !!val || i18n.tr("isite.cms.message.fieldRequired"),
                    ],
                    label: `*${i18n.tr("ifly.cms.form.flight")}`,
                    clearable: true,
                    maxlength: 10,
                    color: "primary",
                },
                label: i18n.tr("ifly.cms.form.flight"),
            },
            inboundScheduleArrival: {
                value: '',
                type: 'hour',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired'),
                    ],
                    label: `* Inbound Schedule Arrival`,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                },
                label: i18n.tr('ifly.cms.form.scheduledArrival'),
            },
        },
        outbound: {
            outboundFlightNumber: {
                value: null,
                type: "input",
                props: {
                    rules: [
                        (val) => !!val || i18n.tr("isite.cms.message.fieldRequired"),
                    ],
                    label: `*Outbound Flight Number`,
                    clearable: true,
                    maxlength: 10,
                    color: "primary",
                },
                label: i18n.tr("ifly.cms.form.flight"),
            },
            outboundScheduleDeparture: {
                value: '',
                type: 'hour',
                props: {
                    rules: [
                        val => !!val || i18n.tr('isite.cms.message.fieldRequired'),
                        val => {
                          if (isbound.value[0] && isbound.value[1] && !store.form.depDays && store.form.outboundScheduleDeparture) {

                            const arrivalTime = moment(store.form.inboundScheduleArrival, 'HH:mm');
                            const departureTime = moment(val, 'HH:mm');

                            if (departureTime.isBefore(arrivalTime)) {
                              return 'Outbound cannot be behind Inbound'
                            }
                          }
                          return true;
                        }
                    ],
                    label: `*Outbound Schedule Departure `,
                    clearable: true,
                    color: "primary",
                    format24h: true,
                },
                label: i18n.tr('ifly.cms.form.scheduledArrival'),
            },
        },
        full: {
            depDays: {
                value: null,
                type: "input",
                props: {
                  rules: [
                    val => {
                      if (val === null || val === undefined || val === '') {
                        return true;
                      }
                      if (val < 0) {
                        return 'The Dep Days cannot be zero or less than zero';
                      }
                      if (store.refFormScheduler &&
                        store.form.depDays &&
                        store.form.outboundScheduleDeparture) {
                        store.refFormScheduler.reset();
                      }
                    }
                  ],
                    type: 'number',
                    label: `Dep. +Days`,
                    clearable: true,
                    maxlength: 10,
                    color: "primary",
                },
                label: i18n.tr("ifly.cms.form.flight"),
            },
        }
    }));

    return {
        formFields
    }
}
