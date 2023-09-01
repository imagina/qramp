<template>
  <div>
    <!--Tablet-->
    <div class="
        tw-flex
        tw-flex-row
        tw-rounded-lg
        tw-border-l-8
        tw-my-2
        tw-border-blue-400
        tw-bg-white
        items-center
        showCard"
        :class="colorCheckSchedule"
        v-show="isTablet"
      >
        <div class="
          tw-flex
          tw-p-2"
        >
          <div class="tw-min-w-36">
            <p class="text-kanban-card-tablet">{{ card.calendar.title }}</p>
            <span class="arrival-text-tablet" v-if="card.calendar.sta">
              <i class="
                fa-solid
                fa-arrow-down-right
                tw-mr-1"
              />STA: {{ card.calendar.sta ? $moment(card.calendar.sta, 'HHmm').format('HH:mm') : '' }}
            </span>
            <span class="arrival-text-tablet" v-if="card.calendar.std">
              <i class="
                fa-solid
                fa-arrow-up-right
                tw-mx-1"
              />STD: {{ card.calendar.std ? $moment(card.calendar.std,'HHmm').format('HH:mm') : '' }}
            </span>
          </div> 
        </div>
        <div class="
          tw-flex
          tw-36
          tw-p-2"
        >
          <div class="ac-type-text-tablet">
            <div>
              <i class="
                fa-solid
                fa-plane
                tw-mr-1"
              />A/C#: {{ actypes }}
            </div>
            <div class="tw-flex" v-if="gates">
              <img src="../svg/p-small.svg" alt="" srcset="" class="tw-mr-1">{{ gates }}
            </div>
          </div>
        </div>
        <div class="
          tw-flex
          tw-32
          tw-p-2"
        >
          <div class="
            tw-uppercase
            text-kanban-card-tablet"
          >
            {{ titleStatus }}
          </div>
          <lastComments :card="card" class="tw-pl-2" />
        </div>
        <div class="
          tw-flex
          tw-32
          tw-p-2"
          v-if="flightStatuses"
        >
          <div class="
            tw-rounded-lg
            tw-border-2                
          tw-border-gray-200
            tw-px-2
            tw-py-1
            tw-uppercase
            text-status-tablet"
          >
            <span :class="flightStatuses.color">
              <i class="tw-mr-1" :class="flightStatuses.icon"
              />{{ flightStatuses.name}}
            </span>            
          </div>
        </div>
        <!--card actions-->
        <kanbanCardActions />
    </div>
    <!--Desktop-->
    <div class="
          tw-flex tw-flex-row
          tw-rounded-lg
          tw-border-l-8
          tw-my-2
          tw-py-2
          tw-border-blue-400
          tw-bg-white
          items-center
          showCard"
          :class="colorCheckSchedule"
          v-show="isDesktop"
        >
        <div class="
          tw-flex
          tw-p-2
          tw-pl-6
          text-kanban-card-desktop"
        >
          <p>{{ card.calendar.title }}</p>
        </div>
        <div class="
          tw-flex
          tw-mx-6"
        >
          <img src="../svg/slash.svg" alt="" srcset="" class="">
        </div>
        <div class="
          tw-flex
          tw-p-2
          arrival-text-desktop"
        >
          <div v-if="card.calendar.sta">
            <i class="
              fa-solid
              fa-arrow-down-right
              tw-mr-2"
            />STA: {{ card.calendar.sta ? $moment(card.calendar.sta, 'HHmm').format('HH:mm') : '' }}
          </div>
          <div v-if="card.calendar.std">
            <i class="
              fa-solid
              fa-arrow-up-right
              tw-ml-4
              tw-mr-1"
            />STD: {{ card.calendar.std ? $moment(card.calendar.std,'HHmm').format('HH:mm') : '' }}
          </div>
        </div>
        <div class="
          tw-flex
          tw-mx-6"
        >
          <img src="../svg/slash.svg" alt="" srcset="" class="">
        </div>
        <div class="
          tw-flex
          ac-type-text-desktop"
        >
          <p>
            <i class="
              fa-solid
              fa-plane
              tw-mr-1"
            />A/C#: {{ actypes }}
          </p>
        </div>
        <div class="
          tw-flex
          tw-mx-6"
          v-if="gates"
        >
          <img src="../svg/slash.svg" alt="" srcset="" class="">
        </div>
        <div class="
          tw-flex
          ac-type-text-desktop"
          v-if="gates"
        >
          <p>
            <div class="tw-flex">
              <img src="../svg/p-big.svg" alt="" srcset="" class="tw-mr-1">{{ gates }}
            </div>
          </p>
        </div>
        <div class="
          tw-flex
          tw-mx-6"
        >
          <img src="../svg/slash.svg" alt="" srcset="" class="">
        </div>
        <div class="
          tw-flex
          tw-32
          tw-p-2"
        >
          <div class="
            tw-uppercase
            text-kanban-card-desktop"
          >
            {{ titleStatus }}
          </div>
          <lastComments :card="card" class="tw-pl-2" />
        </div>
        <div class="
          tw-flex
          tw-mx-6"
          v-if="flightStatuses"
        >
          <img src="../svg/slash.svg" alt="" srcset="" class="">
        </div>
        <div class="
          tw-flex
          tw-32
          tw-p-2"
          v-if="flightStatuses"
        >
          <div class="
            tw-rounded-lg
            tw-border-2
          tw-border-gray-200
            tw-px-2
            tw-py-1
            text-status-desktop"
          >
            <span :class="flightStatuses.color">
              <i class="tw-mr-1" :class="flightStatuses.icon"
              />{{ flightStatuses.name}}
            </span>
          </div>
        </div>
        <!--card actions-->
        <kanbanCardActions />
    </div>
  </div>
