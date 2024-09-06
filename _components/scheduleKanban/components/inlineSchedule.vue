<template>
  <div
    class="
      tw-border
      tw-rounded-lg
      tw-bg-white
      tw-py-3
      tw-px-4
      tw-my-1
      md:tw-flex-wrap"
  >
    <q-form ref="refFormSchedule">
      <scheduleFields
        :inlineMode="true"
      />
    </q-form>
    <modalComments
      v-if="card?.id"
      :commentableId="card?.id"
    />
    <div class="tw-space-x-2 tw-my-1">
      <button
        class="
          tw-bg-blue-800
          tw-rounded-lg
          tw-px-2 tw-py-1
          tw-text-white"
        @click.prevent="saveForm"
        :disabled="loading"
      >
        <i v-if="!loading" class="fa-light fa-floppy-disk" />
        <i v-if="loading" class="fa-solid fa-spinner-third fa-spin"></i>
        <q-tooltip>
          {{ i18n.tr("isite.cms.label.save") }}
        </q-tooltip>
      </button>
      <button
        @click.prevent="hideInline"
        class="
          tw-bg-blue-800
          tw-rounded-lg
          tw-px-2
          tw-py-1
          tw-text-white"
        :disabled="loading"
      >
        <i class="fa-light fa-xmark"></i>
        <q-tooltip> Discard </q-tooltip>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useModalSchedule from '../uses/useModalSchedule'
import scheduleFields from './scheduleFields.vue'
import modalComments from './modalComments.vue'
import useModalComments from '../uses/useModalComments';

export default defineComponent({
  components: {
    scheduleFields,
    modalComments
  },
  props: {
    card: {
      type: Object,
      required: false,
    }
  },
  setup (props, {emit}) {
    return {...useModalSchedule(props, emit), ...useModalComments(props)}
  }
})
</script>

<style scoped>

</style>
