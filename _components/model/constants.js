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
export const STATUS_SCHEDULE = 5;
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