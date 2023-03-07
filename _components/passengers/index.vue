<template>
  <master-modal
    id="passengersModalComponent"
    v-model="showModal"
    v-bind="modalProps"
    :persistent="true"
    :loading="loading"
    @hide="clear"
    :actions="actions"
    :maximized="$q.screen.lt.md"
  >
    <steppers />
  </master-modal>
</template>

<script lang="ts">
import Vue, { defineComponent, computed } from "vue";
import store from './stores/index';
import steppers from './steppers.vue';

export default defineComponent({
  components: {
    steppers,
  },
  setup() {
    const showModal = computed({
        get: () => {
            return store.showModal.get()
        },
        set(value: boolean) {
            store.showModal.set(value);
        }
    });
    const loading = computed(() => store.loading.get());
    const modalProps = computed(() => store.modalProps);
    const clear = () => store.clear();
    const actions = computed(() => {
      return [
      {
          props:{
            vIf: !modalProps.value.update,
            color: 'primary',
            label: Vue.prototype.$tr('isite.cms.label.save'),
          },
          action: async () => {
            // action
          }
        },
      ]
    });
    return {
        showModal,
        loading,
        modalProps,
        clear,
        actions,
    };
  },
});
</script>

<style>
#passengersModalComponent .boundColor {
  background-color: #F1F4FA;
}
#passengersModalComponent .master-dialog__actions {
  @apply tw-py-4 tw-px-7 tw-absolute tw-w-full tw-bottom-0;
  background-color: #F1F4FA;
}
#passengersModalComponent .master-dialog__body {
  @apply tw-p-0 tw-m-0;
}
</style>
