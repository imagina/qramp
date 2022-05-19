<template>
  <div>
    <div v-if="responsive" class="q-px-md q-py-md">
      <div class="q-pl-md flex items-center text-primary">
        <q-icon size="32px" :name="toolbar.icon" />
        <div class="title q-pl-sm text-h4">{{toolbar.title}}</div>
      </div>
      <q-separator class="q-my-sm"/>
      <span class="q-pl-md caption text-primary">1 of 7</span>
    </div>
    <!-- toolbar -->
    <i-toolbar @edit="readonly = $event" :toolbar="toolbar"></i-toolbar>
    <div class="row q-pa-md">
      <dynamic-field :class="`col-12 col-md-6 ${readonly ? 'q-px-md':'q-px-sm'}`" v-for="(field, keyField) in formFields" :key="keyField" :field="field"
        v-model="form[field.name || keyField]"/>
    </div>
  </div>
</template>

<script>
import iToolbar from '@imagina/qramp/_components/toolbar.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  props:{
    toolbar:{}
  },
  components:{iToolbar},
  mixins:[responsive],
  data(){
    return{
      form:{},
      readonly: true,
    }
  },
  computed:{
    formFields(){
      return{
        remark : {
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
  }
}
</script>

<style>

</style>