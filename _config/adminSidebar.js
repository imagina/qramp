const pages = config('pages') // Get Pages from config

//Blog
export default [
  {
    title: 'ifly.cms.sidebar.rampInfo',
    icon: 'fa-light fa-arrows-up-down-left-right',
    children: [
      pages.qramp.workOrders,
      pages.qramp.flightMap,
      pages.qramp.schedule,
      pages.qramp.workOrderStatuses,
      pages.qramp.categories,
      pages.qramp.services,
      pages.qramp.attributes,
      pages.qramp.operationType
    ]
  },
  {
    title: 'ifly.cms.sidebar.passengerInfo',
    icon: 'fa-light fa-tickets-airline',
    children: [
      pages.qramp.passenger,
      pages.qramp.passengerFlightMap,
      pages.qramp.passengerSchedule,
      pages.qramp.operationTypePassenger
    ]
  },
  {
    title: 'isite.cms.message.request',
    icon: 'fa-light fa-browser',
    children: [
      pages.qramp.oagStations
    ]
  },
  
]
