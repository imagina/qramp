<template>
    <div class="
        tw-flex
        tw-ml-auto
        tw-space-x-2
        w-60
        action-icon"
        :class="{ 'tw-mr-5' : isDesktop, 'tw-mr-2' : isTablet }"
        v-if="showKanbanCardsActions"
    >
      <template v-for="(button, index) in cardActions" :key="index">
        <q-btn
            flat
            dense
            size="sm"
            :icon="button.icon"
            @click="button.action"
            v-if="button.vIf"
        >
          <q-tooltip> {{ button.toolttip }}</q-tooltip>
        </q-btn>
      </template>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import useKanbanCardActions from '../uses/useKanbanCardActions';

export default defineComponent({
  props: {
    card: {
      type: Object,
      required: true,
    },
    dateColumn: {
      type: String,
      default: () => null
    }
  },
  setup(props) {
    return {...useKanbanCardActions(props)}
  }
});
</script>

<style scoped>
.action-icon {
  color: #1F294F99
}
</style>
