<template>
  <q-dialog
    v-model="dialogModel"
    persistent
    full-width
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card flat>
      <q-card-section 
        class="tw-flex tw-flex-col tw-items-end"
        :class="{'cardResponsive': responsive}"
      >
        <dynamic-field
          class="tw-w-full sm:tw-w-56 tw-mb-4 justify-self-start"
          v-model="filter" 
          :field="{ type: 'search' }"
        />
        <q-table
          :rows="dataTable"
          :columns="columns"
          :row-key="isNonFlight ? 'id' : 'index'"
          selection="single"
          :grid="responsive"
          :filter="filter"
          v-model:selected="selected"
          class="tw-w-full"
        >
          <template v-slot:header="props">
            <q-tr 
              :props="props" 
              class="tw-w-full tw-z-10 tw-sticky tw-top-0"
            >
              <th class="q-table--col-auto-width"> </th>
              <q-th
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                <b class="tw-text-gray-500 tw-text-sm">
                    {{ col.label }}
                </b>
              </q-th>
            </q-tr>
          </template>
          <template v-slot:body="props">
            <q-tr
              :props="props"
              :class="{
                'tw-bg-red-500': props.row.cancelled
              }"
            >
              <q-td auto-width>
                <q-checkbox
                  dense
                  v-model="props.selected"
                  :label="props.row.name"
                  :disable="props.row.cancelled"
                />
              </q-td>
              <q-td
                v-for="col in props.cols"
                :key="col.name"
                :props="props"
              >
                <span v-html="col.value"/>
              </q-td>
            </q-tr>
          </template>
        </q-table>
      </q-card-section>
      <div
        v-if="alert"
        class="
          tw-flex 
          tw-items-center
          tw-rounded-xl
          tw-p-2
          tw-mx-3
          tw-bg-orange-100
        "
      >
        <section class="tw-flex">
          <!--Icon-->
          <q-icon
            name="fa-solid fa-triangle-exclamation"
            class="tw-text-orange-500"
            size="20px"
          />
          <!--message-->
          <p class="tw-ml-2 tw-font-medium">
            This flight is not completed yet. Please add the additional information to the previous flight.
          </p>
        </section>
        <q-btn
          @click="goToflight"
          class="tw-font-semibold tw-px-1 tw-text-orange-700 tw-ml-2" 
          dense flat rounded no-caps
        >
          Go to the flight
        </q-btn>
      </div>
      <q-card-actions align="right" class="q-mr-sm">
        <q-btn
          rounded
          flat
          label="cancel"
          class="text-capitalize tw-text-gray-500"
          @click="onCancel"
        />
        <q-btn
          v-if="manually && !isNonFlight"
          rounded
          label="Add manually"
          class="q-ml-sm text-capitalize"
          color="grey-6"
          @click="$emit('validateBound')"
        />
        <q-btn
          v-if="!alert && selected.length !== 0"
          rounded
          label="Ok"
          class="q-ml-sm text-capitalize"
          color="primary"
          @click="setForm()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
import qRampStore from '../../_store/qRampStore';
import { 
  NON_FLIGHT,
  columnsFlightAware,
  columnsWorkOrders,
} from '../model/constants.js';
import { checkNonFlightRules } from 'src/modules/qramp/_store/actions/checkNonFlightRules'

export default {
  props: {
    dataTable: {
      type: Array,
      default: () => [],
    },
    dialog: {
      type: Boolean,
      default: false
    },
    manually: {
      type: Boolean,
      default: true,
    }
  },
  emits: ['flightSelect', 'showWorkOrder', 'cancel', 'validateBound'],
  data(){
    return{
      selected:[],
      filter:'',
      alert: false,
    }
  },
  computed:{
    dialogModel: {
      // getter
      get() {
        return this.dialog
      },
      // setter
      set(newValue) {
        this.dialog = newValue
      }
    },
    responsive() {return this.windowSize == 'mobile'},
    windowSize() {
      return this.windowWith >= '450' ? 'desktop' : 'mobile'
    },
    windowWith() {
      return window.innerWidth
    },
    isNonFlight(){
      return qRampStore().getTypeWorkOrder() === NON_FLIGHT;
    },
    columns() {
      return this.isNonFlight ? columnsWorkOrders : columnsFlightAware
    }
  },
  watch: {
    selected(val) {
      if (this.isNonFlight) {
        this.alert = false
        const selectedWorkOrder = Array.isArray(val) ? val[0] : null
        this.alert = checkNonFlightRules(selectedWorkOrder)
      }
    }
  },
  methods: {
    setForm(){
      if(this.selected.length > 0){
        this.$emit('flightSelect', {select:this.selected[0], dialog:false})
        setTimeout(()=> {
          this.selected = []
          this.filter = ''
          this.alert = false
        }, 1000)
      } else {
        this.$alert.error({message: this.$tr('ifly.cms.label.errorFlightSelected')})
      }
    },
    async goToflight() {
      this.$emit('showWorkOrder', this.selected[0])
      this.selected = []
      this.filter = ''
      this.alert = false
    },
    onCancel() {
      this.$emit('cancel', false)
      this.selected = []
      this.filter = ''
      this.alert = false
    }
  },
}
</script>
<style lang="scss">

.cardResponsive {
  overflow-y: scroll;
  height: 500px;
}

.background-color-warn {
  background-color: $warning;
}
</style>
