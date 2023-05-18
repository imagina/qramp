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
              tw-mt-4 
              tw-text-sm lg:tw-text-base 
              tw-font-bold 
              tw-leading-none 
              tw-bg-white
              tw-rounded-lg
              tw-label-not"
            >
            <p 
              :class="{
                'tw-text-green-500': isEventListComplete(timestamp.date),
                'tw-text-orange-500': !isEventListComplete(timestamp.date)
              }"
            >
                <i class="fa-solid fa-circle" />
                {{ titleCompletedSchedule(timestamp.date) }} 
            </p>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue';
import _ from "lodash";
import {STATUS_DRAFT, STATUS_SCHEDULE} from '../model/constants.js'

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
        const timestamp = computed(() => props.timestamp);
        const scheduleType = computed(() => props.scheduleType);
        function isEventListComplete(date: string): boolean {
            return _.every(Object.entries(props.getEvents(date)), (elemento) => {
                return _.every(elemento[1], (objeto) => {
                return objeto.statusId !== STATUS_DRAFT && objeto.statusId !== STATUS_SCHEDULE;
                });
            });
        }
        function titleCompletedSchedule(date: string): string {
            const completed = isEventListComplete(date);
            return completed ? 'Completed' : 'Not completed'
        }

        return {
            isEventListComplete,
            titleCompletedSchedule,
            timestamp,
            scheduleType,
        }
    }
})
</script>

<style scoped></style>