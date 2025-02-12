<template>
  <master-modal
    v-model="showModal"
    :title="titleModal"
    :persistent="true"
    :loading="loading"
    @hide="hideModal"
    :actions="actions"
    :maximized="$q.screen.lt.md"
    :width="form.id ? '50%' : '400px'"
    :customClass="`tw-border-l-2 tw-border-${flightStatus ? flightStatus.color : 'gray-100'}`"
    :help="helpText"
  >
    <q-form ref="refFormSchedule">
      <scheduleFields />
    </q-form>
  </master-modal>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModalSchedule from '../uses/useModalSchedule'
import comments from 'modules/qsite/_components/master/comments/index.vue'
import scheduleFields from './scheduleFields.vue'

export default defineComponent({
  components: {
    comments,
    scheduleFields
  },
  setup (props, {emit}) {
    return {...useModalSchedule(props, emit)}
  }
})
</script>

<style scoped>

</style>
