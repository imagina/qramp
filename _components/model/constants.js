export const STEP_FLIGTH = 1;
export const STEP_CARGO = 2;
export const STEP_SERVICE = 3;
export const STEP_EQUIPMENT = 4;
export const STEP_CREW = 5;
export const STEP_REMARKS = 6;
export const STEP_SIGNATURE = 7;
export const STATUS_DRAFT = 1;
export const STATUS_POSTED = 2;
export const STATUS_SUBMITTED = 3;
export const STATUS_CLOSED = 4;
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