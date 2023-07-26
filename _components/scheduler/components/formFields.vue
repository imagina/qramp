<template>
  <div>
    <q-form
        ref="refFormScheduler"
    >
      <div 
        v-for="(field, keyField) in formFields.mainForm" 
        :key="keyField"
      >
        <dynamic-field 
          v-model="form[keyField]" 
          :field="field" 
        />
      </div>
      <div v-if="isbound[0]">
        <div 
          v-for="(field, keyField) in formFields.inbound"
        >
            <dynamic-field
              :field="field"
              v-model="form[keyField]"
            />
          </div>
      </div>
      <div v-if="isbound[1]">
        <div 
          v-for="(field, keyField) in formFields.outbound"
        >
            <dynamic-field
              :field="field"
              v-model="form[keyField]"
            />
          </div>
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useForm from "../uses/useForm";
export default defineComponent({
  setup() {
    return { ...useForm() };
  },
});
</script>

<style scoped></style>
