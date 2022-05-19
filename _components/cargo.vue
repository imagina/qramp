<template>
  <div id="cargoContainer">
    <div v-if="responsive" class="q-px-md q-py-md">
      <div class="q-pl-md flex items-center text-primary">
        <q-icon size="32px" :name="toolbar.icon" />
        <div class="title q-pl-sm text-h4">{{toolbar.title}}</div>
      </div>
      <q-separator class="q-my-sm"/>
      <span class="q-pl-md caption text-primary">1 of 7</span>
    </div>
    <!-- toolbar -->
    <i-toolbar @edit="readonly = $event" :toolbar="toolbar.toolbar"></i-toolbar>
    <div class="row no-wrap justify-center items-center" :style="'padding: 0 22px 0 26px'">
      <div class="col-12 col-md-6 q-mb-sm q-py-lg">
        <q-card flat :bordered="!readonly" class="q-pa-none">
          <q-card-section class="text-primary boundColor q-py-xs text-center text-weight-bold">
            <div>Inbound</div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <template v-for="(field, keyField) in formFields.inbound" >
              <label id="labelInput" :key="keyField" class="row items-center justify-end no-wrap">
                <p class="text-primary text-right q-mb-none span q-mr-sm col-5">{{field.label}}<span v-if="readonly">:</span></p>
                <dynamic-field
                  class="col-7"
                  :field="field"
                  v-model="form[field.name || keyField]" 
                />
              </label>
              <hr v-if="readonly" class="label-container"/>
            </template>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-12 col-md-6 q-mb-sm q-ml-sm">
        <q-card flat :bordered="!readonly">
          <q-card-section class="text-primary boundColor q-py-xs text-center text-weight-bold">
            <div>Outbound</div>
          </q-card-section>
          <q-separator></q-separator>
          <q-card-section>
            <template v-for="(field, keyField) in formFields.outbound" >
              <label id="labelInput" :key="keyField" class="row items-center justify-end no-wrap">
                <p class="text-primary text-right q-mb-none span q-mr-sm col-5">{{field.label}}<span v-if="readonly">:</span></p>
                <dynamic-field
                  class="col-7"
                  :field="field"
                  v-model="form[field.name || keyField]" 
                />
              </label>
              <hr v-if="readonly" class="label-container"/>
            </template>
          </q-card-section>
        </q-card>
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
        inbound:{
          totalUldsUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsUnloaded')}`,
          },
          bulkUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkUnloaded')}`,
          }
        },
        outbound:{
          totalUldsUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.TotalUldsLoaded')}`,
          },
          bulkUnloaded:{
            value: '',
            type: 'inputStandard',
            props: {
              readonly: this.readonly,
              outlined: !this.readonly,
              borderless: this.readonly
            },
            label: `${this.$tr('ifly.cms.form.BulkLoaded')}`,
          }
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
  #cargoContainer
    hr.label-container
      position relative
      bottom 20px
      border-top 1px dashed #000D4726
    #labelInput
      .span
        padding-bottom 22px
</style>