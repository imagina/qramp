<template>
  <q-form ref="refFlight">
    <div class="tw-mt-6 tw-mb-20 row q-col-gutter-lg">
        <div class="col-12 col-md-6">
            <customer v-if="validateComponentCustomerOffline" :dataForm="form" :readonly="disabledReadonly"/>
            <div v-for="(field, keyField) in formFields.flyFormLeft" :key="keyField">
                <dynamic-field
                    :key="keyField"
                    :id="keyField"
                    :field="field"
                    @update:modelValue="handleChange(keyField, $event)"
                    v-model="form[keyField]"
                />
            </div>
        </div>
        <div class="col-12 col-md-6">
            <div v-for="(field, keyField) in formFields.flyFormRight" :key="keyField">
                <dynamic-field
                    :key="keyField"
                    :id="keyField"
                    :field="field"
                    @update:modelValue="handleChange(keyField, $event)"
                    v-model="form[keyField]"
                />
            </div>
        </div>
      <collapseFly :title="$tr('isite.cms.label.inbound')" :flightNumber="form.inboundFlightNumber"
                :isComplete="true" class="col-12 col-md-6">
          <div v-for="(field, keyField) in formFields.inboundLeft" class="tw-px-4">
            <div>
              <span class="col-5 text-right q-pr-sm text-primary">{{ field.label }}:</span>
              <dynamic-field
                :key="keyField" :id="keyField" :field="field"
                v-model="form[keyField]" @enter="search(field)" :ref="`${keyField}`"
              />
            </div>
          </div>
      </collapseFly>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import customer from '../../customer/index.vue'
import flightController from '../controllers/flight'
import storeFueling from "../store";
import collapseFly from './collapse.vue'

export default defineComponent({

  computed: {
    storeFueling() {
      return storeFueling
    }
  },
    components:{
        customer,
      collapseFly
    },
    setup () {
        return {...flightController()}
    }
})
</script>

<style scoped>

</style>
