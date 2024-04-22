<template>
  <div id="stepComponent"
       class="
        bg-white
        dynamicComponent
        stepper-modal"
  >
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
  STEP_FLIGHT,
  STEP_SERVICE,
  STEP_REMARKS,
  STEP_SIGNATURE,
  BUSINESS_UNIT_PASSENGER,
  BUSINESS_UNIT_RAMP,
  COMPANY_PASSENGER,
  COMPANY_RAMP,
  OPERATION_TYPE_OTHER
} from '../_components/model/constants.js'
import qRampStore from '../_store/qRampStore.js'
import serviceListStore from './serviceList/store/serviceList.ts';
import cargoStore from './cargo/store/cargo.ts';
import {
  FlightformFieldModel,
  HalfTurnInBountModel,
  HalfTurnOutBountModel,
  FlightformFieldPassengerModel,
  HalfTurnInBountPassengerModel,
  HalfTurnOutBountPassengerModel
} from './model/constants.js';
import remarkStore from './remarks/store.ts';
import { cacheOffline } from 'src/plugins/utils';
import workOrderList from '../_store/actions/workOrderList.ts'

export default {
  name: 'stepperRampForm',
  components: {},
  mixins: [responsive],
  props: {
    steps: {},
    data: {},
  },
  emits: ['sp', 'close','close-modal','loading','getWorkOrders'],
  data() {
    return {
      readonly: false,
      form: {},
      error: false,
      sp: 1,
      STEP_FLIGHT,
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
    isAppOffline() {
      return this.$store.state.qofflineMaster.isAppOffline;
    },
    isPassenger() {
      return qRampStore().getIsPassenger();
    },
    filterBusinessUnit() {
      return this.isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;
    },
    filterCompany() {
      return this.isPassenger ? COMPANY_PASSENGER : COMPANY_RAMP;
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
    init() {
      this.$emit('sp', this.sp)
    },
    parseDateOfflineWO(dateWO){
      if (!dateWO && !dateWO?.includes('T')) return dateWO;
      const splitDate = dateWO.split(" ");
      const [date, hour] = splitDate;
      const newDate = new Date(date).toLocaleDateString('fr-CA');
      return `${newDate}T${hour}`;
    },
    async setData() {
      await this.saveFormData(this.sp);
    },
    async saveFormData(step, individual = false) {
      switch (step) {
        case STEP_FLIGHT:
          if (this.$refs.flight) {
            if (individual) {
              this.$refs.flight[0].saveIndividual();
              return;
            }
            ;
            const error = await this.$refs.flight[0].menssageValidate();
            await this.$refs.flight[0].saveInfo(error);
          }
          break;
        case STEP_SIGNATURE:
          if (this.$refs.signature) {
            this.$refs.signature[0].saveInfo()
          }
          break;
      }
    },
    camelToSnakeCase(str) {
      return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`)
    },
    formatData(data) {
      const obj = {}
      for (let key in data) {
        const name = this.camelToSnakeCase(key)
        obj[name] = data[key]
      }
      return obj
    },
    async sendInfo() {
      try {
        const businessUnitId = this.isPassenger ? { businessUnitId : BUSINESS_UNIT_PASSENGER } : {};
        const remarks = remarkStore().getForm();
        const serviceList = await serviceListStore().getServiceListSelected();
        qRampStore().showLoading();
        const validateAllFieldsRequiredByStep = await this.validateAllFieldsRequiredByStep();
        if (validateAllFieldsRequiredByStep) return;
        const data = JSON.parse(JSON.stringify(this.$store.state.qrampApp));
        const dataCargo = cargoStore().payload();
        data.form.statusId = qRampStore().getStatusId();
        let formatData = {
          ...data.form,
          ...dataCargo.cargo,
          ...remarks,
          adHoc: data.form.adHoc == 1,
          customCustomer: data.form.customCustomer == 1,
          delay: dataCargo.delay,
          ourDelay: dataCargo.ourDelay,
          delayComment: dataCargo.delayComment,
          workOrderItems: [
            ...serviceList
          ],
          companyId: this.filterCompany,
          ...businessUnitId,
        }

        if (this.isAppOffline) {
          formatData.titleOffline = this.$tr("ifly.cms.form.updateWorkOrder");
        }

        if (this.data.update) {
          formatData.id = this.data.workOrderId;
        }
        const service = await serviceListStore().getServiceItems();
        if (this.isPassenger && service.length === 0) {
          this.$alert.warning({
            mode: "modal",
            message: 'Surely you want to save the work order without services',
            actions: [
              {
                label: this.$tr('isite.cms.label.cancel'),
                color: 'grey-8',
                handler: async () => {
                  qRampStore().hideLoading();
                },
              },
              {
                label: this.$tr("isite.cms.label.yes"),
                color: "primary",
                handler: async () => {
                  await this.sendWorkOrder(formatData);
                },
              },
            ],
          });
        } else {
          await this.sendWorkOrder(formatData);
        }
        return formatData;
      } catch (error) {
        qRampStore().hideLoading();
        console.log(error);
      }
    },
    clean() {
      cargoStore().reset();
      this.$store.commit('qrampApp/SET_FORM_FLIGHT', {})
      this.$emit('close', false)
    },
    async next() {
      await this.setData();
      setTimeout(() => {
        if (this.error) {
          if (this.sp === STEP_SERVICE) {
            const validateDateService = this.validateFulldate();
            if (!validateDateService) {
              this.$alert.error({message: this.$tr('Dates must have this format: MM/DD/YYYY HH:mm')});
            }
          }
          return
        }
        ;
        this.$refs.stepper.next()
      }, 500)
    },
    previous() {
      this.$refs.stepper.previous()
    },
    async updateDataInCache(route, data) {
      const formatDataOffline = structuredClone(data);
      formatDataOffline.offline = true;
      const inboundBlockIn = this.parseDateOfflineWO(formatDataOffline.inboundBlockIn);
      const inboundScheduledArrival = this.parseDateOfflineWO(formatDataOffline.inboundScheduledArrival);
      const outboundBlockOut = this.parseDateOfflineWO(formatDataOffline.outboundBlockOut);
      const outboundScheduledDeparture = this.parseDateOfflineWO(formatDataOffline.outboundScheduledDeparture);
      const workOrder = {
        ...formatDataOffline,
        inboundBlockIn,
        inboundScheduledArrival,
        outboundBlockOut,
        outboundScheduledDeparture
      };
      const camelCaseFormatData = Object.values(this.$helper.snakeToCamelCaseKeys(workOrder.workOrderItems));
      workOrder.workOrderItems = camelCaseFormatData;
      await cacheOffline.updateRecord(route, workOrder, workOrder?.id);
    },
    async sendWorkOrder(formatData) {
      const ROUTE = 'apiRoutes.qramp.workOrders';
      const paramsKeyCache = {
            include: 'responsible,workOrderItems,workOrderItems.workOrderItemAttributes',
            filter: {
                businessUnitId: { operator: '!=', value: 8 },
                date: {
                    field: "created_at",
                    type: "5daysAroundToday",
                    from: null,
                    to: null
                },
                order: {
                    field: "id",
                    way: "desc"
                },
                withoutDefaultInclude: true,
            },
            page: 1
        }
        const key = `${ROUTE}::requestParams[${JSON.stringify(paramsKeyCache)}]`
      const titleOffline = qRampStore().getTitleOffline();
      const params = {params: {titleOffline}};
      if (this.disabledReadonly) {
        this.$emit('close-modal', false);
        this.$emit('loading', false);
        return;
      }
      if (this.disabled) return;
      this.disabled = true;
      this.$emit('loading', true)

      await this.updateDataInCache(key, formatData)

      const request = this.data.update
        ? this.$crud.update(ROUTE, this.data.workOrderId, formatData, params)
        : this.$crud.create(ROUTE, formatData, params);

      await request.then(async res => {
        this.clean()
        this.$emit('close-modal', false)
        const message = this.data.update ? `${this.$tr('isite.cms.message.recordUpdated')}`
            : `${this.$tr('isite.cms.message.recordCreated')}`;
        this.$alert.info({message})
        this.$emit('loading', false)
        this.disabled = false;
        qRampStore().hideLoading();
        await this.$emit('getWorkOrders', formatData);
      })
      .catch(async err => {
        qRampStore().hideLoading();
        this.disabled = false;
        this.$emit('loading', false)
        this.$emit('close-modal', false);
        await this.$emit('getWorkOrders', formatData);
        if (!this.isAppOffline) {
          this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoUpdated')}`})
          console.log('SEND INFO ERROR:', err)
        }
      })
    },
    validateFulldate() {
      return new Promise(async (resolve) => {
        let validate = true;
        const services = await serviceListStore().getServiceItems();
        services.forEach((service) => {
          service.work_order_item_attributes.forEach((attr) => {
            if (attr.type === 'fullDate') {
              if (!this.$moment(attr.value, 'MM/DD/YYYY HH:mm', true).isValid()) {
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
        let flightformField = this.isPassenger ? FlightformFieldPassengerModel : FlightformFieldModel;
        const halfTurnInBount = this.isPassenger || flightForm.operationTypeId == OPERATION_TYPE_OTHER
        ?  HalfTurnInBountPassengerModel : HalfTurnInBountModel;
        const halfTurnOutBount = this.isPassenger || flightForm.operationTypeId == OPERATION_TYPE_OTHER
        ? HalfTurnOutBountPassengerModel : HalfTurnOutBountModel;

        if(!this.isPassenger && flightForm.operationTypeId != OPERATION_TYPE_OTHER) {
          flightformField = flightformField.concat(['inboundBlockIn']);
        }

        if(!flightForm.customCustomerName) {
          flightformField = flightformField.concat(['customerId']);
        }

        const operationType = workOrderList().getOperationTypeList()
          .find(item => item.id === Number(flightForm.operationTypeId));
        const type = operationType?.options?.type;

        if(type) {
          if(type === 'full'){
            const bount = halfTurnInBount.concat(halfTurnOutBount);
            flightformField = flightformField.concat(bount);
          }
          if(type === 'inbound') {
            flightformField = flightformField.concat(halfTurnInBount);
          }
          if(type === 'outbound') {
            flightformField = flightformField.concat(halfTurnOutBount);
          }
        }
        const cancellationType =  flightForm.cancellationType;
        if(cancellationType) {
          flightformField = flightformField.concat(['cancellationNoticeTime']);
        }
        const validateflightform = flightformField
            .some(item => flightForm[item] === null || flightForm[item] === '')
        if (validateflightform) {
          this.error = true;
          await this.setStep(STEP_FLIGHT);
          qRampStore().hideLoading();
          await this.setData();
          this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
          return true;
        }
        const validateDateService = await this.validateFulldate();
        const service = await serviceListStore().getServiceItems();
        if (!this.isPassenger && service.length === 0) {
          await this.setStep(STEP_SERVICE);
          this.error = true;
          qRampStore().hideLoading();
          await this.setData();
          this.$alert.error({message: this.$tr('Please at least select one service')});
          return true;
        }

        if (!validateDateService) {
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

.stepper-modal .q-stepper__header {
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
  color: #8A98C3;
  font-size: 20px;
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

