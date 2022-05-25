<template>
  <div id="services-container">
    <!-- toolbar -->
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
  computed:{
    pageActions() {
      return [
        'search',
      ]
    },
    services(){
      return[
        {
          icon:'local_police',
          title:'Supervisor',
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
          title:'Lead',
          icon:'admin_panel_settings',
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
          title:'Agent',
          icon:'support_agent',
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