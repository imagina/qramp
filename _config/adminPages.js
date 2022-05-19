export default {
  workOrders: {
    //permission: 'ifly.aircraftType.manage',
    activated: true,
    authenticated: true,
    path: '/ramp/work-orders/index',
    name: 'qramp.admin.workOrders',
    crud: import('@imagina/qramp/_crud/workOrders'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'ifly.cms.sidebar.workOrders',
    icon: 'fas fa-briefcase',
    subHeader: {
      refresh: true,
    }
  }
}

