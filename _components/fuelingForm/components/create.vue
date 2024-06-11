<template>
    <div>
        <q-form
          ref="formFueling"
          id="simpleWordOrder"
          class="
            tw-px-3
            tw-pt-8
            tw-pb-10
            tw-my-4
            tw-mx-8
            tw-mb-32
            tw-border
            tw-border-gray-200
            tw-rounded-lg
      ">
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
import Vue, { defineComponent } from 'vue'
import createController from '../controllers/create'
import customer from '../../customer/index.vue'

export default defineComponent({
    components: {
      customer
    },
    setup(props,{emit}) {
        return {
            ...createController(props, emit)
        }
    }
})
</script>

<style scoped></style>
