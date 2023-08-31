<template>
  <div class="full-width">
    <div class="
      bg-blue-gray-1000      
      h-200
      tw-px-2
      tw-py-1"
    >      
      <div class="
        tw-h-10
        tw-flex
        tw-items-center
        tw-space-x-2
        tw-justify-center"
      > 
        <p>10h</p>
      </div>
      <!--mobile-->
        <!--<kanbandCard
          v-show="isMobile"
        "/>-->
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
        v-show="isTablet"
      >
        <div class="
          tw-flex
          tw-p-2"
        >
          <div class="tw-min-w-36">
            <p class="text-kanban-card-tablet">AZ123/AZ321</p>
            <span class="arrival-text-tablet">
              <i class="
                fa-solid
                fa-arrow-down-right
                tw-mr-1"
              />ETA:1600
            </span>
            <span class="arrival-text-tablet">
              <i class="
                fa-solid
                fa-arrow-up-right
                tw-mx-1"
              />ETD:1601
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
              />A/C#:N1234
            </div>
            <div class="tw-flex">
              <img src="../svg/p-small.svg" alt="" srcset="" class="tw-mr-1">F55                  
            </div>
          </div>
        </div>
        <div class="
          tw-flex
          tw-32
          tw-p-2"
        >
          <div class="text-kanban-card-tablet">
            SCHEDULED
          </div>
          <div class="
            tw-border-l
            tw-ml-1
            tw-border-gray-200
            tw-align-middle"
          >
            <span class="
              tw-text-gray-400
              tw-ml-1"
            >
              <i class="
                fa-solid
                fa-comment"
              />
              <span class="
                tw-font-bold
                tw-text-xs
                tw-mx-1">500
              </span>
            </span>
          </div>          
        </div>
        <div class="
          tw-flex
          tw-32
          tw-p-2"
        >
          <div class="
            tw-rounded-lg
            tw-border-2                
          tw-border-gray-200
            tw-px-2
            tw-py-1
            text-status-tablet"
          >
            <span class="tw-text-indigo-500">
              <i class="
                fa-solid
                fa-plane-arrival
                tw-mr-1"
              />ARRIVED
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
          v-show="isDesktop"
        >
        <div class="
          tw-flex
          tw-p-2
          tw-pl-6
          text-kanban-card-desktop"
        >
          <p>AZ123/AZ321</p>
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
          <i class="
            fa-solid
            fa-arrow-down-right
            tw-mr-1"
          />ETA:1600
          <i class="
            fa-solid
            fa-arrow-up-right
            tw-mx-1"
          />ETD:1601
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
            />A/C#:N1234
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
          ac-type-text-desktop"
        >
          <p>
            <div class="tw-flex">
              <img src="../svg/p-big.svg" alt="" srcset="" class="tw-mr-1">F55
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
          <div class="text-kanban-card-desktop">
            SCHEDULED
          </div>
          <div class="
            tw-border-l
            tw-ml-4
            tw-border-gray-200
            tw-align-middle"
          >
            <span class="tw-ml-4">
              <i class="
                fa-solid
                fa-comment"
              />
              <span class="
                tw-font-bold
                tw-mx-1"
              >500
              </span>
            </span>
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
          tw-32
          tw-p-2"
        >
          <div class="
            tw-rounded-lg
            tw-border-2
          tw-border-gray-200
            tw-px-2
            tw-py-1
            text-status-desktop"
          >
            <span class="tw-text-indigo-500">
              <i class="
                fa-solid
                fa-plane-arrival
                tw-mr-1"
              />ARRIVED
            </span>
          </div>
        </div>
        <!--card actions-->
        <kanbanCardActions />
      </div>
    </div>    
  </div>
</template>
<script lang="ts">
import Vue, {defineComponent} from 'vue';
import kanbanCardActions from './KanbanCardActions.vue'
import useKanbanDay from '../uses/useKanbanDay'
export default defineComponent({
  props: {
    cards: {
      type: Array,
      required: false,
    },
  },
  components: {
    kanbanCardActions
  },
  setup() {
    return {...useKanbanDay()}
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
