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
        apiRoute: 'apiRoutes.qramp.attributes',
        permission: 'ramp.attributes',
        create: {
          title: 'Create attribute'
        },
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
              name: 'type',
              label: 'Type',
              field: 'type',
              align: 'left',
              format: val => val ? val : '-'
            },
            {
              name: 'created_at',
              label: this.$tr('isite.cms.form.createdAt'),
              field: 'createdAt',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'updated_at',
              label: this.$tr('isite.cms.form.updatedAt'),
              field: 'updatedAt',
              align: 'left',
              format: (val) => (val ? this.$trd(val) : '-'),
            },
            {
              name: 'actions',
              label: this.$tr('isite.cms.form.actions'),
              align: 'left'
            },
          ],
        },
        update: {
          title: 'Update attribute'
        },
        delete: true,
        formLeft: {
          id: {value: ''},
          name: {
            value: '',
            type: "input",
            props: {
              label: 'Attribute Name',
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
          type: {
            name: 'type',
            value: '',
            type: 'select',
            props: {
              label: 'Type',
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
              options:[
                {
                  label: 'Input',
                  value: 'input'
                },
                {
                  label: 'Select',
                  value: 'select'
                },
                {
                  label: 'Quantity',
                  value: 'quantity'
                },
                {
                  label: 'Quantity Float',
                  value: 'quantityFloat'
                },
                {
                  label: 'Hour',
                  value: 'hour'
                },
                {
                  label: 'Full Date',
                  value: 'fullDate'
                },
                {
                  label: 'Checkbox',
                  value: 'checkbox'
                },
                {
                  label: 'Multiplier',
                  value: 'multiplier'
                },
              ],
              color: "primary"
            },

          },
          multiplierType: {
            value: null,
            type: 'select',
            props: {
              vIf: this.crudInfo.type === 'multiplier',
              label: 'Multiplier Type',
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
              options:[
                {
                  label: 'Employees Security Hours',
                  value: 'employeesSecurityHours'
                },
              ],
              color: "primary"
            },
          },
          fields: {
            value: [],
            type : 'multiplier',
            props: {
              vIf: this.crudInfo.type === 'multiplier',
              label: 'Type',
              multiple: true,
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
              fields : {
                label: {
                  type: 'input',
                  colClass: "col-12",
                  props: {
                    label: 'label',
                  },
                },
                type: {
                  name: 'type',
                  value: '',
                  colClass: "col-12",
                  type: 'select',
                  props: {
                    label: 'Type',
                    rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
                    options:[
                      {
                        label: 'Input',
                        value: 'input'
                      },
                      {
                        label: 'Select',
                        value: 'select'
                      },
                      {
                        label: 'Quantity',
                        value: 'quantity'
                      },
                      {
                        label: 'Quantity Float',
                        value: 'quantityFloat'
                      },
                      {
                        label: 'Hour',
                        value: 'hour'
                      },
                      {
                        label: 'Full Date',
                        value: 'fullDate'
                      },
                      {
                        label: 'Checkbox',
                        value: 'checkbox'
                      },
                    ],
                    color: "primary"
                  },

                },
                options: {
                  type: 'json',
                  colClass: "col-12",
                  props: {label: 'options'}
                }
              },
              color: "primary"
            },

          },
          options: {
            type: 'json',
            props: {label: 'options'}
          }
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
<style lang="scss">
</style>
