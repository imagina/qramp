export default {
  workOrders: {
    permission: 'ramp.work-orders.manage',
    activated: true,
    authenticated: true,
    path: '/ramp/work-orders/index',
    name: 'qramp.admin.workOrders',
    crud: import('../_crud/workOrders'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'ifly.cms.sidebar.workOrders',
    icon: 'fa-light fa-briefcase',
    subHeader: {
      refresh: true,
    }
  },
  flightMap: {
    //permission: 'ramp.work-orders.manage',
    activated: true,
    authenticated: true,
    path: '/ramp/flight-map/index',
    name: 'qramp.admin.flightMap',
    page: () => import('../_components/flightMap/index.vue'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'ifly.cms.sidebar.map',
    icon: 'fa-light fa-map', 
    subHeader: {
      refresh: true,
    }
  }
}

