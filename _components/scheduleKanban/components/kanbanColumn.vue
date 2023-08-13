<template>
  <div class="tw-relative columnCtn q-col">
    <div class="tw-py-3">
      <div 
        class="
         tw-border-b-2 
         tw-border-gray-200 
         tw-pb-1
         tw-text-sm"
      >
        <div 
          class="
           tw-flex 
           tw-items-center 
           tw-space-x-2 
           tw-justify-center"
        >
          <p 
            class="
             q-mb-md 
             tw-font-semibold 
             text-blue-gray-rb-5 
             tw-uppercase"
          >
             {{ date.format("dddd") }}
          </p>
          <button 
            class="
             tw-rounded-full 
             tw-w-7 
             tw-h-7 
             tw--mt-4
             tw-bg-blueGray-300 
             tw-text-blueGray-500"
            :class="{
              'buttom-day':
              selectedDate === date.format('YYYY/MM/DD'),
            }"
            @click="selectedDate = date.format('YYYY/MM/DD')"
          >
            <span class="tw-font-semibold">
              {{ date.format("D") }}
            </span> 
          </button>
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
        <div 
          class="
           tw-text-center 
           tw-text-sm 
           tw-text-blueGray-500 
           tw-font-bold
           tw-py-1"
        >
          <i class="fa-solid fa-clock" />
          {{  card.hour }}h
        </div>
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
import useKanbanColumn from '../uses/useKanbanColumn'

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
    return {
      ...useKanbanColumn(props)
    }
  },
});
</script>

<style>
.columnCtn {
  width: 260px;
}

.dragCard {
  @apply tw-bg-white tw-opacity-100;
  cursor: grabbing;
}

.ghostCard {
  @apply tw-opacity-50 tw-bg-gray-100;
}
.columnCtn .h-200 {
  height: 72vh;
}
.columnCtn .columnKanbanCard::-webkit-scrollbar-track {
  @apply tw-bg-gray-100;
}
.columnCtn .columnKanbanCard::-webkit-scrollbar-thumb {
  @apply tw-bg-gray-100
}
.columnCtn .text-blue-gray-rb-5 {
  color: rgba(138, 152, 195, 1);
}
.columnCtn .buttom-day {
  @apply tw-bg-blue-800 tw-text-white !important;
}
</style>
