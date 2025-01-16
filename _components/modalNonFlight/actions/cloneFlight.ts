import { 
    NON_FLIGHT, 
    STATUS_SCHEDULE,
    DEFAULT_STATION_ID 
} from '../../model/constants'
import store from '../store/index.store'
import qRampStore from '../../../_store/qRampStore'

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
        stationId: store.stationId || DEFAULT_STATION_ID,
        statusId: STATUS_SCHEDULE,
        updatedAt: flight.updatedAt,
        updatedBy: flight.updatedBy,
        operationTypeId: qRampStore().getOperationTypeIdNonFlight(),
        type: NON_FLIGHT,
        scheduleDate: store.seletedDateColumn,
        parentId: flight.id,
    }
}