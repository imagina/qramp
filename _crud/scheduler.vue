<template></template>
<script>
import workOrderList from '../_store/actions/workOrderList.ts'
import { COMPANY_RAMP } from '../_components/model/constants.js'
export default {
  name: 'scheduler',
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
    crudData() {
      return {
        crudId: this.crudId,
        //entityName: config("main.qfly.entityNames.workOrder"),
        apiRoute: 'apiRoutes.qramp.schedulers',
        //permission: 'ramp.schedule-statuses',
        create: {
          title: 'Create Recurring Schedule'
        },
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
              name: 'flightNumber',
              label: 'FlightNumber',
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
          filters: {},
        },
        update: {
          title: 'Update OAG Stations'
        },
        delete: true,
        formLeft: {
          id: { value: "" },
          carrierId: {
            value: null,
            type: 'treeSelect',
            props: {
              label: this.$tr('ifly.cms.sidebar.airline'),
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
            value: '',
            type: 'select',
            props: {
              label: `*${this.$tr('ifly.cms.form.operation')}`,
              clearable: true,
              color: "primary",
              options: workOrderList().getOperationTypeList()
            },
            label: this.$tr('ifly.cms.form.operation'),
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
              label: 'Station',
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
            },
          }
        },
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
  }
}
</script>
<style lang="stylus">
</style>
