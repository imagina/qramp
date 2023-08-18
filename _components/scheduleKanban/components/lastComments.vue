<template>
  <div>
    <div
      v-if="permisionComments && card.comments && card.comments > 0"
      class="
       tw-flex 
       tw-items-center 
       tw-space-x-1 
       tw-border-l 
       tw-border-gray-200 
       tw-px-2 
       tw-text-gray-400"
    >
      <i class="fa-solid fa-comment"></i>
      <span class="tw-font-bold tw-text-sm">{{ card.comments }}</span>
      <q-tooltip
        :content-class="{
          tooltipComments: true,
          'tw-text-center': loadingComment,
        }"
        @input="changeLastComment(card)"
        :offset="[10, 10]"
      >
        <div v-if="loadingComment" class="tw-py-2">
          <i class="fa-thin fa-spinner-third fa-spin fa-pulse tw-text-2xl" />
        </div>
        <div v-else>
          <p class="tw-text-sm tw-font-semibold">Last comment</p>
          <div class="tw-text-sm" v-html="lastComment" />
        </div>
      </q-tooltip>
    </div>
  </div>
</template>

<script lang="ts">
import Vue, { defineComponent, computed } from "vue";
import {
  getCommentsFilter,
  getLastComment,
  setLastComment,
  getLoading,
} from "../../../_store/actions/comments";

export default defineComponent({
  props: {
    card: {
      default: () => {},
    },
    sizeBadge: {
      type: Number,
      default: () => 9,
    },
    iconClass: {
      type: String,
      default: () => "",
    },
    mainClass: {
      type: String,
      default: () => "",
    },
  },
  setup(props) {
    const loadingComment = computed(() => getLoading());
    const card = computed(() => props.card);
    const sizeBadge = computed(() => props.sizeBadge);
    const iconClass = computed(() => props.iconClass);
    const permisionComments = computed(() =>
      Vue.prototype.$auth.hasAccess(`ramp.work-orders-comments.index`)
    );
    const lastComment = computed(() => getLastComment());
    async function changeLastComment(card) {
      await setLastComment("");
      await getCommentsFilter(card.id);
    }
    return {
      card,
      permisionComments,
      loadingComment,
      changeLastComment,
      lastComment,
      sizeBadge,
      iconClass,
    };
  },
});
</script>

<style scoped></style>
