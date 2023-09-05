<template>
    <div>
        <div 
            v-if="['day-agenda', 'week-agenda'].includes(scheduleType)"
            :class="{
                'h-43': dataWo.length === 0,
            }" 
            class="
              tw-inline-flex 
              tw-items-center
              tw-w-full
              tw-px-4
              tw-py-2
              tw-mt-1
              tw-text-xs 
              lg:tw-text-base
              tw-leading-none 
              tw-bg-white
              tw-rounded-lg
              tw-label-not
              tw-h-12"
            >
            <div 
              class="
                tw-text-blueGray-500
                "
                v-if="dataWo.length > 0"
            >
                <div>
                    <span :class="{
                            'tw-text-green-500': isEventListComplete(),
                            'tw-text-orange-400': !isEventListComplete()
                        }"
                    >
                        <i class="fa-solid fa-circle-exclamation" />
                    </span>
                    <span class="tw-text-sm" v-html="titleCompletedSchedule()" />
                </div>
                <div
                   class="
                    tw-text-left
                    tw-py-1"
                    v-if="countIncompleteEvents()[0] > 0
                    && !isEventListComplete()"
                >
                    <i class="
                        fa-solid
                        fa-circle-check
                        tw-text-green-400"
                     />
                    <span class="tw-text-sm" v-html="totalCompleted()" />
                </div>
            </div>

            <div 
                class="tw-absolute tw-right-5"
                :class="{
                    'tw-mt-1': dataWo.length === 0
                }"
            >
            <div class="
                tw-inline-flex
                tw-items-center
                tw-justify-center"
            >
                <q-btn
                    v-if="!isBlank"
                    icon="fa-light fa-plus tw-text-blue-500"
                    size="sm"
                    outline
                    unelevated
                    flat
                    dense
                    @click="isWeekAgenda? openModalForm() : openInlineForm()"
                />
                <span class="
                    tw-h-4
                    tw-text-lg
                    tw-text-gray-200
                    tw-mx-2"
                    :class="{
                      'tw-border-l-2': !isBlank
                    }"
                />
                <q-btn
                    icon="fa-light fa-rotate-right tw-text-blue-500"
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

export default defineComponent({
    props: {
        dataWo: {
            type: Array,
            default: () => {}
        },
        scheduleType: {
            type: String,
            default: () => 'week-agenda'
        },
        dateColumn:{
            type: String,
            default: () => null
        },
        isWeekAgenda: {
            type: Boolean,
            default: true
        }
    },
    setup(props, {emit}) {
        return {
            ...useCompletedSchedule(props, emit)
        }
    }
})
</script>

<style>
.h-43 {
  height: 43px !important;
}
</style>
