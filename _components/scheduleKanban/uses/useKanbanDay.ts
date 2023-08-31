import Vue, { computed, ComputedRef } from 'vue';
import { Screen } from 'quasar'

export default function useKanbanDay() {

  const isMobile = computed(() => Screen.width < 724 ); 
  const isTablet = computed(() => Screen.width >= 724  && Screen.width < 1440); 
  const isDesktop = computed(() => Screen.width >= 1440 ); 
    
  return {  
    isMobile,
    isTablet,
    isDesktop
  };
}
