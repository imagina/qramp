<template>
    <master-modal
      v-model="showModal"
      title="Schedule Planning"
      :persistent="true"
      @hide="hideModal"
      :loading="loading"
      :actions="actions"
      :maximized="$q.screen.lt.md"
    >
      <div class="tw-shadow-md tw-rounded-lg tw-my-2">
      <div class="tw-flex tw-items-center tw-gap-1 tw-px-2">
        <span class="tw-text-lg tw-font-semibold tw-text-gray-800 tw-pl-4">
          Flight Number: {{ form.flightNumber }}
        </span>
              <span v-if="sta" class="tw-bg-blue-100 tw-text-blue-700 tw-text-sm tw-font-bold tw-px-2 tw-rounded">
          STA
        </span>
              <span v-if="std" class="tw-bg-blue-100 tw-text-blue-700 tw-text-sm tw-font-bold tw-px-2 tw-rounded">
          STD
        </span>
      </div>

      <q-form ref="refWorkOrderAlert" class="tw-mt-1 tw-p-4">
         <q-checkbox
              v-model="form.alwaysHalf"
              :label="operationName"
              class="tw-text-gray-700 tw-font-medium"
            />
          </q-form>
      </div>
    </master-modal>
  </template>
<script lang="ts">
import { defineComponent } from "vue";
import useModalSchedulePlannings from '../uses/useModalSchedulePlannings'

export default defineComponent({
  setup () {
    return {...useModalSchedulePlannings()}
  }
})
</script>
<style scoped>

</style>
