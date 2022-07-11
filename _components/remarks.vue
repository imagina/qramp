<template>
  <div>
    <div class="row q-px-xs">
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
    toolbar:{},
    remarksData:{}
  },
  inject: ['disabledReadonly'],
  mixins:[responsive],
  data(){
    return{
      form:{},
    }
  },
  mounted() {
     this.$nextTick(function () {
      this.init()
    })
  },
  computed:{
    formFields(){
      return{
        remark : {
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
  methods: {
    init(){
      if(Object.keys(this.remarksData).length > 0) {
        this.form = this.remarksData
      }
    },
    saveInfo() {
      this.$store.commit('qrampApp/SET_FORM_REMARK', this.form )
    },
  },
}
</script>

<style>

</style>