<template>
    <div>
        <div 
            v-if="['day-agenda', 'week-agenda'].includes(scheduleType)" 
            class="
              tw-inline-flex 
              tw-items-center
              tw-w-full
              tw-p-4
              tw-mt-1
              tw-text-xs 
              lg:tw-text-base 
              tw-font-bold 
              tw-leading-none 
              tw-bg-white
              tw-rounded-lg
              tw-label-not
              tw-h-14"
            >
            <div class="
                tw-text-blueGray-500
                tw-w-40"
            >
                <div>
                    <span :class="{
                            'tw-text-green-500': isEventListComplete(timestamp.date),
                            'tw-text-orange-500': !isEventListComplete(timestamp.date)
                        }"
                    >
                        <i class="fa-solid fa-circle-exclamation" />
                    </span>
                    <span class="tw-text-sm" v-html="titleCompletedSchedule(timestamp.date)" />
                </div>
                <div
                   class="
                    tw-text-left
                    tw-py-1"
                    v-if="countIncompleteEvents(timestamp.date)[0] > 0
                    && !isEventListComplete(timestamp.date)"
                >
                    <i class="
                        fa-solid
                        fa-circle-check
                        tw-text-green-400"
                     />
                    <span class="tw-text-sm" v-html="totalCompleted(timestamp.date)" />
                </div>
            </div>

            <div class="tw-text-right">
            <div class="
                tw-inline-flex
                tw-items-center
                tw-justify-center"
            >
                <q-btn
                    icon="fa-solid fa-plus tw-text-blue-500"
                    size="sm"
                    outline
                    unelevated
                    flat
                    dense
                />
                <span class="
                    tw-text-xl
                    tw-text-gray-400
                    tw-mx-2"
                >|
                </span>
                <q-btn
                    icon="fa-solid fa-rotate-right tw-text-blue-500"
                    size="sm"
                    outline
                    unelevated
                    flat
                    dense
                    @click="refresh"
                />
            </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import useCompletedSchedule from '../uses/useCompletedSchedule'
import { date } from 'quasar';

export default defineComponent({
    props: {
        getEvents: {
            type: Function,
            default: () => {}
        },
        scheduleType: {
            type: String,
            // default: () => ''
            default: () => 'week-agenda' //dev only
        },
        timestamp: {
            type: Object,
            //default: () => {}
            default: () => {
                const d = new Date()
                return { date: date.toString()}
            } //dev only
        }
    },
    setup(props, {emit}) {
        return {
            ...useCompletedSchedule(props, emit)
        }
    }
})
</script>

<style scoped></style>