<template>
  <div id="formFlyStep" class="tw-mt-6 tw-mb-20">
    <q-form @submit.prevent.stop="saveInfo" ref="myForm" id="rowContainer" class="row q-col-gutter-lg">
      <table-flight 
        @cancel="dialog = $event" 
        :dialog="dialog" 
        :dataTable="dataTable" 
        @flightSelect="setDataTable($event)"
        @validateBound="validateBound(flightNumberField)"
      />
      <div class="col-12 col-md-6">
        <div v-for="(field, keyField) in formFields.flyFormLeft" :style="`${readonly ? 'height: 50px' : ''}`">
          <label v-if="keyField == 'customerId'" :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
            <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
            <dynamic-field
              v-if="bannerMessage"
              class="q-mb-md" 
              :field="formFields.banner"
            />
            <dynamic-field
              :key="keyField"
              :id="keyField"
              :field="field"
              :class="`${readonly ? 'col-7': ''}`"
              :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:7px' : 'padding-bottom:0px'}`"
              v-model="selectCustomers"
              @input="setCustomerForm"
              @filter="setCustomerName"
              ref="customerId"
            >
              <div slot="before-options">
                <div class="q-py-md q-px-md" @click="addCustumers">
                  <div class="row cursor-pointer" >
                    <div class="q-pr-md">
                       <q-btn 
                          push color="primary" 
                          round 
                          icon="fas fa-plus" 
                          size="xs"
                        /> 
                    </div>
                    <div class="q-py-xs">
                      <label class="cursor-pointer">{{ $tr('ifly.cms.label.createNewCustomer') }}</label>
                    </div>
                  </div>
                </div> 
              </div>
            </dynamic-field>
          </label>
          <label v-if="keyField != 'customerId' && keyField != 'customCustomerName' && keyField !== 'responsibleId'" :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
            <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
            <dynamic-field
              :key="keyField"
              :id="keyField"
              :field="field"
              :class="`${readonly ? 'col-7': ''}`"
              :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:7px' : 'padding-bottom:0px'}`"
              v-model="form[keyField]"
              @input="resetField(keyField)"
            />
          </label>
          <div v-if="keyField === 'responsibleId'">
            <dynamic-field
              :key="keyField"
              :id="keyField"
              :field="field"
              :class="`${readonly ? 'col-7': ''}`"
              :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:7px' : 'padding-bottom:0px'}`"
              v-model="selectResponsible"
              @input="setSelectResponsible"
            />
          </div>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div 
          v-for="(field, keyField) in formFields.flyFormRight" 
          :style="`${readonly ? 'height: 50px' : 'padding-bottom: 7px'}`"
          
        >
        <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
          <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            :class="`${readonly ? 'col-7': ''}`"
            :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:1px' : 'padding-bottom:0px'}`"
            v-model="form[keyField]"
            @input="resetField()"
          />
        </label>
        <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
      <div v-if="isInbound" class="col-12 col-md-6">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary tw-rounded-t-md tw-text-base boundColor tw-p-2 text-center text-weight-bold tw-mb-4">
            <div>{{$tr('isite.cms.label.inbound')}}</div>
          </div>
          <div
            v-for="(field, keyField) in formFields.inboundLeft"
            class="tw-px-4"
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
                @enter="search(field)"
                :ref="`${keyField}`"
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
          </div>
        </div>
      </div>
      <div v-if="isOutbound" class="col-12 col-md-6">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary tw-rounded-t-md tw-text-base boundColor tw-p-2 text-center text-weight-bold tw-mb-4">
            <div>{{$tr('isite.cms.label.outbound')}}</div>
          </div>
          <div
            v-for="(field, keyField) in formFields.outboundRight"
            class="tw-px-4"
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
                @enter="search(field)"
                @input="changeDate(field)"
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
          </div>
        </div>
      </div>
      <div 
        v-if="isInbound && isOutbound"
        class="col-12 tw-font-semibold"
      >
        <div 
          class="
            tw-p-4 
            tw-border 
            tw-border-gray-200
            tw-mx-4 
            tw-text-center"
          >
            Difference (hours): {{ differenceHour }}
        </div>
      </div>
    </q-form>
  </div>
