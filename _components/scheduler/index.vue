<template>
  <div>
    <master-modal
      v-model="showModal"
      :persistent="true"
      custom-position
    >
      <div class="tw-px-4">
        <crud 
          :crudData="import('../../_crud/scheduler.vue')" 
        />
      </div>
    </master-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSchedulerModal from "./uses/useSchedulerModal";

export default defineComponent({
  setup() {
    return { ...useSchedulerModal() };
  },
});
</script>

<style scoped></style>
