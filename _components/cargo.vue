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
export default {
  props:{
    readonly: true,
    toolbar:{},
    cargoData:{}
  },
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
    }
  },
  mounted() {
     this.$nextTick(function () {
      this.init()
    })
  },
  computed:{
    delayFields(){
      const obj = {}
      this.delayList.forEach((delay,index) => {
          obj['code'+index] = {
            value: delay.code,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              options: [
                {label: '00-05 AIRLINE INTERNAL CODES', value: '00-05 AIRLINE INTERNAL CODES'},
                {label: '06 (OA) NO GATE/STAND AVAILABILITY DUE TO OWN AIRLINE ACTIVITY', value: '06 (OA) NO GATE/STAND AVAILABILITY DUE TO OWN AIRLINE ACTIVITY'},
                {label: '09 (SG) SCHEDULED GROUND TIME LESS THAN DECLARED MINIMUM GROUND TIME', value: '09 (SG) SCHEDULED GROUND TIME LESS THAN DECLARED MINIMUM GROUND TIME'},
                {label: '11 (PD) LATE CHECK-IN, acceptance after deadline', value: '11  (PD) LATE CHECK-IN, acceptance after deadline'},
                {label: '12 (PL) LATE CHECK-IN, congestions in check-in area', value: '12  (PL) LATE CHECK-IN, congestions in check-in area'},
                {label: '13 (PE) CHECK-IN ERROR, passenger and baggage', value: '13  (PE) CHECK-IN ERROR, passenger and baggage'},
                {label: '14 (PO) OVERSALES, booking errors', value: '14  (PO) OVERSALES, booking errors'},
                {label: '15 (PH) BOARDING, discrepancies and paging, missing checked-in passenger', value: '15  (PH) BOARDING, discrepancies and paging, missing checked-in passenger'},
                {label: '16 (PS) COMMERCIAL  PUBLICITY/PASSENGER  CONVENIENCE,  VIP,  press,  ground  meals  and  missing  personal items', value: '16 (PS) COMMERCIAL  PUBLICITY/PASSENGER  CONVENIENCE,  VIP,  press,  ground  meals  and  missing  personal items'},
                {label: '17 (PC) CATERING ORDER, late or incorrect order given to supplier', value: '17 (PC) CATERING ORDER, late or incorrect order given to supplier'},
                {label: '18 (PB) BAGGAGE PROCESSING, sorting etc.', value: '18 (PB) BAGGAGE PROCESSING, sorting etc.'},
                {label: '19 (PW) REDUCED MOBILITY, boarding / deboarding of passengers with reduced mobility.', value: '19 (PW) REDUCED MOBILITY, boarding / deboarding of passengers with reduced mobility.'},
                {label: '21 (CD) DOCUMENTATION, errors etc.', value: '21 (CD) DOCUMENTATION, errors etc.'},
                {label: '22 (CP) LATE POSITIONING', value: '22 (CP) LATE POSITIONING'},
                {label: '23 (CC) LATE ACCEPTANCE', value: '23 (CC) LATE ACCEPTANCE'},
                {label: '24 (CI) INADEQUATE PACKING', value: '24 (CI) INADEQUATE PACKING'},
                {label: '25 (CO) OVERSALES, booking errors', value: '25 (CO) OVERSALES, booking errors'},
                {label: '26 (CU) LATE PREPARATION IN WAREHOUSE', value: '26 (CU) LATE PREPARATION IN WAREHOUSE'},
                {label: '27 (CE) DOCUMENTATION, PACKING etc (Mail Only)', value: '27 (CE) DOCUMENTATION, PACKING etc (Mail Only)'},
                {label: '28 (CL) LATE POSITIONING (Mail Only)', value: '28 (CL) LATE POSITIONING (Mail Only)'},
                {label: '29 (CA) LATE ACCEPTANCE (Mail Only)', value: '29 (CA) LATE ACCEPTANCE (Mail Only)'},
                {label: '31 (GD) AIRCRAFT  DOCUMENTATION  LATE/INACCURATE,  weight  and  balance,  general  declaration,  pax manifest, etc.', value: '31 (GD) AIRCRAFT  DOCUMENTATION  LATE/INACCURATE,  weight  and  balance,  general  declaration,  pax manifest, etc.'},
                {label: '32 (GL) LOADING/UNLOADING, bulky, special load, cabin load, lack of loading staff', value: '32 (GL) LOADING/UNLOADING, bulky, special load, cabin load, lack of loading staff'},
                {label: '33 (GE) LOADING EQUIPMENT, lack of or breakdown, e.g. container pallet loader, lack of staff', value: '33 (GE) LOADING EQUIPMENT, lack of or breakdown, e.g. container pallet loader, lack of staff'},
                {label: '34 (GS) SERVICING EQUIPMENT, lack of or breakdown, lack of staff, e.g. steps', value: '34 (GS) SERVICING EQUIPMENT, lack of or breakdown, lack of staff, e.g. steps'},
                {label: '35 (GC) AIRCRAFT CLEANING', value: '35 (GC) AIRCRAFT CLEANING'},
                {label: '36 (GF) FUELLING/DEFUELLING, fuel supplier', value: '36 (GF) FUELLING/DEFUELLING, fuel supplier'},
                {label: '37 (GB) CATERING, late delivery or loading', value: '37 (GB) CATERING, late delivery or loading'},
                {label: '38 (GU) ULD, lack of or serviceability', value: '38 (GU) ULD, lack of or serviceability'},
                {label: '39 (GT) TECHNICAL EQUIPMENT, lack of or breakdown, lack of staff, e.g. pushback', value: '39 (GT) TECHNICAL EQUIPMENT, lack of or breakdown, lack of staff, e.g. pushback'},
                {label: '41 (TD) AIRCRAFT DEFECTS.', value: '41 (TD) AIRCRAFT DEFECTS.'},
                {label: '42 (TM) SCHEDULED MAINTENANCE, late release.', value: '42 (TM) SCHEDULED MAINTENANCE, late release.'},
                {label: '43 (TN) NON-SCHEDULED  MAINTENANCE,  special  checks  and/or  additional  works  beyond  normal  maintenance schedule.', value: '43 (TN) NON-SCHEDULED  MAINTENANCE,  special  checks  and/or  additional  works  beyond  normal  maintenance schedule.'},
                {label: '44 (TS) SPARES AND MAINTENANCE EQUIPMENT, lack of or breakdown.', value: '44 (TS) SPARES AND MAINTENANCE EQUIPMENT, lack of or breakdown.'},
                {label: '45 (TA) AOG SPARES, to be carried to another station.', value: '45 (TA) AOG SPARES, to be carried to another station.'},
                {label: '46 (TC) AIRCRAFT CHANGE, for technical reasons.', value: '46 (TC) AIRCRAFT CHANGE, for technical reasons.'},
                {label: '47 (TL) STAND-BY AIRCRAFT, lack of planned stand-by aircraft for technical reasons.', value: '47 (TL) STAND-BY AIRCRAFT, lack of planned stand-by aircraft for technical reasons.'},
                {label: '48 (TV) SCHEDULED CABIN CONFIGURATION/VERSION ADJUSTMENTS.', value: '48 (TV) SCHEDULED CABIN CONFIGURATION/VERSION ADJUSTMENTS.'},
                {label: '51 (DF) DAMAGE  DURING  FLIGHT  OPERATIONS,  bird  or  lightning  strike,  turbulence,  heavy  or  overweight  landing, collision during taxiing', value: '51 (DF) DAMAGE  DURING  FLIGHT  OPERATIONS,  bird  or  lightning  strike,  turbulence,  heavy  or  overweight  landing, collision during taxiing'},
                {label: '52 (DG) DAMAGE DURING GROUND OPERATIONS, collisions (other than during taxiing), loading/off-loading damage, contamination, towing, extreme weather conditions', value: '52 (DG) DAMAGE DURING GROUND OPERATIONS, collisions (other than during taxiing), loading/off-loading damage, contamination, towing, extreme weather conditions'},
                {label: '55 (ED) DEPARTURE CONTROL', value: '55 (ED) DEPARTURE CONTROL'},
                {label: '56 (EC) CARGO PREPARATION/DOCUMENTATION', value: '56 (EC) CARGO PREPARATION/DOCUMENTATION'},
                {label: '57 (EF) FLIGHT PLANS', value: '57 (EF) FLIGHT PLANS'},
                {label: '58 (EO) OTHER AUTOMATED SYSTEM', value: '58 (EO) OTHER AUTOMATED SYSTEM'},
                {label: '61 (FP) FLIGHT PLAN, late completion or change of, flight documentation', value: '61 (FP) FLIGHT PLAN, late completion or change of, flight documentation'},
                {label: '62 (FF) OPERATIONAL REQUIREMENTS, fuel, load alteration', value: '62 (FF) OPERATIONAL REQUIREMENTS, fuel, load alteration'},
                {label: '63 (FT) LATE  CREW  BOARDING  OR  DEPARTURE  PROCEDURES,  other  than  connection  and  standby (flight deck or entire crew)', value: '63 (FT) LATE  CREW  BOARDING  OR  DEPARTURE  PROCEDURES,  other  than  connection  and  standby (flight deck or entire crew)'},
                {label: '64 (FS) FLIGHT DECK CREW SHORTAGE, sickness, awaiting standby, flight time limitations, crew meals, valid visa, health documents, etc.', value: '64 (FS) FLIGHT DECK CREW SHORTAGE, sickness, awaiting standby, flight time limitations, crew meals, valid visa, health documents, etc.'},
                {label: '65 (FR) FLIGHT DECK CREW SPECIAL REQUEST, not within operational requirements', value: '65 (FR) FLIGHT DECK CREW SPECIAL REQUEST, not within operational requirements'},
                {label: '66 (FL) LATE  CABIN  CREW  BOARDING  OR  DEPARTURE  PROCEDURES,  other  than  connection  and standby', value: '66 (FL) LATE  CABIN  CREW  BOARDING  OR  DEPARTURE  PROCEDURES,  other  than  connection  and standby'},
                {label: '67 (FC) CABIN CREW SHORTAGE, sickness, awaiting standby, flight time limitations, crew meals, valid visa, health documents, etc.', value: '67 (FC) CABIN CREW SHORTAGE, sickness, awaiting standby, flight time limitations, crew meals, valid visa, health documents, etc.'},
                {label: '68 (FA) CABIN CREW ERROR OR SPECIAL REQUEST, not within operational requirements', value: '68 (FA) CABIN CREW ERROR OR SPECIAL REQUEST, not within operational requirements'},
                {label: '69 (FB) CAPTAIN REQUEST FOR SECURITY CHECK, extraordinary', value: '69 (FB) CAPTAIN REQUEST FOR SECURITY CHECK, extraordinary'},
                {label: '71 (WO) DEPARTURE STATION', value: '71 (WO) DEPARTURE STATION'},
                {label: '72 (WT) DESTINATION STATION', value: '72 (WT) DESTINATION STATION'},
                {label: '73 (WR) EN ROUTE OR ALTERNATE', value: '73 (WR) EN ROUTE OR ALTERNATE'},
                {label: '75 (WI) DE-ICING OF AIRCRAFT, removal of ice and/or snow, frost prevention excluding unserviceability of equipment', value: '75 (WI) DE-ICING OF AIRCRAFT, removal of ice and/or snow, frost prevention excluding unserviceability of equipment'},
                {label: '76 (WS) REMOVAL OF SNOW, ICE, WATER AND SAND FROM AIRPORT', value: '76 (WS) REMOVAL OF SNOW, ICE, WATER AND SAND FROM AIRPORT'},
                {label: '77 (WG) GROUND HANDLING IMPAIRED BY ADVERSE WEATHER CONDITIONS', value: '77 (WG) GROUND HANDLING IMPAIRED BY ADVERSE WEATHER CONDITIONS'},
                {label: '81 (AT) ATFM due to ATC EN-ROUTE DEMAND/CAPACITY, standard demand/capacity problems', value: '81 (AT) ATFM due to ATC EN-ROUTE DEMAND/CAPACITY, standard demand/capacity problems'},
                {label: '82 (AX) ATFM due to ATC STAFF/EQUIPMENT EN-ROUTE, reduced capacity caused by industrial action or staff shortage, equipment failure, military exercise or extraordinary demand due to capacity reduction in neighbouring area', value: '82 (AX) ATFM due to ATC STAFF/EQUIPMENT EN-ROUTE, reduced capacity caused by industrial action or staff shortage, equipment failure, military exercise or extraordinary demand due to capacity reduction in neighbouring area'},
                {label: '83 (AE) ATFM  due  to  RESTRICTION  AT  DESTINATION  AIRPORT,  airport  and/or  runway  closed  due  to obstruction, industrial action, staff shortage, political unrest, noise abatement, night curfew, special flights', value: '83 (AE) ATFM  due  to  RESTRICTION  AT  DESTINATION  AIRPORT,  airport  and/or  runway  closed  due  to obstruction, industrial action, staff shortage, political unrest, noise abatement, night curfew, special flights'},
                {label: '84 (AW) ATFM due to WEATHER AT DESTINATION', value: '84 (AW) ATFM due to WEATHER AT DESTINATION'},
                {label: '85 (AS) MANDATORY SECURITY', value: '85 (AS) MANDATORY SECURITY'},
                {label: '86 (AG) IMMIGRATION, CUSTOMS, HEALTH', value: '86 (AG) IMMIGRATION, CUSTOMS, HEALTH'},
                {label: '87 (AF) AIRPORT FACILITIES, parking stands, ramp congestion, lighting, buildings, gate limitations, etc.', value: '87 (AF) AIRPORT FACILITIES, parking stands, ramp congestion, lighting, buildings, gate limitations, etc.'},
                {label: '88 (AD) RESTRICTIONS AT AIRPORT OF DESTINATION, airport and/or runway closed due to obstruction, industrial action, staff shortage, political unrest, noise abatement, night curfew, special flights', value: '88 (AD) RESTRICTIONS AT AIRPORT OF DESTINATION, airport and/or runway closed due to obstruction, industrial action, staff shortage, political unrest, noise abatement, night curfew, special flights'},
                {label: '89 (AM) RESTRICTIONS  AT  AIRPORT  OF  DEPARTURE  WITH  OR  WITHOUT  ATFM  RESTRICTIONS, including Air Traffic Services, start-up and pushback, airport and/or runway closed due to obstruction or weather1, industrial action, staff shortage, political unrest, noise abatement, night curfew, special flights', value: '89 (AM) RESTRICTIONS  AT  AIRPORT  OF  DEPARTURE  WITH  OR  WITHOUT  ATFM  RESTRICTIONS, including Air Traffic Services, start-up and pushback, airport and/or runway closed due to obstruction or weather1, industrial action, staff shortage, political unrest, noise abatement, night curfew, special flights'},
                {label: '91 (RL) LOAD CONNECTION, awaiting load from another flight', value: '91 (RL) LOAD CONNECTION, awaiting load from another flight'},
                {label: '92 (RT) THROUGH CHECK-IN ERROR, passenger and baggage', value: '92 (RT) THROUGH CHECK-IN ERROR, passenger and baggage'},
                {label: '93 (RA) AIRCRAFT ROTATION, late arrival of aircraft from another flight or previous sector', value: '93 (RA) AIRCRAFT ROTATION, late arrival of aircraft from another flight or previous sector'},
                {label: '94 (RS) CABIN CREW ROTATION, awaiting cabin crew from another flight', value: '94 (RS) CABIN CREW ROTATION, awaiting cabin crew from another flight'},
                {label: '95 (RC) CREW ROTATION, awaiting crew from another flight (flight deck or entire crew)', value: '95 (RC) CREW ROTATION, awaiting crew from another flight (flight deck or entire crew)'},
                {label: '96 (RO) OPERATIONS CONTROL, re-routing, diversion, consolidation, aircraft change for reasons other than technical', value: '96 (RO) OPERATIONS CONTROL, re-routing, diversion, consolidation, aircraft change for reasons other than technical'},
                {label: '97 (MI) INDUSTRIAL ACTION WITH OWN AIRLINE', value: '97 (MI) INDUSTRIAL ACTION WITH OWN AIRLINE'},
                {label: '98 (MO) INDUSTRIAL ACTION OUTSIDE OWN AIRLINE, excluding ATS', value: '98 (MO) INDUSTRIAL ACTION OUTSIDE OWN AIRLINE, excluding ATS'},
                {label: '99 (MX) OTHER REASON, not matching any code above', value: '99 (MX) OTHER REASON, not matching any code above'},
              ],
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
          obj['hours'+index] = {
            value: delay.hours,
            type: this.readonly ? 'inputStandard':'hour',
            props: {
              readonly: this.readonly,
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
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsUnloaded')}`,
          },
          inboundCargoBulkUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkUnloaded')}`,
          }
        },
        outbound:{
          outboundCargoTotalUldsLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsLoaded')}`,
          },
          outboundCargoBulkLoaded:{
            value: '',
            type: 'inputStandard',
            props: {
              mask:'###################',
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkLoaded')}`,
          }
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
        this.delay = this.cargoData.delayList.length > 0
        if(this.cargoData.delayList.length > 0) {
          this.delayList = this.cargoData.delayList
        }
      }
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