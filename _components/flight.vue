<template>
  <div id="formFlyStep">
    <q-form @submit.prevent.stop="saveInfo" ref="myForm" id="rowContainer" class="row">
      <table-flight @cancel="dialog = $event" :dialog="dialog" :dataTable="dataTable" @flightSelect="setDataTable($event)"/>
      <div v-for="(field, keyField) in formFields.flyFormLeft" class="col-12 col-md-6 q-px-md" :style="`${readonly ? 'height: 50px' : ''}`">
          <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
            <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
            <dynamic-field
              :key="keyField"
              :id="keyField"
              :field="field"
              :class="`${readonly ? 'col-7': ''}`"
              v-model="form[keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
          <div  class="flex q-px-sm" v-if="keyField == 'customer'">
            <div v-for="(field, keyField) in formFields.checkFields" :style="`${readonly ? 'height: 50px' : ''}`">
              <dynamic-field
                :key="keyField"
                :id="keyField"
                :field="field"
                v-model="form[keyField]" 
              />
            </div>
          </div>
          <template v-if="keyField == 'carrier'">
            <div v-if="form.customCustomer" v-for="(field, keyField) in formFields.customerField" class="col-12 col-md-6" :style="`${readonly ? 'height: 50px' : ''}`">
              <dynamic-field
              :key="keyField"
              :id="keyField"
              :field="field"
              :class="`${readonly ? 'col-7': ''}`"
              v-model="form[keyField]" 
            />
            </div>
          </template>
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
                  :style="`${field.type !== 'input' && !readonly ? keyField == 'origin' ? '' : 'padding-bottom:8px' : 'padding-bottom:8px'}`"
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
                  :style="`${field.type !== 'input' && !readonly ? keyField == 'destination' ? '' : 'padding-bottom:8px' : 'padding-bottom:8px'}`"
                  v-model="form[keyField]" 
                  @input="search(field)"
                  @enter="search(field)"
                />
              </label>
              <hr v-if="readonly" class="label-container"/>
            </div>
          </div>
      </div>
    </q-form>
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
        status:"1",
        inboundCustomFlightNumber:null,
        outboundCustomFlightNumber:null,
        inboundFlightNumber:null,
        inboundOriginAirportId:null,
        outboundFlightNumber:null,
        outboundDestinationAirportId:null,
      },
      refresh: 1,
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
        this.form.inboundFlightNumber = null,
        this.form.inboundOriginAirportId = null,
        this.form.inboundTailNumber = null,
        this.form.inboundBlockIn = null,
        this.form.inboundScheduledArrival = null,
        this.form.outboundFlightNumber = null,
        this.form.outboundDestinationAirportId = null,
        this.form.outboundTailNumber = null,
        this.form.outboundScheduledDeparture = null,
        this.form.outboundBlockOut = null
      }
    },
    'form.inboundFlightNumber' (val) {
      if (!val) {
        this.form.inboundFlightNumber = null,
        this.form.inboundOriginAirportId = null,
        this.form.inboundTailNumber = null,
        this.form.inboundScheduledArrival = null,
        this.form.inboundBlockIn = null
      }
    },
    'form.outboundFlightNumber' (val) {
      if (!val) {
        this.form.outboundFlightNumber = null,
        this.form.outboundDestinationAirportId = null,
        this.form.outboundTailNumber = null,
        this.form.outboundScheduledDeparture = null,
        this.form.outboundBlockOut = null
      }
    },
    'form.outboundDestinationAirportId' (val) {
      if (this.form.inboundOriginAirportId) {
        this.openAlert = false
      } else {
        this.openAlert = true
      }
    },
    'form.inboundOriginAirportId' (val) {
      if (this.form.outboundDestinationAirportId) {
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
              requestParams: {
                filter: {
                  status: 1,
                  allCustomers: this.form.adHoc == 1 ? true : false
                }
              }
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
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
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
              /* rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ], */
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.acType'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qfly.aircraftTypes',
              select: {label: 'model', id: 'id'},
              requestParams: {filter: {status: 1}}
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
          inboundFlightNumber: {
            name:'inboundFlightNumber',
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
          inboundOriginAirportId: {
            name:'inboundOriginAirportId',
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
              requestParams: {filter: {status: this.refresh}}
            },
            label: this.$tr('ifly.cms.form.origin'),
          },
          inboundTailNumber: {
            name:'inboundTailNumber',
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
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newInbound,
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
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
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
          outboundFlightNumber: {
            name:'outboundFlightNumber',
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
          outboundDestinationAirportId: {
            name:'outboundDestinationAirportId',
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
              requestParams: {filter: {status: this.refresh}}
            },
            label: this.$tr('ifly.cms.form.destination'),
          },
          outboundTailNumber: {
            name:'outboundTailNumber',
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
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.newOutbound,
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
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.blockOut'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.blockOut'),
          },
        },
        checkFields: {
          customCustomer : {
            name:'customCustomer ',
            value: 0,
            type: this.readonly ? 'inputStandard':'checkbox',
            props: {
              readonly: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.customCustomer'),
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.station'),
          },
          adHoc : {
            name:'adHoc ',
            value: 1,
            type: this.readonly ? 'inputStandard':'checkbox',
            props: {
              readonly: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.adHoc'),
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.station'),
          }
        },
        customerField: {
          customCustomerName: {
            name:'customCustomerName',
            value: '',
            type: this.readonly ? 'inputStandard':'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.customCustomerName'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.gate'),
          },
        }
      }
    }
  },
  methods: {
    saveInfo() {
      this.$refs.myForm.validate().then(success => {
      if (success) {
        // yay, models are correct
        this.$store.commit('qrampApp/SET_FORM_FLIGHT', this.form )
        this.$emit('isError', false)
      }
      else {
        // oh no, user has filled in
        // at least one invalid value
        this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
        this.$emit('isError', true)
      }
    })
    },
    search({type, name}, criteria = null){
      if(type != 'search') return;
      if (this.timeoutID) {
        clearTimeout(this.timeoutID)
      }
      this.refresh = 0
      this.dataTable = []
      const _this = this
      this.timeoutID = setTimeout(function () {
        criteria = name == 'inboundFlightNumber' ?  _this.form.inboundFlightNumber : _this.form.outboundFlightNumber
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
            _this.form.outboundCustomFlightNumber= false
            _this.form.inboundCustomFlightNumber= false
            _this.refresh = 1
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
                    if(name.includes('Outbound')) {
                      _this.form.outboundCustomFlightNumber= true
                      _this.newOutbound = false
                    } else {
                      _this.form.inboundCustomFlightNumber= true
                      _this.newInbound = false
                    }
                  }
                },
              ]
            })
          }
        }).catch(error => {
          console.log('error', error)
        })
      },1500) 
    },
    setForm(data) {
      this.refresh = 0
      if(this.name.includes('outboundFlightNumber')){
        this.$set(this.form, "outboundFlightNumber",  data.ident)
        this.$set(this.form, "outboundDestinationAirportId",  data.destinationAirport.id)
        this.$set(this.form, "outboundScheduledDeparture",  data.scheduledOut)
        this.$set(this.form, "outboundTailNumber",  data.registration)
      } else {
        this.$set(this.form, "inboundFlightNumber", data.ident)
        this.$set(this.form, "inboundOriginAirportId", data.originAirport.id)
        this.$set(this.form, "inboundScheduledArrival", data.scheduledIn)
        this.$set(this.form, "inboundTailNumber", data.registration)
      }
    },
    setDataTable({select, dialog}) {
      this.dialog = dialog
      this.setForm(this.mainData.find((item,index) => {
        return index === select.index 
      }))
      this.name = this.name == 'inboundFlightNumber' ?  'outboundFlightNumber' : 'inboundFlightNumber'
      if(!this.inOutBound && this.openAlert){
        this.setForm(this.mainData.find((item,index) => {
          return index === select.index 
        }))
      }
    },
    dateFormatterFull(date) {
      console.log('date>', date)
      if (!date) return null
      const formDate = date.split("T")
      const [year, month, day] = formDate[0].substr(0, 10).split('-')
      const [hr, sec] = formDate[1].substr(0, 5).split(':')
      return `${month}-${day}-${year} ${hr}:${sec}`
    },
    dateFormatter(date) {
      if (!date) return null
      const [year, month, day] = date.substr(0, 10).split('-')
      return `${month}-${day}-${year}`
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