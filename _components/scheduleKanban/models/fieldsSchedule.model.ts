import { computed, ComputedRef } from 'vue';
import {
  OPERATION_TYPE_NON_FLIGHT,
  BUSINESS_UNIT_SECURITY
} from '../../model/constants.js'
import qRampStore from '../../../_store/qRampStore.js'
import workOrderList from '../../../_store/actions/workOrderList'
import store from '../store/modalSchedule.store'
import kanbanStore from '../store/kanban.store'
import { i18n, store as storeUtil } from 'src/plugins/utils'
import moment from 'moment';
import storeFilters from "../store/filters.store";

export default function modelFields() {
    const isPassenger = computed(() =>  qRampStore().getIsPassenger());
    const isBlank = computed(() => kanbanStore.isBlank);
    const form = computed(() => store.form)
    const filterGates = computed(() => {
        return workOrderList()
          .getGatesList()
          .filter(item => {
            return Number(item.stationId) === Number(store.stationId)
          })
          .map(item =>
            ({
              value: item.id,
              label: item.name
            }));
    });

    const filterStation = computed(() => {
      return workOrderList()
        .getStationList()
        .map(
          item => ({
            label: item.stationName,
            value: item.id
          })
        )
    })

    const filterAcType = computed(() => {
      return workOrderList()
        .getACTypesList()
        .map(
          item => ({
            label: item.fullName,
            value: item.id
          })
        )
    })

    const flightStatusesList = computed(() => workOrderList().getFlightStatusesList().map((item) =>({
        label: item.name,
        id: item.id,
        color: item.color,
        value: item.id,
    })))
    const flightStatus = computed(() => flightStatusesList.value.find(item => item.id == form.value.flightStatusId) || null);

    const operationTypeList =  computed(() => {
      const data = structuredClone(workOrderList().getOperationTypeList())
      if (OPERATION_TYPE_NON_FLIGHT.includes(Number(form.value.operationTypeId))) return data
      if (isPassenger.value) return data.filter(item => !OPERATION_TYPE_NON_FLIGHT.includes(Number(item.id)))
      return data
    });

    const isOperationType = computed(() => {
      const businessUnitId: any = qRampStore().getBusinessUnitId()
      const modulesWithoutOperationType = [
        BUSINESS_UNIT_SECURITY
      ]
      return !modulesWithoutOperationType.includes(businessUnitId)
    })

    const operationType = computed(() => {
      const type = workOrderList()
        .getOperationTypeList()
        .find(item => item.id === Number(form.value.operationTypeId));
      return type?.options?.type;
    });

    const validateDateOutboundSchedule = (
      dateTime,
      dateMin = null,
      inbound
    ) => {
      if (operationType.value !== 'full') return true;

      const inboundDate = inbound
      ? moment(inbound, 'HH:mm') : moment('HH:mm');
      const hourIn = inboundDate.format('H');
      const minutes = storeUtil.getSetting('ramp::minimumMinutesDiffBetweenSchedules')
      if (isNaN(dateTime)) return true;
      if (dateMin) {
        const selectedTime = moment(`${dateTime}:${dateMin}`, 'HH:mm');
        const difference = selectedTime.diff(moment(inboundDate, 'HH:mm'), 'minutes');
        return difference > minutes;
      }

      return Number(dateTime) >= Number(hourIn);
    }

    const fields: ComputedRef<any> = computed(() => ({
        form: {
            inboundFlightNumber: {
              name:'inboundFlightNumber',
              value: '',
              type: 'input',
              props: {
                readonly: isBlank.value,
                rules: [
                  val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                ],
                label: `*${i18n.tr('ifly.cms.form.flight')}`,
                clearable: true,
                color:"primary"
              },
            },
            customer: 2,
            stationId: {
              name:'stationId',
              value: store.stationId,
              type: 'select',
              props: {
                readonly: isBlank.value,
                rules: [
                  val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                ],
                label: `*${i18n.tr('ifly.cms.form.station')}`,
                clearable: true,
                color:"primary",
                options: filterStation.value
              },
            },
            gateId: {
              name:'gateId',
              value: null,
              type: 'select',
              props: {
                vIf: !isPassenger.value && qRampStore().getBusinessUnitId() !== BUSINESS_UNIT_SECURITY,
                readonly: isBlank.value,
                label: `${i18n.tr('ifly.cms.form.gate')}`,
                clearable: true,
                color:"primary",
                options: filterGates.value
              }
            },
            operationTypeId: {
              name:'operationTypeId',
              value: '',
              type: 'select',
              props: {
                rules: [
                  val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                ],
                label: `*${i18n.tr('ifly.cms.form.operation')}`,
                clearable: true,
                color:"primary",
                'hide-bottom-space': false,
                options: operationTypeList.value
              }
            },
            sta: {
              value: null,
              type: 'hour',
              props: {
                rules: [
                  val => !!val || i18n.tr('isite.cms.message.fieldRequired')
                ],
                readonly: isBlank.value,
                label: 'STA',
                format24h: true,
              },
            },
            outboundScheduledDeparture: {
              value: null,
              type: 'fullDate',
              props: {
                rules: [
                  val => !!val || i18n.tr('isite.cms.message.fieldRequired'),
                  val => {
                    const format = 'MM/DD/YYYY HH:mm';
                    const date = moment(store.seletedDateColumn, 'YYYY/MM/DD').format('MM/DD/YYYY')
                    return qRampStore().validateDateRule(val, `${date} ${form.value.sta}`, operationType.value, format)
                  }
                ],
                mask:'MM/DD/YYYY HH:mm',
                hint:'Format: MM/DD/YYYY HH:mm',
                readonly: isBlank.value,
                label: 'STD',
                format24h: true,
                options: (dateTime, dateMin) => validateDateOutboundSchedule(
                  dateTime,
                  dateMin,
                  form.value.sta
                )
              },
            },
            flightStatusId: {
              value: null,
              type: 'select',
              props: {
                readonly: isBlank.value,
                selectColor: true,
                colorType: 'tailwindcss',
                label: `Flight Status`,
                clearable: true,
                color:"primary",
                options: flightStatusesList.value,
              },
            },
            acTypeId: {
              value: null,
              type: 'select',
              props: {
                label: i18n.tr('ifly.cms.sidebar.aircraftType'),
                options: filterAcType.value,
              },
            },
          },
    }));

    return {
        fields,
        flightStatusesList,
        flightStatus,
    }
}
