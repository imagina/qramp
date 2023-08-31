import Vue, { computed, ComputedRef } from 'vue';
import { Screen } from 'quasar'

export default function useKanbanDay() {
  const maxWidthMobile = 724;
  const maxWidthTablet = 1440;
  const isMobile = computed(() => Screen.width < maxWidthMobile );
  const isTablet = computed(() => Screen.width >= maxWidthMobile  && Screen.width < maxWidthTablet);
  const isDesktop = computed(() => Screen.width >= maxWidthTablet );
    
  return {  
    isMobile,
    isTablet,
    isDesktop
  };
}
