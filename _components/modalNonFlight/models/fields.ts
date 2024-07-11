import Vue, { computed } from 'vue'
import storeKanban from 'src/modules/qramp/_components/scheduleKanban/store/kanban.store'
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList'
import { mergeColumnDateWithCurrentTime } from 'src/modules/qramp/_store/actions/mergeColumnDateWithCurrentTime'
import qRampStore from 'src/modules/qramp/_store/qRampStore'
import { COMPANY_PASSENGER, COMPANY_RAMP, FLIGHT, NON_FLIGHT } from '../../model/constants'
import store from '../store/index.store'
import modalScheduleStore from 'src/modules/qramp/_components/scheduleKanban/store/modalSchedule.store'

const isBlank = computed(() => storeKanban.isBlank);
const isPassenger = computed(() =>  qRampStore().getIsPassenger());
const isLoadingSearch = computed(() => store.isLoadingSearch)

const filterStation = computed(() => {
    return workOrderList()
        .getStationList()
        .map(
            item => ({ 
                label: item.fullName, 
                value: item.id 
            })
        )
})

const filterResponsible = computed(() => {
    return workOrderList()
      .getResponsible()
      .map(item => ({ 
        label: item.fullName, 
        value: item.id 
      }))
  })

const filterCompany = computed(() => {
    return isPassenger.value ? COMPANY_PASSENGER : COMPANY_RAMP;
})

const manageResponsiblePermissions = computed(() => {
    return Vue.prototype.$auth.hasAccess('ramp.work-orders.manage-responsible');
})

const isActiveNonFlightServices = computed(() => store.selectedTab === NON_FLIGHT)

const isAppOffline = computed(() => {
    return storeKanban.isAppOffline
})

export const fields = computed(() => ({
    flightNumber: {
        name: 'flightNumber',
        value: '',
        type: 'search',
        props: {
            vIf: store.selectedTab === FLIGHT,
            rules: [
                (val) => {
                    return !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
                } 
            ],
            hint: 'Enter the fight number and press enter or press the search icon',
            loading: isLoadingSearch.value,
            label: `*${Vue.prototype.$tr('ifly.cms.form.flight')}`,
            clearable: true,
            maxlength: 7,
            color: 'primary',
        },
    },
    stationId: {
        name:'stationId',
        value: modalScheduleStore.stationId, //TO-DO: Don't take stationId from this store
        type: 'select',
        props: {
            vIf: isActiveNonFlightServices.value,
            readonly: isBlank.value,
            rules: [
                val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
            ],
            label: `*${Vue.prototype.$tr('ifly.cms.form.station')}`,
            selectByDefault: true,
            clearable: true,
            color:"primary",
            options: filterStation.value
        },
    },
    scheduleDate: {
        value: mergeColumnDateWithCurrentTime(),
        type: 'fullDate',
        props: {
            vIf: isActiveNonFlightServices.value,
            rules: [
                val => !!val || Vue.prototype.$tr('isite.cms.message.fieldRequired')
            ],
            hint:'Format: MM/DD/YYYY HH:mm',
            mask:'MM/DD/YYYY HH:mm',
            'place-holder': 'MM/DD/YYYY HH:mm',
            label: '*Date Entered',
            clearable: true,
            color:"primary",
            format24h: true,
        },
    },
    responsibleId: {
        name: "responsibleId",
        value: "",
        type: "select",
        props: {
            vIf: manageResponsiblePermissions.value && isActiveNonFlightServices.value,
            label: 'Responsible',
            clearable: true,
            color: "primary",
            hint: "If you left this field empty, the responsible will be you automatically",
            options: isAppOffline.value ? filterResponsible.value : []
        },
        loadOptions: {
            apiRoute: isAppOffline.value ? null : "apiRoutes.quser.users",
            select: { label: "fullName", id: "id"},
            filterByQuery: !isAppOffline.value,
            requestParams: {
                filter: {
                companyId: filterCompany.value
                }
            }
        },
    },
}))