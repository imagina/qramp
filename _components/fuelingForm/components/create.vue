<template>
    <div>
        <q-form
          ref="formFueling"
          id="simpleWordOrder"
          class="
            tw-p-2
            tw-mb-2
            tw-rounded-lg
          "
        >
         <customer
            :dataForm="form"
            :addNewOptions="false"
            ref="refCustomer"
          />
          <div v-for="(field, keyField) in fields.form" :key="keyField" class="col-12 col-md-6">
            <dynamic-field v-model="form[keyField]" :field="field" />
          </div>
        </q-form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import createController from '../controllers/create'
import customer from '../../customer/index.vue'

export default defineComponent({
    components: {
      customer
    },
    emits: ['refresh-data'],
    setup(props,{emit}) {
        return {
            ...createController(props, emit)
        }
    }
})
</script>

<style scoped></style>
