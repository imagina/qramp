<template>
  <div id="services-container">
    <div class="q-px-md">
      <search-local @value="searchServices = $event" />
      <q-linear-progress v-if="services.length == 0"  stripe  indeterminate rounded color="primary" class="q-mt-sm" />
      <expansion-component v-else class="q-px-md" :data="filterServices"/>
    </div>
  </div>
</template>

<script>
import expansionComponent from '@imagina/qramp/_components/expansionComponent.vue'
import searchLocal from '@imagina/qramp/_components/searchLocal'
import responsive from '@imagina/qramp/_mixins/responsive.js'
import services from '@imagina/qramp/_mixins/services.js'
export default {
  props:{
    readonly: true,
    toolbar:{}
  },
  components:{expansionComponent, searchLocal},
  mixins:[responsive, services],
  methods: {
    async init() {
      //Request params
      let requestParams = {
        refresh: true,
        params: {
        filter: {categoryId: 2},
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
                const props = this.setProps(currentValue.type, currentValue.name, currentValue.values)
                  previousValue = {
                    ...previousValue,
                      [`${currentValue.type}${currentValue.name ? currentValue.name : ''}`] : {
                      name: currentValue.name || `${currentValue.type}${currentValue.id}${item.id}`,
                      value: this.setValue(currentValue.type),
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
  #equipment-container
    .search
      background #e9edf6
      border-radius 99px
    
</style>