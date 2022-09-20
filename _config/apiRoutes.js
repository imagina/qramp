const moduleName = 'ramp';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`

const setupModuleName = 'setup';
const setupUrlBase = `/${setupModuleName}/${moduleVersion}`

const flightModuleName = 'flight';
const flightUrlBase = `/${flightModuleName}/${moduleVersion}`

export default {
  urlBase: urlBase,
  version: moduleVersion,
  workOrders: `${urlBase}/work-orders`,
  workOrderChangeStatus: `${urlBase}/work-orders/change-status`,
  workOrderStatuses: `${urlBase}/work-order-statuses`,
  operationTypes: `${urlBase}/operation-types`,
  setupContracts: `${setupUrlBase}/contracts`,
  setupCustomers: `${setupUrlBase}/customers`,
  setupCompanies: `${setupUrlBase}/companies`,
  setupBuildings: `${setupUrlBase}/buildings`,
  setupStations: `${setupUrlBase}/stations`,
  workOrderDelays: `${urlBase}/work-order-delays`,
  products: `${urlBase}/products`,
  attributes: `${urlBase}/attributes`,
  workOrderTransactions: `${urlBase}/workday-transactions`,
  contractRules: `${urlBase}/contract-rules`,
  setupBusinessUnitTypes: `${setupUrlBase}/business-unit-types`,
  simpleWorkOrders: `${urlBase}/work-orders/simple-work-orders`,
  flightawareMap: `${flightUrlBase}/flightaware/map`,
}
