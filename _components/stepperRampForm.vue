<template>
  <div id="stepComponent" class="bg-white dynamicComponent stepper-modal">
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
            class="hidden" 
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
import iFlight from '../_components/flight.vue'
import iCargo from '../_components/cargo.vue'
import iCrew from '../_components/crew.vue'
import iEquipment from '../_components/equipment.vue'
import iServices from '../_components/services.vue'
import iRemarks from '../_components/remarks.vue'
import iSignature from '../_components/signature.vue'
import responsive from '../_mixins/responsive.js'
import iToolbar from '../_components/toolbar.vue'
import { 
  STEP_FLIGTH, 
  STEP_CARGO,
  STEP_SERVICE,
  STEP_EQUIPMENT,
  STEP_CREW,
  STEP_REMARKS,
  STEP_SIGNATURE
}  from '../_components/model/constants.js'
import qRampStore from '../_store/qRampStore.js'

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
    async setData() {
      switch (this.sp) {
        case 1:
          const error = await this.$refs.flight[0].menssageValidate();
          await this.$refs.flight[0].saveInfo(error);
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
      qRampStore().showLoading();
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
    async next() {
      await this.setData();
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
      this.disabled = true;
      const request = this.data.update ? this.$crud.update(route, this.data.workOrderId, formatData) 
        :this.$crud.create(route, formatData);
      request.then(res => {
        this.$emit('loading', true)
        this.clean()
        this.$emit('close-modal', false)
        const message = this.data.update ? `${this.$tr('isite.cms.message.recordUpdated')}` 
          : `${this.$tr('isite.cms.message.recordCreated')}`;
        this.$alert.info({message})
         this.$emit('loading', false)
         this.disabled = false;
         qRampStore().hideLoading();
      })
      .catch(err => {
        qRampStore().hideLoading();
         this.disabled = false;
         this.$emit('loading', false)
        this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoUpdated')}`})
        console.log('SEND INFO ERROR:', err)
      })
    },
  },
}
</script>
<style>
.stepper-modal .q-stepper .q-stepper-title {
  @apply tw-relative tw-mb-6 tw-overflow-x-hidden;
}
.stepper-modal .q-stepper .q-stepper-title > h3 {
  @apply tw-text-lg tw-font-bold tw-bg-white tw-pr-4 tw-inline-block tw-z-20 tw-relative;
}
.stepper-modal .q-stepper .q-stepper-title > div {
  @apply tw-block tw-w-full tw-h-px tw-bg-gray-200 tw-top-2/4 tw-absolute tw-z-10;
}
.stepper-modal .q-stepper {
  @apply tw-border-0 tw-shadow-none;
}
.stepper-modal  .q-stepper__header {
  @apply tw-border-b-0;
}
.stepper-modal .q-stepper__tab  .q-stepper__dot {
  @apply md:tw-w-10 md:tw-h-10 tw-font-bold md:tw-text-base tw-border-0;
}
.stepper-modal .q-stepper__header--contracted .q-stepper__tab:first-child .q-stepper__dot {
  @apply tw-transform tw-translate-x-3.5;
}
.stepper-modal .q-stepper__header--contracted .q-stepper__tab:last-child .q-stepper__dot {
  @apply tw-transform tw--translate-x-3.5;
}
.stepper-modal .q-stepper__tab:not(.q-stepper__tab--active) .q-stepper__dot {
  @apply tw-border-2;
  background-color: #F1F4FA;
  border-color: #F1F4FA;
}
.stepper-modal .q-stepper__tab:not(.q-stepper__tab--active) .q-stepper__dot span {
  color: #8A98C3; font-size: 20px;
}
.stepper-modal .q-stepper__tab--active .q-stepper__dot {
  @apply tw-border-current tw-border-2;
}
.stepper-modal .text-red.q-stepper__tab--active .q-stepper__dot {
  @apply tw-border-current tw-border-2;
}
.stepper-modal .q-stepper__tab--active .q-stepper__dot span {
  @apply tw-text-white;
}
.stepper-modal .q-stepper .q-stepper__dot:before {
  @apply tw-mr-8;
}
.stepper-modal .q-stepper .q-stepper__dot:after {
  @apply tw-ml-8;
}
.stepper-modal .q-stepper .q-stepper__line:after, 
.stepper-modal .q-stepper .q-stepper__line:before {
  @apply tw-h-0.5;
}
.stepper-modal .q-stepper__title {
  @apply tw-text-base tw-font-normal tw-text-black;
}
.stepper-modal .q-stepper__step-inner {
  @apply tw-py-4 lg:tw-py-5 tw-px-0 lg:tw-px-0;
}
.stepper-modal .q-stepper__step-inner .q-form {
  @apply tw-px-4 lg:tw-px-5;
} 
#formRampComponent .master-dialog__actions {
  @apply tw-py-4 tw-px-7;
  background-color: #F1F4FA; 
  position: absolute;
  width: 100%;
  bottom: 0;
}
#formRampComponent .master-dialog__body {
  @apply tw-p-0 tw-m-0;
}
</style>

