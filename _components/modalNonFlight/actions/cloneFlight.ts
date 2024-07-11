import moment from "moment-timezone"
import { NON_FLIGHT, OPERATION_TYPE_NON_FLIGHT, STATUS_SCHEDULE } from "../../model/constants"
import modalScheduleStore from 'src/modules/qramp/_components/scheduleKanban/store/modalSchedule.store'

export const cloneFlight = (flight) => {
    return {
        acTypeId: flight.acTypeId,
        adHoc: flight.adHoc,
        businessUnitId: flight.businessUnitId,
        carrierId: flight.carrierId,
        companyId: flight.companyId,
        contractId: flight.contractId,
        customerId: flight.customerId,
        inboundBlockIn: flight.inboundBlockIn,
        inboundFlightNumber: flight.inboundFlightNumber,
        inboundGateArrival: flight.inboundGateArrival,
        inboundOriginAirportId: flight.inboundOriginAirportId,
        inboundScheduledArrival: flight.inboundScheduledArrival,
        inboundTailNumber: flight.inboundTailNumber,
        outboundBlockOut: flight.outboundBlockOut,
        outboundCargoBulkLoaded: flight.outboundCargoBulkLoaded,
        outboundCargoTotalUldsLoaded: flight.outboundCargoTotalUldsLoaded,
        outboundCustomFlightNumber: flight.outboundCustomFlightNumber,
        outboundDestinationAirport: flight.outboundDestinationAirport,
        outboundDestinationAirportId: flight.outboundDestinationAirportId,
        outboundFaFlightId: flight.outboundFaFlightId,
        outboundFlightNumber: flight.outboundFlightNumber,
        outboundGateDeparture: flight.outboundGateDeparture,
        outboundScheduledDeparture: flight.outboundScheduledDeparture,
        outboundTailNumber: flight.outboundTailNumber,
        preFlightNumber: flight.preFlightNumber,
        searchableFields: flight.searchableFields,
        stationId: modalScheduleStore.stationId, //TO-DO: Don't take stationId from this store
        statusId: STATUS_SCHEDULE,
        updatedAt: flight.updatedAt,
        updatedBy: flight.updatedBy,
        operationTypeId: OPERATION_TYPE_NON_FLIGHT,
        type: NON_FLIGHT,
        scheduleDate: moment().format('MM/DD/YYYY HH:mm'),
        parentId: flight.id,
    }
}