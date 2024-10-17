<template>
</template>
<script>
import {COMPANY_SECURITY} from '../_components/model/constants.js'
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
        apiRoute: 'apiRoutes.qramp.operationTypes',
        permission: 'ramp.operation-types',
        create: {
           title: 'Create Operation type'
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
              name: 'operationName',
              label: 'Operation name',
              field: 'operationName',
              format: (val) => (val ? val : "-"),
            },
            {
              name: 'companyId',
              label: 'Company',
              field: 'company',
              format: (val) => (val ? val.companyName : "-"),
            },
            {
              name: 'options type',
              label: 'Options Type',
              field: 'options',
              format: (val) => (val ? val.type : "-"),
            },
            {
              name: 'options cancelled',
              label: 'Options Cancelled',
              field: 'options',
              format: (val) => (val ? val.cancelled : "-"),
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
          requestParams: {
            include: 'company',
            filter: {
              withoutDefaultInclude: true,
              companyId: COMPANY_SECURITY
            },
          }
        },
        update: {
          title: 'Update Operation type'
        },
        delete: true,
        formLeft: {
           operationName: {
            value: null,
            type: "input",
            props: {
              label: 'Operation name',
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
          companyId: {
            value: null,
            type: 'select',
            props: {
              label: 'Company Name',
              rules: [
                val => !!val || this.$tr('isite.cms.message.fieldRequired')
              ],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qsetupagione.setupCompanies',
              select: {label: 'fullName', id: 'id'},
              requestParams: {filter: {id: store.getSetting('ramp::rampCompanies')}}
            }
          },
          options: {
            value: null,
            type: 'json',
            props: {
              label: 'Options'
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
