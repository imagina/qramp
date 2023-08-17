<template>
  <div class="
     tw-relative 
     tw-rounded-lg 
     tw-h-36 
     tw-my-2 
     tw-border-l-8  
     showCard
     tw-bg-white" :class="colorCheckSchedule">
    <div>
      <div class="tw-py-3 tw-pl-2 tw-w-full">
        <div class="tw-flex tw-pb-1">
          <div class="tw-w-10/12">
            <p class="
                tw-font-bold 
                tw-text-sm">
              {{ card.inboundFlightNumber }}/{{ card.outboundFlightNumber }} {{ card.id }}
            </p>
          </div>
          <div class="
             tw-flex 
             tw-items-center 
             tw-space-x-2
             tw-px-3
             tw--mt-1 
             tw-text-gray-500
             dot-vertical 
             tw-cursor-move"
          >
            <i class="fa-solid fa-grip-dots-vertical tw-text-lg" />
          </div>
        </div>
        <div class="
           tw-font-semibold 
           tw-text-xs 
           tw-space-y-1">
          <div class="tw-flex tw-space-x-4">
            <div>
              STA: {{ card.inboundScheduledArrival ? $moment(card.inboundScheduledArrival).format('HH:MM') : '' }}
            </div>
            <div>
              STD: {{ card.outboundScheduledDeparture ? $moment(card.outboundScheduledDeparture).format('HH:MM') : '' }}
            </div>
          </div>
          <div class="tw-flex tw-space-x-1">
            <div>
              A/C#: {{  actypes }}
            </div>
            <lastComments :card="card" />
          </div>
          <div 
            class="
             tw-py-1 
             tw-flex 
             tw-justify-between 
             tw-items-center 
             tw-pr-3"
          >
            <span class="tw-uppercase tw-font-extrabold">
              {{ titleStatus }}
            </span>
            <div 
              v-if="gates" 
              class="
               tw-rounded-md 
               tw-border 
               tw-py-1 
               tw-px-2 
               tw-pl-4 
               tw-text-center"
            >
              {{ gates }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="
        tw-bg-gray-200 
        tw-absolute 
        tw-bottom-0 
        tw-left-0
        tw-w-full
        tw-h-6
        tw-py-1
        tw-px-2
        tw-font-bold 
        text-x2
        tw-space-x-1
        tw-rounded-br-lg" :class="flightStatuses.color">
      <i :class="flightStatuses.icon" />
      <span>
        {{ flightStatuses.name }}
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import useKanbanCard from '../uses/useKanbanCard'
import lastComments from './lastComments.vue'

export default defineComponent({
  components: {
    lastComments,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {...useKanbanCard(props)}
  },
});
</script>

<style scoped>
.text-x2 {
  font-size: 11px;
}
.showCard {
  box-shadow: 0px 2px 4px 0px rgba(31, 41, 79, 0.07), 4px 4px 8px 0px rgba(31, 41, 79, 0.14);
}
</style>
