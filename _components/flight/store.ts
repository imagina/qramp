import { reactive } from 'vue';

const state = reactive({
    form: {
        operationTypeId: '',
        statusId: '',
        inboundCustomFlightNumber: '',
        outboundCustomFlightNumber: '',
        inboundFlightNumber: '',
        inboundOriginAirportId: '',
        outboundFlightNumber: '',
        outboundDestinationAirportId: '',
        customerId: '',
        customCustomer: '',
        adHoc: '',
        carrierId: '',
        stationId: '',
        inboundTailNumber: '',
        inboundBlockIn: '',
        inboundScheduledArrival: '',
        outboundTailNumber: '',
        outboundScheduledDeparture: '',
        outboundBlockOut: '',
        gateId: '',
        acTypeId: '',
        responsibleId: null,
        faFlightId: null,
        flightStatusId: null,
        preFlightNumber: null,
        date: '',
        sta: null,
        std: null,
        scheduleStatusId: null,
        estimatedOffUtc: null,
        estimatedOnUtc: null,
        comments: 0,
        customerName: null,
        contractId: null,
        contractName: null,
    },
});

export default function flightStore() {
    
    function getForm() {
        return state.form;
    }
    
    function setForm(flight): void {
        state.form.operationTypeId = flight['operationTypeId'] ? flight['operationTypeId'].toString() : ''
        state.form.statusId = flight['statusId'] ? flight['statusId'].toString() : ''
        state.form.inboundCustomFlightNumber = flight['inboundCustomFlightNumber'] ? flight['inboundCustomFlightNumber'] : ''
        state.form.outboundCustomFlightNumber = flight['outboundCustomFlightNumber'] ? flight['outboundCustomFlightNumber'] : ''
        state.form.inboundFlightNumber = flight['inboundFlightNumber'] ? flight['inboundFlightNumber'].toString() : ''
        state.form.inboundOriginAirportId = flight['inboundOriginAirportId'] ? flight['inboundOriginAirportId'].toString() : ''
        state.form.outboundFlightNumber = flight['outboundFlightNumber'] ? flight['outboundFlightNumber'].toString() : ''
        state.form.outboundDestinationAirportId = flight['outboundDestinationAirportId'] ? flight['outboundDestinationAirportId'].toString() : ''
        state.form.customerId = flight['customerId'] ? flight['customerId'].toString() : ''
        state.form.customCustomer = flight['customCustomer'] ? flight['customCustomer'] : 0
        state.form.adHoc = flight['adHoc'] ? flight['adHoc'] : 0
        state.form.carrierId = flight['carrierId'] ? flight['carrierId'].toString() : ''
        state.form.stationId = flight['stationId'] ? flight['stationId'].toString() : ''
        state.form.inboundTailNumber = flight['inboundTailNumber'] ? flight['inboundTailNumber'].toString() : ''
        state.form.inboundBlockIn = flight['inboundBlockIn'] ? flight['inboundBlockIn'].toString() : ''
        state.form.inboundScheduledArrival = flight['inboundScheduledArrival'] ? flight['inboundScheduledArrival'].toString() : ''
        state.form.outboundTailNumber = flight['outboundTailNumber'] ? flight['outboundTailNumber'].toString() : ''
        state.form.outboundScheduledDeparture = flight['outboundScheduledDeparture'] ? flight['outboundScheduledDeparture'].toString() : ''
        state.form.outboundBlockOut = flight['outboundBlockOut'] ? flight['outboundBlockOut'].toString() : ''
        state.form.gateId = flight['gateId'] ? flight['gateId'].toString() : ''
        state.form.acTypeId = flight['acTypeId'] ? flight['acTypeId'].toString() : ''
        state.form.responsibleId = flight['responsibleId'] ? flight['responsibleId'] : null;
        state.form.faFlightId = flight['faFlightId'] ? flight['faFlightId'] : null;
        state.form.flightStatusId = flight['flightStatusId'] ? flight['flightStatusId'] : null;
        state.form.preFlightNumber = flight['preFlightNumber'] ? flight['preFlightNumber'] : null;
        state.form.date = flight['date'] ? flight['date'] : null;
        state.form.sta = flight['sta'] ? flight['sta'] : null;
        state.form.std = flight['std'] ? flight['std'] : null;
        state.form.scheduleStatusId = flight['scheduleStatusId'] ? flight['scheduleStatusId'] : null;
        state.form.estimatedOffUtc = flight['estimatedOffUtc'] ? flight['estimatedOffUtc'] : null;
        state.form.estimatedOnUtc = flight['estimatedOnUtc'] ? flight['estimatedOnUtc'] : null;
        state.form.comments = flight['comments'] ? flight['comments'] : 0;
        const customerName = flight.customer ? flight.customer.customerName : null;
        const customCustomerName =  flight.customCustomerName ? flight.customCustomerName : null;
        state.form.customerName = customerName || customCustomerName;
        state.form.contractId = flight.contractId ? flight.contractId : null;
        state.form.contractName = flight.contract ? flight.contract.contractName : null;
    }
    
    function payload() {
        
    }
    /**
     * It resets the state of the form and delayList to their default values.
     */
    function reset(): void {
    }
    return {
        getForm,
        setForm,
        reset,
        payload,
    }
}