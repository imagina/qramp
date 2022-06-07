<template>
  <div class="q-mb-md">
    <div class="bg-primary text-white q-px-md q-py-sm">
      <div v-if="!edit" class="flex justify-end">
        <q-space />
        <q-btn 
          v-if="id"
          class="q-mr-sm text-capitalize" 
          color="white"
          rounded
          text-color="primary" 
          label="Summary Report" 
        >
          <q-icon v-if="!responsive" color="primary" class="q-pl-sm" name="assessment" />
        </q-btn>
        <q-btn 
          v-if="id"
          flat
          class="bg-white q-mr-sm text-capitalize"
          :rounded="!responsive"
          :round="responsive"
          @click="() => {this.edit = true; $emit('edit', false)}"
        >
          <span class="text-primary q-mr-sm" v-if="!responsive">Edit</span>
          <q-icon name="mode_edit_outline" color="primary" />
        </q-btn>
        <q-btn 
          flat
          class="bg-white text-capitalize" 
          :rounded="!responsive"
          :round="responsive"
        >
          <span class="text-primary q-mr-sm" v-if="!responsive">Send</span>
          <q-icon name="send" color="primary" />
        </q-btn>
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
    </div>
  </div>
</template>
<script>
export default {
  props:{
    id:{}
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