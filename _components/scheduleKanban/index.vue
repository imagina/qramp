<template>
  <div>
    <kanbanBoard/>
  </div>
</template>

<script lang="ts">
import {defineComponent, watch, onMounted} from "vue";
import kanbanBoard from "./components/kanbanBoard.vue";
import workOrderList from '../../_store/actions/workOrderList'
import qRampStore from "../../_store/qRampStore";
import kanbanStore from './store/kanban.store'
import {router} from 'src/plugins/utils'
let routeName = router.route.path;
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
        if(routeName !== currentValue) {
          init();
          routeName = currentValue;
          kanbanStore.columns.forEach(column => {
            column.cards = [];
          })
        }
      },
      {deep: true}
    );

    function init() {
      new Promise(async (resolve, reject) => {
        const currentRouteName = router.route.path.indexOf('passenger');
        await workOrderList().setStationList([]);
        await qRampStore().setIsPassenger(currentRouteName !== -1);
        await workOrderList().getAllList();
        await workOrderList().getCustomerWithContract();
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
