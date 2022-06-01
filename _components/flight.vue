<template>
  <div id="formFlyStep">
    <div id="rowContainer" class="row">
      <div v-for="(field, keyField) in formFields.flyFormLeft" class="col-12 col-md-6 q-px-md" :style="`${readonly ? 'height: 50px' : ''}`">
        <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
          <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            :class="`${readonly ? 'col-7': ''}`"
            :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding-bottom:0px'}`"
            v-model="form[field.name || keyField]" 
          />
        </label>
        <hr v-if="readonly" class="label-container"/>
      </div>
      <div v-if="isInbound" class="col-12 col-md-6 q-px-md q-mt-lg q-pb-sm">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs q-mb-xs text-center text-weight-bold">
            <div>Inbound</div>
          </div>
          <div
              v-for="(field, keyField) in formFields.inboundLeft"
              :class="`${readonly ? 'col-12 col-md-6': 'q-px-md' }`"
              :style="`${readonly ? 'height: 50px' : ''}`"
          >
            <label :class="`${readonly ?`${responsive ? 'no-wrap' : 'justify-end'} row items-center` : ''}`">
              <span v-if="readonly" class="col-5 text-right q-pr-sm text-primary">{{field.label}}:</span>
              <dynamic-field
                :key="keyField"
                :class="`${readonly ? 'col-7': ''}`"
                :id="keyField"
                :field="field"
                :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding:10px 0px 0px 0px'}`"
                v-model="form[field.name || keyField]"
                @input="search(field)"
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
          </div>
        </div>
      </div>
      <div v-if="isOutbound" class="col-12 col-md-6 q-px-md q-mt-lg q-pb-sm">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs q-mb-xs text-center text-weight-bold">
            <div>Outbound</div>
          </div>
          <div
              v-for="(field, keyField) in formFields.outboundRight"
              :class="`${readonly ? 'col-12 col-md-6': 'q-px-md' }`"
              :style="`${readonly ? 'height: 50px' : ''}`"
          >
            <label :class="`${readonly ?`${responsive ? 'no-wrap' : 'justify-end'} row items-center` : ''}`">
              <span v-if="readonly" class="col-5 text-right q-pr-sm text-primary">{{field.label}}:</span>
              <dynamic-field
                :key="keyField"
                :class="`${readonly ? 'col-7': ''}`"
                :id="keyField"
                :field="field"
                :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding:10px 0px 0px 0px'}`"
                v-model="form[field.name || keyField]" 
                @input="search(field)"
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
          </div>
        </div>
      </div>
      <div v-for="(field, keyField) in formFields.flyFormRight" class="col-12 col-md-6 q-px-md" :style="`${readonly ? 'height: 50px' : ''}`">
        <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
          <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            :class="`${readonly ? 'col-7': ''}`"
            :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding-bottom:0px'}`"
            v-model="form[field.name || keyField]" 
          />
        </label>
        <hr v-if="readonly" class="label-container"/>
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
      newOutbound:false,
      newInbound:false,
      thereInFlight:true,
      thereOutFlight:true,
    }
  },
  computed: {
    showLabel(){
      if(this.readonly && !this.responsive ){
        return true
      }
      if(this.readonly && this.responsive ){
        return false   
      }
      return false
    },
    isOutbound() {
      if(this.form.operation){
        return this.form.operation == 4 || this.form.operation != 3
      }
      return false
    },
    isInbound() {
      if(this.form.operation){
        return this.form.operation == 3 || this.form.operation != 4
      }
      return false
    },
    readStatus(){
      return  this.$auth.hasAccess('ramp.work-orders.edit-status') || this.readonly
    },
    formFields(){
      return{
        flyFormLeft:{
          customer: {
            name:'customer',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.customer'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.setupCustomers',
              select: {label: 'customerName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.customer'),
          },
          carrier: {
            name:'carrier',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.carrier'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qfly.airlines',
              select: {label: 'airlineName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.carrier'),
          },
          station: {
            name:'station',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.station'),
              clearable: true,
              color:"primary"
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.setupStations',
              select: {label: 'stationName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.station'),
          },
          date: {
            name:'date',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.date'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.date'),
          },
          operation: {
            name:'operation',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.operation'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.operationTypes',
              select: {label: 'operationName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.operation'),
          },
          gate: {
            name:'gate',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.gate'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.gate'),
          },
          acType: {
            name:'acType',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.acType'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.acType'),
          },
          status: {
            name:'status',
            value: 1,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readStatus,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.status'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.workOrderStatuses',
              select: {label: 'statusName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.status'),
          },
        },
        flyFormRight:{

          /*


           */
        },
        inboundLeft:{
          flight: {
            name:'flight',
            value: null,
            type: this.readonly ? 'inputStandard':'search',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.flight'),
              clearable: true,
              maxlength: 7,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.flight'),
          },
          origin: {
            name:'origin',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: !this.newInbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.origin'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.origin'),
          },
          tail: {
            name:'tail',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: !this.newInbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.tail'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.tail'),
          },
          schuduledArrival: {
            name:'schuduledArrival',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: !this.newInbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.schuduledArrival'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.schuduledArrival'),
          },
          blockIn: {
            name:'blockIn',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: !this.newInbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.blockIn'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.blockIn'),
          },
        },
        outboundRight:{
          flight: {
            name:'flightOutbound',
            value: null,
            type: this.readonly ? 'inputStandard':'search',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.flight'),
              clearable: true,
              maxlength: 7,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.flight'),
          },
          destination: {
            name:'destination',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: !this.newOutbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.destination'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.destination'),
          },
          tail: {
            name:'tailOutbound',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: !this.newOutbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.tail'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.tail'),
          },
          schuduledDeparture: {
            name:'schuduledDeparture',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: !this.newOutbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.schuduledDeparture'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.schuduledDeparture'),
          },
          blockOut: {
            name:'blockOut',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: !this.newOutbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.blockOut'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.blockOut'),
          },
        },
      }
    }
  },
  methods: {
    search({type, name}, criteria = null){
      if(type != 'search') return;
      criteria = name == 'flight' ?  this.form.flight : this.form.flightOutbound
      if(!criteria) return ;
      const params = {
      refresh: true,
      params: {
        filter: {search: criteria.toUpperCase()}
      }
    }
      //Request
      this.$crud.index('apiRoutes.qfly.flightaware', params).then(response => {
        if (response.status == 200) {
          this.$alert.info({
            mode:'modal',
            title: this.$tr('ifly.cms.form.flight'),
            message: 'Does the inbound data belong to the outbound?'
          })
        } else if (response.status == 204) {
          this.$alert.warning({
            mode:'modal',
            title: this.$tr('ifly.cms.form.flight'),
            message: 'Are you sure this is a correct flight number?'
          })
        }
      }).catch(error => {
        console.log('error', error)
      })
    }
  },
}
</script>

<style lang="stylus" scoped>
  #formFlyStep
    hr.label-container
      position relative
      bottom 20px
      border-top 1px dashed #000D4726
    .span 
      padding-bottom 10px
    .spanBottom
      padding-bottom 15px
    .card-bound
      border: 1px solid #f1f4fa;
      border-radius: 8px 8px 0px 0px; 
</style>