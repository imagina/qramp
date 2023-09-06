<template>
  <master-modal
    v-model="showModal"
    :title="titleModal"
    :persistent="true"
    :loading="loading"
    @hide="hideModal"
    :actions="actions"
    :maximized="$q.screen.lt.md"
    :width="form.id ? '70%' : '400px'"
    :customClass="`tw-border-l-2 tw-border-${flightStatus ? flightStatus.color : 'gray-100'}`"
  >
    
    <q-form ref="refFormSchedule">
      <div 
        class="tw-grid tw-grid-cols-1 tw-gap-4"
        :class="{'lg:tw-grid-cols-2': form.id && permisionComments}"
      > 
        <scheduleForm />
      </div>
    </q-form>
  </master-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModalSchedule from '../uses/useModalSchedule'
import scheduleForm from './scheduleForm.vue'

export default defineComponent({
  components: {
    scheduleForm
  },
  setup (props, {emit}) {
    return {...useModalSchedule(props, emit)}
  }
})
</script>

<style scoped>

</style>