<template>
  <div id="expansion-container"  style="max-width: 100%">
    <q-list v-for="(item, index) in data" :key="index">
      <q-expansion-item class="q-py-sm">
        <template v-slot:header>
          <q-item-section avatar class="q-pr-none " style="min-width: 45px;">
            <q-avatar size="32px" font-size="25px" :icon="item.icon" color="primary" text-color="white" />
          </q-item-section>
          <q-item-section>
            {{item.title}}
            <span class="spanCaption text-caption">{{showValue(item.formField.quantity)}}</span>
            <span class="spanCaption text-caption">{{showValue(item.formField.datetime)}}</span>
          </q-item-section>
        </template>
        <q-card class="flex card-color rounted-3 q-px-lg q-mx-md">
          <q-card-section class="q-pa-none q-py-md" v-for="(field, keyfield) in item.formField" :key="keyfield">
            <label class="flex no-wrap items-center" >
              <span v-if="field.props.label" :style="`${field.props.type == 'select' ? 'margin-bottom:20px': ''}`" class="q-pl-lg">{{field.props.label}}</span>
              <dynamic-field class="q-ml-sm marginzero" v-model="data[index]['formField'][keyfield]['value']" :field="field"></dynamic-field>
            </label>
          </q-card-section>
        </q-card>
      </q-expansion-item>
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
  methods: {
    showValue(data) {
      if(data) {
        return  data.value ? typeof(data.value) == 'number' ? data.value: this.$trd(data.value) : ''
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
    }
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