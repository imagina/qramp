<template>
  <fueling />
</template>
<script>
import fueling from '../_components/fueling/views/index.vue'
import fuelingStore from '../_components/fueling/store/index.store.ts'

export default {
  components: {
    fueling,
  },
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qramp.fueling',
        permission: 'ramp.fueling.manage',
        create: {
          method: async () => {
            fuelingStore.updateModal = false;
            fuelingStore.titleModal = 'New Fueling'
            fuelingStore.showModal = true;
          }
        },
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
            },
            {
              name: 'serviceDate',
              label: 'Service Date',
              field: 'name',
              align: 'left',
            },
            {
              name: 'aircraftType',
              label: 'Aircraft Type',
              field: 'aircraftType',
              align: 'left',
              format: val => val ? val : '-'
            },
            {
              name: 'fuel_ticket',
              label: 'Fuel Ticket #',
              field: 'fuelTicket',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'tail_number',
              label: 'Tail Number',
              field: 'tailNumber',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'prist',
              label: 'Prist',
              field: 'prist',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'jet',
              label: 'Jet A',
              field: 'jet',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'diesel',
              label: 'Diesel',
              field: 'diesel',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'gas',
              label: 'Gas',
              field: 'gas',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'miscellaneous',
              label: 'Miscellaneous',
              field: 'miscellaneous',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'overnight_parking',
              label: 'Overnight Parking -Aviation',
              field: 'overnight_parking',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'gh',
              label: 'GH',
              field: 'gh',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'cargo',
              label: 'Cargo',
              field: 'cargo',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'intoplane',
              label: 'Intoplane',
              field: 'intoplane',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'call',
              label: 'Call Out-Second',
              field: 'call',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'spirit',
              label: 'Spirit',
              field: 'spirit',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'compass',
              label: 'Compass',
              field: 'compass',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'defuel_fee',
              label: 'Defuel Fee',
              field: 'defuelFee',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'endeavor',
              label: 'Endeavor',
              field: 'endeavor',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'express_jet',
              label: 'ExpressJet',
              field: 'expressJet',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'go_jet',
              label: 'GoJet',
              field: 'goJet',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'gauge',
              label: 'INOP Gauge Fueling',
              field: 'gauge',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'regular',
              label: 'Regular',
              field: 'regular',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'shuttle',
              label: 'Shuttle',
              field: 'shuttle',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'skyWest',
              label: 'SkyWest',
              field: 'skyWest',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'delta',
              label: 'Delta',
              field: 'delta',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'republic',
              label: 'Republic',
              field: 'republic',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'atlantic',
              label: 'Atlantic Southeast Airlines',
              field: 'atlantic',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'actions',
              label: this.$tr('isite.cms.form.actions'),
              align: 'left'
            },
          ],
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
  methods: {}
}
</script>
<style lang="scss">
</style>
