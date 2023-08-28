<template>
  <div 
    class="
     actions-bar 
     tw-flex 
     tw-flex-col 
     tw-items-center 
     tw-py-4 
     tw-text-blue-500 
     md:tw-text-lg 
     tw-space-y-2 
     md:tw-space-x-2 
     md:tw-flex-row"
  >
    <div 
      class="
       tw-text-base 
       md:tw-text-lg 
       tw-font-bold 
       md:tw-mt-1">
       Today
    </div>
    <div class="tw-flex tw-space-x-2">
      <button class="btn-action" @click="back">
        <i class="fa-regular fa-angle-left"></i>
      </button>
      <button class="btn-action" @click="next">
        <i class="fa-regular fa-angle-right"></i>
      </button>
    </div>
    <div
      class="
        tw-flex 
        tw-items-center 
        tw-text-sm md:tw-text-base 
        tw-font-semibold 
        tw-space-x-1 
        tw-cursor-pointer
      "
      @click="openDrawerFilter"
    >
      <div>{{ titleFilter }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useActionsBar from '../uses/useActionsBar'

export default defineComponent({
  setup(props) {
    return {...useActionsBar(props)};
  },
});
</script>

<style>
.actions-bar .btn-action {
  @apply tw-text-blue-500 tw-rounded-md tw-shadow-sm tw-border tw-w-9 tw-h-9 tw-border-gray-200 tw-font-bold hover:tw-bg-gray-200 hover:tw-text-white;
}
</style>
