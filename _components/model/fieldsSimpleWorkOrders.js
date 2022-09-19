import factoryCustomerWithContracts from '../factories/factoryCustomerWithContracts.js';
export default {
  computed: {
    allowContractName() {
      return this.$auth.hasAccess("ramp.work-orders.see-contract-name");
    },
    manageResponsiblePermissions() {
      return this.$auth.hasAccess('ramp.work-orders.manage-responsible');
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
            type: "select",
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
            type: "search",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              hint: "Enter the fight number and press enter or press the search icon",
              loading: this.loadingState,
              label: `*${this.$tr("ifly.cms.form.flight")}`,
              clearable: true,
              maxlength: 7,
              color: "primary",
            },
            label: this.$tr("ifly.cms.form.flight"),
          },
          stationId: {
            name: "stationId",
            value: "",
            type: "select",
            props: {
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              selectByDefault: true,
              label: `*${this.$tr("ifly.cms.form.station")}`,
              clearable: true,
              color: "primary",
            },
            loadOptions: {
              apiRoute: "apiRoutes.qramp.setupStations",
              select: { label: "stationName", id: "id" },
              requestParams: { filter: { status: 1 } },
            },
          },
          responsibleId: {
            name: "responsibleId",
            value: "",
            type: "select",
            props: {
              vIf: this.manageResponsiblePermissions,
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
              ],
              selectByDefault: true,
              label: '*Responsible',
              clearable: true,
              color: "primary",
            },
            loadOptions: {
              apiRoute: "apiRoutes.quser.users",
              select: { label: "fullName", id: "id" },
              filterByQuery: true
            },
          },
        },
      };
    },
  },
  methods:{
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
  }
  }
};