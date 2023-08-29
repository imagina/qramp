<template>
  <div>
    <kanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, watch } from "vue";
import kanbanBoard from "./components/kanbanBoard.vue";
import workOrderList from '../../_store/actions/workOrderList'
import qRampStore from "../../_store/qRampStore";

export default defineComponent({
  components: {
    kanbanBoard,
  },
  setup() {
    const proxy = (getCurrentInstance() as any).proxy as any;
    init();
    watch(() => proxy.$route, (currentValue, oldValue) => {
        init();
      },
      { deep: true }
    );
    function init() {
      new Promise(async (resolve, reject) => {
        const currentRouteName = proxy.$router.currentRoute.path.indexOf('passenger');
        console.log(proxy.$router.currentRoute.path);
        await workOrderList().setStationList([]);
        await qRampStore().setIsPassenger(currentRouteName !== -1);
        await workOrderList().getAllList();
        await workOrderList().getCustomerWithContract();
      })
    }
    return {};
  },
});
</script>

<style scoped></style>
