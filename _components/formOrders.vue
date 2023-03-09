<template>
  <master-modal 
    id="formRampComponent" 
    v-model="show" 
    v-bind="modalProps" 
    :persistent="true"
    :loading="loading"
    @hide="clear" 
    :actions="actions" 
    :width="modalProps.width" 
    :maximized="$q.screen.lt.md"
  >
    <stepper-ramp-form
      v-if="modalProps.update"
      @sp="sp = $event" 
      @loading="setLoading"
      ref="stepper" 
      :steps="steppers" 
      :data="modalProps" 
      @close-modal="close($event)"
    />
    <simpleWorkOrders v-if="!modalProps.update" ref="simpleWorkOrder"/>
  </master-modal>
</template>
<script>
import { computed } from 'vue';
import stepperRampForm from '../_components/stepperRampForm.vue'
import responsive from '../_mixins/responsive.js'
import services from '../_mixins/services.js';
import storePassengers from '../_store/storePassengers.ts';
import { 
  STATUS_DRAFT,
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_SCHEDULE,
  STATUS_CLOSED,
  STEP_FLIGTH,
  STEP_SERVICE,
  STEP_REMARKS,
  STEP_SIGNATURE
} from '../_components/model/constants.js'
import qRampStore from '../_store/qRampStore.js'
import simpleWorkOrders from './simpleWorkOrders.vue'
import serviceListStore from './serviceList/store/serviceList';
import cargoStore from './cargo/store/cargo.ts';
import storeFlight from './flight/store.ts';
import iFlight from '../_components/flight.vue'
import iRemarks from './remarks/index.vue'
import iSignature from '../_components/signature.vue';
import serviceList from './serviceList/index.vue';
import remarksStore from './remarks/store.ts';

