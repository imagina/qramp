import { computed, ref, getCurrentInstance } from 'vue'
import { BUSINESS_UNIT_PASSENGER, COMPANY_PASSENGER, FUELING, STATUS_DRAFT } from '../../model/constants';
import workOrderList from '../../../_store/actions/workOrderList';
import qRampStore from '../../../_store/qRampStore';
import storeFlueling from '../store/index'
import showWorkOrder from '../services/showWorkOrder'
import { alert, store, i18n } from 'src/plugins/utils';
import baseService from "src/modules/qcrud/_services/baseService.js";

export default function createController() {
  const formFueling: any = ref(null);
  const refCustomer: any = ref(null);
  const proxy = (getCurrentInstance() as any).proxy as any;
  const manageResponsiblePermissions = computed(() => {
    return store.hasAccess('ramp.work-orders.manage-responsible');
  })
  const form = ref({
    customerId: null,
    contractId: null,
    statusId: STATUS_DRAFT
  });
  const fields = computed(() => ({
    form: {
      stationId: {
        value: null,
        type: "select",
        props: {
          rules: [
            (val) => !!val || i18n.$tr("isite.cms.message.fieldRequired"),
          ],
          selectByDefault: true,
          label: `*${i18n.$tr("ifly.cms.form.station")}`,
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
      storeFlueling.loading = true;
      const API_ROUTE = 'apiRoutes.qramp.simpleWorkOrders'
      const businessUnitId = { businessUnitId: BUSINESS_UNIT_PASSENGER };
      const dataForm = {
        ...form.value,
        titleOffline: qRampStore().getTitleOffline(),
        ...businessUnitId,
        type: FUELING
      };
      try {
        const response = await baseService.create(
          API_ROUTE,
          dataForm,
        )
        orderConfirmationMessage(response.data);
        storeFlueling.loading = false;
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
    storeFlueling.showModal = false;
  }
  function orderConfirmationMessage(data) {
    alert.info({
      mode: "modal",
      title: '',
      message: 'What do you want to do?',
      modalWidth: '600px',
      actions: [
        {
          label: 'Go out to the list',
          color: 'grey-6',
          handler: async () => {
            await reset()
            await proxy.$root.$emit('crud.data.refresh');
          }
        },

        {
          label: 'Continue editing',
          color: "light-blue-7",
          handler: async () => {
            await showWorkOrder(data)
            await proxy.$root.$emit('crud.data.refresh');
          },
        },
        {
          label: 'Create a new one',
          color: 'positive',
          handler: () => {
            storeFlueling.loading = true;
            refCustomer.value.reset();
            form.value = {
              customerId: null,
              contractId: null,
              statusId: STATUS_DRAFT
            };
            formFueling.value.reset();
            storeFlueling.loading = false;
          }
        },
      ],
    });
  }
  return {
    fields,
    form,
    save,
    refCustomer,
    formFueling
  }
}