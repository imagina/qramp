<template>
  <div id="services-container">
    <!-- toolbar -->
    <i-toolbar @edit="readonly = $event" :toolbar="toolbar"></i-toolbar>
    <div class="q-px-md">
      <q-input clearable borderless standout dense rounded style="max-width: 100%"
      color="primary" :placeholder="`${$tr('ifly.cms.label.search',{capitalize : true})}...`"
      class="q-my-md q-ml-md q-mr-xs  search">
        <template v-slot:prepend>
          <q-icon color="primary" class="q-pl-sm" name="search" />
        </template>
      </q-input>
      <expansion-component class="q-px-md" :data="services" />
    </div>
  </div>
</template>

<script>
import iToolbar from '@imagina/qramp/_components/toolbar.vue'
import expansionComponent from '@imagina/qramp/_components/expansionComponent.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  props:{
    toolbar:{}
  },
  components:{iToolbar, expansionComponent},
  mixins:[responsive],
  data(){
    return{
      readonly: true,
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
              name:'quantity',
              value: 5,
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
              value: null,
              type: 'date',
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
              value: null,
              type: 'date',
              props: {
                readonly: this.readonly,
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
              },
            },
            quantity: {
              name:'quantity',
              value: null,
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
              name:'quantity',
              value: null,
              type: 'quantity',
              props: {
                readonly: this.readonly,
                clearable: true,
                color:"primary",
              },
            },
            hour: { 
              value: null,
              type: 'date',
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
              value: null,
              type: 'date',
              props: {
                readonly: this.readonly,
                label: this.$tr('isite.cms.form.date'),
                clearable: true,
              },
            },
            quantity: {
              name:'quantity',
              value: null,
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