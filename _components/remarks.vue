<template>
  <div>
    <div class="row q-px-md">
      <dynamic-field :class="`col-12 col-md-6 ${readonly ? 'q-px-md':'q-px-sm'}`" v-for="(field, keyField) in formFields" :key="keyField" :field="field"
        v-model="form[field.name || keyField]"/>
    </div>
  </div>
</template>

<script>
import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  props:{
    readonly: true,
    toolbar:{}
  },
  mixins:[responsive],
  data(){
    return{
      form:{},
    }
  },
  computed:{
    formFields(){
      return{
        remarks : {
          value: '',
          type: this.readonly ? 'inputStandard':'input',
          props: {
            readonly: this.readonly,
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
            readonly: this.readonly,
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
  methods: {
    saveInfo() {
      this.$store.commit('qrampApp/SET_FORM_REMARK', this.form )
    },
  },
}
</script>

<style>

</style>