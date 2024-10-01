import { ref, computed, ComputedRef } from 'vue';
import store from '../store/filters.store'
import modalStationFields from '../models/modalStation.model';
import buildKanbanStructure from '../actions/buildKanbanStructure';
import setUrlParams from '../actions/setUrlParams';
import { cache } from 'src/plugins/utils';
import getTitleFilter from '../actions/getTitleFilter';
import storeKanban from '../store/kanban.store';

export default function useModalStation() {
  const refModalStation: any = ref(null);
  const fields = computed(() => {
    return modalStationFields().fields.value
  });
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
      refModalStation.value.validate().then(async (success) => {
        if (success) {
          if (store.stationId) {
            await cache.set("stationId", store.stationId);
            store.form.stationId = store.stationId;
          }
          //await checkUrlParams();
          storeKanban.scheduleType = store.scheduleType;
          store.showModalStation = false;
          getTitleFilter();
          await setUrlParams();
          await buildKanbanStructure();

        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  return {
    loading,
    showModalStation,
    stationId,
    actions,
    fields,
    refModalStation
  };
}
