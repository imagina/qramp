<template>
  <div id="cargoContainer">
    <!-- toolbar -->
    <div :class="`row justify-center items-center q-px-md ${responsive ? '':'no-wrap'}`">
      <div class="col-12 col-md-6 q-mb-sm q-py-lg">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs text-center text-weight-bold">
            <div>Inbound</div>
          </div>
          <div class="q-pa-md">
            <template v-for="(field, keyField) in formFields.inbound" >
              <label id="labelInput" :key="keyField" class="row items-center justify-end no-wrap">
                <p class="text-primary text-right q-mb-none span q-mr-sm col-5">{{field.label}}<span v-if="readonly">:</span></p>
                <dynamic-field
                  class="col-7"
                  :field="field"
                  v-model="form[field.name || keyField]" 
                />
              </label>
              <hr v-if="readonly" class="label-container"/>
            </template>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 q-mb-sm q-ml-sm">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs text-center text-weight-bold">
            <div>Outbound</div>
          </div>
          <div class="q-pa-md">
            <template v-for="(field, keyField) in formFields.outbound" >
              <label id="labelInput" :key="keyField" class="row items-center justify-end no-wrap">
                <p class="text-primary text-right q-mb-none span q-mr-sm col-5">{{field.label}}<span v-if="readonly">:</span></p>
                <dynamic-field
                  class="col-7"
                  :field="field"
                  v-model="form[field.name || keyField]" 
                />
              </label>
              <hr v-if="readonly" class="label-container"/>
            </template>
          </div>
        </div>
      </div>
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
    formFields() {
      return {
        inbound:{
          totalUldsUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsUnloaded')}`,
          },
          bulkUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkUnloaded')}`,
          }
        },
        outbound:{
          totalUldsLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsLoaded')}`,
          },
          bulkLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkLoaded')}`,
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #cargoContainer
    .card-bound
      border: 1px solid #f1f4fa;
      border-radius: 8px 8px 0px 0px; 
    hr.label-container
      position relative
      bottom 20px
      border-top 1px dashed #000D4726
    #labelInput
      .span
        padding-bottom 22px
</style>