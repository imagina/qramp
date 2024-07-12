import { computed, ref, onMounted } from 'vue'
import qRampStore from '../../../_store/qRampStore';
import workOrderList from '../../../_store/actions/workOrderList';
import momentTimezone from 'moment-timezone';
import storeFueling from '../store/index'
import { store, i18n } from 'src/plugins/utils';

export default function flightController() {
  const refFlight: any = ref(null);
  const form: any = computed(() => storeFueling.form);
  const disabledReadonly = computed(() => {
    return qRampStore().disabledReadonly();
  })
  const timezoneAirport = computed(() => {
    const station = workOrderList().getStationList().find(item => item.id == form.value.stationId);
    const airportId = station?.airportId;
    const airport = workOrderList().getAirportsList().find(item => item.id == airportId) || null
    return airport ? momentTimezone.tz(airport.timezone).format("z") : '';
  });
  const readStatus = computed(() => {
    return !store.hasAccess('ramp.work-orders.edit-status') || disabledReadonly.value
  })
  const formFields = computed(() => {
    return {
      flyFormLeft: {
        stationId: {
          name: 'stationId',
          value: '',
          type: 'select',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            selectByDefault: true,
            readonly: disabledReadonly.value,
            label: `*${i18n.tr('ifly.cms.form.station')}`,
            clearable: true,
            color: "primary",
            options: workOrderList()
              .getStationList()
              .map(
                item => ({
                  label: item.fullName,
                  value: item.id
                })
              ),
            suffix: timezoneAirport.value,
          },
        },
        acTypeId: {
          value: null,
          type: 'select',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            readonly: disabledReadonly.value,
            label: `*${i18n.tr('ifly.cms.form.acType')}`,
            clearable: true,
            color: "primary",
            'hide-bottom-space': false,
            options: workOrderList()
              .getACTypesList()
              .map(
                item => ({
                  label: item.model,
                  value: item.id
                })
              )
          },
          label: i18n.tr('ifly.cms.form.acType'),
        },
        scheduleDate: {
          value: null,
          type: 'date',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            hint:'Format: MM/DD/YYYY',
            mask:'MM/DD/YYYY',
            'place-holder': 'MM/DD/YYYY HH:mm',
            readonly: disabledReadonly.value,
            label: 'Service date',
            clearable: true,
            color:"primary",
            format24h: true,
          },
        },
      },
      flyFormRight: {
        carrierId: {
          value: null,
          type: 'select',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            readonly: disabledReadonly.value,
            label: `*${i18n.tr('ifly.cms.form.carrier')}`,
            clearable: true,
            color: "primary",
            'hide-bottom-space': false,
            options: workOrderList()
              .getAirlinesList()
              .map(
                item => ({
                  label: item.airlineName,
                  value: item.id
                })
              )
          },
          label: i18n.tr('ifly.cms.form.carrier'),
        },
        statusId: {
          name: 'statusId',
          value: 1,
          type: 'select',
          props: {
            vIf: store.hasAccess('ramp.work-orders.edit-status'),
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            readonly: readStatus.value,
            label: `*${i18n.tr('ifly.cms.form.status')}`,
            clearable: true,
            color: "primary",
            'hide-bottom-space': false,
            options: workOrderList().getWorkOrderStatusesList()
              .map(
                item => ({
                  label: item.statusName,
                  value: item.id
                })
              )

          },
          label: i18n.tr('ifly.cms.form.status'),
        },
        fuelingTicketNumber: {
          value: null,
          type: 'input',
          props: {
            readonly: disabledReadonly.value,
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            label: '*Fueling ticket number',
          },
        },
        fuelingRegistration: {
          value: null,
          type: 'input',
          props: {
            readonly: disabledReadonly.value,
            label: 'Aircraft Registration',
          },
        },
      },
    }
  })
  onMounted(() => {
    storeFueling.refsGlobal = { refFlight: refFlight.value };
  })
  return { formFields, form, refFlight, disabledReadonly }
}
