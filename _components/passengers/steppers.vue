<template>
  <div>
    <q-stepper
      v-model="step"
      :contracted="$q.screen.lt.sm"
      ref="stepper"
      color="primary"
      alternative-labels
      active-color="primary"
      animated
      class="tw-bg-white"
    >
      <q-step
        v-for="section in sections"
        :key="section.id"
        :name="section.id"
        :prefix="section.prefix"
        :title="section.title"
        :done="section.done"
        :error="section.error"
        :active-color="section.error ? 'red' : 'primary'"
      >
        <div>
          <q-form :ref="section.refs">
            <component :is="section.component" />
          </q-form>
        </div>
      </q-step>

      <template v-slot:navigation>
        <q-stepper-navigation class="text-right tw-border-t">
          <q-btn
            rounded
            no-caps
            outline
            icon="fas fa-arrow-left"
            label="Back"
            color="primary"
            v-if="step > 1"
            class="q-mr-sm tw-mt-6 text-sm btn-small rounded-sm"
          />
          <q-btn
            rounded
            no-caps
            color="primary"
            icon-right="fas fa-arrow-right"
            :label="step === sections.length ? 'Finish' : 'Next'"
            class="tw-mt-6 text-sm btn-small"
          />
        </q-stepper-navigation>
      </template>
    </q-stepper>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import usePassenger from './usePassenger';

export default defineComponent({
  setup() {
    return {...usePassenger()};
  },
});
</script>

<style scoped></style>
