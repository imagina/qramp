<template>
  <form-orders ref="formOrders" />
</template>
<script>
import formOrders from "@imagina/qramp/_components/formOrders.vue"
export default {
  name:'RampCrud',
  components:{
    formOrders
  },
  data() {
    return {
      crudId: this.$uid(),
    }
  },
  computed: {
    crudData() {
      return {
        crudId: this.crudId,
        entityName: config("main.qfly.entityNames.workOrder"),
        apiRoute: 'apiRoutes.qramp.workOrders',
        //permission: 'ifly.fly',
        //extraFormFields: 'ifly.crud-fields.fly',
        create: {
          method: () => {
            this.$refs.formOrders.loadform({
              modalProps: {
                title: this.$tr('ifly.cms.form.newWorkOrder'),
              }
            })
          }
        },
        read: {
          columns: [
            {
              name: 'id', 
              label: this.$tr('isite.cms.form.id'), 
              field: 'id', 
              style: 'width: 50px'
            },
            {
              name: 'user', 
              label: this.$tr('isite.cms.label.user'), 
              field: 'user', 
              align: 'left'
            },
            {
              name: 'status', 
              label: this.$tr('isite.cms.form.status'), 
              field: 'statusId', 
              align: 'left'
            },
            {
              name: 'flightDate', 
              label: this.$tr('ifly.cms.form.flightDate'), 
              field: 'flightDate', 
              align: 'left'
            },
            {
              name: 'customer', 
              label: this.$tr('isite.cms.label.customer'), 
              field: 'model', 
              align: 'left'
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
            {name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left'},
          ],
          filters: {
          },
          requestParams: {
            include: ''
          },
        },
        update: {
          title: this.$tr('ifly.cms.form.updateWorkOrder')
        },
        delete: true,
        formLeft: {
          id: {value: ""},
          userId: {value: this.$store.state.quserAuth.userId},
          model: {
            value: "",
            type: "input",
            props: {
              label: `${this.$tr("ifly.cms.form.aircraftModel")}*`,
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
          manufacturer : {
            value: "",
            type: "input",
            props: {
              label: `${this.$tr("icommerce.cms.form.manufacturer")}*`,
              rules: [(val) => !!val || this.$tr("isite.cms.message.fieldRequired")],
            },
          },
          description : {
            value: '',
            type: 'input',
            props: {
              label: `${this.$tr('isite.cms.form.description')}`,
              type: 'textarea',
              rows: "4",
              debounce: 1500
            },
          },
        }
      }
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  }
}
</script>
<style lang="stylus">
</style>
