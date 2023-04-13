<template>
  <div id="cargoContainer" class="tw-mb-20">
    <!-- toolbar -->
    <div class="tw-grid tw-gap-10 tw-grid-cols-1 lg:tw-grid-cols-2 tw-p-4 md:tw-p-10">
      <div class=" ">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary tw-rounded-t-md tw-text-base boundColor tw-p-2 text-center text-weight-bold">
            <div>Inbound</div>
          </div>
          <div class="q-pa-md">
            <template v-for="(field, keyField) in formFields.inbound" >
              <label id="labelInput" :key="keyField" class="row items-center justify-end no-wrap">
                <p 
                  class="text-primary text-right md:tw-text-base span q-mr-sm col-5"
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
      <div class=" ">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary tw-rounded-t-md tw-text-base boundColor tw-p-2 text-center text-weight-bold">
            <div>Outbound</div>
          </div>
          <div class="q-pa-md">
            <template v-for="(field, keyField) in formFields.outbound" >
              <label id="labelInput" :key="keyField" class="row items-center justify-end no-wrap">
                <p 
                  class="text-primary text-right md:tw-text-base span q-mr-sm col-5"
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
    <div class="tw-px-6 tw-mb-8">
      <q-toggle
        v-model="delay"
        color="primary"
        label="Delay"
        @input="resetDelayList"
      />
      <q-btn v-if="delay" class="q-ml-sm" flat round icon="add" color="primary" @click="addDelay()"/>
    </div>
    <div v-if="delay" class="tw-px-6">
      
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
import responsive from '../../_mixins/responsive.js'
import qRampStore from '../../_store/qRampStore.js'
import cargoStore from './store/cargo.ts';
import {
  BUSINESS_UNIT_PASSENGER, 
  BUSINESS_UNIT_RAMP,
  COMPANY_PASSENGER,
  COMPANY_RAMP
} from '../model/constants.js'

export default {
  props:{
    readonly: true,
  },
  mixins:[responsive],
  data(){
    return{
      codeList: [],
    }
  },
  mounted() {
     this.$nextTick(function () {
      this.init()
    })
  },
  computed:{
    isPassenger() {
      return qRampStore().getIsPassenger();
    },
    filterBusinessUnit() {
      return this.isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;
    },
    filterCompany() {
      return this.isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
    },
    disabledReadonly() {
      return qRampStore().disabledReadonly();
    },
    delayList: {
      get() {
        return cargoStore().getDelayList();
      },
      set(value) {
        cargoStore().setDelayList(value);
      }
    },
    delay: {
      get() {
        return cargoStore().getDelay();
      },
      set(value) {
        cargoStore().setDelay(value);
      }
    },
    form() {
      return cargoStore().getForm();
    },
    showKilosFiels() {
      const contractsWithKilosFiels = this.$store.getters['qsiteApp/getSettingValueByName']('setup::contractsWithKilosFiels');
      return contractsWithKilosFiels.some((item) => item === qRampStore().getContractId());
    },
    delayFields() {
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
              hint:'Enter the Time in minutes',
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
      this.getCodeList();
    },
    addDelay() {
      this.delayList.push({
        code: '',
        hours: ''
      })
    },
    delDelay(index) {
      const i = parseInt(index.slice(-1))
      this.delayList.splice(i,1)
    },
    resetDelayList() {
      if(!this.delay) {
        this.delayList = [];
      }
    },
    getCodeList() {
      const params = {
        refresh: true,
        params: {
          filter: {
            companyId: this.filterCompany
          },
        }
      };
      this.$crud.index('apiRoutes.qramp.workOrderDelays', params).then(res => {
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

<style scoped>
.span {
  padding-bottom: 22px;
}
        
</style>