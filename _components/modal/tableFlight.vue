<template>
  <q-dialog
    v-model="dialog"
    persistent
    full-width
    class="flight-modal"
    transition-show="slide-up"
    transition-hide="slide-down"
  >
    <q-card flat>
      <q-card-section>
        <q-table
          :data="dataTable"
          :columns="columns"
          row-key="index"
          selection="single"
          :grid="responsive"
          :filter="filter"
          class="my-sticky-header-column-table"
          :selected.sync="selected"
          
        >
          <template v-slot:top-left>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
          </template>
        </q-table>
      </q-card-section>
      <q-card-actions align="right" class="q-mr-sm">
        <q-btn
          rounded
          label="cancel"
          color="grey-6"
          class="text-capitalize"
          @click="$emit('cancel', false)"
        />
        <q-btn
          rounded
          label="select"
          class="q-ml-sm text-capitalize"
          color="primary"
          @click="setForm()"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script>
export default {
  props:{
    dataTable:[],
    dialog: {
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      selected:[],
      filter:'',
      columns:[
        { name: 'date', label: 'Date', field: 'date', sortable: true , align: 'left'},
        { name: 'tailNumber', label: 'Tail Number', field: 'registration', sortable: true , align: 'left'},
        { name: 'inbound', label: 'Departure ', field: 'inbound', align: 'left'},
        { name: 'outbound', label: 'Arrival', field: 'outbound' , align: 'left'},
        { name: 'aircraftType', label: 'Aircraft', field: 'aircraftType', align: 'left'}
      ],
    }
  },
  computed:{
    responsive() {return this.windowSize == 'mobile'},
    windowSize() {
      return this.windowWith >= '450' ? 'desktop' : 'mobile'
    },
    windowWith() {
      return window.innerWidth
    }
  },
  methods: {
    setForm(){
      if(this.selected.length > 0){
        this.$emit('flightSelect', {select:this.selected[0], dialog:false})
        setTimeout(()=> {
          this.selected = []
        }, 1000)
      } else {
        this.$alert.error({message: this.$tr('ifly.cms.label.errorFlightSelected')})
      }
    }
  },
}
</script>
<style lang="stylus">
  .my-sticky-header-column-table
    tr th
      position: sticky
      z-index: 2
      background: $primary
      color: #fff
  .flight-modal
    .q-dialog__inner
      padding 15px 0 0 0
      width 65vw
      @media screen and (max-width: $breakpoint-md)
        width 90vw
      @media screen and (max-width: $breakpoint-xs)
        width 100vw

    .master-dialog
      &__content
        height 100%
        max-height 100%
        width 100%
        max-width 100%
        border-radius $custom-radius 0 0 0 !important

      &__body
        height calc(100vh - 207px)
</style>