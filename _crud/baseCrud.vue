<template>
  <div>
  </div>
</template>
<script>

export default {
  name: 'RampCrud',
  components: {},
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  provide() {
    return {}
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qfly.entityNames.workOrder"),
        read: {},
        update: false,
        delete: true,
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
  methods: {}
}
</script>
<style lang="stylus">
</style>
