const moduleName = 'ramp';
const moduleVersion = 'v1';
const urlBase = `/${moduleName}/${moduleVersion}`

const setupModuleName = 'setup';
const setupUrlBase = `/${setupModuleName}/${moduleVersion}`

export default {
  urlBase: urlBase,
  version: moduleVersion,
  workOrders: `${urlBase}/work-orders`,
  workOrdersStatistics: `${urlBase}/work-orders/schedule/statistics`,
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
  setupBusinessUnits: `${setupUrlBase}/business-units`,
  simpleWorkOrders: `${urlBase}/work-orders/simple-work-orders`,
  flightPosition: `${urlBase}/work-orders/flight-position`,
  scheduleStatuses: `${urlBase}/schedule-statuses`,
  schedule: `${urlBase}/work-orders/schedule`,
  workOrdersByStatus: `${urlBase}/dashboard/work-orders-by-status`,
  percentageWorkOrdersPosted: `${urlBase}/dashboard/percentage-work-orders-posted`,
  workOrdersByStatusLines: `${urlBase}/dashboard/work-orders-by-status-lines`,
  comments: `${urlBase}/comments`,
  categories: `${urlBase}/categories`,
  schedulers: `${urlBase}/schedulers`,
  reloadTransactions: `${urlBase}/work-orders/reload-transactions`,
  passengerContractRules: `${urlBase}/passenger-contract-rules`,
  passengerContractRulesUpsert: `${urlBase}/passenger-contract-rules/upsert`,
  billingClosedDate: `/isite/v1/settings/ramp::billingClosedDate`,
  updateBillingDate: `${urlBase}/billing-closed-date`,
  bulkPost: `${urlBase}/work-orders/bulk-post`,
  bulkSubmit: `${urlBase}/work-orders/bulk-submit`,
  bulkExportPdf: `${urlBase}/work-orders/bulk-export-pdf`,
  bulkExportCsv: `${urlBase}/work-orders/bulk-export-csv`,
  passengerBulkExportCsv: `${urlBase}/work-orders/passenger-bulk-export-csv`,
  bulkReloadTransactions: `${urlBase}/work-orders/bulk-reload-transactions`,
  workOrderItems: `${urlBase}/work-order-items`,
  favourites: `${urlBase}/favourites`
}
