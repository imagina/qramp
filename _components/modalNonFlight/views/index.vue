<template>
  <master-modal 
      v-model="showModal" 
      title="Create non-flight" 
      :persistent="true"
      :loading="loading"
      :width="widthModal"
      :actions="actions"
      @hide="clear"
    >
      <div class="tw-mb-4">
        <tag />
        <customer
          v-if="isActiveNonFlightServices"
          :dataForm="form"
          :addNewOptions="false" 
          ref="refCustomer"
        />
        <table-flight
          @cancel="isOpenTableModal = $event"
          :dialog="isOpenTableModal"
          @flightSelect="flightSelect($event)"
          @showWorkOrder="showModalFull"
          :dataTable="listFlightsFound"
        />
        <q-form
          v-for="(field, keyField) in fields" 
          :key="keyField"
          @submit.prevent
        >
          <dynamic-field
            :field="field"
            v-model="form[keyField]"
            @enter="search()"
            @update:modelValue="zanetizeData(keyField)"
          />
        </q-form>
      </div>
  </master-modal>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import controller from '../controllers/modalNonFlight.controllers'
import tag from '../components/tabs.vue'
import customer from 'src/modules/qramp/_components/customer/index.vue'
import tableFlight from 'src/modules/qramp/_components/modal/tableFlight.vue';

export default defineComponent({
  props: {
    refFormOrders: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['getWorkOrderFilter'],
  components: {
    tag,
    customer,
    tableFlight,
  },
  setup(props, { emit }) {
    return controller(props, emit)
  }
})
</script>
<style lang="scss">
</style>
