import { reactive } from '@vue/composition-api';
import { 
    STATUS_DRAFT,
    STATUS_POSTED,
    STATUS_SUBMITTED,
    modelFlightBoundFormStatus
} from '../_components/model/constants.js'

const state = reactive({
    statusId: STATUS_DRAFT,
    needToBePosted: false,
    flightNumberField: null,
    contractId: 0,
    workOrderItems: [],
    loading: false,
    flightBoundFormStatus: {...modelFlightBoundFormStatus},
});

export default function qRampStore() {
    function setStatusId(value) {
        state.statusId = value;
    }
    function setNeedToBePosted(value) {
        state.needToBePosted = value;
    }
    function disabledReadonly() {
        const statusId = Number(state.statusId);
        if(statusId === STATUS_DRAFT && state.needToBePosted) {
          return true;
        }
        if(statusId === STATUS_POSTED 
          || statusId === STATUS_SUBMITTED
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
    function validateStatusSelectedFlight(data) {
        state.flightBoundFormStatus.boundOriginAirportId = this.isData(data.destinationAirport.id);
        state.flightBoundFormStatus.boundTailNumber = this.isData(data.registration);
        state.flightBoundFormStatus.boundDestinationAirport = this.isData(data.originAirport.id);
        state.flightBoundFormStatus.boundScheduled = this.isData(data.estimatedOff);
        state.flightBoundFormStatus.boundScheduledDeparture = this.isData(data.estimatedOn);
    }
    function isData(data) {
        return data ? true : false;
    }
    function resetFlightBoundFormStatus() {
        state.flightBoundFormStatus = {...modelFlightBoundFormStatus};
    }
    function showFielFlightBoundFormStatus() {
        const status = {
            boundOriginAirportId: false,
            boundTailNumber: false,
            boundScheduled: false,
            boundScheduledDeparture: false,
        }
        state.flightBoundFormStatus = status;
    }
    function getFlightBoundFormStatus() {
        return state.flightBoundFormStatus;
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
        validateStatusSelectedFlight,
        getFlightBoundFormStatus,
        resetFlightBoundFormStatus,
        showFielFlightBoundFormStatus,
        isData,
    }
}