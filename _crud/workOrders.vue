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
              name: 'referenceId',
              label: 'Reference Id',
              field: 'referenceId',
              align: 'left'
            },
            {
              name: 'customer',
              label: this.$tr('isite.cms.label.customer'),
              field: 'customer',
              format: val => val ? val.customerName : '-',
              align: 'left'
            },
            {
              name: 'adHoc',
              label: 'Ad Hoc',
              field: 'adHoc',
              format: val => val ? 'Yes' : 'No',
              align: 'left'
            },
            {
              name: 'statusName',
              label: this.$tr('isite.cms.form.status'), 
              field: 'workOrderStatus',
              format: val => val ? val.statusName : '-',
              align: 'left'
            },
            {
              name: 'operationType',
              label: 'Operation Type',
              field: 'operationType',
              format: val => val ? val.operationName : '-',
              align: 'left'
            },
            {
              name: 'station',
              label: 'Station',
              field: 'station',
              format: val => val ? val.stationName : '-',
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
            include: 'customer,workOrderStatus,operationType,station'
          },
          actions: [
            {
              name: 'show',
              icon: 'far fa-eye',
              label: this.$tr('isite.cms.label.show'),
              action: (item) => {
                this.$refs.formOrders.loadform({
                  modalProps: {
                    title: `${this.$tr('ifly.cms.form.updateWorkOrder')} Id: ${item.id}`,
                  },
                  data: item
                })
              }
            },
          ]
        },
        update: false,
        delete: true,
        formLeft: {
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
