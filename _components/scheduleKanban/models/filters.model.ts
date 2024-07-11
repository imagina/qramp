import { computed } from "vue";
import modelHoursFilter from "../models/hoursFilter.model";
import kanbanStore from "../store/kanban.store";
import workOrderList from "src/modules/qramp/_store/actions/workOrderList";
import { i18n } from 'src/plugins/utils'


export default function filterModel() {
  return computed(() => ({
    time: {
      value: null,
      type: "select",
      props: {
        label: "Filter by time",
        format24h: true,
        options: modelHoursFilter,
        alphabeticalSort: false,
        readonly: kanbanStore.isAppOffline,
      },
    },
    customerId: {
      value: null,
      type: 'select',

      quickFilter: true,
      loadOptions: {
          apiRoute: 'apiRoutes.qramp.setupCustomers',
          select: {'label': 'customerName', 'id': 'id'},
          requestParams: {
              filter: {
                  companyId: kanbanStore.filterCompany,
              },
          },
      },
      props: {
          label: 'Customer',
          'clearable': true
      },
    },
    carrierId: {
      value: null,
      type: "select",
      loadOptions: {
        apiRoute: "apiRoutes.qsetupagione.airlines",
        select: { label: "airlineName", id: "id" },
        requestParams: {},
      },
      props: {
        label: "Carrier",
        clearable: true,
        readonly: kanbanStore.isAppOffline
      },
    },
    stationId: {
      value: null,
      type: "select",
      props: {
        label: "Station",
        options: workOrderList().getStationList().map(item => ({
          label: item.fullName,
          value: item.id
        })),
      },
    },
    statusId: {
      value: null,
      type: "select",
      loadOptions: {
        apiRoute: "apiRoutes.qramp.workOrderStatuses",
        select: { label: "statusName", id: "id" },
        requestParams: {
          filter: {
            companyId: kanbanStore.filterCompany,
          },
        },
      },
      props: {
        label: "Status",
        clearable: true,
        readonly: kanbanStore.isAppOffline,
      },
    },
    adHoc: {
      value: null,
      type: "select",
      props: {
        label: "Ad Hoc",
        clearable: true,
        readonly: kanbanStore.isAppOffline,
        options: [
          { label: i18n.tr("isite.cms.label.yes"), value: true },
          { label: i18n.tr("isite.cms.label.no"), value: false },
        ],
      },
    },
    flightStatusId: {
      value: null,
      type: "select",
      loadOptions: {
        apiRoute: "apiRoutes.qfly.flightStatuses",
        select: { label: "name", id: "id" },
        requestParams: {
          filter: {
            companyId: kanbanStore.filterCompany,
          },
        },
      },
      props: {
        label: "Flight Status",
        clearable: true,
        readonly: kanbanStore.isAppOffline,
      },
    },
    areaId: {
      value: null,
      type: "select",
      loadOptions: {
        apiRoute: "apiRoutes.qsetupagione.areas",
        select: { label: "name", id: "id" },
        requestParams: {
          filter: {
            companyId: kanbanStore.filterCompany,
          },
        },
      },
      props: {
        label: "Areas",
        clearable: true,
        readonly: kanbanStore.isAppOffline,
      },
    },
    operationTypeId: {
      value: null,
      type: 'select',
      props: {
        label: `${i18n.tr('ifly.cms.form.operation')} type`,
        clearable: true,
        color:"primary",
        'hide-bottom-space': false,
        options: workOrderList().getOperationTypeList()
      },
      label: i18n.tr('ifly.cms.form.operation'),
    },
    type: {
      value: null,
    },
    dateStart: {
      value: null,
    },
    dateEnd: {
      value: null,
    },
  }));
}
