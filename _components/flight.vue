<template>
  <div id="formFlyStep">
    <div id="rowContainer" class="row">
      <table-flight @cancel="dialog = $event" :dialog="dialog" :dataTable="dataTable" @flightSelect="setDataTable($event)"/>
      <div v-for="(field, keyField) in formFields.flyFormLeft" class="col-12 col-md-6 q-px-md" :style="`${readonly ? 'height: 50px' : ''}`">
        <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
          <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            :class="`${readonly ? 'col-7': ''}`"
            :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding-bottom:0px'}`"
            v-model="form[keyField]" 
          />
        </label>
        <hr v-if="readonly" class="label-container"/>
      </div>
      <div v-if="isInbound" class="col-12 col-md-6 q-px-md q-mt-lg q-pb-sm">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs q-mb-xs text-center text-weight-bold">
            <div>{{$tr('isite.cms.label.inbound')}}</div>
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
                :style="`${field.type !== 'input' && !readonly ? keyField == 'origin' ? '' : 'padding-bottom:20px' : 'padding:10px 0px 0px 0px'}`"
                v-model="form[keyField]"
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
            <div>{{$tr('isite.cms.label.outbound')}}</div>
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
                :style="`${field.type !== 'input' && !readonly ? keyField == 'destination' ? '' : 'padding-bottom:20px' : 'padding:10px 0px 0px 0px'}`"
                v-model="form[keyField]" 
                @input="search(field)"
                @enter="search(field)"
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import responsive from '@imagina/qramp/_mixins/responsive.js'
import tableFlight from '@imagina/qramp/_components/modal/tableFlight.vue'
export default {
  props:{
    readonly: true,
    toolbar:{},
  },
  components:{tableFlight},
  mixins:[responsive],
  data(){
    return{
      form:{
        operation:null,
        customer:null,
        carrier:null,
        station:null,
        date:null,
        gate:null,
        acType:null,
        status:"1",
        inboundFlight:null,
        inboundOrigin:null,
        inboundTail:null,
        inboundScheduledArrival:null,
        inboundBlockIn:null,
        outboundFlight:null,
        outboundDestination:null,
        outboundTail:null,
        outboundScheduledDeparture:null,
        outboundBlockOut:null
      },
      selected:[],
      newOutbound:true,
      newInbound:true,
      thereInFlight:true,
      thereOutFlight:true,
      loadingState:false,
      openAlert:false,
      dialog:false,
      inOutBound:null,
      timeoutID: '',
      type:'',
      
      dataTable:[],
      mainData:[]
    }
  },
  watch:{
    'form.operation'(newVal, oldVal) {
      if (newVal != oldVal) {
        this.form.inboundFlight = null,
        this.form.inboundOrigin = null,
        this.form.inboundTail = null,
        this.form.inboundBlockIn = null,
        this.form.inboundScheduledArrival = null,
        this.form.outboundFlight = null,
        this.form.outboundDestination = null,
        this.form.outboundTail = null,
        this.form.outboundScheduledDeparture = null,
        this.form.outboundBlockOut = null
      }
    },
    'form.inboundFlight' (val) {
      if (!val) {
        this.form.inboundFlight = null,
        this.form.inboundOrigin = null,
        this.form.inboundTail = null,
        this.form.inboundScheduledArrival = null,
        this.form.inboundBlockIn = null
      }
    },
    'form.outboundFlight' (val) {
      if (!val) {
        this.form.outboundFlight = null,
        this.form.outboundDestination = null,
        this.form.outboundTail = null,
        this.form.outboundScheduledDeparture = null,
        this.form.outboundBlockOut = null
      }
    },
    'form.outboundDestination' (val) {
      if (this.form.inboundOrigin) {
        this.openAlert = false
      } else {
        this.openAlert = true
      }
    },
    'form.inboundOrigin' (val) {
      if (this.form.outboundDestination) {
        this.openAlert = false
      } else {
        this.openAlert = true
      }
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
            type: this.readonly ? 'inputStandard':'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly,
              mask:"##/##/#### ##:##",
              'fill-mask':true,
              hint:"mm/dd/yyyy hh:mm",
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
        inboundLeft:{
          inboundFlight: {
            name:'inboundFlight',
            value: '',
            type: this.readonly ? 'inputStandard':'search',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              loading: this.loadingState,
              readonly: this.readonly || this.loadingState,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.flight'),
              clearable: true,
              maxlength: 7,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.flight'),
          },
          inboundOrigin: {
            name:'inboundOrigin',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newInbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.origin'),
              clearable: true,
              color:"primary"
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qfly.airports',
              select: {label: 'airportName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.origin'),
          },
          inboundTail: {
            name:'inboundTail',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newInbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.tail'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.tail'),
          },
          inboundScheduledArrival: {
            name:'inboundScheduledArrival',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newInbound,
              mask:"##/##/#### ##:##",
              'fill-mask':true,
              hint:"mm/dd/yyyy hh:mm",
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.scheduledArrival'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.scheduledArrival'),
          },
          inboundBlockIn: {
            name:'inboundBlockIn',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              mask:"##/##/#### ##:##",
              'fill-mask':true,
              hint:"mm/dd/yyyy hh:mm",
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
          outboundFlight: {
            name:'outboundFlight',
            value: '',
            type: this.readonly ? 'inputStandard':'search',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              loading: this.loadingState,
              readonly: this.readonly || this.loadingState,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.flight'),
              clearable: true,
              maxlength: 7,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.flight'),
          },
          outboundDestination: {
            name:'outboundDestination',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newOutbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.destination'),
              clearable: true,
              color:"primary"
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qfly.airports',
              select: {label: 'airportName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
            label: this.$tr('ifly.cms.form.destination'),
          },
          outboundTail: {
            name:'outboundTail',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newOutbound,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.tail'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.tail'),
          },
          outboundScheduledDeparture: {
            name:'outboundScheduledDeparture',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newOutbound,
              mask:"##/##/#### ##:##",
              'fill-mask':true,
              hint:"mm/dd/yyyy hh:mm",
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.scheduledDeparture'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.scheduledDeparture'),
          },
          outboundBlockOut: {
            name:'outboundBlockOut',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              mask:"##/##/#### ##:##",
              'fill-mask':true,
              hint:"mm/dd/yyyy hh:mm",
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
    saveInfo() {
      this.$store.commit('qrampApp/SET_FORM_FLIGHT', this.form )
    },
    search({type, name}, criteria = null){
      if(type != 'search') return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID)
      }
      this.dataTable = []
      const _this = this
      this.timeoutID = setTimeout(function () {
        criteria = name == 'inboundFlight' ?  _this.form.inboundFlight : _this.form.outboundFlight
        if(!criteria || criteria.length < 3) return ;
        
        const params = {
          refresh: true,
          params: {
            filter: {search: criteria.toUpperCase()}
          }
        }
        _this.loadingState = true
        _this.inOutBound = ["3","4"].includes(_this.form.operation)
        //Request
        _this.$crud.index('apiRoutes.qfly.flightaware', params).then(response => {
          _this.loadingState = false
          _this.name = name
          if (response.status == 200) {
            _this.mainData = response.data
            _this.loadingState = false
            _this.setTable(response.data)
           _this.dialog = true
            
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
      },2000) 
    },
    setForm(data) {
      if(this.name.includes('outboundFlight')){
        this.$set(this.form, "outboundFlight",  data.ident)
        this.$set(this.form, "outboundDestination",  data.destinationAirport.id)
        this.$set(this.form, "outboundScheduledDeparture",  this.dateFormatterFull(data.scheduledOut))
        this.$set(this.form, "outboundTail",  data.registration)
      } else {
        this.$set(this.form, "inboundFlight", data.ident)
        this.$set(this.form, "inboundOrigin", data.originAirport.id)
        this.$set(this.form, "inboundScheduledArrival", this.dateFormatterFull(data.scheduledIn))
        this.$set(this.form, "inboundTail", data.registration)
      }
    },
    setDataTable({select, dialog}) {
      this.dialog = dialog
      this.setForm(this.mainData.find((item,index) => {
        return index === select.index 
      }))
      if(!this.inOutBound && this.openAlert){
        this.$alert.info({
          mode:'modal',
          title: this.$tr('ifly.cms.form.flight'),
          message: this.name.includes('Outbound') ? this.$tr('ifly.cms.label.flightMessageOutBound') : this.$tr('ifly.cms.label.flightMessageInBound'),
          actions: [
            {label: this.$tr('isite.cms.label.cancel'), color: 'grey-8'},
            {
              label: this.$tr('isite.cms.label.yes'),
              color: 'primary',
              handler: () => {
                this.name = this.name == 'inboundFlight' ?  'outboundFlight' : 'inboundFlight'
                this.setForm(this.mainData.find((item,index) => {
                  return index === select.index 
                }))
              }
            },
          ]
        })
      }
    },
    dateFormatterFull(date) {
      if (!date) return null
      const formDate = date.split("T")
      const [year, month, day] = formDate[0].substr(0, 10).split('-')
      const [hr, sec] = formDate[1].substr(0, 5).split(':')
      return `${day}-${month}-${year} ${hr}:${sec}`
    },
    dateFormatter(date) {
      if (!date) return null
      const [year, month, day] = date.substr(0, 10).split('-')
      return `${day}-${month}-${year}`
    },
    setTable(data) {
      data.forEach((items, index) => {
        const date = this.dateFormatter(items.scheduledOn.split("T")[0])
        const time = items.scheduledOn.split("T")[1].substr(0, 5)
        const flight = {
          index,
          date,
          registration: items.registration,
          inbound: `${time} - ${items.originAirport.airportName}`,
          outbound: `${time} - ${items.destinationAirport.airportName}`,
          aircraftType: items.aircraftType,
        }
        this.dataTable.push(flight)
      })
        
    }
  },
}
</script>

<style lang="stylus" scoped>
  #formFlyStep
    #origin
      padding-bottom 0px
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