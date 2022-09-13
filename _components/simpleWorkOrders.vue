<template>
  <div>
    <q-form
      ref="formSimpleWorkOrders"
      id="simpleWordOrder"
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
            v-model="selectCustomers"
            @input="setCustomerForm"
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
          />
        </div>
      </div>
    </q-form>
  </div>
</template>
<script>
import factoryCustomerWithContracts from "../_components/factories/factoryCustomerWithContracts.js";
import qRampStore from "../_store/qRampStore.js";

export default {
  data() {
    return {
      newCustumerAdHoc: [],
      form: {
        customerId: null,
        contractId: null,
        preFlightNumber: null,
      },
      bannerMessage: null,
      selectCustomers: '',
      customerName: null,
    };
  },
  inject:['showWorkOrder', 'closeModal'],
  computed: {
    disabledReadonly() {
      return qRampStore().disabledReadonly();
    },
    allowContractName() {
      return this.$auth.hasAccess("ramp.work-orders.see-contract-name");
    },
    fields() {
      return {
        banner: {
          type: "banner",
          props: {
            color: "info",
            icon: "fas fa-exclamation-triangle",
            message: this.bannerMessage,
          },
        },
        form: {
          customerId: {
            name: "customerId",
            value: "",
            type: this.readonly ? "inputStandard" : "select",
            help: {
              description:
                'You can add a new customer to the list if it\'s not available. Type the Customer Name and click on "Create new customer". The Work Order will be created as Ad-Hoc.',
            },
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              readonly: this.disabledReadonly,
              borderless: true,
              label: `*${this.$tr("ifly.cms.form.customer")}`,
              clearable: true,
              color: "primary",
              "hide-bottom-space": false,
              emitValue: false,
              options: this.newCustumerAdHoc,
            },
            loadOptions: {
              delayed: this.getCustomerList,
            },
            label: this.$tr("ifly.cms.form.customer"),
          },
          preFlightNumber: {
            name: "preFlightNumber",
            value: "",
            type: "inputStandard",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              label: "Pre Flight Number",
              clearable: true,
              color: "primary",
            },
          },
        },
      };
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
    setCustomerForm() {
      const selectCustomers = this.selectCustomers === '' ? {} : this.selectCustomers;
      this.form.customerId = selectCustomers.id || null;
      const customCustomerName = selectCustomers.label || null;
      this.form.customCustomerName = this.form.customerId ? null : customCustomerName;
      this.form.contractId = selectCustomers.contractId || null;
      const message = this.form.contractId 
        ? `${this.$tr('ifly.cms.message.selectedCustomerWithContract')}` 
        : this.$tr('ifly.cms.message.selectedCustomerWithoutContract');
       
      this.bannerMessage =  selectCustomers && !this.form.contractId ? message : null;
      this.form.adHoc = this.form.contractId ? false : true;
      this.form.customCustomer = this.form.contractId ? false : true;
    },
    numberInRange(max, min) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    setCustomerName(query) {
      this.customerName = query !== '' ? query : '';
    },
    saveSimpleWorkOrder() {
        this.$refs.formSimpleWorkOrders.validate().then(async (success) => {
        if (success) {
          this.orderConfirmationMessage();
        }
        else {
          // oh no, user has filled in
          // at least one invalid value
          this.$alert.error({message: this.$tr('isite.cms.message.formInvalid')})
          this.$emit('isError', true)
        }
      })
    },
    orderConfirmationMessage() {
        this.$q.dialog({
          title: 'Confirm',
          ok: 'Ok',
          message: 'You want to continue editing the order?',
          cancel: true,
          persistent: true
        }).onOk(() => {
            console.log('saveFomr')
            //this.showWorkOrder(item);
        }).onCancel(() => {
            this.closeModal();
        })
    }
  },
};
</script>
