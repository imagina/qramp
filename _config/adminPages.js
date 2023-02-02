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
    permission: 'ramp.work-order-schedules.manage',
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
    authenticated: false,
    path: '/ramp/schedule/public/index',
    name: 'qramp.admin.public.schedule',
    page: () => import('../_components/schedule/indexBlank.vue'),
    layout: () => import('@imagina/qsite/_layouts/blank.vue'),
    title: 'ifly.cms.sidebar.schedule',
    icon: 'fa-thin fa-calendar-days',
    subHeader: {
      refresh: true,
    }
  },
  scheduleStatus: {
    permission: 'ramp.schedule-statuses.manage',
    activated: true,
    authenticated: true,
    path: '/ramp/schedule-status/index',
    name: 'qramp.admin.scheduleStatus',
    crud: import('../_crud/scheduleStatus.vue'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'ifly.cms.sidebar.scheduleStatus',
    icon: 'fa-thin fa-calendar-days',
    subHeader: {
      refresh: true,
    }
  },
  oagStations: {
    //permission: 'isite.logs.manage',
    activated: false,
    path: '/oagStations/index',
    name: 'qsite.admin.oagStations.index',
    crud: import('../_crud/oagStations'),
    page: () => import('@imagina/qcrud/_pages/admin/crudPage'),
    layout: () => import('@imagina/qsite/_layouts/master.vue'),
    title: 'isite.cms.sidebar.oagStations',
    icon: 'fa-light fa-building-flag',
    authenticated: true,
    subHeader: {
      refresh: true
    }
  },
}