export default {
  name:'formOrders',
  components: { 
    stepperRampForm, 
    simpleWorkOrders,
  },
  mixins:[responsive, services],
  data() {
    return {
      show: false,
      loading: false,
      modalProps: {},
      sp:null,
      flight:{},
      remark:[],
      signature:[],
      statusId: STATUS_DRAFT,
      needToBePosted: false,
      STATUS_DRAFT,
      STATUS_POSTED,
      STATUS_SUBMITTED
    }
  },
  provide() {
    return {
      disabledReadonly: computed(() => qRampStore().disabledReadonly()),
      closeModal: this.close
    }
  },
  computed:{
    isPassenger() {
      return storePassengers.isPassenger.get();
    },
    steppers () {
      return [
        {
          ref: 'flight',
          title:'Flight',
          icon:'fas fa-plane',
          step: STEP_FLIGTH,
          form: this.flight,
          component: iFlight,
        },
        {
          ref: 'services',
          title:'Services',
          icon:'fas fa-briefcase',
          step: STEP_SERVICE,
          component: serviceList,
        },
        {
          ref: 'remark',
          title:'Remark',
          icon:'far fa-edit',
          step: STEP_REMARKS,
          form: this.remark,
          component: iRemarks,
        },
        {
          ref:"signature",
          title: this.$tr('ifly.cms.label.signature'),
          icon:'draw',
          step: STEP_SIGNATURE,
          form: this.signature,
          component: iSignature,
        }
      ].filter( item => !this.isPassenger ? item : item.step !== STEP_SIGNATURE);
    },
    nextLabel(){
      return this.sp === this.steppers.length ? 'Save to Draft' : this.$tr('isite.cms.label.next')
    },
    loadingComputed() {
      return qRampStore().getLoading();
    },
    actions() {
      if(!qRampStore().getIsblank()) {
        return this.modalProps.update ? this.actionsStepperButtom : this.actionSimpleWorkOrder;
      }
      return [];
    },
    actionSimpleWorkOrder() {
      return [
      {
          props:{
            vIf: !this.modalProps.update,
            color:'primary',
            label: this.$tr('isite.cms.label.save'),
          },
          action: async () => {
            await this.setLoading(true);
            await this.$refs.simpleWorkOrder.saveSimpleWorkOrder();
            await this.setLoading(false);
          }
        },
      ]
    },
    editPermissionseSubmitted() {
      return qRampStore().editPermissionseSubmitted();
    },
    actionsStepperButtom(){
      const statusId = qRampStore().getStatusId();
      const actions = [
        {
          props:{
            vIf: this.sp > 1,
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
            vIf: this.sp !== this.steppers.length,
            color:'primary',
            'icon-right': 'fas fa-arrow-right',
            label: this.$tr('isite.cms.label.next')
          },
          action: () => {
            this.$refs.stepper.next()
          }
        },
        {
          props:{
            color:'primary',
            'icon-right': 'fa-thin fa-floppy-disk',
            label: 'Save to Draft',
            vIf: statusId == STATUS_DRAFT || statusId == STATUS_CLOSED || statusId == STATUS_SCHEDULE,
            loading: this.loadingComputed,
          },
          action: async () => {
              qRampStore().setStatusId(STATUS_DRAFT);
              await this.$refs.stepper.setData();
              setTimeout(async () => {
                await this.$refs.stepper.sendInfo();
              }, 1000);
              qRampStore().hideLoading();
          }
        },
        {
          props:{
            color:'primary',
            'icon-right': 'fal fa-check',
            label: this.$tr('isite.cms.label.closeFlight'),
            vIf: statusId == STATUS_DRAFT || statusId == STATUS_CLOSED || statusId == STATUS_SCHEDULE,
            loading: this.loadingComputed,
          },
          action: async () => {
            await qRampStore().setStatusId(STATUS_CLOSED);
            await this.$refs.stepper.setData();
            setTimeout(async () => {
                await this.$refs.stepper.sendInfo();
            }, 1000);
            qRampStore().hideLoading();
          }
        },
        {
          props:{
            color:'primary',
            'icon-right': 'fa-thin fa-floppy-disk',
            label: this.$tr('isite.cms.label.save'),
            vIf: statusId == null || statusId == STATUS_POSTED || (statusId == STATUS_SUBMITTED && this.editPermissionseSubmitted),
            loading: this.loadingComputed,
          },
          action: async () => {
            await this.$refs.stepper.setData();
            const data = this.$store.state.qrampApp;
            await qRampStore().setStatusId(data.form.statusId);
            await this.$refs.stepper.sendInfo();
            await qRampStore().setStatusId(null);
            qRampStore().hideLoading();
          }
        },
      ];
      return actions;
    }
  },
  methods: {
    close(show) {
      this.show = show
      this.$root.$emit('crud.data.refresh')
      this.services = [];
    },
    async loadform(params) {
      try {
        qRampStore().showLoading();
        const updateData = this.$clone(params)
        this.show = true
        this.modalProps = updateData.modalProps
        this.flight = {}
        this.remark = {}
        this.signature = {}
        this.statusId = STATUS_DRAFT
        this.needToBePosted = false
        qRampStore().setWorkOrderItems([]);
        qRampStore().setStatusId(this.statusId);
        qRampStore().setNeedToBePosted(this.needToBePosted);
        if(!updateData.data) {
          qRampStore().hideLoading();
          return;
        };
        this.statusId = updateData.data['statusId'] ? updateData.data['statusId'].toString() : '1';
        this.needToBePosted = updateData.data['needToBePosted'] || false;
        qRampStore().setStatusId(this.statusId);
        qRampStore().setNeedToBePosted(this.needToBePosted); 
        storeFlight().setForm(updateData.data);
        this.flight = storeFlight().getForm();
        qRampStore().setResponsible(updateData.data['responsible']);
        cargoStore().setForm(updateData.data);
        cargoStore().setDelayList(updateData.data);
        qRampStore().setWorkOrderItems(updateData.data['workOrderItems']);
        await serviceListStore().init();
        remarksStore().setForm(updateData.data);
        this.signature.customerName = updateData.data['customerName']
        this.signature.customerTitle = updateData.data['customerTitle']
        this.signature.representativeName = updateData.data['representativeName']
        this.signature.representativeTitle = updateData.data['representativeTitle']
        this.signature.customerSignature = updateData.data['customerSignature']
        this.signature.representativeSignature = updateData.data['representativeSignature']
        this.$store.commit('qrampApp/SET_FORM_FLIGHT', this.flight );
        this.$store.commit('qrampApp/SET_FORM_SIGNATURE',this.signature)
        qRampStore().hideLoading();
      } catch (error) {
        this.loading = false;
        qRampStore().hideLoading();
        console.log(error);
      }
    },
    //Clear
    clear() {
      this.modalProps = {}
      this.show = false
      this.services = [];
      cargoStore().reset();
      remarksStore().reset();
    },
    setLoading(value) {
      this.loading = value;
    },
  },
}
</script>
<style lang="stylus">
  #formRampComponent
    .boundColor
      background-color #F1F4FA
</style>


