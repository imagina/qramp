<template>
  <div>
    <master-modal
      v-model="showModal"
      :title="titleModal"
      :persistent="true"
      custom-position
      :actions="actions"
      :loading="loading"
    >
      <div class="tw-px-4">
        <div v-for="(field, keyField) in filters" :key="keyField">
            <dynamic-field v-model="form[keyField]" :field="field" />
          </div>
      </div>
    </master-modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useFilters from '../uses/useFilters'
export default defineComponent({
  components: {},
  setup() {
    return {...useFilters()};
  },
});
</script>

<style scoped></style>
