<template>
  <div v-if="showInline">
    <q-form ref="refFormSchedule">
      <div
        class="
          tw-border
          tw-rounded-lg
          tw-bg-white
          tw-py-3
          tw-px-4
          tw-my-1
          lg:tw-flex
          lg:tw-space-x-2
          lg:tw-flex-wrap
          md:tw-flex-wrap"
      >
        <scheduleForm class="
          lg:tw-flex
          lg:tw-space-x-2"
        />
        <div class="tw-space-x-2 tw-my-1">
          <button
            class="
             tw-bg-blue-800
             tw-rounded-lg
             tw-px-2 tw-py-1
             tw-text-white"
            @click="saveForm"
          >
            <i class="fa-light fa-floppy-disk" />
            <q-tooltip>
              {{ $tr("isite.cms.label.save") }}
            </q-tooltip>
          </button>
          <button
            class="
             tw-bg-blue-800
             tw-rounded-lg
             tw-px-2 tw-py-1
             tw-text-white"
             v-if="false"
            @click="openCommentsModal"
          >
            <i class="fa-light fa-comment" />
            <q-tooltip>
              {{ $tr("isite.cms.label.comment") }}
            </q-tooltip>
          </button>
          <button
            @click="hideInline"
            class="
             tw-bg-blue-800
             tw-rounded-lg
             tw-px-2
             tw-py-1
             tw-text-white"
          >
            <i class="fa-light fa-xmark"></i>
            <q-tooltip> Discard </q-tooltip>
          </button>
        </div>
      </div>
    </q-form>
  </div>
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