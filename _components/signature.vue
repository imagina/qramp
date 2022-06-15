<template>
  <div id="signatureForm">
    <div id="signatureContainer" class="q-pa-md">
      <div id="disableSignature" :class="readonly ? 'disableEdit': ''"></div>
      <div class="row">
        <div class="col-12 col-md-6">
          <div class="row">
              <dynamic-field  id="sig1" v-if="field.type === 'signature'" class="col-12 q-px-sm" v-for="(field, keyField) in formField.customer" :key="keyField" :field="field"
                v-model="form[field.name || keyField]" @fullscreenAction="isFull ? cancelFullScreen('sig1') : launchFullScreen('sig1')"/>
          </div>
          <div class="row">
              <dynamic-field v-if="field.type !== 'signature'" class="col-6 q-mt-sm q-pa-sm" v-for="(field, keyField) in formField.customer" :key="keyField" :field="field"
                v-model="form[field.name || keyField]" />
          </div>
        </div>
        <div class="col-12 col-md-6">
          <div class="row">
              <dynamic-field  id="sig2" v-if="field.type === 'signature'" class="col-12 q-px-sm" v-for="(field, keyField) in formField.representative" :key="keyField" :field="field"
                v-model="form[field.name || keyField]" @fullscreenAction="isFull ? cancelFullScreen('sig2') : launchFullScreen('sig2')"/>
          </div>
          <div class="row">
              <dynamic-field v-if="field.type !== 'signature'" class="col-6 q-mt-sm q-pa-sm" v-for="(field, keyField) in formField.representative" :key="keyField" :field="field"
                v-model="form[field.name || keyField]" />
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>

import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  props:{
    readonly: true,
    toolbar:{}
  },
  mixins:[responsive],
  data(){
    return{
      form:{},
      isFull: false,
    }
  },
  computed: {
    formField(){
      return{
        customer:{
          customer:{
            value: '',
            name:'customerSignature',
            type: 'signature',
            props: {
              btnFullscreen: true,
              btnFullscreenIcon: this.isFull ? 'zoom_in_map':'zoom_out_map',
              readonly: this.readonly,
              label: this.$tr('ifly.cms.form.customerRepresentativeSignature'),
            },
          },
          printName:{
            name:'costumerName',
            value: '',
            type: this.readonly ? 'inputStandard': 'input',
            'icon-right': 'fas fa-user',
            props: {
              readonly: this.readonly,
               label: `${this.$tr('isite.cms.form.printName')}`,
            },
          },
          title:{
            name:'costumerTitle',
            value: '',
            type: this.readonly ? 'inputStandard': 'input',
            'icon-right': 'fas fa-user',
            props: {
              readonly: this.readonly,
               label: `${this.$tr('isite.cms.form.title')}`,
            },
          },
        },
        representative:{
          representative:{
            value: '',
            name:'representativeSignature',
            type: 'signature',
            props: {
              btnFullscreen: true,
              btnFullscreenIcon: this.isFull ? 'zoom_in_map':'zoom_out_map',
              readonly: this.readonly,
              label: this.$tr('ifly.cms.form.AgiRepresentativeSignature'),
            },
          },
          printName:{
            name:'representativeName',
            value: '',
            type: this.readonly ? 'inputStandard': 'input',
            'icon-right': 'fas fa-user',
            props: {
              readonly: this.readonly,
               label: `${this.$tr('isite.cms.form.printName')}`,
            },
          },
          title:{
            name:'representativeTitle',
            value: '',
            type: this.readonly ? 'inputStandard': 'input',
            'icon-right': 'fas fa-user',
            props: {
              readonly: this.readonly,
               label: `${this.$tr('isite.cms.form.title')}`,
            },
          },
        }
      }
    }
  },
  methods:{
    launchFullScreen(name) {
      const element = document.getElementById(name)
      if(element.requestFullScreen) {
        element.style.background = "#fff"
        this.isFull = true
        element.requestFullScreen();
      } else if(element.mozRequestFullScreen) {
        element.style.background = "#fff"
        this.isFull = true
        element.mozRequestFullScreen();
      } else if(element.webkitRequestFullScreen) {
        element.style.background = "#fff"
        this.isFull = true
        element.webkitRequestFullScreen();
      }
    },
    cancelFullScreen(name) {
      const element = document.getElementById(name)
      if(document.cancelFullScreen) {
          element.style.background = "initial"
          this.isFull = false
          document.cancelFullScreen();
      } else if(document.mozCancelFullScreen) {
          element.style.background = "initial"
          this.isFull = false
          document.mozCancelFullScreen();
      } else if(document.webkitCancelFullScreen) {
          element.style.background = "initial"
          this.isFull = false
          document.webkitCancelFullScreen();
      }
    },
    camelToSnakeCase(str) {return str.replace(/[A-Z]/g,(letter) => `_${letter.toLowerCase()}`)},
    setData(data) {
      const obj = {}
      for (let key in data){
        const name = this.camelToSnakeCase(key)
        obj[name] = data[key]
      }
      return obj
    },
    sendInfo() {
      const data = JSON.parse(JSON.stringify( this.$store.state.qrampApp))
      this.setData()
      console.log(this.setData({
        ...data.form,
        delay: data.delay,
        workOrderItems: data.products
      }))
    },
    saveInfo() {
      this.$store.commit('qrampApp/SET_FORM_SIGNATURE', this.form )
      this.sendInfo()
    },
  }
}
</script>

<style lang="stylus">
  #signatureContainer 
    position relative
    
    .disableEdit
      position: absolute;
      background: transparent;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: 1;
</style>