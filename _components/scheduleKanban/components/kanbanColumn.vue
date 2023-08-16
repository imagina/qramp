<template>
  <div class="tw-relative columnCtn q-col">
    <div class="tw-py-3" :class="`cardCtn-${date}`">
      <div class="tw-border-b-2 tw-border-gray-200 tw-pb-1 tw-text-sm">
        <div class="tw-flex tw-items-center tw-space-x-2 tw-justify-center">
          <p class="q-mb-md tw-font-semibold text-blue-gray-rb-5 tw-uppercase">
            {{ date.format("dddd") }}
          </p>
          <button
            class="tw-rounded-full tw-w-7 tw-h-7 tw--mt-4 tw-bg-blueGray-300 tw-text-blueGray-500"
            :class="{
              'buttom-day': selectedDate === date.format('YYYY/MM/DD'),
            }"
            @click="selectedDate = date.format('YYYY/MM/DD')"
          >
            <span class="tw-font-semibold">
              {{ date.format("D") }}
            </span>
          </button>
        </div>
      </div>
      <completed-schedule />
      <div
        v-if="column.loading"
        class="tw-flex tw-justify-center tw-absolute tw-inset-0 tw-pt-48 tw-bg-white tw-bg-opacity-75 tw-z-20"
      >
        <q-spinner color="primary" size="2em" />
      </div>
      <div
        class="scrollbar tw-overflow-y-auto tw-overflow-x-hidden h-200 tw-bg-gray-100 tw-px-2"
        :class="{
          'tw-border tw-border-gray-300 ': isDraggingCard,
        }"
      >
        <draggable
          :lists="cards"
          :group="groupOptions"
          :force-fallback="true"
          group="data"
          ghost-class="ghostCard"
          drag-class="dragCard"
          filter=".ignoreItem"
          class="scrollbar tw-overflow-y-auto tw-overflow-x-hidden tw-mb-4 tw-px-1 tw-h-full"
          handle=".dot-vertical"
          @start="isDraggingCard = true"
          @end="isDraggingCard = false"
        >
          <kanban-card
            v-for="(card, index) in cards"
            :key="card.id"
            :card="card"
            :class="{ hidden: isDraggingCard }"
          />
          <div
            class="tw-text-7xl tw-text-center tw-pt-48 tw-text-gray-300"
            :class="{ hidden: !isDraggingCard }"
          >
            <i class="fa-thin fa-cards-blank" />
          </div>
          <div
            v-show="!isDraggingCard"
            class="tw-text-center tw-h-5 tw-flex tw-justify-center"
            :class="`trigger-${date}`"
          >
            <q-spinner v-if="isLoading" color="primary" size="1.3em" />
          </div>
        </draggable>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from "vue";
import draggable from "vuedraggable";
import kanbanCard from "./kanbanCard.vue";
import useKanbanColumn from "../uses/useKanbanColumn";
import completedSchedule from './completedSchedule.vue';

export default defineComponent({
  components: {
    draggable,
    kanbanCard,
    completedSchedule
  },
  props: {
    column: {
      type: Object,
      required: true,
    },
    groupOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    return {
      ...useKanbanColumn(props),
    };
  },
});
</script>

<style>
.columnCtn {
  width: 13.6vw;
}

.dragCard {
  @apply tw-bg-white tw-opacity-100;
  cursor: grabbing;
}

.ghostCard {
  @apply tw-opacity-50 tw-bg-gray-100;
}

.columnCtn .h-200 {
  height: 60vh;
}

.columnCtn .scrollbar::-webkit-scrollbar-track {
  @apply tw-bg-gray-100 !important;
}

.columnCtn .scrollbar::-webkit-scrollbar-thumb {
  @apply tw-bg-gray-100 !important;
}

.columnCtn .text-blue-gray-rb-5 {
  color: rgba(138, 152, 195, 1);
}

.columnCtn .buttom-day {
  @apply tw-bg-blue-800 tw-text-white !important;
}

@media (max-width: 1600px) {
  .columnCtn {
    width: 260px;
  }
}
</style>
