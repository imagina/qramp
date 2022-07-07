<template>
  <div id="stepComponent" class="bg-white dynamicComponent" style="border-radius: 8px;">
    <q-stepper
      v-model="sp"
      ref="stepper"
      color="primary"
      alternative-labels
      animated
      :contracted="$q.screen.lt.md"
      keep-alive
    >
      <template v-for="(step, index) in steps">
        <q-step
          :key="index"
          :name="index + 1"
          :title="step.title"
          :icon="step.icon"
          :active-color="error ? 'red' : 'primary'"
        >
          <i-toolbar 
            @edit="readonly = $event" 
            @send-info="sendInfo()"
            :update="data.update"
          />
          <i-flight 
            ref="flight" 
            @isError="error = $event" 
            v-if="step.step == STEP_FLIGTH" 
            :flightData="step.form" 
            :readonly="readonly"
          />
          <i-cargo 
            ref="cargo" 
            v-if="step.step == STEP_CARGO" 
            :cargoData="step.form" 
            :readonly="readonly"
          />
          <i-services 
            ref="services" 
            @isError="error = $event" 
            v-if="step.step == STEP_SERVICE" 
            :servicesData="step.form" 
            :readonly="readonly"
          />
          <i-equipment 
            ref="equipment" 
            v-if="step.step == STEP_EQUIPMENT" 
            :equipmentData="step.form" 
            :readonly="readonly" 
          />
          <i-crew 
            ref="crew" 
            v-if="step.step == STEP_CREW" 
            :crewData="step.form" 
            :readonly="readonly" 
          />
          <i-remarks 
            ref="remarks" 
            v-if="step.step == STEP_REMARKS" 
            :remarksData="step.form" 
            :readonly="readonly" 
          />
          <i-signature 
            ref="signature" 
            v-if="step.step == STEP_SIGNATURE" 
            :signatureData="step.form" 
            :readonly="readonly" 
            @send-info="sendInfo()" 
          />
        </q-step>
      </template>
    </q-stepper>
  </div>
</template>
<script>
import iFlight from '@imagina/qramp/_components/flight.vue'
import iCargo from '@imagina/qramp/_components/cargo.vue'
import iCrew from '@imagina/qramp/_components/crew.vue'
import iEquipment from '@imagina/qramp/_components/equipment.vue'
import iServices from '@imagina/qramp/_components/services.vue'
import iRemarks from '@imagina/qramp/_components/remarks.vue'
import iSignature from '@imagina/qramp/_components/signature.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
import iToolbar from '@imagina/qramp/_components/toolbar.vue'
import { 
  STEP_FLIGTH, 
  STEP_CARGO,
  STEP_SERVICE,
  STEP_EQUIPMENT,
  STEP_CREW,
  STEP_REMARKS,
  STEP_SIGNATURE
}  from '@imagina/qramp/_components/model/constants.js'
export default {
  name:'stepperRampForm',
  components:{
    iFlight,
    iCargo,
    iServices,
    iEquipment,
    iCrew,
    iRemarks,
    iSignature,
    iToolbar
  },
  mixins:[responsive],
  props:{
    steps:{},
    data:{},
  },
  data() {
    return {
      readonly:false,
      form:{},
      error: false,
      sp:1,
      STEP_FLIGTH, 
      STEP_CARGO,
      STEP_SERVICE,
      STEP_EQUIPMENT,
      STEP_CREW,
      STEP_REMARKS,
      STEP_SIGNATURE,
      disabled: false,
    }
  },
  inject: ['disabledReadonly'],
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  watch: {
    sp(value) {
      this.$emit('sp', value)
    }
  },
  methods: {
    init(){
      this.$emit('sp', this.sp)
    },
    setData() {
      switch (this.sp) {
        case 1:
          this.$refs.flight[0].saveInfo()
          break;
        case 2:
          this.$refs.cargo[0].saveInfo()
          break;
        case 3:
          this.$refs.services[0].saveInfo()
          break;
        case 4:
          this.$refs.equipment[0].saveInfo()
          break;
        case 5:
          this.$refs.crew[0].saveInfo()
          break;
        case 6:
          this.$refs.remarks[0].saveInfo()
          break;
        case 7:
          this.$refs.signature[0].saveInfo()
          break;
      }
    },
    camelToSnakeCase(str) {return str.replace(/[A-Z]/g,(letter) => `_${letter.toLowerCase()}`)},
    formatData(data) {
      const obj = {}
      for (let key in data){
        const name = this.camelToSnakeCase(key)
        obj[name] = data[key]
      }
      return obj
    },
    sendInfo() {
      const data = JSON.parse(JSON.stringify( this.$store.state.qrampApp))
      const formatData = {
        ...data.form,
        adHoc: data.form.adHoc == 1,
        customCustomer: data.form.customCustomer  == 1,
        delay: data.delay,
        workOrderItems: [
          ...data.services,
          ...data.equipments,
          ...data.crew,
        ]
      }
      if (this.data.update) {
        formatData.id = this.data.workOrderId;
      }
      this.sendWorkOrder(formatData);
    },
    clean(){
      this.$store.commit('qrampApp/SET_FORM_FLIGHT', {} )
      this.$store.commit('qrampApp/SET_FORM_SERVICES', [] )
      this.$store.commit('qrampApp/SET_FORM_EQUIPMENTS', [] )
      this.$store.commit('qrampApp/SET_FORM_CREW', [] )
      this.$store.commit('qrampApp/SET_FORM_DELAY', [] )
      this.$emit('close', false)
    },
    next(){
      this.setData()
      setTimeout(()=>{
        if(this.error) return;
        this.$refs.stepper.next()
      },500)
    },
    previous(){
      this.$refs.stepper.previous()
    },
    sendWorkOrder(formatData) {
      const route = 'apiRoutes.qramp.workOrders';
      if(this.disabledReadonly) {
        this.$emit('close-modal', false);
        this.$emit('loading', false);
        return;
      }
      if(this.disabled) return;

      const request = this.data.update ? this.$crud.update(route, this.data.workOrderId, formatData) 
        :this.$crud.create(route, formatData);
      request.then(res => {
         this.disabled = true;
        this.$emit('loading', true)
        this.clean()
        this.$emit('close-modal', false)
        const message = this.data.update ? `${this.$tr('isite.cms.message.recordUpdated')}` 
          : `${this.$tr('isite.cms.message.recordCreated')}`;
        this.$alert.info({message})
         this.$emit('loading', false)
         this.disabled = false;
      })
      .catch(err => {
         this.disabled = false;
         this.$emit('loading', false)
        this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoUpdated')}`})
        console.log('SEND INFO ERROR:', err)
      })
    },
  },
}
</script>
<style lang="stylus">
  #stepComponent
    hr.line
      position absolute
      border-top 1px solid #9e9e9e
      width 50%
      left 73%
      top 11%
    .q-stepper__header--contracted .q-stepper__tab:first-child .q-stepper__dot
      transform: translateX(6px)
    .q-stepper__header--contracted .q-stepper__tab:last-child .q-stepper__dot
      transform: translateX(-6px)
    .q-stepper--horizontal .q-stepper__line 
      padding 17px
      
      span
        position absolute
        font-size 20px

</style>

