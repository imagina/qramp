<template>
  <master-modal
    title="Flight Map"
    v-model="visibleMapModal"
    :persistent="true"
    :loding="loading"
    @hide="close"
  >
    <img 
        :src="imgMap" 
        alt="" 
        srcset="" 
        class="tw-w-24 tw-h-24"
    />
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
  },
  methods: {
    close() {
      this.visibleMapModal = false;
      qRampStore().setFlightMap(null);
    },
  },
};
</script>