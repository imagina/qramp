<template>
  <div>
    <table-flight
        @cancel="dialog = $event"
        :dialog="dialog"
        :dataTable="dataTable"
        @flightSelect="setDataTable($event)"
        @validateBound="addmanually"
    />
    <q-form
      ref="formSimpleWorkOrders"
      id="simpleWordOrder"
      class="
        tw-p-5
        tw-mb-20
        tw-rounded-lg
      "
    >
      <div
        class="col-12 col-md-6"
        v-for="(field, keyField) in fields.form"
        :key="keyField"
      >
        <div v-if="keyField == 'customerId'">
          <dynamic-field
            v-if="bannerMessage"
            class="q-mb-md"
            :field="fields.banner"
          />
          <dynamic-field
            :field="field"
            v-model="selectCustomerComputed"
            @update:modelValue="setCustomerForm(keyField)"
            @filter="setCustomerName"
            ref="customerId"
          >
            <template #before-options>
              <div class="q-py-md q-px-md" @click="addCustumers">
                <div class="row cursor-pointer">
                  <div class="q-pr-md">
                    <q-btn
                      push
                      color="primary"
                      round
                      icon="fas fa-plus"
                      size="xs"
                    />
                  </div>
                  <div class="q-py-xs">
                    <label class="cursor-pointer">{{
                        $tr('ifly.cms.label.createNewCustomer')
                      }}</label>
                  </div>
                </div>
              </div>
            </template>
          </dynamic-field>
        </div>
        <div v-else>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            v-model="form[keyField]"
            @enter="search(field)"
            @update:modelValue="zanetizeData(keyField)"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>
<script>
import qRampStore from '../_store/qRampStore.js';
import tableFlight from '../_components/modal/tableFlight.vue';
import fieldsSimpleWorkOrders from './model/fieldsSimpleWorkOrders.js';
import {
  BUSINESS_UNIT_PASSENGER,
  BUSINESS_UNIT_RAMP,
  STATUS_DRAFT,
  modelWorkOrder,
} from './model/constants.js';
import { cacheOffline } from 'src/plugins/utils';
import workOrderList from '../_store/actions/workOrderList.ts';

