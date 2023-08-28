import Vue, { ref, computed, ComputedRef, WritableComputedRef } from 'vue';
import store from '../store/filters.store'
import fields from '../models/modalStation.model';
import buildKanbanStructure from '../actions/buildKanbanStructure';
import setUrlParams from '../actions/setUrlParams';
import checkUrlParams from '../actions/checkUrlParams';
import cache from '@imagina/qsite/_plugins/cache';

export default function useModalStation(props, proxy) {
  
  const router = proxy.$router;
  const route = proxy.$route;
  
  const loading: ComputedRef<boolean> = computed(() => store.loading);

  const showModalStation = computed({
    get: () => store.showModalStation,
    set: (value) => (store.showModalStation = value),
  });
  
  const stationId = computed({
    get: () => store.stationId,
    set: (value) => (store.stationId = value),
  });  
  
  const actions = computed(()=> {
    return [
      {
        props: {
          color: "primary",
          label: "filters",
        },
        action: async () => {          
          saveStationId();
        },
      },
    ];
  }) 

  async function saveStationId() {    
    try {
        //modalStation.value.validate().then(async (success) => {
          //  if (success) {
                //cache.set("stationId", this.stationId);
                await checkUrlParams({...route.query});
                if(store.stationId){
                  await setUrlParams(router, route.name);
                  await buildKanbanStructure();
                  store.showModalStation = false;
                }else{
                  store.showModalStation = true
                }
            //}
        //});
    } catch (error) {
      console.log(error);
    }
  }
  
  return {    
    loading,
    showModalStation,
    stationId,
    actions,
    fields
  };
}
