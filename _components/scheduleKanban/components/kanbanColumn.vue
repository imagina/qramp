<template>
  <div class="tw-relative columnCtn q-col">
    <div class="tw-py-4">
      <div class="tw-border-b-2 tw-border-gray-200 tw-pb-1">
        <div class="tw-flex tw-space-x-2">
          <div>
            <p class="q-mb-md tw-text-lg tw-font-semibold">
              {{ date.format("dddd") }}
            </p>
          </div>
          <div class="tw--my-1">
            <q-btn
              flat
              round
              size="md"
              :class="{
                'tw-bg-blue-800 tw-text-white':
                  selectedDate === date.format('YYYY/MM/DD'),
              }"
              @click="selectedDate = date.format('YYYY/MM/DD')"
            >
             <span class="tw-font-semibold">
                {{ date.format("D") }}
              </span> 
            </q-btn>
          </div>
        </div>
      </div>
      <div 
       class="
         columnKanbanCard
         tw-overflow-y-auto
         tw-overflow-x-hidden  
         h-200 
         tw-bg-gray-100 
         tw-px-2"
      >
      <div 
        v-for="(card, key) in cards" 
        :key="key"
      >
        {{  card.hour }}
        <draggable
          :lists="card.data"
          :group="groupOptions"
          :force-fallback="true"
          group="data"
          ghost-class="ghostCard"
          drag-class="dragCard"
          filter=".ignoreItem"
          class="tw-overflow-y-auto tw-overflow-x-hidden tw-mb-4 tw-px-1"
        >
          <kanban-card
            v-for="(card, index) in card.data"
            :key="card.id"
            :card="card"
          />
      </draggable>
    </div>
  </div>
    </div>
  </div>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import draggable from "vuedraggable";
import kanbanCard from "./kanbanCard.vue";
import storeKanban from "../store/kanban.store";

export default defineComponent({
  components: {
    draggable,
    kanbanCard,
  },
  props: {
    date: {
      type: Object,
      required: true,
    },
    cards: {
      type: Array,
      required: true,
    },
    groupOptions: {
      type: Object,
      required: true,
    },
  },
  setup(props, { emit }) {
    const selectedDate = computed({
      get: () => storeKanban.selectedDate,
      set: (value) => (storeKanban.selectedDate = value),
    });
    return {
      selectedDate,
    };
  },
});
</script>

<style>
.columnCtn {
  @apply tw-w-72;
}

.dragCard {
  @apply tw-bg-white tw-opacity-100;
  cursor: grabbing;
}

.ghostCard {
  @apply tw-opacity-50 tw-bg-gray-100;
}
.columnCtn .h-200 {
  height: 700px;
}
.columnCtn .columnKanbanCard::-webkit-scrollbar-track {
  @apply tw-bg-gray-100;
}
.columnCtn .columnKanbanCard::-webkit-scrollbar-thumb {
  @apply tw-bg-gray-100
}
</style>
