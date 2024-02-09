<template>
  <master-modal 
    v-model="store.showModal" 
    :title="store.title" 
    :persistent="true" 
    :loading="store.loading"
    @hide="store.close()"
  >
    <p 
      class="
        tw-pb-5
        tw-pt-2 
        tw-text-gray-500 
        tw-text-base 
        tw-text-center"
    >
      Choose the flight number to track it
    </p>
    <div class="tw-flex tw-justify-center tw-space-x-6">
        <div 
          v-for="item in store.flightNumbers" 
          :key="item.id"
        >
          <p class="tw-uppercase tw-text-center tw-text-gray-500 tw-text-xs">
            {{  item.type }}
          </p>
          <div  class="
            tw-border 
            tw-px-5
            tw-py-3 
            tw-rounded-md 
            tw-bg-blue-900 
            tw-text-white 
            tw-cursor-pointer
            tw-font-semibold
            tw-shadow-lg"
            @click="getFlightMap(item)"
          >
            {{ item.flightNumber }}
          </div>
          
        </div>
    </div>
  </master-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import selectFligthNumberControllers from './controllers/selectFligthNumber'
export default defineComponent({
  setup() {
    return { ...selectFligthNumberControllers()}
  }
})
</script>

<style scoped></style>