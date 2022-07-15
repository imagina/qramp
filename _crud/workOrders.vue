<template>
  <form-orders ref="formOrders"/>
</template>
<script>
import formOrders from "@imagina/qramp/_components/formOrders.vue"
import {STATUS_POSTED,STATUS_SUBMITTED} from "@imagina/qramp/_components/model/constants"

export default {
  name: 'RampCrud',
  components: {
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
        permission: 'ramp.work-orders',
        create: {
          method: () => {
            this.$refs.formOrders.loadform({
              modalProps: {
                title: this.$tr('ifly.cms.form.newWorkOrder'),
                update: false
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
              field: item => item.customCustomerName || item.customer,
              format: val => this.getCustomerName(val),
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
              format: (val,item) => val ? val.statusName+(item.needToBePosted ? "(Posting)" : "") : '-',
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
            date: {name: "createdAt", quickFilter: true},
            customerId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.setupCustomers',
                select: {'label': 'customerName', 'id': 'id'},
              },
              props: {
                label: 'Customer',
                'clearable': true
              },
            },
            statusId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.workOrderStatuses',
                select: {'label': 'statusName', 'id': 'id'},
              },
              props: {
                label: 'Status',
                'clearable': true
              },
            }
          },
          requestParams: {
            include: 'customer,workOrderStatus,operationType,station,contract'
          },
          actions: [
            {
              name: 'edit',
              icon: 'fas fa-pen',
              label: this.$tr('isite.cms.label.edit'),
              action: (item) => {
                this.$refs.formOrders.loadform({
                  modalProps: {
                    title: `${this.$tr('ifly.cms.form.updateWorkOrder')} Id: ${item.id}`,
                    update:true,
                    workOrderId: item.id,
                  },
                  data: item,
                })
              }
            },
            {
              name: 'submit',
              icon: 'fas fa-check',
              label: this.$tr('isite.cms.label.submit'),
              format: item => ({
              //must have the submit permission and the work order can't be submited or posted
                vIf: this.$auth.hasAccess('ramp.work-orders.submit') && ![STATUS_POSTED,STATUS_SUBMITTED].includes(item.statusId)
              }),
              action: (item) => {
                this.changeStatus(STATUS_SUBMITTED,item.id)
              },
            },
            {
              name: 'post',
              icon: 'fas fa-paper-plane',
              label: this.$tr('isite.cms.label.post'),
              action: (item) => {
                this.changeStatus(STATUS_POSTED,item.id)
              },
              format: item => (
                  {
                    vIf: this.$auth.hasAccess('ramp.work-orders.post') && !item.adHoc && !item.needToBePosted,
                    label:  this.$tr('isite.cms.label.post')

                  }),
            },
            {
              name: 'repost',
              icon: 'fas fa-paper-plane',
              label: 'Repost',
              action: (item) => {
                this.changeStatus(STATUS_POSTED,item.id)
              },
              format: item => (
                  {
                    //must have the specific re-post permission, the work order can't be Ad Hoc and must be un status posted
                    vIf: this.$auth.hasAccess('ramp.work-orders.re-post') && !item.adHoc && item.statusId == STATUS_POSTED
                  }),
            },
          ],
          bulkActions:[
            {
              apiRoute: "/ramp/v1/work-orders/bulk-post",
              permission: "ramp.work-orders.bulk-post",
              criteria: "id",
              props:{
                icon: "fas fa-paper-plane",
                label: "Post"
              }
            },
            {
              apiRoute: "/ramp/v1/work-orders/bulk-submit",
              permission: "ramp.work-orders.bulk-submit",
              criteria: "id",
              props:{
                icon: "fas fa-check",
                label: "Submit"
              }
            },
            {
              apiRoute: "/ramp/v1/work-orders/bulk-export-pdf",
              permission: "ramp.work-orders.bulk-export-pdf",
              criteria: "id",
              props:{
                icon: "fas fa-download",
                label: "Print Bulk(PDF)"
              }
            }
          ],
          relation: {
            apiRoute: 'apiRoutes.qramp.workOrderTransactions',
            requestParams: (row) => {
              return {
                filter: {workOrderId: row.id},
                include: 'product,contractLine'
              }
            },
            columns: [
              {
                name: 'productId',
                label: 'Sale Item Id',
                field: 'product',
                format: val => val?.externalId || '-'
              },
              {
                name: 'productName',
                label: 'Sale Item Name',
                field: 'product',
                format: val => val?.name || '-'
              },
              {
                name: 'contractLineWorkdayId',
                label: 'Contract LI Id',
                field: 'contractLine',
                format: val => val?.contractLineWorkdayId || '-'
              },
              {
                name: 'quantity',
                label: 'Quantity',
                field: 'quantity'
              },
              {
                name: 'transactionId',
                label: 'Transaction Id',
                field: 'transactionId'
              },
              {
                name: 'postedAt',
                label: 'Date Posted',
                field: 'postedAt'
              },
              {
                name: 'amount',
                label: 'Amount',
                field: 'amount'
              }
            ]
          }
        },
        update: false,
        delete: true,
        formLeft: {}
      }
    },

    getCustomerName() {
      return (item) => {
        let customerName = item;
        if(item) {
          customerName = typeof item === 'object' ? item.customerName : item;
        }
        return customerName || '-';
      };
    },
    //Crud info
    crudInfo() {
      return this.$store.state.qcrudComponent.component[this.crudId] || {}
    }
  },
  methods:{
    changeStatus(status, itemId){

      const route = 'apiRoutes.qramp.workOrderChangeStatus';
      const payload = {
          id: itemId,
          statusId: status
      }
      this.$emit('loading', true)
      const request = this.$crud.create(route, payload);
      request.then(res => {
        this.$root.$emit('crud.data.refresh')
        this.$emit('loading', false)
      })
          .catch(err => {
            this.$emit('loading', false)
            this.$alert.error({message: `${this.$tr('isite.cms.message.recordNoUpdated')}`})

          })
    },
  }
}
</script>
<style lang="stylus">
</style>
