<template>
  <div>
    <table-flight
      @cancel="dialog = $event"
      :dialog="dialog"
      :dataTable="dataTable"
      @flightSelect="setDataTable($event)"
      :manually="false"
    />
    <q-form
      ref="formSimpleWorkOrders"
      id="simpleWordOrder"
      class="
        tw-px-8
        tw-pt-8
        tw-pb-10
        tw-my-4
        tw-mx-8
        tw-mb-32
        tw-border
        tw-border-gray-200
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
            @input="setCustomerForm(keyField)"
            @filter="setCustomerName"
            ref="customerId"
          >
            <div slot="before-options">
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
                      $tr("ifly.cms.label.createNewCustomer")
                    }}</label>
                  </div>
                </div>
              </div>
            </div>
          </dynamic-field>
        </div>
        <div v-else>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            v-model="form[keyField]"
            @enter="search(field)"
          />
        </div>
      </div>
    </q-form>
  </div>
</template>
<script>
import factoryCustomerWithContracts from "../_components/factories/factoryCustomerWithContracts.js";
import qRampStore from "../_store/qRampStore.js";
import tableFlight from "../_components/modal/tableFlight.vue";
import fieldsSimpleWorkOrders from './model/fieldsSimpleWorkOrders.js'

export default {
  components: {
    tableFlight,
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
      },
      bannerMessage: null,
      selectCustomers: "",
      customerName: null,
      loadingState: false,
      dataTable: [],
      dialog: false,
      loading: false,
      acceptSchedule: false,
    };
  },
  mixins:[
    fieldsSimpleWorkOrders
  ],
  inject: ["showWorkOrder", "closeModal"],
  computed: {
    selectCustomerComputed: {
      get() {
        return this.selectCustomers;
      },
      set(value) {
        this.selectCustomers = value;
      },
    },
    disabledReadonly() {
      return qRampStore().disabledReadonly();
    },
    allowContractName() {
      return this.$auth.hasAccess("ramp.work-orders.see-contract-name");
    },
  },
  methods: {
    addCustumers() {
      if (this.customerName !== "") {
        const id = `customer-${this.numberInRange(8000, 1000)}`;
        this.newCustumerAdHoc = [{ id, label: this.customerName }];
        this.form.adHoc = true;
        this.form.customCustomer = true;
        this.bannerMessage = this.$tr("ifly.cms.message.requestNewCustomer");
        this.selectCustomerComputed = {
          id,
          value: this.customerName,
          label: this.customerName,
        };
        this.form.customCustomerName = this.customerName;
        this.form.customerId = null;
        this.form.contractId = null;
        this.customerName = "";
        return;
      }
      this.$alert.error({
        message: this.$tr("ifly.cms.message.orderaddNewrecord"),
      });
    },
    getCustomerList() {
      return new Promise(async (resolve) => {
        const custemerParams = {
          params: {
            filter: {
              withoutContracts: true,
              adHocWorkOrders: true,
              customerStatusId: 1,
            },
          },
          refresh: true,
        };
        const contractParams = {
          params: {
            filter: {
              contractStatusId: 1,
            },
          },
          refresh: true,
        };
        const customersData = await Promise.all([
          this.$crud.index("apiRoutes.qramp.setupCustomers", custemerParams),
          this.$crud.index("apiRoutes.qramp.setupContracts", contractParams),
        ]);
        const customerList = factoryCustomerWithContracts(
          customersData,
          this.allowContractName
        );

        return resolve(customerList);
      });
    },
    setCustomerForm(key) {
      if (key !== "customerId") return;
      const selectCustomers =
        this.selectCustomers === "" ? {} : this.selectCustomers;
      this.form.customerId = selectCustomers.id || null;
      const customCustomerName = selectCustomers.label || null;
      this.form.customCustomerName = this.form.customerId
        ? null
        : customCustomerName;
      this.form.contractId = selectCustomers.contractId || null;
      const message = this.form.contractId
        ? `${this.$tr("ifly.cms.message.selectedCustomerWithContract")}`
        : this.$tr("ifly.cms.message.selectedCustomerWithoutContract");

      this.bannerMessage =
        selectCustomers && !this.form.contractId ? message : null;
      this.form.adHoc = this.form.contractId ? false : true;
      this.form.customCustomer = this.form.contractId ? false : true;
    },
    numberInRange(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    setCustomerName(query) {
      this.customerName = query !== "" ? query : "";
    },
    saveSimpleWorkOrder() {
      this.$refs.formSimpleWorkOrders.validate().then(async (success) => {
        if (success) {
          if(this.acceptSchedule) {
            await this.orderConfirmationMessage();
            return;
          }
          this.messageWhenFlightIsNotChosen();
        } else {
          this.$alert.error({
            message: this.$tr("isite.cms.message.formInvalid"),
          });
          this.$emit("isError", true);
        }
      });
    },
    messageWhenFlightIsNotChosen() {
      if(!this.form.faFlightId) {
        this.$q.dialog({
          ok: "Select Schedule",
          message: "Are you sure to save without choosing a specific flight schedule? This is helpful  to keep the flight status up to date. ",
          cancel: 'Save Anyway',
          persistent: true,
        })
        .onOk(async () => {
          this.search({type: 'search'});
        })
        .onCancel(async () => {
          this.orderConfirmationMessage();
        });
      }
    },
    async orderConfirmationMessage() {
      const response = await this.saveRequestSimpleWorkOrder();
      this.$q
        .dialog({
          ok: "Ok",
          message: "You want to continue editing the order?",
          cancel: true,
          persistent: true,
        })
        .onOk(async () => {
          await this.showWorkOrder(response.data);
          this.acceptSchedule = false;
          this.$root.$emit('crud.data.refresh');
        })
        .onCancel(async () => {
          await this.closeModal();
        });
    },
    search({ type }) {
      if (
        type != "search" &&
        (this.form.preFlightNumber !== "" || this.form.preFlightNumber !== null)
      )
        return;
      const params = {
        refresh: true,
        params: {
          filter: { search: this.form.preFlightNumber.toUpperCase() },
        },
      };
      this.loadingState = true;
      //Request
      this.$crud
        .index("apiRoutes.qfly.flightaware", params)
        .then((response) => {
          this.responseStatus(response);
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
    setDataTable({ select, dialog }) {
      this.form.faFlightId = select.faFlightId || null;
      this.dialog = dialog;
      this.acceptSchedule = true;
    },
    async saveRequestSimpleWorkOrder() {
      try {
        qRampStore().showLoading();
        const response = await this.$crud.create(
          "apiRoutes.qramp.simpleWorkOrders",
          this.form
        );
        qRampStore().hideLoading();
        return response;
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
              },
            },
          ],
        });
      }
      this.loadingState = false;
    },
  },
};
</script>
