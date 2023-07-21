<template>
  <div>
    <master-modal
      v-model="showModal"
      :persistent="true"
      custom-position
    >
      <div class="tw-px-4">
        <mainComponent />
      </div>
    </master-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSchedulerModal from "./uses/useSchedulerModal";
import mainComponent from './components/main.vue'

export default defineComponent({
  components:{
    mainComponent
  },
  setup() {
    return { ...useSchedulerModal() };
  },
});
</script>

<style scoped></style>