export default {
  components: {
    tableFlight
  },
  data() {
    return {
      newCustumerAdHoc: [],
      form: {
        customerId: null,
        contractId: null,
        preFlightNumber: null,
        stationId: null,
        adHoc: null,
        customCustomerName: null,
        customCustomer: null,
        faFlightId: null,
        statusId: STATUS_DRAFT
      },
      bannerMessage: null,
      selectCustomers: '',
      customerName: null,
      loadingState: false,
      dataTable: [],
      dialog: false,
      loading: false,
      acceptSchedule: false,
    };
  },
  mixins: [
    fieldsSimpleWorkOrders
  ],
  inject: ['showWorkOrder', 'closeModal'],
  emits: ['loading', 'isError', 'refreshData'],
  computed: {
    isAppOffline() {
      return this.$store.state.qofflineMaster.isAppOffline;
    },
    selectCustomerComputed: {
      get() {
        return this.selectCustomers;
      },
      set(value) {
        this.selectCustomers = value;
      }
    },
    disabledReadonly() {
      return qRampStore().disabledReadonly();
    },
    isPassenger() {
      return qRampStore().getIsPassenger();
    },
    filterBusinessUnit() {
      return this.isPassenger ? BUSINESS_UNIT_PASSENGER : BUSINESS_UNIT_RAMP;
    },
    filterCompany() {
      return qRampStore().getFilterCompany();
    },
  },
  methods: {
    zanetizeData(key) {
      if (key === 'preFlightNumber') {
        this.form[key] = this.form[key]?.toUpperCase()?.replace(/\s+/g, '');
      }
    },
    addCustumers() {
      if (this.customerName !== '') {
        const id = `customer-${qRampStore().numberInRange(8000, 1000)}`;
        this.newCustumerAdHoc = [{ id, label: this.customerName }];
        this.form.adHoc = true;
        this.form.customCustomer = true;
        this.bannerMessage = this.$tr('ifly.cms.message.requestNewCustomer');
        this.selectCustomerComputed = {
          id,
          value: this.customerName,
          label: this.customerName
        };
        this.form.customCustomerName = this.customerName;
        this.form.customerId = null;
        this.form.contractId = null;
        this.customerName = '';
        return;
      }
      this.$alert.error({
        message: this.$tr('ifly.cms.message.orderaddNewrecord')
      });
    },
    setCustomerForm(key) {
      if (key !== 'customerId') return;
      const selectCustomers =
        this.selectCustomers === null ||
        this.selectCustomers === undefined ||
        this.selectCustomers === '' ? {} : this.selectCustomers;
      this.form.customerId = selectCustomers.id || null;
      const customCustomerName = selectCustomers.label || null;
      this.form.customCustomerName = this.form.customerId
        ? null
        : customCustomerName;
      this.form.contractId = selectCustomers.contractId || null;
      const message = this.form.contractId
        ? `${this.$tr('ifly.cms.message.selectedCustomerWithContract')}`
        : this.$tr('ifly.cms.message.selectedCustomerWithoutContract');
      this.bannerMessage =
        selectCustomers && !this.form.contractId ? message : null;
      this.form.adHoc = this.form.contractId ? false : true;
      this.form.customCustomer = this.form.contractId ? false : true;
    },
    setCustomerName(query) {
      this.customerName = query || '';
    },
    saveSimpleWorkOrder() {
      this.$refs.formSimpleWorkOrders.validate().then(async (success) => {
        if (success) {
          if (this.isAppOffline || this.acceptSchedule || this.form.faFlightId) {
            await this.messageWhenFlightIsNotChosen();
            return;
          }

          if ((!this.form.faFlightId || !this.acceptSchedule) && !this.isAppOffline) {
              this.search({type: 'search'});
              return;
          }

        } else {
          this.triggerErrorEvent()
        }
      });
    },
    async messageWhenFlightIsNotChosen() {
      if (this.acceptSchedule) {
        this.$alert.warning({
          mode: "modal",
          message: `Are you sure to create this Work Order with an unscheduled flight number: ${this.form.preFlightNumber}?`,
          actions: [
            {
              label: 'Ok',
              color: 'positive',
              handler: async () => {
                await this.orderConfirmationMessage();
                this.acceptSchedule = false;
              }
            },
          ],
        });
        return;
      }
      await this.orderConfirmationMessage();
    },
    async orderConfirmationMessage() {
      this.$emit('loading', true);
      const response = await this.saveRequestSimpleWorkOrder();
      await this.$alert.info({
        mode: 'modal',
        title: '',
        message: 'What do you want to do?',
        modalWidth: '600px',
        actions: [
          {
            label: 'Go out to the list',
            color: 'grey-6',
            handler: async () => {
              await this.$emit('refreshData');
              await this.closeModal();
            }
          },

          {
            label: 'Continue editing',
            color: 'light-blue-7',
            handler: async () => {
              try {
                this.$emit('refreshData');
                await this.showWorkOrder(response.data)
              } catch (err) {
                console.error(err);
              }
              this.acceptSchedule = false;
            }
          },
          {
            label: 'Create a new one',
            color: 'positive',
            handler: () => {
              this.resetForm();
              this.$emit('refreshData');
            }
          }
        ]
      });
      this.$emit('loading', false);
    },
    search({ type }) {
      if (!this.isAppOffline) {
        if (
            type != "search" &&
            (this.form.preFlightNumber !== "" || this.form.preFlightNumber !== null)
        ) return;

        if (!this.form.preFlightNumber) return;

        const params = {
          refresh: true,
          params: {
            filter: { search: this.form?.preFlightNumber?.toUpperCase() }
          }
        };
        this.loadingState = true;
        //Request
        this.$crud
          .index('apiRoutes.qfly.flightaware', params)
          .then((response) => {
            this.responseStatus(response);
          })
          .catch((error) => {
            this.loadingState = false;
            this.$alert.error({ message: this.$tr('ifly.cms.message.errorlookingForFlight') });
            console.log(error);
          });
      }
    },
    setDataTable({ select, dialog }) {
      this.form.faFlightId = select.faFlightId || null;
      this.dialog = dialog;
      this.acceptSchedule = false;
    },
    addmanually() {
      this.form.faFlightId = null;
      this.dialog = false;
      this.acceptSchedule = true;
    },
    async saveRequestSimpleWorkOrder() {
      try {
        const CACHE_PATH = 'apiRoutes.qramp.workOrders';
        const API_ROUTE = 'apiRoutes.qramp.simpleWorkOrders';
        let response = null;

        qRampStore().showLoading();
        let businessUnitId = qRampStore().getBusinessUnitId();
        businessUnitId =  businessUnitId !== 'null' ? {businessUnitId} : {};
        const offlineId = new Date().valueOf()

        const dataForm = {
          ...this.form,
          offlineId: this.isAppOffline ? offlineId : null,
          titleOffline: qRampStore().getTitleOffline(),
          ...businessUnitId,
          type: qRampStore().getTypeWorkOrder(),
          ...(this.isAppOffline ? { apiRoute: CACHE_PATH, } : {})
        };
        try {
          response = await this.$crud.create(
            API_ROUTE,
            dataForm
          );
        } catch (err) {
          console.log(err);
        }

        const offlineWorkOrder = {
          ...modelWorkOrder,
          businessUnitId,
          adHoc: this.form.adHoc,
          stationId: Number(this.form.stationId),
          customerId: Number(this.form.customerId),
          inboundFlightNumber: this.form.preFlightNumber,
          outboundFlightNumber: this.form.preFlightNumber,
          offline: this.isAppOffline,
          id: this.isAppOffline ? offlineId : await response?.data?.id,
          type: qRampStore().getTypeWorkOrder(),
        };
        await cacheOffline.addNewRecord(CACHE_PATH, offlineWorkOrder);

        if (!this.isAppOffline) workOrderList().getWorkOrderConditionally(true, true);
        qRampStore().hideLoading();

        return this.isAppOffline ? { data: { ...offlineWorkOrder } } : response;
      } catch (error) {
        qRampStore().hideLoading();
        console.error(error);
      }
    },
    responseStatus(response) {
      this.dataTable = [];
      this.acceptSchedule = false;
      if (response.status == 200) {
        this.dataTable = qRampStore().getTableListOfFlights(response.data);
        this.dialog = true;
      }
      if (response.status == 204) {
        const message = this.$tr("ifly.cms.label.flightMessage").replace("#file_number", this.form.preFlightNumber)
        this.$alert.warning({
          mode: "modal",
          title: this.$tr("ifly.cms.form.flight"),
          message,
          actions: [
            {label: this.$tr('isite.cms.label.cancel'), color: 'grey-8'},
            {
              label: this.$tr("isite.cms.label.yes"),
              color: "primary",
              handler: () => {
                this.acceptSchedule = true;
                this.form.faFlightId = null;
                this.$refs.formSimpleWorkOrders.validate().then(async (success) => {
                  if (success) {
                    this.orderConfirmationMessage()
                  } else {
                    this.triggerErrorEvent()
                  }
                });
              },
            },
          ],
        });
      }
      this.loadingState = false;
    },
    resetForm() {
      this.form = {
        customerId: null,
        contractId: null,
        preFlightNumber: null,
        stationId: null,
        adHoc: null,
        customCustomerName: null,
        customCustomer: null,
        faFlightId: null,
        statusId: STATUS_DRAFT
      };
      this.newCustumerAdHoc = [];
      this.bannerMessage = null;
      this.selectCustomers = '';
      this.customerName = null;
      this.loadingState = false;
      this.dataTable = [];
      this.dialog = false;
      this.loading = false;
      this.acceptSchedule = false;
      this.$refs.formSimpleWorkOrders.reset();
    },
    triggerErrorEvent() {
      this.$alert.error({
        message: this.$tr('isite.cms.message.formInvalid')
      });
      this.$emit('isError', true);
    }
  }
};
</script>
