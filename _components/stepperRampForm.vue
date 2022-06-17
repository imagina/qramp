<template>
  <div id="stepComponent" class="bg-white dynamicComponent" style="border-radius: 8px;">
    <div v-if="responsive">
      <div class="flex q-px-sm q-py-md">
        <template v-for="(step, index) in steps">
          <div 
            v-if="columns(step.step)"
            class="flex relative-position column items-center"
            style="width:33.33%"
          >
            <hr v-if="[1,2,4,5].includes(step.step)" class="line">
            <q-btn
              :key="index"
              :icon="step.icon"
              size="10px"
              round
              :color="currentTab == tabs[index].name ? 'primary': 'grey-6'"
            >
            </q-btn>
            <p :class="currentTab == tabs[index].name ? 'text-primary': 'text-grey-6'">{{step.title}}</p>
          </div>
        </template>
      </div>
      <i-toolbar @edit="readonly = $event" :id="data.id"></i-toolbar>
      <KeepAlive>
        <component 
          :is="currentTab" 
          :readonly="readonly"
          :ref="setRefs(currentTab)"
          >
        </component>
      </KeepAlive>

    </div>
    <q-stepper
      v-else
      v-model="sp"
      ref="stepper"
      color="primary"
      alternative-labels
      animated
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
          <i-toolbar @edit="readonly = $event" :id="data.id"></i-toolbar>
          <i-flight ref="flight" @isError="error = $event" v-if="step.step == 1" :readonly="readonly"></i-flight>
          <i-cargo ref="cargo" v-if="step.step == 2" :readonly="readonly"></i-cargo>
          <i-services ref="services" @isError="error = $event" v-if="step.step == 3" :readonly="readonly"></i-services>
          <i-equipment ref="equipment" v-if="step.step == 4" :readonly="readonly"></i-equipment>
          <i-crew ref="crew" v-if="step.step == 5" :readonly="readonly"></i-crew>
          <i-remarks ref="remarks" v-if="step.step == 6" :readonly="readonly"></i-remarks>
          <i-signature ref="signature" v-if="step.step == 7" :readonly="readonly"></i-signature>
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
    data:{}
  },
  data() {
    return {
      sp: 1,
      index: 0,
      readonly:false,
      form:{},
      error: false,
      tabs:[
        {name:'iFlight', step: 1},
        {name:'iCargo', step: 2},
        {name:'iServices', step: 3},
        {name:'iEquipment', step: 4},
        {name:'iCrew', step: 5},
        {name:'iRemarks', step: 6},
        {name:'iSignature', step: 7},
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
    setData() {
      switch (this.responsive ? this.currentTab : this.sp) {
        case 1:
          this.responsive ? this.$refs.flight.saveInfo() : this.$refs.flight[0].saveInfo()
          break;
        case 2:
          this.responsive ? this.$refs.cargo.saveInfo() : this.$refs.cargo[0].saveInfo()
          break;
        case 3:
          this.responsive ? this.$refs.services.saveInfo() : this.$refs.services[0].saveInfo()
          break;
        case 4:
          this.responsive ? this.$refs.equipment.saveInfo() : this.$refs.equipment[0].saveInfo()
          break;
        case 5:
          this.responsive ? this.$refs.crew.saveInfo() : this.$refs.crew[0].saveInfo()
          break;
        case 6:
          this.responsive ? this.$refs.remarks.saveInfo() : this.$refs.remarks[0].saveInfo()
          break;
        case 7:
          this.responsive ? this.$refs.signature.saveInfo() : this.$refs.signature[0].saveInfo()
          break;
      }
    },
    setRefs(component) {
      const ref= {
        iFlight:"flight",
        iCargo:"cargo",
        iServices:"services",
        iEquipment:"equipment",
        iCrew:"crew",
        iRemarks:"remarks",
        iSignature:"signature",
      }
      return ref[component]
    },
    next(){
      this.setData()
      setTimeout(()=>{
        if(this.error) return;
        this.index = this.index < 6 ? ++this.index : 6
        this.responsive ? this.sp = this.index : this.sp
        this.responsive ? this.currentTab = this.tabs[this.index].name:this.$refs.stepper.next()
      },500)
    },
    previous(){
      this.index = this.index > 0 ? --this.index : 0
      this.responsive ? this.sp = this.index : this.sp
      this.responsive ? this.currentTab = this.tabs[this.index].name:this.$refs.stepper.previous()
    },
    showSteps(step) {
      const steps = {
        1:'iFlight', 
        2:'iCargo', 
        3:'iServices',
        4:'iEquipment',
        5:'iCrew',
        6:'iRemarks',
        7:'iSignature'
      }
      this.currentTab = steps[step]
      this.sp = step - 1
      this.index = step - 1
    },
    columns(step) {
      if([1,2,3].includes(step) && [0,1,2].includes(this.sp)){
        return true
      }
      if([4,5,6].includes(step) && [3,4,5].includes(this.sp)){
        return true
      }
      if([7].includes(step) && [6].includes(this.sp)){
        return true
      }
      
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
    .q-stepper--horizontal .q-stepper__line 
      padding 17px
      
      span
        position absolute
        font-size 20px

</style>

