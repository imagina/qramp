<script lang="ts">
import { defineComponent } from 'vue'
import chipServicesController from '../uses/chipServices'

export default defineComponent({
  props: {
    size: {
      type: String,
      default:() => 'xs'
    },
    workOrderItemsTotal: {
      type: Number,
      default: () => 0,
    },
    workOrderId: {
      type: Number,
      default: () => 0,
    },
    typeWorkOrder: {
      type: Number,
      default: () => 0,
    },
  },
  setup(props, {emit}) {
    return { ...chipServicesController(props, emit) }
  }
})
</script>

<template>
  <div
    class="tw-py-4"
    v-if="workOrderItemsTotal > 0"
  >
  <q-btn
      icon="fa-light fa-briefcase-blank"
      class="tw-mr-2"
      text-color="primary"
      :size="size"
      round
      flat
      v-if="workOrderItemsTotal > 0"
      @click="getWorkOrderItems"
    >
      <q-badge
        class="tw--right-2"
        floating
        rounded
        color="primary"
        size="xs"
        v-if="workOrderItemsTotal > 0">
        {{ workOrderItemsTotal }}
      </q-badge>
      <q-popup-proxy
        ref="popupProxyRef"
        class="
          popover-w-490
          lg:tw-bg-white
          tw-shadow-2xl
          tw-max-h-72
          tw-pb-4
          lg:tw-overflow-x-hidden"
      >
        <div
          v-if="!loading"
          class="
           tw-px-2
           tw-py-8
           popover-w-490
           tw-bg-white
           lg:tw-max-w-4xl
           tw-text-xs
           lg:tw-text-base
           tw-mb-1
           "
          >
          <div class="text-header-chep tw--mt-3 tw-mx-3 tw-pb-3">
            Chosen Services
          </div>
          <div
            v-for="(list, index) in workOrdersItems"
            :key="index"
            class="
            tw-flex
            tw-py-1
            hover-color-chep
            text-blue-chep
            tw-rounded-full
            tw-pl-3
            tw-pr-3
            text-chep
            "
          >
            <div
              class="
               tw-cursor-pointer
               tw-border-gray-200
               tw-border-r-2
               tw-pr-2
               tw-mr-2
               tw-truncate"
            >
              {{ nameProduct(list.productId) }}
            </div>
            <div class="tw-truncate tw-flex text-color-bag">
              <div
                v-for="(work, indeWork) in list.workOrderItemAttributes"
                :key="indeWork"
                class="tw-flex"
              >
                <div v-if="work.value && indeWork > 0" class="tw-pr-1">,</div>
                <div v-if="work.value">{{ work.name }}:
                  <span v-if="work.type === 'checkbox'">
                    <i class="fa-solid fa-circle-check tw-text-green-500" />
                  </span>
                  <span v-else>{{ work.value }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-if="loading" class="tw-flex tw-flex-col tw-gap-2 tw-px-2 tw-py-5">
          <q-skeleton class="tw-mb-3" width="150px" />
          <q-skeleton
            v-for="i in 3"
            class="tw-rounded-full tw-w-full sm:tw-w-80"
            height="27px"
          />
        </div>
      </q-popup-proxy>
      <q-tooltip>
        Service summary
      </q-tooltip>
    </q-btn>
  </div>
</template>

<style>
.popover-w-490 {
 border-radius: 16px;
}
.text-color-blue-3 {
  color: #4C5D94
}
.text-blue-chep {
  color: rgba(76, 93, 148, 1)
}
.hover-color-chep:hover {
  background: rgba(241, 244, 250, 1)
}
.text-chep {
  @apply tw-text-xs lg:tw-text-sm !important;
  font-family: Manrope;
  font-weight: 400;
  line-height: 20px;
}
.text-header-chep {
  @apply tw-text-xs lg:tw-text-sm !important;
  font-family: Manrope;
  font-weight: 700;
  line-height: 20px;
  color: rgba(76, 93, 148, 1)
}
.text-color-bag {
  @apply tw-text-xs lg:tw-text-sm !important;
  font-family: Manrope;
  font-size: 15px;
  font-weight: 400;
  line-height: 20px;
  color: rgba(138, 152, 195, 1)
}
.color-icon-close {
  color: rgba(138, 152, 195, 1)
}
</style>
