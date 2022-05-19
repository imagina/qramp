<template>
  <div id="stepComponent">
    <div v-if="responsive">
      <component 
        class="bg-white dynamicComponent" 
        :is="currentTab" 
        :toolbar="steps[this.index]"
        style="border-radius: 8px;"
        >
      </component>
    </div>
    <q-stepper
      v-else
      v-model="sp"
      ref="stepper"
      color="primary"
      alternative-labels
      animated
    >
      <template v-for="(step, index) in steps">
        <q-step
          :key="index"
          :name="index + 1"
          :title="step.title"
          :icon="step.icon"
        >
          <i-flight v-if="index + 1 == 1" :toolbar="step"></i-flight>
          <i-cargo v-if="index + 1 == 2" :toolbar="step"></i-cargo>
          <i-services v-if="index + 1 == 3" :toolbar="step"></i-services>
          <i-equipment v-if="index + 1 == 4" :toolbar="step"></i-equipment>
          <i-crew v-if="index + 1 == 5" :toolbar="step"></i-crew>
          <i-remarks v-if="index + 1 == 6" :toolbar="step"></i-remarks>
          <i-signature v-if="index + 1 == 7" :toolbar="step"></i-signature>
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
export default {
  name:'stepperRampForm',
  components:{
    iFlight,
    iCargo,
    iCrew,
    iEquipment,
    iServices,
    iRemarks,
    iSignature,
  },
  mixins:[responsive],
  props:{
    steps:{},
  },
  data() {
    return {
      sp: 1,
      index: 0,
      form:{},
      tabs:[
        'iFlight',
        'iCargo',
        'iCrew',
        'iEquipment',
        'iServices',
        'iRemarks',
        'iSignature',
      ],
      currentTab: 'iFlight'
    }
  },
  watch: {
    sp(value) {
      this.$emit('sp', value)
    }
  },
  mounted() {
    this.$nextTick(function () {
      this.init()
    })
  },
  methods: {
    init(){
      this.$emit('sp', this.sp)
    },
    next(){
      this.index = this.index < 6 ? ++this.index : 6
      this.responsive ? this.sp = this.index : this.sp
      this.responsive ? this.currentTab = this.tabs[this.index]:this.$refs.stepper.next()
      console.log(this.index)
    },
    previous(){
      this.index = this.index > 0 ? --this.index : 0
      this.responsive ? this.sp = this.index : this.sp
      this.responsive ? this.currentTab = this.tabs[this.index]:this.$refs.stepper.previous()
      console.log(this.index)
    }
  },
}
</script>
<style lang="stylus">
  .q-stepper--horizontal .q-stepper__step-inner
    padding 0
    .order-color
      color #84abe5
    q-stepper--horizontal > .q-stepper__nav 
      padding: 12px 16px 12px;
</style>

