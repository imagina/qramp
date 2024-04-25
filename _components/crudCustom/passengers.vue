<template>
  <div>
    <flightDetail />
  </div>
</template>
<script>
import qRampStore from 'modules/qramp/_store/qRampStore.js'
import flightDetail from 'modules/qramp/_components/modal/flightDetail.vue';
import workOrderList from 'modules/qramp/_store/actions/workOrderList.ts'

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
      await qRampStore().setIsPassenger(true);
      const previousPath = this.$route.meta?.previousPath?.split('/')[1];
      if (!this.$route.path.startsWith(`/${previousPath}`)) {
          await workOrderList().getAllList();
      }
      await workOrderList().getCustomerWithContract()
    })
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qfly.entityNames.workOrder"),
        permission: 'ramp.passenger-work-orders',
      }
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
