<template>
    <q-form ref="refFormSchedule">
      <div
        class="tw-grid tw-grid-cols-1 tw-gap-4"
        :class="{'lg:tw-grid-cols-2': form.id && permisionComments}"
      >
        <scheduleFields />
        <div v-if="showCommentsComponent">
          <comments 
            v-if="form.id && permisionComments"
            apiRoute="apiRoutes.qramp.comments"
            :commentableId="Number(form.id)"
            commentableType="Modules\Ramp\Entities\WorkOrder"
            permisionComments="ramp.work-orders-comments"
            class="tw-py-4"
          />
        </div>
      </div>
    </q-form>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModalSchedule from '../uses/useModalSchedule'
import comments from '@imagina/qsite/_components/master/comments/index.vue'
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