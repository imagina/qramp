import pages from 'src/setup/pages' // Get Pages from config

//Blog
export default [
  {
    title: 'ifly.cms.sidebar.rampInfo',
    icon: 'fa-light fa-arrows-up-down-left-right',
    children: [
      pages.qramp.workOrders,
      pages.qramp.schedule,
      pages.qramp.operationType,
      pages.qramp.flightMap,
    ]
  },
  {
    title: 'ifly.cms.sidebar.passengerInfo',
    icon: 'fa-light fa-tickets-airline',
    children: [
      pages.qramp.passenger,
      pages.qramp.passengerSchedule,
      pages.qramp.operationTypePassenger,
      pages.qramp.passengerFlightMap,
      pages.qramp.fueling,
      pages.qramp.labor
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
