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
      this.getProducts(requestParams)
    },
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