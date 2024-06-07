<template>
  <q-form ref="refFlight">
    <div class="tw-mt-6 tw-mb-20 row q-col-gutter-lg">
        <div class="col-12 col-md-6">
            <customer :dataForm="form" :readonly="disabledReadonly"/>
            <div v-for="(field, keyField) in formFields.flyFormLeft" :key="keyField">
                <dynamic-field
                    :key="keyField"
                    :id="keyField"
                    :field="field"
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
                    v-model="form[keyField]"
                />
            </div>
        </div>
    </div>
  </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import customer from '../../customer/index.vue'
import flightController from '../controllers/flight'

export default defineComponent({
    components:{
        customer,
    },
    setup () {
        return {...flightController()}
    }
})
</script>

<style scoped>

</style>