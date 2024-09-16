import { computed, ref, onMounted, watch } from 'vue'
import qRampStore from '../../../_store/qRampStore';
import workOrderList from '../../../_store/actions/workOrderList';
import momentTimezone from 'moment-timezone';
import storeFueling from '../store/index'
import storeFlight from '../../flight/store'
import serviceListStore from '../../serviceList/store/serviceList'
import { store, i18n } from 'src/plugins/utils';
import { updateFavoriteServicesList } from '../../serviceList/actions/updateFavoriteServicesList';

export default function flightController() {
  const refFlight: any = ref(null);
  const form: any = computed(() => storeFueling.form);
  const disabledReadonly = computed(() => {
    return qRampStore().disabledReadonly();
  })
  const validateComponentCustomerOffline = computed(() => {
    if(navigator.onLine) {
      return true;
    } else {
      return !storeFueling.loading
    }
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
      },
      inboundLeft: {
        inboundFlightNumber: {
          value: '',
          type: 'search',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            hint: 'Enter the fight number and press enter or press the search icon',
            //loading: this.loadingState,
            //readonly: this.readonly || this.disabledReadonly || this.loadingState,
            label: `*${i18n.tr('ifly.cms.form.flight')}`,
            clearable: true,
            maxlength: 7,
            color: "primary"
          },
          label: i18n.tr('ifly.cms.form.flight'),
        },
        inboundOriginAirportId: {
          value: '',
          type: 'select',
          props: {
            //readonly: (this.disabledReadonly || this.flightBoundFormStatus.boundOriginAirportId),
            label: `${i18n.tr('ifly.cms.form.origin')}`,
            clearable: true,
            color: "primary",
            //suffix: this.timezoneAirport,
          },
          loadOptions: {
            apiRoute: 'apiRoutes.qfly.airports',
            select: { label: 'fullName', id: 'id' },
            //requestParams: { filter: { status: this.refresh, companyId: this.filterCompany } }
          },
          label: i18n.tr('ifly.cms.form.origin'),
        },
        inboundTailNumber: {
          value: '',
          type: 'input',
          props: {
            //readonly: this.disabledReadonly,
            label: `${i18n.tr('ifly.cms.form.tail')}`,
            clearable: true,
            color: "primary"
          },
          label: i18n.tr('ifly.cms.form.tail'),
        },
        inboundScheduledArrival: {
          value: '',
          type: 'fullDate',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            hint: 'Format: MM/DD/YYYY HH:mm',
            mask: 'MM/DD/YYYY HH:mm',
            'place-holder': 'MM/DD/YYYY HH:mm',
            label: `*${i18n.tr('ifly.cms.form.scheduledArrival')}`,
            clearable: true,
            color: "primary",
            format24h: true,
            //suffix: this.timezoneAirport,
          },
          label: i18n.tr('ifly.cms.form.scheduledArrival'),
        },
      },
      outboundRight: {
        outboundFlightNumber: {
          value: '',
          type: 'search',
          props: {
            rules: [
              val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            hint: 'Enter the fight number and press enter or press the search icon',
            //loading: this.loadingState,
            //readonly:  this.disabledReadonly || this.loadingState,
            label: `*${i18n.tr('ifly.cms.form.flight')}`,
            clearable: true,
            maxlength: 7,
            color: "primary"
          },
        },
        outboundDestinationAirportId: {
          value: '',
          type: 'select',
          props: {
            //readonly:  (this.disabledReadonly || this.flightBoundFormStatus.boundDestinationAirport),
            label: `${i18n.tr('ifly.cms.form.destination')}`,
            clearable: true,
            color: "primary",
            //suffix: this.timezoneAirport,
          },
          loadOptions: {
            apiRoute: 'apiRoutes.qfly.airports',
            select: { label: 'fullName', id: 'id' },
            //requestParams: { filter: { status: this.refresh, companyId: this.filterCompany } }
          },
        },
        outboundTailNumber: {
          name: 'outboundTailNumber',
          value: '',
          type: 'input',
          props: {
            //readonly: this.disabledReadonly,
            label:  `${i18n.tr('ifly.cms.form.tail')}`,
            clearable: true,
            color: "primary"
          },
        },
        outboundScheduledDeparture: {
          value: '',
          type: 'fullDate',
          props: {
            rules: [
              val => val => !!val || i18n.tr('isite.cms.message.fieldRequired')
            ],
            hint: 'Format: MM/DD/YYYY HH:mm',
            mask: 'MM/DD/YYYY HH:mm',
            'place-holder': 'MM/DD/YYYY HH:mm',
            label: `*${i18n.tr('ifly.cms.form.scheduledDeparture')}`,
            clearable: true,
            color: "primary",
            format24h: true,
            //suffix: this.timezoneAirport,
          },
        },
      },
      dateBound: {
        inboundBlockIn: {
          value: '',
          type: 'fullDate',
          props: {
            //...this.validateRulesBlock,
            hint: 'Format: MM/DD/YYYY HH:mm',
            mask: 'MM/DD/YYYY HH:mm',
            'place-holder': 'MM/DD/YYYY HH:mm',
            //readonly: this.disabledReadonly,

            label: `*${i18n.tr('ifly.cms.form.blockIn')}`,
            clearable: true,
            color: "primary",
            format24h: true,
            //options: (date, min) => this.validateFutureDateTime(date, min, this.form.inboundBlockIn),
            //suffix: this.timezoneAirport,
          },
        },
        outboundBlockOut: {
          value: '',
          type: 'fullDate',
          props: {
            //...this.validateRulesBlock,
            hint: 'Format: MM/DD/YYYY HH:mm',
            mask: 'MM/DD/YYYY HH:mm',
            'place-holder': 'MM/DD/YYYY HH:mm',
            //readonly: this.disabledReadonly,
            label: `*${i18n.tr('ifly.cms.form.blockOut')}`,
            clearable: true,
            color: "primary",
            format24h: true,
            //options: this.validateDateOutboundBlockOut,
            //suffix: this.timezoneAirport,
          },
        },
      },
    }
  })

  const reFilterFavorites = async (key: string, value) => {
    storeFueling.loading = true;
    storeFlight().setForm({ ...storeFlight().getForm(), [key]: value });
    await workOrderList().getFavourites(true);
    const servicesList = serviceListStore().getServiceList();
    updateFavoriteServicesList(servicesList);
    storeFueling.loading = false;
  }

  const handleChange = async (key, event) => {
    if (form.value[key] == event) return
    if (!event) return

    if (key === 'stationId') await reFilterFavorites(key, event)
    if (key === 'carrierId') await reFilterFavorites(key, event)
  }

  watch(() => form.value.customerId, async (value, oldValue) => {
    if (value != oldValue) {
      reFilterFavorites('customerId', value)
    }
  }, { deep: true })

  onMounted(() => {
    storeFueling.refsGlobal = { refFlight: refFlight.value };
  })
  return { formFields, form, refFlight, disabledReadonly, handleChange, validateComponentCustomerOffline }
}
