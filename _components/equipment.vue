<template>
  <div id="equipment">
    <div v-if="responsive" class="q-px-md q-py-md">
      <div class="q-pl-md flex items-center text-primary">
        <q-icon size="32px" :name="toolbar.icon" />
        <div class="title q-pl-sm text-h4">{{toolbar.title}}</div>
      </div>
      <q-separator class="q-my-sm"/>
      <span class="q-pl-md caption text-primary">1 of 7</span>
    </div>
    <!-- toolbar -->
    <i-toolbar @edit="readonly = $event" :toolbar="toolbar"></i-toolbar>
    <div class="q-pa-md">
      <div :class="`row ${readonly? 'q-px-md' : ''}`">
        <div v-for="(field, keyField) in formFields.mapActions" :class="`col-12 col-md-4 q-pb-md ${readonly ? 'q-px-sm':''}`">
          <label :class="`${readonly ? 'flex no-wrap items-center justify-center': '' }`">
            <span v-if="readonly" class="span text-right text-primary">{{field.label}}:</span>
            <dynamic-field class=" q-px-sm" :key="keyField" :field="field"
              v-model="form[field.name || keyField]"/>
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator color="blue-grey-2" inset />
      <div :class="`row ${readonly? 'q-px-md' : ''}`">
        <div v-for="(field, keyField) in formFields.mainLoader" :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`">
          <label :class="`${readonly ? 'flex no-wrap items-center justify-center': '' }`">
            <span v-if="readonly" class="span text-right text-primary">{{field.label}}:</span>
            <dynamic-field
              :key="keyField" 
              class="q-px-sm" 
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator color="blue-grey-2" inset />
      <div :class="`row ${readonly? 'q-px-md' : ''}`">
        <div v-for="(field, keyField) in formFields.lowerLoader"  :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`">
          <label :class="`${readonly ? 'flex no-wrap items-center justify-center': '' }`">
            <span v-if="readonly" class="span text-right text-primary">{{field.label}}:</span>
            <dynamic-field
              class="q-px-sm" 
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator color="blue-grey-2" inset />
      <div :class="`row ${readonly? 'q-px-md' : ''}`">
        <div v-for="(field, keyField) in formFields.addLoader" :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`">
          <label :class="`${readonly ? 'flex no-wrap items-center justify-center': '' }`">
            <span v-if="readonly" class="span text-right text-primary">{{field.label}}:</span>
            <dynamic-field
              class="q-px-sm"
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
      </div>
        <q-separator color="blue-grey-2" inset />
      <div class="row q-px-md items-center">
        <div v-for="(field, keyField) in formFields.transport"  :class="`col-12 col-md-6 q-py-md ${readonly ? 'q-px-sm':''}`">
          <label :class="`${readonly ? 'flex no-wrap items-center justify-center': '' }`">
            <span v-if="readonly" class="span text-right text-primary">{{field.label}}:</span>
            <dynamic-field
              class="q-px-sm"
              :key="keyField"
              :field="field"
              v-model="form[field.name || keyField]" 
            />
          </label>
          <hr v-if="readonly" class="label-container"/>
        </div>
        <q-btn 
          class="text-capitalize btn-add col-12 col-md-6 q-px-sm" 
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