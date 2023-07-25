<template>
  <div>
    <master-modal
      v-model="showModal"
      :persistent="true"
      custom-position
    >
      <div class="tw-px-4">
        <formFields />
      </div>
    </master-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useSchedulerModal from "./uses/useSchedulerModal";
import formFields from './components/formFields.vue';

export default defineComponent({
  components:{
    formFields
  },
  setup() {
    return { ...useSchedulerModal() };
  },
});
</script>

<style scoped></style>
