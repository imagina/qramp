<template></template>
<script>
export default {
  name: 'scheduleStatus',
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        //entityName: config("main.qfly.entityNames.workOrder"),
        apiRoute: 'apiRoutes.qramp.scheduleStatuses',
        //permission: 'ramp.schedule-statuses',
        create: true,
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
              label: 'name',
              field: 'name',
              align: 'left',
              formatColumn: row => ({
                bgTextColor: row.color ? row.color : ''
              }),
            },
            {
              name: 'color',
              label: 'Color',
              field: 'color',
              align: 'left',
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
        },
        update: false,
        delete: true,
        formLeft: {
          id: {value: ""},
          name: {
            value: "",
            type: "input",
            props: {
              label: `${this.$tr("ifly.cms.form.airportName")}*`,
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
          color: {
            value: "",
            type: "input",
            props: {
              label: `${this.$tr("ifly.cms.form.airportIataCode")}*`,
              rules: [
                (val) => !!val || this.$tr("isite.cms.message.fieldRequired"),
                (val) => val.length >= 8 || this.$tr('isite.cms.message.fieldMinLeng', {num: 8})
              ],
            },
          },
        }
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
