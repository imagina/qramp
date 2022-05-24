<template>
  <master-modal id="formRampComponent" v-model="show" v-bind="modalProps"
                :loading="loading" @hide="clear" :actions="actions" :width="'90vw'" :maximized="responsive">
    <stepper-ramp-form @sp="sp = $event" ref="stepper" :steps="steppers" />
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
      sp:null
    }
  },
  computed:{
    steppers () {
      return [
        {
          title:'Flight',
          icon:'fas fa-plane',
          step: 1,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Cargo Op.',
          icon:'rv_hookup',
          step: 2,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Services',
          icon:'fas fa-briefcase',
          step: 3,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Equipment',
          icon:'extension',
          step: 4,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Crew',
          icon:'fas fa-users',
          step: 5,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Remark',
          icon:'far fa-edit',
          step: 6,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title: this.$tr('ifly.cms.label.signature'),
          icon:'draw',
          step: 7,
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        }
      ]
    },
    nextLabel(){
      if(this.responsive) {
        console.log(this.sp)
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
      this.show = true
      this.modalProps = params.modalProps
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


