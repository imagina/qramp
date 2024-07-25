import factoryCustomerWithContracts from '../../_store/actions/factoryCustomerWithContracts.js';
import qRampStore from '../../_store/qRampStore.js';
import { BUSINESS_UNIT_PASSENGER, BUSINESS_UNIT_RAMP, COMPANY_PASSENGER, COMPANY_RAMP, NON_FLIGHT } from '../model/constants.js';
import workOrderList from '../../_store/actions/workOrderList.ts'
import storeKanban from '../scheduleKanban/store/kanban.store.ts';

export default {
  computed: {
    validateNoFligth(){
      return qRampStore().getTypeWorkOrder() === NON_FLIGHT;
    },
    isAppOffline() {
      return storeKanban.isAppOffline
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
    allowContractName() {
      return this.$hasAccess("ramp.work-orders.see-contract-name");
    },
    manageResponsiblePermissions() {
      return this.$hasAccess('ramp.work-orders.manage-responsible');
    },
    filterStation() {
      return workOrderList()
        .getStationList()
        .map(item => ({
            label: item.fullName,
            value: item.id
          })
        )
    },
    filterResponsible() {
      return workOrderList()
        .getResponsible()
        .map(item => ({
          label: item.fullName,
          value: item.id
        }))
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
          },
          preFlightNumber: {
            name: "preFlightNumber",
            value: "",
            type: "search",
            props: {
              rules: [
                (val) => {
                  if(!this.validateNoFligth) {
                    return !!val || this.$tr("isite.cms.message.fieldRequired")
                  }
                } 
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
              options: this.filterStation,
            },
          },
          responsibleId: {
            name: "responsibleId",
            value: "",
            type: "select",
            props: {
              vIf: this.manageResponsiblePermissions,
              label: 'Assigned to',
              clearable: true,
              color: "primary",
              hint: "If you left this field empty, the responsible will be you automatically",
              options: this.isAppOffline ? this.filterResponsible : []
            },
            loadOptions: {
              apiRoute: this.isAppOffline ? null : "apiRoutes.quser.users",
              select: { label: "fullName", id: "id"},
              filterByQuery: !this.isAppOffline,
              requestParams: {
                filter: {
                  companyId: this.filterCompany
                }
              }
            },
          },
        },
      };
    },
  },
  methods: {
    getCustomerList() {
      return new Promise(async (resolve) => {
        const businessUnitId = this.isPassenger ? { businessUnitId : BUSINESS_UNIT_PASSENGER } : { businessUnitId: BUSINESS_UNIT_RAMP };
        const custemerParams = {
          params: {
            filter: {
              withoutContracts: true,
              customerStatusId: 1,
              companyId: this.filterCompany,
            },
          },
          refresh: false,
        };
        const contractParams = {
          params: {
            filter: {
              contractStatusId: 1,
              ...businessUnitId,
            },
          },
          refresh: false,
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
  },
};
