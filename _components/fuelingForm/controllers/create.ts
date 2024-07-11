import Vue, { computed, ref, getCurrentInstance } from 'vue'
import {
  BUSINESS_UNIT_FUELING,
  COMPANY_PASSENGER,
  FUELING,
  STATUS_DRAFT
} from '../../model/constants';
import workOrderList from '../../../_store/actions/workOrderList';
import qRampStore from '../../../_store/qRampStore';
import alert from '@imagina/qsite/_plugins/alert.js';
import store from '../store/index'
import showWorkOrder from '../services/showWorkOrder'

export default function createController() {
  const formFueling: any = ref(null);
  const refCustomer: any = ref(null);
  const proxy = (getCurrentInstance() as any).proxy as any;
  const manageResponsiblePermissions = computed(() => {
    return Vue.prototype.$auth.hasAccess('ramp.work-orders.manage-responsible');
  })
  const form = ref({
    customerId: null,
    contractId: null,
    statusId: STATUS_DRAFT
  });
  const fields = computed(() => ({
    form: {
      fuelingTicketNumber: {
        value: null,
        type: 'input',
        props: {
          rules: [
            val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
          ],
          label: '*Fueling ticket number',
        },
      },
      stationId: {
        value: null,
        type: "select",
        props: {
          rules: [
            (val) => !!val || Vue.prototype.$tr("isite.cms.message.fieldRequired"),
          ],
          selectByDefault: true,
          label: `*${Vue.prototype.$tr("ifly.cms.form.station")}`,
          clearable: true,
          color: "primary",
          options: workOrderList()
            .getStationList()
            .map(item => ({
              label: item.fullName,
              value: item.id
            })
            ),
        },
      },
      responsibleId: {
        value: null,
        type: "select",
        props: {
          vIf: manageResponsiblePermissions.value,
          label: 'Responsible',
          clearable: true,
          color: "primary",
          hint: "If you left this field empty, the responsible will be you automatically",
        },
        loadOptions: {
          apiRoute: "apiRoutes.quser.users",
          select: { label: "fullName", id: "id" },
          filterByQuery: true,
          requestParams: {
            filter: {
              companyId: COMPANY_PASSENGER
            }
          }
        },
      },
    },
  }))
  async function save() {
    try {
      store.loading = true;
      const API_ROUTE = 'apiRoutes.qramp.simpleWorkOrders'
      const businessUnitId = { businessUnitId: BUSINESS_UNIT_FUELING };
      const dataForm = {
        ...form.value,
        titleOffline: qRampStore().getTitleOffline(),
        ...businessUnitId,
        type: FUELING
      };
      try {
        const response = await Vue.prototype.$crud.create(
          API_ROUTE,
          dataForm,
        )
        await showWorkOrder(response.data)
        await proxy.$root.$emit('crud.data.refresh');
        store.loading = false;
      } catch (err) {
        console.log(err)
      }

    } catch (error) {
      console.error(error);
    }
  }
  function reset() {
    form.value = {
      customerId: null,
      contractId: null,
      statusId: STATUS_DRAFT
    };
    store.showModal = false;
  }
  return {
    fields,
    form,
    save,
    refCustomer,
    formFueling
  }
}