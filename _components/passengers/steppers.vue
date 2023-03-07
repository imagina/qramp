<template>
  <div 
    id="stepComponent" 
    class="
     tw-bg-white 
     dynamicComponent 
     stepper-modal-passenger"
  >
    <q-stepper
      v-model="step"
      :contracted="$q.screen.lt.sm"
      ref="stepper"
      color="primary"
      alternative-labels
      active-color="primary"
      animated
      class="tw-bg-white"
      header-nav
      keep-alive
    >
      <q-step
        v-for="section in sections"
        :key="section.id"
        :name="section.id"
        :icon="section.icon"
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

<style>
.stepper-modal-passenger .q-stepper .q-stepper-title {
  @apply tw-relative tw-mb-6 tw-overflow-x-hidden;
}
.stepper-modal-passenger .q-stepper .q-stepper-title > h3 {
  @apply tw-text-lg tw-font-bold tw-bg-white tw-pr-4 tw-inline-block tw-z-20 tw-relative;
}
.stepper-modal-passenger .q-stepper .q-stepper-title > div {
  @apply tw-block tw-w-full tw-h-px tw-bg-gray-200 tw-top-2/4 tw-absolute tw-z-10;
}
.stepper-modal-passenger .q-stepper {
  @apply tw-border-0 tw-shadow-none;
}
.stepper-modal-passenger  .q-stepper__header {
  @apply tw-border-b-0;
}
.stepper-modal-passenger .q-stepper__tab .q-stepper__dot {
  @apply md:tw-w-10 md:tw-h-10 tw-font-bold md:tw-text-base tw-border-0;
}
.stepper-modal-passenger .q-stepper__tab .q-stepper__dot .q-icon {
  @apply tw-text-xs sm:tw-text-sm md:tw-text-xl;
}
.stepper-modal-passenger .q-stepper__header--contracted .q-stepper__tab:first-child .q-stepper__dot {
  @apply tw-transform tw-translate-x-3.5;
}
.stepper-modal-passenger .q-stepper__header--contracted .q-stepper__tab:last-child .q-stepper__dot {
  @apply tw-transform tw--translate-x-3.5;
}
.stepper-modal-passenger .q-stepper__tab:not(.q-stepper__tab--active) .q-stepper__dot {
  @apply tw-border-2;
  background-color: #F1F4FA;
  border-color: #F1F4FA;
}
.stepper-modal-passenger .q-stepper__tab:not(.q-stepper__tab--active) .q-stepper__dot span {
  color: #8A98C3; font-size: 20px;
}
.stepper-modal-passenger .q-stepper__tab--active .q-stepper__dot {
  @apply tw-border-current tw-border-2;
}
.stepper-modal-passenger .text-red.q-stepper__tab--active .q-stepper__dot {
  @apply tw-border-current tw-border-2;
}
.stepper-modal-passenger .q-stepper__tab--active .q-stepper__dot span {
  @apply tw-text-white;
}
.stepper-modal-passenger .q-stepper .q-stepper__dot:before {
  @apply lg:tw-mr-8;
}
.stepper-modal-passenger .q-stepper .q-stepper__dot:after {
  @apply lg:tw-ml-8;
}
.stepper-modal-passenger .q-stepper .q-stepper__line:after, 
.stepper-modal-passenger .q-stepper .q-stepper__line:before {
  @apply tw-h-0.5;
}
.stepper-modal-passenger .q-stepper__title {
  @apply tw-text-base tw-font-normal tw-text-black;
}
.stepper-modal-passenger .q-stepper__step-inner {
  @apply tw-py-4 lg:tw-py-5 tw-px-0 lg:tw-px-0;
}
.stepper-modal-passenger .q-stepper__step-inner .q-form {
  @apply tw-px-4 lg:tw-px-5;
}
</style>
