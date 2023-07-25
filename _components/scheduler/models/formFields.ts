import Vue, { computed } from 'vue';
import { COMPANY_RAMP } from '../../model/constants.js';
import workOrderList from '../../../_store/actions/workOrderList';

const fields = computed(() => ({
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
      }
}))

export default fields.value;