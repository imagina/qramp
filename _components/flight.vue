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
                @enter="search(field)"
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
                @enter="search(field)"
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
      newOutbound:true,
      newInbound:true,
      thereInFlight:true,
      thereOutFlight:true,
      timeoutID: '',
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
            value: '',
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
            value: '',
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
            value: '',
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
            value: '',
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
            value: '',
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
            value: '',
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
            value: '',
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
            value: '',
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
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.newInbound,
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
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.newInbound,
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
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.newInbound,
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
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.newInbound,
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
            value: '',
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
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.newOutbound,
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
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.newOutbound,
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
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.newOutbound,
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
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.newOutbound,
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
      if (this.timeoutID) {
        clearTimeout(this.timeoutID)
      }
      const _this = this
      this.timeoutID = setTimeout(function () {
        criteria = name == 'flight' ?  _this.form.flight : _this.form.flightOutbound
        if(!criteria || criteria.length < 3) return ;
        
        const params = {
          refresh: true,
          params: {
            filter: {search: criteria.toUpperCase()}
          }
        }
        const inOutBound = ["3","4"].includes(_this.form.operation)
        //Request
        _this.$crud.index('apiRoutes.qfly.flightaware', params).then(response => {
          _this.setForm(response.data[0], name)
          if ((response.status == 200) && !inOutBound) {
            _this.$alert.info({
              mode:'modal',
              title: _this.$tr('ifly.cms.form.flight'),
              message: name.includes('Outbound') ? _this.$tr('ifly.cms.label.flightMessageOutBound') : _this.$tr('ifly.cms.label.flightMessageInBound'),
              actions: [
                {label: _this.$tr('isite.cms.label.cancel'), color: 'grey-8'},
                {
                  label: _this.$tr('isite.cms.label.yes'),
                  color: 'primary',
                  handler: () => {
                    _this.setForm(response.data[0], name == 'flight' ?  'flightOutbound' : 'flight')
                  }
                },
              ]
            })
          } else if (response.status == 204) {
            _this.$alert.warning({
              mode:'modal',
              title: _this.$tr('ifly.cms.form.flight'),
              message: _this.$tr('ifly.cms.label.flightMessage'),
              actions: [
                {label: _this.$tr('isite.cms.label.cancel'), color: 'grey-8'},
                {
                  label: _this.$tr('isite.cms.label.yes'),
                  color: 'primary',
                  handler: () => {
                    name.includes('Outbound') ? _this.newOutbound = false : _this.newInbound = false
                  }
                },
              ]
            })
          }
        }).catch(error => {
          console.log('error', error)
        })
      },3000) 
    },
    setForm(data, name) {
      if(name.includes('Outbound')){
        this.$set(this.form, "flightOutbound",  data.ident)
        this.$set(this.form, "destination",  data.destinationAirport.airportName)
        this.$set(this.form, "schuduledDeparture",  data.scheduledOut)
        this.$set(this.form, "tailOutbound",  data.registration)
      } else {
        this.$set(this.form, "flight", data.ident)
        this.$set(this.form, "origin", data.originAirport.airportName)
        this.$set(this.form, "schuduledArrival", data.scheduledIn)
        this.$set(this.form, "tail", data.registration)
      }
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