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
  created() {
    this.$nextTick(async function () {
      const currentRouteName = this.$router.currentRoute.path.indexOf('passenger');
      qRampStore().setIsPassenger(currentRouteName !== -1);
    });
  },
  async mounted() {
    await qRampStore().getFlights();
  },
  beforeDestroy() {
    qRampStore().setFlightList([]);
    qRampStore().setFlightId(null);
  }
};
</script>