<template>
  <master-modal 
    id="formRampComponent" 
    v-model="show" 
    v-bind="modalProps" 
    :persistent="true"
    :loading="loading || loadingComputed" 
    @hide="clear" 
    :actions="actions" 
    :width="modalProps.width" 
    :maximized="$q.screen.lt.md"
  >
    <stepper-ramp-form
      v-if="modalProps.update"
      @sp="sp = $event" 
      @loading="loading = $event" 
      ref="stepper" 
      :steps="steppers" 
      :data="modalProps" 
      @close-modal="close($event)"
    />
    <simpleWorkOrders ref="simpleWorkOrder" v-else/>
  </master-modal>
</template>
<script>
import { computed } from 'vue';
import stepperRampForm from '../_components/stepperRampForm.vue'
import responsive from '../_mixins/responsive.js'
import services from '../_mixins/services.js';
import { 
  STATUS_DRAFT,
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_CLOSED,
} from '../_components/model/constants.js'
import qRampStore from '../_store/qRampStore.js'
import simpleWorkOrders from './simpleWorkOrders.vue'

export default {
  name:'formOrders',
  components: { stepperRampForm, simpleWorkOrders },
  mixins:[responsive, services],
  data() {
    return {
      show: false,
      loading: false,
      modalProps: {},
      sp:null,
      flight:{},
      cargo:{},
      services:[],
      equipment:[],
      crew:[],
      remark:[],
      signature:[],
      statusId: STATUS_DRAFT,
      needToBePosted: false,
      STATUS_DRAFT,
      STATUS_POSTED,
      STATUS_SUBMITTED
    }
  },
  provide() {
    return {
      disabledReadonly: computed(() => qRampStore().disabledReadonly()),
      closeModal: this.close
    }
  },
  computed:{
    steppers () {
      return [
        {
          title:'Flight',
          icon:'fas fa-plane',
          step: 1,
          form: this.flight
        },
        {
          title:'Cargo Op.',
          icon:'rv_hookup',
          step: 2,
          form: this.cargo
        },
        {
          title:'Services',
          icon:'fas fa-briefcase',
          step: 3,
          form: this.services
        },
        {
          title:'Equipment',
          icon:'extension',
          step: 4,
          form: this.equipment
        },
        {
          title:'Crew',
          icon:'fas fa-users',
          step: 5,
          form: this.crew
        },
        {
          title:'Remark',
          icon:'far fa-edit',
          step: 6,
          form: this.remark
        },
        {
          title: this.$tr('ifly.cms.label.signature'),
          icon:'draw',
          step: 7,
          form: this.signature
        }
      ]
    },
    nextLabel(){
      return this.sp === this.steppers.length ? 'Save to Draft' : this.$tr('isite.cms.label.next')
    },
    loadingComputed() {
      return qRampStore().getLoading();
    },
    actions() {
      return this.modalProps.update ? this.actionsStepperButtom : this.actionSimpleWorkOrder;
    },
    actionSimpleWorkOrder() {
      return [
      {
          props:{
            vIf: !this.modalProps.update,
            color:'primary',
            label: this.$tr('isite.cms.label.save'),
          },
          action: () => {
            this.$refs.simpleWorkOrder.saveSimpleWorkOrder();
          }
        },
      ]
    },
    actionsStepperButtom(){
      const closeFlight = [{
          props:{
            color:'primary',
            label: this.$tr('isite.cms.label.closeFlight')
          },
          action: () => {
            qRampStore().setStatusId(STATUS_CLOSED)
            this.$refs.stepper.next()
          }
      }];
      const actions = [
        {
          vIf: this.sp > 1 ,
          props:{
            color:'white',
            'text-color':'primary',
            icon: 'fas fa-arrow-left',
            label: this.$tr('isite.cms.label.back'),
          },
          action: () => {
            this.$refs.stepper.previous()
          }
        },
        {
          props:{
            color:'primary',
            'icon-right': this.sp === this.steppers.length  ?  'fa-thin fa-floppy-disk' :'fas fa-arrow-right',
            label: this.nextLabel
          },
          action: () => {
            if(this.sp === this.steppers.length) {
              qRampStore().setStatusId(STATUS_DRAFT)
            }
            this.$refs.stepper.next()
          }
        },
      ];
      return this.sp === this.steppers.length ? actions.concat(closeFlight) : actions;
    }
  },
  methods: {
    close(show) {
      this.show = show
      this.$root.$emit('crud.data.refresh')
      this.services = [];
    },
    loadform(params) {
      const updateData = this.$clone(params)
      this.show = true
      this.modalProps = updateData.modalProps
      this.flight = {}
      this.cargo = {}
      this.remark = {}
      this.signature = {}
      this.statusId = STATUS_DRAFT
      this.needToBePosted = false
      this.services = []
      this.equipments = []
      this.crew = []
      qRampStore().setWorkOrderItems([]);
      qRampStore().setStatusId(this.statusId);
      qRampStore().setNeedToBePosted(this.needToBePosted);
      if(!updateData.data) return;
      this.statusId = updateData.data['statusId'] ? updateData.data['statusId'].toString() : '1';
      this.needToBePosted = updateData.data['needToBePosted'] || false;
      qRampStore().setStatusId(this.statusId);
      qRampStore().setNeedToBePosted(this.needToBePosted); 
      this.flight.operationTypeId = updateData.data['operationTypeId'] ? updateData.data['operationTypeId'].toString() : ''
      this.flight.statusId = updateData.data['statusId'] ? updateData.data['statusId'].toString() : ''
      this.flight.inboundCustomFlightNumber = updateData.data['inboundCustomFlightNumber'] ? updateData.data['inboundCustomFlightNumber'] : ''
      this.flight.outboundCustomFlightNumber = updateData.data['outboundCustomFlightNumber'] ? updateData.data['outboundCustomFlightNumber'] : ''
      this.flight.inboundFlightNumber = updateData.data['inboundFlightNumber'] ? updateData.data['inboundFlightNumber'].toString() : ''
      this.flight.inboundOriginAirportId = updateData.data['inboundOriginAirportId'] ? updateData.data['inboundOriginAirportId'].toString() : ''
      this.flight.outboundFlightNumber = updateData.data['outboundFlightNumber'] ? updateData.data['outboundFlightNumber'].toString() : ''
      this.flight.outboundDestinationAirportId = updateData.data['outboundDestinationAirportId'] ? updateData.data['outboundDestinationAirportId'].toString() : ''
      this.flight.customerId = updateData.data['customerId'] ? updateData.data['customerId'].toString() : ''
      this.flight.customCustomer = updateData.data['customCustomer'] ? updateData.data['customCustomer'] : 0
      this.flight.adHoc = updateData.data['adHoc'] ? updateData.data['adHoc'] : 0
      this.flight.carrierId = updateData.data['carrierId'] ? updateData.data['carrierId'].toString() : ''
      this.flight.stationId = updateData.data['stationId'] ? updateData.data['stationId'].toString() : ''
      this.flight.inboundTailNumber = updateData.data['inboundTailNumber'] ? updateData.data['inboundTailNumber'].toString() : ''
      this.flight.inboundBlockIn = updateData.data['inboundBlockIn'] ? updateData.data['inboundBlockIn'].toString() : ''
      this.flight.inboundScheduledArrival = updateData.data['inboundScheduledArrival'] ? updateData.data['inboundScheduledArrival'].toString() : ''
      this.flight.outboundTailNumber = updateData.data['outboundTailNumber'] ? updateData.data['outboundTailNumber'].toString() : ''
      this.flight.outboundScheduledDeparture = updateData.data['outboundScheduledDeparture'] ? updateData.data['outboundScheduledDeparture'].toString() : ''
      this.flight.outboundBlockOut = updateData.data['outboundBlockOut'] ? updateData.data['outboundBlockOut'].toString() : ''
      this.flight.gateId = updateData.data['gateId'] ? updateData.data['gateId'].toString() : ''
      this.flight.acTypeId = updateData.data['acTypeId'] ? updateData.data['acTypeId'].toString() : ''
      this.flight.responsibleId = updateData.data['responsibleId'] ? updateData.data['responsibleId'] : null;
      qRampStore().setResponsible(updateData.data['responsible']);
      this.flight.date = updateData.data['date'] ? updateData.data['date'].toString() : ''
      const customerName = updateData.data.customer ? updateData.data.customer.customerName : null;
      const customCustomerName =  updateData.data.customCustomerName ? updateData.data.customCustomerName : null;
      this.flight.customerName = customerName || customCustomerName;
      this.flight.contractId = updateData.data.contractId ? updateData.data.contractId : null;
      this.flight.contractName = updateData.data.contract ? updateData.data.contract.contractName : null;
      this.cargo.inboundCargoTotalUldsUnloaded = updateData.data['inboundCargoTotalUldsUnloaded'] ? updateData.data['inboundCargoTotalUldsUnloaded'].toString() : ''
      this.cargo.inboundCargoBulkUnloaded = updateData.data['inboundCargoBulkUnloaded'] ? updateData.data['inboundCargoBulkUnloaded'].toString() : ''
      this.cargo.outboundCargoTotalUldsLoaded = updateData.data['outboundCargoTotalUldsLoaded'] ? updateData.data['outboundCargoTotalUldsLoaded'].toString() : ''
      this.cargo.outboundCargoBulkLoaded = updateData.data['outboundCargoBulkLoaded'] ? updateData.data['outboundCargoBulkLoaded'].toString() : ''
      this.cargo.cargoTotalKilosLoaded = updateData.data['cargoTotalKilosLoaded'] ? updateData.data['cargoTotalKilosLoaded'].toString() : ''
      this.cargo.cargoTotalKilosUnloaded = updateData.data['cargoTotalKilosUnloaded'] ? updateData.data['cargoTotalKilosUnloaded'].toString() : ''
      this.cargo.delayList = updateData.data['delay'] || [];

      this.services = updateData.data['workOrderItems']
      this.equipments = updateData.data['workOrderItems']
      this.crew = updateData.data['workOrderItems']
      qRampStore().setWorkOrderItems(updateData.data['workOrderItems']);
      this.remark.remark = updateData.data['remark']
      this.remark.safetyMessage = updateData.data['safetyMessage']

      this.signature.customerName = updateData.data['customerName']
      this.signature.customerTitle = updateData.data['customerTitle']
      this.signature.representativeName = updateData.data['representativeName']
      this.signature.representativeTitle = updateData.data['representativeTitle']
      this.signature.customerSignature = updateData.data['customerSignature']
      this.signature.representativeSignature = updateData.data['representativeSignature']
      this.$store.commit('qrampApp/SET_FORM_FLIGHT', this.flight )
      this.$store.commit('qrampApp/SET_FORM_DELAY', this.cargo.delayList)
      this.$store.commit('qrampApp/SET_FORM_CARGO', this.form)
      this.$store.commit('qrampApp/SET_FORM_SERVICES',[])
      this.$store.commit('qrampApp/SET_FORM_EQUIPMENTS', [] )
      this.$store.commit('qrampApp/SET_FORM_CREW', [] )
      this.$store.commit('qrampApp/SET_FORM_SIGNATURE',this.signature)
    },
    //Clear
    clear() {
      this.modalProps = {}
      this.show = false
      this.services = [];
    }
  },
}
</script>
<style lang="stylus">
  #formRampComponent
    .boundColor
      background-color #F1F4FA
</style>


