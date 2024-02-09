<template></template>
<script>
export default {
  name: 'categories',
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qramp.categories',
        permission: 'ramp.categories',
        create: {
          title: 'Create Category'
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
              align: 'left',
            },
            {
              name: 'sortOrder',
              label: 'Order',
              field: 'sortOrder',
              align: 'left',
              format: val => val ? val : '-'
            },
            {
              name: 'company',
              label: 'Company',
              field: 'company',
              align: 'left',
              format: val => (val && val.companyName) ? val.companyName : '-'
            },
            // {
            //   name: 'parent', 
            //   label: this.$tr('isite.cms.form.parent'), 
            //   field: 'parent', 
            //   align: 'left',
            //   format: val => (val && val.name) ? val.name : '-'
            // },
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
            { 
              name: 'actions', 
              label: this.$tr('isite.cms.form.actions'), 
              align: 'left' 
            },
          ],
          requestParams: {
            include:"company"
          },
        },
        update: {
          title: 'Update Category'
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          name: {
            value: '',
            type: "input",
            props: {
              label: 'Category Name',
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
          sortOrder: {
            value: 0,
            type: 'input',
            props: {
              label: 'Sort Order',
              type: 'number',
            },
          },
          parentId: {
            value: '',
            type: 'select',
            props: {
              label: 'Parent Category',
              clearable: true,
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.categories',
              select: {
                label: 'name', 
                id: 'id'
              },
            }
          },
          companyId: {
            value: '',
            type: 'select',
            props: {
              label: 'Company',
              clearable: true,
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qsetupagione.setupCompanies',
              select: {
                label: 'companyName', 
                id: 'id'
              },
            }
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
