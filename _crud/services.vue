<template></template>
<script>
export default {
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        apiRoute: 'apiRoutes.qramp.products',
        permission: 'ramp.products',
        read: {
          columns: [
            {
              name: 'id',
              label: this.$tr('isite.cms.form.id'),
              field: 'id',
              style: 'width: 50px',
            },
            {
              name: 'name',
              label: 'Name',
              field: 'name',
              align: 'left',
            },
            {
              name: 'externalId',
              label: 'Workday ID',
              field: 'externalId',
              align: 'left',
            },
            {
              name: 'helpText',
              label: 'Help text',
              field: 'helpText',
              format: val => val ? val : '-',
              align: 'left',
            },
            {
              name: 'status',
              label: this.$tr('isite.cms.form.status'),
              field: 'status',
              align: 'left'
            },
            {
              name: 'type',
              label: 'Type',
              field: 'type',
              format: val => (val == 1) ? 'Full Date' : ((val == 2) ?'Delay with Headcounts' : '-'),
              align: 'left'
            },
            {
              name: 'sortOrder',
              label: 'Order',
              field: 'sortOrder',
              align: 'left',
              format: val => (val && val.sortOrder) ? val.companyName : '-'
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
            {
              name: 'actions',
              label: this.$tr('isite.cms.form.actions'),
              align: 'left'
            },
          ],
          requestParams: {
            include:"categories,attributes"
          },
        },
        create: false,
        update: {
          title: 'Update Sales Line Items',
          requestParams: {
            include:"categories,attributes"
          }
        },
        delete: false,
        formLeft: {
          id: {
            value: ''
          },
          name: {
            value: "",
            type: "input",
            props: {
              label: 'Product Name',
              readonly: true,
            },
          },
          helpText: {
            value: "",
            type: "input",
            props: {
              label: 'Help text',
            },
          },
          status: {
            name: 'status',
            value: '',
            type: 'select',
            props: {
              label: 'Status',
              options:[
                {
                  label: this.$tr('isite.cms.label.enabled'),
                  value: true
                },
                {
                  label: this.$tr('isite.cms.label.disabled'),
                  value: false
                }
              ],
              color: "primary"
            },

          },
          sortOrder: {
            value: null,
            type: "input",
            props: {
              label: 'Sort order',
              type: "number",
              mask: "###################",
            },
          },
          categories: {
            value: null,
            type: 'crud',
            props: {
              crudType: 'select',
              crudData: import('./categories.vue'),
              crudProps: {
                multiple: true,
                useChips: true,
                clearable: true,
                label: this.$trp('isite.cms.form.category'),
              },
              config: {
                options: {
                  label: 'name',
                  value: 'id',
                }
              },
            },
          },
          attributes: {
            value: null,
            type: 'treeSelect',
            isFakeField: true,
            props: {
              multiple: true,
              useChips: true,
              clearable: true,
              label: 'Fields',
              sortValueBy: 'ORDER_SELECTED'
            },
            loadOptions: {
              apiRoute: 'apiRoutes.qramp.attributes',
              select: {
                label: 'name',
                id: 'id'
              },
            }
          },
          type: {
            value: null,
            type: "select",
            props: {
              label: 'Type (AGIONE)',
              options:[
                {label: 'Full Date', value: 1},
                {label: 'Delay with Headcounts', value: 2},
                {label: 'Price with Quantity', value: 3},
                {label: 'Employees + Range', value: 4}
              ]
            },
          },
        },
        formRight: {},
        getDataForm: (data) => {
          return new Promise(resolve => {
            const newData = structuredClone(data)
            newData.attributes = newData?.options?.attributes || []
            resolve(newData)
          })
        },
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
}
</script>
