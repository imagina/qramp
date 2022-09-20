<template>
  <master-modal
    v-model="visibleMapModal"
    v-bind="modalProps"
    :persistent="true"
    :loading="loading"
    @hide="close"
  >
  <div class="tw-flex tw-justify-center">
    <img
        v-if="!loading" 
        class="img-map"
        :src="imgMap" 
        alt="" 
        srcset=""
    />
    <div v-if="loading" class="tw-w-64 tw-h-64" />
  </div>
  </master-modal>
</template>

<script>
import qRampStore from "../../_store/qRampStore.js";
export default {
  computed: {
    visibleMapModal: {
      get() {
        return qRampStore().getVisibleMapModal();
      },
      set(value) {
        qRampStore().setVisibleMapModal(value);
      },
    },
    imgMap() {
      return qRampStore().getFlightMap();
    },
    loading() {
      return qRampStore().getLoadingModalMap();
    },
    modalProps() {
      return {
        width: '90vw',
        title: "Flight Map"
      };
    }
  },
  methods: {
    close() {
      this.visibleMapModal = false;
      qRampStore().setFlightMap(null);
    },
  },
};
</script>

<style>
  .img-map {
    width: 70vw;
    height: 500px;
    border-radius: 10px;
  }
</style>