<template>
    <div>
        <div 
            v-if="['day-agenda', 'week-agenda'].includes(scheduleType)" 
            class="
              tw-inline-flex 
              tw-items-center
              tw-w-full
              tw-px-2 
              tw-py-1 
              tw-mt-1
              tw-text-xs 
              lg:tw-text-base 
              tw-font-bold 
              tw-leading-none 
              tw-bg-white
              tw-rounded-lg
              tw-label-not"
            >
            <div 
              :class="{
                'tw-text-green-500': isEventListComplete(timestamp.date),
                'tw-text-orange-500': !isEventListComplete(timestamp.date)
              }"
            >
                <i class="fa-solid fa-circle" />
                <span v-html="titleCompletedSchedule(timestamp.date)" />
                <div 
                   class="
                    tw-text-green-500 
                    tw-text-left 
                    tw-py-1"
                    v-if="countIncompleteEvents(timestamp.date)[0] > 0 
                    && !isEventListComplete(timestamp.date)"
                >
                    <i class="fa-solid fa-circle" />
                    {{ totalCompleted(timestamp.date) }}
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useCompletedSchedule from '../uses/useCompletedSchedule'

export default defineComponent({
    props: {
        getEvents: {
            type: Function,
            default: () => {}
        },
        scheduleType: {
            type: String,
            default: () => ''
        },
        timestamp: {
            type: Object,
            default: () => {}
        }
    },
    setup(props) {
        return {
            ...useCompletedSchedule(props)
        }
    }
})
</script>

<style scoped></style>