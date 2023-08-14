<template>
  <div>
    <kanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import kanbanBoard from "./components/kanbanBoard.vue";
import workOrderList from '../../_store/actions/workOrderList'

export default defineComponent({
  components: {
    kanbanBoard,
  },
  setup() {
    init();
    function init() {
      new Promise(async (resolve, reject) => {
        //const currentRouteName = this.$router.currentRoute.path.indexOf('passenger');
        await workOrderList().setStationList([]);
        //await qRampStore().setIsPassenger(currentRouteName !== -1);
        await workOrderList().getAllList();
        await workOrderList().getCustomerWithContract();
      })
    }
    return {};
  },
});
</script>

<style scoped></style>
