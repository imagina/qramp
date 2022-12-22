<template>
  <quick-card :params="quickCardParams">
    <div class="tw-flex">
      <div class="text-center">
        <q-circular-progress
          show-value
          font-size="40px"
          :value="80"
          size="200px"
          :thickness="0.22"
          color="blue-10"
          track-color="grey-3"
          class="q-ma-md tw-text-center"
        >
        {{ 80 }}%
        </q-circular-progress>
      </div>
      <div>
        <p 
          class="
            tw-font-semibold 
            tw-py-5 
            tw-text-base 
            tw-text-justify 
            tw-break-normal"
        >
          Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer
        </p> 
      </div>
  </div>
  </quick-card>
</template>
<script>
//Component
import quickCard from '@imagina/qsite/_components/master/quickCard'

export default {
  props: {},
  components: {quickCard},
  watch: {},
  mounted() {
    this.$nextTick(function () {
    })
  },
  data() {
    return {
      loading: false,
      posts: []
    }
  },
  computed: {
    quickCardParams() {
      return {
        type: 'slot',
        title: 'Percentage',
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
