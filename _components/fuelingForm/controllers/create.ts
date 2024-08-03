import { computed, ref } from 'vue'
import {
  BUSINESS_UNIT_FUELING,
  COMPANY_PASSENGER,
  FUELING,
  STATUS_DRAFT
} from '../../model/constants';
import workOrderList from '../../../_store/actions/workOrderList';
import qRampStore from '../../../_store/qRampStore';
import storeFlueling from '../store/index'
import { store, i18n } from 'src/plugins/utils';
import baseService from "src/modules/qcrud/_services/baseService.js";
import showWorkOrder from '../services/showWorkOrder'
import { cacheOffline } from 'src/plugins/utils'
import moment from 'moment-timezone'

export default function createController(props: any = null, emit: any = null) {
  const formFueling: any = ref(null);
  const refCustomer: any = ref(null);
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
      fuelingTicketNumber: {
        value: null,
        type: 'input',
        props: {
          rules: [
            val => !!val || i18n.tr('isite.cms.message.fieldRequired')
          ],
          label: '*Fueling ticket number',
        },
      },
      stationId: {
        value: null,
        type: "select",
        props: {
          rules: [
            (val) => !!val || i18n.tr("isite.cms.message.fieldRequired"),
          ],
          selectByDefault: true,
          label: `*${i18n.tr("ifly.cms.form.station")}`,
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
      const CACHE_PATH = 'apiRoutes.qramp.workOrders';
      const businessUnitId = { businessUnitId: BUSINESS_UNIT_FUELING };
      const isOffline = !navigator.onLine;
      const offlineId = new Date().valueOf()
      let response = { data: {} }

      const dataForm = {
        ...form.value,
        titleOffline: qRampStore().getTitleOffline(),
        ...businessUnitId,
        type: FUELING,
        offlineId: isOffline ? offlineId : null,
        ...(isOffline ? { apiRoute: CACHE_PATH, } : {})
      };

      const payloadOffline = { 
        ...dataForm, 
        offline: isOffline,
        id: offlineId,
        scheduleDate: moment().format("YYYY-MM-DDTHH:mm:ss"),
      }

      try {
        response = await baseService.create(
          API_ROUTE,
          dataForm,
        )
      } catch (err) {
        if (isOffline) response.data = payloadOffline
        console.log(err)
      } finally {
        await cacheOffline.addNewRecord(CACHE_PATH, { ...response.data })
        await emit('refresh-data');
        await showWorkOrder(response.data)
        store.loading = false;
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
  return {
    fields,
    form,
    save,
    refCustomer,
    formFueling
  }
}
