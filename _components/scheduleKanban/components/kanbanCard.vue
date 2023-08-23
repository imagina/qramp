<template>
  <div class="
     tw-relative 
     tw-rounded-lg 
     card-h 
     tw-my-2 
     tw-border-l-8  
     showCard
     tw-bg-white" :class="colorCheckSchedule">
    <div>
      <div class="tw-py-3 tw-pl-2 tw-w-full">
        <div class="tw-flex tw-pb-1">
          <div class="tw-w-10/12">
            <p 
             class="text-kanban-card tw--mt-0.5 tw-cursor-pointer"
             @click="openModalSchedule"
            >
              {{ card.inboundFlightNumber }}/{{ card.outboundFlightNumber }}
            </p>
          </div>
          <div class="
             tw-flex 
             tw-items-center 
             tw-space-x-2
             tw-px-3
             tw--mt-2 
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
          <div class="tw-flex tw-space-x-2 arrival-text">
            <div>
              <i class="fa-solid fa-arrow-down-right"></i> STA: {{ card.inboundScheduledArrival ? $moment(card.inboundScheduledArrival).format('HH:MM') : '' }}
            </div>
            <div>
              <i class="fa-solid fa-arrow-up-right"></i> STD: {{ card.outboundScheduledDeparture ? $moment(card.outboundScheduledDeparture).format('HH:MM') : '' }}
            </div>
          </div>
          <div class="tw-flex tw-space-x-1">
            <div class="ac-type-text">
              <i class="fa-solid fa-plane"></i> A/C#: {{ actypes }} 
            </div>
            <div class="tw-flex tw-items-center" v-if="gates">
              <img src="../svg/p-small.svg" class="tw-pr-1" alt="" srcset="">
              {{ gates }}
            </div>
          </div>
          <div 
            class="
             tw-py-1 
             tw-flex 
             tw-items-center 
             tw-pr-3"
          >
            <span class="tw-uppercase tw-font-extrabold text-status">
              {{ titleStatus }}
            </span>
            <lastComments :card="card" class="tw-pl-2"/>
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
    dateColumn: {
      type: String,
      default: () => null
    }
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

.card-h {
  height: 125px;
}
.text-kanban-card {
  color: #1F294F;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 15.4px */
  letter-spacing: 0.7px;
}
.arrival-text {
  color: #1F294F;
  leading-trim: both;
  text-edge: cap;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 13.2px */
  letter-spacing: 0.36px;
}
.ac-type-text {
  color: #1F294F;
  leading-trim: both;
  text-edge: cap;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.36px;
}
.text-status {
  color: #1F294F;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 13.2px */
  letter-spacing: 0.36px;
  text-transform: uppercase;
}
.showCard {
  box-shadow: 0px 2px 4px 0px rgba(31, 41, 79, 0.07), 4px 4px 8px 0px rgba(31, 41, 79, 0.14);
}
</style>
