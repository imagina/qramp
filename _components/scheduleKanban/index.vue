<template>
  <div>
    <kanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, watch, onMounted } from "vue";
import kanbanBoard from "./components/kanbanBoard.vue";
import workOrderList from '../../_store/actions/workOrderList'
import qRampStore from "../../_store/qRampStore";
import kanbanStore from './store/kanban.store'
import serviceListStore from "../serviceList/store/serviceList";
import {FLIGHT, LABOR} from "../model/constants";

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
    const proxy = (getCurrentInstance() as any).proxy as any;
    init();
    watch(() => proxy.$route, (currentValue, oldValue) => {
        init();
      },
      { deep: true }
    );
    function init() {
      new Promise(async (resolve, reject) => {
        let currentRoutePath = proxy.$router.currentRoute.path;
        let isPassenger = currentRoutePath.indexOf('passenger') !== -1;
        let isLabor = currentRoutePath.indexOf('labor') !== -1;
        let isRamp = currentRoutePath.indexOf('ramp') !== -1;
        await qRampStore().setTypeWorkOrder(null);
        await workOrderList().setStationList([]);
        if(isRamp) {
          await qRampStore().setIsPassenger(false);
        }
        if(isPassenger) {
          await qRampStore().setIsPassenger(true);
        }
        if(isLabor) {
          await qRampStore().setIsPassenger(true);
          await qRampStore().setTypeWorkOrder(LABOR)
        }
        await workOrderList().getAllList();
        await workOrderList().getCustomerWithContract();
        await serviceListStore().init();
      })
    }
    onMounted(() => {
      kanbanStore.isBlank = props.isBlank;
      qRampStore().setIsblank(props.isBlank)
    })
    return {};
  },
});
</script>

<style scoped></style>
