<template>
  <div>
    <component
      :is="cardComponentName"
      cardComponentName
      :id="card.id"
      :key="card.id"
      :card="card"
      :dateColumn="dateColumn"
    />
  </div>
</template>
<script lang="ts">
import Vue, {defineComponent} from 'vue';
import useKanbanCardActions from '../uses/useKanbanCardActions';
import kanbanCardTablet from './kanbanCardTablet.vue';
import kanbanCardDesktop from './kanbanCardDesktop.vue';

export default defineComponent({
  components: {
    kanbanCardTablet,
    kanbanCardDesktop
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
    dateColumn: {
      type: String,
      default: () => null
    }
  },
  setup(props) {
    return {...useKanbanCardActions(props)}
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
