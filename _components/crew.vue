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
    crewData:{}
  },
  components:{expansionComponent, searchLocal},
  mixins:[responsive, services],
  methods: {
    async init() {
      //Request params
      let requestParams = {
        refresh: true,
        params: {
        filter: {categoryId: 3},
        include: 'category,attributes,attributes.values'
      }
      }
      //Request data
      this.getProducts(requestParams, 3)
    },
    saveInfo() {
      this.$store.commit('qrampApp/SET_FORM_CREW', this.services.filter(items => {
          for(let item in items.formField){
            for(let key in items.formField[item]){
              if (key == 'value'){
                return items.formField[item][key]
              }
            }
          }
      }))
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
  #services-container
    .search
      background #e9edf6
      border-radius 99px
    
</style>