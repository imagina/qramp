<template>
  <div id="services-container">
    <div class="q-px-md">
      <q-input clearable borderless standout dense rounded style="max-width: 100%"
      color="primary" :placeholder="`${$tr('ifly.cms.label.search',{capitalize : true})}...`"
      class="q-my-md q-ml-md q-mr-xs  search">
        <template v-slot:prepend>
          <q-icon color="primary" class="q-pl-sm" name="search" />
        </template>
      </q-input>
      <expansion-component class="q-px-md" :data="services" @value="setValue($event)"/>
    </div>
  </div>
</template>

<script>
import expansionComponent from '@imagina/qramp/_components/expansionComponent.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  props:{
    readonly: true,
    toolbar:{}
  },
  components:{expansionComponent},
  mixins:[responsive],
  data(){
    return{
    }
  },
  methods: {
    setValue(value) {
      console.log('valor', value)
    }
  },
  computed:{
    pageActions() {
      return [
        'search',
      ]
    },
    services(){
      return[
        {
          icon:'delete_outline',
          title:'Regulated Garbage',
          formField:{
            quantity: {
              name:'quantity0',
              value:0,
              type: 'quantity',
              props: {
                readonly: this.readonly,
                clearable: true,
                color:"primary",
              },
            },
          }
        },
        {
          title:'Marshalling',
          icon:'gesture',
          formField:{
            hour: {
              name:'time0',
              value: '',
              type: 'fullDate',
              props: {
                readonly: this.readonly,
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
              },
            },
          }
        },
        {
          title:'Add Pusback',
          icon:'undo',
          formField:{
            hour: {
              name:'time1',
              value: '',
              type: 'fullDate',
              props: {
                readonly: this.readonly,
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
              },
            },
            quantity: {
              name:'quantity1',
              value: 0,
              type: 'quantity',
              props: {
                readonly: this.readonly,
                clearable: true,
                color:"primary",
              },
            },
          }
        },
        {
          title:'GPU',
          icon:'flash_on',
          formField:{
            quantity: {
              name:'quantity2',
              value: 0,
              type: 'quantity',
              props: {
                readonly: this.readonly,
                clearable: true,
                color:"primary",
              },
            },
            hour: {
              name:'time2',
              value: '',
              type: 'fullDate',
              props: {
                readonly: this.readonly,
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
              },
            },
          }
        },
        {
          title:'A/C Cleaning',
          icon:'air',
          formField:{
            hour: {
              name:'time3',
              value: '',
              type: 'fullDate',
              props: {
                readonly: this.readonly,
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
              },
            },
            quantity: {
              name:'quantity3',
              value: 0,
              type: 'quantity',
              props: {
                readonly: this.readonly,
                clearable: true,
                color:"primary",
              },
            },
          }
        }
      ]
    }
  }
}
</script>

<style lang="stylus">
  #services-container
    .search
      background #e9edf6
      border-radius 99px
    
</style>