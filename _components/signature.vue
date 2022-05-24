<template>
  <div id="signatureForm">
    <!-- toolbar -->
    <i-toolbar @edit="readonly = $event" :toolbar="toolbar"></i-toolbar>
    <div id="signatureContainer" class="q-pa-md">
      <div id="disableSignature" :class="readonly ? 'disableEdit': ''"></div>
      <div class="row">
        <div id="sig1" class="col-12 col-md-6">
          <div class="row">
              <dynamic-field :class="`${field.type === 'signature' ? 'col-12' : 'col-6 q-mt-sm'} q-px-sm`" v-for="(field, keyField) in formField.customer" :key="keyField" :field="field"
                v-model="form[field.name || keyField]" @fullscreenAction="isFull ? cancelFullScreen('sig1') : launchFullScreen('sig1')"/>
          </div>
        </div>
        <div id="sig2" class="col-12 col-md-6">
          <div class="row">
            <dynamic-field :class="`${field.type === 'signature' ? 'col-12' : 'col-6 q-mt-sm'} q-px-sm`" v-for="(field, keyField) in formField.representative" :key="keyField" :field="field"
              v-model="form[field.name || keyField]" @fullscreenAction="isFull ? cancelFullScreen('sig2') : launchFullScreen('sig2')"/>
          </div>
        </div>
      </div>  
    </div>
  </div>
</template>

<script>

import iToolbar from '@imagina/qramp/_components/toolbar.vue'
import responsive from '@imagina/qramp/_mixins/responsive.js'
export default {
  props:{
    toolbar:{}
  },
  components:{iToolbar},
  mixins:[responsive],
  data(){
    return{
      form:{},
      readonly: true,
      isFull: false,
    }
  },
  computed: {
    formField(){
      return{
        customer:{
          customer:{
            value: '',
            name:'customer',
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
            name:'representative',
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