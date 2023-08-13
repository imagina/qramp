<template>
  <div 
    class="
     tw-relative 
     tw-rounded-lg 
     tw-h-36 
     tw-my-2 
     tw-border-l-8 
     tw-border-yellow-400 
     shadow-2
     tw-bg-white"
  >
    <div>
      <div class="tw-py-2 tw-pl-2 tw-w-full">
        <div class="tw-flex tw-pb-3">
          <div class="tw-w-10/12">
            <p 
              class="
                tw-font-bold 
                tw-text-sm"
            >
              AZ123/AZ321
            </p>
          </div>
          <div 
            class="
             tw-flex 
             tw-items-center 
             tw-space-x-2
             tw-px-3 
             tw-text-gray-500"
          >
            <i class="fa-solid fa-grip-dots-vertical" />
          </div>
        </div>
        <div 
          class="
           tw-font-bold 
           tw-text-xs 
           tw-space-y-1"
        >
          <div class="tw-flex tw-space-x-4">
            <div>
              ETH: 1600
            </div>
            <div>
              ETD: 1601
            </div>
          </div>
          <div class="tw-flex tw-space-x-1">
            <div>
              A/C#: N1235
            </div>
            <div 
              class="
              tw-flex 
              tw-items-center 
              tw-space-x-1
              tw-border-l 
              tw-border-gray-200 
              tw-px-2 
              tw-text-gray-500"
            >
              <i class="fa-solid fa-comment"></i>
              <span class="tw-font-bold tw-text-sm">5</span>
            </div>
          </div>
          <div class="tw-flex tw-pr-3">
            <div class="tw-w-4/5 tw-py-1">
              <span>
                SCHEDULE
              </span>
            </div>
            <div class="
              tw-rounded-md 
              tw-border 
              tw-py-1 
              tw-px-2">
              GATE#
            </div>
          </div>
        </div>
      </div>
    </div>
    <div 
      class=" 
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
        tw-rounded-br-lg"
       :class="{'tw-text-yellow-400': true}" 
    >
        <i 
          class="
           fa-solid 
           fa-plane-departure" 
        />
        <span>
          DEPARTED / On Air / Advanced
        </span>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
  setup() {
    const onDeleteCard = () => {
      // Implementar la lógica para eliminar la tarjeta
    };

    return {
      onDeleteCard,
    };
  },
});
</script>

<style scoped>
.text-x2 {
  font-size: 10px;
}
</style>
