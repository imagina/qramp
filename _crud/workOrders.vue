<template>
  <div>
    <form-orders ref="formOrders" />
    <flightDetail />
    <commentsModal
      ref="commentsModal"
      :commentableId="commentableId"
    />
  </div>
</template>
<script>
import formOrders from "../_components/formOrders.vue"
import {
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_CLOSED,
  STATUS_DRAFT, STATUS_SCHEDULE
} from "../_components/model/constants"
import qRampStore from '../_store/qRampStore.js'
import flightDetail from '../_components/modal/flightDetail.vue';
import commentsModal from '../_components/schedule/modals/commentsModal.vue'

export default {
  name: 'RampCrud',
  components: {
    formOrders,
    flightDetail,
    commentsModal,
  },
  data() {
    return {
      crudId: this.$uid(),
      areaId: null,
      commentableId: null,
    }
  },
  provide() {
    return {
      showWorkOrder: this.showWorkOrder,
      openModal: true,
    }
  },
  watch: {
    '$filter.values': {
      deep: true,
      handler: function (newValue, oldValue) {
        if (JSON.stringify(newValue) !== JSON.stringify(oldValue))
        this.areaId = this.$filter.values.areaId;
      }
    }
  },
  beforeDestroy() {
    qRampStore().setFlightList([]);
    qRampStore().setFlightId(null);
  },
  computed: {
    filter() {
      console.log(this.$filter);
      return this.$filter;
    },
    editPermissionseSubmitted() {
      return qRampStore().editPermissionseSubmitted();
    },
    validateStatus() {
      return statusId =>
        statusId == STATUS_DRAFT
        || statusId == STATUS_CLOSED
        || statusId == STATUS_POSTED
        || statusId == STATUS_SCHEDULE
        || (statusId == STATUS_SUBMITTED
        && this.editPermissionseSubmitted)
    },
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
                update: false,
                width: '35vw'
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
              style: 'width: 50px',
              action: (item) => false
            },
            /*{
              name: 'referenceId',
              label: 'Reference Id',
              field: 'referenceId',
              align: 'left'
            },*/
            {
              name: 'customer',
              label: this.$tr('isite.cms.label.customer'),
              field: item => item.customCustomerName || item.customer,
              format: val => this.getCustomerName(val),
              align: 'left'
            },
            {
              name: "comments",
              label: 'Comments',
              field: "comments",
              align: "left",
              format: item => item !== 0 ? `<span class="tw-px-2 text-black tw-text-base">${item}</span>
              <i class="fa-light fa-comment-lines tw-text-lg tw-font-semibold" ></i>` : '',
              formatColumn: row => ({
                textColor: row.comments ? `red-5` : ''
              }),
              action: (item) => {
                this.commentableId = item.id || null;
                if(this.$refs.commentsModal) {
                  this.$refs.commentsModal.showModal();
                }
              },
            },
            {
              name: "flightStatus",
              label: 'Flight Status',
              field: "flightStatus",
              align: "left",
              format: item => item ? item.name  : "",
              formatColumn: row => ({
                bgTextColor: row.flightStatus ? `tw-bg-${row.flightStatus.color}` : ''
              }),
               action: (item) => this.getFlightMap(item),
            },
            {
              name: "inboundFlightNumber",
              label: 'Inbound Flight Number',
              field: item => `${item.inboundFlightNumber ? item.inboundFlightNumber : ''}${item.faFlightId ? '': '(Manually)'}`,
              align: "left",
              format: item => item ? item : '',
            },
            {
              name: "inboundScheduledArrival",
              label: 'Arrival',
              field: "inboundScheduledArrival",
              align: "left",
              format: (val) => (val ? this.$trdT(val) : "-"),
             sortable: true
            },
            {
              name: "outboundFlightNumber",
              label: 'Outbound Flight Number',
              field: item => `${item.inboundFlightNumber ? item.inboundFlightNumber : ''}${item.faFlightId ? '': '(Manually)'}`,
              align: "left",
              format: item => item ? item : '',
            },
            {
              name: "outboundScheduledDeparture",
              label: 'Departure',
              field: "outboundScheduledDeparture",
              align: "left",
              format: (val) => (val ? this.$trdT(val) : "-"),
              sortable: true
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
              format: (val, item) => val ? val.statusName + (item.needToBePosted ? "(Posting)" : "") : '-',
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
              name: 'responsible',
              label: 'Responsible',
              field: 'responsible',
              format: val => val ? val.fullName : '-',
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
            { name: 'actions', label: this.$tr('isite.cms.form.actions'), align: 'left' },
          ],
          filters: {
            date: {
              props:{
                label: "Block-in/out Date"
              },
              name: "blockInBlockOut",
              field: {value: 'blockInBlockOut'},
              quickFilter: true
            },
            customerId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qramp.setupCustomers',
                select: { 'label': 'customerName', 'id': 'id' },
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
                select: { 'label': 'statusName', 'id': 'id' },
              },
              props: {
                label: 'Status',
                'clearable': true
              },
            },
            stationId: {
              value: null,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qsetupagione.setupStations',
                select: { 'label': 'stationName', 'id': 'id' },
              },
              props: {
                label: 'Station',
                'clearable': true
              },
            },
            adHoc: {
              value: null,
              type: 'select',
              quickFilter: true,
              props: {
                label: 'Ad Hoc',
                clearable: true,
                options:[
                {label: this.$tr('isite.cms.label.yes'), value: true,},
                {label: this.$tr('isite.cms.label.no'), value: false,},
              ],
              },
            },
            flightStatusId: {
              value: null,
              type: 'select',
              quickFilter: true,
              loadOptions: {
                apiRoute: 'apiRoutes.qfly.flightStatuses',
                select: {'label': 'name', 'id': 'id'},
              },
              props: {
                label: 'Flight Status',
                'clearable': true
              },
            },
            areaId: {
              value: null,
              type: 'select',
              loadOptions: {
                apiRoute: 'apiRoutes.qsetupagione.areas',
                select: { 'label': 'name', 'id': 'id' },
              },
              props: {
                label: 'Areas',
                'clearable': true
              },
            },
          },
          requestParams: {
            include: 'customer,workOrderStatus,operationType,station,contract,responsible,inboundOriginAirport,outboundDestinationAirport,flightStatus',
          },
          actions: [
            {
              name: 'edit',
              icon: 'fal fa-pen',
              label: this.$tr('isite.cms.label.edit'),
              format: item => ({
                label: this.validateStatus(item.statusId) ? this.$tr('isite.cms.label.edit') : this.$tr('isite.cms.label.show'),
                icon: this.validateStatus(item.statusId) ? 'fal fa-pen' : 'fal fa-eye',
              }),
              action: (item) => {
                this.showWorkOrder(item)
              }
            },
            {
              name: 'close',
              icon: 'fal fa-check',
              label: this.$tr('isite.cms.label.closeFlight'),
              format: item => ({
                //must have the submit permission and the work order can't be submited or posted
                vIf: ![STATUS_POSTED, STATUS_SUBMITTED,STATUS_CLOSED].includes(item.statusId)
              }),
              action: (item) => {
                this.changeStatus(STATUS_CLOSED, item.id)
              },
            },
            {
              name: 'submit',
              icon: 'fal fa-check-double',
              label: this.$tr('isite.cms.label.submit'),
              format: item => ({
                //must have the submit permission and the work order can't be submited or posted
                vIf: this.$auth.hasAccess('ramp.work-orders.submit') && ![STATUS_POSTED, STATUS_SUBMITTED].includes(item.statusId)
              }),
              action: (item) => {
                this.changeStatus(STATUS_SUBMITTED, item.id)
              },
            },
            {
              name: 'post',
              icon: 'fal fa-paper-plane',
              label: this.$tr('isite.cms.label.post'),
              action: (item) => {
                this.changeStatus(STATUS_POSTED, item.id)
              },
              format: item => (
                {
                  vIf: this.$auth.hasAccess('ramp.work-orders.post') && !item.adHoc && !item.needToBePosted  && ![STATUS_POSTED].includes(item.statusId),
                  label: this.$tr('isite.cms.label.post')

                }),
            },
            {
              name: 'repost',
              icon: 'fas fa-paper-plane',
              label: 'Repost',
              action: (item) => {
                this.changeStatus(STATUS_POSTED, item.id)
              },
              format: item => (
                {
                  //must have the specific re-post permission, the work order can't be Ad Hoc and must be un status posted
                  vIf: this.$auth.hasAccess('ramp.work-orders.re-post') && !item.adHoc && item.statusId == STATUS_POSTED
                }),
            },
            {
              name: 'Comments',
              icon: 'fa-light fa-comment',
              label: 'Comments',
              action: (item) => {
                this.commentableId = item.id || null;
                if(this.$refs.commentsModal) {
                    this.$refs.commentsModal.showModal();
                }
              },
              format: item => (
                {
                  vIf: this.$auth.hasAccess('ramp.work-orders-comments.index') 
                }),
            },
          ],
          bulkActions: [
            {
              apiRoute: "/ramp/v1/work-orders/bulk-post",
              permission: "ramp.work-orders.bulk-post",
              criteria: "id",
              props: {
                icon: "fas fa-paper-plane",
                label: "Post"
              }
            },
            {
              apiRoute: "/ramp/v1/work-orders/bulk-submit",
              permission: "ramp.work-orders.bulk-submit",
              criteria: "id",
              props: {
                icon: "fas fa-check",
                label: "Submit"
              }
            },
            {
              apiRoute: "/ramp/v1/work-orders/bulk-export-pdf",
              permission: "ramp.work-orders.bulk-export-pdf",
              criteria: "id",
              props: {
                icon: "fas fa-download",
                label: "Print Bulk(PDF)"
              }
            },
            {
              apiRoute: "/ramp/v1/work-orders/bulk-export-csv",
              permission: "ramp.work-orders.bulk-export-csv",
              criteria: "id",
              props: {
                icon: "fas fa-download",
                label: "Bulk(CSV)"
              }
            }
          ],
          relation: {
            permission: "ramp.work-orders.see-workday-transactions",
            apiRoute: 'apiRoutes.qramp.workOrderTransactions',
            requestParams: (row) => {
              return {
                filter: { workOrderId: row.id },
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
        if (item) {
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
  methods: {
    changeStatus(status, itemId) {

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
          this.$alert.error({ message: `${this.$tr('isite.cms.message.recordNoUpdated')}` })

        })
    },
    showWorkOrder(data) {
      this.$crud.show('apiRoutes.qramp.workOrders', data.id,
        {
          refresh: true,
          params: {
            include: "customer,workOrderStatus,operationType,station,contract,responsible"
          }
        }).then((item) => {
          this.$refs.formOrders.loadform({
            modalProps: {
              title: `${this.$tr('ifly.cms.form.updateWorkOrder')} Id: ${data.id}`,
              update: true,
              workOrderId: data.id,
              width: '90vw'
            },
            data: item.data,
          })
        }).catch((err) => {
          console.log(err);
        });
    },
    async getFlightMap(workOrder) {
      try{
          qRampStore().setFlightId(workOrder.id);
          const response = await qRampStore().getFlights();
          if(response.status === 204 || !response.data.flightPosition) {
            this.$alert.warning({message: this.$tr('ifly.cms.message.flightDetails')})
            return; 
          }
          qRampStore().showVisibleMapModal();
          qRampStore().setLoadingModalMap(true);
          
          setTimeout(() => {
            qRampStore().setLoadingModalMap(false);
          }, 1000);
      } catch (error) {
        qRampStore().setFlightMap(null);
        qRampStore().setFlightId(null);
        qRampStore().setLoadingModalMap(false);
        console.log(error);
      }
    },
  }
}
</script>
<style lang="stylus">
</style>
