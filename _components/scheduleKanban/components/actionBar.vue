<template>
  <div class="tw-flex actions-bar tw-py-4 tw-text-blue-500 tw-space-x-2">
    <div class="tw-text-lg tw-font-bold">Today</div>
    <div class="tw-space-x-2 tw--mt-1">
      <button class="btn-action">
        <i class="fa-regular fa-angle-left"></i>
      </button>
      <button class="btn-action">
        <i class="fa-regular fa-angle-right"></i>
      </button>
    </div>
    <div class="tw-flex tw-py-1 tw-text-sm tw-font-semibold tw-space-x-1">
      <div>July 2 - July 8, 10:00am-1:00pm</div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  setup() {
    return {};
  },
});
</script>

<style>
.actions-bar .btn-action {
  @apply tw-text-blue-500 tw-rounded-md tw-shadow-sm tw-border tw-w-9 tw-h-9 tw-border-gray-200 tw-font-bold hover:tw-bg-gray-200 hover:tw-text-white;
}
</style>
