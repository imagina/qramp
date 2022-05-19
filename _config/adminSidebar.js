const pages = config('pages') // Get Pages from config

//Blog
export default [
  {
    title: 'ifly.cms.sidebar.rampInfo',
    icon: 'fas fa-arrows-alt',
    children: [
      pages.qramp.workOrders,
    ]
  },
]