</template>
<script>
import responsive from '../_mixins/responsive.js'
import tableFlight from '../_components/modal/tableFlight.vue'
import factoryCustomerWithContracts from '../_components/factories/factoryCustomerWithContracts.js';
import qRampStore from '../_store/qRampStore.js';
export default {
  props:{
    readonly: true,
    toolbar:{},
    flightData:{
      type:Object,
      default:()=>{}
    }
  },
  inject: ['disabledReadonly'],
  components:{tableFlight},
  mixins:[responsive],
  mounted() {
     this.$nextTick(function () {
      document.querySelector('.master-dialog__body')
      .addEventListener('scroll', this.handleScroll);
      this.init();
    })
  },
  data(){
    return{
      form:{
        customCustomer: false,
        adHoc: false,
        operationTypeId:null,
        statusId:"1",
        date: '',
        inboundCustomFlightNumber:null,
        outboundCustomFlightNumber:null,
        inboundFlightNumber:null,
        inboundOriginAirportId:null,
        outboundFlightNumber:null,
        outboundDestinationAirportId:null,
        outboundBlockOut: null,
        stationId: null,
      },
      refresh: 1,
      selected:[],
      newOutbound:true,
      newInbound:true,
      thereInFlight:true,
      thereOutFlight:true,
      loadingState:false,
      openAlert:false,
      update:false,
      dialog:false,
      inOutBound:null,
      timeoutID: '',
      type:'',
      dataTable:[],
      mainData:[],
      selectCustomers: '',
      selectResponsible: '',
      bannerMessage: null,
      customerName: '',
      newCustumerAdHoc: [],
      differenceHour: 0,
      responsibleList: [],
    }
  },
  watch:{
    'form.customCustomer'(newVal) {
      if(newVal){
        this.form.customerId = null
      } else {
        this.form.customCustomerName = ''
      }
    },
    'form.operationTypeId'(newVal, oldVal) {
      if(this.update)return;
      else if (newVal != oldVal) {
        this.form.inboundFlightNumber = null,
        this.form.inboundOriginAirportId = null,
        this.form.inboundTailNumber = null,
        this.form.inboundBlockIn = null,
        this.form.inboundScheduledArrival = null,
        this.form.outboundFlightNumber = null,
        this.form.outboundDestinationAirportId = null,
        this.form.outboundTailNumber = null,
        this.form.outboundScheduledDeparture = null
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
        this.form.outboundScheduledDeparture = null
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
    isDesktop() {
      return window.innerWidth >= '900';
    },
    flightBoundFormStatus() {
      return qRampStore().getFlightBoundFormStatus();
    },
    flightNumberField() {
      return qRampStore().getFlightNumberField();
    },
    selectCustomerComputed: {
      get() {
        return this.selectCustomers;
      },
      set(value) {
        this.selectCustomers = value;
      }
    },
    selecteResponsibleComputed: {
      get() {
        return this.selectResponsible;
      },
      set(value) {
        this.selectResponsible = value;
      }
    },
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
      if(this.form.operationTypeId){
        const validator = this.form.operationTypeId == 4 || this.form.operationTypeId != 3;
        if(this.form.operationTypeId != 2 && this.form.operationTypeId != 1 && this.form.operationTypeId != 6) {
          if(validator) {
            this.form.outboundFlightNumber = this.flightData.outboundFlightNumber;
            this.form.outboundScheduledDeparture = this.dateFormatterFull(this.flightData.outboundScheduledDeparture)
            this.form.outboundTailNumber = this.flightData.outboundTailNumber;
            this.form.outboundDestinationAirportId = this.flightData.outboundDestinationAirportId;
            this.form.outboundBlockOut = this.dateFormatterFull(this.flightData.outboundBlockOut);
          } else {
            this.form.outboundFlightNumber = null;
            this.form.outboundScheduledDeparture = null;
            this.form.outboundTailNumber = null;
            this.form.outboundDestinationAirportId = null;
          }
        }
        return validator;
      }
      return false
    },
    isInbound() {
      if(this.form.operationTypeId) {
        const validator = this.form.operationTypeId == 3 || this.form.operationTypeId != 4;
          if(this.form.operationTypeId != 2 && this.form.operationTypeId != 1 && this.form.operationTypeId != 6) {
            if(validator) {
              this.form.inboundFlightNumber = this.flightData.inboundFlightNumber;
              this.form.inboundScheduledArrival = this.dateFormatterFull(this.flightData.inboundScheduledArrival)
              this.form.inboundTailNumber = this.flightData.inboundTailNumber;
              this.form.inboundOriginAirportId = this.flightData.inboundOriginAirportId;
            } else {
              this.form.inboundFlightNumber = null;
              this.form.inboundScheduledArrival = null
              this.form.inboundTailNumber = null;
              this.form.inboundOriginAirportId = null;
              this.form.outboundBlockOut = null;
            }
        }
        return validator
      }
      return false
    },
    readStatus(){
      return  !this.$auth.hasAccess('ramp.work-orders.edit-status') || this.readonly || this.disabledReadonly
    },
    allowContractName() {
      return this.$auth.hasAccess('ramp.work-orders.see-contract-name');
    },
    manageResponsiblePermissions() {
      return this.$auth.hasAccess('ramp.work-orders.manage-responsible');
    },
    formFields(){
      return{
        banner: {
          type: 'banner',
          props: {
            color: 'info',
            icon: 'fas fa-exclamation-triangle',
            message: this.bannerMessage,
          }
        },
        flyFormLeft:{
          customerId: {
            name:'customerId',
            value: '',
            type: this.readonly ? 'inputStandard': 'select',
            help: {
                description: 'You can add a new customer to the list if it\'s not available. Type the Customer Name and click on "Create new customer". The Work Order will be created as Ad-Hoc.'
            },
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.customer')}`,
              clearable: true,
              color:"primary",
              'hide-bottom-space': false,
              emitValue: false,
              options: this.newCustumerAdHoc,
            },
            loadOptions: {
              delayed: this.getCustomerList,
            },
            label: this.$tr('ifly.cms.form.customer'),
          },
          customCustomerName: {
            name:'customCustomerName',
            value: '',
            type: this.readonly ? 'inputStandard': 'input',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.customer')}`,
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.customer'),
          },
          stationId: {
            name:'stationId',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              selectByDefault : true,
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.station')}`,
              clearable: true,
              color:"primary"
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.setupStations',
              select: {label: 'stationName', id: 'id'},
              requestParams: {filter: {status: 1}}
            },
          },
          acTypeId: {
            name:'acTypeId',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.acType')}`,
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
          responsibleId: {
            name: "responsibleId",
            value: '',
            type: "select",
            props: {
              vIf: this.manageResponsiblePermissions,
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: '*Responsible',
              clearable: true,
              color: "primary",
              emitValue: false,
              options: this.responsibleList,
            },
            loadOptions: {
              apiRoute: "apiRoutes.quser.users",
              select: { label: "fullName", id: "id", value:"fullName" },
              filterByQuery: true
            },
          },
          operationTypeId: {
            name:'operationTypeId',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.operation')}`,
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
        },
        flyFormRight:{
          carrierId: {
            name:'carrierId',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.carrier')}`,
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
          date: {
            name:'date',
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              hint:'Format: MM/DD/YYYY HH:mm',
              mask:'MM/DD/YYYY HH:mm',
              'place-holder': 'MM/DD/YYYY HH:mm',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.date')}`,
              clearable: true,
              color:"primary",
              format24h: true,
              options: (date, min) => this.validateFutureDateTime(date, min, this.form.date),
            },
            label: this.$tr('ifly.cms.form.date'),
          },
          gateId: {
            name:'gateId',
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => this.validateSpecialCharacters(val)
              ],
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.gate')}`,
              clearable: true,
              color:"primary"
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qsetupagione.gates',
              select: {label: 'name', id: 'id'},
              requestParams: {filter: {stationId: this.form.stationId}}
            },
            label: this.$tr('ifly.cms.form.gate'),
          },
          statusId: {
            name:'statusId',
            value: 1,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              readonly: this.readStatus,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.status')}`,
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
              hint:'Enter the fight number and press enter or press the search icon',
              loading: this.loadingState,
              readonly: this.readonly || this.disabledReadonly || this.loadingState,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.flight')}`,
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
              readonly: this.disabledReadonly || this.flightBoundFormStatus.boundOriginAirportId,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.origin')}`,
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
              readonly:  this.disabledReadonly || this.flightBoundFormStatus.boundTailNumber,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.tail')}`,
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
              hint:'Format: MM/DD/YYYY HH:mm',
              mask:'MM/DD/YYYY HH:mm',
              'place-holder': 'MM/DD/YYYY HH:mm',
              readonly: this.disabledReadonly || this.flightBoundFormStatus.boundScheduled,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.scheduledArrival')}`,
              clearable: true,
              color:"primary",
              format24h: true,
              options: (date, min) => this.validateFutureDateTime(date, min, this.form.inboundScheduledArrival),
            },
            label: this.$tr('ifly.cms.form.scheduledArrival'),
          },
          inboundBlockIn: {
            name:'inboundBlockIn',
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              hint:'Format: MM/DD/YYYY HH:mm',
              mask:'MM/DD/YYYY HH:mm',
              'place-holder': 'MM/DD/YYYY HH:mm',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.blockIn')}`,
              clearable: true,
              color:"primary",
              format24h: true,
            },
            label: this.$tr('ifly.cms.form.blockIn'),
          },
          outboundBlockOut: {
            name:'outboundBlockOut',
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              vIf: this.form.operationTypeId === '3',
              ref:'outboundBlockOutInboundLeft',
              rules: [],
              hint:'Format: MM/DD/YYYY HH:mm',
              mask:'MM/DD/YYYY HH:mm',
              'place-holder': 'MM/DD/YYYY HH:mm',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.blockOut')}`,
              color:"primary",
              format24h: true,
            },
            label: this.$tr('ifly.cms.form.blockOut'),
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
              hint:'Enter the fight number and press enter or press the search icon',
              loading: this.loadingState,
              readonly: this.readonly || this.disabledReadonly || this.loadingState,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.flight')}`,
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
              readonly: this.disabledReadonly || this.flightBoundFormStatus.boundDestinationAirport,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.destination')}`,
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
              readonly: this.disabledReadonly || this.flightBoundFormStatus.boundTailNumber,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.tail')}`,
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
              hint:'Format: MM/DD/YYYY HH:mm',
              mask:'MM/DD/YYYY HH:mm',
              'place-holder': 'MM/DD/YYYY HH:mm',
              readonly: this.disabledReadonly || this.flightBoundFormStatus.boundScheduledDeparture,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.scheduledDeparture')}`,
              clearable: true,
              color:"primary",
              format24h: true,
              options: (date, min) => this.validateFutureDateTime(date, min, this.form.outboundScheduledDeparture),
            },
            label: this.$tr('ifly.cms.form.scheduledDeparture'),
          },
          outboundBlockOut: {
            name:'outboundBlockOut',
            value: '',
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
              hint:'Format: MM/DD/YYYY HH:mm',
              mask:'MM/DD/YYYY HH:mm',
              'place-holder': 'MM/DD/YYYY HH:mm',
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.blockOut')}`,
              clearable: true,
              color:"primary",
              format24h: true,
            },
            label: this.$tr('ifly.cms.form.blockOut'),
          },
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
              readonly: this.readonly || this.disabledReadonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : `*${this.$tr('ifly.cms.form.customCustomerName')}`,
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.gate'),
          },
        }
      }
    },
    validateFutureDateTime() {
      return (dateTime, min, currentDate) => qRampStore().validateFutureDateTime(dateTime, min, currentDate);
    },
  },
  methods: {
    showInputs(keyField){
      return (keyField == 'customCustomer' && this.form.adHoc) || keyField == 'adHoc'
    },
    init() {
      this.currentDate()
      this.updateData()
    },
    updateData() {
      if(Object.keys(this.flightData).length > 0) {
        this.update = true
        const updateForm = this.$clone(this.flightData)
        this.form.statusId = updateForm.statusId
        this.form.stationId = updateForm.stationId
        this.form.acTypeId = updateForm.acTypeId
        this.form.adHoc = updateForm.adHoc
        this.form.carrierId = updateForm.carrierId
        this.form.customCustomer = updateForm.customCustomer
        this.form.customerId = updateForm.customerId
        const label = (this.allowContractName && updateForm.contractId) ? `${updateForm.customerName} (${updateForm.contractName})` : updateForm.customerName;
        this.selectCustomerComputed = {
          id: updateForm.customerId,
          value: updateForm.customerName,
          label: updateForm.adHoc ? `${label} (Ad Hoc)`: label,
          contractId: updateForm.contractId,
          contractName: updateForm.contractName,
        }
        this.setCustomerForm();
        this.form.date = updateForm.date
        this.form.gateId = updateForm.gateId
        this.form.operationTypeId = updateForm.operationTypeId
        setTimeout(() => {
          this.form.date = this.dateFormatterFull(updateForm.date)
          this.update = false
          
          this.form.responsibleId = updateForm.responsibleId;
          const responsible = qRampStore().getResponsible();
          this.responsibleList = this.optionResponsible(responsible);
          this.selecteResponsibleComputed = {
            id: responsible.id,
            value: responsible.fullName,
            label: responsible.fullName,
          }
          this.form.inboundFlightNumber = updateForm.inboundFlightNumber 
          this.form.outboundFlightNumber = updateForm.outboundFlightNumber 
          this.form.inboundOriginAirportId = updateForm.inboundOriginAirportId
          this.form.inboundTailNumber = updateForm.inboundTailNumber
          this.flightBoundFormStatus.boundTailNumber = updateForm.inboundTailNumber ? true : false;
          this.flightBoundFormStatus.boundScheduled = updateForm.inboundScheduledArrival ? true : false;
          this.flightBoundFormStatus.boundScheduledDeparture = updateForm.outboundScheduledDeparture ? true : false;
          this.flightBoundFormStatus.boundOriginAirportId = updateForm.inboundOriginAirportId ? true : false;
          this.form.inboundBlockIn = this.dateFormatterFull(updateForm.inboundBlockIn)
          this.form.inboundScheduledArrival = this.dateFormatterFull(updateForm.inboundScheduledArrival)
          this.form.outboundDestinationAirportId = updateForm.outboundDestinationAirportId
          this.form.outboundTailNumber = updateForm.outboundTailNumber
          this.form.outboundScheduledDeparture = this.dateFormatterFull(updateForm.outboundScheduledDeparture)
          this.form.outboundBlockOut = this.dateFormatterFull(updateForm.outboundBlockOut)
          if(this.form.inboundBlockIn && this.form.outboundBlockOut) {
            this.differenceHour = qRampStore().getDifferenceInHours(this.form.inboundBlockIn, this.form.outboundBlockOut);
          }
        },1000)
      }
    },
    saveInfo(error) {
      this.$refs.myForm.validate().then(async (success) => {
        if (success) {
          // yay, models are correct
          this.$store.commit('qrampApp/SET_FORM_FLIGHT', this.form)
          qRampStore().setDateInboundBlockIn(this.form.inboundBlockIn);
          qRampStore().setDateOutboundBlockOut(this.form.outboundBlockOut);
          qRampStore().setDateOutboundScheduledDeparture(this.form.outboundScheduledDeparture);
          qRampStore().setDateinboundScheduledArrival(this.form.inboundScheduledArrival);
          this.$emit('isError', error);
        }
        else {
          // oh no, user has filled in
          // at least one invalid value
          this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
          this.$emit('isError', true)
        }
      })
    },
    async menssageValidate() {
      let error = false;
      if(
        this.form.operationTypeId === '3' 
        && this.form.inboundFlightNumber
        && this.form.inboundOriginAirportId
        && this.form.inboundTailNumber
        && this.form.inboundScheduledArrival
        && this.form.inboundBlockIn
        && (this.form.outboundBlockOut === '' ||  this.form.outboundBlockOut === null)
      ) {
        if(await new Promise(resolve=>this.$q.dialog({
          ok: this.$tr('isite.cms.label.yes'),
          message: 'Are you sure there is no data for block out?',
          cancel: true,
          persistent: true
        }).onOk(()=>resolve(true)).onCancel(()=>resolve(false)))){
        error = false
        }else{
        error = true;
        const out = this.$refs.outboundBlockOut[0];
        if(out) {
          out.$refs.outboundBlockOutInboundLeft.focus();
        }
        }
      }
      
      return error; 
    },
    currentDate() {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000; 
      const date = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1)
      this.form.date = this.dateFormatterFull(date)
    },
    search({type, name}, criteria = null) {
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
        _this.inOutBound = ["3","4"].includes(_this.form.operationTypeId)
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
            qRampStore().setFlightNumberField(name);
          } else if (response.status == 204) {
            const message = _this.$tr("ifly.cms.label.flightMessage").replace("#file_number", criteria);
            _this.$alert.warning({
              mode:'modal',
              title: _this.$tr('ifly.cms.form.flight'),
              message,
              actions: [
                {label: _this.$tr('isite.cms.label.cancel'), color: 'grey-8'},
                {
                  label: _this.$tr('isite.cms.label.yes'),
                  color: 'primary',
                  handler: () => {
                    _this.validateBound(name);
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
    validateBound(name) {
      if(!name) return;
      this.form.outboundCustomFlightNumber = true
      qRampStore().showFielFlightBoundFormStatus();
      this.form.inboundCustomFlightNumber= true
      this.dialog = false;
    },
    setForm(data) {
      this.refresh = 0
      if(this.name.includes('outboundFlightNumber')){
        const destinationAirportId = data.destinationAirport ? data.destinationAirport.id : null;
        this.$set(this.form, "outboundFlightNumber",  data.ident)
        this.$set(this.form, "outboundDestinationAirportId",  destinationAirportId)
        this.$set(this.form, "outboundScheduledDeparture",  this.dateFormatterFull(data.estimatedOn))
        this.$set(this.form, "outboundTailNumber",  data.registration)
      } else {
        this.$set(this.form, "inboundFlightNumber", data.ident)
        const originAirportId = data.originAirport ? data.originAirport.id : null;
        this.$set(this.form, "inboundOriginAirportId", originAirportId)
        this.$set(this.form, "inboundScheduledArrival", this.dateFormatterFull(data.estimatedOff))
        this.$set(this.form, "inboundTailNumber", data.registration)
        if(this.form.outboundTailNumber) {
          this.$set(this.form, "outboundTailNumber",  data.registration);
        }
      }
      qRampStore().validateStatusSelectedFlight(data);
    },
    setDataTable({select, dialog}) {
      this.dialog = dialog
      this.setForm(this.mainData.find((item,index) => {
        return index === select.index 
      }))
      this.name = this.name == 'inboundFlightNumber' ?  'outboundFlightNumber' : 'inboundFlightNumber';
      if(!this.inOutBound && this.openAlert){
        this.setForm(this.mainData.find((item,index) => {
          return index === select.index 
        }))
      }
    },
    dateFormatterFull(date) {
      if (!date) return null
      const formDate = date.split("T")
      const [year, month, day] = formDate[0].substr(0, 10).split('-')
      const [hr, mm] = formDate[1].substr(0, 5).split(':')
      return `${month}/${day}/${year} ${hr}:${mm}`
    },
    dateFormatter(date) {
      if (!date) return null
      const [year, month, day] = date.substr(0, 10).split('-')
      return `${month}/${day}/${year}`
    },
    setTable(data) {
      data.forEach((items, index) => {
        const date = items.scheduledOn ? this.dateFormatter(items.scheduledOn.split("T")[0]) : '';
        const inboundTime = items.estimatedOff ? items.estimatedOff.split("T")[1].substr(0, 5) : '';
        const outboundTime = items.estimatedOn ? items.estimatedOn.split("T")[1].substr(0, 5) : '';
        const airportName = items.originAirport ? items.originAirport.airportName : '';
        const destinationairportName = items.destinationAirport ? items.destinationAirport.airportName : '';
          const flight = {
            index,
            date,
            registration: items.registration,
            inbound: `${inboundTime} - ${airportName}`,
            outbound: `${outboundTime} - ${destinationairportName}`,
            aircraftType: items.aircraftType,
            faFlightId: items.faFlightId,
          }
        this.dataTable.push(flight)
      })
        
    }, 
    validateSpecialCharacters(val) {
      if(/[^a-zA-Z0-9-]/.test(val)) {
        return this.$tr('isite.cms.message.specialCharactersAreNotAllowed');
      }
      return !!val || this.$tr('isite.cms.message.fieldRequired');
    },
    setCustomerForm() {
      const selectCustomers = this.selectCustomers === '' ? {} : this.selectCustomers;
      this.form.customerId = selectCustomers.id || null;
      const customCustomerName = selectCustomers.label || null;
      this.form.customCustomerName = this.form.customerId ? null : customCustomerName;
      this.form.contractId = selectCustomers.contractId || null;
      qRampStore().setContractId(this.form.contractId);
      const message = this.form.contractId 
        ? `${this.$tr('ifly.cms.message.selectedCustomerWithContract')}` 
        : this.$tr('ifly.cms.message.selectedCustomerWithoutContract');
       
      this.bannerMessage =  selectCustomers && !this.form.contractId ? message : null;
      this.form.adHoc = this.form.contractId ? false : true;
      this.form.customCustomer = this.form.contractId ? false : true;
    },
    setCustomerName(query) {
      this.customerName = query !== '' ? query : '';
    },
    addCustumers() {
      if(this.customerName !== '') {
        const id = `customer-${this.numberInRange(8000, 1000)}`;
        this.newCustumerAdHoc = [{id, label: this.customerName}];
        this.form.adHoc = true;
        this.form.customCustomer = true;
        this.bannerMessage =  this.$tr('ifly.cms.message.requestNewCustomer');
        this.selectCustomerComputed = {
          id,
          value: this.customerName,
          label:  this.customerName,
        }
        this.form.customCustomerName = this.customerName;
        this.form.customerId = null;
        this.form.contractId = null;
        this.customerName = '';
        return;
      }
      this.$alert.error({message: this.$tr('ifly.cms.message.orderaddNewrecord')});
    },
    numberInRange(max, min) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getCustomerList() {
      return new Promise(async(resolve) => {
        const custemerParams = {
            params: {
              filter: {
                withoutContracts: true,
                adHocWorkOrders: true,
                customerStatusId: 1
              }
            },
            refresh: true,
        }
        const contractParams = {
            params: {
              filter: {
                contractStatusId: 1
              }
            },
            refresh: true,
        }
        const customersData = await Promise.all([
          this.$crud.index('apiRoutes.qramp.setupCustomers', custemerParams),
          this.$crud.index('apiRoutes.qramp.setupContracts', contractParams)
        ]);
        const customerList = factoryCustomerWithContracts(customersData, this.allowContractName);

        return resolve(customerList);
      })
    },
    handleScroll(event) {
      if(this.$refs.customerId || this.$refs.customerId.length > 0) {
        if(this.$refs.customerId.some(item => item.tooltip)) {
          this.$refs.customerId[0].tooltip = false;
        }
      }
    },
    resetBound() {
      this.form.outboundCustomFlightNumber = false
      this.form.inboundCustomFlightNumber= false
      qRampStore().resetFlightBoundFormStatus();
    },
    resetField(key = '') {
      if(key === 'stationId') {
        this.form.gateId = null;
        return;
      }
      if(!this.form.operationTypeId) return;
      this.$refs.myForm.reset();
      const data = {
          destinationAirport: {
            id: this.form.inboundOriginAirportId,
          },
          registration: this.form.outboundTailNumber || this.form.inboundTailNumber,
          originAirport: {
            id: this.form.outboundDestinationAirportId,
          },
          estimatedOff: this.form.inboundScheduledArrival,
          estimatedOn: this.form.outboundScheduledDeparture,
        }
      qRampStore().validateStatusSelectedFlight(data);
      this.resetBound();
    },
    validateDate(dateTime, dateMin = null) {
        const date = this.form.inboundScheduledArrival 
          ? this.$moment(this.form.inboundScheduledArrival) : this.$moment();
        const today = date.format('YYYY/MM/DD');
        const hour = date.format('H');
        const min = date.format('mm');
        const validateDate = today === this.$moment(this.form.inboundBlockIn).format('YYYY/MM/DD');
        if (isNaN(dateTime)) {
            return dateTime <= this.$moment().format('YYYY/MM/DD') && dateTime >= today;
        }
        if(dateMin) {
            return validateDate ? Number(dateMin) <= min : true;
        }
        return validateDate ? dateTime <= hour : true;
    },
    validateDateOutboundBlockOut(dateTime, dateMin = null) {
      const outboundScheduledDepartureDate = this.form.outboundScheduledDeparture 
          ? this.$moment(this.form.outboundScheduledDeparture) : this.$moment();
      const today =  outboundScheduledDepartureDate.format('YYYY/MM/DD')  
      const hour = outboundScheduledDepartureDate.format('H');
      const min = outboundScheduledDepartureDate.format('mm');
      const validateDate = today === this.$moment(this.form.outboundBlockOut).format('YYYY/MM/DD');
      if (isNaN(dateTime)) {    
        if(this.form.inboundBlockIn) {
          return dateTime <= this.$moment().format('YYYY/MM/DD') 
          && dateTime >= this.$moment(this.form.inboundBlockIn).format('YYYY/MM/DD') 
          && dateTime <= today;
        }
        return dateTime <= this.$moment().format('YYYY/MM/DD') 
        && dateTime >= today;
      }
      if(dateMin) {
        return validateDate ? Number(dateMin) <= min : true;
      }
      return validateDate ? dateTime <= hour : true;
    },
    changeDate(field) {
      if(field.name === 'outboundBlockOut' && this.form.outboundBlockOut !== null) {
        this.differenceHour = qRampStore().getDifferenceInHours(this.form.inboundBlockIn, this.form.outboundBlockOut);
      }
    },
    optionResponsible(item) {
      return item ? [{id: String(item.id), label: item.fullName, value: item.id}]: [];
    },
    setSelectResponsible() {
      const responsibleId = this.selecteResponsibleComputed.id || null;
      this.form.responsibleId = responsibleId;
      console.log(this.form.responsibleId);
    },
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
      z-index 1
    .span 
      padding-bottom 10px
    .spanBottom
      padding-bottom 15px
    .card-bound
      border: 1px solid #f1f4fa;
      border-radius: 8px 8px 0px 0px; 
</style>