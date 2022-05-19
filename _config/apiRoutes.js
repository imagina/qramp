const moduleName = 'flight';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`


export default {
  urlBase : urlBase,
  version: moduleVersion,
  aircraftTypes: `${urlBase}/aircraft-types`,
  airlines: `${urlBase}/airlines`,
  airports: `${urlBase}/airports`,
  flightSchedules: `${urlBase}/flight-schedules`,
  flightScheduleLegs: `${urlBase}/flight-schedule-legs`,
  flight: `${urlBase}/flights`,
}
