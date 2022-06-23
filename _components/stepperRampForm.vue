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
          <i-toolbar @edit="readonly = $event" @send-info="sendInfo()":update="data.update"></i-toolbar>
          <i-flight ref="flight" @isError="error = $event" v-if="step.step == 1" :flightData="step.form" :readonly="readonly"></i-flight>
          <i-cargo ref="cargo" v-if="step.step == 2" :cargoData="step.form" :readonly="readonly"></i-cargo>
          <i-services ref="services" @isError="error = $event" v-if="step.step == 3" :servicesData="step.form" :readonly="readonly"></i-services>
          <i-equipment ref="equipment" v-if="step.step == 4" :equipmentData="step.form" :readonly="readonly"></i-equipment>
          <i-crew ref="crew" v-if="step.step == 5" :crewData="step.form" :readonly="readonly"></i-crew>
          <i-remarks ref="remarks" v-if="step.step == 6" :remarksData="step.form" :readonly="readonly"></i-remarks>
          <i-signature ref="signature" v-if="step.step == 7" :signatureData="step.form" :readonly="readonly" @send-info="sendInfo()"></i-signature>
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
    id:{}
  },
  data() {
    return {
      readonly:false,
      form:{},
      error: false,
      sp:1
    }
  },
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
      this.$emit('loading', true)
      const data = JSON.parse(JSON.stringify( this.$store.state.qrampApp))
      const formatData = this.formatData({
        ...data.form,
        adHoc: data.form.adHoc == 1,
        customCustomer: data.form.customCustomer  == 1,
        delay: data.delay,
        workOrderItems: [
          ...data.services,
          ...data.equipments,
          ...data.crew,
        ]
      })
      this.$crud.post('apiRoutes.qramp.workOrders',{attributes: formatData})
      .then(res => {
        this.$emit('loading', true)
        this.clean()
        this.$emit('close-modal', false)
        this.$alert.info({message: `${this.$tr('isite.cms.message.recordCreated')}`})
      })
      .catch(err => {
        console.log('SEND INFO ERROR:', err)
      })
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
    }
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

