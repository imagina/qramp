import { reactive } from '@vue/composition-api';
import { 
    STATUS_DRAFT,
    STATUS_POSTED,
    STATUS_SUBMITTED 
} from '@imagina/qramp/_components/model/constants.js'

const state = reactive({
    statusId: STATUS_DRAFT,
    needToBePosted: false,
    flightNumberField: null,
    contractId: 0,
    workOrderItems: [],
    loading: false,
});

export default function qRampStore() {
    function setStatusId(value) {
        state.statusId = value;
    }
    function setNeedToBePosted(value) {
        state.needToBePosted = value;
    }
    function disabledReadonly() {
        if(state.statusId === STATUS_DRAFT && state.needToBePosted) {
          return true;
        }
        if(state.statusId === STATUS_POSTED 
          || state.statusId === STATUS_SUBMITTED
        ) {
          return true;
        }
        return false;
    }
    function setFlightNumberField(value) {
        state.flightNumberField = value;
    }
    function getFlightNumberField() {
        return state.flightNumberField;
    }
    function setContractId(value) {
        state.contractId = value;
    }
    function getContractId() {
        return state.contractId;
    }
    function setWorkOrderItems(data) {
        state.workOrderItems = data;
    }
    function getWorkOrderItems() {
        return state.workOrderItems;
    }
    function getLoading() {
        return state.loading;
    }
    function hideLoading() {
        state.loading = false;
    }
    function showLoading() {
        state.loading = true;
    }
    return {
        disabledReadonly,
        setStatusId,
        setNeedToBePosted,
        setFlightNumberField,
        getFlightNumberField,
        setContractId,
        getContractId,
        setWorkOrderItems,
        getWorkOrderItems,
        getLoading,
        hideLoading,
        showLoading,
    }
}