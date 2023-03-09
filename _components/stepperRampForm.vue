<template>
  <div id="stepComponent" class="bg-white dynamicComponent stepper-modal">
    <q-stepper
      v-model="sp"
      ref="stepper"
      color="primary"
      header-nav
      alternative-labels
      animated
      :contracted="$q.screen.lt.md"
      keep-alive
    >
        <q-step
          v-for="(step, index) in steps"
          :key="index"
          :name="index + 1"
          :title="step.title"
          :icon="step.icon"
          :active-color="error ? 'red' : 'primary'"
        >
          <component
            :ref="step.ref" 
            :is="step.component"
            @isError="error = $event"
            :dataCompoment="step.form || null"
            :readonly="readonly"
            @send-info="sendInfo()" 
          />
        </q-step>
    </q-stepper>
  </div>
</template>
<script>
import responsive from '../_mixins/responsive.js'
import { 
  STEP_FLIGTH,
  STEP_SERVICE,
  STEP_REMARKS,
  STEP_SIGNATURE
}  from '../_components/model/constants.js'
import qRampStore from '../_store/qRampStore.js'
import serviceList from './serviceList/index.vue';
import serviceListStore from './serviceList/store/serviceList.ts';
import cargoStore from './cargo/store/cargo.ts';
import {
  FlightformFieldModel, 
  HalfTurnInBountModel, 
  HalfTurnOutBountModel,
  FlightformFieldPassengerModel
} from './model/constants.js';
import storePassengers from './passengers/stores/index.ts';


export default {
  name:'stepperRampForm',
  components:{},
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
      STEP_SERVICE,
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
    async sp(value, oldStep) {
      await this.saveFormData(oldStep, true);
      this.$emit('sp', value);
    }
  },
  computed: {
    isPassenger() {
      return storePassengers.isPassenger.get();
    },
    stepError: {
      get() {
        return this.error;
      },
      set(value) {
        this.error = value;
      }
    },
  },
  methods: {
    init(){
      this.$emit('sp', this.sp)
    },
    async setData() {
      await this.saveFormData(this.sp);
    },
    async saveFormData(step, individual = false) {
      switch (step) {
        case STEP_FLIGTH:
          if(this.$refs.flight) {
            if(individual) {
              this.$refs.flight[0].saveIndividual();
              return;
            };
            const error = await this.$refs.flight[0].menssageValidate();
            await this.$refs.flight[0].saveInfo(error);
          }
          break;
        case STEP_REMARKS:
          this.$refs.remarks[0].saveInfo()
          break;
        case STEP_SIGNATURE:
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
    async sendInfo() {
      try {
        const serviceList = await serviceListStore().getServiceListSelected();
        qRampStore().showLoading();     
        const validateAllFieldsRequiredByStep = await this.validateAllFieldsRequiredByStep();
        if(validateAllFieldsRequiredByStep) return;
        const data = JSON.parse(JSON.stringify(this.$store.state.qrampApp));
        const dataCargo = cargoStore().payload();
        data.form.statusId = qRampStore().getStatusId();
        const formatData = {
          ...data.form,
          ...dataCargo.cargo,
          adHoc: data.form.adHoc == 1,
          customCustomer: data.form.customCustomer  == 1,
          delay: dataCargo.delay,
          workOrderItems: [
            ...serviceList
          ]
        }
        if (this.data.update) {
          formatData.id = this.data.workOrderId;
        }
        this.sendWorkOrder(formatData);
      } catch (error) {
        qRampStore().hideLoading();
        console.log(error);
      }
    },
    clean(){
      cargoStore().reset();
      this.$store.commit('qrampApp/SET_FORM_FLIGHT', {} )
      this.$emit('close', false)
    },
    async next() {
      await this.setData();
      setTimeout(()=>{
        if(this.error) {
          if(this.sp === STEP_SERVICE) {
            const validateDateService = this.validateFulldate();
            if(!validateDateService) {
              this.$alert.error({message: this.$tr('Dates must have this format: MM/DD/YYYY HH:mm')});
            }
          }
          return
        };
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
      this.$emit('loading', true)
      const request = this.data.update ? this.$crud.update(route, this.data.workOrderId, formatData) 
        :this.$crud.create(route, formatData);
      request.then(res => {
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
    validateFulldate() {
      return new Promise(async (resolve) => {
        let validate = true;
        const services = await serviceListStore().getServiceItems(serviceList);
        services.forEach((service) => {
          service.work_order_item_attributes.forEach((attr) => {
            if(attr.type === 'fullDate') {
              if(!this.$moment(attr.value, 'MM/DD/YYYY HH:mm', true).isValid()) {
                  validate = false;
                  return;
              }
            }
          })
        })
        return resolve(validate);
      })
    },
    async validateAllFieldsRequiredByStep() {
      try {
        const flightForm = this.$store.state.qrampApp.form;
        let flightformField = this.isPassenger ? FlightformFieldPassengerModel: FlightformFieldModel;
        const halfTurnInBount = HalfTurnInBountModel;
        const halfTurnOutBount = HalfTurnOutBountModel;
        if(flightForm.operationTypeId == 3) {
          flightformField = flightformField.concat(halfTurnInBount);
        }
        if(flightForm.operationTypeId == 4) {
          flightformField = flightformField.concat(halfTurnOutBount);
        }
        if(flightForm.operationTypeId == 2
          || flightForm.operationTypeId == 1
          || flightForm.operationTypeId == 6
          || flightForm.operationTypeId == 5) {
          const bount = halfTurnInBount.concat(halfTurnOutBount);
          flightformField = flightformField.concat(bount);
        }
        const validateflightform = flightformField
          .some(item => flightForm[item] === null || flightForm[item] === '')
        if(validateflightform) {
          this.error = true;
          await this.setStep(STEP_FLIGTH);
          qRampStore().hideLoading();
          await this.setData();
          this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
          return true;
        }
        const validateDateService = await this.validateFulldate();
        const service = await serviceListStore().getServiceItems(serviceList);
        if(service.length === 0) {
          await this.setStep(STEP_SERVICE);
          this.error = true;
          qRampStore().hideLoading();
          await this.setData();
          this.$alert.error({message: this.$tr('Please at least select one service')});
          return true;
        }
        if(!validateDateService) {
          this.$alert.error({message: this.$tr('Dates must have this format: MM/DD/YYYY HH:mm')});
          await this.setStep(STEP_SERVICE);
          this.error = true;
          await this.setData();
          qRampStore().hideLoading();
          return true;
        }
        this.error = false;
        return false;
      } catch (error) {
        console.log(error);
        qRampStore().hideLoading();
      }
    },
    async setStep(value) {
      this.sp = value;
    },
    isError(value) {
      this.stepError = value;
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
.stepper-modal .q-stepper__tab .q-stepper__dot {
  @apply md:tw-w-10 md:tw-h-10 tw-font-bold md:tw-text-base tw-border-0;
}
.stepper-modal .q-stepper__tab .q-stepper__dot .q-icon {
  @apply tw-text-xs sm:tw-text-sm md:tw-text-xl;
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
  @apply lg:tw-mr-8;
}
.stepper-modal .q-stepper .q-stepper__dot:after {
  @apply lg:tw-ml-8;
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
  @apply tw-py-4 tw-px-7 tw-absolute tw-w-full tw-bottom-0;
  background-color: #F1F4FA;
}
#formRampComponent .master-dialog__body {
  @apply tw-p-0 tw-m-0;
}
</style>

