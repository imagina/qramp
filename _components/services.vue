<template>
  <div id="services-container">
    <div class="tw-p-4">
      <search-local @value="searchServices = $event" />
      <q-linear-progress v-if="services.length == 0"  stripe  indeterminate rounded color="primary" class="q-mt-sm" />
      <expansion-component :data="filterServices"/>
    </div>
  </div>
</template>

<script>
import expansionComponent from '../_components/expansionComponent.vue'
import searchLocal from '../_components/searchLocal'
import responsive from '../_mixins/responsive.js'
import services from '../_mixins/services.js'
export default {
  props:{
    readonly: true,
    toolbar:{},
    servicesData:{}
  },
  data(){
    return{
      form:{
        services: [],
      },
      products:[],
    }
  },
  components:{expansionComponent, searchLocal},
  mixins:[responsive, services],
  methods: {
    init() {
      //Request params
      let requestParams = {
        refresh: true,
        params: {
          filter: {categoryId: 1},
          include: 'category,attributes,attributes.values'
        }
      }
      //Request data
      this.getProducts(requestParams, 1)
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
    
</style>