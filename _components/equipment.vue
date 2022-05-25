<template>
  <div id="equipment">
    <div class="q-pa-md">
      <div class="row">
        <div v-for="(field, keyField) in formFields.mapActions" :class="`col-12 col-md-4 q-pb-md ${readonly ? 'q-px-sm':''}`" :style="`${readonly ? 'height: 80px' : ''}`">
          <label :class="`${readonly ? `flex no-wrap items-center ${responsive ? 'row' :'justify-center'}`: '' }`">
            <span v-if="readonly" :class="`${responsive ? 'col-5': ''} span text-right text-primary`">{{field.label}}:</span>
            <dynamic-field :class="`${responsive ? 'col-7' : '' } q-px-sm`" :key="keyField" :field="field"
              v-model="form[field.name || keyField]"/>
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator v-if="!responsive && readonly" color="blue-grey-2" inset />
      <div class="row">
        <div v-for="(field, keyField) in formFields.mainLoader" :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`" :style="`${readonly ? 'height: 80px' : ''}`">
          <label :class="`${readonly ? `flex no-wrap items-center ${responsive ? 'row' :'justify-center'}`: '' }`">
            <span v-if="readonly" :class="`${responsive ? 'col-5': ''} span text-right text-primary`">{{field.label}}:</span>
            <dynamic-field
              :key="keyField" 
              :class="`${responsive ? 'col-7' : '' } q-px-sm`" 
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator v-if="!responsive && readonly" color="blue-grey-2" inset />
      <div class="row">
        <div v-for="(field, keyField) in formFields.lowerLoader"  :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`" :style="`${readonly ? 'height: 80px' : ''}`">
          <label :class="`${readonly ? `flex no-wrap items-center ${responsive ? 'row' :'justify-center'}`: '' }`">
            <span v-if="readonly" :class="`${responsive ? 'col-5': ''} span text-right text-primary`">{{field.label}}:</span>
            <dynamic-field
              :class="`${responsive ? 'col-7' : '' } q-px-sm`" 
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator v-if="!responsive && readonly" color="blue-grey-2" inset />
      <div class="row">
        <div v-for="(field, keyField) in formFields.addLoader" :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`" :style="`${readonly ? 'height: 80px' : ''}`">
          <label :class="`${readonly ? `flex no-wrap items-center ${responsive ? 'row' :'justify-center'}`: '' }`">
            <span v-if="readonly" :class="`${responsive ? 'col-5': ''} span text-right text-primary`">{{field.label}}:</span>
            <dynamic-field
              :class="`${responsive ? 'col-7' : '' } q-px-sm`"
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator v-if="!responsive && readonly" color="blue-grey-2" inset />
      <div class="row items-center">
        <div v-for="(field, keyField) in formFields.transport"  :class="`col-md-6 col-12 q-py-md ${readonly ? 'q-px-sm':''}`" :style="`${readonly ? 'height: 80px' : ''}`">
          <label :class="`${readonly ? `flex no-wrap items-center ${responsive ? 'row' :'justify-center'}`: '' }`">
            <span v-if="readonly" :class="`${responsive ? 'col-5': ''} span text-right text-primary`">{{field.label}}:</span>
            <dynamic-field
              :class="`${responsive ? 'col-7' : '' } q-px-sm`"
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
        <q-btn 
          :class="`text-capitalize col-md-6 col-12 ${readonly ? 'q-my-lg' : 'q-my-md'}`" 
          color="white"
          outline
          rounded 
          :disable="readonly"
          text-color="primary" 
          label="Add other" 
        />
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
    }
  },
  computed:{
    formFields() {
      return {
        mapActions: {
          gpu: {
            value: null,
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.gpu'),
              clearable: true,
              color:"primary"
            },
            label: this.$tr('ifly.cms.form.gpu'),
          },
          start: {
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' : this.$tr('ifly.cms.form.start'),
              clearable: true,
            },
            label: this.$tr('ifly.cms.form.start'),
          },
          end: {
            value: null,
            type: this.readonly ? 'inputStandard':'fullDate',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  this.$tr('ifly.cms.form.end'),
              clearable: true,
            },
            label: this.$tr('ifly.cms.form.end'),
          },
        },
        mainLoader:{
          mainLoader:{
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.mainLoader')}`,
            },
            label: `${this.$tr('ifly.cms.form.mainLoader')}`,
          },
          connectedTime1:{
            value: '',
            type: this.readonly ? 'inputStandard':'hour',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.connectedTime')}`,
            },
            label: `${this.$tr('ifly.cms.form.connectedTime')}`,
          }
        },
        lowerLoader:{
          lowerLoader:{
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.lowerLoader')}`,
            },
            label: `${this.$tr('ifly.cms.form.lowerLoader')}`,
          },
          connectedTime3:{
            value: '',
            type: this.readonly ? 'inputStandard':'hour',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.connectedTime')}`,
            },
            label: `${this.$tr('ifly.cms.form.connectedTime')}`,
          }
        },
        addLoader:{
          addLoader:{
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.addLoader')}`,
            },
            label: `${this.$tr('ifly.cms.form.addLoader')}`,
          },
          connectedTime2:{
            value: '',
            type: this.readonly ? 'inputStandard':'hour',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.connectedTime')}`,
            },
            label: `${this.$tr('ifly.cms.form.connectedTime')}`,
          }
        },
        transport:{
          transport:{
            value: '',
            type: this.readonly ? 'inputStandard':'select',
            props: {
              readonly: this.readonly,
              borderless: this.readonly,
              outlined: !this.readonly,
              label: this.readonly ? '' :  `${this.$tr('ifly.cms.form.transport')}`,
            },
            label: `${this.$tr('ifly.cms.form.transport')}`,
          }
        },
      }
    }
  }
}
</script>

<style lang="stylus">
  #equipment
    hr.label-container
      position relative
      bottom 20px
      border-top 1px dashed #000D4726
    .btn-add
      height: 36px;
      width: 47%;
      margin-left: 10px;
    span.span
      padding-bottom 12px
</style>