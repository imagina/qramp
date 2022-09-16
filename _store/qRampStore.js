import { reactive } from '@vue/composition-api';
import {
    STATUS_DRAFT,
    STATUS_POSTED,
    STATUS_SUBMITTED,
    modelFlightBoundFormStatus
} from '../_components/model/constants.js'
import * as moment from 'moment';

const state = reactive({
    statusId: STATUS_DRAFT,
    needToBePosted: false,
    flightNumberField: null,
    contractId: 0,
    workOrderItems: [],
    loading: false,
    flightBoundFormStatus: { ...modelFlightBoundFormStatus },
    dateBoundBlock: {
        outboundBlockOut: null,
        inboundBlockIn: null,
        outboundScheduledDeparture: null,
        inboundScheduledArrival: null,
    },
    responsible: {},
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
        if (statusId === STATUS_DRAFT && state.needToBePosted) {
            return true;
        }
        if (statusId === STATUS_POSTED
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
        state.flightBoundFormStatus = { ...modelFlightBoundFormStatus };
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
    function validateFutureDateTime(dateTime, dateMin = null, currentDate) {
        const current = moment(currentDate).format('YYYY/MM/DD');
        const date = moment();
        const today = date.format('YYYY/MM/DD');
        const hour = date.format('H');
        const min = date.format('mm');
        if (isNaN(dateTime)) {
            return dateTime <= today
        }
        if(dateMin) {
           return today === current ? Number(dateMin) <= min : true;
        }
        return today === current ? dateTime <= hour: true;
    }
    function setDateInboundBlockIn(value) {
        state.dateBoundBlock.inboundBlockIn = value;
    }
    function getDateInboundBlockIn() {
        return state.dateBoundBlock.inboundBlockIn;
    }
    function setDateOutboundBlockOut(value) {
        state.dateBoundBlock.outboundBlockOut = value;
    }
    function getDateOutboundBlockOut() {
        return state.dateBoundBlock.outboundBlockOut;
    }

    function setDateOutboundScheduledDeparture(value) {
        state.dateBoundBlock.outboundScheduledDeparture = value;
    }
    function getDateOutboundScheduledDeparture() {
        return state.dateBoundBlock.outboundScheduledDeparture;
    }
    function setDateinboundScheduledArrival(value) {
        state.dateBoundBlock.inboundScheduledArrival = value;
    }
    function getDateinboundScheduledArrival() {
        return state.dateBoundBlock.inboundScheduledArrival;
    }

    function validateDateInboundBlockIn(dateTime, dateMin = null) {
        const date = getDateInboundBlockIn() 
          ? moment(getDateInboundBlockIn()) : moment();
        const today = date.format('YYYY/MM/DD');
        const hour = date.format('H');
        const min = date.format('mm')
        if (isNaN(dateTime)) {
            if(getDateInboundBlockIn()) {
                return dateTime <= today; 
            }
            return dateTime <= moment().format('YYYY/MM/DD');
        }
        if(dateMin) {
            return Number(dateMin) <= min;
        }
        return dateTime <= hour;
    }
    function validateDateOutboundBlockOut(dateTime, dateMin = null) {
      const date = getDateOutboundBlockOut()
          ? moment(getDateOutboundBlockOut()) : moment();
      const hour = date.format('H');
      const min = date.format('mm');
      if (isNaN(dateTime)) {    
        if(getDateOutboundBlockOut()) {
          return dateTime <= date.format('YYYY/MM/DD') 
          && dateTime >= moment(getDateInboundBlockIn()).format('YYYY/MM/DD');
        }
        return dateTime <= moment().format('YYYY/MM/DD') 
        && dateTime >= moment(getDateInboundBlockIn()).format('YYYY/MM/DD');
      }
      if(dateMin) {
        return Number(dateMin) <= min;
      }
      return dateTime <= hour;
    }
    function getDifferenceInHours(start, end) {
        if(start) {
            const dateStart = moment(start);
            const dateEnd = moment(end);
            const hour = dateEnd.diff(dateStart, 'minutes') / 60;
            return Math.round(hour * 100) / 100;
        }
        return 0;
    }
    function dateFormatter(date) {
        if (!date) return null
        const [year, month, day] = date.substr(0, 10).split('-')
        return `${month}/${day}/${year}`
    }
    function getTableListOfFlights(data) {
        const dataTable = [];
        data.forEach((items, index) => {
          const date = dateFormatter(items.scheduledOn.split("T")[0]);
          const inboundTime = items.estimatedOff ? items.estimatedOff.split("T")[1].substr(0, 5) : '';
          const outboundTime = items.estimatedOn ? items.estimatedOn.split("T")[1].substr(0, 5) : '';
          const flight = {
            index,
            date,
            registration: items.registration,
            inbound: `${inboundTime} - ${items.originAirport.airportName}`,
            outbound: `${outboundTime} - ${items.destinationAirport.airportName}`,
            aircraftType: items.aircraftType,
            faFlightId: items.faFlightId,
          }
          dataTable.push(flight)
        })
        return dataTable;   
    }
    function setResponsible(data){
        state.responsible = data;
    }
    function getResponsible() {
        return state.responsible;
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
        validateFutureDateTime,
        setDateInboundBlockIn,
        getDateInboundBlockIn,
        setDateOutboundBlockOut,
        getDateOutboundBlockOut,
        setDateOutboundScheduledDeparture,
        setDateinboundScheduledArrival,
        getDateOutboundScheduledDeparture,
        getDateinboundScheduledArrival,
        validateDateOutboundBlockOut,
        validateDateInboundBlockIn,
        getDifferenceInHours,
        dateFormatter,
        getTableListOfFlights,
        setResponsible,
        getResponsible,
    }
}