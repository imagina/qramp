<template>
  <div>
    <flightDetail/>
  </div>
</template>
<script>

import {
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_CLOSED,
  STATUS_DRAFT,
  STATUS_SCHEDULE,
} from "../../_components/model/constants"
import qRampStore from '../../_store/qRampStore.js'
import flightDetail from '../../_components/modal/flightDetail.vue';
import workOrderList from '../../_store/actions/workOrderList.ts'
import {cacheOffline} from 'src/plugins/utils';
import {eventBus} from 'src/plugins/utils'

export default {
  name: 'RampCrud',
  emits: ['loading'],
  components: {
    flightDetail,
  },
  data() {
    return {
      crudId: this.$uid(),
      areaId: null,
      commentableId: null,
    }
  },
  async created() {
    this.$nextTick(async () => {
      await qRampStore().setIsPassenger(false);
      await workOrderList().getAllList(true);
      await workOrderList().getCustomerWithContract()
    })
  },
  beforeUnmount() {
    qRampStore().setFlightList([]);
    qRampStore().setFlightId(null);
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qramp.entityNames.workOrders"),
        apiRoute: 'apiRoutes.qramp.workOrders',
        permission: 'ramp.work-orders',
      }
    },
    getCustomerName() {
      return (item) => {
        let customerName = item;
        if (item) {
          customerName = typeof item === 'object' ? item.customerName : item;
        }
        return customerName || '-';
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
<style lang="scss">
</style>
