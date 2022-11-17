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
  },
  schedule: {
    //permission: 'ramp.work-orders.manage',
    activated: true,
    authenticated: true,
    path: '/ramp/schedule/index',
    name: 'qramp.admin.schedule',
    page: () => import('../_components/schedule/index.vue'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'ifly.cms.sidebar.schedule',
    icon: 'fa-thin fa-calendar-days',
    subHeader: {
      refresh: true,
    }
  },
  publicSchedule: {
    //permission: 'ramp.work-orders.manage',
    activated: true,
    authenticated: true,
    path: '/ramp/schedule/public/index',
    name: 'qramp.admin.public.schedule',
    page: () => import('../_components/schedule/indexBlank.vue'),
    layout: () => import('@imagina/qsite/_layouts/blank.vue'),
    title: 'ifly.cms.sidebar.schedule',
    icon: 'fa-thin fa-calendar-days',
    subHeader: {
      refresh: true,
    }
  }
}

