<template>
  <div :class="{
    'lg:tw-flex-wrap lg:tw-space-x-0 xl:tw-flex xl:tw-space-x-2' : inlineMode,
    'tw-mb-1': !inlineMode
  }">

    <div v-for="(field, keyField) in fields.form" :key="keyField">
      <div v-if="keyField === 'customer'">
        <customer :dataForm="form" :isRules="false" />
      </div>
      <dynamic-field
        v-if="keyField !== 'customer' && keyField !== 'sta' && keyField !== 'outboundScheduledDeparture'"
        :field="field"
        v-model="form[keyField]"
        @update:modelValue="zanetizeData(keyField)"
        :class="{
         'tw-hidden': keyField === 'stationId',
         'xl:tw-w-fit' : inlineMode }"
      />
      <div v-if="isbound.inbound && keyField === 'sta'">
        <dynamic-field
          :field="field"
          v-model="form[keyField]"
          @update:modelValue="zanetizeData(keyField)"
          :class="{ 'tw-hidden': keyField === 'stationId' }"
        />
      </div>
      <div v-if="isbound.outbound && keyField === 'outboundScheduledDeparture'">
        <dynamic-field
            :field="field"
            v-model="form[keyField]"
            @update:modelValue="zanetizeData(keyField)"
            :class="{ 'tw-hidden': keyField === 'stationId' }"
          />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModalSchedule from '../uses/useModalSchedule'
import customer from "../../customer/index.vue";

export default defineComponent({
  components: {customer},
  props:{
    inlineMode: {
      type: Boolean,
      default: false,
    }
  },
  setup (props, {emit}) {
    return {...useModalSchedule(props, emit)}
  }
})
</script>

<style scoped>

</style>
