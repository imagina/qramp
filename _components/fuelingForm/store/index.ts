import { reactive, computed } from 'vue';
import { BUSINESS_UNIT_FUELING, FUELING } from '../../model/constants';
import serviceListStore from '../../serviceList/store/serviceList'
import remarkStore from '../../remarks/store';
import qRampStore from 'src/modules/qramp/_store/qRampStore';
import workOrderList from 'src/modules/qramp/_store/actions/workOrderList'
import remarksStore from '../../remarks/store';
import stepps from '../models/defaultModels/stepps';
import moment from 'moment';

const state = reactive({
    refsGlobal: {},
    step: 1,
    showModal: false,
    titleModal: '',
    loading: false,
    updateModal: false,
    widthModal: '35vw',
    isUpdate: false,
    form: {
        id: null,
        customerId: null,
        contractId: null,
        statusId: null,
        type: FUELING,
        businessUnitId : BUSINESS_UNIT_FUELING,
        stationId: null,
        acTypeId: null,
        carrierId: null,
        fuelingTicketNumber: null,
        fuelingRegistration: null,
        scheduleDate: null,
    },
    emitEvent: {},
})

const store = computed(() => ({
    get showModal(): boolean {
        return state.showModal;
    },
    set showModal(value: boolean) {
        state.showModal = value;
    },
    get isUpdate(): boolean {
        return state.isUpdate;
    },
    set isUpdate(value: boolean) {
        state.isUpdate = value;
    },
    get titleModal(): string {
        return state.titleModal;
    },
    set titleModal(value: string) {
        state.titleModal = value;
    },
    get widthModal(): string {
        return state.widthModal;
    },
    set widthModal(value: string) {
        state.widthModal = value;
    },
    get loading(): boolean {
        return state.loading;
    },
    set loading(value: boolean) {
        state.loading = value;
    },
    get step(): number{
        return state.step;
    },
    set step(value: number) {
        state.step = value;
    },
    get refsGlobal() {
        return state.refsGlobal
    },
    set refsGlobal(value) {
        state.refsGlobal = {...value}
    },
    get form(): any{
        return state.form;
    },
    set form(value: any) {
        if(value.id) {
            state.form.id = value.id;
        }
        state.form.customerId = value.customerId || null;
        state.form.contractId = value.contractId || null;
        state.form.stationId = Number(value.stationId) || null;
        state.form.acTypeId = value.acTypeId || null;
        state.form.carrierId = value.carrierId || null;
        state.form.statusId = value.statusId || null;
        state.form.fuelingTicketNumber = value.fuelingTicketNumber || null;
        state.form.fuelingRegistration = value.fuelingRegistration || null;
        (state.form as any).scheduleDate = value.scheduleDate ? moment(value.scheduleDate).format('MM/DD/YYYY') : null;
        qRampStore().setTypeWorkOrder(value.type)
        if(navigator.onLine) {
            qRampStore().setWorkOrderItems(value.workOrderItems);
        } else {
            const storedWorkOrderServices = workOrderList().getWorkOrdersItemsList()?.filter(
                item => item.workorderId == value?.workOrderId
            );
            
            const workOrderItems = value.workOrderItems?.length > 0
                ? value.workOrderItems
                : storedWorkOrderServices;
        

            if (!workOrderItems) return 
            const workOrderItemCamelCase = workOrderItems?.map(item => ({
                productId: item?.product_id,
                workOrderItemAttributes: item?.work_order_item_attributes?.map((attribute) => ({
                    attributeId: attribute?.attribute_id, 
                    ...attribute
                })),
            }))
            qRampStore().setWorkOrderItems(workOrderItemCamelCase);
        }
        serviceListStore().init().then();
        remarksStore().setForm(value);
        qRampStore().setStatusId(state.form.statusId);
    },
    changeStatus(statusId) {
        state.form.statusId = statusId;
    },
    async payload() {
        const serviceList = await serviceListStore().getServiceListSelected();
        const remarks = remarkStore().getForm();
        return {
            ...state.form,
            ...remarks,
            workOrderItems: [
                ...serviceList
            ],
        }
    },
    get emitEvent() {
      return state.emitEvent
    },
    set emitEvent(value) {
      state.emitEvent = {...value}
    },
    reset() {
        state.step = 1;
        state.showModal = false;
        state.titleModal = '';
        state.isUpdate = false;
        state.loading = false;
        state.form = {
            id: null,
            customerId: null,
            contractId: null,
            statusId: null,
            type: FUELING,
            businessUnitId : BUSINESS_UNIT_FUELING,
            stationId: null,
            acTypeId: null,
            carrierId: null,
            fuelingTicketNumber: null,
            fuelingRegistration: null,
            scheduleDate: null,
        }
        stepps.forEach(item => {
         item.error = false;
        })
    }
})).value


export default store;
