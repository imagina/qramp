import Vue, { computed, ComputedRef, ref, onBeforeUnmount, inject } from 'vue';
import store from '../store/modalSchedule.store'

export default function useModalComment() {
  
  const visible = computed({
    get: () => store.showModalComments,
    set: (value) => store.showModalComments = value
  });

  const loading = computed({
    get: () => store.loading,
    set: (value) => store.loading = value
  });

  const isAppOffline = computed(() => Vue.prototype.$store.state.qofflineMaster.isAppOffline) 
  const isAppOffline = computed(() => false) 
  const permisionCommentsIndex = computed(() => Vue.prototype.$auth.hasAccess(`ramp.work-orders-comments.index`))  

  function showModalComments() {    
    if(!permisionCommentsIndex.value) {
        Vue.prototype.$alert.warning({message: 'You do not have permission to view comments'});
      return;
    }
    visible.value = true;
  }

  function hideModalComments() {
    loading.value = false;
    visible.value = false;
    // if(this.isCrud) this.$root.$emit('crud.data.refresh');
  }

  return {
    visible,
    isAppOffline,
    permisionCommentsIndex,
    showModalComments,
    hideModalComments,
    loading
  }
}
