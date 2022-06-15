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
    <div class="flex q-px-md">
      <q-toggle
        v-model="delay"
        color="primary"
        label="Delay"
      />
      <q-btn v-if="delay" class="q-ml-sm" flat round icon="add" color="primary" @click="addDelay()"/>
    </div>
    <div v-if="delay" class="q-pa-md">
      <div flat class="row">
        <template v-for="(field,keyField) in delayFields">
          <dynamic-field
            class="col-12 col-md-5 q-pr-sm"
            :key="keyField"
            :field="field"
            v-model="delayList[keyField.includes('code') ? keyField.split('code')[1] : keyField.split('hours')[1]][keyField.includes('code') ? 'code' : 'hours']"
          />
          <q-btn 
            v-if="field.type == 'input'" 
            style="width: 40px; height:38px"
            class="col-12 btn-stick col-md-1" 
            round icon="delete" flat
            size="12px"
            color="primary" 
            @click="delDelay(keyField)"
          />
        </template>
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
      delay:false,
      delayList:[
        {
          code:"",
          hours:""
        },
      ],
    }
  },
  computed:{
    delayFields(){
      const obj = {}
      this.delayList.forEach((delay,index) => {
          obj['code'+index] = {
            value: delay.code,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              options: [
                {label: this.$tr('isite.cms.label.inverse'), value: '0'},
                {label: this.$tr('isite.cms.label.open'), value: '1'}
              ],
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('icommerce.cms.sidebar.code'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('icommerce.cms.sidebar.code'),
          }    
          obj['hours'+index] = {
            value: delay.hours,
            type: this.readonly ? 'inputStandard':'hour',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('isite.cms.label.time'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.readonly ? '' : this.$tr('isite.cms.label.time'),
          }    
      })
      return obj
    },
    formFields() {
      return {
        inbound:{
          inboundCargoTotalUldsUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsUnloaded')}`,
          },
          inboundCargoBulkUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkUnloaded')}`,
          }
        },
        outbound:{
          outboundCargoTotalUldsLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsLoaded')}`,
          },
          outboundCargoBulkLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkLoaded')}`,
          }
        }
      }
    },
  },
  methods: {
    addDelay() {
      this.delayList.push({
        code: '',
        hours: ''
      })
    },
    saveInfo() {
      this.$store.commit('qrampApp/SET_FORM_DELAY', this.delayList.filter(items => {
          return items.code && items.hours
      }))
      this.$store.commit('qrampApp/SET_FORM_CARGO', this.form)
    },
    delDelay(index) {
      const i = parseInt(index.slice(-1))
      this.delayList.splice(i,1)
    }
  },
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
    .btn-stick > .q-btn--round .q-btn__wrapper
      padding: 0;
      min-width: 2em;
      min-height: 0em;
      
</style>