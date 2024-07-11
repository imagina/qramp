<template>
  <div>
    <schedulerModal />
  </div>
</template>
<script>
import workOrderList from '../_store/actions/workOrderList.ts'
import schedulerStore from '../_components/scheduler/store/index.store.ts'
import schedulerModal from '../_components/scheduler/index.vue';
import show from '../_components/scheduler/actions/show.ts';
import {
  BUSINESS_UNIT_RAMP, BUSINESS_UNIT_PASSENGER, COMPANY_PASSENGER, COMPANY_RAMP, LABOR, BUSINESS_UNIT_LABOR
} from "../_components/model/constants"
import qRampStore from '../_store/qRampStore.js'

export default {
  components: {
    schedulerModal,
  },
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  created() {
    this.$nextTick(async () => {
      await workOrderList().getAllList();
    })
  },
  computed: {
    filterBusinessUnit() {
      if(qRampStore().getTypeWorkOrder() === LABOR) {
        return [BUSINESS_UNIT_LABOR, BUSINESS_UNIT_PASSENGER]
      }
      return this.isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;
    },
    isPassenger() {
      return qRampStore().getIsPassenger();
    },
    filterCompany() {
      return this.isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
    },
    crudData() {
      return {
        crudId: this.crudId,
        //entityName: config("main.qfly.entityNames.workOrder"),
        apiRoute: 'apiRoutes.qramp.schedulers',
        permission: 'ramp.schedulers',
        create: {
          method: async () => {
            schedulerStore.updateModal = false;
            schedulerStore.titleModal = 'New Scheduler'
            schedulerStore.showModal = true;
          }
        },
        extraActions: [{
          label: 'Back to schedule',
          props: {
            icon: 'fa-duotone fa-calendar-plus',
            label: 'Back to schedule',
          },
          action: () => {
            this.getUrlSchedule()
          }
        }],
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
              action: (item) => false
            },
            {
              name: 'customerId',
              label: this.$tr('isite.cms.label.customer'),
              field: 'customerId',
              formatAsync: async item => {
                if (!item.customerId) return '-';
                const response = await workOrderList().getCustomerList()
                  .find(customer => customer.id === item.customerId) || {};
                return `${response.customerName || '-'}`;
              },
              align: 'left',
            },
            {
              name: 'flightNumber',
              label: 'Flight Number',
              field: 'flightNumber',
              format: (val) => (val ? val : "-"),
              align: 'left',
            },
            {
              name: 'carrier',
              label: 'Carrier',
              field: 'carrierId',
              formatAsync: async item => {
                if (!item.carrierId) return '-';
                const response = await workOrderList().getAirlinesList()
                  .find(carrier => carrier.id === item.carrierId) || {};
                return `${response.airlineName || '-'}`;
              },
              align: 'left',
            },
            {
              name: 'operationType',
              label: 'Operation Type',
              field: 'operationTypeId',
              formatAsync: async item => {
                const response = await workOrderList().getOperationTypeList()
                  .find(operation => operation.id === item.operationTypeId) || {};
                return `${response.operationName || '-'}`;
              },
              align: 'left'
            },
            {
              name: 'station',
              label: 'Station',
              field: 'stationId',
              formatAsync: async item => {
                if (!item.stationId) return '-';
                const response = await workOrderList().getStationList()
                  .find(station => station.id === item.stationId) || {};
                return `${response.fullName || '-'}`;
              },
              align: 'left'
            },
            {
              name: 'acTypeId',
              label: 'acType',
              field: 'acTypeId',
              formatAsync: async item => {
                if (!item.acTypeId) return '-';
                const response = await workOrderList().getACTypesList()
                  .find(act => act.id === item.acTypeId) || {};
                return `${response.fullName || '-'}`;
              },
              align: 'left'
            },
            {
              name: "fromDate",
              label: 'From Date',
              field: "fromDate",
              align: "left",
              format: (val) => (val ? this.$trdT(val) : "-"),
              sortable: true
            },
            {
              name: "untilDate",
              label: 'Until Date',
              field: "untilDate",
              align: "left",
              format: (val) => (val ? this.$trdT(val) : "-"),
              sortable: true
            },
            {
              name: "inboundScheduledArrival",
              label: 'Arrival',
              field: "inboundScheduleArrival",
              align: "left",
              format: (val) => (val ? this.$trdT(val) : "-"),
              sortable: true
            },
            {
              name: "outboundScheduleDeparture",
              label: 'Departure',
              field: "outboundScheduleDeparture",
              align: "left",
              format: (val) => (val ? this.$trdT(val) : "-"),
              sortable: true
            },
            {
              name: "outboundFlightNumber",
              label: 'Outbound Flight Number',
              field: item => `${item.outboundFlightNumber ? item.outboundFlightNumber : ''}`,
              align: "left",
              format: item => item ? item : '',
            },
            {
              name: "daysOfWeek",
              label: 'Days Of Week',
              field: 'daysOfWeek',
              align: "left",
              format: item => item ? this.convertNumbersToDays(item) : '',
            },
            {
              name: "created_at",
              label: this.$tr("isite.cms.form.createdAt"),
              field: "createdAt",
              align: "left",
              format: (val) => (val ? this.$trd(val) : "-"),
            },
            {
              name: "updated_at",
              label: this.$tr("isite.cms.form.updatedAt"),
              field: "updatedAt",
              align: "left",
              format: (val) => (val ? this.$trd(val) : "-"),
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
          ],
          filters: {
            stationId: {
              value: null,
              type: "select",
              props: {
                label: "Station",
                options: workOrderList().getStationList().map(item => ({
                  label: item.fullName,
                  value: item.id
                })),
                clearable: true,
              },
            },
            carrierId: {
              value: null,
              type: 'select',
              props: {
                vIf: false,
                label: 'Carrier',
                options: workOrderList().getAirlinesList().map(item => ({
                  label: item.airlineName,
                  value: item.id
                })),
                clearable: true,
              },
            },
            customerId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.setupCustomers',
                select: { 'label': 'customerName', 'id': 'id' },
                requestParams: {
                  filter: {
                    companyId: this.filterCompany,
                  },
                },
              },
              props: {
                label: 'Customer',
                'clearable': true
              },
            },
            acTypeId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ifly.cms.sidebar.aircraftType'),
                options: workOrderList().getACTypesList().map(item => ({
                  label: item.model,
                  value: item.id
                })),
                clearable: true,
              },
            },
            operationTypeId: {
              value: null,
              type: 'select',
              props: {
                label: this.$tr('ifly.cms.form.operation'),
                clearable: true,
                color: "primary",
                'hide-bottom-space': false,
                options: workOrderList().getOperationTypeList().map(item => ({
                  label: item.operationName,
                  value: item.id
                }))
              },
              label: this.$tr('ifly.cms.form.operation'),
            },
          },
          actions: [
            {
              name: 'edit',
              icon: 'fal fa-pen',
              label: this.$tr('isite.cms.label.edit'),
              action: async (item) => {
                await show(item.id);
              }
            },
          ],
          requestParams: {
            filter: {
              withoutDefaultInclude: true,
              businessUnitId: this.filterBusinessUnit,
            },
          }
        },
        update: false,
        delete: true,
        formLeft: {},
        formRight: {}
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
  methods: {
    convertNumbersToDays(numbersDays) {
      if (!Array.isArray(numbersDays)) {
        return '';
      }
      const daysOfWeek = {
        1: "Monday",
        2: "Tuesday",
        3: "Wednesday",
        4: "Thursday",
        5: "Friday",
        6: "Saturday",
        7: "Sunday"
      };

      const namesOfDays = numbersDays.map(number => daysOfWeek[number]);

      return namesOfDays.join(', ');
    },
    getUrlSchedule() {
      const url = localStorage.getItem('urlSchedule');
      window.location.href = url;
    },
  }
}
</script>
<style lang="scss"></style>
