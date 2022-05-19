<template>
  <master-modal id="fromRampComponent" v-model="show" custom-position width="90%" v-bind="modalProps"
                :loading="loading" @hide="clear" :actions="actions">
    <stepper-ramp-form @sp="sp = $event" ref="stepper" :steps="steppers" />
  </master-modal>
</template>
<script>
import stepperRampForm from '@imagina/qramp/_components/stepperRampForm.vue'
export default {
  name:'formOrders',
  components: { stepperRampForm },
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
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Cargo Op.',
          icon:'rv_hookup',
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Services',
          icon:'fas fa-briefcase',
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Equipment',
          icon:'extension',
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Crew',
          icon:'fas fa-users',
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title:'Remark',
          icon:'far fa-edit',
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        },
        {
          title: this.$tr('ifly.cms.label.signature'),
          icon:'draw',
          toolbar:{
            title:'Work Order Details |',
            titleColor:'#84abe5',
            code:'000-115-asd5-ssd21',
          }
        }
      ]
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
            label: this.sp === this.steppers.length ? this.$tr('isite.cms.label.done') : this.$tr('isite.cms.label.next'),
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
  #fromRampComponent
    .boundColor
      background-color #F1F4FA
</style>


