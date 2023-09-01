<template>
    <div class="
        tw-flex
        tw-ml-auto
        w-60
        action-icon"
        :class="{ 'tw-mr-5' : isDesktop, 'tw-mr-2' : isTablet }"
        v-if="showKanbanCardsActions"
    >
        <q-btn
            flat
            dense
            icon="fa-light fa-file-circle-plus"
            size="sm"
            class="tw-mx-1"
        />              
        <q-btn
            flat
            dense
            icon="fa-light fa-copy"
            size="sm"
            class="tw-mx-1"
        />    
        <q-btn
            flat
            dense
            icon="fa-light fa-pen-to-square"
            size="sm"
            class="tw-mx-1"
        />    
        <q-btn
            flat
            dense
            icon="fa-light fa-trash"
            size="sm"
            class="tw-mx-1"
        />
    </div>
</template>

<script lang="ts">
import Vue, {defineComponent} from 'vue';
import useKanbanCard from '../uses/useKanbanCard';

export default defineComponent({
  props: {},
  setup(props) {
    return {...useKanbanCard(props)}
  }
});
</script>

<style scoped>
.action-icon {
  color: #1F294F99  
}
</style>
