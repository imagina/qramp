<template>
</template>
<script>
import {COMPANY_PASSENGER} from '../_components/model/constants.js'
export default {
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  created() {},
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        //entityName: config("main.qfly.entityNames.workOrder"),
        apiRoute: 'apiRoutes.qramp.paxOperationTypes',
        permission: 'ramp.pax-operation-types',
        create: {
          title: 'Create Pax Operation type'
        },
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
              action: (item) => false
            },
            {
              name: 'name',
              label: 'Name',
              field: 'name',
              format: (val) => (val ? val : "-"),
            },
            {
              name: "created_at",
              label: this.$tr("isite.cms.form.createdAt"),
              field: "createdAt",
              align: "left",
              format: (val) => (val ? this.$trd(val) : "-"),
            },
            {
              name: "updated_at",
              label: this.$tr("isite.cms.form.updatedAt"),
              field: "updatedAt",
              align: "left",
              format: (val) => (val ? this.$trd(val) : "-"),
            },
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
          ],
          filters: {},
          actions: [],
        },
        update: {
          title: 'Update Pax Operation type'
        },
        delete: true,
        formLeft: {
          name: {
            value: null,
            type: "input",
            props: {
              label: 'Name',
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
        },
        formRight: {}
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
  methods: {
  }
}
</script>
<style lang="stylus">
</style>
