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
    <div class="flex justify-between q-px-md">
      <q-toggle
        v-model="delay"
        color="primary"
        label="Delay"
      />
      <q-btn v-if="delay" class="btn-stick" round icon="add" color="primary" @click="addDelay()"/>
    </div>
    <div v-if="delay" class="q-pa-md">
      <div flat class="row">
        <template v-for="(field,keyField) in delayFields">
            <dynamic-field
              class="col-12 col-md-5 q-pr-sm"
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
            <q-btn v-if="field.type == 'hour'" class="col-12 col-md-1 q-pb-md" flat round icon="delete" size="12px" color="primary" @click="delDelay(keyField)"/>
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
          delayItem: {
            name:'code0',
          },
          delayDate: {
            name:'date0',
          },
        },
        {
          delayItem: {
            name:'code1',
          },
          delayDate: {
            name:'date1',
          },
        },
        {
          delayItem: {
            name:'code2',
          },
          delayDate: {
            name:'date2',
          },
        }
      ]
    }
  },
  computed:{
    delayFields(){
      const obj = {}
      this.delayList.forEach((delay,index) => {
        for (let item in delay.delayItem) {
          obj['delayItem'+index] = {
            name: delay.delayItem['name'],
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
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
        }
        for (let item in delay.delayDate) {
          obj['delayDate'+index] = {
            name: delay.delayDate['name'],
            value: null,
            type: this.readonly ? 'inputStandard':'hour',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('iste.cms.label.time'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.readonly ? '' : this.$tr('iste.cms.label.time'),
          }    
        }
      })
      return obj
    },
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
  },
  methods: {
    addDelay() {
      this.delayList.push({
          delayItem: {
            name:`code${this.delayList.length - 1}`,
          },
          delayDate: {
            name:`date${this.delayList.length - 1}`,
          },
      })
    },
    delDelay(index) {
      debugger
      this.delayList = this.delayList.filter(item => item.delayDate.name !== index)
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
    .btn-stick
      position sticky
</style>