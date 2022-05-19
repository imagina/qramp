<template>
  <div class="q-mb-md">
    <q-toolbar class="bg-primary text-white q-px-md q-py-sm">
      <q-toolbar-title class="text-caption"><span :style="`color:${toolbar.titleColor}`">{{toolbar.title}}</span> {{toolbar.code}}</q-toolbar-title>
      <q-btn v-if="responsive" icon="more_vert" round flat>
        <q-menu v-if="!edit">
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup>
              <q-item-section>Summary Report</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="() => {this.edit = true; $emit('edit', false)}">
              <q-item-section>Edit</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup>
              <q-item-section>Submit</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
        <q-menu v-else>
          <q-list style="min-width: 100px">
            <q-item clickable v-close-popup @click="() => { this.edit = false; $emit('edit', true)}">
              <q-item-section>Cancel</q-item-section>
            </q-item>
            <q-separator />
            <q-item clickable v-close-popup @click="() => { this.edit = false; $emit('edit', true)}">
              <q-item-section>Update</q-item-section>
            </q-item>
          </q-list>
        </q-menu>
      </q-btn>
      <div v-else>
        <div v-if="!edit" class="row justify-between items-center">
          <q-btn 
            class="q-mr-sm text-capitalize" 
            color="white"
            rounded-borders
            text-color="primary" 
            label="Summary Report" 
            icon-right="assessment"
          />
          <q-btn 
            class="q-mr-sm text-capitalize" 
            color="white" 
            rounded-borders
            text-color="primary" 
            label="Edit" 
            icon-right="mode_edit_outline"
            @click="() => {this.edit = true; $emit('edit', false)}"
          />
          <q-btn 
            class="q-mr-sm text-capitalize" 
            color="white" 
            text-color="primary" 
            rounded-borders
            label="Submit" 
            icon-right="send"
          />
        </div>
        <div v-else class="row justify-between items-center">
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