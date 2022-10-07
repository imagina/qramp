<template>
  <div>
    <flightMap />
    <flightDetail />
  </div>
</template>
<script>
import flightMap from "./flightMap.vue";
import flightDetail from "../modal/flightDetail.vue";
import qRampStore from "../../_store/qRampStore.js";
export default {
  components: {
    flightMap,
    flightDetail,
  },
  async mounted() {
    await qRampStore().getFlights();
  },
};
</script>