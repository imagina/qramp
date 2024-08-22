<script>
import { computed } from 'vue'
import quickCard from '@imagina/qsite/_components/master/quickCard';
import billingClosedDate from './components/billingClosedDate.vue'

export default {
name: 'workdaySync',
components: { quickCard, billingClosedDate },
setup() {
  const loading = false

  const quickCardParams = computed(() => {
    return {
      type: 'custom',
      title: 'Update Billing Closed Date',
      icon: 'fa-regular fa-calendar-lines-pen',
      apiRoute: 'apiRoutes.qramp.billingClosedDate',
      requestParams: {
        filter: {"field": "name"}
      },
      component: billingClosedDate,
      apiRoutePost: 'apiRoutes.qramp.updateBillingDate',
      buttonLabel: 'Update date'
    }
  })

  return {
    loading,
    quickCardParams
  }
}
}
</script>
<template>    
  <quick-card :params="quickCardParams" />
</template>
