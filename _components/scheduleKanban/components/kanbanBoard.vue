<template>
  <div>
    <page-actions 
        ref="pageActions" 
        :title="$t('ifly.cms.sidebar.schedule')" 
        multipleRefresh 
        class="q-mb-md" 
    />
  <div class="tw-flex tw-space-x-8">
    <div
      class="
        tw-flex-none 
        tw-py-4 
        tw-border-b 
        tw-border-gray-200 
        tw-space-y-4"
    >
      <q-btn-toggle
        v-model="scheduleType"
        rounded
        no-caps
        unelevated
        toggle-color="blue-grey"
        color="grey-2"
        text-color="blue-grey"
        :options="scheduleTypeOptions"
        id="btnCalendarType"
        size="14px"
        spread
        class="tw-py-2"
      />
      <q-date v-model="selectedDate" minimal size="sm"/>
      <dynamic-field v-model="filterTime" :field="dynamicFieldTime" />
    </div>

    <div 
      class="
       tw-flex-1 
       tw-h-auto 
       tw-flex 
       tw-overflow-x-auto"
      >
      <kanbanColumn
        v-for="(column, index) in columns"
        :key="index"
        :date="column.date"
        :cards="column.cards"
        :groupOptions="groupOptions"
        class="
         tw-flex-none 
         tw-space-y-0 
         tw-h-auto 
         tw-rounded-lg 
         tw-mb-4"
      />
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import kanbanColumn from "./kanbanColumn.vue";
import useKanbanBoard from '../uses/useKanbanBoard'

export default defineComponent({
  components: {
    kanbanColumn,
  },
  setup() {
    return {...useKanbanBoard()}
  },
});
</script>

<style scoped></style>
