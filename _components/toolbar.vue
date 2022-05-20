<template>
  <div class="q-mb-md">
    <q-toolbar class="bg-primary text-white q-px-md q-py-sm">
      <div v-if="!edit" class="flex justify-end">
        <q-space />
        <q-btn 
          class="q-mr-sm text-capitalize" 
          color="white"
          rounded-borders
          text-color="primary" 
          label="Summary Report" 
        >
          <template v-slot:prepend>
            <q-icon color="primary" class="q-pl-sm" name="assessment" />
          </template>
        </q-btn>
        <q-btn 
          flat
          color="white" 
          round
          icon="mode_edit_outline"
          @click="() => {this.edit = true; $emit('edit', false)}"
        />
        <q-btn 
          flat
          color="white" 
          round
          icon="send"
        />
      </div>
      <div v-else class="flex justify-end">
        <q-btn 
          class="q-mr-sm text-capitalize" 
          color="white"
          rounded-borders
          text-color="primary" 
          label="Cancel" 
          icon-right="close"
          @click="() => { this.edit = false; $emit('edit', true)}"
        />
        <q-btn 
          class="q-mr-sm text-capitalize" 
          color="white" 
          rounded-borders
          text-color="primary" 
          label="Update" 
          icon-right="update"
          @click="() => { this.edit = false; $emit('edit', true)}"
        />
      </div>
    </q-toolbar>
  </div>
</template>
<script>
export default {
  props:{
    toolbar:{}
  },
  data(){
    return{
      edit: false,
    }
  },
  computed:{
    responsive() {return this.windowSize == 'mobile'},
    windowSize() {
      return this.windowWith >= '900' ? 'desktop' : 'mobile'
    },
    windowWith() {
      return window.innerWidth
    }
  }
}
</script>
<style lang="stylus">
  
</style>