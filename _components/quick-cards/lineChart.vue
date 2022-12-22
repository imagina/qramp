<template>
  <quick-card :params="quickCardParams">
    <QCharts :chartsData="chartData" />
  </quick-card>
</template>
<script>
//Component
import quickCard from '@imagina/qsite/_components/master/quickCard';
import QCharts from '@imagina/qsite/_components/master/charts.vue';

export default {
  props: {},
  components: {quickCard, QCharts},
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      loading: false,
      posts: [],
      dataChart: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Data One',
            backgroundColor: '#8A2BE2',
            data: [0.9, 39, 25, 40]
          }
        ]
      },
    }
  },
  computed: {
    chartData() {
      if (this.dataChart.datasets.length === 0) return;
      return {
        type: 'lineChart',
        dataSets: this.dataChart.datasets,
        dataLabels: this.dataChart.labels
      }
    },
    quickCardParams() {
      return {
        type: 'slot',
        title: 'Ramp',
        icon: 'fas fa-users',
        actionTo: 'quser.admin.users'
      }
    }
  },
  methods: {}
}
</script>
<style lang="stylus">
</style>
