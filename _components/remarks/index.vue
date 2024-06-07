<template>
  <div>
    <div class="tw-p-5 row tw-mb-10" >
      <dynamic-field class="col-12 col-md-6 tw-p-1" v-for="(field, keyField) in formFields" :key="keyField" :field="field"
        v-model="form[field.name || keyField]"/>
    </div>
  </div>
</template>

<script>
import responsive from '../../_mixins/responsive.js';
import remarkStore from './store.ts';
import qRampStore from '../../_store/qRampStore.js'

export default {
  props:{
    readonly: true,
    toolbar:{},
  },
  mixins:[responsive],
  computed:{
    form() {
      return remarkStore().getForm();
    },
    disabledReadonly() {
      return qRampStore().disabledReadonly()
    },
    formFields(){
      return{
        remark: {
          value: '',
          type: this.readonly ? 'inputStandard':'input',
          props: {
            readonly: this.readonly || this.disabledReadonly,
            outlined: !this.readonly,
            label: this.$tr('ifly.cms.form.remark'),
            type: 'textarea',
            rows: "12",
            debounce: 1500
          },
        },
        safetyMessage : {
          value: '',
          type: this.readonly ? 'inputStandard':'input',
          props: {
            readonly: this.readonly || this.disabledReadonly,
            outlined: !this.readonly,
            label: this.$tr('ifly.cms.form.safetyMessage'),
            type: 'textarea',
            rows: "12",
            debounce: 1500
          },
        },
      }
    }
  },
}
</script>

<style>

</style>