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
                <p 
                  class="text-primary text-right q-mb-none span q-mr-sm col-5"
                  v-if="field.props.vIf"
                >
                  <span>{{field.label}}</span>
                  <span v-if="readonly">:</span>
                </p>
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
                <p 
                  class="text-primary text-right q-mb-none span q-mr-sm col-5"
                  v-if="field.props.vIf"
                >
                  {{field.label}}
                  <span v-if="readonly">:</span>
                </p>
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
        @input="resetDelayList"
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
            v-if="field.type !== 'select'" 
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
import qRampStore from '@imagina/qramp/_store/qRampStore.js'

export default {
  props:{
    readonly: true,
    toolbar:{},
    cargoData:{}
  },
  inject: ['disabledReadonly'],
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
      codeList: [],
    }
  },
  mounted() {
     this.$nextTick(function () {
      this.init()
    })
  },
  computed:{
    showKilosFiels() {
      const contractsWithKilosFiels = this.$store.getters['qsiteApp/getSettingValueByName']('setup::contractsWithKilosFiels');
      return contractsWithKilosFiels.some((item) => item === qRampStore().getContractId());
    },
    delayFields(){
      const obj = {}
      this.delayList.forEach((delay,index) => {
          obj['code'+index] = {
            value: delay.code,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              options: this.codeList,
              readonly: this.readonly || this.disabledReadonly,
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
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
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
              vIf: true,
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsUnloaded')}`,
          },
          inboundCargoBulkUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              vIf: true,
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkUnloaded')}`,
          },
          cargoTotalKilosUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              vIf: this.showKilosFiels,
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.cargoTotalKilosUnloaded')}`,
          },
        },
        outbound:{
          outboundCargoTotalUldsLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              vIf: true,
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsLoaded')}`,
          },
          outboundCargoBulkLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              vIf: true,
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkLoaded')}`,
          },
          cargoTotalKilosLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              vIf: this.showKilosFiels,
              mask:'###################',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.cargoTotalKilosLoaded')}`,
          },
        }
      }
    },
  },
  methods: {
    init() {
      if(Object.keys(this.cargoData).length > 0) {
        this.form.inboundCargoTotalUldsUnloaded = this.cargoData.inboundCargoTotalUldsUnloaded
        this.form.inboundCargoBulkUnloaded = this.cargoData.inboundCargoBulkUnloaded
        this.form.outboundCargoTotalUldsLoaded = this.cargoData.outboundCargoTotalUldsLoaded
        this.form.outboundCargoBulkLoaded = this.cargoData.outboundCargoBulkLoaded
        this.form.cargoTotalKilosUnloaded = this.cargoData.cargoTotalKilosUnloaded
        this.form.cargoTotalKilosLoaded = this.cargoData.cargoTotalKilosLoaded
        this.delay = this.cargoData.delayList.length > 0
        if(this.cargoData.delayList.length > 0) {
          this.delayList = this.cargoData.delayList
        }
      }
      this.getCodeList();
    },
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
    },
    resetDelayList() {
      if(!this.delay) {
        this.delayList = [];
        this.addDelay();
      }
    },
    getCodeList() {
      this.$crud.index('apiRoutes.qramp.workOrderDelays', { refresh: true }).then(res => {
        const data = res.data || [];
        this.codeList = data.map((item) => ({
          id: item.id,
          label: item.name,
          value: item.name,
        }))
      })
      .catch(err => {
        this.codeList = [];
        console.log('ERROR WHILE OBTAINING THE LIST OF CODES:', err)
      })
    },
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