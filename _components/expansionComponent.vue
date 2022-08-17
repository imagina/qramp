<template>
  <div id="expansion-container" style="max-width: 100%">
    <div v-if="!isDesktop">
        <q-list v-for="(item, index) in data" :key="index">
        <q-expansion-item class="q-py-sm">
          <template v-slot:header>
            <q-item-section avatar class="q-pr-none " style="min-width: 45px;">
              <q-avatar size="32px" font-size="25px" :icon="item.icon" color="primary" text-color="white" />
            </q-item-section>
            <q-item-section>
              {{item.title}}
              <span class="spanCaption text-caption">{{showValue(item.formField.quantity)}}</span>
            </q-item-section>
          </template>
          <q-card class="flex card-color rounted-3 q-px-lg q-card justify-center">
            <q-card-section class="q-pa-none q-py-md" v-for="(field, keyfield) in item.formField" :key="keyfield">
              <label class="flex no-wrap items-center" >
                <dynamic-field 
                  class="q-ml-sm marginzero" 
                  v-model="data[index]['formField'][keyfield]['value']" 
                  :field="field"></dynamic-field>
              </label>
              <div
                  class="tw--mt-4 tw-px-3 tw-font-semibold tw-mt-5 tw-text-center tw-hidden"
                  v-if="field.type === 'fullDate' 
                  && field.props.typeIndexDate === 1"
                >
                  Difference (hours): {{ 1 }}
                </div>
            </q-card-section>
          </q-card>
        </q-expansion-item>
        <q-separator color="#Ffff" />
    </q-list>
    </div> 
    <q-list v-for="(item, index) in data" :key="index" v-else>
        <div class="q-py-sm row">
          <div class="row q-py-md">
            <div class="q-py-sm" style="width: 220px; display: flex;">
              <div class="q-px-sm">
                <q-avatar size="32px" font-size="25px" :icon="item.icon" color="primary" text-color="white" />
              </div>
              <div>
                {{item.title}}
              </div>
            </div>
          </div>
          <div class="row">
            <div class="q-pa-none q-py-md" v-for="(field, keyfield) in item.formField" :key="keyfield">
              <div class="flex no-wrap items-center" >
                <dynamic-field 
                  class="q-ml-sm marginzero" 
                  v-model="data[index]['formField'][keyfield]['value']" 
                  :field="field" 
                />
                <div
                  class="tw--mt-4 tw-px-3 tw-font-semibold tw-hidden"
                  v-if="field.type === 'fullDate' 
                  && field.props.typeIndexDate === 1"
                >
                  Difference (hours): {{ 1 }}
                </div>
              </div>
            </div>
          </div>
        </div>
        <q-separator color="#Ffff" />
    </q-list>
  </div>
</template>
<script>
export default {
  name:'expansionComponent',
  props:{
    data:[]
  },
  data(){
    return{
      form:{}
    }
  },
  mounted() {

  },
  computed:{
    isDesktop() {
      return window.innerWidth >= '900';
    }
  },
  methods: {
    showValue(data) {
      if(data) {
        return  data.value
      }
    },
    formatName(string) {
      if(string.includes(" ")) {
        return string
      } else {
        const arr = string.split(" ")
        a.map((item, index) =>{ 
            if (index == 0) { 
                item.toLowerCase()
            }
            return item
        }).join().replace(",","")
        return a
      }
    },
  }
}
</script>
<style lang="stylus">
  #expansion-container
    border 1px solid #e0e0e0
    border-radius 8px  
    .card-color
      background #F1F4FA
      border-radius 8px
    .spanCaption
      color:#949494
    .marginzero > div > div > label
      margin-bottom 0px !important
</style>