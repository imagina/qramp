<template>
  <div>
    <div 
      v-for="(field, keyField) in formFields" 
      :key="keyField"
    >
      <dynamic-field v-model="form[keyField]" :field="field" />
    </div>
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