</template>
<script lang="ts">
import Vue, {defineComponent} from 'vue';
import kanbanCardActions from './KanbanCardActions.vue'
import useKanbanCard from '../uses/useKanbanCard';
import lastComments from './lastComments.vue'
import { is } from "quasar";
export default defineComponent({
  components: {
    lastComments,
    kanbanCardActions
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
.icons {
  color: #1F294F99  
}
.h-200 {
    height: 60vh;
}
.showCard {
  box-shadow: 0px 2px 4px 0px rgba(31, 41, 79, 0.07), 4px 4px 8px 0px rgba(31, 41, 79, 0.14);
}
.text-kanban-card-tablet {
  color: #1F294F;
  font-family: Manrope;
  font-size: 14px;
  font-style: normal;
  font-weight: 800;
  /*line-height: 100%; /* 15.4px */
  letter-spacing: 0.7px;
}
.text-kanban-card-desktop {
  color: rgba(31, 41, 79, 0.80);
  leading-trim: both;
  text-edge: cap;
  font-family: Manrope;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 19.8px */
  letter-spacing: 0.36px;
}
.arrival-text-tablet {
  color: #1F294F;
  text-edge: cap;
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 13.2px */
  letter-spacing: 0.36px;
}

.arrival-text-desktop {
  color: rgba(31, 41, 79, 0.80);
  leading-trim: both;
  text-edge: cap;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 17.6px */
  letter-spacing: 0.32px;
}
.ac-type-text-tablet {
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
.ac-type-text-desktop {
  color: rgba(31, 41, 79, 0.80);
  leading-trim: both;
  text-edge: cap;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 110%; /* 17.6px */
  letter-spacing: 0.32px;
}
.text-status-tablet {  
  font-family: Manrope;
  font-size: 12px;
  font-style: normal;
  font-weight: 800;
  line-height: 110%; /* 13.2px */
  letter-spacing: 0.36px;
  text-transform: uppercase;
}
.text-status-desktop {
  color: rgba(31, 41, 79, 0.80);
  leading-trim: both;
  text-edge: cap;
  font-family: Manrope;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%; /* 17.6px */
  letter-spacing: 0.32px;
  text-transform: uppercase;
}
</style>
