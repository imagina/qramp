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
      <expansion-component class="q-px-md" :data="services"/>
    </div>
  </div>
</template>

<script>
import expansionComponent from '@imagina/qramp/_components/expansionComponent.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
import services from '@imagina/qramp/_mixins/services.js'
export default {
  props:{
    readonly: true,
    toolbar:{}
  },
  components:{expansionComponent},
  mixins:[responsive, services],
  methods: {
    async init() {
      //Request params
      let requestParams = {
        refresh: true,
        params: {
        filter: {categoryId: 1},
        include: 'category,attributes,attributes.values'
      }
      }
      //Request data
      await this.$crud.index('apiRoutes.qramp.products', requestParams).then(({data}) => {
        data.forEach(item => {
          this.services.push({
            icon: "settings",
            title: item.name,
            formField: {
              ...item.attributes.reduce((previousValue, currentValue, currentIndex, array) => {
                const props = this.setProps(currentValue.type, currentValue.name)
                  previousValue = {
                    ...previousValue,
                      [`${currentValue.type}${currentValue.name ? currentValue.name : ''}`] : {
                      name: currentValue.name || `${currentValue.type}${currentValue.id}${item.id}`,
                      value: currentValue.length > 0 ? currentValue.length : this.setValue(currentValue.type),
                      type: currentValue.type == 'fullDate' ? 'input' : currentValue.type,
                      props :{ ...props}
                    }
                  }
                  return previousValue
              }, {} )
            }
          })
        })
      }).catch(error => {
        console.error("[qramp-services]::init", error)
      })
    }
  },
  computed:{
    pageActions() {
      return [
        'search',
      ]
    },
  }
}
</script>

<style lang="stylus">
  #services-container
    .search
      background #e9edf6
      border-radius 99px
    
</style>