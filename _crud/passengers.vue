<template>
  <div>
    <form-orders ref="formOrders" />
    <flightDetail />
    <commentsModal
      ref="commentsModal"
      :commentableId="commentableId"
      isCrud
    />
  </div>
</template>
<script>
import formOrders from "../_components/formOrders.vue"
import {
  STATUS_POSTED,
  STATUS_SUBMITTED,
  STATUS_CLOSED,
  STATUS_DRAFT, 
  STATUS_SCHEDULE,
  BUSINESS_UNIT_PASSENGER,
  COMPANY_PASSENGER
} from "../_components/model/constants"
import qRampStore from '../_store/qRampStore.js'
import flightDetail from '../_components/modal/flightDetail.vue';
import commentsModal from '../_components/schedule/modals/commentsModal.vue'
import htmlComment from '../_components//model/htmlComment.js';
import workOrderList from '../_store/actions/workOrderList.ts';
import cacheOffline from '@imagina/qsite/_plugins/cacheOffline';

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
    },
    'isAppOffline': {
      deep: true,
      handler: async function (newValue) {
        if (!newValue) {
          await workOrderList().getWorkOrders(true);
        }
      }
    }
  },
  async created() {
    this.$nextTick(async () => {
      await qRampStore().setIsPassenger(true);
      await workOrderList().getAllList();
      await workOrderList().getCustomerWithContract()
    })
  },
  beforeDestroy() {
    qRampStore().setFlightList([]);
    qRampStore().setFlightId(null);
  },
  computed: {
    isAppOffline() {
      return this.$store.state.qofflineMaster.isAppOffline;
    },
    permisionCommentsIndex() {
      return this.$auth.hasAccess('ramp.work-orders-comments.index');
    },
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
        permission: 'ramp.passenger-work-orders',
        create: {
          method: async () => {
            await qRampStore().setTitleOffline(this.$tr('ifly.cms.form.newWorkOrder'));
            await qRampStore().setIsPassenger(true);
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
              formatAsync: async item => {
                const response = await workOrderList().getCustomerList()
                  .find(customer => customer.id === item.customerId) || {};
                return `${response.customerName || '-'}`;
              },
              align: 'left'
            },
            {
              name: "comments",
              label: 'Comments',
              field: "comments",
              align: "left",
              format: item => item && item > 0 ? htmlComment(item) : '',
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
              formatColumn: row => {
                const response = workOrderList().getFlightStatusesList()
                  .find(flightStatus => flightStatus.id === row.flightStatusId) || {};
                return {
                  bgTextColor: response && response.color ? `tw-bg-${response.color}` : ''
                }
              },
              formatAsync: async item => {
                const response = await workOrderList().getFlightStatusesList()
                  .find(flightStatus => flightStatus.id === item.flightStatusId) || {};
                return `${response.name || '-'}`;
              },
            },
            {
              name: "inboundFlightNumber",
              label: 'Inbound Flight Number',
              field: item => `${item.inboundFlightNumber ? item.inboundFlightNumber : ''}${item.faFlightId ? '': '(Manually)'}`,
              align: "left",
              format: item => item ? `<span class="tw-border tw-p-1 tw-rounded-md tw-font-medium"/>${item}</span>` : '',
              action: (item) => {
                   const flightNumberInbound = item.faFlightId ? item.faFlightId.split('-')[0] : null;
                   const workOrder = {
                        workOrderId: item.id, 
                        faFlightId: item.faFlightId, 
                        flightNumber: flightNumberInbound || item.inboundFlightNumber,
                        boundScheduleDate: item.inboundScheduleArrival || this.$moment().format('YYYY-MM-DDTHH:mm:ss'),
                        type: 'inbound',
                    }
                  this.getFlightMap(workOrder)
              }
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
              format: item => item ? `<span class="tw-border tw-p-1 tw-rounded-md tw-font-medium"/>${item}</span>` : '',
              action: (item) => {
                  const flightNumberoutbound = item.outboundFaFlightId ? item.outboundFaFlightId.split('-')[0] : null;
                  const workOrder = {
                    workOrderId: item.id, 
                    faFlightId: item.outboundFaFlightId, 
                    flightNumber: flightNumberoutbound || item.outboundFlightNumber,
                    boundScheduleDate: item.outboundScheduledDeparture || this.$moment().format('YYYY-MM-DDTHH:mm:ss'),
                    type: 'outbound',
                }
                this.getFlightMap(workOrder)
              }
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
              formatAsync: async item => {
                const response = await workOrderList().getWorkOrderStatusesList()
                  .find(status => status.id === item.statusId) || {};
                const data = response ? response.statusName + (item.needToBePosted ? "(Posting)" : "") : '-'
                return `${data}`;
              },
              align: 'left'
            },
            {
              name: 'station',
              label: 'Station',
              field: 'stationId',
              formatAsync: async item => {
                if (!item.stationId) return '-';
                const response = await workOrderList().getStationList()
                  .find(station => station.id === item.stationId) || {};
                return `${response.fullName || '-'}`;
              },
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
                requestParams: {
                  filter: {
                    companyId: COMPANY_PASSENGER,
                  },
                },
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
                requestParams: {
                  filter: {
                    companyId: COMPANY_PASSENGER,
                  },
                },
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
                select: { 'label': 'fullName', 'id': 'id' },
                requestParams: {
                  filter: {
                    companyId: COMPANY_PASSENGER,
                  },
                },
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
                requestParams: {
                  filter: {
                    companyId: COMPANY_PASSENGER,
                  },
                },
              },
              props: {
                label: 'Flight Status',
                'clearable': true
              },
            },
            businessUnitId: { value: BUSINESS_UNIT_PASSENGER },
          },
          requestParams: {
            include: 'responsible',
            filter: {
              withoutDefaultInclude: true,
              businessUnitId: BUSINESS_UNIT_PASSENGER,
            },
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
                  vIf: this.permisionCommentsIndex && !this.isAppOffline
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
              apiRoute: "/ramp/v1/work-orders/passenger-bulk-export-csv",
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
                name: 'invoiceLineMemo',
                label: 'Invoice Line Memo',
                field: 'contractLine',
                format: val => val?.InvoiceLineMemo || '-'
              },
              {
                name: 'quantity',
                label: 'Quantity',
                field: 'quantity'
              },
              {
                name: 'rate',
                label: 'Rate',
                field: 'contractLine',
                format: val => val?.rate || '-'
              },
              {
                label: 'Total',
                field: val => {
                    const quantity = val.quantity || 1;
                    const rate = val.contractLine?.rate || 0;
                    return quantity * rate;
                }
              },
              {
                name: 'transactionId',
                label: 'Transaction Id',
                field: 'transactionId'
              },
              {
                name: 'postedAt',
                label: 'Date Posted',
                field: 'postedAt',
                format: (val) => (val ? this.$trdT(val) : "-"),
              },
              {
                name: 'amount',
                label: 'ammount',
                field: 'ammount'
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
    getOfflineTitleStatus(statusId, itemId) {
      const statusObj = {
        1: 'DRAFT',
        2: 'POSTED',
        3: 'SUBMITTED',
        4: 'CLOSED',
        5: 'SCHEDULE',
      }
      return `Work Order ${statusObj[statusId]} - ID ${itemId}`;
    },
    async changeStatus(status, itemId) {
      const API_ROUTE = 'apiRoutes.qramp.workOrderChangeStatus';
      const CACHE_PATH = 'apiRoutes.qramp.workOrders'

      const payload = {
        id: itemId,
        statusId: status
      }
      let customParams = { 
        params: { 
          titleOffline: this.getOfflineTitleStatus(status, itemId) || '' 
        } 
      }

      this.$emit('loading', true)

      payload.offline = this.isAppOffline;
      await cacheOffline.updateRecord(CACHE_PATH, payload, payload?.id);

      const request = this.$crud.update(
        API_ROUTE,
        itemId, 
        payload,
        customParams
      )
      request
        .catch(err => {
          this.$emit('loading', false)
          if (!this.isAppOffline) {
            this.$alert.error({ 
              message: `${this.$tr('isite.cms.message.recordNoUpdated')}` 
            })
          }
        })
        .finally(() => {
          this.$emit('loading', false)
          this.$root.$emit('crud.data.refresh')
        })
    },
    async openModal(item) {
      const titleModal = this.$tr('ifly.cms.form.updateWorkOrder') + (item.id ? ` Id: ${item.id}` : '')
      await qRampStore().setIsPassenger(true);
      await this.$refs.formOrders.loadform({
        modalProps: {
          title: `${this.$tr('ifly.cms.form.updateWorkOrder')} Id: ${item.id}`,
          update: true,
          workOrderId: item.id,
          width: '90vw',
        },
        data: item,
      })
      qRampStore().setTitleOffline(titleModal);
    },
    showWorkOrder(data) {
      if (this.isAppOffline) {
        this.openModal(data);
        return;
      }
      this.$crud.show('apiRoutes.qramp.workOrders', data.id,
        {
          refresh: true,
          params: {
            include: "customer,workOrderStatus,operationType,station,contract,responsible",
          }
        }).then(async (item) => {
          this.openModal(item.data)
        }).catch((err) => {
          console.log(err);
        });
    },
    async getFlightMap(workOrder) {
      try {
        qRampStore().setWorkOrder(workOrder);
        qRampStore().showVisibleMapModal();
      } catch (error) {
        qRampStore().setWorkOrder(null);
        console.log(error);
      }
    },
  }
}
</script>
<style lang="stylus">
</style>
