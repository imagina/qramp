<template>
  <div class="">
    <div class="tw-flex bg-primary text-white tw-px-6 tw-py-1
                tw-items-center tw-justify-end 
      ">   
      <div v-if="!edit">
        <q-space />
        <q-btn 
          v-if="false"
          class="q-ml-sm tw-my-4 text-capitalize tw-font-bold tw-text-base" 
          color="white"
          rounded
          text-color="primary"
        >
          <span class="tw-hidden lg:tw-block q-pr-sm">Summary Report</span>
          <q-icon name="assessment" color="primary" />
          <q-tooltip>Summary Report</q-tooltip>
        </q-btn>
        <q-btn 
          v-if="false"
          class="q-ml-sm tw-my-4 text-capitalize tw-font-bold tw-text-base"
          color="white"
          rounded
          text-color="primary" 
          @click="() => {this.edit = true; $emit('edit', false)}"
        >
          <span class="tw-hidden lg:tw-block q-pr-sm">Edit</span>
          <q-icon name="mode_edit_outline" color="primary" />
          <q-tooltip>Edit</q-tooltip>
        </q-btn>
        <q-btn 
          v-if="update"
          class="q-ml-sm tw-my-4 text-capitalize tw-font-bold tw-text-base" 
          color="white"
          rounded
          text-color="primary"
          @click="$emit('send-info')"
          :disable="disabledReadonly"
        >
          <span class="tw-hidden lg:tw-block q-pr-sm">Submit</span>
          <q-icon name="send" color="primary" />
          <q-tooltip>Submit</q-tooltip>
        </q-btn>
      </div>
      <div v-else>
        <q-btn 
          class="q-ml-sm tw-my-4 text-capitalize tw-font-bold tw-text-base" 
          color="white"
          rounded
          outline
          @click="() => { this.edit = false; $emit('edit', true)}"
        >
          <span class="tw-hidden lg:tw-block q-pr-sm">Cancel</span>
          <q-icon name="close" />
          <q-tooltip>Cancel</q-tooltip>
        </q-btn>
        <q-btn 
          class="q-ml-sm tw-my-4 text-capitalize tw-font-bold tw-text-base" 
          color="white"
          rounded
          text-color="primary"
          @click="() => { this.edit = false; $emit('edit', true)}"
        >
          <span class="tw-hidden lg:tw-block q-pr-sm">Update</span>
          <q-icon name="update" color="primary" />
          <q-tooltip>Update</q-tooltip>
        </q-btn>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    update:{
      type:Boolean,
      default: false
    }
  },
  inject: ['disabledReadonly'],
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