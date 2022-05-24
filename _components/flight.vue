<template>
  <div id="formFlyStep">
    <i-toolbar @edit="readonly = $event" :toolbar="toolbar.toolbar"></i-toolbar>
    <div id="rowContainer" class="row">
      <div v-for="(field, keyField) in formFields.flyFormLeft" class="col-12 col-md-6 q-px-md" :style="`${readonly ? 'height: 50px' : ''}`">
        <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
          <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            :class="`${readonly ? 'col-7': ''}`"
            :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding-bottom:0px'}`"
            v-model="form[field.name || keyField]" 
          />
        </label>
        <hr v-if="readonly" class="label-container"/>
      </div>
      <div v-for="(field, keyField) in formFields.flyFormRight" class="col-12 col-md-6 q-px-md" :style="`${readonly ? 'height: 50px' : ''}`">
        <label :class="`${readonly ? `${responsive ? 'no-wrap' : 'justify-end'} row items-center`: '' }`">
          <span v-if="readonly" class="col-5 text-right span q-pr-sm text-primary">{{field.label}}:</span>
          <dynamic-field
            :key="keyField"
            :id="keyField"
            :field="field"
            :class="`${readonly ? 'col-7': ''}`"
            :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding-bottom:0px'}`"
            v-model="form[field.name || keyField]" 
          />
        </label>
        <hr v-if="readonly" class="label-container"/>
      </div>
      <div class="col-12 col-md-6 q-px-md q-mt-lg q-pb-sm">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs q-mb-xs text-center text-weight-bold">
            <div>Inbound</div>
          </div>
          <div 
            v-for="(field, keyField) in formFields.inboundLeft"
            :class="`${readonly ? 'col-12 col-md-6': 'q-px-md' }`"
            :style="`${readonly ? 'height: 50px' : ''}`"
          >
            <label :class="`${readonly ?`${responsive ? 'no-wrap' : 'justify-end'} row items-center` : ''}`">
              <span v-if="readonly" class="col-5 text-right q-pr-sm text-primary">{{field.label}}:</span>
              <dynamic-field
                :key="keyField"
                :class="`${readonly ? 'col-7': ''}`"
                :id="keyField"
                :field="field"
                :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding:10px 0px 0px 0px'}`"
                v-model="form[field.name || keyField]" 
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
          </div>
        </div>
      </div>
      <div class="col-12 col-md-6 q-px-md q-mt-lg q-pb-sm">
        <div :class="`${readonly? '' :'card-bound'}`">
          <div class="text-primary boundColor q-py-xs q-mb-xs text-center text-weight-bold">
            <div>Outbound</div>
          </div>
          <div 
            v-for="(field, keyField) in formFields.outboundRight"
            :class="`${readonly ? 'col-12 col-md-6': 'q-px-md' }`"
            :style="`${readonly ? 'height: 50px' : ''}`"
          >
            <label :class="`${readonly ?`${responsive ? 'no-wrap' : 'justify-end'} row items-center` : ''}`">
              <span v-if="readonly" class="col-5 text-right q-pr-sm text-primary">{{field.label}}:</span>
              <dynamic-field
                :key="keyField"
                :class="`${readonly ? 'col-7': ''}`"
                :id="keyField"
                :field="field"
                :style="`${field.type !== 'input' && !readonly ? 'padding-bottom:20px' : 'padding:10px 0px 0px 0px'}`"
                v-model="form[field.name || keyField]" 
              />
            </label>
            <hr v-if="readonly" class="label-container"/>
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
    }
  },
  computed: {
    showLabel(){
      if(this.readonly && !this.responsive ){
        return true
      }
      if(this.readonly && this.responsive ){
        return false   
      }
      return false
    },
    formFields(){
      return{
        flyFormLeft:{
          carrier: {
            name:'carrier',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.carrier'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.carrier'),
          },
          station: {
            name:'station',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.station'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.station'),
          },
          customer: {
            name:'customer',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.customer'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.customer'),
          },
          gate: {
            name:'gate',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.gate'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.gate'),
          },
        },
        flyFormRight:{
          acType: {
            name:'acType',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.acType'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.acType'),
          },
          date: {
            name:'date',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.date'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.date'),
          },
          operation: {
            name:'operation',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.operation'),
              clearable: true,
              color:"primary",
              'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.operation'),
          },
          
          status: {
            name:'status',
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.status'),
              clearable: true,
              color:"primary",
             'hide-bottom-space': false
            },
            label: this.$tr('ifly.cms.form.status'),
          },
        },
        inboundLeft:{
          fligth: {
            name:'fligth',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.fligth'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.fligth'),
          },
          origin: {
            name:'origin',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.origin'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.origin'),
          },
          tail: {
            name:'tail',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.tail'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.tail'),
          },
          schuduledArrival: {
            name:'schuduledArrival',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.schuduledArrival'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.schuduledArrival'),
          },
          blockIn: {
            name:'blockIn',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.blockIn'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.blockIn'),
          },
        },
        outboundRight:{
          fligth: {
            name:'fligthOutbound',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.fligth'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.fligth'),
          },
          destination: {
            name:'destination',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.destination'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.destination'),
          },
          tail: {
            name:'tailOutbound',
            value: null,
            type: this.readonly ? 'inputStandard':'input',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.tail'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.tail'),
          },
          schuduledDeparture: {
            name:'schuduledDeparture',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.schuduledDeparture'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.schuduledDeparture'),
          },
          blockOut: {
            name:'blockOut',
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.blockOut'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.blockOut'),
          },
        },
      }
    }
  },
}
</script>

<style lang="stylus" scoped>
  #formFlyStep
    hr.label-container
      position relative
      bottom 20px
      border-top 1px dashed #000D4726
    .span 
      padding-bottom 10px
    .spanBottom
      padding-bottom 15px
    .card-bound
      border: 1px solid #f1f4fa;
      border-radius: 8px 8px 0px 0px; 
</style>