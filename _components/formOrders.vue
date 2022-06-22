<template>
  <master-modal id="formRampComponent" v-model="show" v-bind="modalProps" :persistent="true"
                :loading="loading" @hide="clear" :actions="actions" :width="'90vw'" :maximized="responsive">
    <stepper-ramp-form @sp="sp = $event" ref="stepper" :steps="steppers" :data="modalProps" @close-modal="show = $event" />
  </master-modal>
</template>
<script>
import stepperRampForm from '@imagina/qramp/_components/stepperRampForm.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  name:'formOrders',
  components: { stepperRampForm },
  mixins:[responsive],
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
      signature:[]
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
      if(this.responsive) {
        return (this.sp + 1) === this.steppers.length ? this.$tr('isite.cms.label.done') : this.$tr('isite.cms.label.next')
      }else {
        return this.sp === this.steppers.length ? this.$tr('isite.cms.label.done') : this.$tr('isite.cms.label.next')
      }
    },
    actions(){
      return[
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
            'icon-right': this.sp === this.steppers.length  ? 'fas fa-check' :'fas fa-arrow-right',
            label: this.nextLabel
          },
          action: () => {
            this.$refs.stepper.next()
          }
        },
      ]
    }
  },
  methods: {
    loadform(params) {
      const updateData = this.$clone(params)
      this.show = true
      this.modalProps = updateData.modalProps
      this.flight = {}
      this.cargo = {}
      this.remark = {}
      this.signature = {}
      if(!updateData.data) return;
      console.log(updateData)
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
      this.flight.gate = updateData.data['gate'] ? updateData.data['gate'].toString() : ''
      this.flight.acTypeId = updateData.data['acTypeId'] ? updateData.data['acTypeId'].toString() : ''
      this.flight.date = updateData.data['date'] ? updateData.data['date'].toString() : ''
      
      this.cargo.inboundCargoTotalUldsUnloaded = updateData.data['inboundCargoTotalUldsUnloaded'] ? updateData.data['inboundCargoTotalUldsUnloaded'].toString() : ''
      this.cargo.inboundCargoBulkUnloaded = updateData.data['inboundCargoBulkUnloaded'] ? updateData.data['inboundCargoBulkUnloaded'].toString() : ''
      this.cargo.outboundCargoTotalUldsLoaded = updateData.data['outboundCargoTotalUldsLoaded'] ? updateData.data['outboundCargoTotalUldsLoaded'].toString() : ''
      this.cargo.outboundCargoBulkLoaded = updateData.data['outboundCargoBulkLoaded'] ? updateData.data['outboundCargoBulkLoaded'].toString() : ''
      this.cargo.delayList = updateData.data['delay']

      this.services = updateData.data['workOrderItems']
      this.equipments = updateData.data['workOrderItems']
      this.crew = updateData.data['workOrderItems']

      this.remark.remark = updateData.data['remark']
      this.remark.safetyMessage = updateData.data['safetyMessage']

      this.signature.costumerName = updateData.data['costumerName']
      this.signature.costumerTitle = updateData.data['costumerTitle']
      this.signature.representativeName = updateData.data['representativeName']
      this.signature.representativeTitle = updateData.data['representativeTitle']
      this.signature.customerSignature = updateData.data['customerSignature']
      this.signature.representativeSignature = updateData.data['representativeSignature']

      this.$store.commit('qrampApp/SET_FORM_FLIGHT', this.flight )
      this.$store.commit('qrampApp/SET_FORM_DELAY', this.cargo.delayList )
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
    }
  },
}
</script>
<style lang="stylus">
  #formRampComponent
    .boundColor
      background-color #F1F4FA
</style>


