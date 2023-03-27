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
    icon: 'fas fa-briefcase',
    subHeader: {
      refresh: true,
    }
  }
}

