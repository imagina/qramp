export const STEP_FLIGHT = 1;
export const STEP_SERVICE = 2;
export const STEP_REMARKS = 3;
export const STEP_SIGNATURE = 4;
export const STATUS_DRAFT = 1;
export const STATUS_POSTED = 2;
export const STATUS_SUBMITTED = 3;
export const STATUS_CLOSED = 4;
export const STATUS_SCHEDULE = 5;
export const CATEGORY_SERVICES = 1;
export const COLOR_DRAFT = 'tw-text-orange-500';
export const COLOR_POSTED = 'tw-text-green-500';
export const COLOR_SUBMITTED = 'tw-text-purple-500';
export const COLOR_CLOSED = 'tw-text-blue-300';
export const COLOR_SCHEDULE = 'tw-text-pink-500';

export const modelDataBound = {
    destinationAirport: {
        id: null,
    },
    originAirport: {
        id: null,
    },
    estimatedOff: null,
    registration: null,
    estimatedOn: null,
};
export const modelFlightBoundFormStatus = {
    boundOriginAirportId: true,
    boundTailNumber: true,
    boundScheduled: true,
    boundScheduledDeparture: true,
    boundDestinationAirport: true,
};

export const FlightformFieldModel = [
    'customerId',
    'stationId',
    'acTypeId',
    'operationTypeId',
    'carrierId',
    'gateId',
    'statusId',
    'inboundBlockIn',
    'outboundBlockOut'
  ];
  export const FlightformFieldPassengerModel = [
    'customerId',
    'stationId',
    'acTypeId',
    'operationTypeId',
    'carrierId',
    'statusId',
    'inboundBlockIn',
    'outboundBlockOut'
  ];

  export const HalfTurnInBountModel = [
    'inboundFlightNumber',
    'inboundOriginAirportId',
    'inboundTailNumber',
    'inboundScheduledArrival',
  ];

  export const HalfTurnOutBountModel = [
    'outboundFlightNumber',
    'outboundDestinationAirportId',
    'outboundTailNumber',
    'outboundScheduledDeparture',
  ];

  export const HalfTurnInBountPassengerModel = [
    'inboundFlightNumber',
    'inboundOriginAirportId',
    'inboundTailNumber',
    'inboundScheduledArrival',
    'gateDestination',
  ];

  export const HalfTurnOutBountPassengerModel = [
    'outboundFlightNumber',
    'outboundDestinationAirportId',
    'outboundTailNumber',
    'outboundScheduledDeparture',
    'gateOrigin'
  ];