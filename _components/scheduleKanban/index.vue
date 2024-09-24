<template>
  <div>
    <kanbanBoard />
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, onMounted, onBeforeUnmount } from "vue";
import kanbanBoard from "./components/kanbanBoard.vue";
import workOrderList from '../../_store/actions/workOrderList'
import qRampStore from "../../_store/qRampStore";
import kanbanStore from './store/kanban.store'
import { router } from 'src/plugins/utils'
let routeName = router.route.path;
import serviceListStore from "../serviceList/store/serviceList";
import { 
  LABOR, 
  SECURITY, 
  BUSINESS_UNIT_SECURITY, 
  BUSINESS_UNIT_PASSENGER, 
  BUSINESS_UNIT_LABOR,
  BUSINESS_UNIT_RAMP
} from "../model/constants";

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
    watch(() => router.route.path, (currentValue, oldValue) => {
        if (routeName !== currentValue) {
          init(true);
          routeName = currentValue;
          kanbanStore.columns.forEach(column => {
            column.cards = [];
          })
        }
      },
      { deep: true }
    );

    function init(refresh = false) {
      new Promise(async (resolve, reject) => {
        let currentRoutePath = router.route.path;
        let isPassenger = currentRoutePath.indexOf('passenger') !== -1;
        let isLabor = currentRoutePath.indexOf('labor') !== -1;
        let isRamp = currentRoutePath.indexOf('ramp') !== -1;
        let isSecurity = currentRoutePath.indexOf('security') !== -1;
        await qRampStore().setTypeWorkOrder(null);
        await workOrderList().setStationList([]);
        if(isRamp) {
          await qRampStore().setIsPassenger(false);
          qRampStore().setBusinessUnitId(BUSINESS_UNIT_RAMP);
        }
        if(isSecurity) {
          await qRampStore().setIsPassenger(false);
          qRampStore().setBusinessUnitId(BUSINESS_UNIT_SECURITY);
        }
        if(isPassenger) {
          await qRampStore().setIsPassenger(true);
          qRampStore().setBusinessUnitId(BUSINESS_UNIT_PASSENGER);
        }
        if(isLabor) {
          await qRampStore().setIsPassenger(true);
          qRampStore().setBusinessUnitId(BUSINESS_UNIT_LABOR);
        }
        await workOrderList().getAllList(refresh);
        await workOrderList().getCustomerWithContract();
        await serviceListStore().init();
      })
    }

    onMounted(() => {
      kanbanStore.isBlank = props.isBlank;
      qRampStore().setIsblank(props.isBlank);
    })
    onBeforeUnmount(() => {
      kanbanStore.search = null;
    })
    return {};
  },
});
</script>

<style scoped></style>
