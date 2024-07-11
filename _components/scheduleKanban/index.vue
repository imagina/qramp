<template>
  <div>
    <kanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted } from "vue";
import kanbanBoard from "./components/kanbanBoard.vue";
import workOrderList from '../../_store/actions/workOrderList'
import qRampStore from "../../_store/qRampStore";
import kanbanStore from './store/kanban.store'
import { router } from 'src/plugins/utils'
let routeName = router.route.path;
import serviceListStore from "../serviceList/store/serviceList";
import { LABOR } from "../model/constants";

export default defineComponent({
  components: {
    kanbanBoard,
  },
  props: {
    isBlank: {
      type: Boolean,
      default: () => false,
    }
  },
  setup(props) {
    init();
    watch((currentValue, oldValue) => router.route.path, (currentValue, oldValue) => {
      if (routeName !== currentValue) {
        init();
        routeName = currentValue;
        kanbanStore.columns.forEach(column => {
          column.cards = [];
        })
      }
    },
      { deep: true }
    );

    function init() {
      new Promise(async (resolve, reject) => {
        console.log('router.route.path', router.route.path)
        let currentRoutePath = router.route.path;
        let isPassenger = currentRoutePath.indexOf('passenger') !== -1;
        let isLabor = currentRoutePath.indexOf('labor') !== -1;
        let isRamp = currentRoutePath.indexOf('ramp') !== -1;
        // await qRampStore().setTypeWorkOrder(null);
        // // await workOrderList().setStationList([]);
        // if(isRamp) {
        //   await qRampStore().setIsPassenger(false);
        // }
        // if(isPassenger) {
        //   await qRampStore().setIsPassenger(true);
        // }
        // if(isLabor) {
        //   await qRampStore().setIsPassenger(true);
        //   await qRampStore().setTypeWorkOrder(LABOR)
        // }
        // await workOrderList().getAllList();
        // await workOrderList().getCustomerWithContract();
        await serviceListStore().init();
      })
    }

    onMounted(() => {
      kanbanStore.isBlank = props.isBlank;
      qRampStore().setIsblank(props.isBlank);
    })
    return {};
  },
});
</script>

<style scoped></style>
